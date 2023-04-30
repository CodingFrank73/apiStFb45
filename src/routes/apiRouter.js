const express = require("express");
const { body } = require("express-validator");
const { doAuthMiddleware } = require("../utils/auth-middleware");

const {
    getPersonalByID,
    updatePerson,
    insertPerson,
    getPersons,
    getPersonalID
} = require("../controller/personalController")

const apiRouter = express.Router();

apiRouter.get('/jwt/', getPersonalID)
apiRouter.get('/personal/', getPersonalID)
apiRouter.get('/personal/id', getPersonalByID)

module.exports = {
    apiRouter
}