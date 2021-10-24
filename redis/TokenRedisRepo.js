import RedisKeys from "../types/RedisKeys.js";
import RedisClient from "./RedisClient.js";

// Manages all the user related database operations
class TokenRedisRepo {
	constructor() {
		this.redisClient = RedisClient();
	}

	async addForgotPasswordToken(uid) {
		this.redisClient.set(RedisKeys.USER_SESSION_TOKEN + uid, uid);
	}

	async getForgotPasswordToken(uid) {
		this.redisClient.get(
			RedisKeys.USER_SESSION_TOKEN + uid,
			(error, value) => {}
		);
	}

	async deleteForgotPasswordToken(uid) {
		this.redisClient.del(RedisKeys.USER_SESSION_TOKEN + uid);
	}
}

export default TokenRedisRepo;
