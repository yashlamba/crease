export const steps = [
  {
    number: "01",
    short: "Game",
    title: "What is cricket?",
    body: "A bat-and-ball game: one team scores runs, the other bowls and fields. Then they swap. Most runs wins.",
  },
  {
    number: "02",
    short: "Ground",
    title: "The ground",
    body: "An oval playing area with a boundary around it and a 22-yard pitch at the centre.",
  },
  {
    number: "03",
    short: "Pitch",
    title: "The pitch",
    body: "The 22-yard centre strip. A wicket stands at each end, marked by bowling, popping and return creases.",
  },
  {
    number: "04",
    short: "Teams",
    title: "The teams",
    body: "Cricket is played between two sides.",
  },
  {
    number: "05",
    short: "Roles",
    title: "Player roles",
    body: "Batsmen score runs. The bowler delivers; the wicket-keeper and fielders defend.",
  },
  {
    number: "06",
    short: "Game play",
    title: "The goal",
    body: "Score more runs than the other team.",
  },
];

export const teamStages = [
  { title: "Two teams", body: "Cricket is played between two sides." },
  { title: "11 players each", body: "Each team names 11 players for the match." },
  { title: "The toss", body: "The toss decides which side bats first. The other side bowls and fields." },
  { title: "Ready to play", body: "All 11 fielders take the ground. Two batters enter—one at each end of the pitch." },
];

export const gameplayStages = [
  { title: "The goal", body: "Score more runs than the other team." },
  { title: "Basic play", body: "The bowler delivers from one end. The batsman at the other end tries to hit the ball." },
  { title: "Scoring", body: "Run between the wickets, reach the boundary, clear it, or receive extras." },
  { title: "Taking wickets", body: "A wicket ends a batsman’s turn. These are the most common ways to take one." },
  { title: "Overs", body: "Six legal balls make one over. Then another bowler delivers from the opposite end." },
  { title: "Reading the score", body: "A cricket score combines runs, wickets and overs in a compact line." },
];

export const scoringStages = [
  { key: "run", category: "bat", label: "Run", detail: "Swap ends", title: "Running", body: "The batsmen run and swap ends. Each completed swap scores one run." },
  { key: "four", category: "bat", label: "4", detail: "Reaches boundary", title: "Four", body: "The ball reaches the boundary after touching the ground: four runs." },
  { key: "six", category: "bat", label: "6", detail: "Clears boundary", title: "Six", body: "The ball clears the boundary without bouncing: six runs." },
  { key: "wide", category: "extra", label: "Wide", detail: "+1 run", marker: "+1 wide", title: "Wide", body: "A ball too wide for the batsman to reach gives the batting team one extra run." },
  { key: "no-ball", category: "extra", label: "No-ball", detail: "+1 run", marker: "+1 no-ball", title: "No-ball", body: "An illegal delivery gives the batting team one extra run, and the ball must be bowled again." },
  { key: "bye", category: "extra", label: "Bye", detail: "Misses bat", marker: "+1 bye", title: "Bye", body: "If a legal ball misses both bat and body, completed runs are scored as byes." },
  { key: "leg-bye", category: "extra", label: "Leg bye", detail: "Hits body", marker: "+1 leg bye", title: "Leg bye", body: "If the ball hits the batsman’s body instead of the bat, completed runs may count as leg byes." },
  { key: "penalty", category: "extra", label: "Penalty", detail: "+5 runs", marker: "+5 penalty", title: "Penalty runs", body: "The umpire can award five penalty runs when the other team breaks certain rules." },
] as const;

export const dismissalStages = [
  { key: "bowled", label: "Bowled", marker: "Out — bowled", title: "Bowled", body: "The batsman is out when a legal delivery hits the wicket and puts it down." },
  { key: "caught", label: "Caught", marker: "Out — caught", title: "Caught", body: "The batsman is out when a fair delivery touches the bat and a fielder catches it before it touches the ground." },
  { key: "lbw", label: "LBW", marker: "Out — LBW", title: "LBW", body: "The batsman may be out when the ball hits the body without first touching the bat and would otherwise have hit the wicket." },
  { key: "run-out", label: "Run out", marker: "Out — run out", title: "Run out", body: "A batter is run out when a fielder breaks their wicket while they are outside their ground." },
  { key: "stumped", label: "Stumped", marker: "Out — stumped", title: "Stumped", body: "The striker is stumped when the wicketkeeper breaks the wicket while they are outside their ground and not attempting a run." },
] as const;

export const overStages = [
  { key: "six-balls", label: "6 balls", title: "Six legal balls", body: "An over ends after six legal deliveries." },
  { key: "extra-balls", label: "Extra balls", title: "Extra deliveries", body: "Wides and no-balls add runs but do not count among the six legal balls, so an over can contain more than six deliveries." },
  { key: "change-ends", label: "Change ends", title: "Change ends", body: "Overs alternate between the two ends of the pitch, and one bowler cannot bowl two overs in a row." },
] as const;

export const scoreReadingStages = [
  { key: "runs-wickets", label: "Runs / wickets", title: "Runs and wickets", body: "Most scoreboards show runs first and wickets lost second. 154/3 means 154 runs for 3 wickets." },
  { key: "over-notation", label: "Over notation", title: "Over notation", body: "18.2 ov means 18 completed overs plus 2 balls into the next over. The .2 is a ball count, not a decimal." },
  { key: "chase", label: "The chase", title: "Reading a chase", body: "Target 181 is the score needed to win. Need 27 from 10 balls shows what the batting team still requires." },
] as const;

export const fielders = [
  { left: 50, top: 18, role: "wicketkeeper" },
  { left: 31, top: 27, role: "fielder" },
  { left: 69, top: 29, role: "fielder" },
  { left: 20, top: 43, role: "fielder" },
  { left: 80, top: 44, role: "fielder" },
  { left: 33, top: 55, role: "fielder" },
  { left: 67, top: 57, role: "fielder" },
  { left: 21, top: 72, role: "fielder" },
  { left: 78, top: 73, role: "fielder" },
  { left: 65, top: 84, role: "fielder" },
  { left: 50, top: 79, role: "bowler" },
];
