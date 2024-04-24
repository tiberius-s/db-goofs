import { Request, Response, Router } from "express";
import { Controller } from "./controller.js";

const router = Router();
const controller = new Controller();

router.get("/createTable", controller.createTable);

router.get("/listTable", controller.listTable);

router.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Ok" });
});

export { router };
