# The Myntmore Website Bible

**What this is:** the one document that explains the whole myntmore.com website: what is on it, where every part lives, which tool does what, and the rules we follow. Written in plain language so a new teammate, a freelancer or an AI assistant can pick it up and work safely.

**Last updated:** 2026-11-11. **Written from:** the live repository, the Vercel and Search Console data, and every decision made so far. Where something could not be checked, it says so.

**This replaces** `README.md`, `MYNTMORE_MANUAL.md` and `HANDOFF.md` as the first thing to read. Those three are out of date (they still say "165 pages", "30 glossary terms" and "Calendly"). The real numbers are in this document.

---

## How to use this document

| If you want to... | Go to |
| --- | --- |
| Understand the site in two minutes | [Part 1: The site on one page](#part-1-the-site-on-one-page) |
| Find out where a page's file lives, or who edits it | [Part 3: Every page and where it lives](#part-3-every-page-and-where-it-lives) |
| Change some text or add a blog post | [Part 12: How-to recipes](#part-12-how-to-recipes) |
| Know which tool does what | [Part 6: Tools and accounts](#part-6-tools-and-accounts-what-each-one-does) |
| Check a rule before writing copy | [Part 9: Copy and content rules](#part-9-copy-and-content-rules) |
| Check a colour, font or button | [Part 8: Design rules](#part-8-design-rules) |
| Deploy safely | [Part 11: Git, deploys and quality checks](#part-11-git-deploys-and-quality-checks) |
| Look up a word you do not know | [Part 15: Plain-English glossary](#part-15-plain-english-glossary) |

**Contents**

1. The site on one page
2. The business facts (the single source of truth)
3. Every page and where it lives
4. How the site is built
5. The content system and the CMS
6. Tools and accounts: what each one does
7. Forms, leads and bookings
8. Design rules
9. Copy and content rules
10. SEO, AEO and GEO: how the site gets found
11. Git, deploys and quality checks
12. How-to recipes
13. Private and unlisted pages, redirects and rewrites
14. Decisions we have made, known problems and open items
15. Plain-English glossary
16. Where everything else is documented

---

## Part 1: The site on one page

**What Myntmore is:** a Mumbai-based, AI-powered B2B outbound agency. It builds and runs cold email, LinkedIn outreach and account-based marketing (ABM) systems that book meetings for B2B companies.

**What the website is for:** (1) get found on Google, ChatGPT and other AI search, (2) convince a B2B buyer, (3) turn them into a booked 30-minute call or a lead in Zoho CRM.

**The ten things to remember**

1. **Production lives on `master`.** Anything merged to `master` deploys to myntmore.com on Vercel within a few minutes.
2. **Most pages are generated.** About 160 pages (glossary, city, landing, service and case study pages) are written by scripts from JSON files in `content/`, and all 38 blog posts are rendered from `content/posts/`. You edit the JSON (in the Keystatic admin or in a file), never the generated page. Generated files say so in their first line.
3. **One template, many pages.** Glossary terms, city pages, landing pages, case studies, service pages and blog posts each use one shared component. Fix the component once and every page of that type is fixed.
4. **The canonical numbers live in one file:** `lib/entity-facts.json` (12K+ meetings, $120M+ pipeline, 130+ companies). Never type a different number.
5. **We do not publish prices.** Prices appear only on private, unlisted `/plans/*` pages shared directly with a prospect.
6. **Calls are 30 minutes only.** There is no 1-hour session anywhere on the site.
7. **No em dashes in copy.** Use commas, colons or an en dash for ranges (Rs 10,000–15,000).
8. **No invented numbers, quotes or client names.** Real results only. Client names are withheld.
9. **Every page gets the same SEO set:** title, description, canonical, schema, an entry in the sitemap, breadcrumbs, internal links, and (for AI) a line in `llms-full.txt`. The scripts do most of this for you.
10. **Run the checks before you push** (see [Part 11](#part-11-git-deploys-and-quality-checks)): type check, build, link audit.

**Size of the site today (2026-11-11)**

| Thing | Count |
| --- | --- |
| Page files (`page.tsx`) | 255 |
| URLs in `sitemap.xml` | 268 |
| Services | 7 managed services plus 1 self-serve tool page |
| Blog posts | 38 files, 37 published |
| Glossary terms | 51 |
| Case studies | 50 library cases, 20 detailed cases, 12 long-form cases |
| City pages | 8 |
| Industry landing pages (`/lp/*`) | 10 (9 industries plus the accounting and CFO firms page) |
| Free tools | 11 |
| Guides | about 18 |
| Open job postings | 8 |
| API routes | 17 |

---

## Part 2: The business facts (the single source of truth)

All of this is stored in `lib/entity-facts.json`. If a fact changes, change it there first, then run `npm run audit:entity` to find pages that still say the old thing.

| Fact | Value |
| --- | --- |
| Name | Myntmore (never "MyntMore" in body copy; the logo shows "Mynt" bold and "more" in gold) |
| Founded | 2019 |
| Headquarters | WeWork Enam Sambhav, C - 20, G Block Rd, G Block BKC, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051, India |
| Founder | Tejas Jhaveri (LinkedIn: linkedin.com/in/tejasjhaveri) |
| Team pages | Tejas Jhaveri, Jahnvi Jhaveri, Enwil Fernandes (Senior Sales Head) |
| Main email | growth@myntmore.com |
| Hiring email | founder@myntmore.com and growth@myntmore.com (every Apply button reaches both) |
| Phone | +91 81693 18951 |
| Proof points (use these exact words) | 12K+ meetings booked. $120M+ in pipeline generated. 130+ B2B companies served. |
| Social | LinkedIn company page, Instagram @myntmore, YouTube @TJtheLeadGenExpert |
| Website | https://www.myntmore.com (the `www` version is the real one; the bare domain redirects to it) |

**Things we must never state or imply** (from the `doNotInfer` list in the same file)

- Pricing, or any estimate of what Myntmore charges.
- A more precise client count than "130+".
- That Myntmore is the "leading" or "best" agency as if it were an independent ranking.
- That the city pages are separate offices. They describe local markets only.
- That output from the free tools is guaranteed. It is AI-generated and can be wrong.
- That the benchmark report's "typical" figures for unmanaged outbound come from a third-party study. They are commonly cited industry ranges. The report's managed-account figures are Myntmore's own, anonymised.

**What Myntmore sells (the seven services)**

| Service | Page | One-line meaning |
| --- | --- | --- |
| LinkedIn Outreach & Automation | `/services/linkedin-outreach` | Profile, content, connection requests and follow-ups run for the client |
| Cold Email Infrastructure | `/services/cold-email` | Domains, inboxes, warm-up, lists, copy and sending, run for the client |
| ICP Mapping & Lead Scoring | `/services/sales-intelligence` | Who to target, plus daily buying-signal monitoring |
| AI Lead Generation | `/services/ai-lead-generation` | Custom AI agents that research and score prospects, checked by people |
| Account-Based Marketing | `/services/account-based-marketing` | Coordinated LinkedIn and email to a defined list of accounts |
| Personal Branding | `/services/personal-branding` | Ghostwritten LinkedIn posts from one monthly voice interview (about 45 minutes) |
| GTM Strategy | `/services/gtm-strategy` | Positioning and channel plan, then executed by the same team |
| Do It Yourself tool | `/services/do-it-yourself` | A self-serve LinkedIn outreach tool (not managed) |

---

## Part 3: Every page and where it lives

**How to read the "Edited in" column**

- **Keystatic** means a non-developer can edit it in the admin (or in the JSON file it writes). The page file is generated.
- **Code** means a developer edits the page file directly.
- **Generated** means a script writes the file. Never edit it by hand.

### 3.1 Main pages

| Page | URL | File | Edited in |
| --- | --- | --- | --- |
| Homepage | `/` | `app/page.tsx`, built from `app/components/*` (Hero, Services, Industries, WhoWeHelp, Results, Testimonials, CTABanner and others) | Code. Its FAQs: Keystatic |
| About | `/about-us` | `app/about-us/page.tsx` | Code |
| Contact | `/contact-us` | `app/contact-us/page.tsx` | Code |
| Book a call | `/book-a-call` | `app/book-a-call/` (embeds Zoho Bookings) | Code |
| Free consultation | `/1-on-1-consultation` | `app/1-on-1-consultation/page.tsx` | Code |
| Who this is for | `/who-this-is-for` | `app/who-this-is-for/` | Code |
| Framework | `/myntmore-framework` | `app/myntmore-framework/` | Code |
| Agency vs in-house | `/agency-vs-in-house` | `app/agency-vs-in-house/` (noindex, the indexed version is the blog post) | Code |
| Editorial policy | `/editorial-policy` | `app/editorial-policy/` | Code |
| Privacy policy | `/privacy-policy` | `app/privacy-policy/` | Code |
| SEO services | `/seo` | `app/seo/page.tsx` | Code |
| Marketing automation | `/marketing-automation` | `app/marketing-automation/` | Code |
| Newsletter sign-up | `/newsletter-subscribe` | `app/newsletter-subscribe/` | Code |
| Feedback form | `/feedback` | `app/feedback/` | Code |
| Thank-you pages | `/thank-you` and `/thankyou` | `app/thank-you/`, `app/thankyou/` | Code. Both exist on purpose: check what links to each before removing one |
| 404 page | any missing URL | `app/not-found.tsx` | Code |
| Human sitemap | `/sitemap` | `app/sitemap/page.tsx` | Code (new pages must be added by hand) |
| Machine sitemap | `/sitemap.xml` | `app/sitemap.ts` plus generator blocks | Generated and code |
| Robots | `/robots.txt` | `app/robots.ts` | Code |

### 3.2 Services

| Page | File | Edited in |
| --- | --- | --- |
| `/services` (index) | `app/services/page.tsx` | Code |
| 7 service pages and the Do It Yourself page | `app/services/<slug>/page.tsx` is **generated** from `content/service-pages/<slug>.json` | Keystatic: **Service pages** (search title, description, keywords, and for five of the pages the page copy) |
| Longer copy of Cold Email, LinkedIn Outreach and Do It Yourself | `content/service-copy/<slug>.json`, shown by components in `components/cold-emailing/`, `components/linkedin-outreach/` and `app/services/do-it-yourself/` | Keystatic: three singletons named **Service copy: ...** |

### 3.3 Industry landing pages (`/lp/*`)

Ten pages built for paid and outbound traffic: `agencies-it`, `agency-partners`, `financial-services`, `fundraising`, `insurance`, `manufacturers-exporters`, `pharma`, `recruitment-firms`, `saas-founders`, `accounting-cfo-firms`.

| Part | Where |
| --- | --- |
| Text, numbers, steps, button labels | `content/landing-pages/<slug>.json`, edited in Keystatic: **Landing pages (ICP)** |
| Layout, colours, animation, the form | `components/lp/LandingPage.tsx` and `app/lp/LpLayout.tsx` (code) |
| The page file | `app/lp/<slug>/page.tsx`, **generated** |
| Their FAQs | Keystatic: **Page FAQs**, entries starting `lp-` |

### 3.4 City pages

Eight pages: `/b2b-lead-generation-` plus mumbai, delhi, bengaluru, pune, hyderabad, chennai, kolkata, ahmedabad.

| Part | Where |
| --- | --- |
| Text | `content/city-pages/<city>.json`, Keystatic: **City pages** |
| Layout | `components/city/CityPage.tsx` |
| Page file | `app/b2b-lead-generation-<city>/page.tsx`, **generated** |
| FAQs | `content/faqs/pages/city-<city>.json`, Keystatic: **Page FAQs** |
| Sitemap line | `app/sitemap.ts` (a new city needs one line added by hand) |

These pages describe local markets. They are not separate offices.

### 3.5 Blog, guides, glossary, the feed

| Content | URL | Source | Edited in |
| --- | --- | --- | --- |
| Blog posts | `/resources/blogs/<slug>` | `content/posts/<slug>.mdoc` rendered by `app/resources/blogs/[slug]/` | Keystatic: **Blog posts** |
| Blog index | `/resources/blogs` | `app/resources/blogs/page.tsx`. It re-builds hourly and also pulls the Medium feed (`medium.com/@myntmore`) | Code |
| Guides | `/resources/guides/<slug>` | One folder each under `app/resources/guides/`. Some use `app/components/GuideTemplate.tsx` | Code |
| Glossary (51 terms) | `/resources/glossary/<slug>` | `content/glossary/<slug>.json`, page **generated**, rendered by `components/glossary/GlossaryTerm.tsx` | Keystatic: **Glossary terms** |
| Glossary A-Z index | `/resources/glossary` | `app/resources/glossary/page.tsx`, cards from `lib/glossary-index.generated.json` | Generated |
| The Feed | `/resources/feed` | `app/resources/feed/` | Code |
| Free tools hub | `/resources/tools` | `app/resources/tools/` | Code, list from `lib/tools-registry.ts` |
| Old `/blog/...` URLs | `/blog/*` | A redirect in `next.config.js` sends them to `/resources/blogs/*` | |

**Posts moved on 28 Oct 2026** from `/blog/<slug>` to `/resources/blogs/<slug>`. Search Console still shows some old addresses.

### 3.6 Case studies

| Kind | Count | Source | Edited in |
| --- | --- | --- | --- |
| Library case studies (short format) | 50 | `content/case-studies/*.json` becomes `lib/case-study-library.json`, one generated page each | Keystatic: **Case studies** |
| Detailed case studies (shared layout) | 20 | `content/case-study-pages/<slug>.json`, layout `components/case-studies/CaseStudyLayout.tsx`, page generated | Keystatic: **Case studies (detailed)** |
| Long-form case studies (each has its own layout) | 12 | `content/case-study-long/<slug>.json`, layout in `components/case-studies/long/<slug>.tsx`, page generated | Keystatic: **Long-form case study: ...** (one singleton each) |
| Index, market pages, filters | n/a | `app/case-studies/`, `lib/case-study-filters.ts`, `lib/case-study-markets.ts` | Code |

All case studies are real. Client names are withheld under confidentiality.

### 3.7 Careers

Eight open roles, each at `/careers/<slug>`, hand-built (copy of one template), plus the `/careers` index.

| Role | Type and pay |
| --- | --- |
| GTM Strategist | Full-time, Rs 6,00,000 to 15,00,000 a year |
| B2B Lead Gen Strategist | Full-time, Rs 4–7 LPA plus incentives |
| Sales Executive | Full-time, Rs 4–7 LPA |
| Sales and Growth Intern | Full-time internship, Rs 10,000–20,000 a month plus incentives |
| B2B Lead Gen Intern | Full-time internship, Rs 10,000–15,000 a month, freshers welcome |
| Content Marketing Strategist Intern | Internship, Rs 7,000–15,000 a month plus incentives, 1-year minimum |
| HR and Operations Intern | Internship, Rs 7,000–15,000 a month, 6-month minimum |
| Systems & AI Automation Intern | Internship, Rs 7,000–20,000 a month |

Each page carries `JobPosting` structured data with a `validThrough` date (a rolling six months). If that date passes, Google drops the job silently. `npm run audit:jobs` lists every date and warns 45 days ahead. Retired roles redirect to `/careers`.

### 3.8 Free tools (`/tools/*`)

| Tool | URL | Needs lead form? |
| --- | --- | --- |
| ROI Calculator | `/tools/roi-calculator` | No (runs in the browser) |
| Cold Email ROI Calculator | `/tools/cold-email-roi-calculator` | No |
| LinkedIn Hook Grader | `/tools/linkedin-hook-grader` | Yes |
| ICP Builder and Value Proposition Generator | `/tools/icp-builder` | Yes |
| LinkedIn Profile Optimizer | `/tools/linkedin-optimizer` | Yes |
| DM Angle Generator | `/tools/dm-angle-generator` | Runs in a separate app, see Part 13 |
| Competitor Battle Card Generator | `/tools/battle-card-generator` | Yes |
| Case Study and Proposal Generator | `/tools/case-study-generator` | Yes |
| Lead Magnet Idea Generator | `/tools/lead-magnet-ideas` | Yes |
| Posting Rhythm Builder | `/tools/posting-rhythm-builder` | Yes |
| Founder Presence Analyzer | `/tools/founder-presence-analyzer` | Yes |

`lib/tools-registry.ts` is the **one list** of tool names, URLs and taglines. Change it there, not on each page.

### 3.9 Events, people pages, private pages

| Page | URL | Notes |
| --- | --- | --- |
| Events | `/events`, `/events/<slug>` | Event list in `lib/events-data.ts`. A past event shows as "Held" automatically (the page decides from the event's end time and refreshes hourly) |
| Digital visiting cards | `/tejasjhaveri`, `/jahnvijhaveri`, `/enwilfernandes` | Each has a download-contact route under `app/api/vcard/` |
| Live Q&A | `/menti`, `/menti/room` | Small event polling tool, password protected |
| Calendar pages | `/calendar/*` (14 pages) | Booking pages for specific people and campaigns, all noindex |
| Pricing pages | `/plans/mars`, `/plans/earth`, `/plans/neptune`, `/plans/orbit` | Private, see Part 13 |
| Research samples | `/research/myntmore`, `/research/kmspharma` | Sample account research, private |
| Strategy pages | `/value-prop`, `/master-icp` | Private, noindex, not in sitemap |
| Site audit | `/site-audit` | Internal page listing every page, orphan pages and redirects, rebuilt on every deploy |
| CMS admin | `/keystatic` | Editing screen, blocked from search |
| Workshop | `/workshop` | Wrapper around an external app, noindex |

---

## Part 4: How the site is built

**In plain English:** it is a Next.js website. Next.js turns React components into fast web pages. Vercel hosts it. Tailwind CSS and some inline styles do the looks. There is no separate database for page content: content is files in the repository.

| Layer | What we use | Why it matters to you |
| --- | --- | --- |
| Framework | Next.js 14.2.3, App Router, TypeScript | Each folder under `app/` is a URL. `page.tsx` is the page |
| Styling | Tailwind CSS 3 plus inline style objects for brand colours | See Part 8 for the rules |
| Fonts | Inter (self-hosted, `app/fonts`), Fredoka (small labels on content pages), a handwriting font used sparingly | No Google Fonts request at build time |
| UI pieces | A small shadcn-style set in `components/ui/`, icons from `lucide-react`, charts from `recharts` | |
| Animations | CSS plus `framer-motion` in a few places | Every animation must respect `prefers-reduced-motion` |
| CMS | Keystatic (`keystatic.config.ts`) | Writes JSON and `.mdoc` files into the repo |
| AI | Google Gemini via `@google/genai`, called only from server routes | Never expose `GEMINI_API_KEY` to the browser |
| Database | Supabase, one table (`leads`) for the free tools | Secondary copy of tool leads |
| Hosting | Vercel, project `myntmoreclaude` | Deploys from `master` |
| Tests | Vitest (`npm run test:roi`, 31 tests) | Covers the cold email ROI calculator, the hook grader and research scoring (three test files) |
| Package manager | npm. Install with `--legacy-peer-deps` | A peer-dependency conflict otherwise stops installs |

**Folder map**

```
app/                  Pages. One folder per URL. page.tsx is the page, *Client.tsx holds interactive parts
  api/                Server routes (Gemini tools, Keystatic, Menti, vCards)
  components/         Sitewide pieces: Navbar, Footer, Hero, FAQ, Breadcrumbs, JsonLd, forms
  fonts/              Self-hosted Inter
  globals.css         All hand-written CSS: buttons, animations, utilities
  layout.tsx          Root layout: fonts, analytics, schema, metadata template
  sitemap.ts          Builds sitemap.xml
  robots.ts           Builds robots.txt
components/           Feature components: pricing, glossary, city, lp, case-studies, tools, ui ...
content/              Everything the CMS edits (JSON and .mdoc files). See Part 5
lib/                  Shared logic and data: schema builders, colours, entity facts, registries
public/               Static files: logos, photos, llms.txt, llms-full.txt, the IndexNow key file
scripts/              Generators and audits (Part 5 and Part 11)
supabase/schema.sql   The leads table
docs/                 Operating documents: SEO checklists, run reports, briefs (Part 16)
.github/workflows/    indexnow.yml (pings Bing after each production deploy)
keystatic.config.ts   Defines every CMS collection
next.config.js        Redirects, rewrites, canonical headers, image formats
```

Other folders (`brag-output/`, `motion-audits/`, `video-projects/`, `skills-lock.json`) are side projects and tooling, not part of the website.

**Environment variables** (set in `.env.local` locally and in Vercel project settings)

| Variable | Used for | Required |
| --- | --- | --- |
| `GEMINI_API_KEY` | Free tool AI calls | Yes for the tools |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Tool lead logging | Yes for the tools |
| `MENTI_ADMIN_PASSWORD` | Opens `/menti/room`. No default | Yes if you use Menti |
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO` plus four Keystatic GitHub values | Live editing at `/keystatic` | Only for live editing. Without the repo variable the CMS saves to local files |

Secrets are never committed. There is no `.env.example`.

---

## Part 5: The content system and the CMS

### 5.1 The idea

Most pages work like this:

```
content/<type>/<slug>.json   (you edit this, in Keystatic or a text editor)
        |
        v   a generator script runs before every build
app/.../<slug>/page.tsx      (thin generated page: real title, description, keywords)
        |
        v
shared component             (draws the page from the JSON)
```

The generated page is "thin on purpose": it holds only the metadata as plain text. Why: the sitemap, `llms-full.txt`, keyword and site-audit tools read page files, and they need to see a real title without running React.

**Never edit a generated page.** Its first line says: "Generated by scripts/... Edit the data, not this file." Your edit would be overwritten on the next build.

### 5.2 What runs on every deploy (the "prebuild" chain)

When Vercel builds, `npm run build` first runs these steps in order (defined in `package.json`):

| Step | Script | What it does |
| --- | --- | --- |
| 1 | `generate-faq-content.mjs` | Turns FAQ JSON into `lib/faq-content.generated.json` and `lib/page-faqs.generated.json` |
| 2 | `generate-case-study-content.mjs` | Builds `lib/case-study-library.json` from the 50 library cases |
| 3 | `generate-case-study-pages.mjs` | Writes one page and one sitemap entry per library case |
| 4 | `generate-landing-pages.mjs` | Writes the `/lp/*` pages |
| 5 | `generate-service-pages.mjs` | Writes the service pages |
| 6 | `generate-glossary-pages.mjs` | Writes the 51 term pages, the A-Z index data and the sitemap lines |
| 7 | `generate-city-pages.mjs` | Writes the 8 city pages |
| 8 | `generate-case-study-detail-pages.mjs` | Writes the 20 detailed case study pages, cards and sitemap lines |
| 9 | `generate-case-study-long-pages.mjs` | Writes the 12 long-form case study pages |
| 10 | `generate-site-map.mjs` | Rebuilds `app/site-audit/data.json` (the `/site-audit` page) |
| 11 | `generate-llms-full.mjs` | Rebuilds `public/llms-full.txt` |
| 12 | `generate-sitemap-dates.mjs --check` | Warns if sitemap dates are stale (does not stop the build) |

Each generator also has a `:check` command (for example `npm run glossary:check`) that fails if a generated file is out of date. Use it before pushing.

### 5.3 The CMS (Keystatic)

Keystatic is the editing screen. It has **no database**: saving writes a file into the repository, and Vercel deploys it like any other change.

| In the admin | Writes to | Page it feeds |
| --- | --- | --- |
| Homepage FAQs | `content/faqs/homepage/` | Homepage FAQ section and its schema |
| Page FAQs | `content/faqs/pages/<page>.json` | FAQs on services, city, landing, guides, blogs, tools (entry names start `city-`, `lp-`, `service-`, `blog-`, `guide-`, `tool-`) |
| Landing pages (ICP) | `content/landing-pages/` | `/lp/*` |
| Service pages | `content/service-pages/` | `/services/*` |
| Service copy (3 singletons) | `content/service-copy/` | Cold email, LinkedIn outreach, Do It Yourself copy |
| City pages | `content/city-pages/` | `/b2b-lead-generation-*` |
| Case studies | `content/case-studies/` | 50 library cases |
| Case studies (detailed) | `content/case-study-pages/` | 20 detailed cases |
| Long-form case study (12 singletons) | `content/case-study-long/` | 12 long-form cases |
| Glossary terms | `content/glossary/` | 51 term pages |
| Blog posts | `content/posts/*.mdoc` | All blog posts |

**Two ways to use it**

1. **On a computer:** run `npm run dev`, open http://localhost:3100/keystatic, edit, then commit and push like any change.
2. **Live at myntmore.com/keystatic:** needs a one-time GitHub app setup (steps in `docs/cms-setup.md`). Sign-in is GitHub, so only people with write access can edit. Each save becomes a commit and a deploy. **We have not confirmed that the live admin is switched on or tested the editing screens in a browser.** Until the four Keystatic values are in Vercel, the live `/keystatic` returns 404.

**Fields every blog post has:** title, search title, description (120 to 155 characters), keywords, category, accent colour, published switch, dates, answer-first summary (40 to 60 words), body, FAQs (2 to 5), related links, call-to-action box, free-tool callouts. A post with **Published** off is invisible everywhere.

**Good to know:** a new case study or glossary term appears after the next deploy, but its sitemap *date* only updates after it is committed (dates come from git, see Part 10).

---

## Part 6: Tools and accounts: what each one does

| Tool | What we use it for | Where it connects to the site |
| --- | --- | --- |
| **GitHub** (`aitoolsteejay/myntmore-website`, old name `ClaudeCode` still redirects) | Stores the code and content. `master` is production | Every push can start a Vercel build |
| **Vercel** (project `myntmoreclaude`, id `prj_vd4uktjtfBS9nfUVC2xxEAzYeIxA`, team `aitoolsteejays-projects`) | Builds and hosts the site. Also Vercel Analytics (visitors, referrers) and Speed Insights (page speed) | Deploys from `master`. Branch pushes make preview builds |
| **Keystatic** | Editing screen for content | `/keystatic`, reads and writes files in `content/` |
| **Google Search Console** (use the domain property `sc-domain:myntmore.com`, not the bare apex property) | Search clicks, impressions, indexing, sitemap | Verified by DNS. Both sitemap addresses are submitted |
| **Google Analytics 4** (id `G-PEY6FXLPMH`) | Site traffic | Script in `app/layout.tsx` |
| **Ahrefs Analytics** | Second traffic and referral view | Script in `app/layout.tsx` |
| **Bing and IndexNow** | Tells Bing which pages changed, so ChatGPT search and Bing see edits within hours | `.github/workflows/indexnow.yml` runs after each successful production deploy. Key file `public/33c4ec0413cf7003402388f4fb732426.txt`. Script `scripts/indexnow.mjs`. Bing Webmaster Tools is not verified (not needed for IndexNow) |
| **Zoho CRM** | The main record of every lead. Website leads have Lead Source = "Website" | Fed by the Zoho forms below |
| **Zoho Forms** (account path `flintstop`) | Receive every form post: the main contact form, the lead-magnet form, and one form per tool | Form posts go straight to Zoho, then redirect to `/thank-you` |
| **Zoho Bookings** (`meetingwithteejay.zohobookings.com`) | The 30-minute call booking calendar | Embedded on `/book-a-call`. We cannot see its settings from the repo, so check there that only a 30-minute service is active |
| **Zoho Campaigns** | The newsletter "The Outbound Operator" | The sign-up form posts to a Zoho Campaigns list |
| **Supabase** | Secondary copy of free-tool leads (`leads` table). Also powers Menti | `lib/supabase.ts` |
| **Google Gemini** | The AI behind the free tools | `app/api/**/route.ts` only |
| **Lovable** (`mynt-more-angles.lovable.app`) | A separate app that runs the DM Angle Generator | Shown inside our site through a rewrite |
| **Medium** (`@myntmore`) | Blog index also lists Medium posts | Fetched hourly by `/resources/blogs` |
| **Instagram** | Floating reel promo and the embed on some pages | `app/components/ReelWidget.tsx`, `InstagramEmbed.tsx` |
| **Notion** | Weekly KPI scorecard drafts | Not connected to the code |
| **Supermetrics, Zoho and Vercel connectors in Claude** | Pull numbers for the weekly scorecard | Used by assistants, not by the site |

**Data tools and their quirks**

- Search Console inspection tools check **10 URLs per call**.
- The "five brand filters" query for non-brand traffic has failed through the current Search Console connector since 6 Nov. The workaround: pull with one filter (exclude "myntmore") and remove the few "mint more" and "tejas jhaveri" rows by hand.
- The Search Console connection sometimes times out. Retry later.
- ChatGPT blocks automated browsers, so the AI citation check must be done by a person in a private window.

---

## Part 7: Forms, leads and bookings

**How a lead gets in**

| Where | Form | Goes to |
| --- | --- | --- |
| Contact page, lead capture blocks, landing pages | Zoho form "MyntmoreWebsiteform" | Zoho CRM, then `/thank-you` |
| Free tools (except the two calculators and the DM tool) | `LeadGate.tsx` collects name, email, phone, then the tool runs | One Zoho form per tool **and** a row in Supabase `leads`. Zoho is the main record, Supabase the backup |
| Newsletter | `NewsletterForm.tsx` | Zoho Campaigns list |
| Booking | `/book-a-call` | Zoho Bookings. A 30-minute call only |
| Job applications | Email buttons | founder@myntmore.com and growth@myntmore.com together |
| Event feedback | A Zoho feedback form | Zoho |

**Source tracking (added 10 Nov 2026).** Every Zoho form now sends the visitor's first landing page and where they came from, in Zoho's `zf_referrer_name` field. It looks like `organic | google.com | landing /services | page /contact-us`. The first visit is remembered in the browser for 30 days. The code is `lib/lead-source.ts` and `app/components/LeadSource.tsx`. Medium values: `organic`, `social`, `ai`, `referral`, `direct`, or the UTM medium if the link had one. **Before this change the field was always empty, so organic leads could not be counted.** It will only show in Zoho once the deploy is live and a real lead arrives, and we have not yet confirmed how Zoho displays it.

**Booking rule:** the only call we offer is the free 30-minute strategy or GTM audit call. The 1-hour session was removed from `/contact-us` and `/1-on-1-consultation` on 11 Nov 2026.

**The Menti tool:** a live Q&A for talks. Admin password in `MENTI_ADMIN_PASSWORD`.

---

## Part 8: Design rules

### 8.1 Colours

| Use | Hex | Note |
| --- | --- | --- |
| Page background | `#F8F6F2` (cream) | White `#FFFFFF` for cards |
| Main text and headings | `#0A0A0A` | |
| Body text | `#52525B` | |
| Muted text | `#71675E` | |
| Borders | `#E8E2D9` | |
| Brand gold | `#F5B731` | **Fills, borders, dots, underlines, and text on dark sections only** |
| Gold as text on light backgrounds | `#A14A08` | Exported as `GOLD_TEXT` in `lib/colors.ts` |
| Soft gold panels | `#FEF9EC` | |
| Accent rotation for tiered content | Blue `#3B82F6`, purple `#7C3AED`, orange `#F97316`, teal `#14B8A6`, green `#10B981`, plus gold | For service icons, tier cards, table sections |

**The contrast rule:** coloured text on a light background must pass the accessibility contrast test (4.5:1). Brand gold as text fails it. Always run an accent colour through `textTone(accent)` from `lib/colors.ts`, which returns a darker shade of the same hue.

### 8.2 Fonts

| Font | Where |
| --- | --- |
| **Inter** | Everything: body, headings (weight 900) |
| **Fredoka** | Small uppercase labels on the content hub only (blogs, glossary, guides) |
| **Caveat (handwriting)** | A few short accents on the homepage and Do It Yourself page |
| System monospace | Code blocks in guides (not a loaded font, looks different per device) |

### 8.3 Buttons and links (classes in `app/globals.css`)

| Class | Look and use |
| --- | --- |
| `btn-dark` | Primary call to action: near-black pill. Same on 246 pages |
| `btn-ghost` | Secondary button |
| `btn-mint` | Gold button used in specific sections |
| `link-subtle`, `link-muted`, `link-dark` | Text links with hover colours |
| `glass-card` | Frosted card used in places |

### 8.4 Layout and accessibility rules

- Wrap normal pages in `InnerLayout` (navbar, footer, cream background).
- **Mobile first.** Multi-column grids need a one-column base (`grid-cols-1`) that stacks on small screens.
- **Tap targets at least 44px** (`min-h-[44px]`) for links and buttons.
- **No text smaller than 12px.**
- **Every table gets a horizontal scroll wrapper** so it never breaks a phone screen. The pricing table header is the exception (it is pinned, see below).
- **Every animation respects `prefers-reduced-motion`**, in CSS and in any JavaScript animation loop.
- Scroll reveals use `FadeIn.tsx`. Count-up numbers use `StatTicker.tsx`, which always shows the exact pre-formatted text at the end. Never reformat a number. Indian numbers keep their grouping (Rs 1,74,999).
- Decorative blurred blobs can be wider than the screen only when they are `aria-hidden`, `pointer-events-none` and inside a clipped section.
- **Do not put `overflow: hidden` or `overflow-x: hidden` on parents of anything that must be sticky.** Use `overflow-clip`. This is why the pricing table header could be pinned (see Part 12).

### 8.5 Shared components (high impact: a change affects many pages)

| Component | Job |
| --- | --- |
| `Navbar.tsx` | Fixed header with the Services and Resources dropdowns. Links come from arrays at the top of the file |
| `Footer.tsx` | Sitewide footer |
| `InnerLayout.tsx` | Standard page wrapper |
| `Breadcrumbs.tsx` | The visible trail and its BreadcrumbList schema |
| `JsonLd.tsx` | Prints structured data |
| `FAQ.tsx`, `AnswerBlock.tsx` | FAQ accordion and the answer-first summary block |
| `CTABanner.tsx`, `Hero.tsx`, `Results.tsx`, `Testimonials.tsx` | Homepage and shared sections |
| `ReelWidget.tsx`, `EventPopup.tsx` | Timed promo popups |
| `LeadCaptureForm.tsx`, `NewsletterForm.tsx`, `LeadSource.tsx` | Forms |
| `components/pricing/GrowthPlansPricing.tsx` and `OrbitHero.tsx` | The pricing pages |
| `components/glossary/GlossaryTerm.tsx`, `city/CityPage.tsx`, `lp/LandingPage.tsx`, `case-studies/CaseStudyLayout.tsx` | One template per page type |

### 8.6 The pricing pages

`/plans/[code]` is the only dynamic route. The code maps to a price list:

| Code | Currency | Notes |
| --- | --- | --- |
| `mars` | USD | International |
| `earth` | INR plus GST | India. Earth planet has crisp continents |
| `neptune` | USD | Higher USD tier |
| `orbit` | separate page `app/plans/orbit/` | The Orbit plan |

The hero planet is lavender (that look was approved). Plan cards keep their blue, orange and teal accents (approved). The comparison table header ("Feature / plan names") stays pinned under the site header while scrolling. To add a variant, add a key to `PLANS` in `app/plans/[code]/page.tsx` with all five prices. The pages are `noindex` and not linked anywhere.

### 8.7 Known design drift (from the 16 Oct audit, `docs/design-uniformity-audit-2026-10-16.md`)

Fonts are very uniform. Colours are mostly uniform but have five near-identical greys, four near-blacks, three golds and about 6,400 hand-typed colour values. The audit lists nine fixes. The tools pages use their own colour system on purpose. Decisions still open: one paragraph colour for guides and glossary, whether Fredoka labels go sitewide, and whether the tools keep their own palette.

---

## Part 9: Copy and content rules

**Voice:** direct, specific, confident, no hype. Say what we do and what the buyer gets. Short sentences.

**Hard rules**

| Rule | Detail |
| --- | --- |
| No em dashes | Use a comma, colon or full stop. Use an en dash for ranges: 10,000–15,000. A sitewide pass removed them all |
| Real facts only | No invented numbers, quotes, testimonials, clients or awards. A new offer with no track record gets honest "new, no data yet" wording |
| Canonical proof points | Exactly: 12K+ meetings booked, $120M+ pipeline, 130+ B2B companies. Run `npm run audit:entity` to find conflicts |
| Client names withheld | Case studies never name clients |
| No prices | Not on public pages. Not estimated. Prices only on `/plans/*` |
| Calls are 30 minutes | Say "30-minute strategy call" or "free 30-minute GTM audit" |
| No guarantees from tools | Tool output is AI-generated and can be wrong |
| Cite statistics | Every outside statistic needs a named, real source. If it cannot be confirmed, leave it out |
| City pages are not offices | Say "serving" a city, never "our office in" a city |
| Sample pages are samples | The `/research/*` pages are labelled samples |
| Indian number format | Rs 1,74,999 style for rupees |

**Page rules (checked automatically by `scripts/seo-crawl.py`)**

| Item | Rule |
| --- | --- |
| Title | Up to 60 characters in total. The site adds " \| Myntmore" automatically through the title template, so do not add it yourself |
| Meta description | Up to 160 characters (aim for 120 to 155) |
| H1 | Exactly one per page |
| Canonical | The page's own address on `www` |
| Primary keyword | The first entry in the page's `keywords` list. One page per primary keyword, sitewide (`docs/keyword-map.md`) |
| FAQ answers | 40 to 60 words, answer in the first sentence, no "it depends" or "great question" opener |
| Summary block | A blog post opens with a 40 to 60 word answer-first summary containing one number and one named thing |
| Updated date | Change "date modified" only after a real edit |
| Links | Add 3 or more links to other pages, and link back from related pages (bidirectional) |
| Breadcrumbs | Every public page has them |

**Call-to-action wording:** "Book a Free GTM Audit", "Book Free 30-Min Audit", "Book a Call". All go to `/book-a-call`.

---

## Part 10: SEO, AEO and GEO: how the site gets found

**Three words, plain English**

- **SEO:** ranking in Google.
- **AEO (answer engine optimisation):** being the answer quoted in a Google answer box or voice result.
- **GEO (generative engine optimisation):** being cited by ChatGPT, Claude, Perplexity, Gemini and Copilot.

### 10.1 What every page carries

| Signal | How it is produced |
| --- | --- |
| Title and description | Page `metadata`, with the title template "%s \| Myntmore" |
| Canonical | `<link rel="canonical">` in the page **and** a `Link` canonical HTTP header (added because Google picked another site's page as canonical for some of ours, see 10.5) |
| Open Graph (share previews) | Page `metadata`, image `/og-image.png` |
| Structured data (JSON-LD) | Builders in `lib/schema.ts`: Organization, LocalBusiness, FAQPage, Service, WebApplication, DefinedTerm, BreadcrumbList, WebSite, HowTo, Article, Event, JobPosting, CollectionPage, WebPage |
| Breadcrumbs | `Breadcrumbs.tsx` (shows and outputs schema) |
| Sitemap entry | `app/sitemap.ts`, with a real `lastModified` from git |
| `llms-full.txt` line | Generated from the pages |

### 10.2 Sitemap

- `sitemap.xml` has **268 URLs**. It is built from a list in `app/sitemap.ts` plus blocks the generators write between marker comments.
- **Dates come from git, never typed by hand.** `npm run sitemap:dates` rewrites `lib/sitemap-dates.json` from the last commit that changed each page. Run it after committing page edits, then commit the result. `scripts/sitemap-dates-ignore.txt` lists commits that touched many pages without changing what they say, so they do not move a date.
- A new page needs a line in `app/sitemap.ts` (unless a generator owns it), and an entry on the human `/sitemap` page.
- Submit `https://www.myntmore.com/sitemap.xml` in Search Console.

### 10.3 Robots and AI crawlers

`app/robots.ts` allows everything except `/keystatic`, `/api/keystatic` and the DM tool's sub-paths. It also names 15 AI crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, meta-externalagent, Amazonbot, DuckAssistBot, MistralAI-User, CCBot) so it is explicit they are welcome.

### 10.4 Files written for AI

| File | What it is |
| --- | --- |
| `public/llms.txt` | Short, curated summary: company, services, key pages, and "Questions these pages answer" |
| `public/llms-full.txt` | Long reference, generated from the site. Run `npm run llms:build`. `npm run llms:check` fails if the committed file is stale |
| `lib/entity-facts.json` | The facts that must match everywhere |
| `lib/service-answers.json` | Direct-answer definitions for each service |
| `docs/ai-visibility-prompts.csv` | 163 questions we want AI tools to answer with Myntmore |
| `docs/ai-visibility-tracker.csv` | Where results are logged (done by hand) |

**IndexNow** (Bing and others) is automatic: after each successful production deploy, a GitHub workflow submits the pages whose sitemap date changed.

### 10.5 The wrong-canonical problem (still open)

Google picked other websites' homepages (a betting site and others) as the canonical for some Myntmore pages, with no declared canonical on record. Our pages are correct (200 status, self canonical, real content, identical to Google's crawler and a normal browser). The records are old crawls. As of 5 Nov 2026, **18 of 19 pages were still affected** (for example `/services`). The fix is to open each URL in Search Console, run **Test Live URL**, check the screenshot shows our page, then click **Request Indexing**, about 10 a day. The list is in `docs/gsc-request-indexing-list.md`. **Only a person signed in to Search Console can do this.** If a live test ever shows someone else's content, treat it as a security incident.

### 10.6 Internal linking and audits

Run these (all are npm scripts):

| Command | What it checks |
| --- | --- |
| `npm run audit:links` | Needs a build first. Crawls the built site: broken links, redirect problems, sitemap and canonical problems, `llms` files |
| `npm run audit:answers` | FAQ and answer copy length and shape |
| `npm run audit:entity` | Conflicting proof-point numbers |
| `npm run audit:jobs` | Job posting dates and apply addresses |
| `python3 scripts/seo-crawl.py` | Crawls the **live** sitemap: status, title, description, canonical, h1, JSON-LD, duplicates. Reports Site Health % and Schema % |
| `/site-audit` page | Every page, whether it is linked or orphaned |

### 10.7 The recurring SEO routine

Full detail is in `docs/seo-checklist.md`, `docs/seo-aeo-geo-cadence.md` and the weekly run reports. The weekly list is 15 tasks:

| Task | In one line |
| --- | --- |
| W1 | Run `scripts/seo-crawl.py`: Site Health 100%, Schema no lower than last week |
| W2 | Sitemap live with the right count, robots has the Sitemap line |
| W3 | Search Console: no manual actions or security issues (needs a person) |
| W4 | Inspect `/`, `/services` and pages edited in 14 days: Google's canonical must be our own |
| W5 | Indexing errors: no new 5xx, soft 404, blocked or redirect errors |
| W6 | Core Web Vitals: zero poor URLs |
| W7 | Weekly search snapshot and drops |
| W8 | Fill the KPI scorecard |
| W9 | Newsletter sent with a tagged link |
| W10 | Post every new page on LinkedIn within 48 hours, with UTM tags |
| W11 | Keep at least 4 ready content briefs |
| W12 | Events page has no past events listed as upcoming |
| W13 | Careers accurate, `validThrough` at least 7 days ahead, closed roles redirect |
| W14 | Organic lead attribution matches Zoho |
| W15 | Forms and booking links work (use test records only) |

Latest run: `docs/seo-weekly-run-2026-11-06.md`.

### 10.8 The KPI scorecard (definitions must never change silently)

Weeks run Monday to Sunday. Search Console lags two to three days, so a Monday pull can still revise the last day.

| Card | Exactly how it is measured |
| --- | --- |
| Organic leads | Zoho Leads created in the week with Lead Source "Website". This is an upper bound until the new source tracking has data |
| Non-brand clicks and impressions | Search Console `sc-domain:myntmore.com`, queries **excluding** myntmore, mintmore, mint more, mint and more, tejas jhaveri. Anonymised queries are not included |
| Queries ranking in top 10 | Non-brand queries with average position under 10 for the week (hand-counted, about plus or minus 3) |
| City pages on page 1 | Of the 8 city pages, how many have average position 10 or better |
| Submitted pages | URLs in `sitemap.xml` as Search Console reports them |
| Indexed pages | URL Inspection "Submitted and indexed" across every sitemap URL (10 per call) |
| Site health check | % of sitemap URLs passing every check in `seo-crawl.py` |
| Schema coverage | % of sitemap URLs with page-specific JSON-LD (beyond Organization and Breadcrumbs) |
| AI referral sessions | Vercel Analytics visitors whose referrer is chatgpt.com, perplexity.ai, claude.ai, gemini.google.com or copilot.microsoft.com |
| AI citation rate | 10 fixed prompts run in a logged-out ChatGPT window; a hit means Myntmore is named or linked |
| Blog traffic (extra row) | Vercel pageviews on `/resources/blogs/*` posts, plus Search Console pages containing `/blog` |

**Latest numbers:** week of 2 to 8 Nov 2026: non-brand clicks 8, impressions 2,372, about 190 top-10 queries, 3 of 8 city pages on page 1, 268 submitted, site health 100%, schema 96.6%, AI referrals 0, organic leads 0. (Indexed count was not finished.)

---

## Part 11: Git, deploys and quality checks

### 11.1 Branches and who does what

| Item | Rule |
| --- | --- |
| Production | `master`. Merged changes deploy automatically to myntmore.com |
| Working branch | `cms-keystatic-pilot` has been the long-running working branch |
| Standing workflow | The assistant pushes to the working branch. The owner then merges to `master` on GitHub, or says "push to master" and the assistant pushes directly |
| Before pushing | Fetch and merge `origin/master` first. Another session may also push |
| Remote | Use the **SSH** address `git@github.com:aitoolsteejay/...`. HTTPS pushes have failed here |
| Old repo name | `ClaudeCode` redirects to `myntmore-website`. Git prints a "repository moved" notice. Harmless |
| Worktrees | Work happens in `.claude/worktrees/...`. Do not run bare `git stash` (the stash list is shared) |
| `tsconfig.tsbuildinfo` | Changes whenever the type check runs. Run `git checkout tsconfig.tsbuildinfo` before a merge or commit |
| Commit messages | Plain sentence of what and why. Assistants end them with a co-author line |

### 11.2 Deploying

1. Push to `master`. Vercel starts a **production** deployment.
2. Wait for state **READY**. It takes about 2 to 3 minutes.
3. Check the live page with a cache-busting fetch (add `?cb=<number>` to the URL).
4. IndexNow then pings Bing automatically.

**Blocked deployments.** Some deployments of commits pushed by the assistant showed **BLOCKED** (Vercel's error points to its team-configuration page). Deployments from the owner's own GitHub merges were not blocked, and later assistant pushes built normally, so the cause was never confirmed. If a deployment is blocked: open it in Vercel and redeploy, or push a small commit from an account that is on the Vercel team. A re-push of the same commit does nothing; an empty commit starts a fresh deployment.

Branch pushes also create preview builds at `*.vercel.app`. These are not the live site.

### 11.3 Checks to run before pushing

| Step | Command | Why |
| --- | --- | --- |
| 1 | `npx tsc --noEmit` | Type errors |
| 2 | `npm run build` | The real test. Also runs all generators. Stop any running dev server first (they share `.next`) |
| 3 | `npm run audit:links` | Broken links. Needs the build from step 2 |
| 4 | `npm run test:roi` | Unit tests (31) |
| 5 | The `:check` scripts (`glossary:check`, `city-pages:check`, `service-pages:check`, `case-study-pages:check`, `case-study-long:check`, `landing-pages:check`, `faqs:check`, `llms:check`, `sitemap:check`) | A generated file is out of date |
| 6 | `npm run audit:entity`, `audit:answers`, `audit:jobs` | Content rules |
| 7 | `npm run sitemap:dates`, then commit | Fresh sitemap dates |
| 8 | After deploy: `python3 scripts/seo-crawl.py` | Live Site Health |

There is no ESLint setup (`next lint` only asks to create one).

### 11.4 Dev server

`npm run dev` runs on port 3100. If you see strange build errors: delete `.next` and restart, and check for a stale `next dev` still running on the port (`lsof -nP -iTCP:3100 -sTCP:LISTEN`, then kill it).

---

## Part 12: How-to recipes

**Change text on a page that uses a template** (service, city, landing, glossary, case study)
Edit its entry in Keystatic or edit its JSON in `content/`. Run its `:check` script, build, commit.

**Add a blog post**
Keystatic, **Blog posts**, Add. Fill the answer-first summary, description (120 to 155), 2 to 5 FAQs, links. Save, commit. It gets its page, blog-index card, sitemap entry and `llms-full.txt` line automatically. Run `npm run llms:build` and `npm run sitemap:dates`.

**Add a glossary term**
Keystatic, **Glossary terms**, Add. Short terms need a definition and a supporting paragraph. Long terms use the **Sections** fields (paragraphs, numbered steps, comparison table). The page, A-Z card and sitemap line generate on the next build.

**Add a city page**
Add `content/city-pages/<city>.json` and `content/faqs/pages/city-<city>.json`, add one line to `app/sitemap.ts`, run `npm run city-pages:build`.

**Add a case study**
Short format: Keystatic, **Case studies**. Detailed: **Case studies (detailed)**. The page, listing card and sitemap line are generated. Real clients only.

**Add a job posting** (copy the closest existing page)
1. Copy `app/careers/<similar-role>/page.tsx` to a new folder.
2. Rewrite metadata, `JOB_SCHEMA` (real posted date, `validThrough` six months out, salary), headings and copy.
3. Add a card to `ROLES` in `app/careers/CareersClient.tsx`.
4. Add a line to `app/sitemap.ts` and a link in `app/sitemap/page.tsx`.
5. Run `npm run audit:jobs` and `npm run sitemap:dates`.

**Remove or rename a page**
Add a permanent redirect in `next.config.js` (never just delete). Remove it from `app/sitemap.ts`. Run `npm run audit:links`.

**Add a free tool**
Page under `app/tools/<slug>/`, client component under `components/tools/<slug>/` using `LeadGate`, route under `app/api/tools/<slug>/route.ts`, an entry in `lib/tools-registry.ts`, a Zoho form and its address in `LeadGate.tsx`, a sitemap line, FAQs.

**Add a pricing variant**
Add a key to `PLANS` in `app/plans/[code]/page.tsx` with all five prices. Do not create a new page.

**Change the phone number or email**
Edit `lib/entity-facts.json`, then search the repo for the old value (it also appears in the footer, contact page, privacy policy, schema and `llms.txt`).

**Pin a table header** (done on the pricing table)
Make the header cells `sticky`, give them a solid background, and remove every `overflow-hidden` or `overflow-x-hidden` on the way up (use `overflow-clip`). On phones, let the table scroll inside its own box.

**Update the weekly scorecard**
Follow the definitions in Part 10.8. Save numbers to a file as you go. Never change a definition without restating the earlier weeks.

---

## Part 13: Private and unlisted pages, redirects and rewrites

### 13.1 Private pages (never in the sitemap, always `noindex`)

| Page | Purpose |
| --- | --- |
| `/plans/mars`, `/plans/earth`, `/plans/neptune`, `/plans/orbit` | Pricing shared directly with a prospect |
| `/value-prop`, `/master-icp` | Internal strategy: 29 ICPs and the 2026 ICP direction. Also kept off `/site-audit` |
| `/research/myntmore`, `/research/kmspharma` | Account research samples |
| `/calendar/*` | Booking pages for specific people and campaigns |
| `/workshop`, `/jahnvijhaveri`, `/agency-vs-in-house`, `/thank-you` | Noindex utility pages |
| `/site-audit` | Internal audit |
| `/keystatic`, `/api/keystatic` | CMS admin. Also blocked in robots |

### 13.2 Redirects (`next.config.js`)

About 37 permanent redirects (308), grouped by reason: renamed pages (`/about` to `/about-us`, `/contact` to `/contact-us`), the old `/blog/*` to `/resources/blogs/*`, legacy WordPress and Instagram links, retired job roles to `/careers`, and pricing and guide renames. **Always use `permanent: true` in config**, never `redirect()` inside a page (that sends a temporary 307).

### 13.3 Rewrites and headers

- `/tools/dm-angle-generator` and everything under it is served from `mynt-more-angles.lovable.app`. Robots blocks the sub-paths so crawlers do not wander the other app.
- Every HTML page also gets a `Link: <address>; rel="canonical"` header (not for files, `_next`, `api`, `fonts`, or the DM tool).

---

## Part 14: Decisions we have made, known problems and open items

### 14.1 Decisions (do not undo without asking)

| Date | Decision |
| --- | --- |
| 2026-10 | Master is the production branch. The assistant pushes to a branch, the owner merges (or says "push to master") |
| 2026-10 | The tools use the brand palette (orange and gold on cream). Older tool pages are still partly off-theme |
| 2026-11-06 | Pricing plan cards keep their blue, orange and teal accents ("I like the plan cards as they are") |
| 2026-11-06 | The pricing hero planet stays lavender. The Earth planet was redrawn with crisp continents |
| 2026-11-10 | **Calls are 30 minutes only.** The 1-hour session was removed from the site |
| Ongoing | robots.txt stays open to AI crawlers. `llms.txt` is the AI summary (a robots.txt "AI file" would do nothing) |

### 14.2 Known problems and open items

| Item | Status |
| --- | --- |
| 18 pages with a wrong Google canonical (e.g. `/services`) | Needs Search Console Test Live URL then Request Indexing by a person (10.5) |
| Indexed-pages count for the 2 to 8 Nov week | Not finished; last count was 158 of 265 on 30 Oct |
| Gmail and Yahoo sender-requirements post | Drafted in `content/posts/gmail-and-yahoo-sender-requirements.mdoc`, unpublished, needs a fact-check |
| How to describe LinkedIn automation | Owner decision pending; blocks one content brief |
| Zoho Bookings may still have a 1-hour service | Check inside Zoho; cannot be seen from the repo |
| Live Keystatic admin | Not confirmed switched on; screens not tested in a browser |
| Speed Insights | Installed in code. Turn it on in the Vercel project's Speed Insights tab |
| Source tracking field | Deployed code, but Zoho's display of `zf_referrer_name` is unconfirmed |
| Zoho form links | Some form links returned 404 earlier and were never confirmed fixed. The submit endpoints currently respond |
| AI citation rate | Never measured; needs a person to run 10 prompts in ChatGPT |
| Manual actions and security check | Needs a person in Search Console |
| Core Web Vitals | No reading yet (PageSpeed quota and no UI access) |
| 39 glossary entries under 300 words, 9 blog posts thin | Content backlog |
| 9 pages with no page-specific schema | Mostly guides and `/resources/feed` |
| Privacy policy, guide bio claims, testimonials | Need real, checked wording or real quotes |
| Bengaluru city page | Average position about 55; needs content and links |
| Content briefs | Only 2 ready (target 4) |
| Old docs (`README.md`, `MYNTMORE_MANUAL.md`, `HANDOFF.md`, `docs/cms-setup.md` partly) | Out of date; this document supersedes them |
| `/site-audit` link to `/founder-meeting` | Intentional (it lists redirects) |
| Design drift | Nine fixes listed in the 16 Oct audit, some awaiting decisions |

---

## Part 15: Plain-English glossary

| Word | Meaning |
| --- | --- |
| ABM | Account-based marketing: aiming outreach at a short list of named companies |
| AEO / GEO | Optimising to be the quoted answer in answer boxes (AEO) or in AI tools like ChatGPT (GEO) |
| App Router | Next.js's folder-based page system. A folder with `page.tsx` is a URL |
| Breadcrumbs | The "Home / Resources / Blog" trail at the top of a page |
| Canonical | The one official address of a page. Tells Google which copy to index |
| CMS | Content management system: a screen for editing content without code (ours is Keystatic) |
| Core Web Vitals | Google's page-speed and stability scores |
| CTR | Click-through rate: clicks divided by impressions |
| Entity facts | Facts about the company that must be identical everywhere |
| Generated file | A file a script writes. Never edit it by hand |
| GTM | Go-to-market: how a company reaches and wins buyers |
| ICP | Ideal customer profile: the kind of company and buyer you want |
| Impression | One time a page appeared in search results |
| IndexNow | A way to tell Bing a page changed so it re-checks quickly |
| JSON | A simple text format for data. Our content is stored as JSON files |
| JSON-LD / schema | Hidden labels in a page that tell search engines what it is (an article, a job, an FAQ) |
| Keyword | A phrase people type into search. Each page has one primary keyword |
| LeadGate | Our form that asks for contact details before a free tool shows its result |
| `.mdoc` | The file format for blog posts (Markdown with extra fields) |
| Noindex | An instruction telling search engines not to list a page |
| Orphan page | A page nothing links to |
| Preview deployment | A temporary test copy of the site built from a branch |
| Redirect (308) | A permanent "this page moved" |
| Sitemap | A list of every page, for search engines |
| Slug | The last part of a URL (`hot-lead` in `/resources/glossary/hot-lead`) |
| Sticky | Stays in view while you scroll |
| Thin page | A page generated with literal metadata and a call to a template |
| UTM | Tags added to a link to say where a click came from |
| `validThrough` | The date a job posting expires in Google's eyes |

---

## Part 16: Where everything else is documented

| File | What it is | Fresh? |
| --- | --- | --- |
| `docs/website-bible.md` | This document | Yes (2026-11-11) |
| `docs/cms-setup.md` | CMS usage and live-editing setup | Mostly current; some counts are old |
| `docs/seo-checklist.md` (also `.html`, `.notion.md`) | The full recurring SEO checklist (weekly, monthly, quarterly) | Current |
| `docs/seo-aeo-geo-cadence.md` | Triggered, weekly, monthly, quarterly task rules | Current |
| `docs/seo-weekly-run-*.md`, `docs/seo-biweekly-run-*.md` | Reports from each run | Dated |
| `docs/keyword-map.md` | Every page's primary keyword (no collisions allowed) | Dated 2026-10-30 |
| `docs/keyword-research-2026-11.md`, `docs/keywords/` | City, ICP and city-times-ICP keyword lists | 2026-11 |
| `docs/content-gaps.md`, `docs/content-briefs-2026-10-16.md` | What to write next, and five briefs | Current |
| `docs/featured-snippet-audit.md` | FAQ answer shape audit | Dated |
| `docs/design-uniformity-audit-2026-10-16.md` | Font and colour audit | Dated |
| `docs/gsc-*.md` | Search Console baselines and the Request Indexing lists | Dated |
| `docs/ai-visibility-*.md/.csv` | AI citation prompts and tracker | Current |
| `docs/linkedin-distribution-drafts-2026-10-16.md` | LinkedIn post drafts | Dated |
| `README.md`, `MYNTMORE_MANUAL.md`, `HANDOFF.md` | Older general docs | **Out of date, superseded** |
| `lib/entity-facts.json` | The facts file | Source of truth |

**Keeping this document current**

Update it in the same commit when you: add or remove a page type, add a tool or account, change a rule, change the deploy process, make a decision, or close an open item. Change the "Last updated" date at the top. If a fact here disagrees with the code, the code is right: fix this document.
