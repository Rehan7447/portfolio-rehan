import type { MetadataRoute } from "next";
import { projects, services, siteConfig } from "@/lib/content";
import { agentApi } from "@/lib/agent-api";

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
    // Service pages carry the commercial-intent keywords, so they rank above
    // the individual case studies.
    ...services.map((s) => ({
      url: `${siteConfig.url}/services/${s.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    {
      url: `${siteConfig.url}${agentApi.paths.docs}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...projects.map((p) => ({
      url: `${siteConfig.url}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
