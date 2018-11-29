//required npm packages needed in order to develop application
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
//requiring the DB model
var Saver = require("./models/saverModel")

//this is our templating language which allows us to use JS in html
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//CONNECTING DBS
mongoose.connect("mongodb://localhost/budget_buddy", {
	useNewUrlParser: true
});

//adding a new member to db 
/* Saver.create({
	firstName: "TEST",
	lastName: "123", 
	email: "TEST@budgetbuddy.com",
	password: "password123", 
 	account :{ currBudget: 1000}
 }, function(err, saver){
 	if(err){
 		console.log("Error creating a saver: ", err);
 	}
 	console.log("Successfully created a saver!");
 	console.log(saver);
});
*/
//requiring ROUTES
var budgetbuddyRoutes = require("./routes/budgetbuddyRoutes");
app.use(budgetbuddyRoutes);

//this starts up our node server
app.listen(3000, function() {
	console.log("STARTED BUDGET BUDDY APP ON PORT 3000");
});