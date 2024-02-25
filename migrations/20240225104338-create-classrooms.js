"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("classrooms", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      room_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      standard_level: {
        type: Sequelize.ENUM("1", "2", "3", "4", "5", "6", "7", "8", "9", "10"),
        allowNull: false,
      },
      section: {
        type: Sequelize.ENUM("A", "B", "C"),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("classrooms");
  },
};
