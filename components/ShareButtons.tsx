"use client";

import { useState } from "react";

interface ShareButtonsProps {
  code: string;
}

export default function ShareButtons({ code }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" 
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
          px-6 py-3 rounded-lg font-medium transition-all
          ${
            copied
              ? "bg-green-600 text-white"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
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

