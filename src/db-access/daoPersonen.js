const { ObjectId } = require('mongodb');
const { getDB } = require('./dbConnector');

const collectionName = 'person';

async function findAll() {
    const db = await getDB();
    const result = await db.collection(collectionName).find().toArray();
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
    findAll,
    findById,
    insert,
    update,
}