const jwt = require("jsonwebtoken");

function doAuthMiddleware(req, res, next) {
    const _pleaseLoginFirst = () => res.status(401).json({ message: "Please login..." })

    const tokenField = req.headers.token;

    if (!tokenField) {
        return _pleaseLoginFirst()
    }

    const tokenFieldParts = tokenField.split(" ");
    const token = tokenFieldParts[1];

    const isJwtToken = tokenFieldParts[0] === "JWT";
    if (!isJwtToken) {
        return _pleaseLoginFirst();
    }

    const noTokenProvided = !token;
    if (noTokenProvided) {
        return _pleaseLoginFirst()
    }

    try {
        const tokenPayload = jwt.verify(token, process.env.JWT_SECRET)

        //const payload = jwt.verify(token, process.env.JWT_SECRET)

        if (tokenPayload.exp > Math.floor(Date.now() / 1000)) {
            console.log("Abgelaufen");
        } else {
            console.log("gültig");
        }




        /*  const isAccessToken = tokenPayload.type === "access";
         if (!isAccessToken) {
             return _pleaseLoginFirst();
         } */

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