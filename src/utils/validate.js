
function validateNewPersonal(personalObj){
    let isValid = true
    const {einrichtungId,
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
        } = personalObj

        if(typeof aktenzeichen !== "string" || aktenzeichen.trim().length === 0){
            return isValid = false
        }    

        if(typeof vorname !== "string" || vorname.trim().length === 0){
            return isValid = false
        }

        if(typeof nachname !== "string" || nachname.trim().length === 0){
            return isValid = false
        }

        if(typeof geburtsname !== "string" || geburtsname.trim().length === 0){
            return isValid = false
        }

        if(typeof geburtstag !== "string" || geburtstag.trim().length === 0){
            return isValid = false
        }

        return isValid

}

module.exports={
    validateNewPersonal
}