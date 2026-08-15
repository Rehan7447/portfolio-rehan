import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Generated favicon: monogram on graphite.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B0C0E",
          color: "#EDEEF0",
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: -1,
          fontFamily: "sans-serif",
          border: "1px solid #2E323A",
          borderRadius: 7,
        }}
      >
        RA
      </div>
    ),
    { ...size }
  );
}
