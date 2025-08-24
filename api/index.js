import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import fs from "fs";

const app = express();
const port = 8894;
const saltRounds = 10;


function getPassword() {
    try {
        const data = fs.readFileSync('./password.txt', 'utf8'); //reads the file
        return data; 
    } catch (err) {
        console.error(err);
        return "none";
    }
}

const db = new pg.Client({
    user: "postgres",
    password: getPassword(), //gets from password.txt
    database: "BillView",
    port: "5432",
    host: "localhost"
});



let views = 0;

db.connect();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", async (req, res) => {
    try{
    res.render("index.ejs", {stories: await db.query('SELECT * FROM stories ORDER BY id DESC LIMIT 10'), issue: await db.query('SELECT id FROM issues ORDER BY id DESC LIMIT 1')});
    views++;
    } catch(err) {
        res.render("error/error503.ejs");
        console.log(err);
    }
});

app.get("/bills/:id", async (req, res) => {
    try {
        const test = await db.query('SELECT * FROM stories WHERE id = $1', [req.params.id]);
        if( test.rows[0] !== undefined) {
            res.render("story.ejs", {stories: await db.query('SELECT * FROM stories WHERE id = $1', [req.params.id])});
        } else {
            throw (404);
        }
    } catch (err) {
        console.log(err);
        res.redirect("/error");
    }
    
});

// API Endpoints for bill management
app.get("/api/bills", async (req, res) => {
    try {
        const { topics, search } = req.query;
        let query = `
            SELECT b.*, be.context, be.summary as large_summary, be.chance_to_pass
            FROM bills b
            LEFT JOIN bills_expanded be on b.id = be.id
        `;
        let params = [];
        let conditions = [];

        if (topics) {
            const topicArray = topics.split(',');
            conditions.push(`b.subject = ANY($${params.length + 1})`); 
            params.push(topicArray);
        }

        if (search && search.trim()) {
            conditions.push(`(LOWER(b.summary) LIKE LOWER($${params.length + 1}) OR LOWER(b.subject) LIKE LOWER($${params.length + 1}))`);
            params.push(`%${search.trim()}%`);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join( ' AND ');
        }

        query += ' ORDER BY b.id DESC';

        const result = await db.query(query, params);

        // Reformat returned query data for frontend props
        const bills = result.rows.map(bill => ({
            id: bill.id,
            billName: bill.bill_id || `Bill ${bill.id}`,
            topic: bill.subject, 
            presenterInfo: {
                name: "Representative Name", // Needs to be added to DB schema
                party: "Party", // Needs to be added to DB schema
                presenterImg: "https://example.com/images/default.jpg"
            }, 
            billStatistics: {
                chanceOfPassing: bill.chance_to_pass || 0,
                 otherStatistic: "Statistics not available",
                otherStatistic1: "Public approval: N/A"
            }, 
            summaries: {
                medium: bill.summary || "No summary available",
                large: bill.large_summary || bill.content || "No detailed summary available"
            },
            topics: [
                {
                    id: 1, 
                    name: bill.subject,
                    icon: getTopicIcon(bill.subject)
                }
            ],
            news: [],
            isTracked: false
        }));
        res.json(bills);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch bills" }); 
    }
})

// Users's tracked bills
app.get("/api/users/:userId/tracked-bills", async (req, res) => {
    try {
        const { userId } = req.params;

        const result = await db.query(`
            SELECT b.*, be.content, be.summary as large_summary, be.chance_to_pass,
                ut.id as tracking_id
            FROM user_tracked_bills ut
            JOIN bills b ON ut.bill_id = b.id
            LEFT JOIN bills_expanded be ON b.id = be.id
            WHERE ut.user_id = $1
            ORDER BY ut.id DESC
        `, [userId]);

        // Tracked bills reformated for frontend
        const trackedBills = result.rows.map(bill => ({
            id: bill.id, 
            billName: bill.bill_id || `Bill ${bill.id}`,
            topic: bill.subject,
            presenterInfo: {
                name: "Representative Name",
                party: "Party",
                presenterImg: "https://example.com/images/default.jpg"
            },
            billStatistics: {
                chanceOfPassing: bill.chance_to_pass || 0,
                otherStatistic: "Statistics not available",
                otherStatistic1: "Public approval: N/A"
            },
            summaries: {
                medium: bill.summary || "No summary available",
                large: bill.large_summary || bill.content || "No detailed summary available"
            }, 
            topics: [
                {
                    id: 1,
                    name: bill.subject,
                    icon: getTopicIcon(bill.subject)
                }
            ],
            news: [],
            isTracked: true
        }));
        res.json(trackedBills);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch tracked bills" });
    }
});

