var express = require("express");
var router = express.Router(); //this allow us to use 'router' to create our routes for the app.
//requiring the DB model
var User = require("../models/userModel");
var bodyParser = require("body-parser");

var urlencodedParser = bodyParser.urlencoded({extended: true})


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
router.post('/budgetbuddy/sign_in', urlencodedParser, function(req, res){
	//search if user exists in database 
	User.find($and [{ email: req.body.email , password: req.body.password}], function (err, user){
		if(err) console.log ("User does not exist");
		else  res.render('home', { user: user})
	})
});

router.post('/budgetbuddy/sign_up', urlencodedParser, function(req, res){
	if ( User.find($and [{ email: req.body.email }])) console.log("user already exists");
	else {
		User.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName, 
			email: req.body.email,
			password: req.body.password
		});
	}
});

router.post('/budgetbuddy/home', function(req, res){
});
*/

//export file
module.exports = router;
