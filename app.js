var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mysql = require('mysql');

//create a connectio with DB
var db = mysql.createConnection({
	host     : 'localhost',
  	user     : 'root',
  	password : '',
  	// database : 'my_db'
});

//connect
db.connect(function(err){
	if(err){
		console.log(err);
	}else{
		console.log("mysql db is connected");
	}
});

//route to create db table
// app.get('/createdb', function(req, res){
// 	var sqlDatabase = 'CREATE DATABE budgetApp';
// 	db.query(sqlDatabase, function(err, result){
// 		if(err){
// 			console.log(err);
// 		}else{
// 			console.log(result); //this prints the db structure
// 			res.send('Database Created Successfully!'); //you should see this message in your local browser localhost/3000/createdb
// 		}
// 	});

// });

app.listen(3000, function() {
	console.log("SERVER LISTENING ON PORT 3000 ... ");
})