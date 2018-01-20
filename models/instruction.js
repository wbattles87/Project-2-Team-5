module.exports = function(sequelize, DataTypes) {
  var Instruction = sequelize.define("Instruction", {
    
      instruction_info:{
    
      type: DataTypes.TEXT,
    },

    instruction_checkbox:{
      type: DataTypes.BOOLEAN
    }
     
  });

  Instruction.associate = function(models) {
   
    Instruction.belongsTo(models.Recipe, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Instruction;
};



