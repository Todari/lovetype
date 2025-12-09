export type AnswerMap = Record<number, 1 | 2 | 3 | 4 | 5 | 6>;

export type AxisScore = {
  pair: "LF" | "CA" | "RP" | "OE";
  value: number;
  pole: "first" | "second";
  percent: number;
};

export type Result = {
  code: string;
  axes: AxisScore[];
};


