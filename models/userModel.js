var mongoose = require("mongoose");

//defining schema
var userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	isActive: Boolean,
	account: {
		currBudget: Number
	},
	expenses: [{
		item: String,
		price: Number,
    	dateOfPurchase: String,
    	category: String
	}],
	goals:[{
		description: String,
		date: String,
		amount: Number
	}]
});

//compile into a model and save to a variable
//we can use this variable 'User' throughout
//the rest of the project.
var User = mongoose.model("User", userSchema);

//exporting schema
module.exports = User;