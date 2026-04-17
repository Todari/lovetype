import { Metadata } from "next";
import { Suspense } from "react";
import { generateMetadata as generateTypeMetadata } from "./metadata";
import ResultsPageClient from "./client";
import { TYPE_NAMES } from "@/lib/typeNames";
import { TYPE_DETAILS } from "@/lib/typeDetails";

const SITE_URL = "https://lvti.my";

interface PageProps {
  params: Promise<{ code: string }>;
}

export function generateStaticParams() {
  return TYPE_NAMES.map((type) => ({ code: type.code }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { code } = await params;
  return {
    ...generateTypeMetadata(code, SITE_URL),
    alternates: { canonical: `${SITE_URL}/results/${code}` },
  };
}

export default async function ResultsPage({ params }: PageProps) {
  const { code } = await params;
  const typeInfo = TYPE_NAMES.find((t) => t.code === code);
  const details = TYPE_DETAILS[code];

  const jsonLd =
    typeInfo && details
      ? {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              "@id": `${SITE_URL}/results/${code}#article`,
              headline: `${typeInfo.name} (${code})`,
              description: typeInfo.summary,
              inLanguage: "ko-KR",
              author: { "@type": "Organization", name: "LVTI", url: SITE_URL },
              publisher: {
                "@type": "Organization",
                name: "Todari",
                url: "https://todari.dev",
              },
              mainEntityOfPage: `${SITE_URL}/results/${code}`,
              about: {
                "@type": "Thing",
                name: `LVTI ${code} 유형: ${typeInfo.name}`,
              },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "LVTI",
                  item: SITE_URL,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "유형",
                  item: `${SITE_URL}/types`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: `${typeInfo.name} (${code})`,
                  item: `${SITE_URL}/results/${code}`,
                },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: `${typeInfo.name}(${code})은 어떤 유형인가요?`,
                  acceptedAnswer: { "@type": "Answer", text: details.overview },
                },
                {
                  "@type": "Question",
                  name: `${typeInfo.name}의 사회생활은 어떤가요?`,
                  acceptedAnswer: { "@type": "Answer", text: details.social },
                },
                {
                  "@type": "Question",
                  name: `${typeInfo.name}의 연애 스타일은 어떤가요?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: details.relationship,
                  },
                },
                {
                  "@type": "Question",
                  name: `${typeInfo.name}의 강점은 무엇인가요?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: details.strengths,
                  },
                },
                {
                  "@type": "Question",
                  name: `${typeInfo.name}이 주의해야 할 점은 무엇인가요?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: details.watchouts,
                  },
                },
                {
                  "@type": "Question",
                  name: `${typeInfo.name}과 잘 지내려면 어떻게 해야 하나요?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: details.forOthers,
                  },
                },
                {
                  "@type": "Question",
                  name: `${typeInfo.name} 본인이 성장하려면 어떻게 해야 하나요?`,
                  acceptedAnswer: { "@type": "Answer", text: details.forSelf },
                },
              ],
            },
          ],
        }
      : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <Suspense fallback={null}>
        <ResultsPageClient code={code} />
      </Suspense>
    </>
  );
}
