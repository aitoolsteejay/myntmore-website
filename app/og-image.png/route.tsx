import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

// Branded dynamic Open Graph social card (1200x630) for every page: /og-image.png?path=/the/page.
//
// Safe Zone Architecture:
// Messaging apps (Telegram, WhatsApp, Slack, iMessage) and LinkedIn mobile crop social cards
// to a square 1:1 thumbnail on the right side of link preview cards.
// To guarantee zero cutoff anywhere, all vital content (Logo, Category Pill, Headline,
// 3-Step Infographic, Proof Metrics, and Domain) is centered within a 580px safe zone
// (x=310 to x=890).
// In 1200x630 (landscape feed): Displays expansive ambient glow, rings, and breathing room.
// In 630x630 (square crop): Every element is 100% visible, centered, and crisp.

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

  try {
    const careersDir = path.join(process.cwd(), "content", "careers");
    if (fs.existsSync(careersDir)) {
      for (const f of fs.readdirSync(careersDir)) {
        if (f.endsWith(".json")) {
          const d = JSON.parse(fs.readFileSync(path.join(careersDir, f), "utf8"));
          if (d.slug) map[`/careers/${d.slug}`] = d.metaTitle || d.title;
        }
      }
    }
  } catch {}

  try {
    const postsDir = path.join(process.cwd(), "content", "posts");
    if (fs.existsSync(postsDir)) {
      for (const f of fs.readdirSync(postsDir)) {
        if (f.endsWith(".mdoc")) {
          const slug = f.replace(/\.mdoc$/, "");
          const content = fs.readFileSync(path.join(postsDir, f), "utf8");
          const mTitle = content.match(/metaTitle:\s*"([^"]+)"/)?.[1];
          const t = content.match(/title:\s*"([^"]+)"/)?.[1];
          if (mTitle || t) map[`/resources/blogs/${slug}`] = mTitle || t!;
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
  if (t.length > 85) t = t.slice(0, 82).replace(/\s+\S*$/, "").replace(/[\s,:;|-]+$/, "") + "...";
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
      steps: ["AI Research & ICP", "Cold Email & LinkedIn", "Qualified Meetings"],
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
      kickerText: `B2B LEAD GEN · ${cityName.toUpperCase()}`,
      defaultTitle: `B2B Outbound Lead Generation Agency in ${cityName}`,
      steps: [`${cityName} Market Intel`, "Target CXO Buyers", "High-Intent Meetings"],
      stats: [
        { val: cityName === "Mumbai" ? "BKC HQ" : "Top Hub", label: cityName },
        { val: "12K+", label: "Meetings" },
        { val: "$120M+", label: "Pipeline" },
      ],
    };
  }

  if (pagePath.startsWith("/services/")) {
    const slug = pagePath.replace("/services/", "");
    if (slug === "cold-email") {
      return {
        kickerText: "COLD EMAIL INFRASTRUCTURE",
        defaultTitle: "Primary Inbox Delivery Engineered to Book Meetings",
        steps: ["Secondary Domains", "Enriched ICP Lists", "Converting Copy"],
        stats: [
          { val: "100%", label: "Inbox Rate" },
          { val: "30-40%", label: "Open Rates" },
          { val: "12K+", label: "Meetings" },
        ],
      };
    }
    if (slug === "linkedin-outreach") {
      return {
        kickerText: "LINKEDIN OUTREACH & SELLING",
        defaultTitle: "Turn LinkedIn Into a Predictable B2B Meeting Pipeline",
        steps: ["Profile Authority", "Targeted Network", "1-on-1 Selling"],
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
        steps: ["Tier-1 Account Map", "Multi-Thread Touch", "Executive Pipeline"],
        stats: [
          { val: "$120M+", label: "Pipeline" },
          { val: "12K+", label: "Meetings" },
          { val: "Enterprise", label: "ICP Focus" },
        ],
      };
    }
    if (slug === "ai-lead-generation") {
      return {
        kickerText: "AI LEAD GENERATION & AGENTS",
        defaultTitle: "Autonomous AI Agents That Research & Book Qualified Demos",
        steps: ["AI Buying Signals", "Auto-Qualification", "Personalized Touch"],
        stats: [
          { val: "10x", label: "Outbound Scale" },
          { val: "12K+", label: "Meetings" },
          { val: "$120M+", label: "Pipeline" },
        ],
      };
    }
    if (slug === "personal-branding") {
      return {
        kickerText: "FOUNDER PERSONAL BRANDING",
        defaultTitle: "Build Executive Authority & Inbound Demand on LinkedIn",
        steps: ["Strategic Founder POV", "High-Reach Content", "DM Conversion"],
        stats: [
          { val: "100K+", label: "Followers" },
          { val: "12K+", label: "Meetings" },
          { val: "130+", label: "Founders" },
        ],
      };
    }
    if (slug === "sales-intelligence") {
      return {
        kickerText: "SALES INTELLIGENCE & DATA",
        defaultTitle: "Verified B2B Decision Maker Data & Real-Time Intent",
        steps: ["ICP & TAM Mapping", "Waterfall Verify", "Enriched Signals"],
        stats: [
          { val: "98%+", label: "Accuracy" },
          { val: "Zero", label: "Bounce Waste" },
          { val: "12K+", label: "Meetings" },
        ],
      };
    }
    if (slug === "gtm-strategy") {
      return {
        kickerText: "GTM STRATEGY & POSITIONING",
        defaultTitle: "Go-to-Market Outbound Playbooks That Accelerate Pipeline",
        steps: ["Positioning Matrix", "Channel Flow", "Predictable Scale"],
        stats: [
          { val: "$120M+", label: "Pipeline" },
          { val: "12K+", label: "Meetings" },
          { val: "130+", label: "Launches" },
        ],
      };
    }
    if (slug === "do-it-yourself") {
      return {
        kickerText: "DIY OUTBOUND FRAMEWORK",
        defaultTitle: "The Step-by-Step B2B Outbound System Built In-House",
        steps: ["Domain Setup", "Messaging Prompts", "Operating System"],
        stats: [
          { val: "100%", label: "In-House" },
          { val: "Zero", label: "Agency Lock-in" },
          { val: "12K+", label: "Blueprint" },
        ],
      };
    }
  }

  if (pagePath.startsWith("/case-studies")) {
    return {
      kickerText: "VERIFIED CASE STUDY",
      defaultTitle: null,
      steps: ["Outbound Bottleneck", "Multi-Channel AI", "Verified Revenue"],
      stats: [
        { val: "$120M+", label: "Pipeline" },
        { val: "12K+", label: "Meetings" },
        { val: "100%", label: "Verified Data" },
      ],
    };
  }

  if (pagePath.startsWith("/careers")) {
    return {
      kickerText: "WE ARE HIRING · MUMBAI BKC",
      defaultTitle: pagePath === "/careers" ? "Build the Future of B2B Outbound & AI Systems" : null,
      steps: ["High-Ownership Role", "AI Outbound Stack", "Rapid Growth"],
      stats: [
        { val: "BKC", label: "Mumbai HQ" },
        { val: "Top 1%", label: "B2B Talent" },
        { val: "Apply", label: "Direct" },
      ],
    };
  }

  if (pagePath.startsWith("/tools/") || pagePath === "/resources/tools") {
    return {
      kickerText: "FREE B2B GROWTH TOOL",
      defaultTitle: null,
      steps: ["Instant Analysis", "Industry Benchmark", "Actionable Plan"],
      stats: [
        { val: "100% Free", label: "No Signup" },
        { val: "Instant", label: "Results" },
        { val: "12K+", label: "Benchmarks" },
      ],
    };
  }

  if (pagePath.startsWith("/resources/guides") || pagePath.startsWith("/instagram-resources")) {
    return {
      kickerText: "B2B GROWTH PLAYBOOK",
      defaultTitle: null,
      steps: ["Tested Framework", "Step-by-Step", "Actionable Prompts"],
      stats: [
        { val: "Free", label: "Playbook" },
        { val: "100%", label: "Actionable" },
        { val: "12K+", label: "Meetings Data" },
      ],
    };
  }

  if (pagePath.startsWith("/resources/blogs")) {
    return {
      kickerText: "OUTBOUND STRATEGY & INSIGHTS",
      defaultTitle: null,
      steps: ["Market Research", "Tactical Playbook", "Growth Takeaway"],
      stats: [
        { val: "12K+", label: "Meetings" },
        { val: "$120M+", label: "Pipeline" },
        { val: "130+", label: "Companies" },
      ],
    };
  }

  if (pagePath === "/about-us") {
    return {
      kickerText: "ABOUT MYNTMORE",
      defaultTitle: "AI-Powered B2B Outbound Agency Founded by Tejas Jhaveri",
      steps: ["Founded in 2019", "AI + Human Strategy", "12K+ Verified Calls"],
      stats: [
        { val: "BKC HQ", label: "Mumbai" },
        { val: "12K+", label: "Meetings" },
        { val: "$120M+", label: "Pipeline" },
      ],
    };
  }

  if (pagePath === "/book-a-call" || pagePath === "/1-on-1-consultation") {
    return {
      kickerText: "COMPLIMENTARY GTM AUDIT",
      defaultTitle: "Book a 30-Minute B2B Outbound Pipeline Audit",
      steps: ["Outreach & ICP Review", "Identify Bottlenecks", "90-Day Roadmap"],
      stats: [
        { val: "30 Min", label: "Free Diagnostic" },
        { val: "Zero", label: "Sales Pitch" },
        { val: "12K+", label: "Meetings Data" },
      ],
    };
  }

  return {
    kickerText: "B2B GROWTH & OUTBOUND SYSTEMS",
    defaultTitle: null,
    steps: ["AI Research & ICP", "Multi-Channel Outbound", "Qualified Meetings"],
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
  const fontSize = title.length > 48 || words.length > 8 ? "38px" : words.length > 5 ? "42px" : "46px";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: CREAM,
          backgroundImage:
            "radial-gradient(circle at 50% 20%, rgba(245, 183, 49, 0.22) 0%, transparent 60%), radial-gradient(circle at 10% 90%, rgba(217, 119, 6, 0.12) 0%, transparent 40%), radial-gradient(circle at 90% 90%, rgba(245, 183, 49, 0.12) 0%, transparent 40%)",
          padding: "44px 0",
          fontFamily: "Inter",
          position: "relative",
        }}
      >
        {/* Ambient background ring centered in safe zone */}
        <div
          style={{
            position: "absolute",
            width: "520px",
            height: "520px",
            borderRadius: "9999px",
            border: "1.5px solid rgba(245, 183, 49, 0.25)",
            top: "-160px",
            left: "50%",
            transform: "translateX(-260px)",
          }}
        />

        {/* Top Header: Inside 580px safe zone */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
            width: "580px",
          }}
        >
          <img src={a.logo} width={125} height={38} style={{ objectFit: "contain" }} />
          <div
            style={{
              width: "1px",
              height: "22px",
              backgroundColor: LINE,
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              backgroundColor: PILL_BG,
              border: "1.5px solid rgba(245, 183, 49, 0.55)",
              borderRadius: "9999px",
              padding: "6px 16px",
              color: PILL_TEXT,
              fontSize: "13px",
              fontWeight: 800,
              letterSpacing: "0.12em",
            }}
          >
            <div
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "9999px",
                backgroundColor: GOLD,
              }}
            />
            <span>{config.kickerText.toUpperCase()}</span>
          </div>
        </div>

        {/* Middle Content: Title + 3-Step Infographic (Inside 580px safe zone) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            width: "580px",
            margin: "auto 0",
          }}
        >
          {/* Title */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              width: "580px",
              fontSize,
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: INK,
              marginBottom: "22px",
            }}
          >
            {words.map((word, i) => (
              <span
                key={i}
                style={{
                  color: i >= hi ? AMBER : INK,
                  marginRight: "9px",
                }}
              >
                {word}
              </span>
            ))}
          </div>

          {/* 3-Step Infographic (Guaranteed to fit 580px without truncation) */}
          {config.steps && config.steps.length > 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "580px",
              }}
            >
              {config.steps.flatMap((step, i) => {
                const stepNode = (
                  <div
                    key={`step-${i}`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: WHITE,
                      border: `1.5px solid ${LINE}`,
                      borderRadius: "12px",
                      padding: "9px 12px",
                      boxShadow: "0 4px 12px rgba(10, 6, 24, 0.04)",
                      flex: "1",
                      minWidth: "148px",
                      maxWidth: "172px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        marginBottom: "4px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 900,
                          color: AMBER,
                          backgroundColor: PILL_BG,
                          borderRadius: "5px",
                          padding: "2px 6px",
                        }}
                      >
                        {`0${i + 1}`}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 800,
                        color: INK,
                        lineHeight: 1.2,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {step}
                    </span>
                  </div>
                );

                if (i < config.steps.length - 1) {
                  const arrow = (
                    <div
                      key={`arrow-${i}`}
                      style={{
                        display: "flex",
                        color: AMBER,
                        fontSize: "16px",
                        fontWeight: 900,
                      }}
                    >
                      {"›"}
                    </div>
                  );
                  return [stepNode, arrow];
                }
                return [stepNode];
              })}
            </div>
          )}
        </div>

        {/* Bottom Bar: Proof Metrics + Domain (Inside 580px safe zone) */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "580px",
            paddingTop: "16px",
            borderTop: `1.5px solid ${LINE}`,
          }}
        >
          {/* Left: 3 Stats */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
            }}
          >
            {config.stats.map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "5px",
                }}
              >
                <span
                  style={{
                    fontSize: "17px",
                    fontWeight: 900,
                    color: AMBER,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.val}
                </span>
                <span
                  style={{
                    fontSize: "11px",
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
              gap: "6px",
              fontSize: "15px",
              fontWeight: 800,
              color: INK,
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
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
