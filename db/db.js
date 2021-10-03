import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

const devConfig = {
  client: "postgres",
  connection: {
    host: "db",
    user: "donnchad",
    password: "password",
    database: "donnchad",
  },
};

const proConfig = {
  client: "postgres",
  connection: process.env.DATABASE_URL,
  ssl: {
    /* <----- Add SSL option */
    require: true,
    rejectUnauthorized: false,
  }, // heroku add ons
};

const db = knex(process.env.NODE_ENV == "production" ? proConfig : devConfig);
export default db;
