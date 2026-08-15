import { ImageResponse } from "next/og";
import { siteConfig, stats } from "@/lib/content";

export const alt = `${siteConfig.name} — Senior Full-Stack Developer and AI Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
            "radial-gradient(circle at 50% -10%, rgba(107,140,255,0.20), transparent 55%)",
          padding: "68px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 99,
              background: "#6B8CFF",
            }}
          />
          <div style={{ color: "#9BA1A9", fontSize: 24, letterSpacing: 2 }}>
            {`${siteConfig.location} · ${siteConfig.timezone}`}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#EDEEF0",
              fontSize: 82,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.05,
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              color: "#9DB2FF",
              fontSize: 38,
              fontWeight: 600,
              marginTop: 12,
              letterSpacing: -1,
            }}
          >
            {"Senior Full-Stack Developer & AI Engineer"}
          </div>
          <div
            style={{
              color: "#9BA1A9",
              fontSize: 25,
              maxWidth: 900,
              lineHeight: 1.45,
              marginTop: 20,
            }}
          >
            Production SaaS platforms, RAG pipelines, voice AI systems, and
            fintech backends.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 56,
            borderTop: "1px solid #22252B",
            paddingTop: 26,
          }}
        >
          {stats.map((s) => (
            <div key={s.label} style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "#EDEEF0", fontSize: 30, fontWeight: 600 }}>
                {s.value}
              </span>
              <span style={{ color: "#6C7178", fontSize: 18, marginTop: 4 }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
