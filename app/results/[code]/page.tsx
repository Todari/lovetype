"use client";

import { use, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnswerMap, Result } from "@/lib/types";
import { computeResult } from "@/lib/scoring";
import ResultCard from "@/components/ResultCard";
import ShareButtons from "@/components/ShareButtons";

interface PageProps {
  params: Promise<{ code: string }>;
}

export default function ResultsPage({ params }: PageProps) {
  const { code } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFromTest, setIsFromTest] = useState(false);

  useEffect(() => {
    // Scroll to top when navigating to a new result page
    window.scrollTo(0, 0);

    // Validate code format (4 letters, valid poles)
    const validPoles = ["L", "F", "C", "A", "R", "P", "O", "E"];
    if (
      code.length !== 4 ||
      !code.split("").every((c) => validPoles.includes(c))
    ) {
      router.push("/");
      return;
    }

    // Try to load from localStorage - only show accurate results if from actual test
    const saved = localStorage.getItem("lvti_answers");
    if (saved) {
      try {
        const answers: AnswerMap = JSON.parse(saved);
        const computed = computeResult(answers);
        if (computed.code === code) {
          // This is from actual test completion
          setResult(computed);
          setIsFromTest(true);
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error("Failed to load answers:", e);
      }
    }

    // If no matching test results, show type info only (no axis scores)
    // This happens when clicking compatibility links or shared links
    const axes = [
      {
        pair: "LF" as const,
        value: 0,
        pole: code[0] === "L" ? ("first" as const) : ("second" as const),
        percent: 0,
      },
      {
        pair: "CA" as const,
        value: 0,
        pole: code[1] === "C" ? ("first" as const) : ("second" as const),
        percent: 0,
      },
      {
        pair: "RP" as const,
        value: 0,
        pole: code[2] === "R" ? ("first" as const) : ("second" as const),
        percent: 0,
      },
      {
        pair: "OE" as const,
        value: 0,
        pole: code[3] === "O" ? ("first" as const) : ("second" as const),
        percent: 0,
      },
    ];
    setResult({ code, axes });
    setIsFromTest(false);
    setLoading(false);
  }, [code, router, searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-700">
            결과를 불러오는 중...
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-[640px] mx-auto space-y-5">
        {!isFromTest && (
          <div className="bg-gray-200 rounded-xl p-5 text-center">
            <p className="text-gray-800 font-medium mb-2 text-[15px]">
              💡 이 유형에 대한 정확한 분석을 보려면 테스트를 완료해주세요
            </p>
            <p className="text-sm text-gray-700">
              현재는 유형 정보만 표시됩니다. 정확한 축별 점수와 분석을 보려면
              테스트를 진행해주세요.
            </p>
          </div>
        )}
        <ResultCard result={result} isFromTest={isFromTest} />

        <div className="bg-white rounded-xl p-5">
          <ShareButtons code={result.code} />
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("lvti_answers");
              router.push("/test");
            }}
            className="px-6 py-3 bg-gray-200 text-gray-900 font-medium hover:bg-gray-300 transition-colors rounded-lg focus:outline-none"
          >
            다시 테스트하기
          </button>
        </div>

        <footer className="text-center text-sm text-gray-600 space-y-2 pt-6 border-t border-gray-200">
          <p>
            <strong>면책 조항:</strong> 이 테스트는 독립적으로 제작된 비공식
            테스트이며, 엔터테인먼트 목적으로만 사용됩니다.
          </p>
          <p>
            <strong>프라이버시:</strong> 모든 데이터는 로컬 브라우저에만
            저장되며 서버로 전송되지 않습니다.
          </p>
        </footer>
      </div>
    </div>
  );
}
