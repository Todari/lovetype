import { Metadata } from "next";

export const metadata: Metadata = {
  title: "테스트 시작",
  description:
    "32개의 질문에 답하고 나의 관계 유형을 알아보세요. 약 2분이면 완료됩니다.",
};

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
