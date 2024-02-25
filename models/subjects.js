// models/Subject.js

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Subject = sequelize.define(
    "Subject",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "subjects",
      timestamps: true,
    }
  );

  return Subject;
};
