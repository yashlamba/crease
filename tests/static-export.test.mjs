import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

test("exports the lesson with assets available under the Pages path", async () => {
  const output = new URL("../dist/client/", import.meta.url);
  const html = await readFile(new URL("index.html", output), "utf8");
  assert.match(html, /What is cricket\?/);
  assert.match(html, /Crease — Cricket rules, finally clear/);

  const basePath = process.env.BASE_PATH ?? "";
  const assets = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
    .map((match) => match[1])
    .filter((url) => url.includes("/_next/"));
  assert.ok(assets.some((url) => url.endsWith(".js")), "JavaScript is exported");
  assert.ok(assets.some((url) => url.endsWith(".css")), "Styles are exported");

  for (const asset of new Set(assets)) {
    assert.ok(asset.startsWith(`${basePath}/_next/`), `Incorrect asset path: ${asset}`);
    const file = new URL(asset.slice(basePath.length + 1), output);
    assert.ok((await stat(file)).isFile(), `Missing asset: ${asset}`);
  }
});
