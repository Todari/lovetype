"use client";

import { useState } from "react";

interface ShareButtonsProps {
  code: string;
}

export default function ShareButtons({ code }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

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

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        type="button"
        onClick={handleCopy}
        className={`
          px-6 py-3 font-medium transition-colors rounded-lg
          ${
            copied
              ? "bg-gray-700 text-white"
              : "bg-rose-500 text-white hover:bg-rose-600"
          }
          focus:outline-none
        `}
      >
        {copied ? "✓ 링크 복사됨!" : "결과 링크 복사하기"}
      </button>
      <div className="text-sm text-gray-500 text-center max-w-md">
        {shareUrl}
      </div>
    </div>
  );
}
