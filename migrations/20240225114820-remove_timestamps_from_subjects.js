// In the generated migration file

"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove the columns
    await queryInterface.removeColumn("subjects", "created_at");
    await queryInterface.removeColumn("subjects", "updated_at");
  },

  down: async (queryInterface, Sequelize) => {
    // If you ever need to rollback, you can add the columns back here
    await queryInterface.addColumn("subjects", "created_at", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("now"),
    });
    await queryInterface.addColumn("subjects", "updated_at", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("now"),
    });
  },
};
