import { createClient } from "redis";
import crypto from "node:crypto";

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
    if (!redisClient.isReady) return;

    await redisClient.del(key);
};

export const deleteRoomListCache = async () => {
    if (!redisClient.isReady) return;

    const keys = await redisClient.keys("rooms:list:*");

    if (keys.length > 0) {
        await redisClient.del(keys);
    }

    console.log(`ROOM CACHE INVALIDATED: ${keys.length} keys`);
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

// Acquire a unique lock
export const acquireLock = async (key, ttlSeconds = 5) => {
  const token = crypto.randomUUID();

  const result = await redisClient.set(key, token, {
    NX: true,
    EX: ttlSeconds,
  });

  if (result !== "OK") {
    return null;
  }

  return token;
};

// Release ONLY our own lock
export const releaseLock = async (key, token) => {
  if (!token) {
    return;
  }

  const script = `
    if redis.call("GET", KEYS[1]) == ARGV[1] then
      return redis.call("DEL", KEYS[1])
    else
      return 0
    end
  `;

  await redisClient.eval(script, {
    keys: [key],
    arguments: [token],
  });
};

export default redisClient;