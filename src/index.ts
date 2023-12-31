import dotenv from "dotenv";
dotenv.config();

import { App } from "./app.js";

const app = await App.init();

const port = process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT, 10) : 8080;

app.listen(port);

process.on("SIGTERM", () => {
  console.info("SIGTERM received!");
  app.close();
});

process.on("uncaughtException", (err) => {
  console.error("uncaughtException thrown:", err);
  process.exit(1);
});
