const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('students', 'email', {
      type: DataTypes.STRING,
      allowNull: true  
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('students', 'email');
  }
};