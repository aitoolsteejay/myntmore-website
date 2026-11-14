import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

// Branded dynamic Open Graph social card (1200x630) for every page: /og-image.png?path=/the/page.
//
// Layout rule: Slack, WhatsApp, Telegram, iMessage and LinkedIn mobile crop the card to a
// square or right-aligned preview box. All critical elements (logo, section kicker pill,
// page title, 3-step system infographic, proof stats and domain) are balanced in the
// central safe zone so nothing is cut off.
//
// Titles and metadata are resolved synchronously from local content files and page-seo
// mapping with network fallback, guaranteeing instant, reliable rendering on Vercel.

export const runtime = "nodejs";

const CREAM = "#F8F6F2";
const INK = "#0A0A0A";
const GOLD = "#F5B731";
const AMBER = "#D97706";
const PILL_BG = "#FEF9EC";
const PILL_TEXT = "#A14A08";
const MUTED = "#71675E";
const LINE = "#E8E2D9";
const WHITE = "#FFFFFF";

type Assets = { logo: string; black: Buffer; extra: Buffer; bold: Buffer };
let cachedAssets: Assets | null = null;

function assets(): Assets {
  if (cachedAssets) return cachedAssets;
  const logo = fs.readFileSync(path.join(process.cwd(), "public", "logo.png"));
  cachedAssets = {
    logo: `data:image/png;base64,${logo.toString("base64")}`,
    black: fs.readFileSync(path.join(process.cwd(), "lib", "og-fonts", "Inter-900.woff")),
    extra: fs.readFileSync(path.join(process.cwd(), "lib", "og-fonts", "Inter-800.woff")),
    bold: fs.readFileSync(path.join(process.cwd(), "lib", "og-fonts", "Inter-700.woff")),
  };
  return cachedAssets;
}

let cachedTitleMap: Record<string, string> | null = null;

function getTitleMap(): Record<string, string> {
  if (cachedTitleMap) return cachedTitleMap;
  const map: Record<string, string> = {};

  try {
    const seoPath = path.join(process.cwd(), "lib", "page-seo.generated.json");
    if (fs.existsSync(seoPath)) {
      const seo = JSON.parse(fs.readFileSync(seoPath, "utf8"));
      for (const [p, d] of Object.entries(seo as Record<string, { title?: string }>)) {
        if (d?.title) map[p] = d.title;
      }
    }
  } catch {}

  try {
    const cityDir = path.join(process.cwd(), "content", "city-pages");
    if (fs.existsSync(cityDir)) {
      for (const f of fs.readdirSync(cityDir)) {
        if (f.endsWith(".json")) {
          const d = JSON.parse(fs.readFileSync(path.join(cityDir, f), "utf8"));
          if (d.slug) map[`/b2b-lead-generation-${d.slug}`] = d.metaTitle || d.ogTitle;
        }
      }
    }
  } catch {}

  try {
    const libPath = path.join(process.cwd(), "lib", "case-study-library.json");
    if (fs.existsSync(libPath)) {
      const lib = JSON.parse(fs.readFileSync(libPath, "utf8"));
      for (const c of lib.cases || []) {
        if (c.slug && c.title) map[`/case-studies/${c.slug}`] = c.title;
      }
    }
  } catch {}

  try {
    const serviceDir = path.join(process.cwd(), "content", "service-pages");
    if (fs.existsSync(serviceDir)) {
      for (const f of fs.readdirSync(serviceDir)) {
        if (f.endsWith(".json")) {
          const d = JSON.parse(fs.readFileSync(path.join(serviceDir, f), "utf8"));
          if (d.slug) map[`/services/${d.slug}`] = d.metaTitle || d.ogTitle;
        }
      }
    }
  } catch {}

  try {
    const glossaryDir = path.join(process.cwd(), "content", "glossary");
    if (fs.existsSync(glossaryDir)) {
      for (const f of fs.readdirSync(glossaryDir)) {
        if (f.endsWith(".json")) {
          const d = JSON.parse(fs.readFileSync(path.join(glossaryDir, f), "utf8"));
          if (d.slug) map[`/resources/glossary/${d.slug}`] = d.term ? `${d.term} Definition` : d.metaTitle;
        }
      }
    }
  } catch {}

  cachedTitleMap = map;
  return cachedTitleMap;
}

