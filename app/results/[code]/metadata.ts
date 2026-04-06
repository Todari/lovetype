import { Metadata } from "next";
import { TYPE_NAMES } from "@/lib/typeNames";

export function generateMetadata(code: string, baseUrl?: string): Metadata {
  const typeInfo = TYPE_NAMES.find((type) => type.code === code);
  const typeName = typeInfo?.name || `${code} 유형`;
  const catchphrase = typeInfo?.catchphrase || "";
  const summary = typeInfo?.summary || `LVTI ${code} 유형에 대한 상세한 분석을 확인해보세요.`;
  const description = catchphrase ? `"${catchphrase}" - ${summary}` : summary;
  const siteUrl = baseUrl || (typeof window !== "undefined" ? window.location.origin : "https://lvti.vercel.app");

  return {
    title: `${typeName} (${code})`,
    description: description.substring(0, 160),
    openGraph: {
      title: `${typeName} (${code})`,
      description: description.substring(0, 160),
      type: "website",
      url: `${siteUrl}/results/${code}?from=share`,
      images: [
        {
          url: `${siteUrl}/og/${code}`,
          width: 1200,
          height: 630,
          alt: `${typeName} (${code})`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${typeName} (${code})`,
      description: description.substring(0, 160),
      images: [`${siteUrl}/og/${code}`],
    },
  };
}

