const test = require("node:test");
const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");

test("shared-contracts validation script exits cleanly", () => {
  const result = spawnSync("node", ["scripts/validate.js"], {
    cwd: process.cwd(),
    encoding: "utf8"
  });
  assert.equal(result.status, 0, result.stderr || result.stdout);
});
