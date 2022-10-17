import { Service } from "typedi";
import CacheProvider from "../../providers/cache";
import Transaction from "./transaction.model";

@Service()
class TransactionService {
  constructor(private readonly cacheProvider: CacheProvider) {}

  async saveTransaction(transaction: Transaction[]) {
    let cachedTransactions = await this.cacheProvider.get("transactions");
    let updatedTransactions: Transaction[] = [];

    if (cachedTransactions && cachedTransactions.length > 0) {
      updatedTransactions = [...JSON.parse(cachedTransactions), transaction];
    }

    await this.cacheProvider.set(
      "transactions",
      JSON.stringify(updatedTransactions)
    );
  }

  async getTransactions(): Promise<Transaction[]> {
    const cachedTransactions = await this.cacheProvider.get("transactions");

    if (!cachedTransactions) return [];

    return JSON.parse(cachedTransactions);
  }
}

export default TransactionService;
