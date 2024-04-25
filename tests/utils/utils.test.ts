import { beforeEach, describe, it, mock } from "node:test";
import assert from "node:assert";
import { tryRun } from "@/utils/utils.js";

describe("tryRun", () => {
  beforeEach(() => mock.restoreAll());

  it("should return the result of the function", async () => {
    const fn = mock.fn(() => "test");
    const result = await tryRun(fn);

    assert.strictEqual(result, "test");
    assert.ok(fn.mock.calls.length === 1);
  });

  it("should handle functions that return promises", async () => {
    const fn = mock.fn(async () => Promise.resolve("test"));
    const result = await tryRun(fn);

    assert.strictEqual(result, "test");
    assert.ok(fn.mock.calls.length === 1);
  });

  it("should handle functions that throw errors", async () => {
    const fn = mock.fn(() => {
      throw new Error("ope!");
    });
    const mockConsoleError = mock.method(console, "error", () => {});
    await tryRun(fn);
    
    assert.ok(fn.mock.calls.length === 1);
    assert.ok(mockConsoleError.mock.calls.length === 1);
  });
});
