import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SITE_URL = "https://lvti.my";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
  authors: [{ name: "Todari" }],
  creator: "Todari",
  publisher: "Todari",
  openGraph: {
    title: "LVTI - 연애할 때, 당신은 어떤 사람인가요?",
    description:
      "32개의 질문으로 알아보는 나의 관계 유형. 16가지 유형 중 당신은 어떤 타입인지 확인해보세요.",
    type: "website",
    siteName: "LVTI",
    locale: "ko_KR",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "LVTI - 연애할 때, 당신은 어떤 사람인가요?",
    description:
      "32개의 질문으로 알아보는 나의 관계 유형. 16가지 유형 중 당신은 어떤 타입인지 확인해보세요.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#ef4444",
  width: "device-width",
  initialScale: 1,
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
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: "LVTI",
                  description: "32개의 질문으로 알아보는 16가지 연애 성격 유형 테스트",
                  inLanguage: "ko-KR",
                  publisher: { "@id": `${SITE_URL}/#org` },
                },
                {
                  "@type": "Organization",
                  "@id": `${SITE_URL}/#org`,
                  name: "Todari",
                  url: "https://todari.dev",
                  logo: `${SITE_URL}/logo.svg`,
                },
                {
                  "@type": "WebApplication",
                  "@id": `${SITE_URL}/#app`,
                  name: "LVTI",
                  description: "32개의 질문으로 알아보는 나의 관계 유형",
                  url: SITE_URL,
                  applicationCategory: "EntertainmentApplication",
                  operatingSystem: "Web",
                  inLanguage: "ko-KR",
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "KRW",
                  },
                },
              ],
            }),
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
