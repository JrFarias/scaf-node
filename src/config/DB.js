const knex = require('knex');
const knexFile = require('../../knexfile');

const env = process.env.NODE_ENV;

module.exports = knex(knexFile[env]);
