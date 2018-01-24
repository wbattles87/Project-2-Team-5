const db = require("../models");

module.exports = function(app) {

    app.get("/recipe", function(req, res){
        //check that logged in. pass user_id to callback
        db.Recipe.findAll({}).then(function(result) {
            res.render("recipes", { recipe_data: result }); //goes to recipes.handlebars
        });
      });


    app.get("/ingredient/:recipeId", function(req, res){
        db.Recipe.findOne({
        	where: {
        		id: req.params.recipeId
        	},
        	include: [db.Ingredient]

        }).then(function(result) {
          console.log(result)
            //res.render("recipe", { recipe_data: result }); //goes to recipes.handlebars
            res.json(result);
        });

    });

    app.get("/instruction/:recipeId", function(req, res){
        db.Recipe.findOne({
          where: {
            id: req.params.recipeId
          },
          include: [db.Instruction]

        }).then(function(result) {
          console.log(result)
            //res.render("recipe", { recipe_data: result }); //goes to recipes.handlebars
            res.json(result);
        });

    });
};

/*
db.Ingredients.findAll({
  where:{
    recipeId: req.params.id
  }
}).then(function(results){
  console.log()
})
*/

/*
module.exports = function(app) {
  // HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content
  // ---------------------------------------------------------------------------

  app.get("/recipe", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/recipe.html"));
  });

  app.get("/ingredient", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/ingredient.html"));
  });

	app.get("/instruction", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/instruction.html"));
  });

  // If no matching route is found default to home
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/reserve.html"));
  });
};


*/