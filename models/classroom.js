"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Classroom extends Model {
    static associate(models) {
      Classroom.hasMany(models.Student, { foreignKey: "class_room_id" });
    }
  }

  Classroom.init(
    {
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      room_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      standard_level: {
        type: DataTypes.ENUM("1", "2", "3", "4", "5", "6", "7", "8", "9", "10"),
        allowNull: false,
      },
      section: {
        type: DataTypes.ENUM("A", "B", "C"),
      },
    },
    {
      sequelize,
      modelName: "Classroom",
    }
  );

  return Classroom;
};
