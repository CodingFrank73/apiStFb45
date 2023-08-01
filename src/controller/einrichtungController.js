const { daoEinrichtung } = require('../db-access')

const  getEinrichtungByLjaAz = async (req, res) => {

    try {
        //Prüfen ob jwt gültig
        const aktenzeichen = req.query.aktenzeichen
        const result = await daoEinrichtung.findByLjaAz(aktenzeichen);

        if (!result) {
            throw new Error("Not profile exists...")
        }


        res.status(200).json(result);

    } catch (error) {
        //401 JWT ungültig
        //403 "Personal-ID nicht vorhanden oder keine Zugriffsberechtigung für diese Aktion"
        console.log(error)
        res.status(500).json({ err: { message: error ? error.message : "Unknown error while loading your profile." } })
    }
}


module.exports = {
    getEinrichtungByLjaAz
}