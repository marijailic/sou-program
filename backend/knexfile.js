import { config } from 'dotenv';
config();

const { DB_HOST, DB_PORT, DB_USER, DB_NAME, DB_PASSWORD } = process.env;

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
    development: {
        client: 'pg',
        connection: {
            host: DB_HOST,
            port: DB_PORT,
            user: DB_USER,
            database: DB_NAME,
            password: DB_PASSWORD,
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './src/db/migrations',
        },
        seeds: {
            directory: './src/db/seeds',
        },
    },
    production: {
        client: 'pg',
        connection: {
            host: DB_HOST,
            port: DB_PORT,
            user: DB_USER,
            database: DB_NAME,
            password: DB_PASSWORD,
            ssl: { rejectUnauthorized: false },
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './src/db/migrations',
        },
        seeds: {
            directory: './src/db/seeds',
        },
    },
};
