"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ITEMS } from "@/lib/questions";
import { AnswerMap } from "@/lib/types";
import { computeResult, isComplete } from "@/lib/scoring";
import QuestionCard from "@/components/QuestionCard";

const STORAGE_KEY = "lvti_answers";

export default function TestPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
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
        // Find the first unanswered question
        const firstUnanswered = ITEMS.findIndex((item) => !parsed[item.id]);
        setCurrentIndex(firstUnanswered >= 0 ? firstUnanswered : ITEMS.length - 1);
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

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-700">로딩 중...</div>
        </div>
      </div>
    );
  }

  const currentItem = ITEMS[currentIndex];
  const currentAnswer = answers[currentItem.id];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
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



