//required npm packages needed in order to develop application
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
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

//CONNECTING DBS
mongoose.connect(dbURI, {
	useNewUrlParser: true
});

//********* UNCOMMENT THE BELOW CODE IF YOU LIKE TO ADD A USER TO DB **************
//adding a new user to db 
//  User.create({
// 	firstName: "TEST User",
// 	lastName: "123", 
// 	email: "TEST@budgetbuddy.com",
// 	password: "password123", 
//  	account :{ currBudget: 1000}
//  }, function(err, user){
//  	if(err){
//  		console.log("Error creating a user: ", err);
//  	}else{
//  		console.log("Successfully created a user!");
//  		console.log(user);
//  		Expenses.create({
//  			user_id: user._id,
// 		    item: "New Iphone X",
// 			price: 1100,
// 		    dateOfPurchase: "12/1/2018",
// 		    category: "Utility"
//  		}, function(err, exp){
//  			if(err){
//  				console.log("expenses err " + err);
//  			}else{
//  				console.log("Expense created! " + exp);
//  				Goals.create({
//  					user_id: user._id,
// 					description: "Save for Christmas shoppping",
// 					date: "12/20/2018",
// 					amount: 200
//  				}, function(err, goal){
//  					if(err){
//  						console.log("goal error " + err);
//  					}else{
//  						user.goals.push(goal);
//  						user.expenses.push(exp);
//  						console.log("goal created!" + goal)
//  						user.save();
//  					}
//  				});
//  			}
//  		});
//  	}
// });

//requiring ROUTES
var budgetbuddyRoutes = require("./routes/routes.js");
app.use('/', budgetbuddyRoutes);

//this starts up our node server
app.listen(process.env.PORT || 8000, function() {
	console.log("STARTED BUDGET BUDDY APP ON PORT 8000");
});