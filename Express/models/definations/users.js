const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConnection");

class User extends Model {}

User.init(
  {
    userId: {
      primaryKey: true,
      type: DataTypes.STRING(60),
    },
    firstName: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(60),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(),
      allowNull: false,
      type: DataTypes.ENUM,
      values: ["instructor", "trainee", "admin"],
      defaultValue: "trainee",
    },
  },
  {
    hooks: {
      beforeValidate: (user, options) => {
        user.email = user.email.toLowerCase();
      },
    },
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: "users",
  }
);

module.exports = User;



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

// User: firstName lastName email password
// project: Name status 
// tasks: name desc priority status projectID UserID 