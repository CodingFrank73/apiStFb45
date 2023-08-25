
const { daoCommon } = require('../db-access');

function createPerson({
    _id,
    id,
    einrichtungId,
    aktenzeichen,
    vorname,
    nachname,
    geburtsname,
    geburtsjahr,
    geburtstag,
    geschlecht,
    staatsangehoerigkeit,
    staatsangehoerigkeitId,
    beschaeftigungsart,
    beschaeftigungsbeginn,
    beschaeftigungsende,
    fuehrungszeugnisLiegtVor,
    fuehrungszeugnisMitEintrag,
    ausgeschieden,
    stichtag,
    ausbildung = [],
    funktion = [],
    warnings = []
}) {

    //Pflichtfelder prüfen
    /* if (typeof vorname !== "string" || vorname.trim().length === 0) {
        throw new Error("vorname is required")
    } */

    return {
        _id,
        id,
        einrichtungId,
        aktenzeichen,
        vorname,
        nachname,
        geburtsname,
        geburtsjahr,
        geburtstag,
        geschlecht,
        staatsangehoerigkeit,
        staatsangehoerigkeitId,
        beschaeftigungsart,
        beschaeftigungsbeginn,
        beschaeftigungsende,
        fuehrungszeugnisLiegtVor,
        fuehrungszeugnisMitEintrag,
        ausgeschieden,
        stichtag,
        ausbildung,
        funktion,
        warnings
    }
}

async function createNewPersonal(personalItems) {
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
        fuehrungszeugnisLiegtVor = "nein",
        fuehrungszeugnisMitEintrag = "nein",
        ausgeschieden = "nein",
        stichtag,
        ausbildung = [],
        funktion = [],
        warnings = []
    } = personalItems

    try {
        if (typeof vorname !== "string" || vorname.trim().length === 0) {
            let err = new Error('Vorname ist ein Pflichtfeld');
            err.status = 600
            throw err
        }

        if (typeof nachname !== "string" || nachname.trim().length === 0) {
            let err = new Error("Nachname ist ein Pflichtfeld")
            err.status = 600
            throw err
        }

        //Bezeichung der Staatsangehörigkeit anhand der StaatsangehörigkeitId ermitteln
        const objStaatsangehoerigkeit = await daoCommon.findStaatByIndKey(staatsangehoerigkeitId)
        const { keybez } = objStaatsangehoerigkeit
        const staatsangehoerigkeit = keybez

        return {
            synchronisieren,
            einrichtungId,
            aktenzeichen,
            vorname,
            nachname,
            geburtsname,
            geburtstag,
            geschlecht,
            staatsangehoerigkeit,
            staatsangehoerigkeitId,
            beschaeftigungsart,
            beschaeftigungsbeginn,
            fuehrungszeugnisLiegtVor,
            fuehrungszeugnisMitEintrag,
            ausgeschieden,
            stichtag,
            ausbildung,
            funktion,
            warnings
        }

    } catch (error) {
        //return error
        //console.log("Person.js: ",error)
        res.status(500).json({ error: error.message || "Unknown error while registering new user." })
    }


}


module.exports = {
    createPerson,
    createNewPersonal
}