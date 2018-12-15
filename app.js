//required npm packages needed in order to develop application
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
//var formidable =  require('express-formidable'); //allow for form data (bodyparser does not account for this)

//requiring the DB model
var User = require("./models/userModel");
var Expenses = require("./models/expenseModel");
var Goals = require("./models/goalModel");

//db variables, heroku environment variables
var env = process.env.NODE_ENV || 'dev';
var dbURI = (env == 'dev')? 'mongodb://localhost/budget_buddy' : process.env.MONGODB_URI;

//this is our templating language which allows us to use JS in html
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
//app.use(formidable());

//CONNECTING DBS
mongoose.connect(dbURI, {
	useNewUrlParser: true
});

//********* UNCOMMENT THE BELOW CODE IF YOU LIKE TO ADD A USER TO DB **************
//adding a new user to db 

// User.create({
// 	firstName: "Test",
// 	lastName: "User", 
// 	email: "userC@budgetbuddy.com",
// 	password: "password123", 
// 	account: { currBudget: 500},
// 	expenses: [{
// 		item: "New Iphone X",
// 		price: 1100,
// 		dateOfPurchase: "12/1/2018",
// 		category: "Utility"},
// 		{item: "Grocery",
// 		price: 100,
// 		dateOfPurchase: "12/15/2018",
// 		category: "Food"
// 	}],
// 	goals: [{ 
// 		description: "Save for Christmas shoppping",
// 		date: "12/20/2018",
// 		amount: 200 },
// 		{ description: "Save to buy a car",
// 		date: "10/05/2019",
// 		amount: 20000
// 	}]
// });


//requiring ROUTES
var budgetbuddyRoutes = require("./routes/routes.js");
app.use('/', budgetbuddyRoutes);

//this starts up our node server
app.listen(process.env.PORT || 8000, function() {
	console.log("STARTED BUDGET BUDDY APP ON PORT 8000");
});