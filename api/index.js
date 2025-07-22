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