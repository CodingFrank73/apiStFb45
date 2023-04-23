const express = require('express')
const dotenv = require('dotenv').config();

const { personenRouter } = require('./routes/personenRouter')

const PORT = process.env.PORT || 9002;
const app = express();

app.use(express.json());

app.use('/api/personen', personenRouter)

app.get("/", (req, res) => {
    res.send("server works...")
})

app.listen(PORT, () => {
    console.log(`Server listen on Port: ${PORT}`);
})