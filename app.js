const express = require("express");
const { MongoClient } = require("mongodb");

const username = encodeURIComponent("neko-editor");
const password = encodeURIComponent("A0z2yd4aTfgT1ejK");
const cluster = "soratobu-neko.dfafx.mongodb.net";
const app = express();
const port = 8080;

let uri =
  `mongodb+srv://${username}:${password}@${cluster}/`;

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const database = client.db("nce");
    const accounts = database.collection("account");
    const data = {username: "test"}

    const newAccount = await accounts.insertOne(data);
    app.get('/', (req, res) => {
        res.send(`inserted data with this id: ${newAccount.insertedId}`);
    });
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    });
  } finally {
    await client.close();
  }
}
run().catch(console.dir);