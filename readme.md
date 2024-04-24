# DB Goofs

## Personal DB Playground and Express server starter

### Notes

1. This is a very simple setup and meant for local development. If the app structure is desired but you want to run this via HTTPS, you can change the entry point as follows.

```typescript
import dotenv from "dotenv";
dotenv.config();

import { readFileSync } from "fs";
import { createServer } from "https";
import { App } from "./app.js";

const app = await App.init();

const { KEY_PATH, CERT_PATH, HTTP_PORT } = process.env;

if (!KEY_PATH || !CERT_PATH) throw Error("Private key or certificate chain not set!");

const options = {
  key: readFileSync(KEY_PATH),
  cert: readFileSync(CERT_PATH),
};

const server = createServer(options, app.instance);

const port = HTTP_PORT ? parseInt(HTTP_PORT, 10) : 8080;

server.listen(port);

process.on("SIGTERM", () => {
  console.info("SIGTERM received, shutting down.");
  server.close();
  process.exit(0);
});

process.on("uncaughtException", (err) => {
  console.error("uncaughtException thrown", err);
  process.exit(1);
});
```
