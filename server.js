const express = require("express");
const bodyParser = require("body-parser");
//requring models for syncing
const db = require("./models");
//require('dotenv').config({path: __dirname + './config/.env'});
//we may need to figure out env variables for our local dbs

//sets up express app
var PORT = process.env.PORT || 8000;
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

//require DB's once setup

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//var routes = require("./controllers/burgers_controller.js");
//app.use(routes);

// Routes
// =============================================================
//require("./routes/html-routes.js")(app);
//require("./routes/author-api-routes.js")(app);
//require("./routes/post-api-routes.js")(app);
require("./controllers/burgers_controller.js")(app);

//syncs sequelize models and waits till update complete before starting server
db.sequelize.sync().then(function(){
  app.listen(PORT, function(){
    console.log("Listening on port: " + PORT);
  });
});

