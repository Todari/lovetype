"use client";

import Link from "next/link";
import { Result } from "@/lib/types";
import {
  getResultDescription,
  getDetailedDescription,
  getStrengths,
  getWatchOuts,
  getTips,
  getCompatibility,
} from "@/lib/copy";

interface ResultCardProps {
  result: Result;
  isFromTest?: boolean;
}

const AXIS_LABELS: Record<string, { first: string; second: string }> = {
  LF: { first: "주도", second: "따름" },
  CA: { first: "애정", second: "수용" },
  RP: { first: "현실", second: "열정" },
  OE: { first: "낙관", second: "진지" },
};

export default function ResultCard({
  result,
  isFromTest = false,
}: ResultCardProps) {
  const isBalanced = result.axes.some((axis) => Math.abs(axis.value) < 0.5);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      {/* Type Code Badge */}
      <div className="text-center space-y-4">
        <div className="inline-block">
          <div className="text-6xl font-bold text-blue-600 mb-2">
            {result.code}
          </div>
          {isBalanced && isFromTest && (
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              균형형
            </span>
          )}
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-lg mb-4">
          {getResultDescription(result.code)}
        </p>
        <div className="bg-blue-50 rounded-lg p-6 max-w-2xl mx-auto">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {getDetailedDescription(result.code)}
          </p>
        </div>
      </div>

      {/* Axis Bars - Only show if from actual test */}
      {isFromTest && (
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <h3 className="text-xl font-bold text-gray-900">축별 점수</h3>
          {result.axes.map((axis) => {
            const labels = AXIS_LABELS[axis.pair];
            const isFirst = axis.pole === "first";
            // Use the percent from axis (already calculated in scoring.ts)
            const displayPercent = axis.percent;

            return (
              <div key={axis.pair} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span
                    className={`font-medium ${isFirst ? "text-blue-600 font-bold" : "text-gray-700"}`}
                  >
                    {labels.first}
                  </span>
                  <span
                    className={`font-medium ${!isFirst ? "text-blue-600 font-bold" : "text-gray-700"}`}
                  >
                    {labels.second}
                  </span>
                </div>
                <div className="relative h-10 bg-gray-100 rounded-full overflow-hidden">
                  {/* Center line indicator */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-400 z-10 transform -translate-x-1/2" />
                  {/* Bar from center to left (first pole) */}
                  {isFirst && displayPercent > 0 && (
                    <div
                      className="absolute left-1/2 top-0 bottom-0 bg-blue-500 transition-all duration-500 z-0"
                      style={{
                        width: `${displayPercent / 2}%`,
                        transform: "translateX(-100%)",
                      }}
                    />
                  )}
                  {/* Bar from center to right (second pole) */}
                  {!isFirst && displayPercent > 0 && (
                    <div
                      className="absolute left-1/2 top-0 bottom-0 bg-blue-500 transition-all duration-500 z-0"
                      style={{
                        width: `${displayPercent / 2}%`,
                      }}
                    />
                  )}
                  {/* Percentage label */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="text-sm font-semibold text-gray-700 bg-white px-3 py-1 rounded shadow-sm">
                      {Math.round(displayPercent)}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Compatibility Section */}
      <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl shadow-lg p-6 space-y-4">
        <h3 className="text-xl font-bold text-gray-900 mb-4">💕 궁합 정보</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          {getCompatibility(result.code).description}
        </p>

        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-semibold text-purple-800 mb-2">
              최고의 궁합
            </h4>
            <div className="flex flex-wrap gap-2">
              {getCompatibility(result.code).best.map((type) => (
                <Link
                  key={type}
                  href={`/results/${type}?from=share`}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                >
                  {type}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-pink-800 mb-2">
              좋은 궁합
            </h4>
            <div className="flex flex-wrap gap-2">
              {getCompatibility(result.code).good.map((type) => (
                <Link
                  key={type}
                  href={`/results/${type}?from=share`}
                  className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors text-sm font-medium"
                >
                  {type}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Strengths, Watch-outs, Tips */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-green-50 rounded-xl p-6">
          <h4 className="text-lg font-bold text-green-800 mb-3">강점</h4>
          <ul className="space-y-2">
            {getStrengths(result.code).map((strength, idx) => (
              <li key={idx} className="text-sm text-green-700 flex items-start">
                <span className="mr-2">✓</span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-yellow-50 rounded-xl p-6">
          <h4 className="text-lg font-bold text-yellow-800 mb-3">주의사항</h4>
          <ul className="space-y-2">
            {getWatchOuts(result.code).map((watchOut, idx) => (
              <li
                key={idx}
                className="text-sm text-yellow-700 flex items-start"
              >
                <span className="mr-2">⚠</span>
                <span>{watchOut}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-blue-50 rounded-xl p-6">
          <h4 className="text-lg font-bold text-blue-800 mb-3">팁</h4>
          <ul className="space-y-2">
            {getTips(result.code).map((tip, idx) => (
              <li key={idx} className="text-sm text-blue-700 flex items-start">
                <span className="mr-2">💡</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
