import pg from "pg";
import dotenv from "dotenv";

// injects all the db environment variables
dotenv.config();

const Pool = pg.Pool;

// creates a pool object
const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DBNAME,
  password: process.env.DBPASSWORD,
  port: process.env.DBPORT || 5432,
});

export default pool;
