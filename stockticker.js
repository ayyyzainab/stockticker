const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://nosqlpractice.gfa9bh0.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority"

MongoClient.connect(url, function(err, db) 
{
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
});

