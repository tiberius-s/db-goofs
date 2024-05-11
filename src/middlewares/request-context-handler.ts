import type { Request, RequestHandler } from "express";
import type { IncomingHttpHeaders } from "http";
import type { Connection } from "../utils/SQLite.js";

export type RequestContextConfig = {
  connection: Connection;
};

export class RequestContext {
  static readonly #bindings = new WeakMap<Request, RequestContext>();
  readonly connection: Connection;
  readonly headers: IncomingHttpHeaders;

  constructor(req: Request, config: RequestContextConfig) {
    this.connection = config.connection;
    this.headers = req.headers;
  }

  static async bind(req: Request, config: RequestContextConfig) {
    const ctx = new RequestContext(req, config);
    this.#bindings.set(req, ctx);
  }

  static get(req: Request): RequestContext | null {
    return this.#bindings.get(req) || null;
  }
}

export function requestContext(config: RequestContextConfig): RequestHandler {
  return (req, _res, next) => {
    RequestContext.bind(req, config);
    next();
  };
}
