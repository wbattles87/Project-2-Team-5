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
        var newUrl = req.body.recipe_url;
        console.log(req.body);
        //var newUrl = "http://allrecipes.com/recipe/234610/cinnamon-oatmeal-bars/";
        
        /*db.User.create({
            user_email: "TEST EMAIL",
            user_password: "TEST PASS"
        }).then(function(response){
            console.log(response);
            console.log("User datavalues id: " + response.dataValues.id);

            db.Recipe.create({
                recipe_url: "TEST URL",
                recipe_name: "TEST NAME",
                UserId: response.dataValues.id //UserID just inserted
            }).then(function(response){
                console.log(response);
                db.Ingredient.create({
                    ingredient_info: "THIS IS A TEST",
                    RecipeId: response.dataValues.id //RecipeID just inserted
                }).then(function(response){
                    console.log(response);
                }); 
            }); 
        }); */

        request(newUrl, function(error, response, body) {
            if(error) throw error;

            // If the request was successful...
            if (response.statusCode === 200) {
                const $ = cheerio.load(body); //load HTML into cheerio

                console.log(parseItempropIngredients($));

                console.log(parseItempropInstructions($));

                db.Recipe.create( { 
                    recipe_url:newUrl,
                    recipe_name: "Recipe Name " + Math.random(2),
                    UserId: 1 //Test User
                 } )
                .then(function(response){
                    var recipeId = response.dataValues.id;
                    db.Ingredient.bulkCreate( parseItempropIngredients($, recipeId), { individualHooks: true } )
                    .then(function(response){
                        db.Instruction.bulkCreate( parseItempropInstructions($, recipeId), { individualHooks: true } )
                        .then(function(response){
                            res.json(response);
                        })
                        .catch(function(error){
                            res.json(error);
                        });
                    })
                    .catch(function(error){
                        res.json(error);
                    });


                }).catch(function(error){
                    res.json(error);
                });
                
               
            } //end succesfull response
        });


    });

};

function parseItempropIngredients($, recipeId){
    var ingredientsArray = [];
    $('[itemprop]').map(function(i, el) { //get list of elements with itemprop attr
        // this === el 
        if($(this).attr("itemprop").match(/ngredient/)) //all itemprops that match I/ingredient
            ingredientsArray.push( { ingredient_info: $(this).text(), RecipeId: recipeId } ); //pushes an object
    });
    return ingredientsArray;
}

function parseItempropInstructions($, recipeId){
    var instructionsArray = [];
    var instructionArrayClean = [];

    $('[itemprop]').map(function(i, el) { //get list of elements with itemprop attr
        // this === el
        if($(this).attr("itemprop").match(/nstructions/)){ //all itemprops that match I/instructions
          instructionsArray.push( $(this).text().split('\n') ); //split items by line breaks
        }
    });

    var counter=0;
    for(let i=0; i<instructionsArray.length; i++){ //Run through array of arrays and put all instructions in order
      for(let j=0; j<instructionsArray[i].length; j++){
        if(instructionsArray[i][j].length){
          counter++;
          instructionArrayClean.push( { 
              instruction_info: counter + ". " + instructionsArray[i][j] ,
              RecipeId: recipeId
            } );
        }
      }
    }
    return instructionArrayClean;
}