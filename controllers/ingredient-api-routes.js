const db = require("../models");

module.exports = function (app) {

    app.get("/api/ingredients/:id", function (req, res) {
        //get ingredients
        db.Ingredient.findAll({
            where: {
                RecipeId: req.params.id
            }
        }).then(function (data) {
            console.log(data);
            res.json(data);
        });
    });

    app.post("/api/ingredients", function (req, res) {
        //add ingredients
        console.log(req.body);
        db.Ingredient.create(req.body).then(function (Ingredient) {
            res.json(Ingredient); //Says RecipeId cannot be null...even when there's a number.
        });
    });

    app.put("/api/ingredients/got/:id", function (req, res) {
        console.log(req.body.ingredient_checkbox);
        db.Ingredient.update({
            ingredient_checkbox: req.body.ingredient_checkbox,
        }, {
                where: {
                    id: req.params.id
                }
            }).then(function (dbPost) {
            console.log("Made");
            res.json(dbPost);
        });
    });
};