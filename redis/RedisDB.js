import chalk from "chalk";
import redis from "redis";

const RedisClient = async () => {
	const PORT = 6379;
	//   instantiates the redisConnection with null value
	const redisConnection = redis.createClient({
		port: PORT,
		host: "localhost",
	});

	redisConnection.on("connect", function () {
		console.log(
			chalk.yellow.bold(
				`------------------------Redis client connected on port: ${PORT}------------------`
			)
		);
	});

	redisConnection.on("error", (err) => {
		console.log(chalk.yellow.bold(err));
	});
	return redisConnection;
};

export default RedisClient;
