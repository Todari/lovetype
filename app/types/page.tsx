"use client";

import { useEffect } from "react";
import Link from "next/link";
import { TYPE_NAMES } from "@/lib/typeNames";

export default function TypesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-[640px] mx-auto space-y-6">
        {/* 헤더 */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">16가지 관계 유형</h1>
          <p className="text-[15px] text-gray-600">
            각 유형을 클릭하면 상세한 해설을 확인할 수 있습니다
          </p>
        </div>

        {/* 4x4 그리드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {TYPE_NAMES.map((type) => (
            <Link
              key={type.code}
              href={`/results/${type.code}?from=share`}
              scroll={true}
              className="bg-white rounded-xl p-4 hover:bg-gray-50 transition-colors border border-gray-200 hover:border-rose-300 hover:shadow-sm"
            >
              <div className="space-y-2">
                <div className="text-lg font-bold text-rose-500">{type.code}</div>
                <div className="text-sm font-semibold text-gray-900 leading-tight">
                  {type.name}
                </div>
                <div className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                  {type.summary}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 안내 */}
        <div className="bg-gray-100 rounded-xl p-5 text-center">
          <p className="text-sm text-gray-700">
            각 유형을 클릭하면 해당 유형의 상세한 해설, 강점, 주의할 점, 그리고 궁합 정보를 확인할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}



