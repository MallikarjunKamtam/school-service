"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "user_name", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });

    await queryInterface.removeColumn("Users", "userName");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "userName", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.removeColumn("Users", "user_name");
  },
};
