'use strict';

/** @type {import('sequelize-cli').Migration} */
 

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Students', 'first_name', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('Students', 'last_name', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('Students', 'age', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Students', 'name');
   
  }
};
