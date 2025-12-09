import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lovetype 16 - 관계 유형 테스트",
  description: "16가지 관계 유형을 알아보는 비공식 테스트입니다. 엔터테인먼트 목적으로만 사용하세요.",
  openGraph: {
    title: "Lovetype 16 - 관계 유형 테스트",
    description: "16가지 관계 유형을 알아보는 비공식 테스트입니다.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}


