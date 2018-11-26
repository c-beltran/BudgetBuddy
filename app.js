const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require('mysql');

const connection = mysql.createConnection({
	host     : 'localhost',
  	user     : 'userRoot',
  	password : 'password',
  	// database : 'my_db'
});

connection.connect();


app.listen(3000, function() {
	console.log("SERVER LISTENING ON PORT 3000 ... ");
})