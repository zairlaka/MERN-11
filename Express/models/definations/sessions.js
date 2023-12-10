// const Sequelize = require('sequelize');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../bin/dbConnection');

class Session extends Model {}



Session.init(
  {
    sessionId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    expireAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { 
    sequelize,
    timestamps: true,
    paranoid: false,
    modelName: "sessions"
  }
)

module.exports = Session;
