module.exports = function(sequelize, DataTypes) {
  var Instruction= sequelize.define("Instruction", {
    Instruction {
    
      type: DataTypes.TEXT,
     
  });

  Instruction.associate = function(models) {
   
    Instruction.belongsTo(models.Recipe, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Post;
};



