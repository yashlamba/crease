"use client";

import { useRef } from "react";
import { steps, teamStages, gameplayStages, scoringStages, dismissalStages, overStages, scoreReadingStages, fielders } from "./lesson-content";
import { useLessonAnimation } from "./use-lesson-animation";
import { useLessonNavigation } from "./use-lesson-navigation";

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const navigation = useLessonNavigation();
  const {
    activeStep, teamStage, gameplayStage, scoringStage, dismissalStage, overStage, scoreReadingStage,
    groundHighlight, roleHighlight, setGroundHighlight, setRoleHighlight,
    setScoringStage, setDismissalStage, setOverStage, setScoreReadingStage, goTo, goForward, goBack,
  } = navigation;
  useLessonAnimation(root, navigation);

  const gameplayCopy = [
    gameplayStages[0],
    gameplayStages[1],
    scoringStages[scoringStage],
    dismissalStages[dismissalStage],
    overStages[overStage],
    scoreReadingStages[scoreReadingStage],
  ][gameplayStage];
  const step = {
    ...steps[activeStep],
    ...(activeStep === 3 ? teamStages[teamStage] : activeStep === 5 ? gameplayCopy : {}),
  };
  const lessonComplete = activeStep === steps.length - 1 && gameplayStage === gameplayStages.length - 1 && scoreReadingStage === scoreReadingStages.length - 1;

  return (
    <div className={`lesson lesson-step-${activeStep + 1} team-stage-${teamStage + 1} gameplay-stage-${gameplayStage + 1} scoring-stage-${scoringStage + 1} dismissal-stage-${dismissalStage + 1} over-stage-${overStage + 1} score-reading-stage-${scoreReadingStage + 1}`} ref={root}>
      <header className="lesson-header">
        <a className="brand" href="#lesson" aria-label="Crease lesson home">
          <span className="brand-mark" aria-hidden="true">C</span>
          <span>CREASE</span>
        </a>
        <div className="lesson-meta"><span>Basics</span><i />Lesson 01</div>
      </header>

      <main className="lesson-canvas" id="lesson">
        <section className="copy-zone" aria-live="polite">
          <div className="step-copy" key={`${activeStep}-${teamStage}-${gameplayStage}-${scoringStage}-${dismissalStage}-${overStage}-${scoreReadingStage}`}>
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
                <div className="stumps stumps-north"><i /><i /><i /><span className="wicket-bail bail-left" /><span className="wicket-bail bail-right" /></div>
                <div className="stumps stumps-south"><i /><i /><i /><span className="wicket-bail bail-left" /><span className="wicket-bail bail-right" /></div>
              </div>

              {fielders.map(({ left, top, role }, index) => (
                <div
                  className={`player-token fielder role-${role} fielding-player-${index}`}
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
              <div className="lbw-path" aria-hidden="true" />
              <div className="extra-marker" aria-hidden="true">
                {"marker" in scoringStages[scoringStage] ? scoringStages[scoringStage].marker : ""}
              </div>
              <div className="wicket-marker" aria-hidden="true">{dismissalStages[dismissalStage].marker}</div>
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
            {dismissalStages.map((method, index) => (
              <button
                className={`dismissal-method ${index === dismissalStage ? "is-active" : ""}`}
                type="button"
                key={method.key}
                onClick={() => setDismissalStage(index)}
                tabIndex={activeStep === 5 && gameplayStage === 3 ? 0 : -1}
              >
                {method.label}
              </button>
            ))}
          </div>

          <div className="gameplay-panel over-panel" aria-hidden={activeStep !== 5 || gameplayStage !== 4}>
            <div className="gameplay-tabs" aria-label="Over explanations">
              {overStages.map((item, index) => (
                <button
                  className={index === overStage ? "is-active" : ""}
                  type="button"
                  key={item.key}
                  onClick={() => setOverStage(index)}
                  tabIndex={activeStep === 5 && gameplayStage === 4 ? 0 : -1}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {overStage === 0 ? (
              <div className="over-stage-content">
                <span className="over-kicker">1 over</span>
                <div className="over-balls" aria-label="Six legal balls">
                  {Array.from({ length: 6 }, (_, index) => <i className="over-ball" key={index}>{index + 1}</i>)}
                </div>
                <strong>6 legal balls</strong>
              </div>
            ) : overStage === 1 ? (
              <div className="over-stage-content">
                <span className="over-kicker">Example over</span>
                <div className="over-deliveries" aria-label="Eight deliveries containing six legal balls, one wide and one no-ball">
                  {["1", "Wd", "2", "Nb", "3", "4", "5", "6"].map((ball, index) => (
                    <i className={`over-delivery ${ball === "Wd" || ball === "Nb" ? "is-extra" : ""}`} key={`${ball}-${index}`}>{ball}</i>
                  ))}
                </div>
                <strong>8 deliveries · 6 legal balls</strong>
              </div>
            ) : (
              <div className="over-stage-content end-switch" aria-label="Overs alternate between opposite ends">
                <span className="end-switch-piece end-label">End A</span>
                <div className="end-switch-piece end-route"><i>Over 1</i><span>↓</span><i>Over 2</i><span>↑</span></div>
                <span className="end-switch-piece end-label">End B</span>
                <strong className="end-switch-piece">Alternate ends · change bowler</strong>
              </div>
            )}
          </div>

          <div className="gameplay-panel score-reader-panel" aria-hidden={activeStep !== 5 || gameplayStage !== 5}>
            <div className="gameplay-tabs" aria-label="Score explanations">
              {scoreReadingStages.map((item, index) => (
                <button
                  className={index === scoreReadingStage ? "is-active" : ""}
                  type="button"
                  key={item.key}
                  onClick={() => setScoreReadingStage(index)}
                  tabIndex={activeStep === 5 && gameplayStage === 5 ? 0 : -1}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="scoreboard-card">
              <div className="scoreboard-team score-read-piece"><b>IND</b><span>T20 · chase</span></div>
              <div className="scoreboard-line score-read-piece">
                <span className="score-runs">154<small>runs</small></span>
                <i>/</i>
                <span className="score-wickets">3<small>wickets lost</small></span>
                <b className="score-overs">18.2 <small>ov</small></b>
              </div>
              <div className="score-over-breakdown score-read-piece">
                <span>18 complete overs</span><i>+</i><span>2 balls</span>
              </div>
              <div className="chase-line score-read-piece">
                <span>Target <b>181</b></span><i />
                <span>Need <b>27</b> from <b>10</b> balls</span>
              </div>
            </div>
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
