import { ImageResponse } from "next/og";
import { getProject, projects, siteConfig } from "@/lib/content";

export const alt = "Case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B0C0E",
          backgroundImage:
            "radial-gradient(circle at 15% -10%, rgba(107,140,255,0.20), transparent 55%)",
          padding: "68px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ color: "#9DB2FF", fontSize: 26, letterSpacing: 3 }}>
          {(project?.type ?? "Case study").toUpperCase()}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#EDEEF0",
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.05,
            }}
          >
            {project?.title ?? "Selected work"}
          </div>
          <div
            style={{
              color: "#9BA1A9",
              fontSize: 28,
              maxWidth: 940,
              lineHeight: 1.45,
              marginTop: 22,
            }}
          >
            {project?.summary ?? ""}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #22252B",
            paddingTop: 26,
            color: "#6C7178",
            fontSize: 22,
          }}
        >
          <span style={{ color: "#EDEEF0" }}>{siteConfig.name}</span>
          <span>{(project?.tags ?? []).slice(0, 4).join("  ·  ")}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
