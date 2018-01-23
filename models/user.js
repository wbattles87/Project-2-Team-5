module.exports = function(sequelize, DataTypes){
    var User = sequelize.define("User", { //User is TABLE name
        // Name
        user_email:{ 
          type: DataTypes.STRING
        },

        user_password:{ 
            type: DataTypes.STRING
        },

        unique_id:{ //Just in case. However passport works. 
            type: DataTypes.STRING
        }

      });

      User.associate = function(models) { //each user has many recipes. Recipes will use user_id as foreign key
        // Associating User with Recipe
        // When an User is deleted, also delete any associated Recipes
        User.hasMany(models.Recipe, {
          onDelete: "cascade"
        });
      };

      return User;
};