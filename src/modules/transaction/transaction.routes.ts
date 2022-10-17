import { Request, Response, NextFunction, Router } from "express";
import Container from "typedi";
import TransactionController from "./transaction.controller";

const transactionsRouter = Router();
const transactionController = Container.get(TransactionController);

transactionsRouter.post(
  "/",
  (req: Request, res: Response, next: NextFunction) =>
    transactionController.saveTransaction(req, res, next)
);

transactionsRouter.get("/", (req: Request, res: Response, next: NextFunction) =>
  transactionController.getTransactions(req, res, next)
);

export default transactionsRouter;
