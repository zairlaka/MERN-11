// const Sequelize = require('sequelize');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../bin/dbConnection');
// const database = require('../../bin/dbConnection');
class Users extends Model {}

// console.log('--->',dbConnection)

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes,
      allowNull: true,
    }
  },
  { 
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: "users"
  }
)

module.exports = Users;


// const db = require('../util/database');

// const User = db.define('user', {
    // id: {
    //     type: Sequelize.INTEGER,
    //     autoIncrement: true,
    //     allowNull: false,
    //     primaryKey: true
    // },
//     name: Sequelize.STRING,
//     email: Sequelize.STRING
// });