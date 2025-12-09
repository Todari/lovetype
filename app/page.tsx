"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ITEMS } from "@/lib/questions";
import { AnswerMap } from "@/lib/types";
import { computeResult, isComplete } from "@/lib/scoring";
import QuestionCard from "@/components/QuestionCard";

const STORAGE_KEY = "lovetype_answers";

export default function Home() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [started, setStarted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAnswers(parsed);
        // If there are answers, start the quiz
        if (Object.keys(parsed).length > 0) {
          setStarted(true);
          // Find the first unanswered question
          const firstUnanswered = ITEMS.findIndex((item) => !parsed[item.id]);
          setCurrentIndex(firstUnanswered >= 0 ? firstUnanswered : ITEMS.length - 1);
        }
      } catch (e) {
        console.error("Failed to load saved answers:", e);
      }
    }
  }, []);

  // Save to localStorage whenever answers change
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    }
  }, [answers]);

  const handleAnswer = (value: 1 | 2 | 3 | 4 | 5 | 6) => {
    const item = ITEMS[currentIndex];
    setAnswers((prev: AnswerMap) => ({ ...prev, [item.id]: value }));
  };

  const handleNext = () => {
    if (currentIndex < ITEMS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Submit
      if (isComplete(answers)) {
        const result = computeResult(answers);
        // Keep answers in localStorage for results page
        router.push(`/results/${result.code}`);
      }
    }
  };

  // Test function: fill all answers with default value and go to results
  const handleTestMode = () => {
    const testAnswers: AnswerMap = {};
    ITEMS.forEach((item, index) => {
      // Alternate between 3 and 4 to get truly neutral (3.5 average)
      testAnswers[item.id] = (index % 2 === 0 ? 3 : 4) as 1 | 2 | 3 | 4 | 5 | 6;
    });
    setAnswers(testAnswers);
    const result = computeResult(testAnswers);
    router.push(`/results/${result.code}`);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleStart = () => {
    setStarted(true);
    setCurrentIndex(0);
    setAnswers({});
    localStorage.removeItem(STORAGE_KEY);
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8 text-center">
          <div className="space-y-4">
            <div className="text-5xl font-bold text-blue-600 mb-2">LT16</div>
            <h1 className="text-4xl font-bold text-gray-900">관계 유형 테스트</h1>
            <p className="text-lg text-gray-600">
              16가지 관계 유형을 알아보는 비공식 테스트입니다
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
            <p className="font-semibold mb-1">면책 조항</p>
            <p>이 테스트는 독립적으로 제작된 비공식 테스트이며, 엔터테인먼트 목적으로만 사용됩니다.</p>
          </div>

          <div className="space-y-4 text-left">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📋</span>
              <div>
                <p className="font-semibold text-gray-900">32개의 질문</p>
                <p className="text-sm text-gray-600">4개 축에 대한 간단한 질문들</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <p className="font-semibold text-gray-900">빠른 결과</p>
                <p className="text-sm text-gray-600">약 5분 내에 완료 가능</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔒</span>
              <div>
                <p className="font-semibold text-gray-900">프라이버시 보호</p>
                <p className="text-sm text-gray-600">모든 데이터는 로컬에만 저장되며 서버로 전송되지 않습니다</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleStart}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            테스트 시작하기
          </button>
        </div>
      </div>
    );
  }

  const currentItem = ITEMS[currentIndex];
  const currentAnswer = answers[currentItem.id];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <QuestionCard
        item={currentItem}
        currentIndex={currentIndex}
        total={ITEMS.length}
        value={currentAnswer}
        answers={answers}
        onChange={handleAnswer}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onTestMode={handleTestMode}
      />
    </div>
  );
}

