const db = require("../models");

module.exports = function(app) {

    app.get("/recipes", function(res, req){
        //check that logged in. pass user_id to callback
        db.Recipe.findAll({}).then(function(result) {
            res.render("recipe", { recipe_data: result }); //goes to recipes.handlebars
        });
    });

};