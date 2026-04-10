"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getCompatibility, AXIS_DESCRIPTIONS } from "@/lib/copy";
import { TYPE_NAMES } from "@/lib/typeNames";
import { TYPE_KEYWORDS } from "@/lib/typeKeywords";
import { trackEvent } from "@/lib/analytics";

interface CompareClientProps {
  code1: string;
  code2: string;
}

const AXES = [
  {
    pair: "LF",
    index: 0,
    labels: { first: "주도", second: "조율" },
    letters: { first: "L", second: "F" },
  },
  {
    pair: "CA",
    index: 1,
    labels: { first: "표현", second: "절제" },
    letters: { first: "C", second: "A" },
  },
  {
    pair: "RP",
    index: 2,
    labels: { first: "현실", second: "열정" },
    letters: { first: "R", second: "P" },
  },
  {
    pair: "OE",
    index: 3,
    labels: { first: "낙관", second: "성실" },
    letters: { first: "O", second: "E" },
  },
];

function getCompatibilityGrade(
  code1: string,
  code2: string
): { label: string; className: string } {
  const compat = getCompatibility(code1);
  if (compat.best.includes(code2)) {
    return {
      label: "최고의 궁합 \u{1F495}",
      className: "bg-rose-500 text-white",
    };
  }
  if (compat.good.includes(code2)) {
    return {
      label: "좋은 궁합 \u{1F49B}",
      className: "bg-amber-400 text-white",
    };
  }
  return {
    label: "흥미로운 조합 \u2728",
    className: "bg-gray-500 text-white",
  };
}

export default function CompareClient({ code1, code2 }: CompareClientProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    trackEvent("click_compare", { code1, code2 });
  }, [code1, code2]);

  const typeInfo1 = TYPE_NAMES.find((t) => t.code === code1);
  const typeInfo2 = TYPE_NAMES.find((t) => t.code === code2);
  const typeName1 = typeInfo1?.name || `${code1} 유형`;
  const typeName2 = typeInfo2?.name || `${code2} 유형`;

  const grade = getCompatibilityGrade(code1, code2);

  const keywords1 = TYPE_KEYWORDS[code1] || [];
  const keywords2 = TYPE_KEYWORDS[code2] || [];

  const handleCopyLink = async () => {
    try {
      const url = `${window.location.origin}/compare/${code1}/${code2}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-[640px] mx-auto space-y-5">
        {/* 상단: 두 유형 헤더 */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <Link href={`/results/${code1}?from=share`}>
                <div className="text-lg md:text-xl font-bold text-gray-900">{typeName1}</div>
                <span className="inline-block mt-1 px-2.5 py-0.5 bg-rose-50 text-rose-500 text-xs font-bold rounded-full border border-rose-200">
                  {code1}
                </span>
              </Link>
            </div>
            <div className="text-2xl">{"\u{1F495}"}</div>
            <div className="text-center">
              <Link href={`/results/${code2}?from=share`}>
                <div className="text-lg md:text-xl font-bold text-gray-900">{typeName2}</div>
                <span className="inline-block mt-1 px-2.5 py-0.5 bg-rose-50 text-rose-500 text-xs font-bold rounded-full border border-rose-200">
                  {code2}
                </span>
              </Link>
            </div>
          </div>

          {/* 궁합 등급 뱃지 */}
          <div className="flex justify-center">
            <span
              className={`inline-block rounded-full px-6 py-2 text-lg font-bold ${grade.className}`}
            >
              {grade.label}
            </span>
          </div>
        </div>

        {/* 축별 비교 차트 */}
        <div className="bg-white rounded-xl p-5 space-y-5">
          <h3 className="text-lg font-bold text-gray-900">축별 비교</h3>
          {AXES.map((axis) => {
            const code1Pole = code1[axis.index];
            const code2Pole = code2[axis.index];
            const isSame = code1Pole === code2Pole;
            const code1IsFirst = code1Pole === axis.letters.first;
            const code2IsFirst = code2Pole === axis.letters.first;

            return (
              <div
                key={axis.pair}
                className="bg-gray-50 rounded-xl p-4 space-y-3"
              >
                {/* 양쪽 극 이름 */}
                <div className="flex justify-between text-sm font-medium text-gray-700">
                  <span>
                    {axis.labels.first} ({axis.letters.first})
                  </span>
                  <span>
                    {axis.labels.second} ({axis.letters.second})
                  </span>
                </div>

                {/* 비교 바 */}
                <div className="relative h-10 bg-gray-100 rounded-full">
                  {/* 중간선 */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 z-10 -translate-x-1/2 border-l border-dashed border-gray-300" />

                  {/* code1 마커 */}
                  <div
                    className="absolute top-1 flex items-center justify-center w-8 h-8 rounded-full bg-rose-500 text-white text-xs font-bold z-20 transition-all"
                    style={{
                      left: code1IsFirst ? "8%" : "calc(92% - 32px)",
                    }}
                  >
                    {code1.substring(0, 2)}
                  </div>

                  {/* code2 마커 */}
                  <div
                    className="absolute top-1 flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white text-xs font-bold z-20 transition-all"
                    style={{
                      left: code2IsFirst ? "8%" : "calc(92% - 32px)",
                    }}
                  >
                    {code2.substring(0, 2)}
                  </div>
                </div>

                {/* 유사/보완 표시 */}
                <div className="text-center">
                  {isSame ? (
                    <span className="text-sm font-semibold text-blue-500">
                      유사한 성향
                    </span>
                  ) : (
                    <span className="text-sm font-semibold text-rose-500">
                      보완적 성향
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 궁합 상세 설명 */}
        <div className="bg-white rounded-xl p-5 space-y-4">
          <h3 className="text-lg font-bold text-gray-900">궁합 분석</h3>
          <div className="space-y-3">
            {AXES.map((axis) => {
              const code1Pole = code1[axis.index];
              const code2Pole = code2[axis.index];
              const isSame = code1Pole === code2Pole;
              const desc = AXIS_DESCRIPTIONS[code1Pole];

              return (
                <div key={axis.pair} className="text-[15px] text-gray-800 leading-relaxed">
                  <span className="font-semibold text-gray-900">
                    {axis.labels.first}/{axis.labels.second} 축:
                  </span>{" "}
                  {isSame ? desc.similar : desc.complementary}
                </div>
              );
            })}
          </div>
        </div>

        {/* 키워드 비교 */}
        {(keywords1.length > 0 || keywords2.length > 0) && (
          <div className="bg-white rounded-xl p-5 space-y-4">
            <h3 className="text-lg font-bold text-gray-900">키워드 비교</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-800">
                  {code1} 키워드
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {keywords1.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-rose-50 text-rose-700 text-xs font-medium rounded-full border border-rose-200"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-800">
                  {code2} 키워드
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {keywords2.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 하단 액션 버튼 */}
        <div className="bg-white rounded-xl p-5">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleCopyLink}
              className={`px-6 py-3 font-medium transition-colors rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 ${
                copied
                  ? "bg-gray-700 text-white"
                  : "bg-rose-500 text-white hover:bg-rose-600"
              }`}
            >
              {copied ? "\u2713 링크 복사됨!" : "궁합 링크 복사"}
            </button>
            <Link
              href="/test"
              className="px-6 py-3 font-medium transition-colors bg-gray-200 text-gray-900 hover:bg-gray-300 rounded-lg text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
            >
              나도 테스트해보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
