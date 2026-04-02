import { Metadata } from "next";
import { generateMetadata as generateTypeMetadata } from "./metadata";
import ResultsPageClient from "./client";

interface PageProps {
  params: Promise<{ code: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { code } = await params;
  // Get base URL from environment or use default
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://lvti.vercel.app";
  return generateTypeMetadata(code, baseUrl);
}

export default async function ResultsPage({ params }: PageProps) {
  const { code } = await params;
  return <ResultsPageClient code={code} />;
}
