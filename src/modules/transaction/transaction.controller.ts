import { NextFunction, Request, Response } from "express";
import { Service } from "typedi";
import TransactionService from "./transaction.service";

@Service()
class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  async getTransactions(_req: Request, res: Response, next: NextFunction) {
    try {
      const results = await this.transactionService.getTransactions();
      return res
        .status(200)
        .json({ message: `Found ${results.length} transaction(s)`, results });
    } catch (e) {
      next(e);
    }
  }

  async saveTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const transaction = req.body;

      await this.transactionService.saveTransaction(transaction);

      return res.send("Transaction was saved successfully");
    } catch (e) {
      next(e);
    }
  }
}

export default TransactionController;
