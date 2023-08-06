const { ObjectId } = require('mongodb');
const { getDB } = require('./dbConnector');

async function findStaat() {
    const db = await getDB();
    const result = await db.collection("staatsangehoerigkeit").find().toArray()
    return result
}

async function findStaatByIndKey(indkey) {
    console.log (indkey)
    const db = await getDB();
    const result = await db.collection("staatsangehoerigkeit").findOne({indkey : Number(indkey)}, {projection: {_id:0, keybez:1}})
    return result
}

module.exports = {
    findStaat,
    findStaatByIndKey
}