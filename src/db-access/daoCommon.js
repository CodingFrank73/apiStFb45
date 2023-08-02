const { ObjectId } = require('mongodb');
const { getDB } = require('./dbConnector');

async function findStaatangehoerigkeitById(staatsangehoerigkeitId) {
    const db = await getDB();
    const result = await db.collection("staatsangehoerigkeit").findOne({indkey : Number(staatsangehoerigkeitId)}, {projection: {_id:0, keybez:1}})
    return result.keybez
}

module.exports = {
    findStaatangehoerigkeitById
}