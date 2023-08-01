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

const {
    getEinrichtungByLjaAz
} = require("../controller/einrichtungController")

const apiRouter = express.Router();

apiRouter.get('/jwt/', getPersonalID)
apiRouter.get('/personal/', getPersonalID)
apiRouter.get('/personal/id', getPersonalByID)
apiRouter.post('/personal/', insertPerson)
apiRouter.get('/einrichtung/', getEinrichtungByLjaAz)

module.exports = {
    apiRouter
}