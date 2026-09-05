"use client";

import { useCallback, useEffect, useState } from "react";
import { steps, teamStages, gameplayStages, scoringStages, dismissalStages, overStages, scoreReadingStages } from "./lesson-content";

export function useLessonNavigation() {
  const [activeStep, setActiveStep] = useState(0);
  const [teamStage, setTeamStage] = useState(0);
  const [gameplayStage, setGameplayStage] = useState(0);
  const [scoringStage, setScoringStage] = useState(0);
  const [dismissalStage, setDismissalStage] = useState(0);
  const [overStage, setOverStage] = useState(0);
  const [scoreReadingStage, setScoreReadingStage] = useState(0);
  const [groundHighlight, setGroundHighlight] = useState<"boundary" | "circle" | "pitch" | null>(null);
  const [roleHighlight, setRoleHighlight] = useState<"wicketkeeper" | "batsmen" | "fielder" | "bowler" | null>(null);

  const goTo = useCallback((index: number) => {
    setGroundHighlight(null);
    setRoleHighlight(null);
    const nextStep = Math.max(0, Math.min(steps.length - 1, index));
    if (nextStep === 3 && activeStep !== 3) setTeamStage(0);
    if (nextStep === 5 && activeStep !== 5) {
      setGameplayStage(0);
      setScoringStage(0);
      setDismissalStage(0);
      setOverStage(0);
      setScoreReadingStage(0);
    }
    setActiveStep(nextStep);
  }, [activeStep]);
  const goForward = useCallback(() => {
    setGroundHighlight(null);
    setRoleHighlight(null);
    if (activeStep === 3 && teamStage < teamStages.length - 1) {
      setTeamStage((current) => current + 1);
      return;
    }
    if (activeStep === 5 && gameplayStage === 2 && scoringStage < scoringStages.length - 1) {
      setScoringStage((current) => current + 1);
      return;
    }
    if (activeStep === 5 && gameplayStage === 3 && dismissalStage < dismissalStages.length - 1) {
      setDismissalStage((current) => current + 1);
      return;
    }
    if (activeStep === 5 && gameplayStage === 4 && overStage < overStages.length - 1) {
      setOverStage((current) => current + 1);
      return;
    }
    if (activeStep === 5 && gameplayStage === 5 && scoreReadingStage < scoreReadingStages.length - 1) {
      setScoreReadingStage((current) => current + 1);
      return;
    }
    if (activeStep === 5 && gameplayStage < gameplayStages.length - 1) {
      if (gameplayStage === 1) setScoringStage(0);
      if (gameplayStage === 2) setDismissalStage(0);
      if (gameplayStage === 3) setOverStage(0);
      if (gameplayStage === 4) setScoreReadingStage(0);
      setGameplayStage((current) => current + 1);
      return;
    }
    setActiveStep((current) => Math.min(steps.length - 1, current + 1));
  }, [activeStep, teamStage, gameplayStage, scoringStage, dismissalStage, overStage, scoreReadingStage]);
  const goBack = useCallback(() => {
    setGroundHighlight(null);
    setRoleHighlight(null);
    if (activeStep === 3 && teamStage > 0) {
      setTeamStage((current) => current - 1);
      return;
    }
    if (activeStep === 5 && gameplayStage === 2 && scoringStage > 0) {
      setScoringStage((current) => current - 1);
      return;
    }
    if (activeStep === 5 && gameplayStage === 3 && dismissalStage > 0) {
      setDismissalStage((current) => current - 1);
      return;
    }
    if (activeStep === 5 && gameplayStage === 4 && overStage > 0) {
      setOverStage((current) => current - 1);
      return;
    }
    if (activeStep === 5 && gameplayStage === 5 && scoreReadingStage > 0) {
      setScoreReadingStage((current) => current - 1);
      return;
    }
    if (activeStep === 5 && gameplayStage > 0) {
      if (gameplayStage === 3) setScoringStage(scoringStages.length - 1);
      if (gameplayStage === 4) setDismissalStage(dismissalStages.length - 1);
      if (gameplayStage === 5) setOverStage(overStages.length - 1);
      setGameplayStage((current) => current - 1);
      return;
    }
    setActiveStep((current) => Math.max(0, current - 1));
  }, [activeStep, teamStage, gameplayStage, scoringStage, dismissalStage, overStage, scoreReadingStage]);

  useEffect(() => {
    const handleArrowKeys = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isEditing = target?.isContentEditable ||
        target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.tagName === "SELECT";
      if (isEditing || event.altKey || event.ctrlKey || event.metaKey) return;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        goForward();
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        goBack();
      }
    };

    window.addEventListener("keydown", handleArrowKeys);
    return () => window.removeEventListener("keydown", handleArrowKeys);
  }, [goForward, goBack]);

  return {
    activeStep, teamStage, gameplayStage, scoringStage, dismissalStage, overStage, scoreReadingStage,
    groundHighlight, roleHighlight, setGroundHighlight, setRoleHighlight,
    setScoringStage, setDismissalStage, setOverStage, setScoreReadingStage, goTo, goForward, goBack,
  };
}
