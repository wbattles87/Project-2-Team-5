//const burger = require("../models/burger.js");
const db = require("../models");

module.exports = function(app) {

    app.get("/", function(result, request){
        request.redirect("/burgers");
    });

    app.get("/burgers", function(req, res) { //SEQUELIZED
        db.Burger.findAll({}).then(function(result) {
        return res.render("index", { burger_data: result });
        });
    });

    app.post("/burgers/create", function(req, res){
        db.Burger.create(req.body).then(function(dbBurger) {
            //res.json(dbBurger);
            res.redirect("/");
        });
        /*
        burger.add( req.body.burger_name, function(response){
            res.redirect("/");
        });
        */
    });

    app.put("/burgers/eat/:id", function(req, res){
        db.Burger.update(
            { devoured: 1 },
            { where: { id: req.params.id } }
          ).then(function(result){
            console.log(result);
            res.sendStatus(200);
          });
        
        /*burger.eat( req.params.id, function(response){
            console.log(response);
            //res.json(response);
            res.sendStatus(200);
        });*/
    });

};