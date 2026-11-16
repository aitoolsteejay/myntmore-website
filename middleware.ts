import { NextRequest, NextResponse } from "next/server";
import { prefersMarkdown } from "./lib/markdown/negotiate";
import { renderPageMarkdown } from "./lib/markdown/render";

const canonicalOrigin = "https://www.myntmore.com";
const pilotPaths = new Set([
  "/",
  "/about-us",
  "/services",
  "/services/gtm-strategy",
  "/services/sales-intelligence",
  "/case-studies/agencies-it-usa-software-development",
  "/resources/blogs/account-targeting-strategy",
  "/resources/blogs/b2b-lead-generation-for-it-services",
]);

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (process.env.MARKDOWN_PILOT !== "1" || !pilotPaths.has(path) || !["GET", "HEAD"].includes(request.method)) {
    return NextResponse.next();
  }

  // Next 14 can replace Vary on its HTML response. Keep pilot documents out
  // of CDN caches until the production routing and header behavior is verified.
  const html = () => NextResponse.next({
    headers: { Vary: "Accept", "CDN-Cache-Control": "no-store", "Vercel-CDN-Cache-Control": "no-store" },
  });
  if (
    request.headers.has("rsc") ||
    request.headers.has("next-router-prefetch") ||
    request.headers.has("next-router-state-tree") ||
    request.headers.get("purpose") === "prefetch" ||
    request.nextUrl.searchParams.has("_rsc") ||
    request.cookies.has("__prerender_bypass")
  ) {
    return NextResponse.next();
  }

  if (!prefersMarkdown(request.headers.get("accept"))) return html();

  const start = Date.now();
  const canonical = new URL(path, canonicalOrigin);
  const deployment = process.env.VERCEL_URL;
  const localPort = process.env.MARKDOWN_LOCAL_PORT;
  // Never use the request Host or forward client headers to the source renderer.
  const sourceOrigin = deployment && /^[a-z0-9-]+\.vercel\.app$/i.test(deployment)
    ? `https://${deployment}`
    : !process.env.VERCEL && localPort && /^\d{1,5}$/.test(localPort)
      ? `http://127.0.0.1:${localPort}`
      : null;

  let markdown: string | null = null;
  let sourceStatus: number | null = null;
  let sourceCache: string | null = null;

  if (sourceOrigin) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    try {
      const headers = new Headers({ Accept: "text/html" });
      const bypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
      if (sourceOrigin.startsWith("https://") && bypass) {
        headers.set("x-vercel-protection-bypass", bypass);
      }
      const source = await fetch(new URL(path, sourceOrigin), {
        headers,
        redirect: "manual",
        signal: controller.signal,
      });
      sourceStatus = source.status;
      sourceCache = source.headers.get("x-vercel-cache");
      if (source.ok && source.headers.get("content-type")?.startsWith("text/html")) {
        markdown = renderPageMarkdown(await source.text(), canonical, source.headers.get("x-robots-tag"));
      }
    } catch {
      // Let Next.js handle the original route if the source cannot be read.
    } finally {
      clearTimeout(timeout);
    }
  }

  const bytes = markdown ? new TextEncoder().encode(markdown).byteLength : 0;
  const agent = request.headers.get("user-agent") ?? "";
  const clientCategory = /GPTBot|OAI-SearchBot|ChatGPT-User|ClaudeBot|Claude-SearchBot|Claude-User|PerplexityBot/i.test(agent)
    ? "self-identified-ai"
    : /bot|crawl|spider|headless/i.test(agent) ? "automated-unverified" : "unclassified";
  console.info(JSON.stringify({
    event: "markdown_pilot",
    path,
    timestamp: new Date().toISOString(),
    format: markdown ? "markdown" : "html-fallback",
    status: markdown ? 200 : null,
    accept: "markdown-preferred",
    clientCategory,
    bytes,
    sourceStatus,
    sourceCache,
    durationMs: Date.now() - start,
  }));

  if (!markdown) return html();
  return new NextResponse(request.method === "HEAD" ? null : markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "private, no-store",
      "CDN-Cache-Control": "no-store",
      "Vercel-CDN-Cache-Control": "no-store",
      Vary: "Accept, RSC, Next-Router-State-Tree, Next-Router-Prefetch, Purpose, Cookie",
      Link: `<${path === "/" ? canonicalOrigin : canonical.href}>; rel="canonical"`,
      "X-Content-Type-Options": "nosniff",
    },
  });
}

// Match before Next.js removes Flight headers and the _rsc query from the
// middleware request. The exact path allowlist also excludes normalized assets.
export const config = {
  matcher: {
    source: "/(about-us|services(?:/gtm-strategy|/sales-intelligence)?|case-studies/agencies-it-usa-software-development|resources/blogs/(?:account-targeting-strategy|b2b-lead-generation-for-it-services))?",
    missing: [
      { type: "header", key: "rsc" },
      { type: "header", key: "next-router-state-tree" },
      { type: "header", key: "next-router-prefetch" },
      { type: "header", key: "x-nextjs-data" },
      { type: "query", key: "_rsc" },
    ],
  },
};
