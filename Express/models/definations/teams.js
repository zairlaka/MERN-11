// const Sequelize = require('sequelize');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../bin/dbConnection');
class Team extends Model {}


Team.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { 
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: "teams"
  }
)

module.exports = Team;
