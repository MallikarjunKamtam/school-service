"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Students", "class_room_id", {
      type: Sequelize.INTEGER,
      allowNull: true, // or false, depending on your requirements
      references: {
        model: "classrooms", // Make sure this matches the actual table name for classrooms
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL", // or 'CASCADE', depending on your requirements
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("students", "class_room_id");
  },
};
