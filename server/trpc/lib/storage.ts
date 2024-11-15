import redisClient from '@/common/utils/redis';

export interface SessionStorage {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, EX: number): Promise<string | null>;
  del(key: string): Promise<void>;
}

export class RedisStorage implements SessionStorage {
  private readonly client = redisClient;

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async set(key: string, value: string, EX: number): Promise<string | null> {
    return await this.client.set(key, value, { EX });
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }
}
