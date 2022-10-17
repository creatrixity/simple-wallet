import { Service } from "typedi";
import connections from "../../connections";
import config from "../../config";

import { Strategy, strategiesList } from "./cache.definitions";

import RedisStrategy from "./strategies/redis.strategy";
import MemcachedStrategy from "./strategies/memcached.strategy";
import { RedisClientType } from "@redis/client";

const strategies: strategiesList = {
  redis: new RedisStrategy(connections.redis as RedisClientType),
  memcached: new MemcachedStrategy(connections.memcached),
};

@Service()
class CacheContext {
  private selectedStrategy: Strategy;
  private strategyKey: keyof strategiesList;

  constructor(strategyKey: keyof strategiesList = config.cache.provider) {
    this.strategyKey = strategyKey;
    this.selectedStrategy = strategies[strategyKey];
  }

  public setSelectedStrategy(strategy: keyof strategiesList) {
    this.selectedStrategy = strategies[strategy];
  }

  public has(key: string) {
    return this.selectedStrategy.has(key);
  }

  public async get(key: string) {
    console.log(
      `Request for cache key: ${key} was served by ${this.strategyKey}`
    );
    const value = await this.selectedStrategy.get(key);
    return value;
  }

  public async set(key: string, value: string) {
    await this.selectedStrategy.set(key, value);
  }
}

export default CacheContext;
