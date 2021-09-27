import pg from "pg";
import dotenv from "dotenv";

// injects all the db environment variables
dotenv.config();

const Pool = pg.Pool;

// creates a pool object
const pool = new Pool({
  host: "db",
  user: "donnchad",
  password: "password",
  database: "donnchad",
});

export default pool;
