import redis from "redis";
// we use redis to cache our data

// sets redis port
const REDIS_PORT = process.env.REDIS_PORT || 6380;
// sets up redis connection
const redisClient = redis.createClient(REDIS_PORT);

redisClient.on("connect", function () {
  console.log("Redis client connected!".red.bold);
});

export default redisClient;
