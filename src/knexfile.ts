import knex from 'knex'
import dotenvSafe from 'dotenv';
dotenvSafe.config();
const config = require("../knexfile")


const db = knex(config[process.env.NODE_ENV || "development"]);

export default db;