import chalk from "chalk";
import redis from "redis";

const RedisClient = () => {
	const PORT = 6379;
	//   instantiates the redisClient with null value
	// const redisClient = redis.createClient({
	// 	port:
	// 		process.env.NODE_ENV == "production"
	// 			? process.env.REDIS_PORT
	// 			: PORT,
	// 	host:
	// 		process.env.NODE_ENV == "production"
	// 			? process.env.REDIS_TLS_URL
	// 			: "localhost",
	// });

	let redisClient;
	if (process.env.REDIS_TLS_URL) {
		const redisUrl = process.env.REDIS_TLS_URL
			? process.env.REDIS_TLS_URL
			: process.env.REDIS_URL;
		const redisDefaults = {
			tls: {
				// Heroku uses self-signed certificate, which will cause error in connection, unless check is disabled
				rejectUnauthorized: false,
			},
		};
		redisClient = redis.createClient(redisUrl, redisDefaults);
	} else {
		redisClient = redis.createClient();
	}

	redisClient.on("connect", function () {
		console.log(
			chalk.yellow.bold(
				`------------------------Redis client connected ------------------`
			)
		);
	});

	redisClient.on("error", (err) => {
		console.log(chalk.yellow.bold(err));
	});

	return redisClient;
};

export default RedisClient;
