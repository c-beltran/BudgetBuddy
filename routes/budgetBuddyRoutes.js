var express = require("express");
var router = express.Router(); //this allow us to use 'router' to create our routes for the app.

//this is the root route which will redirect to the Homepage
router.get('/', function(req, res){
	res.redirect('/bubgetbuddy');
});

router.get('/bubgetbuddy', function(req, res){
	res.send("This is the Homepage");
});

//all other pages end up here
router.get("*", function(req, res) {
	res.send("UNABLE TO FIND THIS ROUTE, SORRY :(");
});

//export file
module.exports = router;