const knex = require('../knexfile');
const db = require('knex')(knex['development']);

module.exports = db;