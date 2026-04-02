import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "LVTI - 사랑 유형 테스트",
  description:
    "Love Test Investigation - 16가지 사랑 유형을 알아보는 테스트입니다. 엔터테인먼트 목적으로만 사용하세요.",
  openGraph: {
    title: "LVTI - 사랑 유형 테스트",
    description:
      "Love Test Investigation - 16가지 사랑 유형을 알아보는 테스트입니다.",
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
      <body className="antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
