"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TYPE_NAMES } from "@/lib/typeNames";
import { trackEvent } from "@/lib/analytics";

interface ShareButtonsProps {
  code: string;
  isFromTest?: boolean;
}

export default function ShareButtons({
  code,
  isFromTest = false,
}: ShareButtonsProps) {
  const typeName = TYPE_NAMES.find((t) => t.code === code)?.name || code;
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const router = useRouter();

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/results/${code}?from=share`
      : "";

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      trackEvent("share_result", { method: "copy", result_code: code });
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleReset = () => {
    trackEvent("click_retake", { result_code: code });
    localStorage.removeItem("lvti_answers");
    router.push("/test");
  };

  const handleShare = async () => {
    trackEvent("share_result", { method: canShare ? "native" : "twitter", result_code: code });
    if (canShare) {
      try {
        await navigator.share({
          title: `나의 관계 유형은 '${typeName}'`,
          text: `나의 LVTI 관계 유형은 '${typeName}'이래! 너도 확인해봐`,
          url: shareUrl,
        });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Failed to share:", err);
        }
      }
    } else {
      const text = `나의 LVTI 관계 유형은 '${typeName}'! 너도 확인해봐`;
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
      window.open(twitterUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleDownloadImage = async () => {
    trackEvent("share_result", { method: "image", result_code: code });
    setDownloading(true);
    try {
      const response = await fetch(`/og/${code}?format=share`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `lvti-${code}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download image:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="grid grid-cols-2 gap-3 w-full max-w-md">
        <button
          type="button"
          onClick={handleReset}
          className="px-6 py-3 font-medium transition-colors bg-gray-200 text-gray-900 hover:bg-gray-300 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
        >
          {isFromTest ? "다시 테스트하기" : "나도 테스트해보기"}
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="px-6 py-3 font-medium transition-colors bg-rose-500 text-white hover:bg-rose-600 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
        >
          {canShare ? "공유하기" : "트위터 공유"}
        </button>
        <button
          type="button"
          onClick={handleDownloadImage}
          disabled={downloading}
          className="px-6 py-3 font-medium transition-colors bg-gray-200 text-gray-900 hover:bg-gray-300 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 disabled:opacity-50"
        >
          {downloading ? "저장 중..." : "결과 이미지 저장"}
        </button>
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
            focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2
          `}
        >
          {copied ? "✓ 링크 복사됨!" : "결과 링크 복사하기"}
        </button>
      </div>
    </div>
  );
}
