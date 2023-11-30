const sequelize = require("../bin/dbConnection");
const Users = require("./definations/users");
// const Role = require("./definations/roles")

const models = { Users }

const db = {};

db.sequelize = sequelize;
sequelize.models = models;

module.exports = { models, db}