var express = require("express");
var router = express.Router(); //this allow us to use 'router' to create our routes for the app.
//requiring the DB model
var User = require("../models/userModel");
var bodyParser = require("body-parser");



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
			res.render('sample', {result: result});
		}
	});
});

router.get('/budgetbuddy/sign_in', function(req, res){
	res.render("login");
});

router.get('/budgetbuddy/sign_up', function(req, res){
	res.render("signup");
});

router.get('/budgetbuddy/home', function(req, res){
	res.render('home');
});

//all other pages end up here
router.get("*", function(req, res) {
	res.send("UNABLE TO FIND THIS ROUTE, SORRY :(");
});

/*
router.post('/budgetbuddy/sign_in', function(req, res){
	
});

router.post('/budgetbuddy/sign_up', function(req, res){
});

router.post('/budgetbuddy/home', function(req, res){
});
*/
//export file
module.exports = router;
