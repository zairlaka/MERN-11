// const Sequelize = require('sequelize');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../bin/dbConnection');

class Task extends Model {}



Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priority: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'open'
    }
    // projectId: {
    //   type: DataTypes,
    //   allowNull: true,
    // },
    // userId: {
    //   type: DataTypes,
    //   allowNull: true,
    // }
  },
  { 
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: "tasks"
  }
)

module.exports = Task;
