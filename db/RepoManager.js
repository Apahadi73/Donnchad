import { devConfig, proConfig } from "./dbConfigs";
import UserManager from "./UserManager";

class RepoManager {
  constructor() {
    //   instantiates the connection with null value
    this.connection = null;
  }

  connect() {
    //   connects our repo manager with the database depending on the environment
    this.connection = knex(
      process.env.NODE_ENV == "production" ? proConfig : devConfig
    );
  }

  getUserManager() {
    const userManager = UserManager(this.connection);
    return userManager;
  }
}

export default UserManager;
