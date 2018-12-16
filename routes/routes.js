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

//Adding Expense
// router.post('/budgetbuddy/home/user/:id/exp', function(req, res){
// 	var newExpense = {
// 		item: req.body.description,
// 		price: req.body.amount,
//     	dateOfPurchase: req.body.date,
//     	category: " "
// 	}

// 	User.findById(req.params.id, function (err, user) {
//   		if (err) return handleError(err);

//   		user.expenses.push(newExpense);
//   		user.save(function (err, update) {
//     		if (err) return handleError(err);
//     		// res.send(update);
//     		// res.redirect('/budgetbuddy/home/'+user._id);
//   		});
// 	});
// });

router.post('/budgetbuddy/sign_in', function(req, res){
	//search if user exists in database
	User.find({$and: [{ email: req.body.email, password: req.body.password}]}, function (err, docs){
		if(err) console.log ("Error");
		else if (docs.length == 0) console.log("An account with this email does not exist");
		else{
			docs.isActive = true;
			res.redirect('/budgetbuddy/home/'+user._id);
			// console.log(JSON.stringify(docs.firstName));
		}
	});
});

router.post('/budgetbuddy/sign_up', function(req, res){
	//search database for email
	User.find({email: req.body.email},function (err,docs){
		//if there is an account with this email output it already exists, else create new user and direct to login page
		if (docs.length != 0) console.log("An account with this email already exists, please sign in " + docs);
		else {
			console.log("Creating a new user...");
			User.create({
				firstName: req.body.firstname,
				lastName: req.body.lastname, 
				email: req.body.email,
				password: req.body.password
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

	//search if user exists in database
	
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


/*
router.post('/budgetbuddy/home', function(req, res){
});
*/

//export file
module.exports = router;
