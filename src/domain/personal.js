
const { daoCommon } = require('../db-access');

async function createNewPersonal({
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
    fuehrungszeugnisMitEintrag,
    ausgeschieden = "Nein",
    stichtag,
    ausbildung = [],
    funktion = [],
    warnings = []
}) {
    try {
        const staatsangehoerigkeit = await daoCommon.findStaatByIndKey(staatsangehoerigkeitId)

        return {
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
        return error
        //console.log("Person.js: ",error)
        //res.status(500).json({ error: error.message || "Unknown error while registering new user." })
    }

    
}

module.exports = {
    createNewPersonal
}