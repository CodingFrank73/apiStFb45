const { daoCommon } = require('../db-access')

const indexStaatAction = async(req, res) =>{

    try {
        console.log("Hallo")
        const result = await daoCommon.findStaat();
        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ err: { message: error ? error.message : "Unknown error while loading your staat." } })
    }
}


const detailsStaatAction = async (req, res) => {

    try {
        //Prüfen ob jwt gültig
        const indkey = req.query.indkey
        const result = await daoCommon.findStaatByIndKey(indkey);

        if (!result) {
            throw new Error("Not profile exists...")
        }


        res.status(200).json(result);

    } catch (error) {
        //401 JWT ungültig
        //403 "Personal-ID nicht vorhanden oder keine Zugriffsberechtigung für diese Aktion"
        console.log(error)
        res.status(500).json({ err: { message: error ? error.message : "Unknown error while loading your staat." } })
    }
}


module.exports = {
    indexStaatAction,
    detailsStaatAction
}