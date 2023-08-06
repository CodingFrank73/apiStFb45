const express = require("express");
const { body } = require("express-validator");
const { doAuthMiddleware } = require("../utils/auth-middleware");
//const { doValidation } = require("../facade/doValidation");

const {
    getPersonalByID,
    updatePerson,
    insertPerson,
    getPersons,
    getPersonalID
} = require("../controllers/personalController")

const webRouter = express.Router();

// webRouter.get('/all', getPersons)
// webRouter.get('/', getPersonalID)
// webRouter.get('/id', getPersonalByID)
// webRouter.put('/update', doAuthMiddleware, updatePerson)
// webRouter.post('/add', insertPerson)

module.exports = {
    webRouter
}