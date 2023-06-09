const { ObjectId } = require('mongodb');
const { getDB } = require('./dbConnector');

const collectionName = 'personal';

async function findId(vorname, nachname, geburtsjahr, einrichtungId, aktenzeichen) {

    let filterConditions = {
        'vorname': `${vorname}`,
        'nachname': `${nachname}`,
        'geburtsjahr': `${geburtsjahr}`,
        'einrichtungId': `${einrichtungId}`,
        'aktenzeichen': `${aktenzeichen}`
    }

    for (var i in filterConditions) {
        if (filterConditions[i] == 'undefined') {
            delete filterConditions[i]
        }
    }

    const db = await getDB();
    const result = await db.collection(collectionName).find(filterConditions).toArray();
    return result
}

async function findById(id) {
    const db = await getDB();
    const result = await db.collection(collectionName).findOne({ id: Number(id) });
    return result
}

async function insert(person) {
    const db = await getDB();
    const result = await db.collection(collectionName).insertOne(person);
    return result
}

async function update(userId, updatedInfo) {
    const db = await getDB();
    const result = await db.collection(collectionName).updateOne(
        { _id: new ObjectId(userId) },
        { $set: updatedInfo }
    )
    return result
}

module.exports = {
    findId,
    findById,
    insert,
    update,
}