import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "LVTI - 연애할 때, 당신은 어떤 사람인가요?",
  description:
    "32개의 질문으로 알아보는 나의 관계 유형. 16가지 유형 중 당신은 어떤 타입인지 확인해보세요.",
  openGraph: {
    title: "LVTI - 연애할 때, 당신은 어떤 사람인가요?",
    description:
      "32개의 질문으로 알아보는 나의 관계 유형. 16가지 유형 중 당신은 어떤 타입인지 확인해보세요.",
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
