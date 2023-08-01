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

const { getToken } = require("../controller/authController")

const apiRouter = express.Router();

apiRouter.get('/jwt/', getToken)
apiRouter.get('/personal/', getPersonalID)
apiRouter.get('/personal/id', getPersonalByID)

module.exports = {
    apiRouter
}