const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConnection");

class Request extends Model {}

Request.init(
  {
    requestId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING(),
      allowNull: false,
      type: DataTypes.ENUM,
      values: ["accepted", "rejected", "pending"],
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: "requests",
  }
);

module.exports = Request;
