# DB Goofs

## Personal DB Playground and Express server starter

### Gotchas

1. This is a very simple setup and really meant for local development. If the app structure is desired but you want to run this via HTTPS, you can change the entry point as follows.

```typescript
import dotenv from "dotenv";
import { readFileSync } from "fs";
import { createServer } from "https";

dotenv.config();

import { App } from "./app.js";

const app = await App.init();

const options = {
  key: readFileSync(process.env.KEY_PATH ?? "path/to/key.pem"),
  cert: readFileSync(process.env.CERT_PATH ?? "path/to/cert.pem"),
};
const server = createServer(options, app.instance);

const port = process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT, 10) : 8080;

server.listen(port);

process.on("SIGTERM", () => {
  app.close();
});
```
