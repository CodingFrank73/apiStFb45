const { ObjectId } = require('mongodb');
const { getDB } = require('./dbConnector');

const collectionName = 'user';

async function find(userName, kibizKey, masterKey) {

    const db = await getDB();
    const result = await db.collection(collectionName).findOne(
        { 
            $and: [
                {username: userName},
                {kibizkey: kibizKey},
                {masterkey: masterKey}
            ]
        }
        );
    return result
}

module.exports={
    find
}