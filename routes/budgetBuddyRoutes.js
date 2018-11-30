var express = require("express");
var router = express.Router(); //this allow us to use 'router' to create our routes for the app.
//requiring the DB model
var User = require("../models/userModel")

//this is the root route which will redirect to the Homepage
router.get('/', function(req, res){
	res.redirect('/budgetbuddy');
});

router.get('/budgetbuddy', function(req, res){
	// res.send("This is the Homepage");
	
	//this code searches through the DB and gives back all users info
	User.find({}, function(err, result){
		if(err){
			console.log("Failed to find all users.. ", err);
		}else{	//the first result can be named anything, the second is the one
			res.render('homepage', {result: result});
		}
	});
});

router.get('/budgetbuddy/sign_in', function(req, res){
	res.send("This is the Login Page");
});

router.get('/budgetbuddy/sign_up', function(req, res){
	res.send("This is the Sign Up Page");
});

router.get('/budgetbuddy/home', function(req, res){
	res.send("This is the user main page");
});

//all other pages end up here
router.get("*", function(req, res) {
	res.send("UNABLE TO FIND THIS ROUTE, SORRY :(");
});

//export file
module.exports = router;