// Auth Routes
app.post("/api/users/register", async (req, res) => {
    try {
        const { username, password, interests } = req.body;

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Add new user
        const userResult = await db.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
            [username, hashedPassowrd]
        );

        const userId = userResult.rows[0].id;

        // After auth, store user interests / preferences
        if (interests && interests.length > 0) {
            for (const interest of interests) {
                await db.query(`
                    INSERT INTO user_preferences (user_id, preference_type, preference_value) VALUES ($1, $2, $3)
                    `, [userId, 'topic', interest]
                );
            }
        }

        res.json({
            success: "true",
            userId, 
            message: "User registered successfully"
        });
    } catch (err) {
        console.error(err);
        if (err.code === '23505') { // Unique constraint violation
            res.status(400).json({ error: "Username already exists" });
        } else {
            res.status(500).json({ error: "Failed to register user" });
        }
    }
});

// User Login
app.post("/api/users/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const result = await db.query(
            'SELECT id, username, password FROM users WHERE username = $1',
            [username]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const user = result.rows[0];
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
           return res.status(401).json({ error: "Invalid credentials" }); 
        }

        res.json({
            success: true,
            userId: user.id,
            username: user.username
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Login failed" });
    }
});
// Get user setup questions
app.get("/api/setup/questions", (req, res) => {
    const userQuestions = [
        {
            id: 1,
            question: "What topics are you interested in?",
            answerChoices: ["Healthcare", "Education", "Environment", "Economy", "Defense", "Immigration", "Technology", "Agriculture"]
        },
        {
            id: 2,
            question: "What subjects are you most passionate about?",
            answerChoices: ["Climate Change", "Social Justice", "Economic Reform", "Healthcare Access", "Education Reform", "National Security"]
        }
    ];
    
    res.json(userQuestions);
});

// Get available tags for filtering
app.get("/api/tags", async (req, res) => {
    try {
        const result = await db.query('SELECT DISTINCT subject FROM bills WHERE subject IS NOT NULL');

        // tags reformatted for frontend
        const tags = result.rows.map((row, index) => ({
            id: index + 1,
            selected: false, 
            label: row.subject
        }));

        res.json(tags);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch tags" });
    }
});
// Helper function to get topic icons
function getTopicIcon(topic) {
    const iconMap = {
        'Healthcare': '🏥',
        'Education': '🎓',
        'Environment': '🌿',
        'Economy': '💰',
        'Defense': '🛡️',
        'Immigration': '🌎',
        'Technology': '💻',
        'Agriculture': '🌾',
        'Energy': '⚡'
    };
    return iconMap[topic] || '📋';
}

app.get("/tags/:tag", async (req, res) => {
    try {
        const test = await db.query('SELECT * FROM stories WHERE genre = $1', [req.params.tag]);
        if( test.rows[0] !== undefined) {
            res.render("search.ejs", {stories: await db.query('SELECT * FROM stories WHERE genre = $1', [req.params.tag])});
        } else {
            throw 404;
        }
    } catch (err) {
        console.log(err);
        res.render("search.ejs", {stories: null, error: "We coudn't find anything"});
    }
})

app.get("/search", async (req, res) => {
    res.render("search.ejs", {stories: null});
});

app.post("/search", async (req, res) => {
    const search = req.body["search"];
    try {
        const results = await db.query('SELECT * FROM stories WHERE lower(title) like lower($1) ', ["%" + search + "%"]);
        console.log(search + " | " + results.rows);
        res.render("search.ejs", {stories: results});
    } catch (err) {
        res.render("error/error503.ejs");
    }
});

app.get("/admin", (req, res) => res.render("auth.ejs"));

app.post("/admin", async (req, res) => {
    try { 
    if (req.body.password) {
    const password = req.body.password
    const hash = await db.query('SELECT hash FROM code ORDER BY id DESC LIMIT 1')
    bcrypt.compare(password, hash.rows[0].hash, function(err, result) {
        if(result === true) {
            res.render("admin.ejs")
        } else {
            res.render("error/error403.ejs")
        }
    });
    } else if (req.body.select) {
        res.render(req.body.select + ".ejs")
    } else if (req.body.title) {
        try {
            const user = req.body
            await db.query("INSERT INTO post (title, summary, paragraphs, author, issue, genre, img) VALUES ($1, $2, $3, $4, $5, $6, $7)", [user.title, user.summary, user.paragraphs, user.author, user.issue, user.genre, user.img])
            res.render("done.ejs");
        } catch (err) {
            res.render("error/error502.ejs")
        }
        
    } else {
        res.render("error/error501.ejs")
    }
    } catch (err) {
        res.render("error/error403.ejs")
    }
    
});

app.get("/views", (req, res) => {
    res.json({views})
});

app.post("/views", (req, res) => {
    views = req.body.views
    res.json({views})
});

//add imagebb API

app.get("*", (req, res) => {
    res.render("error/error404.ejs");
});

app.listen(port, console.log("Listening on port " + port));