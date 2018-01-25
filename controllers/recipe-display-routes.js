const db = require("../models");

module.exports = function(app) {

    app.get("/recipe", function(req, res){
        //check that logged in. pass user_id to callback
        db.Recipe.findAll({}).then(function(result) {
            res.render("userhome", { recipe_data: result }); //goes to recipes.handlebars
        });
      });

  app.get("/recipe/:recipeId", function(req, res){
    db.Recipe.findOne({
      where: {
        id: req.params.recipeId
      },
      include: [
        { model: db.Ingredient },
        { model: db.Instruction}
      ]
    }).then(function(result) {
        console.log(result)
        //res.render("recipe", { recipe_data: result }); //goes to recipes.handlebars
        //res.json(result)
        //res.render("ingredientpage", {ingredients: [result], instructions: [result]});
        res.render("ingredientpage", { recipe_data: result });
    });
  });

  app.get("/recipe/edit/:recipeId", function(req, res){
    db.Recipe.findOne({
      where: {
        id: req.params.recipeId
      },
      include: [
        { model: db.Ingredient },
        { model: db.Instruction}
      ]
    }).then(function(result) {
        console.log(result)
        //res.render("recipe", { recipe_data: result }); //goes to recipes.handlebars
        //res.json(result)
        //res.render("ingredientpage", {ingredients: [result], instructions: [result]});
        res.render("edit", { recipe_data: result });
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