import { RedisClient } from "redis";
import RedisDB from "../redis/RedisDB.js";
import TokenRedisRepo from "../redis/TokenRedisRepo.js";

export default function (container) {
	console.log("reached here in func");
	container.service("Redis", () => RedisClient());
	container.service(
		"TokenRedisRepo",
		(container) => new TokenRedisRepo(container.Redis)
	);
}
