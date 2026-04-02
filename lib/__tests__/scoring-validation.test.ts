import { computeResult } from "../scoring";
import { AnswerMap } from "../types";

describe("Scoring Logic Validation", () => {
  describe("Lead vs Follow axis", () => {
    it("should score maximum L when all L items are 5 and all F items are 1", () => {
      const answers: AnswerMap = {};
      // L items: 1, 3, 5, 7 (no reverse)
      answers[1] = 5; // 5-3 = 2
      answers[3] = 5; // 5-3 = 2
      answers[5] = 5; // 5-3 = 2
      answers[7] = 5; // 5-3 = 2
      // F items: 2, 4, 6, 8 (reverse: true)
      answers[2] = 1; // 6-1=5, 5-3=2 → but wait, this should favor F, not L
      answers[4] = 1;
      answers[6] = 1;
      answers[8] = 1;
      // Fill rest with neutral
      for (let i = 9; i <= 32; i++) {
        answers[i] = 3;
      }

      const result = computeResult(answers);
      const lfAxis = result.axes.find((a) => a.pair === "LF");
      
      // When F items (reverse) get 1, it becomes 6-1=5, then 5-3=2, which favors L
      // So sum should be positive (favoring L)
      expect(lfAxis?.pole).toBe("first");
      expect(lfAxis?.value).toBeGreaterThan(0);
    });

    it("should score maximum F when all F items are 5 and all L items are 1", () => {
      const answers: AnswerMap = {};
      // L items: 1, 3, 5, 7
      answers[1] = 1; // 1-3 = -2
      answers[3] = 1;
      answers[5] = 1;
      answers[7] = 1;
      // F items: 2, 4, 6, 8 (reverse: true)
      answers[2] = 5; // 6-5=1, 1-3=-2 → favors F
      answers[4] = 5;
      answers[6] = 5;
      answers[8] = 5;
      // Fill rest with neutral
      for (let i = 9; i <= 32; i++) {
        answers[i] = 3;
      }

      const result = computeResult(answers);
      const lfAxis = result.axes.find((a) => a.pair === "LF");
      
      expect(lfAxis?.pole).toBe("second");
      expect(lfAxis?.value).toBeLessThan(0);
    });

    it("should score neutral when all answers are 3", () => {
      const answers: AnswerMap = {};
      for (let i = 1; i <= 32; i++) {
        answers[i] = 3;
      }

      const result = computeResult(answers);
      
      // All axes should be near 0
      result.axes.forEach((axis) => {
        expect(Math.abs(axis.value)).toBeLessThan(1);
        expect(axis.percent).toBeLessThan(10); // Should be very low percentage
      });
    });
  });

  describe("Reverse scoring validation", () => {
    it("should correctly reverse F items", () => {
      // F item with reverse: true
      // If user answers 5 (strongly agree) to "상대가 선택하면 그 흐름을 따라가는 게 편하다"
      // This should favor F, so after reverse: 6-5=1, then 1-3=-2 (negative = F)
      const answers: AnswerMap = {};
      // Set one F item to 5
      answers[2] = 5; // F item, reverse: true
      // Set corresponding L items to 1
      answers[1] = 1; // L item
      // Fill rest with 3
      for (let i = 3; i <= 32; i++) {
        answers[i] = 3;
      }

      const result = computeResult(answers);
      const lfAxis = result.axes.find((a) => a.pair === "LF");
      
      // F item 5 → 6-5=1 → 1-3=-2 (favors F/negative)
      // L item 1 → 1-3=-2 (favors F/negative)
      // Net: should favor F (negative)
      expect(lfAxis?.value).toBeLessThan(0);
    });
  });

  describe("Percentage calculation", () => {
    it("should calculate percentage correctly for maximum score", () => {
      const answers: AnswerMap = {};
      // Set all L items to 5, all F items to 1
      answers[1] = 5; answers[3] = 5; answers[5] = 5; answers[7] = 5;
      answers[2] = 1; answers[4] = 1; answers[6] = 1; answers[8] = 1;
      // Set all C items to 5, all A items to 1
      answers[9] = 5; answers[11] = 5; answers[13] = 5; answers[15] = 5;
      answers[10] = 1; answers[12] = 1; answers[14] = 1; answers[16] = 1;
      // Set all R items to 5, all P items to 1
      answers[17] = 5; answers[19] = 5; answers[21] = 5; answers[23] = 5;
      answers[18] = 1; answers[20] = 1; answers[22] = 1; answers[24] = 1;
      // Set all O items to 5, all E items to 1
      answers[25] = 5; answers[27] = 5; answers[29] = 5; answers[31] = 5;
      answers[26] = 1; answers[28] = 1; answers[30] = 1; answers[32] = 1;

      const result = computeResult(answers);
      
      // Each axis should have high percentage (close to 100%)
      result.axes.forEach((axis) => {
        expect(axis.percent).toBeGreaterThanOrEqual(80);
      });
      
      // Code should be LCRO
      expect(result.code).toBe("LCRO");
    });
  });
});

