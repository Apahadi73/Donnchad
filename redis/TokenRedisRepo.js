// Manages all the user related database operations
class TokenRedisRepo {
	constructor(redisConnection) {
		this.redisConnection = redisConnection;
	}

	async addForgotPasswordToken(uid) {
		console.log(uid);
	}
	async getForgotPasswordToken(uid) {}
	async deleteForgotPasswordToken(uid) {}
}

export default TokenRedisRepo;
