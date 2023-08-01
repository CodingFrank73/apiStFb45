
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

function createNewPersonal({
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
    fuehrungszeugnisMitEintrag = "nein"
}) 
{
    try {
        if(typeof vorname !== "string" || vorname.trim().length === 0){
            throw new Error("Vorname ist ein Pflichtfeld")
        }
    
        if(typeof nachname !== "string" || nachname.trim().length === 0){
            throw new Error("Vorname ist ein Pflichtfeld")
        }
    
        synchronisieren ="ja"
        
        return {
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
            // ausgeschieden,
            // stichtag,
            // ausbildung,
            // funktion,
            // warnings
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message || "Unknown error while registering new user." })
    }

    
}


module.exports = {
    createPerson,
    createNewPersonal
}