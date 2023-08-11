function makeUser({
    _id,
    username,
    kibizkey,
    masterkey,
}) {
    return {
        _id,
        username,
        kibizkey,
        masterkey,
    }
}

module.exports = {
    makeUser
}

