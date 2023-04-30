const express = require('express')
const dotenv = require('dotenv').config();

const { webRouter } = require('./routes/webRouter')
const { apiRouter } = require('./routes/apiRouter')

const PORT = process.env.PORT || 9002;
const app = express();

app.use(express.json());

app.use('/web', webRouter)
app.use('/api', apiRouter)


app.get("/", (req, res) => {
    res.send("server works...")
})

app.listen(PORT, () => {
    console.log(`Server listen on Port: ${PORT}`);
})