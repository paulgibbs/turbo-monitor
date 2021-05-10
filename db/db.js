import knex from 'knex';
import knexfile from '../knexfile';

const env = process.env.NODE_ENV || 'development';
const db = knex(knexfile[env]);

const { Model } = require('objection');

Model.knex(db);

export default db;
