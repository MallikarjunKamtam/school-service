"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Awards extends Model {
    static associate(models) {}
  }
  Awards.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      points: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Awards",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Awards;
};
