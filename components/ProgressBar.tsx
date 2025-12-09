"use client";

import { ITEMS, AxisPair } from "@/lib/questions";

interface ProgressBarProps {
  currentIndex: number;
  answers: Record<number, 1 | 2 | 3 | 4 | 5 | 6>;
}

const AXIS_PAIRS: AxisPair[] = ["LF", "CA", "RP", "OE"];
const AXIS_LABELS: Record<AxisPair, string> = {
  LF: "주도/따름",
  CA: "애정/수용",
  RP: "현실/열정",
  OE: "낙관/진지",
};

export default function ProgressBar({ currentIndex, answers }: ProgressBarProps) {
  const total = ITEMS.length;
  const progress = ((currentIndex + 1) / total) * 100;

  // Count answered items per axis
  const axisProgress = AXIS_PAIRS.map((pair) => {
    const items = ITEMS.filter((item) => item.axisPair === pair);
    const answered = items.filter((item) => answers[item.id] !== undefined).length;
    return {
      pair,
      progress: (answered / items.length) * 100,
    };
  });

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>진행률</span>
        <span className="font-semibold">{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex gap-2 justify-between">
        {axisProgress.map(({ pair, progress }) => (
          <div key={pair} className="flex-1">
            <div className="text-xs text-gray-500 mb-1">{AXIS_LABELS[pair]}</div>
            <div className="w-full bg-gray-100 rounded-full h-1">
              <div
                className={`h-1 rounded-full transition-all duration-300 ${
                  progress === 100 ? "bg-green-500" : "bg-gray-300"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


