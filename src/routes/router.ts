import { Request, Response, Router } from "express";

import { RequestContext, SQLite } from "../utils/index.js";
import { StatementFile, getSqlStatement } from "../commands/commands.js";

const router = Router();

router.get("/createTable", async (req, res, next) => {
  const ctx = RequestContext.get(req);
  if (!ctx) throw Error("RequestContext not found.");

  try {
    const db = await SQLite.open(ctx.connection);

    console.info("creating table");

    const sql = getSqlStatement(StatementFile.CreateTable);
    const result = await db.run(sql);
    await db.close();
    console.info(result);

    res.json({ message: "created table" });
  } catch (error) {
    next(error);
  }
});

router.get("/listTable", async (req, res, next) => {
  const ctx = RequestContext.get(req);
  if (!ctx) throw Error("RequestContext not found.");

  try {
    const db = await SQLite.open(ctx.connection);

    console.info("list table");

    const sql = getSqlStatement(StatementFile.ListTables);
    const result = await db.all(sql);
    await db.close();
    console.info(result);

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Ok" });
});

export { router };
