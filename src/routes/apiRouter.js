const express = require("express");
const { body } = require("express-validator");
const { doAuthMiddleware } = require("../utils/auth-middleware");

const {
    getPersonalByID,
    updatePerson,
    insertPersonalAction,
    getPersons,
    getPersonalID
} = require("../controllers/personalController")

const { detailsEinrichtungAction } = require("../controllers/einrichtungController");
const { indexStaatAction, detailsStaatAction } = require("../controllers/staatController");



const { getToken } = require("../controller/authController")

const apiRouter = express.Router();

apiRouter.get('/jwt/', getPersonalID)
apiRouter.get('/personal/', getPersonalID)
apiRouter.get('/personal/id', getPersonalByID)
apiRouter.post('/personal/', insertPersonalAction)

apiRouter.get('/einrichtung/', detailsEinrichtungAction)

apiRouter.get('/staat/', indexStaatAction)
apiRouter.get('/staat/:indkey', detailsStaatAction)

module.exports = {
    apiRouter
}