require("dotenv").config();
import knex from "knex";

export default knex({
    client: "pg",
    connection: {
        connectionString: process.env.CONNECTION_STRING,
        ssl: {
            rejectUnauthorized: false,
        },
    },
});
