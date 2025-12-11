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

export default function Likert({ value, onChange }: LikertProps) {
  // Size mapping: 양 옆으로 갈수록 커짐
  const sizeMap: Record<number, string> = {
    1: "w-12 h-12", // 가장 작음 (왼쪽 끝)
    2: "w-14 h-14",
    3: "w-16 h-16",
    4: "w-16 h-16",
    5: "w-14 h-14",
    6: "w-12 h-12", // 가장 작음 (오른쪽 끝) - 아니다, 그렇다 방향 고려
  };

  // 실제로는 중앙이 작고 양 끝이 커야 하므로 재조정
  const actualSizeMap: Record<number, string> = {
    1: "w-14 h-14", // 왼쪽 끝 - 가장 큼
    2: "w-12 h-12",
    3: "w-10 h-10", // 중앙 - 작음
    4: "w-10 h-10", // 중앙 - 작음
    5: "w-12 h-12",
    6: "w-14 h-14", // 오른쪽 끝 - 가장 큼
  };

  return (
    <div className="w-full space-y-4">
      {/* Labels */}
      <div className="flex justify-between items-center px-2">
        <span className="text-sm font-medium text-gray-600">아니다</span>
        <span className="text-sm font-medium text-gray-600">그렇다</span>
      </div>

      {/* Heart buttons */}
      <div className="flex items-center justify-center gap-3 md:gap-4 px-4">
        {[1, 2, 3, 4, 5, 6].map((num) => {
          const numValue = num as 1 | 2 | 3 | 4 | 5 | 6;
          const isSelected = value === numValue;
          const sizeClass = actualSizeMap[num];

          return (
            <div key={num} className="h-14 flex items-center justify-center">
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
                  focus:outline-none
                  active:outline-none
                  ${
                    isSelected
                      ? "text-rose-600 scale-110"
                      : "text-gray-300 hover:text-gray-400 hover:scale-105"
                  }
                `}
                style={{ boxShadow: "none" }}
                aria-pressed={isSelected}
                aria-label={`선택지 ${num}`}
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
