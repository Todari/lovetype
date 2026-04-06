"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { computeResult, isComplete } from "@/lib/scoring";
import { AnswerMap } from "@/lib/types";

export default function Header() {
  const [myCode, setMyCode] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("lvti_answers");
    if (saved) {
      try {
        const answers: AnswerMap = JSON.parse(saved);
        if (isComplete(answers)) {
          const result = computeResult(answers);
          setMyCode(result.code);
        }
      } catch {}
    }
  }, []);

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-[640px] mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-rose-500 hover:text-rose-600 transition-colors"
        >
          LVTI
        </Link>
        <div className="flex items-center gap-2">
          {myCode && (
            <Link
              href={`/results/${myCode}`}
              className="text-sm font-medium text-rose-500 hover:text-rose-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-50"
            >
              나의 결과
            </Link>
          )}
          <Link
            href="/types"
            className="text-sm font-medium text-gray-700 hover:text-rose-500 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-50"
          >
            모든 유형 보기
          </Link>
        </div>
      </div>
    </header>
  );
}