const SAFE_PATH = /^\/[A-Za-z0-9\-_./]*$/;

function decodeEntities(s: string) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

async function fetchPageTitle(origin: string, pagePath: string): Promise<string | null> {
  if (!SAFE_PATH.test(pagePath) || pagePath.includes("//") || pagePath.includes("..") || pagePath.length > 200) return null;
  try {
    const res = await fetch(origin + pagePath, {
      headers: { "user-agent": "MyntmoreOgImage/1.0" },
      signal: AbortSignal.timeout(4000),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const html = await res.text();
    const og = html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/i)?.[1];
    const t = og ?? html.match(/<title>([^<]*)<\/title>/i)?.[1];
    return t ? decodeEntities(t).trim() : null;
  } catch {
    return null;
  }
}

function cleanTitle(raw: string): string {
  const parts = raw
    .replace(/\s+/g, " ")
    .split(/\s+[|\u2013\u2014]\s+/)
    .map((x) => x.trim())
    .filter((x) => x && !/^myntmore(\s+\w+)?$/i.test(x));
  let t = parts.length > 1 && parts[0].length < 22 ? `${parts[0]} - ${parts[1]}` : parts[0] ?? "";
  if (t.length > 92) t = t.slice(0, 89).replace(/\s+\S*$/, "").replace(/[\s,:;|-]+$/, "") + "...";
  return t || "Myntmore";
}

function highlightFrom(words: string[]): number {
  if (words.length >= 6) return words.length - 2;
  if (words.length >= 3) return words.length - 1;
  return words.length;
}

type StatItem = { val: string; label: string };
type CardMetadata = {
  kickerText: string;
  defaultTitle: string | null;
  steps: string[];
  stats: StatItem[];
};

function getCardConfig(pagePath: string): CardMetadata {
  if (pagePath === "/" || !pagePath) {
    return {
      kickerText: "AI-Powered B2B Outbound Engine",
      defaultTitle: "More Conversations. More Pipeline. Zero Guesswork.",
      steps: ["AI ICP & Deep Research", "Cold Email & LinkedIn", "Qualified Meetings Booked"],
      stats: [
        { val: "12K+", label: "Meetings" },
        { val: "$120M+", label: "Pipeline" },
        { val: "130+", label: "Clients" },
      ],
    };
  }

  if (pagePath.startsWith("/b2b-lead-generation-")) {
    const citySlug = pagePath.replace("/b2b-lead-generation-", "");
    const cityName = citySlug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return {
      kickerText: `B2B LEAD GENERATION · ${cityName.toUpperCase()}`,
      defaultTitle: `B2B Outbound Lead Generation Agency in ${cityName}`,
      steps: [`${cityName} Market Intelligence`, "Target Decision Makers", "High-Intent B2B Meetings"],
      stats: [
        { val: "12K+", label: "Meetings" },
        { val: "$120M+", label: "Pipeline" },
        { val: cityName === "Mumbai" ? "BKC HQ" : "Top Hub", label: cityName },
      ],
    };
  }

  if (pagePath.startsWith("/services/")) {
    const slug = pagePath.replace("/services/", "");
    if (slug === "cold-email") {
      return {
        kickerText: "COLD EMAIL INFRASTRUCTURE",
        defaultTitle: "Cold Email Engine Built for Primary Inbox Delivery",
        steps: ["Secondary Domain Setup", "Lead List Enrichment", "High-Converting Copy"],
        stats: [
          { val: "100%", label: "Inbox Delivery" },
          { val: "30-40%", label: "Open Rates" },
          { val: "12K+", label: "Meetings" },
        ],
      };
    }
    if (slug === "linkedin-outreach") {
      return {
        kickerText: "LINKEDIN OUTREACH & SOCIAL SELLING",
        defaultTitle: "Turn LinkedIn Into a Predictable B2B Meeting Pipeline",
        steps: ["Founder Profile Authority", "Targeted Connections", "1-on-1 Inbox Selling"],
        stats: [
          { val: "60%+", label: "Acceptance" },
          { val: "12K+", label: "Meetings" },
          { val: "130+", label: "Companies" },
        ],
      };
    }
    if (slug === "account-based-marketing") {
      return {
        kickerText: "ACCOUNT-BASED MARKETING (ABM)",
        defaultTitle: "Precision ABM Outbound for High-Value Enterprise Accounts",
        steps: ["Tier-1 Account Mapping", "Multi-Stakeholder Outreach", "Executive Pipeline"],
        stats: [
          { val: "12K+", label: "Meetings" },
          { val: "$120M+", label: "Pipeline" },
          { val: "130+", label: "Enterprise ICPs" },
        ],
      };
    }
    if (slug === "ai-lead-generation") {
      return {
        kickerText: "AI LEAD GENERATION & AGENTS",
        defaultTitle: "Autonomous AI Agents That Research & Book Qualified B2B Demos",
        steps: ["AI Buying Signals", "Automated Qualification", "Hyper-Personalized Touchpoints"],
        stats: [
          { val: "12K+", label: "Meetings" },
          { val: "$120M+", label: "Pipeline" },
          { val: "10x", label: "Outbound Scale" },
        ],
      };
    }
    if (slug === "personal-branding") {
      return {
        kickerText: "FOUNDER PERSONAL BRANDING",
        defaultTitle: "Build Executive Authority and Inbound Demand on LinkedIn",
        steps: ["Strategic POV & Angles", "High-Reach Content Rhythm", "DM Conversation Conversion"],
        stats: [
          { val: "100K+", label: "Followers Built" },
          { val: "12K+", label: "Meetings" },
          { val: "130+", label: "Founders" },
        ],
      };
    }
    if (slug === "sales-intelligence") {
      return {
        kickerText: "SALES INTELLIGENCE & ICP MAPPING",
        defaultTitle: "Verified B2B Decision Maker Data & Intent Signals",
        steps: ["TAM & ICP Definition", "Waterfall Email Verification", "Enriched Buying Signals"],
        stats: [
          { val: "98%+", label: "Data Accuracy" },
          { val: "12K+", label: "Meetings" },
          { val: "Zero", label: "Bounce Waste" },
        ],
      };
    }
    if (slug === "gtm-strategy") {
      return {
        kickerText: "GTM STRATEGY & POSITIONING",
        defaultTitle: "Go-to-Market Outbound Playbooks That Accelerate Pipeline",
        steps: ["Offer & Positioning Matrix", "Channel Architecture", "Predictable Scaling Model"],
        stats: [
          { val: "$120M+", label: "Pipeline" },
          { val: "12K+", label: "Meetings" },
          { val: "130+", label: "GTM Launches" },
        ],
      };
    }
    if (slug === "do-it-yourself") {
      return {
        kickerText: "DIY OUTBOUND FRAMEWORK",
        defaultTitle: "The Step-by-Step B2B Outbound System Built In-House",
        steps: ["Domain Infrastructure Setup", "Copy & Messaging Prompts", "Outbound Operating System"],
        stats: [
          { val: "100%", label: "In-House System" },
          { val: "12K+", label: "Meetings Blueprint" },
          { val: "Zero", label: "Agency Lock-in" },
        ],
      };
    }
  }

  if (pagePath.startsWith("/case-studies")) {
    return {
      kickerText: "VERIFIED CASE STUDY",
      defaultTitle: null,
      steps: ["Outbound Bottleneck Audit", "Multi-Channel AI Engine", "Verified Revenue & Pipeline"],
      stats: [
        { val: "12K+", label: "Meetings Booked" },
        { val: "$120M+", label: "Pipeline Generated" },
        { val: "100%", label: "Verified Data" },
      ],
    };
  }

  if (pagePath.startsWith("/resources/guides") || pagePath.startsWith("/instagram-resources")) {
    return {
      kickerText: "B2B GROWTH PLAYBOOK",
      defaultTitle: null,
      steps: ["Battle-Tested Framework", "Step-by-Step Playbook", "Free Prompts & Templates"],
      stats: [
        { val: "Free", label: "Playbook" },
        { val: "12K+", label: "Meetings Data" },
        { val: "100%", label: "Actionable" },
      ],
    };
  }

  if (pagePath.startsWith("/tools/") || pagePath === "/resources/tools") {
    return {
      kickerText: "FREE B2B GROWTH TOOL",
      defaultTitle: null,
      steps: ["Instant AI-Powered Analysis", "Benchmark Comparison", "Actionable Action Plan"],
      stats: [
        { val: "100% Free", label: "No Signup" },
        { val: "Instant", label: "Results" },
        { val: "12K+", label: "Benchmarks" },
      ],
    };
  }

  if (pagePath.startsWith("/resources/blogs")) {
    return {
      kickerText: "OUTBOUND STRATEGY & INSIGHTS",
      defaultTitle: null,
      steps: ["Market Analysis & Research", "Tactical Outbound Framework", "Key Growth Takeaways"],
      stats: [
        { val: "12K+", label: "Meetings" },
        { val: "$120M+", label: "Pipeline" },
        { val: "130+", label: "Companies" },
      ],
    };
  }

  if (pagePath.startsWith("/careers")) {
    return {
      kickerText: "WE'RE HIRING · MUMBAI BKC & REMOTE",
      defaultTitle: null,
      steps: ["High-Ownership Roles", "AI & Outbound Systems", "Accelerated Career Growth"],
      stats: [
        { val: "BKC", label: "Mumbai HQ" },
        { val: "Top 1%", label: "B2B Talent" },
        { val: "130+", label: "Companies" },
      ],
    };
  }

  if (pagePath === "/about-us") {
    return {
      kickerText: "ABOUT MYNTMORE",
      defaultTitle: "AI-Powered B2B Outbound Agency Founded by Tejas Jhaveri",
      steps: ["Founded in 2019 in Mumbai", "AI Agents + Human Strategy", "12K+ Verified Meetings Booked"],
      stats: [
        { val: "12K+", label: "Meetings" },
        { val: "$120M+", label: "Pipeline" },
        { val: "130+", label: "Clients" },
      ],
    };
  }

  if (pagePath === "/book-a-call" || pagePath === "/1-on-1-consultation") {
    return {
      kickerText: "COMPLIMENTARY GTM AUDIT",
      defaultTitle: "Book a 30-Minute B2B Outbound Pipeline Audit",
      steps: ["Outreach & ICP Review", "Identify Pipeline Bottlenecks", "Actionable 90-Day Strategy"],
      stats: [
        { val: "30 Min", label: "Free Audit" },
        { val: "Zero", label: "Pressure" },
        { val: "12K+", label: "Meetings Experience" },
      ],
    };
  }

  return {
    kickerText: "B2B GROWTH & OUTBOUND SYSTEMS",
    defaultTitle: null,
    steps: ["AI ICP & Deep Research", "Multi-Channel Outbound", "Qualified Meetings Booked"],
    stats: [
      { val: "12K+", label: "Meetings" },
      { val: "$120M+", label: "Pipeline" },
      { val: "130+", label: "Clients" },
    ],
  };
}

export async function GET(req: Request) {
  const { searchParams, origin } = new URL(req.url);
  const pagePath = searchParams.get("path") || "/";
  const explicitTitle = searchParams.get("title");
  const a = assets();
  const config = getCardConfig(pagePath);

  let rawTitle = explicitTitle || config.defaultTitle;

  if (!rawTitle) {
    const titleMap = getTitleMap();
    if (titleMap[pagePath]) {
      rawTitle = titleMap[pagePath];
    } else {
      const fetched = await fetchPageTitle(origin, pagePath);
      if (fetched) {
        rawTitle = fetched;
      } else {
        const parts = pagePath.split("/").filter(Boolean);
        const last = parts[parts.length - 1] || "Myntmore";
        rawTitle = last
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
      }
    }
  }

  const title = cleanTitle(rawTitle);
  const words = title ? title.split(" ") : ["Myntmore", "Outbound", "Systems"];
  const hi = highlightFrom(words);
  const fontSize = words.length > 8 ? "46px" : "54px";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: CREAM,
          backgroundImage:
            "radial-gradient(circle at 92% 10%, rgba(245, 183, 49, 0.28) 0%, transparent 45%), radial-gradient(circle at 8% 90%, rgba(217, 119, 6, 0.16) 0%, transparent 45%)",
          padding: "48px 64px",
          fontFamily: "Inter",
          position: "relative",
        }}
      >
        {/* Ambient background rings */}
        <div
          style={{
            position: "absolute",
            width: "420px",
            height: "420px",
            borderRadius: "9999px",
            border: "1.5px solid rgba(245, 183, 49, 0.35)",
            top: "-160px",
            right: "-120px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "380px",
            height: "380px",
            borderRadius: "9999px",
            border: "1.5px solid rgba(217, 119, 6, 0.22)",
            bottom: "-150px",
            left: "-100px",
          }}
        />

        {/* Top Header: Logo + Category Pill */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <img src={a.logo} width={140} height={48} style={{ objectFit: "contain" }} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: PILL_BG,
              border: "1.5px solid rgba(245, 183, 49, 0.55)",
              borderRadius: "9999px",
              padding: "8px 20px",
              color: PILL_TEXT,
              fontSize: "15px",
              fontWeight: 800,
              letterSpacing: "0.14em",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "9999px",
                backgroundColor: GOLD,
              }}
            />
            <span>{config.kickerText.toUpperCase()}</span>
          </div>
        </div>

        {/* Middle Content: Title + 3-Step Infographic */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            margin: "auto 0",
          }}
        >
          {/* Title */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              maxWidth: "940px",
              fontSize,
              fontWeight: 900,
              lineHeight: 1.14,
              letterSpacing: "-0.03em",
              color: INK,
              marginBottom: "26px",
            }}
          >
            {words.map((word, i) => (
              <span
                key={i}
                style={{
                  color: i >= hi ? AMBER : INK,
                  marginRight: "12px",
                }}
              >
                {word}
              </span>
            ))}
          </div>

          {/* Infographic: 3-Step Outbound Architecture */}
          {config.steps && config.steps.length > 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                width: "100%",
                maxWidth: "880px",
              }}
            >
              {config.steps.flatMap((step, i) => {
                const stepCard = (
                  <div
                    key={`step-${i}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      backgroundColor: WHITE,
                      border: `1.5px solid ${LINE}`,
                      borderRadius: "14px",
                      padding: "12px 18px",
                      boxShadow: "0 4px 14px rgba(10, 6, 24, 0.04)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        backgroundColor: PILL_BG,
                        color: AMBER,
                        fontSize: "14px",
                        fontWeight: 900,
                      }}
                    >
                      {`0${i + 1}`}
                    </div>
                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: 800,
                        color: INK,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {step}
                    </span>
                  </div>
                );

                if (i < config.steps.length - 1) {
                  const arrow = (
                    <svg
                      key={`arrow-${i}`}
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={AMBER}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  );
                  return [stepCard, arrow];
                }
                return [stepCard];
              })}
            </div>
          )}
        </div>

        {/* Bottom Bar: Proof Metrics + Domain */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingTop: "20px",
            borderTop: `1.5px solid ${LINE}`,
          }}
        >
          {/* Left: 3 Stats */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
            }}
          >
            {config.stats.map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "6px",
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: 900,
                    color: AMBER,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.val}
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 800,
                    color: MUTED,
                    letterSpacing: "0.06em",
                  }}
                >
                  {s.label.toUpperCase()}
                </span>
              </div>
            ))}
          </div>

          {/* Right: Domain with gold dot */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "18px",
              fontWeight: 800,
              color: INK,
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "9999px",
                backgroundColor: GOLD,
              }}
            />
            <span>myntmore.com</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Inter", data: a.black, weight: 900, style: "normal" },
        { name: "Inter", data: a.extra, weight: 800, style: "normal" },
        { name: "Inter", data: a.bold, weight: 700, style: "normal" },
      ],
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    }
  );
}
