const db = require("../models");
const request = require('request');
const cheerio = require('cheerio');

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
            if(error) throw error;

            // If the request was successful...
            if (response.statusCode === 200) {
            
                // Then log the body from the site!
               // console.log(body);
                newHTML = body;

                const $ = cheerio.load(newHTML);

                var array = [];

                $('.recipe-ingred_txt').map(function(i, el) {
                    // this === el 
                    array[i] = $(this).text();
                    //array[i] = $(this).attr("content");
                });
                console.log(array);
            }
        });


    });

};