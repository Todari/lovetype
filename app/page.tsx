"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/test");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-[640px] mx-auto space-y-6">
        {/* 헤더 섹션 */}
        <div className="text-center space-y-4">
          <div className="text-5xl font-bold text-rose-500 mb-2">LVTI</div>
          <h1 className="text-3xl font-bold text-gray-900">관계 유형 테스트</h1>
          <p className="text-lg text-gray-600">Love Test Investigation</p>
        </div>

        {/* 소개 섹션 */}
        <div className="bg-white rounded-xl p-5 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">LVTI란?</h2>
          <div className="text-[15px] text-gray-800 leading-loose space-y-3">
            <p>
              LVTI는 4개의 독립적인 축을 통해 당신의 관계 유형을 분석하는
              테스트입니다. 각 축에서의 성향을 조합하여 총 16가지의 관계 유형 중
              하나로 분류됩니다.
            </p>
            <p>
              이 테스트는 당신이 연애와 인간관계에서 어떤 스타일을 가지고
              있는지, 어떤 강점과 주의할 점이 있는지, 그리고 어떤 유형의
              사람들과 잘 맞는지에 대한 통찰을 제공합니다.
            </p>
            <p>
              결과는 상세한 해설과 함께 제공되며, 각 유형의 특징, 강점, 주의할
              점, 그리고 관계에서의 발전 방향에 대한 구체적인 가이드를
              포함합니다.
            </p>
          </div>
        </div>

        {/* 4개 축 설명 */}
        <div className="bg-gray-50 rounded-xl p-5 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">4개의 축</h2>
          <div className="space-y-4 text-[15px] text-gray-800">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">
                1. 주도 vs 조율 (Lead vs Follow)
              </h3>
              <p className="leading-loose">
                관계에서의 리더십 스타일을 나타냅니다.{" "}
                <strong className="font-semibold text-gray-900">주도형</strong>
                은 결정을 빠르게 내리고 방향을 제시하는 것을 선호하며,{" "}
                <strong className="font-semibold text-gray-900">조율형</strong>
                은 함께 결정하는 과정을 중시하고 상대의 의견을 먼저 듣는 것을
                선호합니다.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">
                2. 표현 vs 절제 (Cuddly vs Accept)
              </h3>
              <p className="leading-loose">
                감정과 애정 표현의 스타일을 나타냅니다.{" "}
                <strong className="font-semibold text-gray-900">표현형</strong>
                은 감정을 풍부하게 표현하고 스킨십과 언어적 애정 표현을 즐기며,{" "}
                <strong className="font-semibold text-gray-900">절제형</strong>
                은 담백하고 절제된 표현으로 안정감을 주는 스타일입니다.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">
                3. 현실 vs 열정 (Realistic vs Passionate)
              </h3>
              <p className="leading-loose">
                판단과 의사결정의 기준을 나타냅니다.{" "}
                <strong className="font-semibold text-gray-900">현실형</strong>
                은 사실, 제약, 자원을 먼저 점검하고 실용적인 접근을 선호하며,{" "}
                <strong className="font-semibold text-gray-900">열정형</strong>
                은 의미, 스토리, 감정의 깊이를 중시하고 비전과 이상을
                추구합니다.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">
                4. 낙관 vs 성실 (Optimistic vs Earnest)
              </h3>
              <p className="leading-loose">
                관계의 리듬과 태도를 나타냅니다.{" "}
                <strong className="font-semibold text-gray-900">낙관형</strong>
                은 분위기 전환과 회복이 빠르고 가볍고 즐거운 분위기를 만들며,{" "}
                <strong className="font-semibold text-gray-900">성실형</strong>
                은 책임과 규칙을 지키며 꾸준히 밀어붙이고 약속과 루틴을
                중시합니다.
              </p>
            </div>
          </div>
        </div>

        {/* 16가지 유형 설명 */}
        <div className="bg-white rounded-xl p-5 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">16가지 관계 유형</h2>
          <div className="text-[15px] text-gray-800 leading-loose">
            <p>
              4개의 축을 조합하면 총 16가지의 고유한 관계 유형이 만들어집니다.
              각 유형은 독특한 특성과 강점을 가지고 있으며, 연애와 인간관계에서
              다른 방식으로 작동합니다.
            </p>
            <p className="mt-3">
              테스트를 완료하면 당신의 유형에 대한 상세한 해설을 받을 수 있으며,
              해당 유형의 사회·직장 관계 특징, 연애 관계 특징, 강점과 주의할 점,
              그리고 관계에서의 발전 방향에 대한 구체적인 가이드를 확인할 수
              있습니다.
            </p>
          </div>
        </div>

        {/* 테스트 특징 */}
        <div className="bg-gray-50 rounded-xl p-5 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">테스트 특징</h2>
          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">📋</span>
              <div>
                <p className="font-semibold text-gray-900">32개의 질문</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  4개 축에 대한 균형잡힌 질문들로 구성되어 있습니다. 각 질문은
                  일상적인 관계 상황을 바탕으로 만들어졌습니다.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">⚡</span>
              <div>
                <p className="font-semibold text-gray-900">빠른 결과</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  약 2분 내에 완료할 수 있으며, 즉시 상세한 결과를 확인할 수
                  있습니다.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">📊</span>
              <div>
                <p className="font-semibold text-gray-900">상세한 분석</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  각 축별 점수와 함께 유형별 상세 해설, 강점과 주의할 점, 그리고
                  궁합 정보를 제공합니다.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">🔒</span>
              <div>
                <p className="font-semibold text-gray-900">프라이버시 보호</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  모든 데이터는 로컬 브라우저에만 저장되며 서버로 전송되지
                  않습니다. 당신의 답변은 완전히 비공개입니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 면책 조항 */}
        <div className="bg-gray-100 rounded-xl p-5 space-y-2">
          <p className="font-semibold text-gray-900">면책 조항</p>
          <p className="text-sm text-gray-700 leading-relaxed">
            이 테스트는 독립적으로 제작된 비공식 테스트이며, 엔터테인먼트
            목적으로만 사용됩니다. 결과는 참고용이며, 실제 관계나 인격을 완전히
            설명하지는 않습니다. 각 유형의 특징은 일반적인 경향을 나타내며,
            개인차가 있을 수 있습니다.
          </p>
        </div>

        {/* 시작 버튼 */}
        <button
          type="button"
          onClick={handleStart}
          className="w-full bg-rose-500 text-white py-4 rounded-lg font-semibold text-lg hover:bg-rose-600 transition-colors focus:outline-none"
        >
          테스트 시작하기
        </button>
      </div>
    </div>
  );
}
