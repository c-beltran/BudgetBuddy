var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

//defining schema
var expenseSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    item: String,
	price: Number,
    dateOfPurchase: String,
    category: String
});

//compile into a model and save to a variable
//we can use this variable 'Saver' throughout
//the rest of the project.
var Expense = mongoose.model("Expense", expenseSchema);

//exporting schema
module.exports = Expense;