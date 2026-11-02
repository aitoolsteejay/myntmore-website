import type { MetadataRoute } from "next";

// Paths no crawler should fetch.
// - /tools/dm-angle-generator/ (trailing slash): /tools/dm-angle-generator itself is a real page with
//   its own canonical tag, but next.config.js rewrites every sub-path under it to an external Lovable
//   app we don't control. If that app's own links generate further sub-paths, crawlers would wander an
//   open-ended set of URLs that appear to be on this domain. The trailing slash leaves the base page
//   crawlable.
// - The CMS admin and its API.
const DISALLOW = ["/tools/dm-angle-generator/", "/keystatic", "/api/keystatic"];

// AI search and assistant crawlers, named so it is explicit that each one is welcome. Being fetched by
// these is how the site gets cited in ChatGPT, Claude, Perplexity, Gemini, Copilot and others. A crawler
// that finds a group naming it ignores the "*" group, so this group repeats the same DISALLOW list.
const AI_CRAWLERS = [
  // OpenAI: training, ChatGPT search results, and pages a ChatGPT user asks it to open
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic: training, Claude search, and pages a Claude user asks it to open
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  // Perplexity: index and user-requested fetches
  "PerplexityBot",
  "Perplexity-User",
  // Google's control token for Gemini (Googlebot itself is covered by "*")
  "Google-Extended",
  // Apple Intelligence, Meta AI, Amazon (Alexa, Rufus), DuckDuckGo's AI answers, Mistral's Le Chat
  "Applebot-Extended",
  "meta-externalagent",
  "Amazonbot",
  "DuckAssistBot",
  "MistralAI-User",
  // Common Crawl: the open web archive many language models are trained on
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: DISALLOW },
    ],
    sitemap: "https://www.myntmore.com/sitemap.xml",
  };
}
