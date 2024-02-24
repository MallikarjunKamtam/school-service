"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Users", {
      fields: ["user_name"],
      type: "unique",
      name: "unique_user_name_constraint",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "Users",
      "unique_user_name_constraint"
    );
  },
};
