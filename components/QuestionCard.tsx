"use client";

import { Item } from "@/lib/questions";
import Likert from "./Likert";
import ProgressBar from "./ProgressBar";

interface QuestionCardProps {
  item: Item;
  currentIndex: number;
  total: number;
  value: 1 | 2 | 3 | 4 | 5 | 6 | undefined;
  answers: Record<number, 1 | 2 | 3 | 4 | 5 | 6>;
  onChange: (value: 1 | 2 | 3 | 4 | 5 | 6) => void;
  onNext: () => void;
  onPrevious: () => void;
  onTestMode?: () => void;
}

export default function QuestionCard({
  item,
  currentIndex,
  total,
  value,
  answers,
  onChange,
  onNext,
  onPrevious,
  onTestMode,
}: QuestionCardProps) {
  const canProceed = value !== undefined;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <ProgressBar currentIndex={currentIndex} answers={answers} />

      <div className="bg-white rounded-2xl p-4 md:p-8 space-y-6 md:space-y-8">
        <div className="text-center">
          <div className="text-sm text-gray-500 mb-2">
            질문 {currentIndex + 1} / {total}
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-relaxed px-2">
            {item.text}
          </h2>
        </div>

        <Likert value={value} onChange={onChange} />

        <div className="flex gap-4 justify-between">
          <button
            type="button"
            onClick={onPrevious}
            disabled={currentIndex === 0}
            className={`
              px-6 py-3 font-medium transition-colors rounded-lg
              ${
                currentIndex === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }
              focus:outline-none
            `}
          >
            이전
          </button>
          <div className="flex gap-2">
            {currentIndex === 0 && onTestMode && (
              <button
                type="button"
                onClick={onTestMode}
                className="px-4 py-3 font-medium transition-colors bg-gray-800 text-white hover:bg-gray-900 text-sm rounded-lg focus:outline-none"
                title="테스트용: 모든 질문을 기본값으로 채우고 바로 결과로 이동"
              >
                🧪 테스트
              </button>
            )}
            <button
              type="button"
              onClick={onNext}
              disabled={!canProceed}
              className={`
                px-6 py-3 font-medium transition-colors rounded-lg
                ${
                  canProceed
                    ? "bg-rose-500 text-white hover:bg-rose-600"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }
                focus:outline-none
              `}
            >
              {currentIndex === total - 1 ? "결과 보기" : "다음"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


