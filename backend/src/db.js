require("dotenv").config();
const knex = require("knex");

const db = knex({
    client: "pg",
    connection: {
        connectionString: process.env.CONNECTION_STRING,
        ssl: {
            rejectUnauthorized: false,
        },
    },
});

module.exports = db;
