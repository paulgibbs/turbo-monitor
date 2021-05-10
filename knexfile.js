const { knexSnakeCaseMappers } = require('objection');
const dotenv = require('dotenv');

dotenv.config();

const db = {
    client: 'mysql2',
    connection: {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        database: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
    },
    migrations: {
        directory: './db/migrations',
        tableName: 'migrations',
    },
    ...knexSnakeCaseMappers,
};

module.exports = {
    development: db,
    staging: db,
    production: db,
};
