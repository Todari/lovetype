"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ShareButtonsProps {
  code: string;
  isFromTest?: boolean;
}

export default function ShareButtons({
  code,
  isFromTest = false,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/results/${code}?from=share`
      : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleReset = () => {
    localStorage.removeItem("lvti_answers");
    router.push("/test");
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex gap-3 w-full max-w-md">
        <button
          type="button"
          onClick={handleReset}
          className="px-6 py-3 font-medium transition-colors bg-gray-200 text-gray-900 hover:bg-gray-300 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 flex-1"
        >
          {isFromTest ? "다시 테스트하기" : "나도 테스트해보기"}
        </button>
        <button
          type="button"
          onClick={handleCopy}
          className={`
            px-6 py-3 font-medium transition-colors rounded-lg flex-1
            ${
              copied
                ? "bg-gray-700 text-white"
                : "bg-rose-500 text-white hover:bg-rose-600"
            }
            focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2
          `}
        >
          {copied ? "✓ 링크 복사됨!" : "결과 링크 복사하기"}
        </button>
      </div>
    </div>
  );
}
