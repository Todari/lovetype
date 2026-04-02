import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-[640px] mx-auto">
        <div className="bg-white rounded-xl p-8 text-center space-y-6">
          <div className="text-5xl font-bold text-rose-500">LVTI</div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              페이지를 찾을 수 없습니다
            </h1>
            <p className="text-gray-600">
              요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="block w-full bg-rose-500 text-white py-3 rounded-lg font-semibold hover:bg-rose-600 transition-colors"
            >
              홈으로 가기
            </Link>
            <Link
              href="/test"
              className="block w-full bg-gray-200 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              테스트 시작하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
