const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.PG_DB,
    process.env.PG_USER,
    process.env.PG_PASSWORD,
    {
        host: process.env.PG_HOST,
        dialect: 'postgres',
    }
);

module.exports = sequelize;
//? also export objects ?
// {
//     "db" : {
//         "host": "localhost",
//         port: 5432,
//         username: "root",
//         password: "password",
//         database: "node_live_db"
//         dialect: "postgres"
//     }
// }

// NODE_ENV="local"
// PG_DB="node_live_db"
// PG_USER="zair"
// PG_PASSWORD="root"

// create file bin dir dbConnection.js
// const config = require('../config.json');
// const { Sequelize } = require('sequelize');

// const database = new Sequelize(config.db)

// database.authenticate().then(() => {
//     console.log("Database Connected")
// }).catch((error) => {
//     console.log("Database Connection Error");
// });

// module.exports = database