import { Request, Response } from "express";

export function catchAllErrorHandler(error: unknown, req: Request, res: Response) {
  console.log("Error Handling Middleware called");
  console.log("Path: ", req.path);
  console.error("Error: ", error);

  res.status(500).send(error);
}
