const config = require("../config/config.json")
const { Sequelize } = require('sequelize');

const database = new Sequelize(config.development)

database.authenticate().then(() => {
    console.log("Database Connected 🟢 🟢 🟢")
}).catch((error) => {
    console.log("Database Connection Error 🔴 🔴 🔴"),error;
});

module.exports = database;