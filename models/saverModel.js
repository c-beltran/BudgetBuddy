var mongoose = require("mongoose");

//defining schema
var saverSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	account: {
		//will this create a separate ID for it?
		currBudget: Number
	}
});

//compile into a model and save to a variable
//we can use this variable 'Saver' throughout
//the rest of the project.
var Saver = mongoose.model("Saver", saverSchema);

//exporting schema
module.exports = Saver;