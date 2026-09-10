import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

export const redisClient = createClient({
  url: redisUrl,
});

redisClient.on("error", (error) => {
  console.error("Redis error:", error);
});

redisClient.on("connect", () => {
  console.log("Redis connecting...");
});

redisClient.on("ready", () => {
  console.log("Redis connected");
});

export const connectRedis = async () => {
  if (redisClient.isOpen) {
    return;
  }

  await redisClient.connect();
};

export const getCache = async (key) => {
  return redisClient.get(key);
};

export const setCache = async (key, value, ttlSeconds = 30) => {
  await redisClient.set(key, value, {
    EX: ttlSeconds,
  });
};

export const deleteCache = async (key) => {
  await redisClient.del(key);
};

export const deleteCacheByPattern = async (pattern) => {
  let cursor = 0;

  do {
    const result = await redisClient.scan(cursor, {
      MATCH: pattern,
      COUNT: 100,
    });

    cursor = result.cursor;

    if (result.keys.length > 0) {
      await redisClient.del(result.keys);
    }
  } while (cursor !== 0);
};

export default redisClient;