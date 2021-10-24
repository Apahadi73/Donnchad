import redis from "redis";
import chalk from "chalk";

const redisClient = redis.createClient(6379, "redis");

redisClient.on("connect", function () {
	console.log(chalk.yellow.bold("Redis client connected!"));
});

redisClient.on("error", (err) => {
	console.log(
		chalk.yellow.bold(
			"Error occurred while connecting or accessing redis server"
		)
	);
});

export default redisClient;
