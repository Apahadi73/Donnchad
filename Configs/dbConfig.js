import pg from "pg";
import dotenv from "dotenv";

// injects all the db environment variables
dotenv.config();

const Pool = pg.Pool;

// creates a pool object
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "secret",
  database: "database",
  port: "5431",
});

export default pool;
