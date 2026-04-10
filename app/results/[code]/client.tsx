"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnswerMap, Result } from "@/lib/types";
import { computeResult } from "@/lib/scoring";
import ResultCard from "@/components/ResultCard";
import ShareButtons from "@/components/ShareButtons";
import { trackEvent } from "@/lib/analytics";

interface ClientProps {
  code: string;
}

export default function ResultsPageClient({ code }: ClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFromTest, setIsFromTest] = useState(false);
  const [tracked, setTracked] = useState(false);

  useEffect(() => {
    // Scroll to top when navigating to a new result page
    window.scrollTo(0, 0);

    // Validate code format (4 letters, each position must be valid pole pair)
    const validByPosition = [["L", "F"], ["C", "A"], ["R", "P"], ["O", "E"]];
    if (
      code.length !== 4 ||
      !code.split("").every((c, i) => validByPosition[i].includes(c))
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
  }, [code, router]);

  useEffect(() => {
    if (!loading && !tracked) {
      trackEvent("view_result", {
        result_code: code,
        is_own: isFromTest,
        source: searchParams.get("from") || "direct",
      });
      setTracked(true);
    }
  }, [loading, tracked, code, isFromTest, searchParams]);

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
        <ResultCard result={result} isFromTest={isFromTest} />

        <div className="bg-white rounded-xl p-5">
          <ShareButtons code={result.code} isFromTest={isFromTest} />
        </div>
      </div>
    </div>
  );
}

