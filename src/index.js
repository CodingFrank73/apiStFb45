require('dotenv').config()
const express = require('express')

const { apiRouter } = require('../src/routes/apiRouter')

const PORT = process.env.PORT || 9000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("server works...")
})

app.use('/api', apiRouter)

app.listen(PORT, () => {
    console.log(`Server listen on Port: ${PORT}`);
})