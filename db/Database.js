import { devConfig, proConfig } from "./dbConfigs";

class Database {
  constructor() {
    //   instantiates the connection with null value
    this.connection = null;
  }

  // returns database connection
  getConnection() {
    //   connects our repo manager with the database depending on the environment
    this.connection = knex(
      process.env.NODE_ENV == "production" ? proConfig : devConfig
    );
    return this.connection;
  }
}

export default Database;
