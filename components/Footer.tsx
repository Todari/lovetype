"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-[640px] mx-auto px-4 py-6">
        <div className="text-center text-sm text-gray-600 space-y-2">
          <p>
            <strong>면책 조항:</strong> 이 테스트는 독립적으로 제작된 비공식
            테스트이며, 엔터테인먼트 목적으로만 사용됩니다.
          </p>
          <p>
            <strong>프라이버시:</strong> 모든 데이터는 로컬 브라우저에만
            저장되며 서버로 전송되지 않습니다.
          </p>
          <p className="pt-2">
            개선점이나 아이디어가 있으시면{" "}
            <a
              href="mailto:lvti16.official@gmail.com"
              className="text-rose-500 hover:text-rose-600 underline font-medium"
            >
              lvti16.official@gmail.com
            </a>
            으로 연락해주세요.
          </p>
          <p>
            <a
              href="https://github.com/Todari/lovetype"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-500 hover:text-rose-600 underline font-medium"
            >
              GitHub에서 공개 코드 보기
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
