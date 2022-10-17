import "reflect-metadata";
import express, { Express, Request, Response } from "express";

import config from "./config";
import transactionsRouter from "./modules/transaction/transaction.routes";
import bodyParser from "body-parser";

const app: Express = express();

const { server } = config;

app.use(bodyParser.json());
app.use("/transactions", transactionsRouter);

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello! Welcome to the simple wallet app");
});

app.listen(server.port, () => {
  console.log(`☁️ Server is running at https://localhost:${server.port}`);
});
