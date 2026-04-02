import { Metadata } from "next";
import { notFound } from "next/navigation";
import { TYPE_NAMES } from "@/lib/typeNames";
import CompareClient from "./client";

interface PageProps {
  params: Promise<{ code1: string; code2: string }>;
}

function isValidCode(code: string): boolean {
  if (code.length !== 4) return false;
  const validByPosition: string[][] = [
    ["L", "F"],
    ["C", "A"],
    ["R", "P"],
    ["O", "E"],
  ];
  return code.split("").every((c, i) => validByPosition[i].includes(c));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { code1, code2 } = await params;

  const typeInfo1 = TYPE_NAMES.find((t) => t.code === code1);
  const typeInfo2 = TYPE_NAMES.find((t) => t.code === code2);
  const typeName1 = typeInfo1?.name || `${code1} 유형`;
  const typeName2 = typeInfo2?.name || `${code2} 유형`;

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://lvti.vercel.app";

  return {
    title: `${code1} vs ${code2} 궁합 분석 | LVTI`,
    description: `${typeName1}과 ${typeName2}의 궁합을 확인해보세요`,
    openGraph: {
      title: `${code1} vs ${code2} 궁합 분석`,
      description: `${typeName1}과 ${typeName2}의 궁합을 확인해보세요`,
      type: "website",
      url: `${baseUrl}/compare/${code1}/${code2}`,
    },
    twitter: {
      card: "summary",
      title: `${code1} vs ${code2} 궁합 분석`,
      description: `${typeName1}과 ${typeName2}의 궁합을 확인해보세요`,
    },
  };
}

export default async function ComparePage({ params }: PageProps) {
  const { code1, code2 } = await params;

  if (!isValidCode(code1) || !isValidCode(code2)) {
    notFound();
  }

  return <CompareClient code1={code1} code2={code2} />;
}
