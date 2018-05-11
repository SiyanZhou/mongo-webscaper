
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mongoose = require("mongoose");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

var MONGODB_URI = "mongodb://Siyan:database@ds119820.mlab.com:19820/heroku_8dqnz7k3";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
try {
mongoose.connect(MONGODB_URI);
console.log("connect to mango");
}
catch (e) {
  console.log(e);
}

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, '/public')));

// Set Handlebars.

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);



// db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
// });
