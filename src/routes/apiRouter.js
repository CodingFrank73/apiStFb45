const express = require("express");

const {
    getPersonalByID,
    updatePersonalAction,
    insertPersonalAction,
    getPersons,
    getPersonalID
} = require("../controllers/personalController")

const { detailsEinrichtungAction } = require("../controllers/einrichtungController");
const { indexStaatAction, detailsStaatAction } = require("../controllers/staatController");
const { getJWT } = require("../controllers/jwtController")
const { doAuthMiddleware } = require("../utils/auth-middleware")

const apiRouter = express.Router();


apiRouter.get('/jwt/', getJWT)
apiRouter.get('/personal', getPersonalID)
apiRouter.get('/personal/id', getPersonalByID)
apiRouter.put('/personal/', updatePersonalAction)
apiRouter.post('/personal/', doAuthMiddleware, insertPersonalAction)

apiRouter.get('/einrichtung/', detailsEinrichtungAction)

apiRouter.get('/staat/', indexStaatAction)
apiRouter.get('/staat/:indkey', detailsStaatAction)

module.exports = {
    apiRouter
}