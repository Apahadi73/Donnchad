import { devConfig, proConfig } from "./dbConfigs";
import dotenv from "dotenv";

class Database {
  constructor() {
    //   instantiates the connection with null value
    this.connection = null;
  }

  // returns database connection
  getConnection() {
    // injects environment variables
    dotenv.config();

    //   connects our repo manager with the database depending on the environment
    this.connection = knex(
      process.env.NODE_ENV == "production" ? proConfig : devConfig
    );
    return this.connection;
  }
}

export default Database;
