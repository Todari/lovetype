import { AnswerMap, AxisScore, Result } from "./types";
import { ITEMS, AxisPair } from "./questions";

const AXIS_PAIRS: AxisPair[] = ["LF", "CA", "RP", "OE"];

const POLE_MAP: Record<AxisPair, { first: string; second: string }> = {
  LF: { first: "L", second: "F" },
  CA: { first: "C", second: "A" },
  RP: { first: "R", second: "P" },
  OE: { first: "O", second: "E" },
};

/**
 * Convert Likert 1-6 to score -2.5 to +2.5
 * 1 → -2.5, 2 → -1.5, 3 → -0.5, 4 → +0.5, 5 → +1.5, 6 → +2.5
 * If reverse, flip first: value = 7 - value
 */
function itemScore(value: 1 | 2 | 3 | 4 | 5 | 6, reverse?: boolean): number {
  const adjusted = reverse ? (7 - value) as 1 | 2 | 3 | 4 | 5 | 6 : value;
  return adjusted - 3.5;
}

/**
 * Calculate max possible sum for an axis pair (8 items × 2.5 = 20)
 */
const MAX_SUM = 8 * 2.5;

/**
 * Compute result from answers
 */
export function computeResult(answers: AnswerMap): Result {
  const axisScores: AxisScore[] = [];

  for (const pair of AXIS_PAIRS) {
    const items = ITEMS.filter((item) => item.axisPair === pair);
    let sum = 0;

    for (const item of items) {
      const answer = answers[item.id];
      if (answer) {
        sum += itemScore(answer, item.reverse);
      }
    }

    // Determine pole: positive → first, negative → second, zero → use epsilon
    const epsilon = 0.5;
    const pole = sum >= epsilon ? "first" : "second";
    // Calculate percentage: -20 to +20 range maps to 0-100%
    // This represents how strongly the user leans toward one pole
    const percent = Math.min(100, Math.abs(sum) / MAX_SUM * 100);

    axisScores.push({
      pair,
      value: sum,
      pole,
      percent,
    });
  }

  // Build 4-letter code
  const code = axisScores
    .map((axis) => {
      const poleMap = POLE_MAP[axis.pair];
      return axis.pole === "first" ? poleMap.first : poleMap.second;
    })
    .join("");

  return {
    code,
    axes: axisScores,
  };
}

/**
 * Check if all questions are answered
 */
export function isComplete(answers: AnswerMap): boolean {
  return ITEMS.every((item) => answers[item.id] !== undefined);
}


