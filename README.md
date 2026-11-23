# Myntmore Website

The marketing website for **Myntmore**, a Mumbai-based, AI-powered B2B outbound agency (cold email, LinkedIn outreach, account-based marketing). Built with Next.js 14 (App Router), TypeScript and Tailwind CSS, deployed on Vercel at [myntmore.com](https://www.myntmore.com).

It is a large, content-driven site rather than a small brochure site. As of 23 Nov 2026 the live sitemap lists **325 URLs** and the code base has about **350 routes** (the difference is unlisted pages such as pricing, calendar pages, tools in progress and the admin). Most pages are not hand-written: they are generated from content files (JSON and Markdoc) by scripts that run before every build, and the content can be edited through two editors, **Keystatic** (`/keystatic`) and a custom **content admin** (`/admin`). Read [How the site is built](#how-the-site-is-built) before changing any page.

The site is actively developed with a heavy focus on SEO, AEO (answer engines) and GEO (generative engines). Read [SEO / AEO / GEO governance](#seo--aeo--geo-governance) before adding or changing pages.

For copy-and-paste prompts by page type and task, see the [website prompt library](docs/website-prompt-library.md). For a full walk-through of every part of the site, see the [Website Bible](docs/website-bible.md).

---

## Table of contents

- [Quick start](#quick-start)
- [Tech stack](#tech-stack)
- [How the site is built](#how-the-site-is-built)
- [Editing content](#editing-content)
- [Project structure](#project-structure)
- [Content architecture](#content-architecture)
- [Free tools and the Prospect Research tool](#free-tools-and-the-prospect-research-tool)
- [Shared components & design system](#shared-components--design-system)
- [Data layer (`lib/`)](#data-layer-lib)
- [API routes](#api-routes)
- [Middleware](#middleware)
- [Database (Supabase)](#database-supabase)
- [Environment variables](#environment-variables)
- [SEO / AEO / GEO governance](#seo--aeo--geo-governance)
- [Redirects, sitemap, robots and unlisted pages](#redirects-sitemap-robots-and-unlisted-pages)
- [Scripts reference](#scripts-reference)
- [Testing and checks](#testing-and-checks)
- [Conventions & gotchas](#conventions--gotchas)
- [Deployment](#deployment)
- [Documentation index](#documentation-index)
- [Troubleshooting](#troubleshooting)

---

## Quick start

```bash
npm install
npm run dev            # http://localhost:3000
```

Useful variations:

```bash
ADMIN_LOCAL_DEV=1 npm run dev   # the /admin editor in local mode: no sign-in, saves write to your files
npm run build                   # full production build (runs the generators first, see below)
npx tsc --noEmit                # typecheck
npm run test:roi                # all unit tests (vitest)
```

You do not need any environment variables to browse the site locally. The AI tools, lead capture and the admin need the variables in [Environment variables](#environment-variables).

Before pushing anything non-trivial, run the typecheck and the checks in [Testing and checks](#testing-and-checks).

## Tech stack

| Layer | Choice |
|---|---|
| Framework | [Next.js 14.2](https://nextjs.org/) (App Router, `app/`) |
| Language | TypeScript |
| Styling | Tailwind CSS 3, plus inline `style` objects for brand hex values (see [design system](#shared-components--design-system)) |
| UI primitives | A small shadcn/ui-style set in `components/ui/` on Radix UI (accordion, label, popover, select, slider, slot, switch, tooltip) |
| Content editing | **Keystatic** (`@keystatic/core`, `@keystatic/next`) in GitHub mode, plus the custom admin at `/admin` |
| Content formats | JSON files (`content/*`) and Markdoc (`content/posts/*.mdoc`) |
| Icons / motion / charts | `lucide-react`, `framer-motion`, `recharts` |
| AI | Google Gemini through `@google/genai`, called server-side from `app/api/**/route.ts` |
| Database and sign-in | Supabase (Postgres and Auth) through `@supabase/supabase-js` and `@supabase/ssr`; see [Database](#database-supabase) |
| Validation | `zod` |
| Tests | `vitest` |
| PDF / image export | `jspdf` + `html2canvas` (the free tools export results) |
| Toasts | `sonner` |
| Analytics | `@vercel/analytics`, `@vercel/speed-insights` |
| Hosting | Vercel, deploying from `master` (see [Deployment](#deployment)) |

Package manager: npm (`package-lock.json` is committed). The path alias `@/*` points at the repo root (for example `@/lib/schema`).

## How the site is built

The most important thing to understand in this repo: **many `app/**/page.tsx` files are generated, not written by hand.** Each page type has one shared template component and a content file per page. A script in `scripts/` reads the content files and writes the page, plus any lookup data and sitemap entries the page needs. All of these scripts run automatically before `next build` (the `prebuild` step in `package.json`), so the generated files always match the content.

```
content/<type>/<slug>.json  --->  scripts/generate-<type>.mjs  --->  app/.../<slug>/page.tsx
                                                               --->  lib/<type>.generated.json
                                                               --->  a block inside app/sitemap.ts
```

| Page type | Content folder | Generator (`npm run ...:build`) | Template component |
|---|---|---|---|
| Landing pages (`/lp/*`) | `content/landing-pages/` | `generate-landing-pages.mjs` | `components/lp/LandingPage.tsx` |
| Service pages | `content/service-pages/`, `content/service-copy/` | `generate-service-pages.mjs` | service templates |
| City pages (`/b2b-lead-generation-<city>`) | `content/city-pages/` | `generate-city-pages.mjs` | `components/city/CityPage.tsx` |
| Industry x city pages | `content/industry-city-pages/` | `generate-industry-city-pages.mjs` | `components/industry-city/IndustryCityPage.tsx` |
| Glossary terms | `content/glossary/` | `generate-glossary-pages.mjs` | `components/glossary/GlossaryTerm.tsx` |
| Case studies (short, library) | `content/case-studies/` | `generate-case-study-content.mjs`, `generate-case-study-pages.mjs` | `components/case-studies/LibraryCaseStudy.tsx` |
| Case studies (detailed and long) | `content/case-study-pages/`, `content/case-study-long/` | `generate-case-study-detail-pages.mjs`, `generate-case-study-long-pages.mjs` | `components/case-studies/CaseStudyLayout.tsx`, `components/case-studies/long/` |
| Careers | `content/careers/` | `generate-career-pages.mjs` | `components/careers/JobPostingPage.tsx` |
| Events | `content/events/` | `generate-event-pages.mjs` | `components/events/EventPage.tsx` |
| Market pages (`/case-studies/markets/*`) | `content/market-pages/` | checked by `check-market-pages.mjs` | `lib/market-pages.ts` |
| FAQs on every page | `content/faqs/` | `generate-faq-content.mjs` | `lib/page-faqs.ts` |
| Page search titles and descriptions | `content/page-seo/` | `generate-page-seo.mjs` | `withPageSeo()` in `lib/page-seo.ts` |
| Blog posts | `content/posts/*.mdoc` | read directly by `lib/cms-posts.ts` | `app/resources/blogs/[slug]/page.tsx` |

Other generated or derived files: `scripts/generate-site-map.mjs` writes `app/site-audit/data.json` (every route and whether it is linked), `scripts/generate-llms-full.mjs` writes `public/llms-full.txt`, and `scripts/generate-sitemap-dates.mjs` keeps `lib/sitemap-dates.json` current (see [sitemap](#redirects-sitemap-robots-and-unlisted-pages)).

Rules that apply to the generators:

- **Never edit a generated `page.tsx` or `*.generated.json` by hand.** The next build overwrites it. Edit the content file (or the template) instead.
- Every generator has a `--check` mode (for example `npm run glossary:check`) that exits non-zero if the generated files differ from what the content would produce. Run it before committing generated changes.
- The shared build rules (field lengths, required links, exact list sizes, valid industry and city keys) live in `scripts/lib/content-rules.mjs` and are used by both the generators and the admin, so a bad entry cannot reach a build.
- To add a page of an existing type, add its content file and run the matching `:build` script. You should not need to write UI code.
- A brand-new hand-written page needs a developer once: wrap its metadata in `withPageSeo("/address", {...})` and add an entry under `content/page-seo/` (the build warns until you do).

## Editing content

There are three ways to change content. Whichever you use, **every save becomes a commit on `master`, and Vercel deploys it to production** (there is no staging step).

1. **Keystatic at `/keystatic`.** The original editor, configured in `keystatic.config.ts` (GitHub storage mode). It edits every content type, including blog posts, and is the only editor for blog posts today. Setup and usage: [`docs/cms-setup.md`](docs/cms-setup.md).
2. **The content admin at `/admin`.** A custom editor: editors sign in with their work email (Supabase Auth), every save is validated with Keystatic's own field rules and the build rules, checked for conflicts with other editors, committed to `master` as the editor, and recorded in an activity log. It covers every JSON content type and can create new entries; blog posts are planned for a later phase. **Status (23 Nov 2026): built and tested but not yet live for saving**, because the GitHub App and its `ADMIN_GITHUB_*` variables are not set in Vercel. Setup and design: [`docs/admin-setup.md`](docs/admin-setup.md).
3. **Directly in the repo.** Edit the content file, run the matching `:build` script and `:check`, commit and push.

## Project structure

```
app/                          Next.js App Router: one folder per route (page.tsx, optional *Client.tsx)
  api/                         Route handlers: AI tools, Prospect Research, admin, Keystatic, Menti, vCards
  admin/                       The content admin UI (sign-in, content lists and forms, activity log)
  keystatic/                   The Keystatic UI mount
  components/                  Sitewide components (Navbar, Footer, Hero, JsonLd, Breadcrumbs, ...)
  resources/                   Blog, guides, glossary, tools hub, feed
  site-audit/                  Generated route inventory (data.json) shown on an internal page
  layout.tsx, page.tsx         Root layout and homepage
  sitemap.ts, robots.ts        sitemap.xml and robots.txt
  og-image.png/                Route that renders a social card for any page

components/                    Feature components imported by one or a few routes
  ui/ pricing/ glossary/ lp/ city/ industry-city/ case-studies/ careers/ events/ guides/
  tools/<tool>/ and tools/shared/   Each tool's UI, plus LeadGate and related-tools lists
  research/ value-prop/ cold-email-roi/ cold-emailing/ linkedin-outreach/ admin/

content/                       The editable content (JSON and Markdoc), see "How the site is built"
lib/                           Non-visual shared logic (see "Data layer"); *.generated.json are build output
scripts/                       Generators, audits and the SEO crawler (scripts/lib/ holds shared rules)
public/                        Static assets: logos, photos, videos, llms.txt, llms-full.txt, PDFs
supabase/                      schema.sql (leads, tools, Menti) and admin.sql (editors, activity log)
docs/                          Operations docs: SEO cadence, keyword map, runbooks, weekly reports (see index below)
middleware.ts                  Admin sign-in guard and the Markdown-for-agents pilot
keystatic.config.ts            Every Keystatic collection and singleton
.claude/                       Project settings and skills for Claude Code
```

Other top-level files: `MYNTMORE_MANUAL.md` (a long walk-through of the site; more current than `HANDOFF.md`, which is stale), `HANDOFF.md` (old developer handoff, kept for history), `myntmore-ai-visibility-checklist.md/.html`, `motion-audits/`, `brag-output/`.

## Content architecture

### Marketing and company pages
Hand-built pages, each its own `app/<slug>/page.tsx` (occasionally with a co-located `*Client.tsx`): the homepage (composed from `app/components/` sections), `/about-us`, `/contact-us`, `/careers`, `/events`, `/who-this-is-for`, `/myntmore-framework`, `/agency-vs-in-house`, `/editorial-policy`, `/privacy-policy`, `/newsletter-subscribe`, `/feedback`, `/1-on-1-consultation`, `/book-a-call` and the post-conversion pages `/thank-you` and `/thankyou` (both exist; check before removing either). `/master-icp` is an interactive internal ICP reference.

### Services
`/services` is the index; each of the 7 services has a page under `/services/<slug>`: LinkedIn Outreach and Automation, Cold Email Infrastructure, ICP Mapping and Lead Scoring, AI Lead Generation, Account-Based Marketing, Personal Branding, GTM Strategy, plus `/services/do-it-yourself`. `/marketing-automation` and `/seo` are standalone adjacent pages.

### Vertical landing pages (`/lp/*`)
12 industry landing pages generated from `content/landing-pages/`: agencies-it, agency-partners, accounting-cfo-firms, ecommerce-tech, financial-services, fundraising, insurance, manufacturers-exporters, pharma, professional-services, recruitment-firms and saas-founders. Edit the text, numbers and steps in content; layout, animation and form wiring live in `components/lp/`.

### City pages and industry x city pages
- **City pages** (`/b2b-lead-generation-<city>`, content in `content/city-pages/`): 16 India and UAE cities plus 10 worldwide cities (New York, London, Tokyo, Paris, Singapore, Hong Kong, Los Angeles, Shanghai, Sydney, Toronto). They share structure, `LocalBusiness` schema and FAQ patterns. They are local-market context pages, not offices: Myntmore serves everyone from Mumbai and the copy says so.
- **Industry x city pages** (`/b2b-lead-generation-<industry>-<city>`, content in `content/industry-city-pages/`): 18 pages (for example pharma Mumbai, insurance Delhi, textile manufacturing Surat). Each links up to its parent city page and is linked from it. `industrySlug` must be a key in `lib/industry-keys.json`; add a line there for a new industry. The footer links the city pages only, so the industry pages are reached through their city page.
- Market pages (`/case-studies/markets/<country>`, content in `content/market-pages/`) tie case studies to six countries and link to their city pages.

### Blog, guides, glossary
- **Blog** (`/resources/blogs/<slug>`): about 49 Markdoc posts in `content/posts/*.mdoc`, rendered by one dynamic route through `lib/cms-posts.ts`. Front matter holds the search title (`metaTitle`, 49 characters at most), description (160 at most), FAQs, related links and CTA; the body is Markdoc. The old `/blog/*` URLs redirect to the new path.
- **Guides** (`/resources/guides/*`): long-form reference pages, mostly bespoke, with `GuideTemplate.tsx` as the shared shell where it applies.
- **Glossary** (`/resources/glossary/<term>`): 53 terms from `content/glossary/`, rendered by `GlossaryTerm.tsx`. Always extend the component or the content, never fork it. Glossary bodies are plain text with no inline links; each page has one "source" link and an optional "further reading" link.
- `/resources`, `/resources/blogs`, `/resources/tools` and `/resources/feed` are the hub pages.
- The 2026 benchmark report (`/resources/blogs/b2b-outbound-benchmark-report-2026`) is an evergreen asset whose value depends on staying current (see `docs/seo-aeo-geo-cadence.md`).

### Case studies
`/case-studies` is the index with filters by industry and country. There are about 70 individual case studies in three layouts: short library entries (`content/case-studies/`), detailed pages (`content/case-study-pages/`) and long-form pages (`content/case-study-long/`), all grouped by the same industries as the landing pages. Only real client results are allowed: **no fabricated stats**. A new offering with no track record gets honest "no data yet" wording.

### Research pages and standalone pages
- `/research/kmspharma`, `/research/myntmore`: account-research report pages built with `components/research/ResearchReport.tsx`.
- `/menti` and `/menti/room`: a small live Q&A and polling tool for talks, backed by Supabase and gated by `MENTI_ADMIN_PASSWORD`.
- `/tejasjhaveri`, `/jahnvijhaveri`, `/enwilfernandes`: digital business-card pages, each paired with an `app/api/vcard/<name>/route.ts` that serves a downloadable `.vcf`.
- `/plans/[code]` (the only dynamic route besides the blog and a few filters): pricing pages for the codes `mars`, `earth` and `neptune`, plus `/plans/orbit`. All are `noindex` and unlisted and share one component, `components/pricing/GrowthPlansPricing.tsx`. To add a variant, add a key to the `PLANS` record in `app/plans/[code]/page.tsx` with all five `prices` fields; do not create a new page.
- `/workshop`: an iframe wrapper around an external app, `noindex`.
- `/sitemap`: the human-readable HTML sitemap (separate from `sitemap.xml`).
- **Unlisted pages** (not linked, not in the sitemap, `noindex`): `/calendar/*` (about 16 booking pages for different campaigns and people, for example `/calendar/enwil`), `/cphi` (the landing page for people met at CPHI), `/tools/prospect-research`, the pricing pages and `/admin`.

## Free tools and the Prospect Research tool

12 public tools, each at `/tools/<slug>`. Most call Gemini through a matching `app/api/tools/<name>/route.ts`.

| Tool | Route | Backend |
|---|---|---|
| ROI Calculator | `/tools/roi-calculator` | none, client-side math |
| Cold Email ROI Calculator | `/tools/cold-email-roi-calculator` | none, client-side (`lib/cold-email-roi/`) |
| Cold Email Inbox & Domain Calculator | `/tools/cold-email-inbox-calculator` | none, client-side |
| ICP Builder & Value Proposition Generator | `/tools/icp-builder` | Gemini |
| LinkedIn Profile Optimizer | `/tools/linkedin-optimizer` | Gemini |
| DM Angle Generator | `/tools/dm-angle-generator` | external app (rewritten in `next.config.js`) |
| Competitor Battle Card Generator | `/tools/battle-card-generator` | Gemini |
| Case Study & Proposal Generator | `/tools/case-study-generator` | Gemini |
| Lead Magnet Idea Generator | `/tools/lead-magnet-ideas` | Gemini |
| Posting Rhythm Builder | `/tools/posting-rhythm-builder` | Gemini |
| Founder Presence Analyzer | `/tools/founder-presence-analyzer` | Gemini |
| LinkedIn Hook Grader | `/tools/linkedin-hook-grader` | rules in code (`lib/hook-grader.ts`) plus Gemini rewrites |

`lib/tools-registry.ts` is the single source of truth for each tool's name, address and tagline, used by the "Try this next" lists. Update the registry, not each page.

**Lead capture.** Every tool except the calculators gates its output behind `components/tools/shared/LeadGate.tsx` (name, email, phone). On submit it (1) posts to a Zoho form (the primary lead record) and (2) inserts a row into the Supabase `leads` table (a secondary record). The form generates the row's UUID itself and inserts without asking for the row back, because the table has no anonymous read policy. After the tool runs, `lib/save-lead-result.ts` attaches the visitor's inputs and the AI output to that row through the database function `save_lead_result`; see [Database](#database-supabase) for the current status of that function.

**Prospect Research** (`/tools/prospect-research`, hidden, `noindex`, not linked). Given a company's website, it works out who buys from them, finds 10 companies with a recent public buying signal and researches each against 7 sourced questions, scoring fit and timing by fixed rules in code (`lib/research-scoring.ts`). It runs in four server steps (`profile`, `discover`, `account`, `finish` under `app/api/tools/prospect-research/`), 5 companies at a time, with Google Search grounding. Protection: every route re-checks the lead on the server with the service role key, and per-email, per-IP and daily caps are counted in the database. A typical run costs about $0.90 and takes 4 to 6 minutes. Details, measurements and the launch checklist: [`docs/prospect-research-launch-checklist.md`](docs/prospect-research-launch-checklist.md). Core logic is in `lib/prospect-research/` and is unit-tested.

## Shared components & design system

Brand tokens (inline `style` hex values throughout, not Tailwind theme colours unless noted):

| Token | Hex |
|---|---|
| Cream (background) | `#F8F6F2` |
| Near-black (text) | `#0A0A0A` |
| Gold (primary accent: fills, borders, underlines) | `#F5B731` |
| Gold as text on light surfaces (`GOLD_TEXT`, `lib/colors.ts`) | `#A14A08` |
| Tan (borders) | `#E8E2D9` |
| Body text | `#52525B` |
| Muted text | `#71675E` |

Secondary accent rotation for tiered or categorised content (service icons, tier cards, table sections): Blue `#3B82F6`, Purple `#7C3AED`, Orange `#F97316`, Teal `#14B8A6`, Green `#10B981`, alongside the gold. `app/components/Industries.tsx` is the canonical source. The free-tool pages should stay on the orange/gold on cream palette (no green, blue, teal or purple accents, no dark surfaces); some older tool pages are still off-theme.

**Gold is for fills, not text on light backgrounds.** `#F5B731` and `#D97706` read at 1.7:1 and 3.0:1 as text on the page (WCAG AA needs 4.5:1). Gold-coloured text on a light surface uses `GOLD_TEXT` (`#A14A08`), and any accent colour that drives text goes through `textTone(accent)`.

Font: Inter, self-hosted (`app/fonts`, loaded with `next/font/local`), sitewide.

Key shared components in `app/components/` (changes here have a large blast radius):

- **`Navbar.tsx`**: fixed header with desktop megamenus and a mobile drawer, driven by arrays at the top of the file.
- **`Footer.tsx`**: sitewide footer. On phones the Services, Company, We Work With and city groups are collapsible (`FooterGroup`); the links stay in the server-rendered HTML either way. The footer links the city pages but not the industry x city pages.
- **`InnerLayout.tsx`**: the standard page wrapper (navbar, content, footer).
- **`Breadcrumbs.tsx`**: visible breadcrumbs that also emit `BreadcrumbList` JSON-LD.
- **`FadeIn.tsx`**: the scroll-reveal wrapper (IntersectionObserver plus `.reveal` classes in `globals.css`).
- **`JsonLd.tsx`**: renders a schema object built by `lib/schema.ts`.
- **`LeadCaptureForm.tsx`, `NewsletterForm.tsx`**: generic capture forms outside the tools' `LeadGate`.
- **`ReelWidget.tsx`**: the floating bottom-right Instagram reel promo, shown once per browser session after a delay (excluded on several pages, see `EXCLUDED_PREFIXES`). Its label reads "Follow @tejas_jhaveri".
- **`EventPopup.tsx`**: a similar timed promo for upcoming events.
- **`StatTicker.tsx`**: the count-up number animation. It animates a plain digit and shows the caller's pre-formatted string at the end, so India's lakh grouping (`1,74,999`) is never reformatted.
- **`GuideTemplate.tsx`**, **`Testimonials.tsx`** (CSS marquee, pauses on hover).

`components/pricing/GrowthPlansPricing.tsx` and `components/glossary/GlossaryTerm.tsx` are the clearest examples of one component powering many pages.

## Data layer (`lib/`)

| File or folder | Purpose |
|---|---|
| `schema.ts` | JSON-LD builders (LocalBusiness, FAQ, Service, WebApplication, DefinedTerm, Breadcrumb, Website, HowTo, Article, Event, JobPosting, CollectionPage). New pages should use whichever fits. |
| `page-seo.ts`, `page-seo.generated.json` | `withPageSeo()` merges the editable title and description into a page's metadata and fills a complete Open Graph block. |
| `og.ts`, `og-fonts/` | Social-card helpers: `OG_BASE`, `ogImages(path)`, fonts for the `app/og-image.png` route. |
| `cms-posts.ts`, `markdown/` | Reading Markdoc posts; rendering pages to Markdown for agents (see Middleware). |
| `page-faqs.ts`, `faq-data.ts`, `faq-content.generated.json` | FAQ content for every page and its FAQPage schema. |
| `tools-registry.ts`, `tool-social-metadata.ts` | Tool names and addresses, tool social metadata. |
| `events-data.ts`, `events.generated.json` | Events for `/events` and the pop-up. |
| `city-links.ts`, `industry-keys.json`, `industry-city-pages.generated.json` | City and industry linking and the allowed industry keys. |
| `case-study-library.ts/.json`, `case-study-filters.ts`, `case-study-markets.ts` | Case-study data, filters and market pages. |
| `sitemap-dates.json`, `internal-paths.ts` | Per-URL `lastmod` dates and internal path helpers. |
| `admin/` | The content admin: sign-in and roles, reading and committing through GitHub, schema and rules, activity log. |
| `prospect-research/`, `research-scoring.ts`, `research-types.ts` | Prospect Research core, network safety and scoring. |
| `hook-grader.ts`, `cold-email-roi/` | Hook Grader rules and Cold Email ROI maths. |
| `supabase.ts`, `save-lead-result.ts`, `lead-source.ts` | Browser Supabase client and lead helpers. |
| `rateLimit.ts`, `mentiAuth.ts` | In-memory request limiting; Menti admin password check. |
| `colors.ts`, `utils.ts`, `entity-facts.json`, `value-prop.*`, `service-answers.*` | Colour helpers, class merge, shared facts and answer text. |

## API routes

All under `app/api/`, all Next.js route handlers:

- `gemini/`: generic Gemini endpoint.
- `tools/`: `battle-card-generator`, `case-study-generator`, `founder-presence`, `dm-angles` (+ `regenerate`), `hook-grader`, `lead-magnet-ideas`, `posting-rhythm`, `profile-optimizer`.
- `tools/prospect-research/`: `profile`, `discover`, `account`, `finish` (the four steps of a run).
- `admin/`: `auth/login`, `auth/logout`, `entries/[type]`, `entries/[type]/[slug]` (the content admin).
- `keystatic/[...params]`: Keystatic's API.
- `menti/`: `auth`, `gist`, `reset`.
- `vcard/`: `tejas-jhaveri`, `jahnvi-jhaveri`, `enwil-fernandes`.

## Middleware

`middleware.ts` does two things:

1. **Admin guard.** Anyone not signed in is turned away from `/admin` and `/api/admin` (except the sign-in routes); every page and save then checks the editor's role on the server. Responses carry `X-Robots-Tag: noindex` and `Cache-Control: private, no-store`.
2. **Markdown for agents (pilot).** For a short allowlist of 8 pages, a client that explicitly prefers `text/markdown` gets the rendered page converted to Markdown; everyone else gets the normal HTML. See [`docs/markdown-pilot.md`](docs/markdown-pilot.md).

## Database (Supabase)

The site uses one Supabase project, `gapaawxbkfmpthfesuyw`, which is **shared with other apps** (a work-update tracker, a client-tracking app in the `myntmore` schema and an outreach app in the `outreach` schema). Be careful with project-wide settings (Auth email templates, Site URL, row-level security) and never assume a table or function in this project belongs only to the website.

Tables the website uses (all in `public`):

| Table | Purpose |
|---|---|
| `leads` | One row per gated-tool session (`supabase/schema.sql`). `source` is a constrained list of tool names. Row-level security allows anonymous **insert** only; there is **no anonymous read**. |
| `prospect_research_runs`, `prospect_research_cache`, `ai_usage_log` | Prospect Research runs, a 7-day cache of researched companies, and per-call AI cost and timing. Server (service role) access only. |
| `menti_responses` | Answers for the live Q&A tool. |
| `admin_editors`, `admin_activity` | Who may use the content admin, and its activity log (`supabase/admin.sql`). Server only. |

Notes:

- **Zoho CRM is the primary lead record**; Supabase is secondary. Website enquiries and booking-form calls land in Zoho **Contacts**, not Leads.
- **Saving a tool's results to its lead.** The ten older tools call `save_lead_result` (through `lib/save-lead-result.ts`) because a direct update from the browser matches no rows without a read policy. That function is defined in `docs/supabase-lockdown-2026-11-23.sql` (section 3) and **has not been applied yet**, so those tools currently do not store their inputs and outputs (the lead row itself is saved). That file also lists a security review of the project (open work-tracker tables, anonymous-callable functions). Read it, and check what else uses the project, before running anything from it.
- Never put the service role key in a `NEXT_PUBLIC_` variable.

## Environment variables

Set these in `.env.local` for local work and in the Vercel project settings. There is no `.env.example`.

| Variable | Scope | Used for |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production and Preview | Browser Supabase client, admin sign-in. `NEXT_PUBLIC_*` values are baked in at build time, so changing them needs a redeploy. |
| `SUPABASE_SERVICE_ROLE_KEY` | Production | Server-only access: Prospect Research, the admin's editor list and activity log. Never expose it. |
| `GEMINI_API_KEY` | Production and Preview | All Gemini calls. |
| `PROSPECT_RESEARCH_MODEL`, `PROSPECT_FORMAT_MODEL`, `PROSPECT_RESEARCH_DAILY_RUN_CAP` | Optional | Prospect Research models and the daily run cap (default 30). |
| `MENTI_ADMIN_PASSWORD` | Production | The `/menti/room` admin login. Required: with no default, nobody can log in if it is unset. |
| `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`, `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO` | Production | Keystatic's GitHub sign-in and storage. |
| `ADMIN_GITHUB_APP_ID`, `ADMIN_GITHUB_APP_PRIVATE_KEY`, `ADMIN_GITHUB_INSTALLATION_ID`, `ADMIN_GITHUB_REPO`, `ADMIN_GITHUB_BRANCH` (optional), `ADMIN_VERCEL_DEPLOY_HOOK_URL` (optional) | Production only | The content admin committing to GitHub. **Not set yet** (see [Editing content](#editing-content)). Production only, because a preview deploy with the same values would commit to `master`. |
| `ADMIN_LOCAL_DEV=1` | Local only | Local admin mode; ignored on Vercel and in production builds. |
| `MARKDOWN_PILOT`, `MARKDOWN_LOCAL_PORT`, `VERCEL_AUTOMATION_BYPASS_SECRET` | Optional | The Markdown pilot and deployment-protection bypass. |

Without `SUPABASE_SERVICE_ROLE_KEY` Prospect Research refuses to run. Missing public Supabase variables make lead inserts fail quietly (the form shows "We could not save your details").

## SEO / AEO / GEO governance

This is a load-bearing part of the repo. Read `docs/seo-aeo-geo-cadence.md` before shipping any content change. It defines:

- A **triggered checklist** for every page add or change: keyword-collision check, schema pass, sitemap entry with a real `lastmod`, title and description limits, bidirectional internal links, snippet-style FAQ answers, `public/llms.txt` updates for structural changes, and no fabricated stats.
- Weekly, monthly and quarterly recurring tasks (Search Console sweeps, keyword-collision re-run, broken-link sweep, snippet audit, E-E-A-T consistency, benchmark refresh).
- A monthly **manual** check of whether AI assistants cite Myntmore (there is no API for it).

Rules that are enforced by tooling:

- Search titles are at most 49 characters in the editors (the site adds ` | Myntmore`, and Google cuts at about 60); descriptions at most 160.
- One primary keyword per page sitewide: `docs/keyword-map.md` lists every page's keyword, and a check enforces zero collisions.
- Every page carries a self-referencing canonical in the HTML and a canonical `Link` header (`next.config.js`).

Companion docs: `docs/keyword-map.md`, `docs/content-gaps.md`, `docs/featured-snippet-audit.md`, `docs/seo-checklist.md`.

**Weekly SEO report.** Each week a report is produced from Search Console, Zoho, Vercel and a crawl of the live site: 11 scorecard KPIs (organic leads, non-brand clicks and impressions, top-10 queries, city pages on page 1, indexed and submitted pages, site health, schema coverage, AI referrals, AI citation rate) plus blog traffic, traffic sources and ranked actions, as a PDF in `docs/` (for example `docs/seo-report-2026-10-20-week3.pdf`). The prompt that runs it, with every measuring rule, is [`docs/seo-weekly-report-prompt.md`](docs/seo-weekly-report-prompt.md); keep the rules unchanged so weeks stay comparable. The site-health and schema numbers come from `python3 scripts/seo-crawl.py`.

`public/llms.txt` is a structured summary of the whole site for AI systems; keep it in sync in the same commit whenever a service, major page or address changes. `public/llms-full.txt` is generated (`npm run llms:build`).

## Redirects, sitemap, robots and unlisted pages

- **`next.config.js`**: all redirects are `permanent: true` (real 308s). They are grouped by reason: legacy renamed paths, the blog move from `/blog` to `/resources/blogs`, retired roles and pages, and old WordPress URLs. Fully discontinued service lines are deliberately not mapped to `/services`, because that would read as a soft-404. It also sends the canonical `Link` header on every page and on redirect responses, and rewrites `/tools/dm-angle-generator` to an external app and `/calendar/IG` to `/calendar/ig`.
- **`app/sitemap.ts`**: enumerates every indexable URL with a `lastModified` read from `lib/sitemap-dates.json`. Generated blocks (landing, city, glossary, case-study, career pages) are written into it by the generators. **Dates:** after adding or changing pages, run `npm run sitemap:dates` and commit `lib/sitemap-dates.json` (the build only warns when it is stale; `npm run sitemap:check` fails). A commit that touches many pages without changing what they say (a styling or mechanical change) must be listed in `scripts/sitemap-dates-ignore.txt` first, so it does not move every `lastmod`. Never set every URL to "now".
- **`app/robots.ts`**: allows all agents, including the AI crawlers, and disallows `/keystatic`, `/admin`, `/api/admin` and the externally rewritten tool subpaths.
- **`npm run indexnow`** notifies Bing and others of changed URLs.
- **Unlisted pages convention.** A page that should only be reached by a shared link (campaign booking pages, `/cphi`) is built as an "orphan": `robots: { index: false, follow: false }`, no links from the navbar, footer or other pages, and no sitemap entry. The generated `/site-audit` inventory lists orphans so they are not mistaken for mistakes.

## Scripts reference

Run with `npm run <name>`. The `prebuild` step runs all generators and checks in order, so you rarely need them one by one.

| Group | Scripts |
|---|---|
| Develop and ship | `dev`, `build`, `start` |
| Generators (each has a matching `:check`) | `faqs:build`, `page-seo:build`, `case-studies:content`, `case-studies:build`, `landing-pages:build`, `service-pages:build`, `glossary:build`, `city-pages:build`, `events:build`, `market-pages:check`, `industry-city:build`, `case-study-pages:build`, `case-study-long:build`, `careers:build`, `llms:build` |
| Sitemap | `sitemap:dates`, `sitemap:check`, `indexnow` |
| Audits | `audit:links` (internal links, redirects, canonicals, llms files), `audit:answers` (FAQ answer format), `audit:entity` (company facts), `audit:jobs` (JobPosting schema), `keywords:build` |
| Tests | `test:roi` (runs every vitest file) |
| Outside npm | `python3 scripts/seo-crawl.py [--json out.json] [--base URL]` (site health and schema coverage of every sitemap URL), `scripts/internal-linking/`, `scripts/build-seo-checklist.py` |

## Testing and checks

- `npm run test:roi` runs 117 unit tests: the admin (schema, rules, GitHub commits and conflicts), Prospect Research (core and network safety), research scoring, the Hook Grader, the Cold Email ROI maths and the Markdown renderer.
- `npx tsc --noEmit` typechecks. If it fails only with `TS6053 ... .next/types/... not found`, that is a stale dev-server artefact, not a real error; delete `.next` or ignore those lines.
- `npm run build` is the full gate: it runs every generator and check, then builds.
- Before committing content or generated changes: the relevant `:check` script, `npm run sitemap:check`, and `npm run audit:links` (the audit currently reports pre-existing `llms` and redirect findings; compare against a run without your change rather than expecting zero).
- For a pre-release SEO read: `python3 scripts/seo-crawl.py` against the live site (health should be 100%).
- There is no linter script and no CI in the repo; Vercel's build is the only automated gate.

## Conventions & gotchas

- **Mobile-first grids.** Multi-column `grid-cols-N` needs a `grid-cols-1` mobile base or genuinely short cell content (a number and a 2 to 4 word label survive narrow columns; a sentence plus a citation does not).
- **Tables get `overflow-x-auto`.** Every data table sitewide does; keep it for anything new.
- **Tap targets.** Interactive items on phones are at least about 40 px tall.
- **`prefers-reduced-motion` is mandatory** for any new animation: a CSS guard in `globals.css` and, for JS loops, an early return on `window.matchMedia("(prefers-reduced-motion: reduce)").matches`.
- **Never reformat a pre-formatted number** (see `StatTicker.tsx`).
- **One primary keyword per page**, and **no fabricated numbers**.
- **Both `/thank-you` and `/thankyou` exist.**
- **Generated files are build output.** Edit content and templates, never the generated `page.tsx` or `*.generated.json`.
- **Git remote uses SSH, not HTTPS.** Plain `https://` pushes have failed here; the origin should be `git@github.com:aitoolsteejay/myntmore-website.git`.
- **`master` is production.** A push to `master` deploys. Fetch and merge `origin/master` before pushing: other sessions and the CMS commit to it too.
- **Shared Supabase project.** Do not change project-wide Auth settings or tables you did not create without checking the other apps that use them.
- **Two kinds of "fixed-width-looking" code are not bugs:** large `width: "600px"` values on `aria-hidden`, `pointer-events: none` background blobs inside an `overflow-hidden` section, and `flex-shrink-0 w-[Npx]` cards inside a CSS marquee track.

## Deployment

Hosted on Vercel, deploying from `master`. There is no committed `vercel.json`; routing, redirects, rewrites, canonical headers and image formats (AVIF first, WebP fallback) live in `next.config.js`. **A push to `master` ships to production** and there is no staging environment. Preview deployments of other branches use the live Supabase project (the public variables are set for Preview too), so test leads from a preview are real rows.

Release routine:

1. `git fetch origin && git merge origin/master` (resolve first, then continue).
2. `npx tsc --noEmit`, the relevant `:check` scripts, `npm run sitemap:dates` if pages changed, `npm run test:roi`.
3. `git push origin HEAD:master`.
4. Watch the Vercel build, then check the page on production with a cache-busting query string (for example `?cb=123`).

Production builds run the generators first; if a content file breaks a build rule, the build fails and Vercel keeps the previous version live.

## Documentation index

| Doc | What it covers |
|---|---|
| `docs/website-bible.md` | A self-contained walk-through of the whole site and its decisions |
| `docs/website-prompt-library.md` | Copy-and-paste prompts by page type and task |
| `docs/cms-setup.md`, `docs/admin-setup.md` | Using Keystatic, and setting up and running the content admin |
| `docs/seo-aeo-geo-cadence.md`, `docs/seo-checklist.md` | The recurring SEO and AI-visibility routine and checklist |
| `docs/keyword-map.md`, `docs/keyword-research-2026-11.md`, `docs/keywords/` | Primary keyword per page; keyword research and city/industry keyword lists |
| `docs/content-gaps.md`, `docs/content-briefs-*.md`, `docs/seo-opportunity-map-*.md` | Content backlog, briefs and opportunity maps |
| `docs/featured-snippet-audit.md` | FAQ answer format audit |
| `docs/seo-weekly-report-prompt.md`, `docs/seo-weekly-run-*.md`, `docs/seo-biweekly-run-*.md`, `docs/seo-report-*.pdf` | The weekly SEO report prompt, run logs and past reports |
| `docs/gsc-*.md` | Search Console audits and indexing-request lists (including the foreign-canonical problem on `/services`) |
| `docs/seo-experiments-log.md`, `docs/seo-review-2026-12.md` | Experiments and review notes |
| `docs/ai-visibility-*.md/.csv` | AI-citation prompts and tracking |
| `docs/prospect-research-launch-checklist.md`, `docs/prospect-research-tool-prompt.md` | The Prospect Research tool: status, measurements, launch wiring |
| `docs/supabase-lockdown-2026-11-23.sql` | Reviewed (not applied) Supabase security and `save_lead_result` SQL |
| `docs/markdown-pilot.md` | The Markdown-for-agents middleware pilot |
| `docs/directory-profiles.md`, `docs/linkedin-distribution-drafts-*.md` | Directory listings and LinkedIn distribution drafts |
| `MYNTMORE_MANUAL.md`, `HANDOFF.md` (stale) | Older long-form references |

## Troubleshooting

- **A page edit "does nothing".** The page is probably generated. Edit its content file, rerun the matching `:build`, and check the generated diff.
- **Build fails with a content rule message.** A content file broke a rule from `scripts/lib/content-rules.mjs` (a title over 49 characters, a missing link target, a list of the wrong length, an unknown `industrySlug`). Fix the content; the message names the file.
- **"We could not save your details" on a tool.** The public Supabase variables point at a project that is paused, missing or has no anonymous insert policy on `leads`. Check the Supabase project status first, then the variables, then redeploy (public variables are baked in at build time).
- **Tools do not store results after the form.** Expected until `save_lead_result` is created (see [Database](#database-supabase)).
- **Admin saves do not reach GitHub.** The `ADMIN_GITHUB_*` variables are not set in Vercel (see [Editing content](#editing-content)).
- **`sitemap:check` fails.** Run `npm run sitemap:dates` and commit `lib/sitemap-dates.json`; if a commit only changed styling or mechanics, list it in `scripts/sitemap-dates-ignore.txt` first.
- **Inexplicable build error that `tsc` says is fine.** Two usual causes: a corrupted `.next` cache (a build and a dev server sharing it; run `rm -rf .next` and restart) or a leftover `next dev` process bound to the dev port serving an old module graph (`lsof -nP -iTCP:3000 -sTCP:LISTEN`, then `kill -9 <pid>`).
- **Google shows another site as a page's canonical.** Known for `/services` since July. The HTML and headers are correct; only a recrawl fixes it (Search Console: Test Live URL, then Request Indexing). See `docs/gsc-request-indexing-foreign-canonical.md`.
