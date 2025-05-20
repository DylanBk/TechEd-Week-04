import express from 'express';

const app = express();
const port = 5000;


app.use(express.json());


app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});

app.get('/messages', (req, res) => {
    res.json({ message: "Hello, world!", type: "GET" });
})

app.post('/messages', (req, res) => {
    res.json({ message: "Hello, world!", type: "POST" });
});