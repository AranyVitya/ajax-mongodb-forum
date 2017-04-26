//inicializáltam pár fontos package-t
var express = require('express');	//ez egy web application framework, segít egy egyszerű webszervert létrehozni
var bodyParser = require('body-parser');   //ez egy NOSQL adatbázis
var MongoClient = require('mongodb').MongoClient;	// az express nem kezeli az adatok olvasását a <form> html elemből, ezért van szükség erre a middleware cuccra
var app = express();

var db;
var url = 'mongodb://localhost:27017/testajax';

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

//GET kérésre válaszol a kliens felé
app.get('/messages', function(req, res){
	db.collection('messages').find().toArray(function(err, result) {
	res.send({messages:result});
	});
});
//itt jön létre a "messages" tábla, majd ebbe mentődik az adat
app.post('/messages', function(req, res){
	db.collection('messages').save(req.body, function (err, result) {
    if (err) return console.log(err);
    console.log("Save to database!");
    console.log('body: ' + JSON.stringify(req.body));
	res.send(req.body); //válasz a kliens felé
	});
});

//adatbázis csatlakozzása
MongoClient.connect(url, function (err, database) {
  	if (err) return console.log(err);
  	db = database;
	app.listen(PORT,function () {
		console.log('Server listening on' + PORT);
	});
});