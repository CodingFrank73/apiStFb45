const { daoCommon } = require('../db-access')
const { createToken, decode, isTokenExpired } = require('../utils/security')

const getJWT = async (req, res) => {

    try {
        const { username, kibizkey, masterkey } = req.body
        const test = process.env.Master_Key

        if (masterkey !== process.env.Master_Key) {
            res.status(403).send("Anmeldedaten ungültig")
            return
        };

        const result = await daoCommon.findUser(kibizkey, username);

        if (!result) {
            throw new Error("Not profile exists...")
        }

        const token = createToken(result, "access", Number(process.env.LIFETIME_TOKEN_ACCESS))

        const de = isTokenExpired(token)


        res.status(201).json(token);

    } catch (error) {
        //401 JWT ungültig
        //403 "Personal-ID nicht vorhanden oder keine Zugriffsberechtigung für diese Aktion"
        console.log(error)
        res.status(500).json({ err: { message: error ? error.message : "Unknown error while loading your profile." } })
    }
}

module.exports = {
    getJWT
}