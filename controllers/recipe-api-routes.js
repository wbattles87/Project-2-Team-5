const db = require("../models");

module.exports = function(app) {

    app.get("/api/recipe", function(req, res){
        //get recipe
        //return res.JSON(recipe results)
    });

    app.post("/api/recipe", function(req, res){
        //add recipe
        //db.Recipe.create(...)
    });

};