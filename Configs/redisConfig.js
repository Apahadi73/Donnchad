import redis from "redis";
import colors from "colors";

const redisClient = redis.createClient(6379, "redis");

redisClient.on("connect", function () {
  console.log("Redis client connected!".red.bold);
});

redisClient.on("error", (err) => {
  console.log("Error occurred while connecting or accessing redis server");
});

export default redisClient;
