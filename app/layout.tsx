import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "LVTI - 관계 유형 테스트",
  description: "Love Test Investigation - 16가지 관계 유형을 알아보는 비공식 테스트입니다. 엔터테인먼트 목적으로만 사용하세요.",
  openGraph: {
    title: "LVTI - 관계 유형 테스트",
    description: "Love Test Investigation - 16가지 관계 유형을 알아보는 비공식 테스트입니다.",
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
      <body className="antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}


