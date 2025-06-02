import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import pg from 'pg';

// ENV VARIABLES

dotenv.config();


// SERVER SETUP

const port = process.env.PORT;
const app = express();

console.log(process.env.CLIENT_URL)

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(express.json());

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});


// DB SETUP

const db = new pg.Pool({
    connectionString: process.env.DB_URL
});


// ROUTES

app.get('/get-notes', async (req, res) => {
    console.log('Notes requested by client');

    const q =  await db.query('SELECT * FROM notes LIMIT 10');

    res.json({
        ok: true,
        message: "Fetched notes successfully",
        data: q.rows
    }).status(200);
});

app.post('/add-note', async (req, res) => {
    console.log(req.body);

    const data = {
        rating: req.body['star-rating'],
        content: req.body['note'],
        author: req.body['name']
    };

    const q = await db.query(`INSERT INTO notes (rating, content, author) values ($1, $2, $3)`, [data.rating, data.content, data.author]);

    if (q.rowCount === 1) {
        res.json({
            ok: true,
            message: "Note created successfully",
        }).status(201);
    } else {
        res.json({
            ok: false,
            message: "Failed to create note"
        }).status(500);
    };
});
