import dotenv from "dotenv";

dotenv.config();

function getEnvVariable(name: string, fallback: string = ""): string {
  const envVariable = process.env[name];
  const fallbackProvided = fallback.length;

  if (!envVariable && !fallbackProvided) {
    throw new Error(`Environment variable ${name} has not been set.`);
  }

  return envVariable || fallback;
}

const config = {
  server: {
    port: getEnvVariable("PORT"),
  },
  cache: {
    provider: getEnvVariable("CACHE_PROVIDER", "redis"),
  },
  redis: {
    port: getEnvVariable("REDIS_PORT"),
  },
  memcached: {
    port: getEnvVariable("MEMCACHED_PORT"),
  },
};

export default config;
