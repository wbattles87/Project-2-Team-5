const db = require("../models");

module.exports = function(app) {

    app.get("/api/instructions/:id", function(req, res){
        //get instructions
        db.Instruction.findAll({
            where: {
                RecipeId: req.params.id
            }
        }).then(function (data) {
            console.log(data);
            res.json(data);
        });
    });

    app.post("/api/instructions", function(req, res){
        //add instructions
        console.log(req.body);
        db.Instruction.create(req.body).then(function (Instruction) {
            res.json(Instruction); //Says RecipeId cannot be null...even when there's a number.
        });
    });
};