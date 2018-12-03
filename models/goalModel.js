var mongoose = require("mongoose");

//defining schema
var goalSchema = new mongoose.Schema({
	description: String,
	date: String,
	amount: Number
});

//compile into a model and save to a variable
//we can use this variable 'Saver' throughout
//the rest of the project.
var Goal = mongoose.model("Goal", goalSchema);

//exporting schema
module.exports = Goal;