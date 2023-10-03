require('dotenv').config()
const express = require('express')
const methodOverride = require('method-override')
const morgan = require('morgan')
const cors = require('cors')

const { apiRouter } = require('../src/routes/apiRouter')

const PORT = process.env.PORT || 9002;
const app = express();

const frontendURL = 
    process.env.NODE_ENV ==='production'
    ? process.env.FRONTEND_URL
    : "http://127.0.0.1:5500"

app.use(morgan('common', {immediate: true}))

app.use(express.json())

app.use(methodOverride('X-HTTP-Method-Override'))

app.use(cors({ origin: [frontendURL], credentials: true}))

app.use('/api', apiRouter)

app.get("/", function(req, res) {
    res.send("server works...")
})

app.listen(PORT, () => {
    console.log(`Server listen on Port: ${PORT}`);
})