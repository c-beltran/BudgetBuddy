//required npm packages needed in order to develop application
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");

//this is our templating language which allows us to use JS in html
app.set("view engine", "ejs");

//defining schema


//compile into a model and save to a variable
//we can use this veriable to use it throughout
//the rest of the project.

//adding a new member to db Cat{ : }

//save to db
//george.save(Callback func);

//does the job of creating and save
// Cat.create({
// 	name: "snow",...
// }, function(err, result){
// 	if(err){
// 		console.log(err);
// 	}
// 	console.log(result);
// });