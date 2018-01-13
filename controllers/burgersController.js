var express = require("express");

var router = express.Router();
var burger = require("../models/burger.js");

// get route -> index
router.get("/", function(req, res) {
  res.redirect("/burgers");
});

router.get("/burgers", function(req, res) {
  burger.findAll({}).then(function(result) {
    return res.render("index", { burger_data: result });
  });
});

// If a user sends data to add a new burger...
router.post("/api/new", function(req, res) {
  // Take the request...
  var newBurger = req.body;

  // Then add the burger to the database using sequelize
  burger.create({
    burger_name: newBurger.burger_name
  }).then(function(result){
    console.log(result);
    res.redirect("/");
  });
});

// put route -> back to index
router.put("/burgers/:id", function(req, res) {

  burger.update(
    { devoured: 1 },
    { where: { id: req.params.id } }
  ).then(function(result){
    console.log(result);
    res.sendStatus(200);
  });

});

module.exports = router;
