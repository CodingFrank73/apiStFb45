
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

module.exports = {
    createPerson
}