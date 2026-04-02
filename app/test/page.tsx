"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ITEMS } from "@/lib/questions";
import { AnswerMap } from "@/lib/types";
import { computeResult, isComplete } from "@/lib/scoring";
import Likert from "@/components/Likert";

const STORAGE_KEY = "lvti_answers";
const QUESTIONS_PER_PAGE = 8; // 각 페이지당 8개 질문 (축당 8개)
const TOTAL_PAGES = 4; // 총 4페이지

export default function TestPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0); // 0-3 페이지
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAnswers(parsed);
        // Find the first page with unanswered questions
        let firstUnansweredPage = 0;
        for (let page = 0; page < TOTAL_PAGES; page++) {
          const startIdx = page * QUESTIONS_PER_PAGE;
          const endIdx = Math.min(startIdx + QUESTIONS_PER_PAGE, ITEMS.length);
          const hasUnanswered = ITEMS.slice(startIdx, endIdx).some(
            (item) => !parsed[item.id]
          );
          if (hasUnanswered) {
            firstUnansweredPage = page;
            break;
          }
        }
        setCurrentPage(firstUnansweredPage);
      } catch (e) {
        console.error("Failed to load saved answers:", e);
      }
    }
  }, []);

  // Save to localStorage whenever answers change
  useEffect(() => {
    if (mounted && Object.keys(answers).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    }
  }, [answers, mounted]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleAnswer = (questionId: number, value: 1 | 2 | 3 | 4 | 5 | 6) => {
    setAnswers((prev: AnswerMap) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentPage < TOTAL_PAGES - 1) {
      setCurrentPage(currentPage + 1);
      // Scroll to top when moving to next page
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } else {
      // Submit
      if (isComplete(answers)) {
        const result = computeResult(answers);
        router.push(`/results/${result.code}`);
      }
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      // Scroll to top when moving to previous page
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Reset function: clear all answers and localStorage
  const handleReset = () => {
    if (confirm("모든 선택지를 초기화하시겠습니까?")) {
      setAnswers({});
      localStorage.removeItem(STORAGE_KEY);
      setCurrentPage(0);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-700">로딩 중...</div>
        </div>
      </div>
    );
  }

  // Get questions for current page
  const startIdx = currentPage * QUESTIONS_PER_PAGE;
  const endIdx = Math.min(startIdx + QUESTIONS_PER_PAGE, ITEMS.length);
  const currentPageItems = ITEMS.slice(startIdx, endIdx);

  // Check if all questions on current page are answered
  const allAnsweredOnPage = currentPageItems.every(
    (item) => answers[item.id] !== undefined
  );

  // Calculate overall progress
  const answeredCount = Object.keys(answers).length;
  const totalProgress = Math.round((answeredCount / ITEMS.length) * 100);

  // Get axis name for current page
  const axisNames: Record<number, string> = {
    0: "주도 vs 조율",
    1: "표현 vs 절제",
    2: "현실 vs 열정",
    3: "낙관 vs 성실",
  };

  return (
    <div className="min-h-screen bg-gray-50">
        {/* Progress Bar - Sticky */}
        <div className="sticky top-0 w-full bg-white border-b border-gray-200 z-40">
          <div className="max-w-[640px] mx-auto px-4 py-3">
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-rose-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${totalProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[640px] mx-auto px-4 pb-4">
          <div className="space-y-4">
            {/* Page Info */}
            <div className="flex items-center justify-between pt-4">
              <span className="text-sm font-medium text-gray-500">
                {currentPage + 1} / {TOTAL_PAGES}
              </span>
              <span className="text-sm font-semibold text-rose-500">
                {axisNames[currentPage]}
              </span>
            </div>

            {/* Questions List - Scrollable */}
            <div className="bg-white rounded-xl p-4 md:p-5 space-y-6">
            {currentPageItems.map((item, index) => {
              const questionNumber = startIdx + index + 1;
              const currentAnswer = answers[item.id];

              return (
                <div key={item.id} className="space-y-4 pb-6 border-b border-gray-100 last:border-b-0">
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-2">
                      질문 {questionNumber}
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 leading-relaxed px-2">
                      {item.text}
                    </h3>
                  </div>

                  <Likert
                    value={currentAnswer}
                    onChange={(value) => handleAnswer(item.id, value)}
                  />
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="bg-white rounded-xl p-4">
            <div className="flex gap-4 justify-between">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentPage === 0}
              className={`
                px-6 py-3 font-medium transition-colors rounded-lg
                ${
                  currentPage === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                }
                focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2
              `}
            >
              이전
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-3 font-medium transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
                title="모든 선택지 초기화"
              >
                초기화
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!allAnsweredOnPage}
                className={`
                  px-6 py-3 font-medium transition-colors rounded-lg
                  ${
                    allAnsweredOnPage
                      ? "bg-rose-500 text-white hover:bg-rose-600"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2
                `}
              >
                {currentPage === TOTAL_PAGES - 1 ? "결과 보기" : "다음"}
              </button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
