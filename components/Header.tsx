"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-rose-500 hover:text-rose-600 transition-colors"
        >
          LVTI
        </Link>
        <Link
          href="/types"
          className="text-sm font-medium text-gray-700 hover:text-rose-500 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-50"
        >
          모든 유형 보기
        </Link>
      </div>
    </header>
  );
}

