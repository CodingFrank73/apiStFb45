const { CLIENT_RENEG_LIMIT } = require('tls');
const { daoPersonal } = require('../db-access');
const { daoCommon } = require('../db-access');
const { createPerson, createNewPersonal } = require('../domain/person');
const { exit } = require('process');


const getPersons = async (req, res) => {

    try {
        const result = await daoPersonen.findAll();
        res.status(200).json(result);

    } catch (error) {
        console.log(error)
        res.status(500).json({ err: { message: error ? error.message : "Unknown error while loading your profile." } })
    }
}

const getPersonalID = async (req, res) => {
    try {
        const vorname = req.query.vorname
        const nachname = req.query.nachname
        const geburtsjahr = req.query.geburtsjahr;
        const einrichtungId = req.query.einrichtungId
        const aktenzeichen = req.query.aktenzeichen

        const result = await daoPersonal.findId(vorname, nachname, geburtsjahr, einrichtungId, aktenzeichen)

        res.status(200).json(result)

    } catch (error) {
        res.status(500).json({ err: error.message || "Unknown error while reading users" })
    }
}

const getPersonalByID = async (req, res) => {

    try {
        //Prüfen ob jwt gültig
        const personId = req.query.id
        console.log(personId)
        const result = await daoPersonal.findById(personId);

        if (!result) {
            throw new Error("Not profile exists...")
        }

        //const person = createPerson(result);

        res.status(200).json(result);

    } catch (error) {
        //401 JWT ungültig
        //403 "Personal-ID nicht vorhanden oder keine Zugriffsberechtigung für diese Aktion"
        console.log(error)
        res.status(500).json({ err: { message: error ? error.message : "Unknown error while loading your profile." } })
    }
}

const updatePerson = async (req, res) => {
    const { userId, dateOfBirth, ...updatedInfo } = req.body

    updatedInfo.dateOfBirth = new Date(dateOfBirth)

    try {
        const insertResult = await daoPersonen.update(userId, updatedInfo);

        const wasSuccessful = insertResult.acknowledged === true && insertResult.modifiedCount
        if (!wasSuccessful) {
            throw new Error("Editing profile failed, please try again.")
        }

        res.status(200).json({})  //<- Prüfen was hier zurück zugeben ist....

    } catch (error) {
        res.status(500).json({ err: error.message || "Error Editing Profile Settings." })
    }
}

const insertPerson = async (req, res) => {
    const {
        einrichtungId,
        aktenzeichen,
        vorname,
        nachname,
        geburtsname,
        geburtstag,
        geschlecht,
        staatsangehoerigkeitId,
        beschaeftigungsart,
        beschaeftigungsbeginn,
        fuehrungszeugnisLiegtVor,
        fuehrungszeugnisMitEintrag
    } = req.body

    try {
        /* const foundUser = await daoPersonen.findByEmail(email)

        if (foundUser) {
            const errorMessage = "Account with this email already exists"
            throw new Error(errorMessage)
        } */

//MakeNewPersonal => erstelle ein neues Personalobject. Hierbei machte Prüfung ob alle benötigten Daten eingetragen sind.
//Erstelle felder wie Staatangehörigkeit

        const staatsangehoerigkeit = await daoCommon.findStaatangehoerigkeitById(staatsangehoerigkeitId)

        const personal = await createNewPersonal({
            synchronisieren : "nein",
            einrichtungId,
            aktenzeichen,
            vorname,
            nachname,
            geburtsname,
            geburtstag,
            geschlecht,
            staatsangehoerigkeit : staatsangehoerigkeit,
            staatsangehoerigkeitId,
            beschaeftigungsart,
            beschaeftigungsbeginn,
            fuehrungszeugnisLiegtVor,
            fuehrungszeugnisMitEintrag
        });


        if (personal.synchronisieren !=="ja"){
            // let err = new Error(personal.message);
            // err.status = personal.status
            // throw err
            res.status(personal.status).json(personal.message)
            return
        }

        // const insertResult = await daoPersonal.insert(personal);

        // const isRegSuccessfully =
        //     insertResult.acknowledged === true &&
        //     insertResult.insertedId;

        // if (!isRegSuccessfully) {
        //     throw new Error("Registration failed")
        // }   

         res.status(201).json(personal)

        // if (personal.synchronisieren === "ja"){
        //     res.status(201).json(personal)
        //     const insertResult = await daoPersonal.insert(personal);
        // }
        
        // const isRegSuccessfully =
        //     insertResult.acknowledged === true &&
        //     insertResult.insertedId;

        // if (!isRegSuccessfully) {
        //     throw new Error("Registration failed")
        // }

        // res.status(201).json({ "description": "Daten erstellt" })

    } catch (error) {
        res.status(500).json({ error: error.message || "Unknown error while registering new user." })
    }

}

module.exports = {
    getPersons,
    getPersonalID,
    getPersonalByID,
    updatePerson,
    insertPerson
}