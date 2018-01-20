module.exports = function(sequelize, DataTypes){
    var Recipe = sequelize.define("Recipe", { //User is TABLE name
        // Name
        recipe_url:{ 
          type: DataTypes.STRING
        },

        recipe_checkbox:{
            type: DataTypes.BOOLEAN
        }

      });

      Recipe.associate = function(models) {
        // We're saying that a Recipe should belong to an User
        // A Recipe can't be created without an User due to the foreign key constraint
        Recipe.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });

        Recipe.hasMany(models.Ingredient, {
          onDelete: "cascade"
        });
      };

      return Recipe;
};