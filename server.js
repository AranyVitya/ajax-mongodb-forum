var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();

var db;
var url = 'mongodb://localhost:27017/testajax';

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/messages', function(req, res){
	db.collection('messages').find().toArray(function(err, result) {
	res.send({messages:result});
	});
});

app.post('/messages', function(req, res){
	db.collection('messages').save(req.body, function (err, result) {
    if (err) return console.log(err);
    console.log("Save to database!");
    console.log('body: ' + JSON.stringify(req.body));
	res.send(req.body); //válasz a kliens felé
	});
});

MongoClient.connect(url, function (err, database) {
  	if (err) return console.log(err);
  	db = database;
	app.listen(PORT,function () {
		console.log('Server listening on' + PORT);
	});
});