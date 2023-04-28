const {MongoClient} = require('mongodb');
const http = require('http');
const fs = require('fs');
const { parse } = require("csv-parse");
const formidable = require('formidable');

async function main(filepath) {
	console.log("Made it to main function");

    const url = process.env.MONGODB_URI;
    const client = new MongoClient(url);

    try {
        var database = client.db("companies");
        var collections = database.collection("companies");
        var stocks = [];

        fs.createReadStream(filepath)
          .pipe(parse({ delimiter: ",", from_line: 2 }))
          .on('data', function (row) {
            var stock = { name: row[0], ticker: row[1], price: row[2] };
            stocks.push(stock);
          })
          .on("end", function() {
            collections.insertMany(stocks);
            client.close();
          });
    } catch (e) {
        console.error(e);
    }
}
	
http.createServer(function (req, res) {
	  
    if (req.url == "/process") {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            if (Object.keys(files).length === 0) {
                res.write("Error: No file uploaded");
                return res.end();
            }
            var tempFilePath = files.filetoupload.filepath;
            var projectFilePath = __dirname + '/uploads/' + files.filetoupload.originalFilename;
            fs.rename(tempFilePath, projectFilePath, function (err) {
                if (err) throw err;
                res.write('File has been uploaded!');
                main(projectFilePath);
                res.end();
            });
        });
    }
    else {
        fs.readFile('index.html', (err, html) => {
            if (err) {
                throw err;
            }
            res.setHeader('Content-type', 'text/html');
            res.write(html);
            res.statusCode = 200;
            res.end();
        });
    }
}).listen(process.env.PORT || 8080);
