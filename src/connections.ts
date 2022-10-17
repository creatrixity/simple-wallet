import MemcachePlus from "memcache-plus";
import { createClient } from "redis";
import { RedisClientType } from "@redis/client";

let redisClient: RedisClientType;

(async () => {
  redisClient = createClient();

  redisClient.on("error", (err) =>
    console.log("🐕‍🦺 [Redis] Redis Client Error: ", err)
  );

  await redisClient.connect();

  console.log("🐕‍🦺 [Redis]: Successfully connected to the Redis server");
})();

const factory = (): RedisClientType => {
  return redisClient;
};

const createMemcachedClient = (location: string) => {
  const handleNetworkError = function () {
    console.error(
      `🎖️ [Memcache]: Unable to connect to server due to network error`
    );
  };

  const memcache = new MemcachePlus({
    hosts: [location],
    onNetError: handleNetworkError,
  });

  console.log("🎖️ [Memcache]: Successfully connected to the Memcached server");
  return memcache;
};

export default {
  redis: factory(),
  memcached: createMemcachedClient("localhost:11211"),
};
