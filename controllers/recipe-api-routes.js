const db = require("../models");
const request = require('request');
const cheerio = require('cheerio');

module.exports = function (app) {

    app.get("/api/recipe", function (req, res) {
        //get recipe
        //return res.JSON(recipe results)
    });

    // DELETES RECIPE
    app.delete("/api/recipes/:id", function (req, res) {
        db.Recipe.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (data) {
            console.log("recipe deleted")
            res.json(data);
        });
    });

    app.put("/api/recipes/update/:id", function (req, res) {
        db.Recipe.findOne({
            where: {
                id: req.params.id
            },
        }).then(function (data) {
            return data.update({
                recipe_checkbox: req.body.recipe_checkbox
            });
        }).then(function (record) {
            res.sendStatus(200);
        });
    });

    // PUT ROUTE FOR UPDATING POSTS
    app.put("/api/recipes/edit/:id", function (req, res) {
        db.Recipe.update({
            recipe_name: req.body.recipe_name,
        }, {
                where: {
                    id: req.params.id
                }
            }).then(function (dbPost) {
            console.log("Edited went through");
            res.json(dbPost);
        });
    });

    app.put("/api/ingredients/edit/:id", function (req, res) {
        console.log("*************");
        console.log(req.body);
        db.Ingredient.update({
            ingredient_info: req.body.ingredient_info,
        }, {
                where: {
                    id: req.params.id
                }
            }).then(function (dbPost) {
            console.log("Edited went through");
            res.json(dbPost);
        });
    });

    app.put("/api/instructions/edit/:id", function (req, res) {
        db.Instruction.update({
            instruction_info: req.body.instruction_info,
        }, {
                where: {
                    id: req.params.id
                }
            }).then(function (dbPost) {
            console.log("Edited went through");
            res.json(dbPost);
        });
    });

    app.post("/api/recipe", function (req, res) {
        //add recipe
        //db.Recipe.create(...)
        var newUrl = req.body.recipe_url;
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

function parseItempropIngredients($, recipeId) {
    var ingredientsArray = [];
    var jsonFound = false;

    //Look for JSON object in page
    $("script").each(function () {
        if ($(this).attr("type") === "application/ld+json") {
            if (JSON.parse($(this).html())["@type"] === "Recipe") {
                if (JSON.parse($(this).html())["recipeIngredient"]) {
                    ingredientsArray = JSON.parse($(this).html())["recipeIngredient"];
                    jsonFound = true;
                    console.log(ingredientsArray);
                } else
                    console.log("No Ingredients");
            } else
                console.log("No Recipe in JSON OBJ");
        } else
            console.log("No JSON Obj");
    });

    if (jsonFound && ingredientsArray.length) { //push objects with RecipeID
        for (let i = 0; i < ingredientsArray.length; i++) {
            ingredientsArray[i] = {
                ingredient_info: ingredientsArray[i],
                RecipeId: recipeId
            };
        }
    }

    if (!ingredientsArray.length) { //check that no JSON obj in page then continue parsing
        //$('[itemprop="ingredients"]')
        $('[itemprop]').map(function (i, el) { //get list of elements with itemprop attr
            // this === el 
            if ($(this).attr("itemprop").match(/ngredient/)) //all itemprops that match I/ingredient
                ingredientsArray.push({
                    ingredient_info: $(this).text(),
                    RecipeId: recipeId
                }); //pushes an object
        });
    }


    return ingredientsArray;
}

function parseItempropInstructions($, recipeId) {
    var instructionsArray = [];
    var instructionArrayClean = [];
    var jsonFound = false;

    //Look for JSON object in page
    $("script").each(function () {
        if ($(this).attr("type") === "application/ld+json") {
            if (JSON.parse($(this).html())["@type"] === "Recipe") {
                if (JSON.parse($(this).html())["recipeInstructions"]) {
                    instructionArrayClean = JSON.parse($(this).html())["recipeInstructions"].split(". ");
                    jsonFound = true;
                    console.log(instructionArrayClean);
                } else
                    console.log("No Instructions");
            } else
                console.log("No Recipe in JSON OBJ");
        } else
            console.log("No JSON Obj");
    });

    if (jsonFound && instructionArrayClean.length) { //push objects with RecipeID
        for (let i = 0; i < instructionArrayClean.length; i++) {
            instructionArrayClean[i] = {
                instruction_info: (i + 1) + ". " + instructionArrayClean[i] + ".",
                RecipeId: recipeId
            };
        }
    }

    if (!instructionArrayClean.length) { //if no JSON obj in page then continue parsing
        $('[itemprop]').map(function (i, el) { //get list of elements with itemprop attr
            // this === el
            if ($(this).attr("itemprop").match(/nstructions/)) { //all itemprops that match I/instructions
                console.log("instructionsArray: " + i + " : " + el + " : " + $(this).text().split('\n'));
                instructionsArray.push($(this).text().split('\n')); //split items by line breaks
            }
        });
    }

    var counter = 0;
    for (let i = 0; i < instructionsArray.length; i++) { //Run through array of arrays and put all instructions in order
        for (let j = 0; j < instructionsArray[i].length; j++) {
            console.log("original: " + instructionsArray[i][j].length);
            console.log("space removed: " + instructionsArray[i][j].replace(/\s\s+/g, ' ').length);
            if (instructionsArray[i][j].replace(/\s\s+/g, ' ').length > 20) {
                counter++;
                instructionArrayClean.push({
                    instruction_info: counter + ". " + instructionsArray[i][j],
                    RecipeId: recipeId
                });
            }
        }
    }
    return instructionArrayClean;
}

function cleanArray(array) {
    for (let i = 0; i < array.length; i++) {
        if (!array[i] || array[i].length < 5)
            remove(array, i);
    }
}

function remove(array, index) {

    if (index !== -1) {
        array.splice(index, 1);
    }
}