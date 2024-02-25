"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("subjects", "created_at");
    await queryInterface.removeColumn("subjects", "updated_at");
  },
};
