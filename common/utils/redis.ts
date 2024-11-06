// redis.ts
import { createClient, RedisClientType } from 'redis';

declare global {
  // eslint-disable-next-line no-var
  var redisClient: RedisClientType | undefined;
}

const redisClient =
  global.redisClient ||
  createClient({
    url: process.env.REDIS_URL,
  });

if (process.env.NODE_ENV !== 'production') {
  global.redisClient = redisClient;
}

redisClient.on('error', (err) => console.error('Redis Client Error', err));

if (!redisClient.isOpen) {
  redisClient.connect().catch((err) => console.error('Redis Connection Error', err));
}

export default redisClient;
