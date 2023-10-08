
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

function createNewPersonal({
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
    ausgeschieden = "Nein",
    stichtag,
    ausbildung = [],
    funktion = [],
    warnings = []
}) {
    try {
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
    createPerson,
    createNewPersonal
}