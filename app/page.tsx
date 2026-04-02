import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-[640px] mx-auto space-y-6">
        {/* Hero 섹션 - 첫 화면에서 CTA까지 보이도록 */}
        <div className="text-center space-y-6 py-16">
          <div className="text-5xl font-bold text-rose-500">LVTI</div>
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
              연애할 때,
              <br />
              당신은 어떤 사람인가요?
            </h1>
            <p className="text-gray-500">
              32개의 질문으로 알아보는 나의 관계 유형
            </p>
          </div>
          <Link
            href="/test"
            className="inline-block bg-rose-500 text-white px-12 py-4 rounded-full font-semibold text-lg hover:bg-rose-600 transition-colors"
          >
            테스트 시작하기
          </Link>
        </div>

        {/* 4개 축 - 간략 카드 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="text-rose-500 font-bold mb-1">주도 vs 조율</div>
            <p className="text-xs text-gray-600">
              이끄는 편인가, 맞춰가는 편인가
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="text-rose-500 font-bold mb-1">표현 vs 절제</div>
            <p className="text-xs text-gray-600">
              애정을 드러내는가, 담백하게 표현하는가
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="text-rose-500 font-bold mb-1">현실 vs 열정</div>
            <p className="text-xs text-gray-600">
              현실을 따지는가, 감정을 따르는가
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="text-rose-500 font-bold mb-1">낙관 vs 성실</div>
            <p className="text-xs text-gray-600">
              분위기를 즐기는가, 약속을 지키는가
            </p>
          </div>
        </div>

        {/* 테스트 특징 - 한 줄씩 */}
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-500">
          <span>📋 32문항</span>
          <span>⚡ 약 2분</span>
          <span>🔒 데이터 비공개</span>
        </div>

        {/* 면책 조항 */}
        <p className="text-xs text-gray-400 text-center leading-relaxed">
          이 테스트는 엔터테인먼트 목적으로 제작되었습니다. 결과는 참고용이며,
          실제 관계나 인격을 완전히 설명하지는 않습니다.
        </p>

        {/* 하단 CTA */}
        <Link
          href="/test"
          className="block w-full bg-rose-500 text-white py-4 rounded-full font-semibold text-lg hover:bg-rose-600 transition-colors text-center"
        >
          테스트 시작하기
        </Link>
      </div>
    </div>
  );
}
