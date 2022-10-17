import { Strategy } from "../cache.definitions";

class MemcachedStrategy implements Strategy {
  private connection;

  constructor(connection: any) {
    this.connection = connection;
  }

  public async get(key: string): Promise<string> {
    const result = await this.connection.get(key);

    return result;
  }

  public async has(key: string): Promise<boolean> {
    const result = await this.connection.get(key);

    return result !== undefined;
  }

  public async set(key: string, value: string) {
    await this.connection.set(key, value);
  }
}

export default MemcachedStrategy;
