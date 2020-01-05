// Dependencies
var express = require("express");
// var mongoose = require("mongoose");
// var expressHandlebars = require("express-handlebars");
// var bodyParser = require("body-parser");

// set up our port to be either the host's designated port or 3000
var PORT = process.env.PORT || 3000;

// Instantiate express app
var app = express();

// Set up express router
var router = express.Router();

// designate public folder as a static directory
app.use(express.static(__dirname + "/public"));

// connect handlebars to our express app
// app.engine(
//   "handlebars",
//   expressHandlebars({
//     defaultLayout: "main"
//   })
// );
// app.set("view engine", "handlebars");

// use bodyparser in our app
// app.use(
//   bodyParser.urlencoded({
//     extended: false
//   })
// );

// have every request got hrough out router middleware
app.use(router);

// listen to the port
app.listen(PORT, function() {
  console.log("Listening on port:" + PORT);
});
