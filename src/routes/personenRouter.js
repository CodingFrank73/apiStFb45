const express = require("express");
const { body } = require("express-validator");
const { doAuthMiddleware } = require("../utils/auth-middleware");
//const { doValidation } = require("../facade/doValidation");

const {
    getPersonByID,
    updatePerson,
    insertPerson,
    getPersons
} = require("../controller/personenController")

const personenRouter = express.Router();

personenRouter.get('/all', getPersons)
personenRouter.get('/id', getPersonByID)
personenRouter.put('/update', doAuthMiddleware, updatePerson)
personenRouter.post('/add', doAuthMiddleware, insertPerson)

module.exports = {
    personenRouter
}