const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const user = process.env.DB_USER;
const pw = process.env.DB_USER_PW;
const databaseName = process.env.DB_NAME;

console.log(user)

const url = `mongodb+srv://${user}:${pw}@cluster0.xc7s8.mongodb.net/${databaseName}?retryWrites=true&w=majority`

const client = new MongoClient(url);

let dbRef;

const getDB = async () => {

    if (dbRef) { return dbRef }

    try {
        const connectedClient = await client.connect();
        const db = connectedClient.db(databaseName);
        dbRef = db;
        return db

    } catch (error) {
        console.log(error);
        throw { err: 'Keine Verbindung zur Datenbank möglich' }
    }
}

module.exports = {
    getDB
}