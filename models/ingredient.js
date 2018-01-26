module.exports = function(sequelize, DataTypes){
    var Ingredient = sequelize.define("Ingredient", { //User is TABLE name
        // Name
        ingredient_info:{ 
          type: DataTypes.STRING
        },

        ingredient_checkbox:{
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }

      });

      Ingredient.associate = function(models) {
        // We're saying that a Ingredient should belong to an Recipe
        // A Ingredient can't be created without an Recipe due to the foreign key constraint
        Ingredient.belongsTo(models.Recipe, {
          foreignKey: {
            allowNull: false,
            onDelete: "cascade"
          }
        });
      };

      return Ingredient;
};