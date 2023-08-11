import { Request, Response, NextFunction } from "express";
import {
  RequestContext,
  RequestContextConfig,
} from "../utils/request-context.js";

export function requestContext(config: RequestContextConfig) {
  return (req: Request, _: Response, next: NextFunction) => {
    RequestContext.bind(req, config);
    next();
  };
}
