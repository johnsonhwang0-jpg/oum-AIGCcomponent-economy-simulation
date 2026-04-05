export type Stage = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface Scores {
  stage1: number; // Simple PED calculation
  stage2: number; // Midpoint calculation
  stage3: number; // Classification
  stage4: number; // Curve fitting understanding
  stage5: number; // Optimization calculation
}

export interface GameState {
  stage: Stage;
  scores: Scores;
  stage1Choice: 'down' | 'up' | null;
  stage2Choice: 'down' | 'up' | null;
  calculatedPED: number | null;
  calculatedArcPED: number | null;
  fittedFunction: string | null;
  optimalPrice: number | null;
  finalPrice: number | null;
}

export interface StageProps {
  state: GameState;
  updateState: (updates: Partial<GameState>) => void;
  nextStage: () => void;
}
