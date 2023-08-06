const { daoUser } = require('../db-access')
const {createToken} = require('../utils/security')

const getJWT = async (req, res) => {

    try {
        const { username, kibizkey, masterkey } = req.body
       
        const result = await daoUser.find(username, kibizkey, masterkey);

        if (!result) {
            throw new Error("Not profile exists...")
        }

        const token = createToken()

        res.status(200).json(token);

    } catch (error) {
        //401 JWT ungültig
        //403 "Personal-ID nicht vorhanden oder keine Zugriffsberechtigung für diese Aktion"
        console.log(error)
        res.status(500).json({ err: { message: error ? error.message : "Unknown error while loading your profile." } })
    }
}

module.exports={
    getJWT
}