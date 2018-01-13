// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Character" model that matches up with DB
var Burger = sequelize.define("burgers", { //burgers is TABLE name
  // Name
  burger_name:{ 
    type: Sequelize.STRING
  },
  // is it eaten
  devoured: { 
    type: Sequelize.BOOLEAN,
    defaultValue: 0
  }
}, {
  timestamps: false
});

// Syncs with DB
Burger.sync();

// Makes the Character Model available for other files (will also create a table)
module.exports = Burger;
