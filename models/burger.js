module.exports = function(sequelize, DataTypes){
    var Burger = sequelize.define("Burger", { //burgers is TABLE name
        // Name
        burger_name:{ 
          type: DataTypes.STRING
        },
        // is it eaten
        devoured: { 
          type: DataTypes.BOOLEAN,
          defaultValue: 0
        }
      });
      return Burger;
};