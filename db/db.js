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
  connectionString: process.env.DATABASE_URL, // heroku add ons
};

const db = knex(process.env.NODE_ENV == "production" ? proConfig : devConfig);
export default db;
