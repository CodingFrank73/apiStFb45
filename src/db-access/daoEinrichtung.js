const { ObjectId } = require('mongodb');
const { getDB } = require('./dbConnector');

const collectionName = 'einrichtung';

async function findByLjaAz(aktenzeichen) {
    const db = await getDB();
    const result = await db.collection(collectionName).findOne({ aktenzeichen: aktenzeichen });
    return result
}

module.exports = {
    findByLjaAz
}