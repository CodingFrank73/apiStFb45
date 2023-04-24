const express = require("express");
const { body } = require("express-validator");
const { doAuthMiddleware } = require("../utils/auth-middleware");
//const { doValidation } = require("../facade/doValidation");

const {
    getPersonByID,
    updatePerson,
    insertPerson,
    getPersons,
    getPersonID
} = require("../controller/personenController")

const personenRouter = express.Router();

personenRouter.get('/all', getPersons)
personenRouter.get('/', getPersonID)
personenRouter.get('/id', getPersonByID)
personenRouter.put('/update', doAuthMiddleware, updatePerson)
personenRouter.post('/add', insertPerson)

module.exports = {
    personenRouter
}