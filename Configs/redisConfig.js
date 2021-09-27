import redis from "redis";
// we use redis to cache our data

const redisClient = redis.createClient(6379, "127.0.0.1");

redisClient.on("connect", function () {
  console.log("Redis client connected!".red.bold);
});

redisClient.on("error", (err) => {
  console.log("Error occurred while connecting or accessing redis server");
});

export default redisClient;
