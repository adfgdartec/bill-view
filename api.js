import express from 'express';
import pg from 'pg';
const app = express();
const port = 3001; // Or any available port

const client = new pg.Client({
    database:"bill-view-test",
    host:"localhost",
    user:"postgres",
    password:process.env.dbpass,
    port:"5432"
});

client.connect();

app.get('/api/data', async (req, res) => {
    try {
        const { rows } = await client.query('SELECT * FROM test');
        console.log(rows);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Backend server listening on port ${port}`);
});