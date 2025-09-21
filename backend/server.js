const express = require('express')
const app = express()
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
// Database Name
const dbName = 'passkeydb';
const port = 3000
app.use(bodyParser.json());
app.use(cors());
// Use connect method to connect to the server  

const db = client.db(dbName);
//get the data 
app.get('/', async (req, res) => {
    await client.connect();
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
})
//post the data
app.post('/', async (req, res) => {
    const password = req.body
    await client.connect();
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    console.log('Found documents =>', findResult);
    res.send({success: true , result: findResult});
})
//Delete the data
app.delete('/', async (req, res) => {
    const password = req.body
    await client.connect();
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    console.log('Found documents =>', findResult);
    res.send({success: true , result: findResult});
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
