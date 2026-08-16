/**
 * Capability manifest for autonomous clients.
 *
 * Also served at /.well-known/agent.json and /.well-known/ai-plugin.json via
 * rewrites in next.config.mjs — those are the paths agents probe by
 * convention, and Next's app router will not route a dot-prefixed directory.
 */
import { NextResponse } from "next/server";
import { buildManifest, AGENT_API_VERSION, agentUrls } from "@/lib/agent-api";

export const runtime = "nodejs";
export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json(buildManifest(), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "X-Agent-Api-Version": AGENT_API_VERSION,
      "X-Agent-Docs": agentUrls.docs,
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
