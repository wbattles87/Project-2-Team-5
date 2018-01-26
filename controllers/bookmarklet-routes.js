const db = require("../models");
const request = require('request');
const cheerio = require('cheerio');

module.exports = function (app) {

    app.get("/api/bookmarklet", function (req, res) {
        //add recipe
        //db.Recipe.create(...)
        console.log("req.params.recipe_url " + req.params.recipe_url);
        var newUrl = req.params.recipe_url;
        //console.log(req.body);
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

        request(newUrl, function (error, response, body) {
            if (error) throw error;

            // If the request was successful...
            if (response.statusCode === 200) {
                const $ = cheerio.load(body); //load HTML into cheerio

                //console.log(parseItempropIngredients($));

                //console.log(parseItempropInstructions($));

                db.User.findOrCreate({ //REMOVE THIS WHEN USER LOGIN WORKS
                    where: {
                        id: '1'
                    },
                    defaults: {
                        user_email: 'AUTOCREATED@EMAIL',
                        user_password: "AUTO CREATED PASS"
                    }
                }).then(function (responseUser) {
                    //console.log(response);

                    db.Recipe.create({
                            recipe_url: newUrl,
                            recipe_name: $("title").text().trim().substr(0, 60),
                            UserId: 1 //Test User
                        })
                        .then(function (responseRecipe) {
                            var recipeId = responseRecipe.dataValues.id; //user reicpe id of ingr and instr

                            var ingredsArrayTemp = parseItempropIngredients($, recipeId);
                            if (!ingredsArrayTemp.length) { //check if no ingreds
                                ingredsArrayTemp[0] = {
                                    ingredient_info: "No Ingredients Detected",
                                    RecipeId: recipeId
                                };
                            }
                            db.Ingredient.bulkCreate(ingredsArrayTemp, {
                                    individualHooks: true
                                })
                                .then(function (responseIngredient) {
                                    var instructionsArrayTemp = parseItempropInstructions($, recipeId);
                                    if (!instructionsArrayTemp.length) { //check if no instructions
                                        instructionsArrayTemp[0] = {
                                            instruction_info: "No Instructions Detected",
                                            RecipeId: recipeId
                                        };
                                    }
                                    db.Instruction.bulkCreate(instructionsArrayTemp, {
                                            individualHooks: true
                                        })
                                        .then(function (responseInstruction) {
                                            var bigObject = {
                                                recipe: responseRecipe,
                                                ingredients: responseIngredient,
                                                instructions: responseInstruction
                                            };
                                            //console.log(bigObject);
                                            /*res.json( { 
                                                recipeId: responseRecipe.id,
                                                recipeName: responseRecipe.recipe_name,
                                                recipeUrl: `/recipe/${responseRecipe.id}`
                                            });*/ //returns Response object
                                            res.redirect(`/recipe/${responseRecipe.id}`);

                                        })
                                        .catch(function (error) {
                                            res.json(error);
                                        });
                                })
                                .catch(function (error) {
                                    res.json(error);
                                });


                        }).catch(function (error) {
                            res.json(error);
                        });

                });


            } //end succesfull response
        });


    });

};