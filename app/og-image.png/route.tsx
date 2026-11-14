import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

// The social card (1200x630) for every page: /og-image.png?path=/the/page.
//
// Layout rule: Slack, WhatsApp, iMessage and LinkedIn mobile crop the card to a square from the
// centre, so everything a reader must see (logo, section label, the page's title, the domain)
// lives in the middle 620px. The proof points sit either side of it and only show on the wide
// cards (LinkedIn, X, Facebook). Colours and type are the site's: cream ground with soft gold
// glows, Inter in black, gold and amber accents, the pill label from the hero.
//
// The title comes from the page itself (its og:title), fetched from the same deployment, so a
// card can only ever say what a real page says. If that fails the brand tagline card is drawn.

export const runtime = "nodejs";

const CREAM = "#F8F6F2";
const INK = "#0A0A0A";
const GOLD = "#F5B731";
const AMBER = "#D97706";
const PILL_BG = "#FEF9EC";
const PILL_TEXT = "#A14A08";
const MUTED = "#71675E";
const LINE = "#E8E2D9";

type Assets = { logo: string; black: Buffer; extra: Buffer; bold: Buffer };
let cached: Assets | null = null;

// Literal path segments so the file tracer bundles these with the route.
function assets(): Assets {
  if (cached) return cached;
  const logo = fs.readFileSync(path.join(process.cwd(), "public", "logo.png"));
  cached = {
    logo: `data:image/png;base64,${logo.toString("base64")}`,
    black: fs.readFileSync(path.join(process.cwd(), "lib", "og-fonts", "Inter-900.woff")),
    extra: fs.readFileSync(path.join(process.cwd(), "lib", "og-fonts", "Inter-800.woff")),
    bold: fs.readFileSync(path.join(process.cwd(), "lib", "og-fonts", "Inter-700.woff")),
  };
  return cached;
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

async function pageTitle(origin: string, pagePath: string): Promise<string | null> {
  if (!SAFE_PATH.test(pagePath) || pagePath.includes("//") || pagePath.includes("..") || pagePath.length > 200) return null;
  try {
    const res = await fetch(origin + pagePath, {
      headers: { "user-agent": "MyntmoreOgImage/1.0" },
      signal: AbortSignal.timeout(5000),
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

function cleanTitle(raw: string) {
  // "Page title | Myntmore", "... | Myntmore Glossary", "A | B | Myntmore": drop the brand segments,
  // then keep the first segment alone when it is long enough to stand on its own.
  const parts = raw
    .replace(/\s+/g, " ")
    .split(/\s+[|\u2013\u2014]\s+/)
    .map((x) => x.trim())
    .filter((x) => x && !/^myntmore(\s+\w+)?$/i.test(x));
  let t = parts.length > 1 && parts[0].length < 22 ? `${parts[0]} \u2013 ${parts[1]}` : parts[0] ?? "";
  if (t.length > 96) t = t.slice(0, 93).replace(/\s+\S*$/, "").replace(/[\s,:;|-]+$/, "") + "\u2026";
  return t || "Myntmore";
}

function kicker(p: string) {
  if (/^\/services\/.+/.test(p)) return "SERVICE";
  if (p === "/services") return "SERVICES";
  if (/^\/case-studies\/.+/.test(p)) return "CASE STUDY";
  if (p === "/case-studies") return "CASE STUDIES";
  if (/^\/resources\/blogs\/.+/.test(p) || p === "/resources/blogs") return "BLOG";
  if (p.startsWith("/resources/glossary")) return "GLOSSARY";
  if (p.startsWith("/resources/guides") || p.startsWith("/instagram-resources")) return "GUIDE";
  if (p === "/resources/tools" || p.startsWith("/tools/")) return "FREE TOOL";
  if (p === "/resources") return "RESOURCES";
  if (/^\/careers\/.+/.test(p)) return "WE’RE HIRING";
  if (p === "/careers") return "CAREERS";
  if (/^\/b2b-lead-generation-/.test(p)) return "B2B LEAD GENERATION";
  if (p.startsWith("/lp/")) return "OUTBOUND SYSTEMS";
  if (p.startsWith("/research")) return "ACCOUNT RESEARCH";
  if (p.startsWith("/events")) return "EVENTS";
  return "B2B GROWTH & OUTBOUND SYSTEMS";
}

function titleSize(len: number) {
  if (len <= 22) return 76;
  if (len <= 40) return 64;
  if (len <= 62) return 54;
  if (len <= 80) return 47;
  return 42;
}

// Highlight the last words in amber, the way the site's hero highlights its key phrase.
function highlightFrom(words: string[]) {
  if (words.length >= 5) return words.length - 2;
  if (words.length >= 3) return words.length - 1;
  return words.length;
}

export async function GET(req: Request) {
  const { searchParams, origin } = new URL(req.url);
  const pagePath = searchParams.get("path") || "/";
  const a = assets();

  const isHome = pagePath === "/";
  const raw = isHome ? null : await pageTitle(origin, pagePath);
  const tagline = ["More conversations.", "More pipeline.", "Less guesswork."];
  const title = raw ? cleanTitle(raw) : null;
  const label = raw ? kicker(pagePath) : "B2B GROWTH & OUTBOUND SYSTEMS";

  const words = title ? title.split(" ") : [];
  const hi = highlightFrom(words);
  const size = title ? titleSize(title.length) : 56;

  const text = {
    display: "flex",
    fontFamily: "Inter",
    fontWeight: 900,
    color: INK,
    letterSpacing: "-0.03em",
    lineHeight: 1.08,
    textAlign: "center" as const,
  };

  const ring = (style: Record<string, string | number>) => (
    <div
      style={{
        position: "absolute",
        display: "flex",
        borderRadius: 9999,
        border: "2px solid rgba(245, 183, 49, 0.42)",
        ...style,
      }}
    />
  );

  const stat = (value: string, caption: string, side: "left" | "right") => (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        [side]: 64,
        width: 190,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: side === "left" ? "flex-start" : "flex-end",
        fontFamily: "Inter",
      }}
    >
      <div style={{ display: "flex", fontSize: 44, fontWeight: 900, color: AMBER, letterSpacing: "-0.03em", lineHeight: 1 }}>{value}</div>
      <div
        style={{
          display: "flex",
          marginTop: 8,
          fontSize: 14,
          fontWeight: 800,
          color: MUTED,
          letterSpacing: "0.14em",
          textAlign: side === "left" ? "left" : "right",
        }}
      >
        {caption}
      </div>
    </div>
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          backgroundColor: CREAM,
          backgroundImage:
            "radial-gradient(circle at 90% 8%, rgba(245, 183, 49, 0.30) 0%, rgba(245, 183, 49, 0) 42%), radial-gradient(circle at 8% 92%, rgba(217, 119, 6, 0.17) 0%, rgba(217, 119, 6, 0) 42%)",
          fontFamily: "Inter",
        }}
      >
        {ring({ width: 460, height: 460, left: -170, bottom: -200 })}
        {ring({ width: 300, height: 300, left: -90, bottom: -120 })}
        {ring({ width: 420, height: 420, right: -150, top: -190 })}
        {ring({ width: 260, height: 260, right: -70, top: -110 })}

        {stat("12K+", "MEETINGS BOOKED", "left")}
        {stat("$120M+", "PIPELINE GENERATED", "right")}

        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 290,
            width: 620,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 6,
          }}
        >
          <img src={a.logo} width={124} height={80} style={{ objectFit: "contain" }} />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 18,
              backgroundColor: PILL_BG,
              border: "1.5px solid rgba(245, 183, 49, 0.55)",
              borderRadius: 9999,
              padding: "9px 22px",
              color: PILL_TEXT,
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: "0.16em",
            }}
          >
            <div style={{ display: "flex", width: 8, height: 8, borderRadius: 9999, backgroundColor: GOLD, marginRight: 11 }} />
            {label}
          </div>

          {title ? (
            <div
              style={{
                ...text,
                marginTop: 26,
                fontSize: size,
                flexWrap: "wrap",
                justifyContent: "center",
                maxWidth: 580,
              }}
            >
              {words.map((w, i) => (
                <span key={i} style={{ display: "flex", marginRight: i === words.length - 1 ? 0 : size * 0.26, color: i >= hi ? AMBER : INK }}>
                  {w}
                </span>
              ))}
            </div>
          ) : (
            <div style={{ ...text, marginTop: 26, fontSize: size, flexDirection: "column", alignItems: "center" }}>
              <span style={{ display: "flex" }}>{tagline[0]}</span>
              <span style={{ display: "flex" }}>{tagline[1]}</span>
              <span style={{ display: "flex", color: AMBER }}>{tagline[2]}</span>
            </div>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 30,
              paddingTop: 16,
              borderTop: `1.5px solid ${LINE}`,
              width: 200,
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 800,
              color: INK,
            }}
          >
            <div style={{ display: "flex", width: 8, height: 8, borderRadius: 9999, backgroundColor: AMBER, marginRight: 9 }} />
            myntmore.com
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
        // Cards follow page titles, so they are not immutable; a day at the edge is plenty.
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    }
  );
}
