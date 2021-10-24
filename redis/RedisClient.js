import chalk from "chalk";
import redis from "redis";

const RedisClient = () => {
	const PORT = 6379;
	//   instantiates the redisClient with null value
	const redisClient = redis.createClient({
		port: PORT,
		host: "localhost",
	});

	redisClient.on("connect", function () {
		console.log(
			chalk.yellow.bold(
				`------------------------Redis client connected on port: ${PORT}------------------`
			)
		);
	});

	redisClient.on("error", (err) => {
		console.log(chalk.yellow.bold(err));
	});

	return redisClient;
};

export default RedisClient;
