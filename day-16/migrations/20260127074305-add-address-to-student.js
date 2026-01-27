module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('students', 'address', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('students', 'address');
  }
};