
function validateNewPersonal(personalObj){
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
        fuehrungszeugnisMitEintrag,
        warnings
        } = personalObj

        if(typeof aktenzeichen !== "string" || aktenzeichen.trim().length === 0){
            let error = {"code":3}
            return {error}
        }    

        if(typeof vorname !== "string" || vorname.trim().length === 0){
            let error = {"code":3}
            return {error}
        }

        if(typeof nachname !== "string" || nachname.trim().length === 0){
            let error = {"code":3}
            return {error}
        }

        if(typeof geburtstag !== "string" || geburtstag.trim().length === 0){
            let error = {"code":3}
            return {error}
        }

        return {}

}

function validateAusbildungen(){

    // let error ={"code":3, "message":"Problem mit Vorname", "schuesselAId":"", "schuesselBId":"", "von":"", "bis":""}
    //         warnings.push(error)
    //         return {"isValid":false, "content":personalObj}
}

function addWarningsToPersonalObj(personalObj){
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
        fuehrungszeugnisMitEintrag,
        warnings
        } = personalObj
}

module.exports={
    validateNewPersonal,
    validateAusbildungen,
    addWarningsToPersonalObj
}