"use client";

import { animate, createScope, createTimeline, stagger, utils } from "animejs";
import { useEffect, useRef, useState } from "react";

const steps = [
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

const teamStages = [
  { title: "Two teams", body: "Cricket is played between two sides." },
  { title: "11 players each", body: "Each team names 11 players for the match." },
  { title: "The toss", body: "The toss decides which side bats first. The other side bowls and fields." },
  { title: "Ready to play", body: "All 11 fielders take the ground. Two batters enter—one at each end of the pitch." },
];

const gameplayStages = [
  { title: "The goal", body: "Score more runs than the other team." },
  { title: "Basic play", body: "The bowler delivers from one end. The batsman at the other end tries to hit the ball." },
  { title: "Scoring", body: "Run between the wickets, reach the boundary, clear it, or receive extras." },
  { title: "Taking wickets", body: "A wicket ends a batsman’s turn. These are the most common ways to take one." },
  { title: "Overs", body: "Six legal balls make one over. Then another bowler delivers from the opposite end." },
];

const scoringStages = [
  { key: "run", category: "bat", label: "Run", detail: "Swap ends", title: "Running", body: "The batsmen run and swap ends. Each completed swap scores one run." },
  { key: "four", category: "bat", label: "4", detail: "Reaches boundary", title: "Four", body: "The ball reaches the boundary after touching the ground: four runs." },
  { key: "six", category: "bat", label: "6", detail: "Clears boundary", title: "Six", body: "The ball clears the boundary without bouncing: six runs." },
  { key: "wide", category: "extra", label: "Wide", detail: "+1 run", marker: "+1 wide", title: "Wide", body: "A ball too wide for the batsman to reach gives the batting team one extra run." },
  { key: "no-ball", category: "extra", label: "No-ball", detail: "+1 run", marker: "+1 no-ball", title: "No-ball", body: "An illegal delivery gives the batting team one extra run, and the ball must be bowled again." },
  { key: "bye", category: "extra", label: "Bye", detail: "Misses bat", marker: "+1 bye", title: "Bye", body: "If a legal ball misses both bat and body, completed runs are scored as byes." },
  { key: "leg-bye", category: "extra", label: "Leg bye", detail: "Hits body", marker: "+1 leg bye", title: "Leg bye", body: "If the ball hits the batsman’s body instead of the bat, completed runs may count as leg byes." },
  { key: "penalty", category: "extra", label: "Penalty", detail: "+5 runs", marker: "+5 penalty", title: "Penalty runs", body: "The umpire can award five penalty runs when the other team breaks certain rules." },
] as const;

const fielders = [
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

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [teamStage, setTeamStage] = useState(0);
  const [gameplayStage, setGameplayStage] = useState(0);
  const [scoringStage, setScoringStage] = useState(0);
  const [groundHighlight, setGroundHighlight] = useState<"boundary" | "circle" | "pitch" | null>(null);
  const [roleHighlight, setRoleHighlight] = useState<"wicketkeeper" | "batsmen" | "fielder" | "bowler" | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    scope.current = createScope({ root }).add((self) => {
      let deliveryGeneration = 0;

      self.add("showStep", (step: number, currentTeamStage: number, currentGameplayStage: number, currentScoringStage: number) => {
        deliveryGeneration += 1;
        const generation = deliveryGeneration;
        const gameFieldVisible = step === 5 && currentGameplayStage >= 1 && currentGameplayStage <= 3;
        const populatedGroundVisible = step === 4 || (step === 3 && currentTeamStage === 3) || gameFieldVisible;

        [
          ".step-copy",
          ".concept-piece",
          ".field-shell",
          ".pitch-strip",
          ".ground-label",
          ".pitch-detail",
          ".pitch-callout",
          ".player-token",
          ".team-card",
          ".team-sequence",
          ".team-side",
          ".roster-dot",
          ".toss-coin",
          ".role-badge",
          ".player-role-label",
          ".gameplay-panel",
          ".goal-token",
          ".play-ball",
          ".hit-flash",
          ".play-cue",
          ".bowler-arm",
          ".score-boundary-flash",
          ".extra-marker",
          ".score-method",
          ".score-category-label",
          ".score-divider",
          ".dismissal-method",
          ".over-ball",
        ].forEach((target) => utils.remove(target));

        utils.set(".field-shell", {
          opacity: step === 2 ? 0.28 : step === 1 || populatedGroundVisible ? 1 : 0,
          scale: step === 2 ? 1.04 : step === 1 || populatedGroundVisible ? 1 : 0.72,
          rotate: 0,
        });
        utils.set(".pitch-strip", { scaleY: 1, opacity: step === 1 || step === 2 || populatedGroundVisible ? 1 : 0 });
        utils.set(".pitch-detail", { opacity: 0, scale: 0.76, rotate: 2 });
        utils.set(".player-token", { opacity: 0, scale: 0 });
        utils.set(".batter-north", { top: "31%", left: "48.7%" });
        utils.set(".batter-south", { top: "69%", left: "51.3%" });
        utils.set(".role-bowler", { top: "79%", translateY: 0, rotate: 0 });
        utils.set(".bowler-arm", { opacity: 0, rotate: 25 });
        utils.set(".team-card", { opacity: 0, translateY: 12 });
        utils.set(".ground-label", { opacity: 0, translateY: 8 });
        utils.set(".concept-piece", { opacity: 0, scale: 0.75, translateY: 10 });
        utils.set(".team-sequence", { opacity: 0 });
        utils.set(".team-side", { opacity: 0, translateY: 18 });
        utils.set(".roster-dot", { opacity: 0, scale: 0 });
        utils.set(".toss-coin", { opacity: 0, scale: 0.5, rotateY: 0 });
        utils.set(".role-badge", { opacity: 0, translateY: 7 });
        utils.set(".player-role-label", { opacity: 0, scale: 0.88 });
        utils.set(".gameplay-panel", { opacity: 0 });
        utils.set(".goal-token", { opacity: 0, translateY: 10 });
        utils.set(".play-ball", { opacity: 0, left: "50%", top: "79%", scale: 1 });
        utils.set(".hit-flash", { opacity: 0, scale: 0 });
        utils.set(".play-cue", { opacity: 0, translateY: 8 });
        utils.set(".score-boundary-flash", { opacity: 0, scale: 1 });
        utils.set(".extra-marker", { opacity: 0, scale: 0.76, translateY: 8 });
        utils.set(".score-method", { opacity: 0, translateY: 10 });
        utils.set(".score-category-label", { opacity: 0 });
        utils.set(".score-divider", { opacity: 0 });
        utils.set(".dismissal-method", { opacity: 0, scale: 0.86 });
        utils.set(".over-ball", { opacity: 0, scale: 0 });

        if (prefersReducedMotion) {
          utils.set(".step-copy", { opacity: 1, translateY: 0 });
          utils.set(".concept-piece", { opacity: step === 0 ? 1 : 0, scale: 1, translateY: 0 });
          utils.set(".field-shell", { opacity: step === 2 ? 0.28 : step === 1 || populatedGroundVisible ? 1 : 0, scale: step === 2 ? 1.04 : 1 });
          utils.set(".pitch-strip", { opacity: step === 1 || step === 2 || populatedGroundVisible ? 1 : 0 });
          utils.set(".pitch-detail", { opacity: step === 2 ? 1 : 0, scale: 1, rotate: 0 });
          utils.set(".ground-label", { opacity: step === 1 ? 1 : 0, translateY: 0 });
          utils.set(".pitch-callout", { opacity: step === 2 ? 1 : 0, translateY: 0 });
          utils.set(".player-token", { opacity: populatedGroundVisible ? 1 : 0, scale: 1 });
          utils.set(".team-card", { opacity: step === 3 && currentTeamStage === 3 ? 1 : 0, translateY: 0 });
          utils.set(".team-sequence", { opacity: step === 3 && currentTeamStage < 3 ? 1 : 0 });
          utils.set(".team-side", { opacity: step === 3 && currentTeamStage < 3 ? 1 : 0, translateY: 0 });
          utils.set(".roster-dot", { opacity: step === 3 && currentTeamStage >= 1 && currentTeamStage <= 2 ? 1 : 0, scale: 1 });
          utils.set(".toss-coin", { opacity: step === 3 && currentTeamStage === 2 ? 1 : 0, scale: 1, rotateY: 0 });
          utils.set(".role-badge", { opacity: step === 3 && currentTeamStage === 2 ? 1 : 0, translateY: 0 });
          utils.set(".player-role-label", { opacity: step === 4 ? 1 : 0, scale: 1 });
          utils.set(".gameplay-panel", { opacity: step === 5 && (currentGameplayStage === 0 || currentGameplayStage === 4) ? 1 : 0 });
          utils.set(".goal-token", { opacity: step === 5 && currentGameplayStage === 0 ? 1 : 0, translateY: 0 });
          utils.set(".play-cue", { opacity: step === 5 && currentGameplayStage === 1 ? 1 : 0, translateY: 0 });
          utils.set(".score-method", { opacity: step === 5 && currentGameplayStage === 2 ? 1 : 0, translateY: 0, scale: 1 });
          utils.set(".score-category-label", { opacity: step === 5 && currentGameplayStage === 2 ? 1 : 0 });
          utils.set(".score-divider", { opacity: step === 5 && currentGameplayStage === 2 ? 1 : 0 });
          utils.set(".score-boundary-flash", { opacity: step === 5 && currentGameplayStage === 2 && (currentScoringStage === 1 || currentScoringStage === 2) ? 0.65 : 0, scale: 1 });
          utils.set(".extra-marker", { opacity: step === 5 && currentGameplayStage === 2 && currentScoringStage >= 3 ? 1 : 0, scale: 1, translateY: 0 });
          utils.set(".dismissal-method", { opacity: step === 5 && currentGameplayStage === 3 ? 1 : 0, scale: 1 });
          utils.set(".over-ball", { opacity: step === 5 && currentGameplayStage === 4 ? 1 : 0, scale: 1 });
          utils.set(".play-ball", {
            opacity: step === 5 && currentGameplayStage >= 1 && currentGameplayStage <= 3 ? 1 : 0,
            left: currentGameplayStage === 3 ? "50%" : "48.7%",
            top: currentGameplayStage === 3 ? "27%" : "31%",
          });
          return;
        }

        animate(".step-copy", {
          opacity: [0, 1],
          translateY: [22, 0],
          duration: 520,
          ease: "out(3)",
        });

        if (step === 0) {
          animate(".concept-piece", {
            opacity: [0, 1],
            scale: [0.75, 1],
            translateY: [10, 0],
            delay: stagger(110),
            duration: 560,
            ease: "out(4)",
          });
        }

        if (step === 1) {
          utils.set(".field-shell", { opacity: 0, scale: 0.68, rotate: -4 });
          utils.set(".pitch-strip", { scaleY: 0.2, opacity: 0 });
          animate(".field-shell", {
            opacity: [0, 1],
            scale: [0.68, 1],
            rotate: [-4, 0],
            duration: 950,
            ease: "out(4)",
          });
          animate(".pitch-strip", {
            opacity: [0, 1],
            scaleY: [0.2, 1],
            delay: 360,
            duration: 560,
            ease: "out(3)",
          });
          animate(".ground-label", {
            opacity: [0, 1],
            translateY: [8, 0],
            delay: stagger(120, { start: 500 }),
            duration: 420,
            ease: "out(3)",
          });
        }

        if (step === 2) {
          animate(".field-shell", {
            opacity: [1, 0.28],
            scale: [1, 1.04],
            duration: 520,
            ease: "out(3)",
          });
          animate(".pitch-detail", {
            opacity: [0, 1],
            scale: [0.76, 1],
            rotate: [2, 0],
            duration: 820,
            ease: "out(4)",
          });
          animate(".pitch-callout", {
            opacity: [0, 1],
            translateY: [8, 0],
            delay: stagger(85, { start: 430 }),
            duration: 420,
            ease: "out(3)",
          });
        }

        if (step === 3 && currentTeamStage <= 2) {
          utils.set(".team-sequence", { opacity: 1 });
          utils.set(".team-side", { opacity: 1, translateY: 0 });

          if (currentTeamStage === 0) {
            animate(".team-side", {
              opacity: [0, 1],
              translateY: [18, 0],
              delay: stagger(130),
              duration: 520,
              ease: "out(4)",
            });
          }

          if (currentTeamStage >= 1) {
            animate(".roster-dot", {
              opacity: [0, 1],
              scale: [0, 1],
              delay: stagger(38, { from: "center" }),
              duration: 300,
              ease: "out(4)",
            });
          }

          if (currentTeamStage === 2) {
            utils.set(".roster-dot", { opacity: 1, scale: 1 });
            animate(".toss-coin", {
              opacity: [0, 1],
              scale: [0.5, 1],
              rotateY: [0, 720],
              duration: 760,
              ease: "out(4)",
            });
            animate(".role-badge", {
              opacity: [0, 1],
              translateY: [7, 0],
              delay: stagger(130, { start: 420 }),
              duration: 420,
              ease: "out(3)",
            });
          }
        }

        if (step === 3 && currentTeamStage === 3) {
          utils.set(".field-shell", { opacity: 0, scale: 0.84 });
          animate(".field-shell", {
            opacity: [0, 1],
            scale: [0.84, 1],
            duration: 760,
            ease: "out(4)",
          });
          animate(".player-token", {
            opacity: [0, 1],
            scale: [0, 1],
            delay: stagger(55, { start: 260, from: "center" }),
            duration: 440,
            ease: "out(4)",
          });
          animate(".team-card", {
            opacity: [0, 1],
            translateY: [12, 0],
            delay: stagger(120, { start: 820 }),
            duration: 480,
            ease: "out(3)",
          });
        }

        if (step === 4) {
          utils.set(".player-token", { opacity: 1, scale: 1 });
          animate(".player-role-label", {
            opacity: [0, 1],
            scale: [0.88, 1],
            delay: stagger(110, { start: 180 }),
            duration: 440,
            ease: "out(4)",
          });
        }

        if (step === 5 && currentGameplayStage === 0) {
          utils.set(".goal-panel", { opacity: 1 });
          animate(".goal-token", {
            opacity: [0, 1],
            translateY: [10, 0],
            delay: stagger(120),
            duration: 480,
            ease: "out(4)",
          });
        }

        if (step === 5 && currentGameplayStage === 1) {
          utils.set(".player-token", { opacity: 1, scale: 1 });
          animate(".play-cue", {
            opacity: [0, 1],
            translateY: [8, 0],
            delay: stagger(100),
            duration: 380,
            ease: "out(3)",
          });
          const runDelivery = () => {
            if (generation !== deliveryGeneration) return;
            const hitLeft = 18 + Math.random() * 64;
            const hitTop = 12 + Math.random() * 38;

            createTimeline({
              onComplete: () => {
                if (generation === deliveryGeneration) runDelivery();
              },
            })
              .add(".role-bowler", {
                top: ["79%", "66%"],
                rotate: [0, 4],
                duration: 1800,
                ease: "inOut(2)",
              }, 0)
              .add(".bowler-arm", {
                opacity: 1,
                rotate: [25, -120, 30],
                duration: 650,
                ease: "inOut(3)",
              }, 1250)
              .set(".play-ball", {
                opacity: 1,
                left: "50%",
                top: "66%",
                scale: 1,
              }, 1800)
              .add(".play-ball", {
                left: ["50%", "48.7%"],
                top: ["66%", "31%"],
                scale: [1, 0.82],
                duration: 1400,
                ease: "inOut(2)",
              }, 1800)
              .add(".play-ball", {
                left: ["48.7%", `${hitLeft}%`],
                top: ["31%", `${hitTop}%`],
                scale: [0.82, 1],
                duration: 1200,
                ease: "out(2)",
              }, 3200)
              .add(".hit-flash", {
                opacity: [0, 0.75, 0],
                scale: [0, 1.5, 2],
                duration: 650,
                ease: "out(3)",
              }, 3150)
              .add(".role-bowler", {
                top: ["66%", "79%"],
                rotate: [4, 0],
                duration: 1800,
                ease: "inOut(2)",
              }, 2400)
              .add(".bowler-arm", {
                rotate: [30, 25],
                duration: 500,
                ease: "out(2)",
              }, 1900)
              .add(".play-ball", { opacity: 0, duration: 1200 }, 4400);
          };

          runDelivery();
        }

        if (step === 5 && currentGameplayStage === 2) {
          utils.set(".player-token", { opacity: 1, scale: 1 });
          utils.set(".score-category-label", { opacity: 1 });
          utils.set(".score-divider", { opacity: 1 });
          animate(".score-method", {
            opacity: [0, 1],
            translateY: [10, 0],
            delay: stagger(70),
            duration: 400,
            ease: "out(3)",
          });
          animate(".score-method.is-active", {
            scale: [0.94, 1],
            delay: 120,
            duration: 460,
            ease: "out(4)",
          });

          const runScoringAnimation = () => {
            if (generation !== deliveryGeneration) return;
            const angle = Math.random() * Math.PI * 2;
            const boundaryRadius = currentScoringStage === 2 ? 56 : 44;
            const boundaryLeft = 50 + Math.cos(angle) * boundaryRadius;
            const boundaryTop = 50 + Math.sin(angle) * boundaryRadius;
            const timeline = createTimeline({
              onComplete: () => {
                if (generation === deliveryGeneration) runScoringAnimation();
              },
            })
              .set(".play-ball", { opacity: 0, left: "48.7%", top: "31%", scale: 1 }, 0)
              .set(".hit-flash", { opacity: 0, scale: 0 }, 0)
              .set(".score-boundary-flash", { opacity: 0, scale: 1 }, 0)
              .set(".extra-marker", { opacity: 0, scale: 0.76, translateY: 8 }, 0)
              .set(".batter-north", { top: "31%", left: "48.7%" }, 0)
              .set(".batter-south", { top: "69%", left: "51.3%" }, 0);

            if (currentScoringStage === 0) {
              timeline
                .add(".play-ball", {
                  opacity: [0, 1, 1],
                  left: ["48.7%", "34%"],
                  top: ["31%", "42%"],
                  scale: [0.8, 1],
                  duration: 700,
                  ease: "out(2)",
                }, 220)
                .add(".hit-flash", { opacity: [0, 0.75, 0], scale: [0, 1.5, 2], duration: 520, ease: "out(3)" }, 230)
                .add(".batter-north", { top: ["31%", "69%"], duration: 1450, ease: "inOut(2)" }, 520)
                .add(".batter-south", { top: ["69%", "31%"], duration: 1450, ease: "inOut(2)" }, 520)
                .add(".play-ball", { opacity: 0, duration: 950 }, 1970);
            } else if (currentScoringStage === 1) {
              timeline
                .add(".play-ball", {
                  opacity: [0, 1, 1],
                  left: ["48.7%", `${boundaryLeft}%`],
                  top: ["31%", `${boundaryTop}%`],
                  scale: [0.8, 1],
                  duration: 1200,
                  ease: "out(2)",
                }, 280)
                .add(".hit-flash", { opacity: [0, 0.75, 0], scale: [0, 1.5, 2], duration: 520, ease: "out(3)" }, 230)
                .add(".score-boundary-flash", { opacity: [0, 0.8, 0], scale: [0.98, 1.02, 1.04], duration: 560, ease: "out(3)" }, 1260)
                .add(".play-ball", { opacity: 0, duration: 950 }, 1820);
            } else if (currentScoringStage === 2) {
              timeline
                .set(".play-ball", { opacity: 1, scale: 0.8 }, 0)
                .add(".play-ball", {
                  opacity: 1,
                  left: ["48.7%", `${boundaryLeft}%`],
                  top: ["31%", `${boundaryTop}%`],
                  scale: [0.8, 1.95, 0.8],
                  duration: 1750,
                  ease: "linear",
                }, 0)
                .add(".hit-flash", { opacity: [0, 0.75, 0], scale: [0, 1.5, 2], duration: 520, ease: "out(3)" }, 0)
                .add(".score-boundary-flash", { opacity: [0, 0.9, 0], scale: [0.98, 1.03, 1.07], duration: 600, ease: "out(3)" }, 1150)
                .set(".play-ball", { opacity: 0 }, 1750)
                .add(".hit-flash", { opacity: 0, duration: 600 }, 1750);
            } else if (currentScoringStage === 3) {
              timeline
                .add(".play-ball", {
                  opacity: [0, 1, 1],
                  left: ["50%", "61%"],
                  top: ["69%", "17%"],
                  scale: [1, 0.86],
                  duration: 1250,
                  ease: "inOut(2)",
                }, 240)
                .add(".extra-marker", { opacity: [0, 1], scale: [0.76, 1], translateY: [8, 0], duration: 430, ease: "out(4)" }, 980)
                .add(".extra-marker", { opacity: [1, 0], duration: 350, ease: "in(2)" }, 1650)
                .add(".play-ball", { opacity: 0, duration: 950 }, 1490);
            } else if (currentScoringStage === 4) {
              timeline
                .add(".play-ball", {
                  opacity: [0, 1, 1],
                  left: ["50%", "48.7%"],
                  top: ["69%", "31%"],
                  scale: [1, 0.9],
                  duration: 1100,
                  ease: "inOut(2)",
                }, 220)
                .add(".extra-marker", { opacity: [0, 1], scale: [0.76, 1], translateY: [8, 0], duration: 430, ease: "out(4)" }, 720)
                .add(".extra-marker", { opacity: [1, 0], duration: 350, ease: "in(2)" }, 1600)
                .add(".play-ball", { opacity: 0, duration: 950 }, 1500);
            } else if (currentScoringStage === 5) {
              timeline
                .add(".play-ball", {
                  opacity: [0, 1, 1],
                  left: ["50%", "50%"],
                  top: ["69%", "17%"],
                  scale: [1, 0.86],
                  duration: 1250,
                  ease: "inOut(2)",
                }, 220)
                .add(".batter-north", { top: ["31%", "69%"], duration: 1350, ease: "inOut(2)" }, 850)
                .add(".batter-south", { top: ["69%", "31%"], duration: 1350, ease: "inOut(2)" }, 850)
                .add(".extra-marker", { opacity: [0, 1], scale: [0.76, 1], translateY: [8, 0], duration: 430, ease: "out(4)" }, 1320)
                .add(".extra-marker", { opacity: [1, 0], duration: 350, ease: "in(2)" }, 2250)
                .add(".play-ball", { opacity: 0, duration: 950 }, 1470);
            } else if (currentScoringStage === 6) {
              timeline
                .add(".play-ball", {
                  opacity: [0, 1, 1],
                  left: ["50%", "48.7%"],
                  top: ["69%", "31%"],
                  scale: [1, 0.9],
                  duration: 1050,
                  ease: "inOut(2)",
                }, 220)
                .add(".hit-flash", { opacity: [0, 0.65, 0], scale: [0, 1.2, 1.7], duration: 430, ease: "out(3)" }, 1170)
                .add(".play-ball", { left: ["48.7%", "35%"], top: ["31%", "40%"], duration: 650, ease: "out(2)" }, 1270)
                .add(".batter-north", { top: ["31%", "69%"], duration: 1350, ease: "inOut(2)" }, 1400)
                .add(".batter-south", { top: ["69%", "31%"], duration: 1350, ease: "inOut(2)" }, 1400)
                .add(".extra-marker", { opacity: [0, 1], scale: [0.76, 1], translateY: [8, 0], duration: 430, ease: "out(4)" }, 1740)
                .add(".extra-marker", { opacity: [1, 0], duration: 350, ease: "in(2)" }, 2760)
                .add(".play-ball", { opacity: 0, duration: 950 }, 1920);
            } else {
              timeline
                .add(".extra-marker", { opacity: [0, 1], scale: [0.7, 1.08, 1], translateY: [8, 0], duration: 620, ease: "out(4)" }, 300)
                .add(".extra-marker", { opacity: [1, 0], duration: 350, ease: "in(2)" }, 1650)
                .add(".hit-flash", { opacity: 0, duration: 650 }, 2000);
            }
          };

          runScoringAnimation();
        }

        if (step === 5 && currentGameplayStage === 3) {
          utils.set(".player-token", { opacity: 1, scale: 1 });
          animate(".play-ball", {
            opacity: [0, 1, 1],
            left: ["50%", "50%"],
            top: ["79%", "27%"],
            delay: 240,
            duration: 900,
            ease: "in(2)",
          });
          animate(".dismissal-method", {
            opacity: [0, 1],
            scale: [0.86, 1],
            delay: stagger(85, { start: 700 }),
            duration: 380,
            ease: "out(4)",
          });
        }

        if (step === 5 && currentGameplayStage === 4) {
          utils.set(".over-panel", { opacity: 1 });
          animate(".over-ball", {
            opacity: [0, 1],
            scale: [0, 1],
            delay: stagger(120, { start: 180 }),
            duration: 360,
            ease: "out(4)",
          });
        }
      });
    });

    return () => scope.current?.revert();
  }, []);

  useEffect(() => {
    setGroundHighlight(null);
    setRoleHighlight(null);
    scope.current?.methods.showStep(activeStep, teamStage, gameplayStage, scoringStage);
  }, [activeStep, teamStage, gameplayStage, scoringStage]);

  useEffect(() => {
    const handleArrowKeys = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isEditing =
        target?.isContentEditable ||
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT";

      if (isEditing || event.altKey || event.ctrlKey || event.metaKey) return;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        if (activeStep === 3 && teamStage < teamStages.length - 1) {
          setTeamStage((current) => current + 1);
        } else if (activeStep === 5 && gameplayStage === 2 && scoringStage < scoringStages.length - 1) {
          setScoringStage((current) => current + 1);
        } else if (activeStep === 5 && gameplayStage < gameplayStages.length - 1) {
          if (gameplayStage === 1) setScoringStage(0);
          setGameplayStage((current) => current + 1);
        } else {
          setActiveStep((current) => Math.min(steps.length - 1, current + 1));
        }
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        if (activeStep === 3 && teamStage > 0) {
          setTeamStage((current) => current - 1);
        } else if (activeStep === 5 && gameplayStage === 2 && scoringStage > 0) {
          setScoringStage((current) => current - 1);
        } else if (activeStep === 5 && gameplayStage > 0) {
          if (gameplayStage === 3) setScoringStage(scoringStages.length - 1);
          setGameplayStage((current) => current - 1);
        } else {
          setActiveStep((current) => Math.max(0, current - 1));
        }
      }
    };

    window.addEventListener("keydown", handleArrowKeys);
    return () => window.removeEventListener("keydown", handleArrowKeys);
  }, [activeStep, teamStage, gameplayStage, scoringStage]);

  const goTo = (index: number) => {
    const nextStep = Math.max(0, Math.min(steps.length - 1, index));
    if (nextStep === 3 && activeStep !== 3) setTeamStage(0);
    if (nextStep === 5 && activeStep !== 5) setGameplayStage(0);
    if (nextStep === 5 && activeStep !== 5) setScoringStage(0);
    setActiveStep(nextStep);
  };
  const goForward = () => {
    if (activeStep === 3 && teamStage < teamStages.length - 1) {
      setTeamStage((current) => current + 1);
      return;
    }
    if (activeStep === 5 && gameplayStage === 2 && scoringStage < scoringStages.length - 1) {
      setScoringStage((current) => current + 1);
      return;
    }
    if (activeStep === 5 && gameplayStage < gameplayStages.length - 1) {
      if (gameplayStage === 1) setScoringStage(0);
      setGameplayStage((current) => current + 1);
      return;
    }
    setActiveStep((current) => Math.min(steps.length - 1, current + 1));
  };
  const goBack = () => {
    if (activeStep === 3 && teamStage > 0) {
      setTeamStage((current) => current - 1);
      return;
    }
    if (activeStep === 5 && gameplayStage === 2 && scoringStage > 0) {
      setScoringStage((current) => current - 1);
      return;
    }
    if (activeStep === 5 && gameplayStage > 0) {
      if (gameplayStage === 3) setScoringStage(scoringStages.length - 1);
      setGameplayStage((current) => current - 1);
      return;
    }
    setActiveStep((current) => Math.max(0, current - 1));
  };
  const step = activeStep === 3
    ? { ...steps[3], ...teamStages[teamStage] }
    : activeStep === 5 && gameplayStage === 2
        ? { ...steps[5], ...scoringStages[scoringStage] }
        : activeStep === 5
          ? { ...steps[5], ...gameplayStages[gameplayStage] }
          : steps[activeStep];
  const lessonComplete = activeStep === steps.length - 1 && gameplayStage === gameplayStages.length - 1;

  return (
    <div className={`lesson lesson-step-${activeStep + 1} team-stage-${teamStage + 1} gameplay-stage-${gameplayStage + 1} scoring-stage-${scoringStage + 1}`} ref={root}>
      <header className="lesson-header">
        <a className="brand" href="#lesson" aria-label="Crease lesson home">
          <span className="brand-mark" aria-hidden="true">C</span>
          <span>CREASE</span>
        </a>
        <div className="lesson-meta"><span>Basics</span><i />Lesson 01</div>
      </header>

      <main className="lesson-canvas" id="lesson">
        <section className="copy-zone" aria-live="polite">
          <div className="step-copy" key={`${activeStep}-${teamStage}-${gameplayStage}-${scoringStage}`}>
            <p className="eyebrow">{step.number} / {String(steps.length).padStart(2, "0")}</p>
            <h1>{step.title}</h1>
            <p className="step-body">{step.body}</p>
          </div>

          <div className="concept-board" aria-hidden={activeStep !== 0}>
            <div className="concept-piece"><span className="mini-bat" />Bat</div>
            <span className="concept-plus concept-piece">+</span>
            <div className="concept-piece"><span className="mini-ball" />Ball</div>
            <span className="concept-plus concept-piece">=</span>
            <div className="concept-piece concept-result"><b>RUNS</b></div>
          </div>
        </section>

        <section className="ground-zone" aria-label="Top-down diagram of a cricket ground">
          <div className="field-anchor">
            <div className="field-shell" data-highlight={groundHighlight ?? undefined} data-role-highlight={roleHighlight ?? undefined}>
              <div className="field-grass">
              <div className="boundary-rope" />
              <div className="inner-circle" />
              <div className="pitch-strip">
                <div className="crease crease-north" />
                <div className="crease crease-south" />
                <div className="stumps stumps-north"><i /><i /><i /></div>
                <div className="stumps stumps-south"><i /><i /><i /></div>
              </div>

              {fielders.map(({ left, top, role }, index) => (
                <div
                  className={`player-token fielder role-${role}`}
                  key={`fielder-${index}`}
                  style={{ left: `${left}%`, top: `${top}%` }}
                  aria-label={role === "wicketkeeper" ? "Wicketkeeper" : role === "bowler" ? "Bowler" : `Fielder ${index}`}
                >
                  <span>{index + 1}</span>
                  {role === "bowler" ? <i className="bowler-arm" aria-hidden="true" /> : null}
                </div>
              ))}
              <div className="player-token batter batter-north role-batsmen"><span>A</span></div>
              <div className="player-token batter batter-south role-batsmen"><span>B</span></div>
              <div className="play-ball" aria-hidden="true" />
              <div className="hit-flash" aria-hidden="true" />
              <div className="score-boundary-flash" aria-hidden="true" />
              <div className="extra-marker" aria-hidden="true">
                {"marker" in scoringStages[scoringStage] ? scoringStages[scoringStage].marker : ""}
              </div>
              </div>
            </div>
          </div>

          <div className="ground-label-layer">
            <button className="ground-label boundary-label" type="button" onPointerEnter={() => setGroundHighlight("boundary")} onPointerLeave={() => setGroundHighlight(null)} onFocus={() => setGroundHighlight("boundary")} onBlur={() => setGroundHighlight(null)}><span />Boundary rope</button>
            <button className="ground-label inner-circle-label" type="button" onPointerEnter={() => setGroundHighlight("circle")} onPointerLeave={() => setGroundHighlight(null)} onFocus={() => setGroundHighlight("circle")} onBlur={() => setGroundHighlight(null)}><span />30-yard circle</button>
            <button className="ground-label pitch-label" type="button" onPointerEnter={() => setGroundHighlight("pitch")} onPointerLeave={() => setGroundHighlight(null)} onFocus={() => setGroundHighlight("pitch")} onBlur={() => setGroundHighlight(null)}><span />Central pitch</button>
          </div>

          <div className="pitch-detail" aria-hidden={activeStep !== 2}>
            <div className="pitch-distance"><span>22 yards</span><i /></div>
            <div className="detail-strip">
              <div className="detail-line return-left" />
              <div className="detail-line return-right" />
              <div className="detail-line bowling-line bowling-north" />
              <div className="detail-line bowling-line bowling-south" />
              <div className="detail-line popping-line popping-north" />
              <div className="detail-line popping-line popping-south" />
              <div className="detail-stumps detail-stumps-north"><i /><i /><i /></div>
              <div className="detail-stumps detail-stumps-south"><i /><i /><i /></div>
              <button className="pitch-callout callout-wicket" type="button"><span />Wicket</button>
              <button className="pitch-callout callout-bowling" type="button"><span />Bowling crease</button>
              <button className="pitch-callout callout-popping" type="button"><span />Popping crease</button>
              <button className="pitch-callout callout-return" type="button"><span />Return crease</button>
            </div>
          </div>

          <div className="team-sequence" aria-hidden={activeStep !== 3 || teamStage === 3}>
            <div className="team-pair">
              {["A", "B"].map((team) => (
                <div className={`team-side team-side-${team.toLowerCase()}`} key={team}>
                  <span className="team-name">Team {team}</span>
                  <div className="roster" aria-label={`Team ${team}, 11 players`}>
                    {Array.from({ length: 11 }, (_, index) => <i className={`roster-dot roster-dot-${team.toLowerCase()}`} key={index}>{index + 1}</i>)}
                  </div>
                  <b className="role-badge">{team === "A" ? "Bat first" : "Bowl & field"}</b>
                </div>
              ))}
              <div className="toss-coin">TOSS</div>
            </div>
          </div>

          <div className="teams-summary" aria-hidden={activeStep !== 3 || teamStage !== 3}>
            <div className="team-card fielding-card"><span className="team-swatch cream" /><p>Fielding team<strong>11 on the ground</strong></p></div>
            <div className="team-card batting-card"><span className="team-swatch acid" /><p>Batting team<strong>2 batters at a time</strong></p></div>
          </div>

          <div className="player-role-layer" aria-hidden={activeStep !== 4}>
            {([
              ["wicketkeeper", "Wicket-keeper"],
              ["batsmen", "Batsmen"],
              ["fielder", "Fielder"],
              ["bowler", "Bowler"],
            ] as const).map(([role, label]) => (
              <button
                className={`player-role-label ${role}-role-label`}
                type="button"
                key={role}
                tabIndex={activeStep === 4 ? 0 : -1}
                onPointerEnter={() => setRoleHighlight(role)}
                onPointerLeave={() => setRoleHighlight(null)}
                onFocus={() => setRoleHighlight(role)}
                onBlur={() => setRoleHighlight(null)}
              >
                <i />{label}
              </button>
            ))}
          </div>

          <div className="play-cue-layer" aria-hidden={activeStep !== 5 || gameplayStage !== 1}>
            <div className="play-cue batsman-play-cue"><i />Batsman hits here</div>
            <div className="play-cue bowler-play-cue"><i />Bowler runs in</div>
          </div>

          <div className="gameplay-panel goal-panel" aria-hidden={activeStep !== 5 || gameplayStage !== 0}>
            <span className="goal-kicker goal-token">Goal</span>
            <div className="goal-equation">
              <b className="goal-token">Your runs</b>
              <i className="goal-token">&gt;</i>
              <b className="goal-token">Their runs</b>
            </div>
          </div>

          <div className="score-methods" aria-hidden={activeStep !== 5 || gameplayStage !== 2}>
            <div className="score-category score-category-bat">
              <span className="score-category-label">Runs off the bat</span>
              <div className="score-category-grid score-bat-grid">
                {scoringStages.map((method, index) => method.category === "bat" ? (
                  <button
                    className={`score-method ${index === scoringStage ? "is-active" : ""}`}
                    type="button"
                    key={method.key}
                    onClick={() => setScoringStage(index)}
                    tabIndex={activeStep === 5 && gameplayStage === 2 ? 0 : -1}
                  >
                    <b>{method.label}</b><span>{method.detail}</span>
                  </button>
                ) : null)}
              </div>
            </div>

            <i className="score-divider" aria-hidden="true" />

            <div className="score-category score-category-extras">
              <span className="score-category-label">Extras</span>
              <div className="score-category-grid score-extras-grid">
                {scoringStages.map((method, index) => method.category === "extra" ? (
                  <button
                    className={`score-method score-extra-method ${index === scoringStage ? "is-active" : ""}`}
                    type="button"
                    key={method.key}
                    onClick={() => setScoringStage(index)}
                    tabIndex={activeStep === 5 && gameplayStage === 2 ? 0 : -1}
                  >
                    <b>{method.label}</b><span>{method.detail}</span>
                  </button>
                ) : null)}
              </div>
            </div>
          </div>

          <div className="dismissal-methods" aria-hidden={activeStep !== 5 || gameplayStage !== 3}>
            {["Bowled", "Caught", "LBW", "Run out", "Stumped"].map((method) => (
              <span className="dismissal-method" key={method}>{method}</span>
            ))}
          </div>

          <div className="gameplay-panel over-panel" aria-hidden={activeStep !== 5 || gameplayStage !== 4}>
            <span className="over-kicker">1 over</span>
            <div className="over-balls" aria-label="Six legal balls">
              {Array.from({ length: 6 }, (_, index) => <i className="over-ball" key={index}>{index + 1}</i>)}
            </div>
            <strong>6 legal balls</strong>
          </div>
        </section>
      </main>

      <aside className="lesson-index" aria-label="Lesson steps">
        <div className="index-heading">
          <span>In this lesson</span>
          <b>{String(activeStep + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</b>
        </div>
        <ol>
          {steps.map((item, index) => (
            <li key={item.number} className={index === activeStep ? "active" : index < activeStep ? "complete" : ""}>
              <button type="button" onClick={() => goTo(index)} aria-current={index === activeStep ? "step" : undefined}>
                <span className="index-number">{index < activeStep ? "✓" : item.number}</span>
                <span>{item.short}</span>
                <i aria-hidden="true" />
              </button>
            </li>
          ))}
        </ol>

        <div className="lesson-controls">
          <button className="back-button" type="button" onClick={goBack} disabled={activeStep === 0} aria-label="Previous step">←</button>
          <button className="next-button" type="button" onClick={goForward} disabled={lessonComplete}>
            <span>{lessonComplete ? "Complete" : "Next"}</span>
            <b aria-hidden="true">{lessonComplete ? "✓" : "→"}</b>
          </button>
        </div>
      </aside>
    </div>
  );
}
