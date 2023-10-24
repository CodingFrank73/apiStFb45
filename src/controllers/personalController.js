
const { daoPersonal, daoCommon } = require('../db-access');
const { validateNewPersonal } = require('../utils/validate');
const { createNewPersonal } = require('../domain/personal');

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

const updatePersonalAction = async (req, res) => {
    const { synchronisieren, ...updatedInfo } = req.body
    const _id = req.query.id // <-- Entspricht der KiBiz-Personal-ID im Access-Frontend 
    
    console.log(updatedInfo)

    try {
        const insertResult = await daoPersonal.update(_id, updatedInfo);

        const wasSuccessful = insertResult.acknowledged === true && insertResult.modifiedCount
        if (!wasSuccessful) {
            throw new Error("Editing profile failed, please try again.")
        }

        res.status(200).json({})  //<- Prüfen was hier zurück zugeben ist....

    } catch (error) {
        res.status(500).json({ err: error.message || "Error Editing Profile Settings." })
    }
}

const insertPersonalAction = async (req, res) => {
    const {
        synchronisieren,
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
        //Neues Personal Object erstellen        
        const personal = await createNewPersonal({
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
        });


        //Vorprüfung: Im ersten Schritt, d.h. wenn die Eigenschaft 'synchronisieren' === 'nein' ist.
        //Prüfe ob die im Body übermittelten Werte valide sind.
        //Wenn NEIN gebe einen Validierungfehler, ansonsten ein Ok, als Response zurück und beende Function.

        if (synchronisieren !=="ja"){
            //Prüfe ob Validierungsfehler vorliegen
            const personalErrorObj = await validateNewPersonal(personal)

            //Wenn Fehler vorliegen gebe das ErrorObject der Validerung zurück
            if (personalErrorObj.hasOwnProperty('error')){
                res.status(400).json({
                    "description" : "Validierung fehlgeschlagen", 
                    "content" :{
                        "application/json" : {
                            "schema" : {
                                "$ref" : personalErrorObj.error
                            }
                        }
                    }})
                return
            }

            //Es liegen keine Validerungsfehler vor, gebe das PersonalObject zurück
            res.status(201).json({
                "description" : "Daten erstellt", 
                    "content" :{
                        "application/json" : {
                            "schema" : {
                                "$ref" : personal
                            }
                        }
                    }
            })
            return
        }

        //Speichern des zuvor erstellten Personal Objects
        const result = await daoPersonal.insert(personal)

        //Prüfen ob das speichern erfolgreich war
        const isInsSuccessfully = result.acknowledged === true && result.insertedId

        //Wenn das speichern fehlgeschlagen ist, werfe eine Fehler und beende die Function
        if (!isInsSuccessfully) {
            throw new Error("Neues Personal konnte nicht gespeichert werden")
        }   

        //Speichern war erfolgreich, lade das soeben erstelle Personal Object
        //und gebe es als Response zurück
        const newPersonal = await daoPersonal.findByObjectId(result.insertedId)

        res.status(201).json({
            "discription" : "Daten erstellt",
            "content" : {
                "application/json" :{
                    "schema" :{
                        "$ref": newPersonal
                    }
                    
                }
            }
            })

    } catch (error) {
        res.status(500).json({ error: error.message || "Unknown error while registering new user." })
    }

}

module.exports = {
    getPersons,
    getPersonalID,
    getPersonalByID,
    updatePersonalAction,
    insertPersonalAction
}