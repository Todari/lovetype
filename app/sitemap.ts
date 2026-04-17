import { MetadataRoute } from "next";
import { TYPE_NAMES } from "@/lib/typeNames";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://lvti.my";
  const lastModified = new Date();

  const typePages = TYPE_NAMES.map((type) => ({
    url: `${baseUrl}/results/${type.code}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/test`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/types`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...typePages,
  ];
}
