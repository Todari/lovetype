"use client";

import Link from "next/link";
import { Result } from "@/lib/types";
import { getCompatibility } from "@/lib/copy";
import { getTypeDetails } from "@/lib/typeDetails";
import { TYPE_NAMES } from "@/lib/typeNames";
import { TYPE_KEYWORDS } from "@/lib/typeKeywords";

interface ResultCardProps {
  result: Result;
  isFromTest?: boolean;
}

const AXIS_LABELS: Record<string, { first: string; second: string }> = {
  LF: { first: "주도", second: "조율" },
  CA: { first: "표현", second: "절제" },
  RP: { first: "현실", second: "열정" },
  OE: { first: "낙관", second: "성실" },
};

const SECTION_TITLES = {
  overview: "개요",
  social: "사회·직장 관계 특징",
  relationship: "사랑/이성 관계 특징",
  strengths: "강점·매력",
  watchouts: "주의할 점",
  forOthers: "잘 지내는 방법(상대에게)",
  forSelf: "발전 팁(스스로)",
};

// 마크다운 볼드 처리 함수
function formatText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const boldText = part.slice(2, -2);
      return (
        <strong key={index} className="font-semibold text-gray-900">
          {boldText}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

export default function ResultCard({
  result,
  isFromTest = false,
}: ResultCardProps) {
  const isBalanced = result.axes.some((axis) => Math.abs(axis.value) < 0.5);
  const typeDetails = getTypeDetails(result.code);
  const typeInfo = TYPE_NAMES.find((type) => type.code === result.code);

  return (
    <div className="w-full max-w-[640px] mx-auto space-y-5">
      {/* Type Code Badge */}
      <div className="text-center space-y-3">
        <div className="inline-block">
          <div className="text-4xl font-bold text-rose-500 mb-2">
            {result.code}
          </div>
          {typeInfo && (
            <div className="text-lg font-semibold text-gray-800 mb-2">
              {typeInfo.name}
            </div>
          )}
          {isBalanced && isFromTest && (
            <span className="inline-block px-3 py-1 bg-gray-200 text-gray-800 text-sm font-medium rounded-lg">
              균형형
            </span>
          )}
        </div>
      </div>

      {/* Axis Bars - Only show if from actual test */}
      {isFromTest && (
        <div className="bg-white rounded-xl p-5 space-y-4">
          <h3 className="text-lg font-bold text-gray-900">축별 점수</h3>
          {result.axes.map((axis) => {
            const labels = AXIS_LABELS[axis.pair];
            const isFirst = axis.pole === "first";
            // 중간(50%)에서 떨어진 거리를 더해서 표시: 50% + percent
            const displayPercent = 50 + axis.percent;
            // 그래프에서 중간에서 선택된 극단까지의 비율
            const graphPercent = axis.percent;
            // CA(표현/절제)와 OE(낙관/성실)는 오른쪽에서 시작, 나머지는 왼쪽에서 시작
            const isRightToLeft = axis.pair === "CA" || axis.pair === "OE";

            // 각 축의 알파벳 매핑
            const axisLetters: Record<
              string,
              { first: string; second: string }
            > = {
              LF: { first: "L", second: "F" },
              CA: { first: "C", second: "A" },
              RP: { first: "R", second: "P" },
              OE: { first: "O", second: "E" },
            };
            const letters = axisLetters[axis.pair];

            return (
              <div key={axis.pair} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span
                    className={`font-medium ${isFirst ? "text-rose-600 font-bold" : "text-gray-700"}`}
                  >
                    {labels.first} ({letters.first})
                  </span>
                  <span
                    className={`font-medium ${!isFirst ? "text-rose-600 font-bold" : "text-gray-700"}`}
                  >
                    {labels.second} ({letters.second})
                  </span>
                </div>
                <div className="relative h-9 bg-gray-100 rounded-full overflow-hidden">
                  {/* 중간선 (50% 지점) */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 z-10 transform -translate-x-1/2" />

                  {/* 그래프: 축에 따라 왼쪽 또는 오른쪽에서 시작 */}
                  {!isRightToLeft && graphPercent > 0 && (
                    // LF, RP 축: 왼쪽(주도/현실) 시작부터 선택된 쪽의 퍼센트까지
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-rose-400 transition-all duration-500 z-0"
                      style={{
                        width: `${displayPercent}%`,
                      }}
                    />
                  )}
                  {isRightToLeft && graphPercent > 0 && (
                    // CA, OE 축: 오른쪽(절제/성실) 시작부터 선택된 쪽의 퍼센트까지
                    <div
                      className="absolute right-0 top-0 bottom-0 bg-rose-400 transition-all duration-500 z-0"
                      style={{
                        width: `${displayPercent}%`,
                      }}
                    />
                  )}

                  {/* 퍼센트 표시: 중간 기준으로 계산된 값 */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="text-xs font-semibold text-gray-800 bg-white px-2.5 py-1 rounded-full">
                      {Math.round(displayPercent)}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Type Details from lovetype16.md */}
      {typeDetails && (
        <div className="space-y-5">
          {/* Keywords Chips */}
          {TYPE_KEYWORDS[result.code] && (
            <div className="bg-white rounded-xl p-5">
              <div className="flex flex-wrap gap-2 justify-center">
                {TYPE_KEYWORDS[result.code].map((keyword, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-rose-50 text-rose-700 text-sm font-medium rounded-full border border-rose-200"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Overview */}
          <div className="bg-white rounded-xl p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {SECTION_TITLES.overview}
            </h3>
            <div className="text-[15px] text-gray-800 leading-loose whitespace-pre-line">
              {formatText(typeDetails.overview)}
            </div>
          </div>

          {/* Social */}
          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {SECTION_TITLES.social}
            </h3>
            <div className="text-[15px] text-gray-800 leading-loose whitespace-pre-line">
              {formatText(typeDetails.social)}
            </div>
          </div>

          {/* Relationship */}
          <div className="bg-white rounded-xl p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {SECTION_TITLES.relationship}
            </h3>
            <div className="text-[15px] text-gray-800 leading-loose whitespace-pre-line">
              {formatText(typeDetails.relationship)}
            </div>
          </div>

          {/* Strengths */}
          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {SECTION_TITLES.strengths}
            </h3>
            <div className="text-[15px] text-gray-800 leading-loose whitespace-pre-line">
              {formatText(typeDetails.strengths)}
            </div>
          </div>

          {/* Watchouts */}
          <div className="bg-white rounded-xl p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {SECTION_TITLES.watchouts}
            </h3>
            <div className="text-[15px] text-gray-800 leading-loose whitespace-pre-line">
              {formatText(typeDetails.watchouts)}
            </div>
          </div>

          {/* For Others */}
          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {SECTION_TITLES.forOthers}
            </h3>
            <div className="text-[15px] text-gray-800 leading-loose whitespace-pre-line">
              {formatText(typeDetails.forOthers)}
            </div>
          </div>

          {/* For Self */}
          <div className="bg-white rounded-xl p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {SECTION_TITLES.forSelf}
            </h3>
            <div className="text-[15px] text-gray-800 leading-loose whitespace-pre-line">
              {formatText(typeDetails.forSelf)}
            </div>
          </div>
        </div>
      )}

      {/* Compatibility Section */}
      <div className="bg-gray-100 rounded-xl p-5 space-y-4">
        <h3 className="text-lg font-bold text-gray-900">궁합 정보</h3>
        <div className="text-[15px] text-gray-800 leading-loose">
          {getCompatibility(result.code).description}
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-2">
              최고의 궁합
            </h4>
            <div className="flex flex-wrap gap-2">
              {getCompatibility(result.code).best.map((type) => (
                <div key={type} className="flex gap-1.5">
                  <Link
                    href={`/results/${type}?from=share`}
                    scroll={true}
                    className="px-3 py-1.5 bg-rose-500 text-white hover:bg-rose-600 transition-colors text-sm font-medium rounded-lg"
                  >
                    {type}
                  </Link>
                  <Link
                    href={`/compare/${result.code}/${type}`}
                    className="px-2 py-1.5 bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors text-sm rounded-lg"
                  >
                    궁합
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-2">
              좋은 궁합
            </h4>
            <div className="flex flex-wrap gap-2">
              {getCompatibility(result.code).good.map((type) => (
                <div key={type} className="flex gap-1.5">
                  <Link
                    href={`/results/${type}?from=share`}
                    scroll={true}
                    className="px-3 py-1.5 bg-rose-400 text-white hover:bg-rose-500 transition-colors text-sm font-medium rounded-lg"
                  >
                    {type}
                  </Link>
                  <Link
                    href={`/compare/${result.code}/${type}`}
                    className="px-2 py-1.5 bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors text-sm rounded-lg"
                  >
                    궁합
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
