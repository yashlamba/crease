"use client";

import { animate, createScope, stagger, utils } from "animejs";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    short: "The game",
    title: "What is cricket?",
    body: "A bat-and-ball game: one team scores runs, the other bowls and fields. Then they swap. Most runs wins.",
  },
  {
    number: "02",
    short: "The ground",
    title: "The ground",
    body: "An oval playing area with a boundary around it and a 22-yard pitch at the centre.",
  },
  {
    number: "03",
    short: "The pitch",
    title: "The pitch",
    body: "The 22-yard centre strip. A wicket stands at each end, marked by bowling, popping and return creases.",
  },
  {
    number: "04",
    short: "The teams",
    title: "The teams",
    body: "Cricket is played between two sides.",
  },
];

const teamStages = [
  { title: "Two teams", body: "Cricket is played between two sides." },
  { title: "11 players each", body: "Each team names 11 players for the match." },
  { title: "The toss", body: "The toss decides which side bats first. The other side bowls and fields." },
  { title: "Ready to play", body: "All 11 fielders take the ground. Two batters enter—one at each end of the pitch." },
];

const fielders = [
  [50, 22], [31, 27], [69, 29], [20, 43], [80, 44], [33, 55],
  [67, 57], [21, 72], [78, 73], [41, 82], [58, 83],
];

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [teamStage, setTeamStage] = useState(0);
  const [groundHighlight, setGroundHighlight] = useState<"boundary" | "circle" | "pitch" | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    scope.current = createScope({ root }).add((self) => {
      self.add("showStep", (step: number, currentTeamStage: number) => {
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
        ].forEach((target) => utils.remove(target));

        utils.set(".field-shell", {
          opacity: step === 2 ? 0.28 : step === 1 || (step === 3 && currentTeamStage === 3) ? 1 : 0,
          scale: step === 2 ? 1.04 : step === 1 || (step === 3 && currentTeamStage === 3) ? 1 : 0.72,
          rotate: 0,
        });
        utils.set(".pitch-strip", { scaleY: 1, opacity: step === 1 || step === 2 || (step === 3 && currentTeamStage === 3) ? 1 : 0 });
        utils.set(".pitch-detail", { opacity: 0, scale: 0.76, rotate: 2 });
        utils.set(".player-token", { opacity: 0, scale: 0 });
        utils.set(".team-card", { opacity: 0, translateY: 12 });
        utils.set(".ground-label", { opacity: 0, translateY: 8 });
        utils.set(".concept-piece", { opacity: 0, scale: 0.75, translateY: 10 });
        utils.set(".team-sequence", { opacity: 0 });
        utils.set(".team-side", { opacity: 0, translateY: 18 });
        utils.set(".roster-dot", { opacity: 0, scale: 0 });
        utils.set(".toss-coin", { opacity: 0, scale: 0.5, rotateY: 0 });
        utils.set(".role-badge", { opacity: 0, translateY: 7 });

        if (prefersReducedMotion) {
          utils.set(".step-copy", { opacity: 1, translateY: 0 });
          utils.set(".concept-piece", { opacity: step === 0 ? 1 : 0, scale: 1, translateY: 0 });
          utils.set(".field-shell", { opacity: step === 2 ? 0.28 : step === 1 || (step === 3 && currentTeamStage === 3) ? 1 : 0, scale: step === 2 ? 1.04 : 1 });
          utils.set(".pitch-strip", { opacity: step === 1 || step === 2 || (step === 3 && currentTeamStage === 3) ? 1 : 0 });
          utils.set(".pitch-detail", { opacity: step === 2 ? 1 : 0, scale: 1, rotate: 0 });
          utils.set(".ground-label", { opacity: step === 1 ? 1 : 0, translateY: 0 });
          utils.set(".pitch-callout", { opacity: step === 2 ? 1 : 0, translateY: 0 });
          utils.set(".player-token", { opacity: step === 3 && currentTeamStage === 3 ? 1 : 0, scale: 1 });
          utils.set(".team-card", { opacity: step === 3 && currentTeamStage === 3 ? 1 : 0, translateY: 0 });
          utils.set(".team-sequence", { opacity: step === 3 && currentTeamStage < 3 ? 1 : 0 });
          utils.set(".team-side", { opacity: step === 3 && currentTeamStage < 3 ? 1 : 0, translateY: 0 });
          utils.set(".roster-dot", { opacity: step === 3 && currentTeamStage >= 1 && currentTeamStage <= 2 ? 1 : 0, scale: 1 });
          utils.set(".toss-coin", { opacity: step === 3 && currentTeamStage === 2 ? 1 : 0, scale: 1, rotateY: 0 });
          utils.set(".role-badge", { opacity: step === 3 && currentTeamStage === 2 ? 1 : 0, translateY: 0 });
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
      });
    });

    return () => scope.current?.revert();
  }, []);

  useEffect(() => {
    setGroundHighlight(null);
    scope.current?.methods.showStep(activeStep, teamStage);
  }, [activeStep, teamStage]);

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
        } else {
          setActiveStep((current) => Math.min(steps.length - 1, current + 1));
        }
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        if (activeStep === 3 && teamStage > 0) {
          setTeamStage((current) => current - 1);
        } else {
          setActiveStep((current) => Math.max(0, current - 1));
        }
      }
    };

    window.addEventListener("keydown", handleArrowKeys);
    return () => window.removeEventListener("keydown", handleArrowKeys);
  }, [activeStep, teamStage]);

  const goTo = (index: number) => {
    const nextStep = Math.max(0, Math.min(steps.length - 1, index));
    if (nextStep === 3 && activeStep !== 3) setTeamStage(0);
    setActiveStep(nextStep);
  };
  const goForward = () => {
    if (activeStep === 3 && teamStage < teamStages.length - 1) {
      setTeamStage((current) => current + 1);
      return;
    }
    setActiveStep((current) => Math.min(steps.length - 1, current + 1));
  };
  const goBack = () => {
    if (activeStep === 3 && teamStage > 0) {
      setTeamStage((current) => current - 1);
      return;
    }
    setActiveStep((current) => Math.max(0, current - 1));
  };
  const step = activeStep === 3 ? { ...steps[3], ...teamStages[teamStage] } : steps[activeStep];
  const lessonComplete = activeStep === steps.length - 1 && teamStage === teamStages.length - 1;

  return (
    <div className={`lesson lesson-step-${activeStep + 1} team-stage-${teamStage + 1}`} ref={root}>
      <header className="lesson-header">
        <a className="brand" href="#lesson" aria-label="Crease lesson home">
          <span className="brand-mark" aria-hidden="true">C</span>
          <span>CREASE</span>
        </a>
        <div className="lesson-meta"><span>Basics</span><i />Lesson 01</div>
      </header>

      <main className="lesson-canvas" id="lesson">
        <section className="copy-zone" aria-live="polite">
          <div className="step-copy" key={`${activeStep}-${teamStage}`}>
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
            <div className="field-shell" data-highlight={groundHighlight ?? undefined}>
              <div className="field-grass">
              <div className="boundary-rope" />
              <div className="inner-circle" />
              <div className="pitch-strip">
                <div className="crease crease-north" />
                <div className="crease crease-south" />
                <div className="stumps stumps-north"><i /><i /><i /></div>
                <div className="stumps stumps-south"><i /><i /><i /></div>
              </div>

              {fielders.map(([left, top], index) => (
                <div
                  className="player-token fielder"
                  key={`fielder-${index}`}
                  style={{ left: `${left}%`, top: `${top}%` }}
                  aria-label={`Fielder ${index + 1}`}
                >
                  <span>{index + 1}</span>
                </div>
              ))}
              <div className="player-token batter batter-north"><span>A</span></div>
                <div className="player-token batter batter-south"><span>B</span></div>
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
