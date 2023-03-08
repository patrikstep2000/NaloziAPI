import type { Knex } from "knex";
import { attachPaginate } from "knex-paginate";
attachPaginate();

// Update with your config settings.

import dotenvSafe from 'dotenv';
dotenvSafe.config();


const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: process.env.CONNECTION_STRING,
    searchPath: ['knex', 'public'],
  },
  test: {
    client: 'pg',
    connection: process.env.CONNECTION_STRING,
    searchPath: ['knex', 'public'],
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};



module.exports = config;
