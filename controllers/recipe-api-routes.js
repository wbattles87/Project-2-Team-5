const db = require("../models");

module.exports = function(app) {

    app.get("/api/recipe", function(res, req){
        //get recipe
        //return res.JSON(recipe results)
    });

    app.post("/api/recipe", function(res, req){
        //add recipe
        //db.Recipe.create(...)
    });

};