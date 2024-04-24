import { describe, it } from "node:test";
import assert from "node:assert";
import { RequestContext } from "@/utils/request-context.js";
import { Request } from "express";
import { Connection } from "@/utils/SQLite.js";

describe("RequestContext", () => {
  it("should create a new RequestContext instance", () => {
    const req = { headers: {} } as Request;
    const config = {
      connection: Connection.DEFAULT,
    };
    const requestContext = new RequestContext(req, config);

    assert.ok(requestContext instanceof RequestContext);
    assert.strictEqual(requestContext.connection, config.connection);
    assert.deepStrictEqual(requestContext.headers, {});
  });

  it("should bind a RequestContext to a request", () => {
    const req = { headers: {} } as Request;
    const config = {
      connection: Connection.DEFAULT,
    };
    RequestContext.bind(req, config);
    const boundContext = RequestContext.get(req);
    assert.deepStrictEqual(boundContext, new RequestContext(req, config));
  });

  it("should return null when getting RequestContext for an unbound request", () => {
    const unboundReq = {} as Request;
    const boundContext = RequestContext.get(unboundReq);
    assert.strictEqual(boundContext, null);
  });
});
