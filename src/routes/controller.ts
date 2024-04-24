import type { NextFunction, Request, Response } from "express";
import { StatementFile, getSqlStatement } from "@/commands/commands.js";
import { SQLite, RequestContext } from "@/utils/index.js";

export class Controller {
  async createTable(req: Request, res: Response, next: NextFunction) {
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
  }

  async listTable(req: Request, res: Response, next: NextFunction) {
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
  }
}
