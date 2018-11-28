//required npm packages needed in order to develop application
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");

//this is our templating language which allows us to use JS in html
app.set("view engine", "ejs");

//CONNECTING DBS
mongoose.connect("mongodb://localhost/budget_buddy", {
	useNewUrlParser: true
});

//defining schema
var saverSchema = new mongoose.Schema({
	name: String,
	email: String,
	currBudget: Number
});


//compile into a model and save to a variable
//we can use this variable 'Saver' throughout
//the rest of the project.
var Saver = mongoose.model("Saver", saverSchema);

//adding a new member to db
// Saver.create({
// 	name: "Carlos",
// 	email: "Carlos@budgetbuddy.com",
// 	currBudget: 1000
// }, function(err, saver){
// 	if(err){
// 		console.log("Error creating a saver: ", err);
// 	}
// 	console.log("Successfully created a saver!");
// 	console.log(saver);
// });

//requiring ROUTES
const tutoringCenterRoutes = require("./routes/budgetbuddyRoutes");
app.use(tutoringCenterRoutes);

//this starts up our node server
app.listen(3000, function() {
	console.log("STARTED BUDGET BUDDY APP ON PORT 3000");
});