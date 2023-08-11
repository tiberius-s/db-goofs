import express, { Application } from "express";
import { Server } from "http";

import { errorHandler, requestContext } from "./middlewares/index.js";
import { router } from "./routes/router.js";
import { Connection } from "./utils/SQLite.js";

export class App {
  instance: Application;
  server?: Server;
  private constructor() {
    this.instance = express();
    this.bootstrap();
  }

  static async init() {
    return new App();
  }

  private async bootstrap() {
    this.instance.use(requestContext({ connection: Connection.DEFAULT }));
    this.instance.use(router);
    this.instance.use(errorHandler);
  }

  listen(port: number) {
    this.server = this.instance.listen(port, () => {
      console.log(`listening on -> http://localhost:${port}`);
    });
  }

  close() {
    this.server?.close(() => {
      console.log("shutting down...");
      process.exit(0);
    });
  }
}
