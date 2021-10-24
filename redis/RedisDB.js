import redisClient from "../Configs/redisConfig.js";

class RedisDB {
	constructor() {
		//   instantiates the connection with null value
		this.connection = redisClient;
	}

	// returns RedisDB connection
	getConnection() {
		return this.connection;
	}
}

export default RedisDB;
