'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Student.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    age:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    subject: {
      type:DataTypes.STRING,
      allowNull:false
    },
  }, {
    sequelize,
    tableName:'student',
    modelName: 'Student',
  });
  return Student;
};