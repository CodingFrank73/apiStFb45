const crypto = require("crypto");
const jwt = require("jsonwebtoken");

function createToken(user, type = "access", lifetimeInSeconds = Number(process.env.LIFETIME_TOKEN_ACCESS)) {
    const initiatedAt = Math.floor(Date.now() / 1000);
    const expiresAt = initiatedAt + lifetimeInSeconds;

    const tokenPayload = {
        sub: user._id,
        type: type,
        iat: initiatedAt,
        exp: expiresAt
    }

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);
    return token
}

function isTokenExpired(token) {
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    if (payload.exp > Math.floor(Date.now() / 1000)) {
        console.log("Abgelaufen");
    } else {
        console.log("gültig");
    }


}

module.exports = {
    createToken,
    isTokenExpired
}