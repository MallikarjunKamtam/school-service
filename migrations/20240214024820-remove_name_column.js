'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove the 'name' column
    await queryInterface.removeColumn('Students', 'name');
  },

  down: async (queryInterface, Sequelize) => {
   module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove the 'name' column
    await queryInterface.removeColumn('Students', 'name');
  },

  down: async (queryInterface, Sequelize) => {
    // Add the 'name' column back (if needed)
    await queryInterface.addColumn('Students', 'name', {
      type: Sequelize.STRING,
      allowNull: true, // Adjust the allowNull value based on your needs
    });
  }
};
  }
};