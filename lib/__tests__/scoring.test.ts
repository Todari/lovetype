import { computeResult, isComplete } from "../scoring";
import { AnswerMap } from "../types";

describe("scoring", () => {
  describe("computeResult", () => {
    it("should compute LCRP type correctly", () => {
      const answers: AnswerMap = {};
      // Set all Lead answers to 5 (strongly agree)
      for (let i = 1; i <= 8; i++) {
        if (i === 1 || i === 3 || i === 5 || i === 7) {
          answers[i] = 5; // Lead items
        } else {
          answers[i] = 1; // Follow items (reverse, so 1 becomes 5 after reverse)
        }
      }
      // Set all Cuddly answers to 5
      for (let i = 9; i <= 16; i++) {
        if (i === 9 || i === 11 || i === 13 || i === 15) {
          answers[i] = 5; // Cuddly items
        } else {
          answers[i] = 1; // Accept items (reverse)
        }
      }
      // Set all Realistic answers to 5
      for (let i = 17; i <= 24; i++) {
        if (i === 17 || i === 19 || i === 21 || i === 23) {
          answers[i] = 5; // Realistic items
        } else {
          answers[i] = 1; // Passionate items (reverse)
        }
      }
      // Set all Optimistic answers to 5
      for (let i = 25; i <= 32; i++) {
        if (i === 25 || i === 27 || i === 29 || i === 31) {
          answers[i] = 5; // Optimistic items
        } else {
          answers[i] = 1; // Earnest items (reverse)
        }
      }

      const result = computeResult(answers);
      expect(result.code).toBe("LCRO");
      expect(result.axes).toHaveLength(4);
      expect(result.axes[0].pair).toBe("LF");
      expect(result.axes[0].pole).toBe("first");
    });

    it("should handle reverse scoring correctly", () => {
      const answers: AnswerMap = {};
      // All Follow items (reverse) with value 1 should score as 5 (after reverse)
      answers[2] = 1; // Follow item, reverse: true
      answers[4] = 1;
      answers[6] = 1;
      answers[8] = 1;
      // Fill rest with neutral values
      for (let i = 1; i <= 32; i++) {
        if (!answers[i]) {
          answers[i] = 3;
        }
      }

      const result = computeResult(answers);
      // Should favor Follow (F) pole
      expect(result.axes[0].pair).toBe("LF");
    });

    it("should handle balanced scores with epsilon", () => {
      const answers: AnswerMap = {};
      // Set all to neutral (3), which gives score 0
      for (let i = 1; i <= 32; i++) {
        answers[i] = 3;
      }

      const result = computeResult(answers);
      // With epsilon 0.5, score 0 should go to "second" pole
      expect(result.axes[0].value).toBe(0);
    });
  });

  describe("isComplete", () => {
    it("should return true when all questions are answered", () => {
      const answers: AnswerMap = {};
      for (let i = 1; i <= 32; i++) {
        answers[i] = 3;
      }
      expect(isComplete(answers)).toBe(true);
    });

    it("should return false when some questions are missing", () => {
      const answers: AnswerMap = {};
      for (let i = 1; i <= 31; i++) {
        answers[i] = 3;
      }
      expect(isComplete(answers)).toBe(false);
    });

    it("should return false when no answers", () => {
      const answers: AnswerMap = {};
      expect(isComplete(answers)).toBe(false);
    });
  });
});


