import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "LVTI - 연애할 때, 당신은 어떤 사람인가요?",
    template: "%s | LVTI",
  },
  description:
    "32개의 질문으로 알아보는 나의 관계 유형. 16가지 유형 중 당신은 어떤 타입인지 확인해보세요.",
  keywords: [
    "LVTI",
    "관계 유형",
    "연애 테스트",
    "성격 테스트",
    "궁합",
    "MBTI",
    "심리테스트",
    "사랑 유형",
  ],
  openGraph: {
    title: "LVTI - 연애할 때, 당신은 어떤 사람인가요?",
    description:
      "32개의 질문으로 알아보는 나의 관계 유형. 16가지 유형 중 당신은 어떤 타입인지 확인해보세요.",
    type: "website",
    siteName: "LVTI",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://lvti.vercel.app",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "LVTI",
              description: "32개의 질문으로 알아보는 나의 관계 유형",
              url: "https://lvti.vercel.app",
              applicationCategory: "EntertainmentApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "KRW",
              },
            }),
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
