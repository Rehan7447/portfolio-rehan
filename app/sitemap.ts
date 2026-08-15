import type { MetadataRoute } from "next";
import { projects, siteConfig } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/work`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...projects.map((p) => ({
      url: `${siteConfig.url}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
