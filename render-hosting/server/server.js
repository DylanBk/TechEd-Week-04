import express from 'express';
import cors from 'cors';

import todoJson from '../data/todos.json' with { type: 'json' };


const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});


app.get('/todos/get-all', (req, res) => {
    res.json({
        ok: true,
        message: "Todos fetched successfully",
        data: todoJson
    });
});