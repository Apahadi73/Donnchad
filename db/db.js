import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

const devConfig = {
  client: "postgres",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "postgres",
    database: "postgres",
  },
};

// const DATABASE_URL = `postgres://donnchad:password@db:5431`;

// const devConfig = {
//   client: "postgres",
//   connection: DATABASE_URL,
// };

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
