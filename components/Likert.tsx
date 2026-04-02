"use client";

interface LikertProps {
  value: 1 | 2 | 3 | 4 | 5 | 6 | undefined;
  onChange: (value: 1 | 2 | 3 | 4 | 5 | 6) => void;
}

// Heart icon SVG component
const HeartIcon = ({ size, filled }: { size: string; filled: boolean }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="transition-all"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ARIA_LABELS: Record<number, string> = {
  1: "매우 아니다",
  2: "아니다",
  3: "약간 아니다",
  4: "약간 그렇다",
  5: "그렇다",
  6: "매우 그렇다",
};

export default function Likert({ value, onChange }: LikertProps) {
  const actualSizeMap: Record<number, string> = {
    1: "w-10 h-10", // 왼쪽 끝 - 가장 큼
    2: "w-9 h-9",
    3: "w-8 h-8", // 중앙 - 작음
    4: "w-8 h-8", // 중앙 - 작음
    5: "w-9 h-9",
    6: "w-10 h-10", // 오른쪽 끝 - 가장 큼
  };

  return (
    <div className="w-full space-y-4">
      {/* Labels */}
      <div className="flex justify-between items-center px-2">
        <span className="text-sm font-medium text-gray-600">아니다</span>
        <span className="text-sm font-medium text-gray-600">그렇다</span>
      </div>

      {/* Heart buttons */}
      <div className="flex items-center justify-center gap-2 md:gap-3 px-2">
        {[1, 2, 3, 4, 5, 6].map((num) => {
          const numValue = num as 1 | 2 | 3 | 4 | 5 | 6;
          const isSelected = value === numValue;
          const sizeClass = actualSizeMap[num];

          return (
            <div key={num} className="h-12 flex items-center justify-center">
              <button
                type="button"
                onClick={() => onChange(numValue)}
                onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onChange(numValue);
                  }
                }}
                className={`
                  ${sizeClass}
                  flex items-center justify-center
                  bg-transparent
                  border-none
                  p-0
                  transition-all duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:rounded-full
                  ${
                    isSelected
                      ? "text-rose-600 scale-110"
                      : "text-gray-300 hover:text-gray-400 hover:scale-105"
                  }
                `}
                aria-pressed={isSelected}
                aria-label={ARIA_LABELS[num]}
              >
                <HeartIcon size="100%" filled={isSelected} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
