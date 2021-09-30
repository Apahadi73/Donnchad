import knex from "knex";

const db1 = knex({
  client: "postgres",
  connection: {
    host: "db1",
    user: "donnchad",
    password: "password",
    database: "donnchad",
  },
});
export default db1;
