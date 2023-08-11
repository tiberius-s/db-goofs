import { Request } from "express";
import { IncomingHttpHeaders } from "http";
import { Connection } from "./SQLite.js";

export type RequestContextConfig = {
  connection: Connection;
};

const bindings = new WeakMap<Request, RequestContext>();

export class RequestContext {
  public readonly connection: Connection;
  public headers: IncomingHttpHeaders;

  constructor(req: Request, config: RequestContextConfig) {
    this.connection = config.connection;
    this.headers = req.headers;
  }

  static async bind(req: Request, config: RequestContextConfig) {
    const ctx = new RequestContext(req, config);
    bindings.set(req, ctx);
  }

  static get(req: Request): RequestContext | null {
    return bindings.get(req) || null;
  }
}
