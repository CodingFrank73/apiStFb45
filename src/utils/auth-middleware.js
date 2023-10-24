const jwt = require("jsonwebtoken");

function doAuthMiddleware(req, res, next) {
    const _pleaseLoginFirst = () => res.status(401).json({ message: "Please login..." })
    const _tokenExpired = () => res.status(401).json({message: "Das JSON Web Token fehlt oder ist ungültig"})

    const tokenField = req.headers.authorization

    if (!tokenField) {
        return _pleaseLoginFirst()
    }

    const tokenFieldParts = tokenField.split(" ");
    const token = tokenFieldParts[1].replaceAll('"','')
    
    const isJwtToken = tokenFieldParts[0] === "Bearer";
    if (!isJwtToken) {
        return _pleaseLoginFirst();
    }

    const noTokenProvided = !token;
    if (noTokenProvided) {
        return _pleaseLoginFirst()
    }

    try {
        const tokenPayload = jwt.verify(token, process.env.JWT_SECRET)

        if (tokenPayload.exp < Math.floor(Date.now() / 1000)){
            console.log ("Expire: ", tokenPayload.exp)
            console.log ("Now: ", Math.floor(Date.now() / 1000))
            console.log (token)
           // res.status(401).json({message: "Token expired"})
            return _tokenExpired()
        }

        req.userClaims = tokenPayload;
        next();

    } catch (error) {
        console.log("error while verifying token", error);
        return _pleaseLoginFirst()
    }

}

module.exports = {
    doAuthMiddleware
}