const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://nosqlpractice.gfa9bh0.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority&ssl=true&sslValidate=false"

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/companies');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(url);

  if(err) { return console.log(err); return;}
  var dbo = db.db("library");
  var collection = dbo.collection('companies');
  console.log("Success!");

  rows.forEach((row) => {
    const [name, ticker, price] = row.split(',');
    collection.insertOne(
    {          
      name,
      ticker,
      price: parseFloat(price),
    });
    });

    db.close();
  }