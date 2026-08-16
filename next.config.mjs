/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },

  /**
   * Well-known discovery paths.
   *
   * Agents probe /.well-known/* by convention, but Next's app router will not
   * route a dot-prefixed directory — so the canonical handlers live under
   * /api and /openapi.json, and these rewrites expose them where clients
   * actually look.
   */
  async rewrites() {
    return [
      { source: "/.well-known/agent.json", destination: "/api/agent" },
      { source: "/.well-known/ai-plugin.json", destination: "/api/agent" },
      { source: "/.well-known/openapi.json", destination: "/openapi.json" },
      { source: "/ai.txt", destination: "/llms.txt" },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        // Machine-readable surfaces are meant to be fetched cross-origin.
        source: "/:path(llms.txt|llms-full.txt|openapi.json|ai.txt)",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
    ];
  },
};

export default nextConfig;
