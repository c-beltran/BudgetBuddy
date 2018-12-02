var mongoose = require("mongoose");

//defining schema
var userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	account: {
		currBudget: Number
	},
	expenses: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Expense"
	}],
	goals:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Goal"
	}]

});

//compile into a model and save to a variable
//we can use this variable 'User' throughout
//the rest of the project.
var User = mongoose.model("User", userSchema);

//exporting schema
module.exports = User;