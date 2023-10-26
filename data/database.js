const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDb(){
const client = await MongoClient.connect('mongodb://localhost:27017');
database = client.db('onlineShop');
}

function getDb(){
    if(!database){
        throw new Error ({
            message:'You must connect to databse first'
        })
    }
    return database
}

module.exports={
    connectToDb:connectToDb,
    getDb:getDb
}