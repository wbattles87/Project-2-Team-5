const db = require("../models");

module.exports = function(app) {

    app.get("/", function(req, res){
        console.log(res);
        //res.sendFile(__dirname + "../public/home-test.html"); 
        res.render("index", { recipe_data: { id:"1", recipe_name: "TEST RECIPE" } });
        //something like this. Need to convert home-test to use handlebars
    });

};