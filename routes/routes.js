var express = require("express");
var router = express.Router(); //this allow us to use 'router' to create our routes for the app.
//requiring the DB model
var User = require("../models/userModel");

//this is the root route which will redirect to the Homepage
router.get('/', function(req, res){
	res.redirect('/budgetbuddy');
});

//route for homepage
router.get('/budgetbuddy', function(req, res){
	// res.send("This is the Homepage");
	res.render("homepage");
	
});

//route for login page
router.get('/budgetbuddy/sign_in', function(req, res){
	res.render("login");
});

//route for sign up page
router.get('/budgetbuddy/sign_up', function(req, res){
	res.render("signup");
});

//route for user main activity page
router.get('/budgetbuddy/home/:id', function(req, res){
	User.findById(req.params.id, function (err, user) {
		if (err) return handleError(err);
		res.render('home', {user: user});
	});
});

// Adding Expense
router.post('/budgetbuddy/home/:id/expenses', function(req, res){
	//date logic
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) { dd = '0'+dd } 
	if(mm<10) { mm = '0'+mm } 

	today = mm + '/' + dd + '/' + yyyy;
	
	//createing an object to push to db
	var newExpense = {
		description: req.body.description,
		amount: req.body.amount,
    	dateOfPurchase: today,
    	category: req.body.categorySelection
	}

	User.findById(req.params.id, function (err, user) {
  		if (err) return handleError(err);

  		user.expenses.push(newExpense);
  		user.save(function (err, update) {
    		if (err) return handleError(err);
    		res.redirect('back');
  		});
	});
});

router.post('/budgetbuddy/home/:id/goals', function(req, res){
	
	//creating an object to push to db
	var newGoal = {
		description: req.body.description,
		amount: req.body.amount,
    	date: req.body.date
	}

	User.findById(req.params.id, function (err, user) {
  		if (err) return handleError(err);

  		user.goals.push(newGoal);
  		user.save(function (err, update) {
    		if (err) return handleError(err);
    		res.redirect('back');
  		});
	});
});

router.post('/budgetbuddy/home/:id/updateBudget', function(req, res){
	//creating an object to push to db

	User.findById(req.params.id, function (err, user) {
  		if (err) return handleError(err);

  		user.currentBudget = req.body.newBudget;
  		user.save(function (err, update) {
    		if (err) return handleError(err);
			res.redirect('back');
  		});
	});
});

router.post('/budgetbuddy/sign_in', function(req, res){
	//search if user exists in database
	User.find({$and: [{ email: req.body.email, password: req.body.password}]}, function (err, docs){
		if(err) console.log ("Error");
		else if (docs.length == 0){
			console.log("An account with this email does not exist");
			res.redirect('back');
		} 
		else{
			User.find({email: req.body.email}, function (err, user){
				var userID = "";
				if(err) console.log ("Error");
				// else if (user.length == 0) console.log("An account with this email does not exist \n");
				else{
					user.isActive = true;
					user.map(function(foundUser){
						userID = foundUser._id
					});
					res.redirect('/budgetbuddy/home/'+userID);
				}
			});
			console.log("User logged in Successfully!")
		}
	});
});

router.post('/budgetbuddy/sign_up', function(req, res){
	//search database for email
	User.find({email: req.body.email},function (err,docs){
		//if there is an account with this email output it already exists, else create new user and direct to login page
		if (docs.length != 0){
			console.log("An account with this email already exists, please sign in ");
			res.redirect('back');
		} 
		else {
			console.log("Creating a new user...");
			User.create({
				firstName: req.body.firstname,
				lastName: req.body.lastname, 
				email: req.body.email,
				password: req.body.password,
				currentBudget: 0,
			}, function(err, result){
				if(err) return handleError(err);
				else{
					User.find({email: req.body.email}, function (err, user){
						var userID = "";
						if(err) console.log ("Error");
						// else if (user.length == 0) console.log("An account with this email does not exist \n");
						else{
							user.isActive = true;
							user.map(function(foundUser){
								userID = foundUser._id
							});
							res.redirect('/budgetbuddy/home/'+userID);
						}
					});
				}
			});
			console.log("User Created Successfully :)");
		}
	});	
});


//all other pages end up here
router.get("*", function(req, res) {
	res.send("UNABLE TO FIND THIS ROUTE, SORRY :(");
});

/*============SAMPLE ROUTE================*/
router.get('/budgetbuddy/sample', function(req, res){
	//this code searches through the DB and gives back all users info
	User.find({}, function(err, result){
	if(err){
		console.log("Failed to find all users.. ", err);
		}else{	//the first result can be named anything, the second is the one
			res.render('sample', {result: result});
		}
	});
});


//export file
module.exports = router;
