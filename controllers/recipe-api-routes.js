const db = require("../models");
var request = require('request');

module.exports = function(app) {

    app.get("/api/recipe", function(req, res){
        //get recipe
        //return res.JSON(recipe results)
    });

    app.post("/api/recipe", function(req, res){
        //add recipe
        //db.Recipe.create(...)
        //var newUrl = req.body.recipe_url
        var newUrl = "http://allrecipes.com/recipe/234610/cinnamon-oatmeal-bars/";
        var newHTML;

        request(newUrl, function(error, response, body) {

            // If the request was successful...
            if (!error && response.statusCode === 200) {
          
              // Then log the body from the site!
              console.log(body);
              newHTML = body;
            }
          });
    });

};