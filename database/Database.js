import { devConfig, proConfig } from "./dbConfigs.js";
import dotenv from "dotenv";
import knex from "knex";
import chalk from "chalk";

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
		console.log(
			chalk.magenta.bold(
				"----------------------- Database Connection Established-----------------------"
			)
		);
		return this.connection;
	}
}

export default Database;
