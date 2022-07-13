import RedisClient from "../redis/RedisClient.js";
import TokenRedisRepo from "../redis/TokenRedisRepo.js";

export default function (container) {
	container.service("RedisClient", async () => {
		await RedisClient();
	});
	container.service("TokenRedisRepo", (container) => {
		return new TokenRedisRepo();
	});
}
