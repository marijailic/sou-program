import knex from 'knex';
import knexConfig from '../../knexfile.js';

const environment = process.env.NODE_ENV || 'development';

const connection = knex(knexConfig[environment]);

export default connection;
