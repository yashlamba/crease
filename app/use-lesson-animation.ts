"use client";

import { animate, createScope, createTimeline, stagger, utils } from "animejs";
import { useEffect, useRef, type RefObject } from "react";
import { fielders } from "./lesson-content";

type LessonPosition = {
  activeStep: number;
  teamStage: number;
  gameplayStage: number;
  scoringStage: number;
  dismissalStage: number;
  overStage: number;
  scoreReadingStage: number;
};

export function useLessonAnimation(root: RefObject<HTMLDivElement | null>, {
  activeStep, teamStage, gameplayStage, scoringStage, dismissalStage, overStage, scoreReadingStage,
}: LessonPosition) {
  const scope = useRef<ReturnType<typeof createScope> | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    scope.current = createScope({ root }).add((self) => {
      let deliveryGeneration = 0;

      self?.add("showStep", (step: number, currentTeamStage: number, currentGameplayStage: number, currentScoringStage: number, currentDismissalStage: number, currentOverStage: number) => {
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
          ".wicket-bail",
          ".wicket-marker",
          ".lbw-path",
          ".dismissal-method",
          ".over-ball",
          ".over-delivery",
          ".end-switch-piece",
          ".score-read-piece",
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
        utils.set(".stumps-north i", { translateX: 0, translateY: 0, rotate: 0 });
        utils.set(".wicket-bail", { opacity: 1, translateX: 0, translateY: 0, rotate: 0 });
        utils.set(".wicket-marker", { opacity: 0, scale: 0.78, translateY: 8 });
        utils.set(".lbw-path", { opacity: 0, scaleY: 0 });
        utils.set(".dismissal-method", { opacity: 0, scale: 0.86 });
        utils.set(".over-ball", { opacity: 0, scale: 0 });
        utils.set(".over-delivery", { opacity: 0, translateY: 8 });
        utils.set(".end-switch-piece", { opacity: 0, scale: 0.86 });
        utils.set(".score-read-piece", { opacity: 0, translateY: 8 });

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
          utils.set(".gameplay-panel", { opacity: step === 5 && (currentGameplayStage === 0 || currentGameplayStage === 4 || currentGameplayStage === 5) ? 1 : 0 });
          utils.set(".goal-token", { opacity: step === 5 && currentGameplayStage === 0 ? 1 : 0, translateY: 0 });
          utils.set(".play-cue", { opacity: step === 5 && currentGameplayStage === 1 ? 1 : 0, translateY: 0 });
          utils.set(".score-method", { opacity: step === 5 && currentGameplayStage === 2 ? 1 : 0, translateY: 0, scale: 1 });
          utils.set(".score-category-label", { opacity: step === 5 && currentGameplayStage === 2 ? 1 : 0 });
          utils.set(".score-divider", { opacity: step === 5 && currentGameplayStage === 2 ? 1 : 0 });
          utils.set(".wicket-marker", { opacity: step === 5 && currentGameplayStage === 3 ? 1 : 0, scale: 1, translateY: 0 });
          utils.set(".lbw-path", { opacity: step === 5 && currentGameplayStage === 3 && currentDismissalStage === 2 ? 0.9 : 0, scaleY: 1 });
          utils.set(".score-boundary-flash", { opacity: step === 5 && currentGameplayStage === 2 && (currentScoringStage === 1 || currentScoringStage === 2) ? 0.65 : 0, scale: 1 });
          utils.set(".extra-marker", { opacity: step === 5 && currentGameplayStage === 2 && currentScoringStage >= 3 ? 1 : 0, scale: 1, translateY: 0 });
          utils.set(".dismissal-method", { opacity: step === 5 && currentGameplayStage === 3 ? 1 : 0, scale: 1 });
          utils.set(".over-ball", { opacity: step === 5 && currentGameplayStage === 4 ? 1 : 0, scale: 1 });
          utils.set(".over-delivery", { opacity: step === 5 && currentGameplayStage === 4 ? 1 : 0, translateY: 0 });
          utils.set(".end-switch-piece", { opacity: step === 5 && currentGameplayStage === 4 ? 1 : 0, scale: 1 });
          utils.set(".score-read-piece", { opacity: step === 5 && currentGameplayStage === 5 ? 1 : 0, translateY: 0 });
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
          animate(".dismissal-method", {
            opacity: [0, 1],
            scale: [0.86, 1],
            delay: stagger(85, { start: 220 }),
            duration: 380,
            ease: "out(4)",
          });

          const runDismissalAnimation = () => {
            if (generation !== deliveryGeneration) return;

            const catchingOptions = [1, 2, 3, 4, 5, 6];
            const catchingIndex = catchingOptions[Math.floor(Math.random() * catchingOptions.length)];
            const catchingFielder = fielders[catchingIndex];
            const catchingSelector = `.fielding-player-${catchingIndex}`;

            const timeline = createTimeline({
              onComplete: () => {
                if (generation === deliveryGeneration) runDismissalAnimation();
              },
            })
              .set(".play-ball", { opacity: 0, left: "50%", top: "66%", scale: 1 }, 0)
              .set(".role-bowler", { top: "79%", rotate: 0 }, 0)
              .set(".bowler-arm", { opacity: 0, rotate: 25 }, 0)
              .set(".stumps-north i", { translateX: 0, translateY: 0, rotate: 0 }, 0)
              .set(".stumps-south i", { translateX: 0, translateY: 0, rotate: 0 }, 0)
              .set(".wicket-bail", { opacity: 1, translateX: 0, translateY: 0, rotate: 0 }, 0)
              .set(".wicket-marker", { opacity: 0, scale: 0.78, translateY: 8 }, 0)
              .set(".lbw-path", { opacity: 0, scaleY: 0 }, 0)
              .set(".batter-north", { top: "31%", left: "48.7%", scale: 1 }, 0)
              .set(".batter-south", { top: "69%", left: "51.3%", scale: 1 }, 0);

            if (currentDismissalStage !== 3) {
              timeline
                .add(".role-bowler", {
                top: ["79%", "66%"],
                rotate: [0, 4],
                duration: 1500,
                ease: "inOut(2)",
              }, 0)
              .add(".bowler-arm", {
                opacity: 1,
                rotate: [25, -120, 30],
                duration: 650,
                ease: "inOut(3)",
              }, 950)
              .set(".play-ball", { opacity: 1 }, 1500)
              .add(".role-bowler", {
                top: ["66%", "79%"],
                rotate: [4, 0],
                duration: 1700,
                ease: "inOut(2)",
              }, 2050)
              .add(".bowler-arm", { rotate: [30, 25], duration: 500, ease: "out(2)" }, 1550);
            }

            if (currentDismissalStage === 0) {
              timeline
                .add(".play-ball", { left: ["50%", "50%"], top: ["66%", "27%"], scale: [1, 0.82], duration: 1250, ease: "in(2)" }, 1500)
                .set(".play-ball", { opacity: 0 }, 2750)
                .add(".stumps-north i:nth-child(1)", { translateX: -5, translateY: -3, rotate: -28, duration: 430, ease: "out(4)" }, 2700)
                .add(".stumps-north i:nth-child(2)", { translateY: -5, rotate: 18, duration: 430, ease: "out(4)" }, 2700)
                .add(".stumps-north i:nth-child(3)", { translateX: 5, translateY: -2, rotate: 32, duration: 430, ease: "out(4)" }, 2700)
                .add(".stumps-north .bail-left", { opacity: [1, 0], translateX: -12, translateY: -10, rotate: -55, duration: 520, ease: "out(3)" }, 2660)
                .add(".stumps-north .bail-right", { opacity: [1, 0], translateX: 12, translateY: -9, rotate: 65, duration: 520, ease: "out(3)" }, 2660)
                .add(".wicket-marker", { opacity: [0, 1], scale: [0.78, 1], translateY: [8, 0], duration: 380, ease: "out(4)" }, 2820)
                .add(".wicket-marker", { opacity: [1, 0], duration: 300, ease: "in(2)" }, 3950)
                .set(".stumps-north i", { translateX: 0, translateY: 0, rotate: 0 }, 4300)
                .set(".wicket-bail", { opacity: 1, translateX: 0, translateY: 0, rotate: 0 }, 4300)
                .add(".wicket-marker", { opacity: 0, duration: 700 }, 4300);
            } else if (currentDismissalStage === 1) {
              timeline
                .add(".play-ball", { left: ["50%", "48.7%"], top: ["66%", "31%"], scale: [1, 0.82], duration: 1150, ease: "inOut(2)" }, 1500)
                .add(".hit-flash", { opacity: [0, 0.75, 0], scale: [0, 1.5, 2], duration: 520, ease: "out(3)" }, 2580)
                .add(".play-ball", { left: ["48.7%", `${catchingFielder.left}%`], top: ["31%", `${catchingFielder.top}%`], scale: [0.82, 1], duration: 1200, ease: "out(2)" }, 2650)
                .add(catchingSelector, { scale: [1, 1.45, 1.12], duration: 520, ease: "out(4)" }, 3770)
                .set(".play-ball", { opacity: 0 }, 3850)
                .add(".wicket-marker", { opacity: [0, 1], scale: [0.78, 1], translateY: [8, 0], duration: 380, ease: "out(4)" }, 3920)
                .add(".wicket-marker", { opacity: [1, 0], duration: 300, ease: "in(2)" }, 5000)
                .add(".wicket-marker", { opacity: 0, duration: 700 }, 5300);
            } else if (currentDismissalStage === 2) {
              timeline
                .add(".play-ball", { left: ["50%", "48.7%"], top: ["66%", "31%"], scale: [1, 0.84], duration: 1250, ease: "inOut(2)" }, 1500)
                .add(".batter-north", { scale: [1, 1.32, 1], duration: 480, ease: "out(4)" }, 2670)
                .set(".play-ball", { opacity: 0 }, 2750)
                .add(".lbw-path", { opacity: [0, 0.9], scaleY: [0, 1], duration: 520, ease: "out(3)" }, 2760)
                .add(".wicket-marker", { opacity: [0, 1], scale: [0.78, 1], translateY: [8, 0], duration: 380, ease: "out(4)" }, 3200)
                .add(".wicket-marker", { opacity: [1, 0], duration: 300, ease: "in(2)" }, 4300)
                .add(".lbw-path", { opacity: [0.9, 0], duration: 300, ease: "in(2)" }, 4300)
                .add(".wicket-marker", { opacity: 0, duration: 700 }, 4600);
            } else if (currentDismissalStage === 3) {
              timeline
                .set(".play-ball", { opacity: 1, left: "33%", top: "55%", scale: 1 }, 250)
                .add(".fielding-player-5", { scale: [1, 1.4, 1], duration: 480, ease: "out(4)" }, 200)
                .add(".batter-north", { top: ["31%", "65%"], duration: 1450, ease: "inOut(2)" }, 250)
                .add(".batter-south", { top: ["69%", "38%"], duration: 1450, ease: "inOut(2)" }, 250)
                .add(".play-ball", { left: ["33%", "50%"], top: ["55%", "73%"], scale: [1, 0.84], duration: 900, ease: "in(2)" }, 650)
                .set(".play-ball", { opacity: 0 }, 1550)
                .add(".stumps-south i:nth-child(1)", { translateX: -5, translateY: 3, rotate: -28, duration: 430, ease: "out(4)" }, 1500)
                .add(".stumps-south i:nth-child(2)", { translateY: 5, rotate: 18, duration: 430, ease: "out(4)" }, 1500)
                .add(".stumps-south i:nth-child(3)", { translateX: 5, translateY: 2, rotate: 32, duration: 430, ease: "out(4)" }, 1500)
                .add(".stumps-south .bail-left", { opacity: [1, 0], translateX: -12, translateY: 10, rotate: -55, duration: 520, ease: "out(3)" }, 1460)
                .add(".stumps-south .bail-right", { opacity: [1, 0], translateX: 12, translateY: 9, rotate: 65, duration: 520, ease: "out(3)" }, 1460)
                .add(".wicket-marker", { opacity: [0, 1], scale: [0.78, 1], translateY: [8, 0], duration: 380, ease: "out(4)" }, 1650)
                .add(".wicket-marker", { opacity: [1, 0], duration: 300, ease: "in(2)" }, 2850)
                .set(".stumps-south i", { translateX: 0, translateY: 0, rotate: 0 }, 3200)
                .set(".wicket-bail", { opacity: 1, translateX: 0, translateY: 0, rotate: 0 }, 3200)
                .add(".wicket-marker", { opacity: 0, duration: 750 }, 3200);
            } else {
              timeline
                .add(".batter-north", { top: ["31%", "38%"], duration: 900, ease: "inOut(2)" }, 1150)
                .add(".play-ball", { left: ["50%", "54%"], top: ["66%", "31%"], scale: [1, 0.84], duration: 1200, ease: "inOut(2)" }, 1500)
                .add(".play-ball", { left: ["54%", "50%"], top: ["31%", "18%"], duration: 520, ease: "out(2)" }, 2700)
                .add(".fielding-player-0", { scale: [1, 1.4, 1], duration: 450, ease: "out(4)" }, 3150)
                .add(".play-ball", { left: ["50%", "50%"], top: ["18%", "27%"], duration: 430, ease: "in(2)" }, 3260)
                .set(".play-ball", { opacity: 0 }, 3690)
                .add(".stumps-north i:nth-child(1)", { translateX: -5, translateY: -3, rotate: -28, duration: 430, ease: "out(4)" }, 3640)
                .add(".stumps-north i:nth-child(2)", { translateY: -5, rotate: 18, duration: 430, ease: "out(4)" }, 3640)
                .add(".stumps-north i:nth-child(3)", { translateX: 5, translateY: -2, rotate: 32, duration: 430, ease: "out(4)" }, 3640)
                .add(".stumps-north .bail-left", { opacity: [1, 0], translateX: -12, translateY: -10, rotate: -55, duration: 520, ease: "out(3)" }, 3600)
                .add(".stumps-north .bail-right", { opacity: [1, 0], translateX: 12, translateY: -9, rotate: 65, duration: 520, ease: "out(3)" }, 3600)
                .add(".wicket-marker", { opacity: [0, 1], scale: [0.78, 1], translateY: [8, 0], duration: 380, ease: "out(4)" }, 3780)
                .add(".wicket-marker", { opacity: [1, 0], duration: 300, ease: "in(2)" }, 4900)
                .set(".stumps-north i", { translateX: 0, translateY: 0, rotate: 0 }, 5250)
                .set(".wicket-bail", { opacity: 1, translateX: 0, translateY: 0, rotate: 0 }, 5250)
                .add(".wicket-marker", { opacity: 0, duration: 700 }, 5250);
            }
          };

          runDismissalAnimation();
        }

        if (step === 5 && currentGameplayStage === 4) {
          utils.set(".over-panel", { opacity: 1 });
          if (currentOverStage === 0) {
            animate(".over-ball", {
              opacity: [0, 1],
              scale: [0, 1],
              delay: stagger(120, { start: 180 }),
              duration: 360,
              ease: "out(4)",
            });
          } else if (currentOverStage === 1) {
            animate(".over-delivery", {
              opacity: [0, 1],
              translateY: [8, 0],
              delay: stagger(100, { start: 150 }),
              duration: 360,
              ease: "out(3)",
            });
          } else {
            animate(".end-switch-piece", {
              opacity: [0, 1],
              scale: [0.86, 1],
              delay: stagger(130, { start: 160 }),
              duration: 420,
              ease: "out(4)",
            });
          }
        }

        if (step === 5 && currentGameplayStage === 5) {
          utils.set(".score-reader-panel", { opacity: 1 });
          animate(".score-read-piece", {
            opacity: [0, 1],
            translateY: [8, 0],
            delay: stagger(90, { start: 120 }),
            duration: 420,
            ease: "out(3)",
          });
        }
      });
    });

    return () => scope.current?.revert();
  }, [root]);

  useEffect(() => {
    scope.current?.methods.showStep(activeStep, teamStage, gameplayStage, scoringStage, dismissalStage, overStage);
  }, [activeStep, teamStage, gameplayStage, scoringStage, dismissalStage, overStage, scoreReadingStage]);

}
