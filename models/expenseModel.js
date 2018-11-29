var mongoose = require("mongoose");

//defining schema
var expenseSchema = new mongoose.Schema({
	item: String,
	price: Number,
    dateOfPurchase: Date,
    category: String
});

//compile into a model and save to a variable
//we can use this variable 'Saver' throughout
//the rest of the project.
var Expense = mongoose.model("Expense", expenseSchema);

//exporting schema
module.exports = Expense;