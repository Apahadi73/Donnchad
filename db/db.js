import knex from "knex";

const db = knex({
  client: "postgres",
  connection: {
    host: "db",
    user: "donnchad",
    password: "password",
    database: "donnchad",
  },
});
export default db;
