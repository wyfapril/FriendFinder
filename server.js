var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = 4000;

app.use(bodyParser.json()); // express uses the middleware

app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/json"}));
app.use(bodyParser.utlencoded({extended: true}));
app.use(express.static(path.join(__dirname)));

app.get("/", function(req, res){
	res.send("Hello World!");
});


app.get("/yoda", function(req, res){
	res.json(yoda);
});

var yoda = {
	name: "Yoda",
	role: "Jedi Master",
	age: 900,
	forcePoints: 2000
};

app.get("/:characters", function(req, res){
	var chosen = req.params.characters;
	console.log(chosen); // console log the user input search term in the address
	res.end();
});



/////////////////////////

var characters = [
{
	name: "Yoda",
	role: "Jedi Master",
	age: 900,
	forcePoints: 2000
},
{
	name: "Obe Won",
	role: "Jedi Master",
	age: 50,
	forcePoints: 1000
},
{
	name: "Yoda",
	role: "Jedi Master",
	age: 900,
	forcePoints: 2000
},
	]

app.get("/api/:characters?", function(req, res){ // ? indicates the character parameter is optional
	var chosen = req.params.characters;
	if(chosen){
		console.log(chosen); // console log the user input search term in the address
		for(var i=0; i<characters.length; i++){
			if(chosen===characters[i].routeName){
				return res.json(characters[i]);
			}
		}
		return res.send("No character found!");
	}
	res.end();
});


app.get("/", function(req, res){
	res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/survey", function(req, res){
	res.sendFile(path.join(__dirname, "survey.html"));
});
