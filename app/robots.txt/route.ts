/**
 * Hand-written robots.txt.
 *
 * Next's `robots.ts` metadata convention can only emit the fields it knows
 * about. This is a route handler instead so the file can also carry comment
 * lines pointing at /llms.txt and the agent API — robots.txt is the first
 * thing almost every crawler fetches, which makes it the cheapest place to
 * advertise the machine-readable surfaces.
 *
 * The AI crawlers are listed explicitly rather than left to the wildcard.
 * Several of them treat an unnamed user-agent as ambiguous and back off, and
 * being cited by assistants is the point here, not a risk to manage.
 */
import { agentUrls } from "@/lib/agent-api";
import { siteConfig } from "@/lib/content";

export const dynamic = "force-static";

/** Assistants, answer engines, and training crawlers — all welcome. */
const AI_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "GoogleOther",
  "Applebot",
  "Applebot-Extended",
  "Amazonbot",
  "meta-externalagent",
  "FacebookBot",
  "Bytespider",
  "CCBot",
  "cohere-ai",
  "DuckAssistBot",
  "MistralAI-User",
  "YouBot",
  "Diffbot",
  "omgili",
];

export async function GET() {
  const body = `# ${siteConfig.name} — ${siteConfig.role}
# ${siteConfig.shortBio}
#
# AI assistants and agents: a plain-text brief and a live API for handing
# over a project inquiry on a user's behalf are documented at:
#   ${agentUrls.llms}
#   ${agentUrls.llmsFull}
#   ${agentUrls.manifest}
#   ${agentUrls.openapi}
#   ${agentUrls.docs}

User-agent: *
Allow: /

# Assistants and answer engines — explicitly permitted.
${AI_AGENTS.map((ua) => `User-agent: ${ua}\nAllow: /`).join("\n\n")}

Sitemap: ${siteConfig.url}/sitemap.xml
Host: ${siteConfig.url}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
