import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const serverUrl = new URL("../dist/server/index.js", import.meta.url);
  const { default: renderPage } = await import(serverUrl.href);

  return renderPage(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
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
  assert.match(html, /Out — bowled/);
  assert.match(html, />Caught</);
  assert.match(html, />LBW</);
  assert.match(html, />Run out</);
  assert.match(html, />Stumped</);
  assert.match(html, /6 legal balls/);
  assert.match(html, /Extra balls/);
  assert.match(html, /Change ends/);
  assert.match(html, /Runs \/ wickets/);
  assert.match(html, /154/);
  assert.match(html, /18\.2/);
  assert.match(html, /Target/);
  assert.match(html, /Need/);
});
