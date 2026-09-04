import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the cricket basics lesson", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Crease — Cricket rules, finally clear<\/title>/i);
  assert.match(html, /What is cricket\?/);
  assert.match(html, />Ground</);
  assert.match(html, />Teams</);
  assert.match(html, /Team A/);
  assert.match(html, /Team B/);
  assert.match(html, /TOSS/);
  assert.match(html, /11 on the ground/);
  assert.match(html, /2 batters at a time/);
  assert.match(html, />Roles</);
  assert.match(html, /Wicket-keeper/);
  assert.match(html, /Batsmen/);
  assert.match(html, /Fielder/);
  assert.match(html, /Bowler/);
  assert.match(html, />Game play</);
  assert.match(html, /Your runs/);
  assert.match(html, /Batsman hits here/);
  assert.match(html, /Bowler runs in/);
  assert.match(html, /Reaches boundary/);
  assert.match(html, /Runs off the bat/);
  assert.match(html, />Extras</);
  assert.match(html, /No-ball/);
  assert.match(html, /Leg bye/);
  assert.match(html, /Penalty/);
  assert.match(html, /Bowled/);
  assert.match(html, /6 legal balls/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
});
