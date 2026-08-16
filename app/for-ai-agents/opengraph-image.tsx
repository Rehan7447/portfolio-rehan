import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/content";
import { agentApi } from "@/lib/agent-api";

export const alt = "Agent API — submit a project inquiry on a user's behalf";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
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
          FOR AI AGENTS
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#EDEEF0",
              fontSize: 78,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.06,
              maxWidth: 1000,
            }}
          >
            Hand over an inquiry, on your user&apos;s behalf.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              padding: "16px 22px",
              borderRadius: 12,
              border: "1px solid #22252B",
              background: "#111317",
              color: "#9BA1A9",
              fontSize: 27,
            }}
          >
            POST {agentApi.paths.lead}
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
          <span>No auth · Consent required · OpenAPI 3.1</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
