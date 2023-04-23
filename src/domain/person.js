
function createPerson({
    _id,
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
    beschaeftigungsende = null,
    fuehrungszeugnisLiegtVor = false,
    fuehrungszeugnisMitEintrag = false,
    ausgeschieden = false,
    ausbildung = [],
    funktion = [],
    warnings = []
}) {

    //Pflichtfelder prüfen
    if (typeof vorname !== "string" || vorname.trim().length === 0) {
        throw new Error("vorname is required")
    }

    return {
        _id,
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
        beschaeftigungsende,
        fuehrungszeugnisLiegtVor,
        fuehrungszeugnisMitEintrag,
        ausgeschieden,
        ausbildung,
        funktion,
        warnings
    }
}

module.exports = {
    createPerson
}