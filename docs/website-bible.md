# The Myntmore Website Bible

**What this is:** the one document that explains the whole myntmore.com website: what is on it, where every part lives, which tool does what, and the rules we follow. Written in plain language so a new teammate, a freelancer or an AI assistant can pick it up and work safely.

**Last updated:** 2026-11-11. **Written from:** the live repository, the Vercel and Search Console data, and every decision made so far. Where something could not be checked, it says so.

**This document is complete on its own.** Everything you need is inside it: the main parts (1 to 15) explain the site, and the appendices (A to F) hold the full detail: technical reference, the complete SEO routine, keywords and content plans, audits and incident records, the numbers history, and the free tools one by one. You never need to open another document to use it.

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
| Get the full detail behind any part | The appendices at the end (A to F) |

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
16. The appendices and how to keep this document current

Appendices: A Technical reference, B The complete SEO routine, C Keywords, content and AI visibility, D Audits, incidents and run history, E Numbers history and working lessons, F The free tools one by one

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
| Guides | `/resources/guides/<slug>` | One folder each under `app/resources/guides/`. Each guide is its own hand-built page (the shared `GuideTemplate.tsx` exists but no page uses it now) | Code |
| Glossary (51 terms) | `/resources/glossary/<slug>` | `content/glossary/<slug>.json`, page **generated**, rendered by `components/glossary/GlossaryTerm.tsx` | Keystatic: **Glossary terms** |
| Glossary A-Z index | `/resources/glossary` | `app/resources/glossary/page.tsx`, cards from `lib/glossary-index.generated.json` | Generated |
| The Feed | `/resources/feed` | `app/resources/feed/` | Code |
| Free tools hub | `/resources/tools` | `app/resources/tools/` | Code. The hub has its own `FREE_TOOLS` list, separate from `lib/tools-registry.ts` |
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
| ROI Calculator | `/tools/roi-calculator` | Only when the visitor downloads the PDF (the maths runs in the browser) |
| Cold Email ROI Calculator | `/tools/cold-email-roi-calculator` | No |
| LinkedIn Hook Grader | `/tools/linkedin-hook-grader` | Yes |
| ICP Builder and Value Proposition Generator | `/tools/icp-builder` | Yes |
| LinkedIn Profile Optimizer | `/tools/linkedin-optimizer` | Yes |
| DM Angle Generator | `/tools/dm-angle-generator` | The base page is served by this site; everything under it comes from a separate Lovable app (Part 13) |
| Competitor Battle Card Generator | `/tools/battle-card-generator` | Yes |
| Case Study and Proposal Generator | `/tools/case-study-generator` | Yes |
| Lead Magnet Idea Generator | `/tools/lead-magnet-ideas` | Yes |
| Posting Rhythm Builder | `/tools/posting-rhythm-builder` | Yes |
| Founder Presence Analyzer | `/tools/founder-presence-analyzer` | Yes |

`lib/tools-registry.ts` is the one list of tool names, URLs and taglines used by the "Try this next" boxes on each tool page. The tools hub page keeps its own separate list, so when a tool is added, renamed or moved, change **both**.

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
docs/                 Working notes and reports (everything useful in them is written into this Bible)
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
2. **Live at myntmore.com/keystatic:** needs a one-time GitHub app setup (about 10 minutes, steps below). Sign-in is GitHub, so only people with write access can edit. Each save becomes a commit and a deploy. **We have not confirmed that the live admin is switched on or tested the editing screens in a browser.** Until the four Keystatic values are in Vercel, the live `/keystatic` returns 404.

   **The one-time setup:**
   1. In `.env.local` add `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO=aitoolsteejay/<repository name>`.
   2. Run `npm run dev` and open http://localhost:3100/keystatic. Keystatic offers to create a GitHub app. Accept. It writes four values into `.env.local`: `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET` and `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`.
   3. In GitHub go to Settings, Developer settings, GitHub Apps, open the new app, and add this callback address next to the localhost one: `https://www.myntmore.com/api/keystatic/github/oauth/callback`. Install the app on the repository.
   4. In Vercel, Project Settings, Environment Variables, add the four values from step 2 plus `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO`, for Production. Redeploy.
   5. Open https://www.myntmore.com/keystatic and sign in with GitHub.

   `/keystatic` and `/api/keystatic` are blocked in `robots.txt` either way.

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
| **Lovable** (`mynt-more-angles.lovable.app`) | A separate app behind the DM Angle Generator | Sub-paths under `/tools/dm-angle-generator/` are shown inside our site through a rewrite. The base page itself is ours |
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
| `btn-dark` | Primary call to action: a light (white-to-cream) pill with a gold border and near-black bold text. Same on 246 pages |
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

### 8.7 Known design drift (from the 16 Oct 2026 audit; full findings in Appendix D)

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
| Primary keyword | The first entry in the page's `keywords` list. One page per primary keyword, sitewide (the full keyword map is in Appendix C) |
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
| AI visibility prompt library | 163 questions we want AI tools to answer with Myntmore (listed in Appendix C) |
| AI visibility tracker | A spreadsheet where results are logged by hand (columns in Appendix C) |

**IndexNow** (Bing and others) is automatic: after each successful production deploy, a GitHub workflow submits the pages whose sitemap date changed.

### 10.5 The wrong-canonical problem (still open)

Google picked other websites' homepages (a betting site and others) as the canonical for some Myntmore pages, with no declared canonical on record. Our pages are correct (200 status, self canonical, real content, identical to Google's crawler and a normal browser). The records are old crawls. As of 5 Nov 2026, **18 of 19 pages were still affected** (for example `/services`). The fix is to open each URL in Search Console, run **Test Live URL**, check the screenshot shows our page, then click **Request Indexing**, about 10 a day. The full list of pages and the daily batches are in Appendix D. **Only a person signed in to Search Console can do this.** If a live test ever shows someone else's content, treat it as a security incident.

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

The complete routine, with every task's steps, pass test and fix, is in Appendix B. This is the weekly list (15 tasks) in short form:

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

The results of each run so far are in Appendix D.

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

`npm run dev` normally runs on port 3000. In the assistant's preview setup it is started on port 3100 (and a second one on 3102 for comparisons), so the local addresses in these notes use 3100. If you see strange build errors: delete `.next` and restart, and check for a stale `next dev` still running on the port (`lsof -nP -iTCP:3100 -sTCP:LISTEN`, then kill it).

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

- `/tools/dm-angle-generator` (the base page) is our own page. Everything under it (`/tools/dm-angle-generator/...`) is served from `mynt-more-angles.lovable.app`. Robots blocks the sub-paths so crawlers do not wander the other app.
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
| **Homepage logo strip shows invented company names** | `app/components/LogoStrip.tsx` is shown on the homepage under "Trusted by fast-growing B2B teams" and lists eight made-up names (Finstack, Proxima, Vaultline, Helio, Crescendo, Nexbridge, Strataflow, Orbis). This conflicts with the rule against invented clients. Owner decision: replace with real, permitted logos (the site holds a few logo files) or remove the strip |
| Free tools hub heading | The hub page says "9 tools" in its heading but lists 11, and its "no forms" wording is not quite true (nine tools show the lead form first) |
| Supabase lead-source list | The `leads` table's allowed values were widened in a final block of the schema file that must be run on the live database. Not confirmed that it has been |
| Reduced-motion gaps | `Footer`, `CTABanner`, `SystemFlow`, `WhoWeHelp` and `Promise` have no reduced-motion check in code |
| Rate limiting | Only `/api/gemini` and `/api/menti/auth` are rate limited. The other tool routes are not |
| Content briefs | Only 2 ready (target 4) |
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

## Part 16: The appendices and how to keep this document current

| Appendix | What it holds |
| --- | --- |
| A | Technical reference: running the site locally, the full design system, animations, the free-tool system in depth, every API route, the data files, integrations, and known technical debt |
| B | The complete SEO, AEO and GEO routine: every weekly, bi-weekly, monthly and quarterly task with steps, pass tests and fixes, plus the baseline and the KPI definitions |
| C | Keywords, content plan and AI visibility: the keyword map, keyword research, content gaps, the five content briefs, answer-format rules, and the AI citation method and prompt library |
| D | Audits, incidents and run history: the design audit, the wrong-canonical incident, the full request-indexing list, and every SEO run so far |
| E | The numbers history and working lessons: the weekly scorecard results log and the practical lessons learned while pulling the data |
| F | The free tools, one by one: what each of the 11 tools asks for, how it works inside, what it returns, and how leads are captured |

**Keeping this document current**

Update it in the same commit when you: add or remove a page type, add a tool or account, change a rule, change the deploy process, make a decision, or close an open item. Change the "Last updated" date at the top. If a fact here disagrees with the code, the code is right: fix this document.


---

## Appendix A: Technical reference

**What this appendix is for:** the details a developer needs and the main text leaves out. How to run the site on a computer, the full design system, the animation system, how the free AI tools work inside, every API route, every file in `lib/`, and the technical debt that is still real. Every item here was checked against the code on 2026-11-11. Where an older note turned out to be wrong, the correct fact is used instead.

---

### A.1 Running the site on your computer

**Steps**

1. Install the packages: `npm install --legacy-peer-deps`. The flag is needed because two packages disagree about versions.
2. Create a file called `.env.local` in the repo root and add the secret values (see A.1.2). The file is ignored by git, so it is never committed.
3. Start the site: `npm run dev`.
4. Open the address it prints.
5. Before trusting a change, run `npm run build`. A passing build is the real test.

**Which port?** Plain `npm run dev` opens port **3000**. The project's launch setup (`.claude/launch.json`) starts it on port **3100** instead (`npm run dev -- --port 3100`), and has a second profile on port 3102 for a side-by-side check. Use whichever you like, but the Keystatic editing screen is then at that port plus `/keystatic`.

**Other commands**

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with live reload |
| `npm run build` | Runs the generator chain first, then the real production build |
| `npm run start` | Serves the production build you just made |
| `npm run test:roi` | Runs all unit tests (31 tests in three files: the cold email ROI maths, the hook grader and the research scoring) |
| `npx tsc --noEmit` | Type check only. Fast. Run it before every commit |

There is no linter. `next lint` only offers to create one.

#### A.1.2 Environment variables the code actually reads

| Variable | Used by | If it is missing |
| --- | --- | --- |
| `GEMINI_API_KEY` | All AI tool routes, `/api/gemini`, the Menti summary | The route answers "GEMINI_API_KEY is not configured" (HTTP 500). The site itself still loads |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `lib/supabase.ts` | The code swaps in a fake placeholder project so no page crashes. Saving a lead then fails quietly and is only logged to the browser console. The Zoho copy of the lead is still sent |
| `MENTI_ADMIN_PASSWORD` | `/menti/room` login | No password works (the gate fails shut). There is deliberately no default password |
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO` | `keystatic.config.ts`, the Keystatic route and layout | The CMS saves to local files and, on the live site, `/keystatic` returns 404 |
| `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | The Keystatic GitHub sign-in | Live editing cannot sign in. Keystatic writes these into `.env.local` when you create its GitHub app |

There is no `.env.example` file. Never paste a real key into chat, a commit or a document.

#### A.1.3 Dev-server gotchas

| Symptom | Cause | Fix |
| --- | --- | --- |
| Strange, unexplainable build or page errors that the type check says are not real | A **stale `next dev` process** is still holding the port and serving old code | Find it with `lsof -nP -iTCP:3100 -sTCP:LISTEN`, then `kill -9 <pid>`, then restart |
| Odd webpack or cache errors after running a build while the dev server is on | A build and a dev server share the `.next` folder and corrupt each other | Stop the dev server, run `rm -rf .next`, start again. Never build and run dev at the same time |
| Merge or commit shows `tsconfig.tsbuildinfo` as changed | The type check rewrites it (it is a committed build cache with no meaning) | `git checkout tsconfig.tsbuildinfo` before committing or merging |
| Type check or build fails right after pulling | A generated file is out of date | Run the matching `:build` script, or just `npm run build` |

---

### A.2 The design system in full

#### A.2.1 Colour tokens

These are used as plain hex values written directly in the page code (inline styles), not as Tailwind theme colours. The exceptions are listed in A.2.2.

| Token | Hex | Use |
| --- | --- | --- |
| Page background | `#F8F6F2` | Every page. Never pure white pages |
| White card | `#FFFFFF` | Cards, with a 1px `#E8E2D9` border |
| Border and dividers | `#E8E2D9` | Everywhere |
| Text, primary | `#0A0A0A` | Headings and main text |
| Text, body | `#52525B` | Paragraphs |
| Text, muted | `#71675E` (some older code uses `#6B6B6B`) | Captions, footer links |
| Text, disabled | `#B8B0A7` | Disabled controls only. Contrast is about 2:1, so never for readable text |
| Brand gold | `#F5B731` | Fills, borders, dots, underlines, and text on dark sections only |
| Gold, darker | `#D97706` | Hover fills. Same text restriction as brand gold |
| Gold as text on light | `#A14A08` | `GOLD_TEXT` in `lib/colors.ts`. Contrast 5.6:1 on the page background |
| Gold tint | `#FEF9EC` | Soft panels and the end colour of the button gradient |
| Gold border | `rgba(245,183,49,0.35)` to `0.5` | Card and button borders |
| Soft button end colour | `#FDE68A` | Button hover gradient |
| Selection highlight | `rgba(245,183,49,0.3)` | Selected text |
| Scrollbar | track `#EDE9E4`, thumb `#D4D4D8` | Slim 6px custom scrollbar |

**The accent rotation** is the set of colours used to tell items apart inside one group (service icons, tier cards, table sections, tool cards, blog tags, role tags, case study industries):

| Accent | Hex values in use | Matching hover class |
| --- | --- | --- |
| Blue | `#3B82F6` | `card-hover-blue` |
| Purple | `#7C3AED` and `#A855F7` | `card-hover-purple` |
| Orange | `#F97316` | `card-hover-orange` |
| Teal | `#14B8A6` | `card-hover-teal` |
| Green | `#10B981`, `#16A34A`, `#22C55E` | `card-hover-green` |
| LinkedIn blue | `#0077B5` | `card-hover-linkedin` |
| Indigo | `#6366F1` | `card-hover-indigo` |
| Red | `#EF4444` | `card-hover-red` |
| Gold | `#F5B731` | `card-hover-warm` |
| Near-black | `#0A0A0A` | `card-hover-dark` |

`app/components/Industries.tsx` is the home of the six-colour rotation. Rule of thumb for a new card: pick an accent that its neighbours are not already using. Do not invent a new hex unless nothing fits.

**The contrast rule, and the helper that enforces it.** Any accent colour that colours *text* on a light surface must pass the accessibility contrast test (4.5:1). Run it through `textTone(accent)` from `lib/colors.ts`. It looks the colour up in a table of known accents, and for any other `#RRGGBB` colour it darkens the same hue in small steps until the contrast passes against the darkest beige card tint (`#F2E8DF`). Examples from the table:

| Accent | Text version |
| --- | --- |
| Gold `#F5B731`, `#D97706` | `#A14A08` |
| Blue `#3B82F6` | `#1D4ED8` |
| Orange `#F97316` | `#9A3412` |
| Green `#10B981` | `#047857` |
| Teal `#14B8A6` | `#0F766E` |
| Purple `#A855F7` | `#7E22CE` |
| LinkedIn `#0077B5` | `#00669C` |
| Red `#EF4444` | `#B91C1C` |

`textTone` must not be used for text on dark sections. Colours that already pass, and values that are not hex (like `rgb(...)`), come back unchanged.

**Case study industry accents** live in `lib/case-study-library.ts` (`INDUSTRY_ACCENT`, for example Pharma `#0EA5E9`, SaaS `#3B82F6`). The same accent is used for an industry everywhere.

#### A.2.2 The Tailwind setup

`tailwind.config.ts` adds a few things on top of stock Tailwind:

- Colours: `cream` (`#F8F6F2`), `brand-yellow` (`#F5B731`), a `mint` scale (despite the name it is gold: 50 to 700, from 5% opacity up to `#D99E1A`), a `neutral` scale (50 to 950), and the shadcn colour names (`primary`, `secondary`, `muted`, `accent`, `destructive`, `popover`, `border`, `input`, `ring`).
- Those shadcn names read CSS variables defined in the `:root` block of `app/globals.css`. They exist for the ported free tools. The variables are gold-themed: `--primary` and `--accent` are gold, `--radius` is 1rem. Only the shadcn-style components use them, so changing them does not touch the rest of the site.
- Animations: `fade-in`, `fade-up`, `scale-in`, `slide-in-right`, `pulse-glow`, `marquee`, `marquee-reverse`, `glow-pulse`, `float`.
- Shadows: `mint-sm`, `mint`, `mint-lg`, `card-hover`, `glass`.
- Plugin: `tailwindcss-animate`.
- Page scanning covers `app/`, `components/` and `pages/`.

The path alias `@/*` points at the repo root (`@/lib/supabase`, `@/components/ui/button`). TypeScript is in strict mode.

#### A.2.3 Typography

| Rule | Detail |
| --- | --- |
| Headings | Weight 900 (`font-black`). Not `font-bold` or `font-extrabold` |
| Page H1 | `text-4xl sm:text-5xl`. Richer heroes use `lg:text-6xl`. The homepage hero scales `text-4xl sm:text-6xl lg:text-7xl xl:text-8xl` |
| Small labels above headings | `text-xs uppercase tracking-widest` (or `tracking-[0.2em]`) |
| Headline spacing | No forced `tracking-tighter` on marketing headlines. No all-caps body text |
| Heading wrapping | All H1, H2 and H3 use `text-wrap: balance` so a short heading never leaves one orphan word |
| Inter | Self-hosted. One variable file, `app/fonts/Inter-latin-variable.woff2`, Latin letters only, all weights 100–900, loaded in `app/layout.tsx` with `next/font/local`. It was self-hosted because a Google Fonts download once broke a production build. To refresh it, fetch the Inter CSS from Google with a modern browser user-agent, copy the `url(...)` from the `latin` block, and replace the file |
| Fredoka (weight 600) | Loaded by `app/components/FredokaLabels.tsx`, a wrapper that adds a `fredoka-labels` class. Inside it, every small label made with `uppercase` plus a `tracking-*` class (or the `fredoka-pill` class) is shown in Fredoka in sentence case. Text sizes of 12px and under step up one notch because sentence case reads smaller. Navbar and footer are untouched because the rule is scoped to `<main>` |
| Caveat (400, 600, 700) | Loaded inside `Hero.tsx` (not in the root layout) so only the homepage downloads it. Used for the handwritten annotations in the hero and a few accents on the Do It Yourself page |

#### A.2.4 Every hand-written class in `app/globals.css`

**Buttons and links**

| Class | What it does |
| --- | --- |
| `btn-dark` | The primary call to action. A **light** pill: white to cream gradient, 1.5px gold border, bold black text, a white shimmer that sweeps across on hover, hover turns amber and lifts 2px. (The name is historical. It is not dark.) |
| `btn-mint` | Identical look to `btn-dark`, kept for older pages. Lifts 1px on hover |
| `btn-ghost` | Secondary: transparent with a gold border, fills with the cream to amber gradient on hover |
| `link-muted` | Muted brown text that turns black on hover |
| `link-subtle` | Muted brown text that turns `#A14A08` on hover |
| `link-dark` | `#3D3D3D` text that turns black on hover |
| `chip-hover` | Chip border turns gold and text turns `#A14A08` on hover |

**Cards and surfaces**

| Class | What it does |
| --- | --- |
| `glass-card` | White card, tan border, faint shadow. Not actually glass |
| `glass-card-hover` | Same, and the border turns black with a deeper shadow on hover |
| `card-hover-warm`, `-dark`, `-blue`, `-purple`, `-green`, `-linkedin`, `-teal`, `-orange`, `-indigo`, `-red` | Border colour and shadow transition on hover, one per accent colour. They use `!important` to beat inline borders |
| `card-elevated` | Card using the shadcn tokens (used inside the ported tools) |
| `glow-accent`, `glow-mint`, `glow-mint-hover` | Soft gold glow shadows |
| `dot-grid` | Faint 24px dot pattern background |
| `orb` | Absolutely positioned 80px-blurred circle for background blobs |
| `gradient-text`, `gradient-text-mint` | Gold text (plain, and gradient-filled). Only for dark backgrounds |
| `step-connector` | A thin gold line joining numbered steps. Hidden below 1024px |
| `no-scrollbar` | Hides a scrollbar while keeping scroll |

**Motion classes** (details in A.3): `reveal` and `reveal-visible`, `hero-fade` and `hero-fade-d1` to `d4`, `marquee-container`, `marquee-track`, `cta-animated-section`, `ce-badge`, `card-fade-up`, `tip-card-hover`, `stack-card`, `not-found-signal`, the `lp-*` family, and the `price-*` family.

**The `lp-*` family** (industry landing pages): `lp-float-icon` and `lp-icon-bob` (floating icons), `lp-card` (lifts 7px on hover, its number grows and turns `#A14A08`), `lp-card-number`, `lp-stat` (lifts 5px), `lp-pill` (grows 6%), `lp-header` and `lp-header-scrolled` (header shadow once scrolled), `lp-radar-ring` (a ping behind "ready to buy" badges), `lp-pop-in` (chat-bubble pop), and `lp-tool-accent-text`, `-bg` and `-border` (the `#FFC947` yellow from the Posting Rhythm Builder).

**The `price-*` family** (pricing pages): `price-card` (lifts 5px on hover), `price-cta` (shrinks slightly when pressed), `price-row` (row tint on hover), `price-badge-pop` (the "popular" badge pops in).

**Base rules that apply everywhere**

| Rule | What it does |
| --- | --- |
| Keyboard focus ring | Every focusable element gets a 2px `#A14A08` outline with a 2px white halo. The halo carries the contrast on dark sections. Inputs that remove their outline but have no `ring` class get the outline back |
| Skip link (`skip-link`) | First tab stop on every page. Hidden until focused. Jumps to `#main-content` |
| Smooth scroll | On the whole page, switched off for reduced motion |
| Hero glow | The first `<section>` inside `<main>` on every page gets a soft gold glow top right and a faint purple glow bottom left, unless it draws its own gradient or blobs |
| Mobile form fields | Below 768px every input, textarea and select is forced to 16px. This stops iPhones from zooming the page when a field is tapped |
| Count-up hiding | `html.motion-ok [data-count-up]` stays invisible until its count-up starts (see A.3) |

#### A.2.5 The shadcn-style set (`components/ui/`)

`badge`, `button`, `card`, `input`, `label`, `minimal-carousel`, `select`, `slider`, `sonner` (toasts), `textarea`, `tooltip`. They sit on Radix UI. These are used mainly by the free tools. `button.tsx` has the variants `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`, `hero` (big gold button, used on the lead form), `tone`, `action`, and the sizes `default`, `sm`, `lg`, `xl`, `icon`. `cn()` in `lib/utils.ts` merges class names.

#### A.2.6 Shared components (`app/components/`), what each one does

| Component | What it does |
| --- | --- |
| `InnerLayout` | Wraps a page in Navbar, a `<main id="main-content">` and Footer on the cream background. Uses `overflow-x-clip` so wide decorations never create sideways scrolling |
| `Navbar` | Fixed header, height `h-16` on phones and `h-20` from 640px up, logo `h-10 sm:h-14`. Desktop dropdown menus plus a mobile drawer. Links come from the `SERVICE_LINKS`, `RESOURCE_LINKS` and `NAV_LINKS` arrays at the top of the file |
| `Footer` | Sitewide footer: up to five columns on wide screens, a breathing glow, and a canvas of 28 slow "dust motes" |
| `Breadcrumbs` | Draws the trail and prints the matching BreadcrumbList schema from the same list, so a page declares its trail once. Used on 75 files |
| `JsonLd` | Prints one `<script type="application/ld+json">` from a builder in `lib/schema.ts` |
| `FadeIn` | The scroll-reveal wrapper (A.3) |
| `StatTicker` | The count-up number (A.3) |
| `FAQ` and `lib/faq-data.ts` | Homepage FAQ accordion. The data sits in a plain module so server pages can build FAQ schema from the same list (a "use client" file cannot be read by a server page) |
| `AnswerBlock` | The definition-first block under a service page's hero: a question heading, a 40–60 word answer and three one-line facts. Its text comes from `lib/service-answers.ts` |
| `ArticleMeta` | The visible "published by / last updated" line. Reads the dates from the page's own Article schema so people and search engines see the same dates. Server component |
| `RelatedPath` | One row of the planned internal-link path, ending on the consultation page. Fed by `lib/internal-paths.ts` |
| `ToolCallout` | A short "Free tool" pointer box for the end of a post or guide |
| `AskYourAI` | The "Ask ChatGPT, Claude or Perplexity about this page" box. Used on 8 files: the homepage, who-this-is-for, blog posts, three guides and the case studies index |
| `CopyBlock` | A dark code-style box with a copy button, used for prompt snippets in guides |
| `LeadCaptureForm` | The generic lead form that posts to the main Zoho form. Used on landing pages and elsewhere (the contact page has its own copy of the same form) |
| `NewsletterForm` | Posts to the Zoho Campaigns sign-up address, in a new tab |
| `LeadSource` | `LeadSourceCapture` (mounted once in the root layout) remembers the first visit; `LeadSourceField` is the hidden `zf_referrer_name` input every Zoho form includes |
| `SubmitButton` | A submit button that shows a "sending" label and blocks double clicks |
| `ReelWidget` | The floating promo reel (below) |
| `EventPopup` | A timed event popup. **Currently switched off** by a `POPUP_ENABLED = false` flag in the file, because no event is scheduled. It is still imported on the homepage |
| `UpcomingEvents` | The events list block. Not placed on the homepage now |
| `VisitingCard`, `ContactIcons` | The digital business-card layout and its icons |
| `NotFoundRecovery` | The 404 page's smart suggestions: it looks at the broken address (tools, resources, case studies, services, careers, contact) and offers the matching section |
| `FredokaLabels` | The font wrapper (A.2.3) |
| `Hero`, `LogoStrip`, `WhoWeHelp`, `Industries`, `Services`, `SystemFlow`, `BenefitsMarquee`, `Testimonials`, `Promise`, `Results`, `HowItWorks`, `CTABanner` | The homepage sections, assembled in `app/page.tsx` |
| `GuideTemplate` | A shared guide shell. **No page imports it any more**, so it is unused code |

**ReelWidget rules.** It is mounted once in the root layout. It is offered **once per browser tab session**, on whichever page the visitor lands on first, after 5 seconds or after scrolling halfway, whichever comes first. If the visitor moves to another page it goes away, and it only returns in a new session (it uses `sessionStorage`). It plays muted, can be dismissed, and starts paused for visitors who asked for reduced motion. The video file is `public/videos/homepage-reel.mp4`. It is skipped on these path prefixes (the list is `EXCLUDED_PREFIXES` in the file): `/menti`, `/feedback`, `/workshop`, `/site-audit`, `/myntmore-framework`, `/plans`, `/value-prop`, `/master-icp`.

**Two ready-made hooks and helpers** worth knowing: `lib/use-auto-advance.ts` (tab carousels, see A.3) and `lib/colors.ts` (A.2.1).

---

### A.3 The animation system

#### A.3.1 Scroll reveal and count-up

| Piece | How it works |
| --- | --- |
| `FadeIn` | Wrap any section in `<FadeIn delay={100}>`. It watches the element with an IntersectionObserver (visible threshold 0.08, trigger line 48px above the bottom of the screen). When it appears, after the optional delay, it adds the class `reveal-visible`. The CSS `reveal` class starts at opacity 0 and 22px lower, then eases up over 0.65 seconds. It fires once |
| `StatTicker` | Counts a number up when it scrolls into view (threshold 0.2). It reads the first number in the text, including thousands commas, keeps any prefix and suffix (`$`, `+`, `M`), and counts from 0 to the target over 1.4 seconds by default with an ease-out curve. It always ends by showing the **exact text you passed in**, so Indian digit grouping like 1,74,999 is never reformatted. Never hand-write a counter. An old hand-written version once turned `$1.2M` into `1.2$M` |
| Count-up hiding | An inline script in `<head>` adds the class `motion-ok` to `<html>` before the first paint, but only if the visitor has not asked for reduced motion. CSS then hides every element marked `data-count-up` until the count-up starts, so visitors never see the real number flash to zero and back. If the JavaScript never starts, those numbers fade in by themselves after 4 seconds |

#### A.3.2 CSS keyframes (all in `app/globals.css` unless marked)

| Keyframe | Used for |
| --- | --- |
| `marquee` (28s) | Logo strip |
| `marquee-left`, `marquee-right` (inline, 40–45s) | Testimonial rows and benefit chips |
| `bubble-float` | Industry pills and the dots in the Promise section |
| `tab-progress` | The progress bar on the active "Who we help" tab |
| `wf-flow-right`, `wf-flow-down`, `wf-shimmer` | The travelling dots and card shimmer in the "How it works" flow |
| `heroFadeUp` | Page-load entrance on inner-page heroes. Classes `hero-fade` (0 delay) and `hero-fade-d1` to `d4` (90, 190, 310 and 450 ms) |
| `ctaGradient` | Slowly shifting cream background on `cta-animated-section` (6 seconds) |
| `ce-badge-pop` | The check icon on cold email target chips pops in after its FadeIn reveals |
| `lp-float`, `lp-radar-ping`, `lp-pop-in` | Landing page icons, radar ring, chat bubbles |
| `card-fade-up` | Staggered card entrance |
| `stack-cycle` (8s), `not-found-signal` (2.8s) | The shuffling card stack and status pulse on the 404 page |
| `handwrite-float-r`, `handwrite-float-l` | Floating handwritten notes on the hero |
| `doodle-draw`, `guide-draw` | Drawing a hand-drawn arrow or line (a stroke-dashoffset trick) |
| `priceBadgePop` | Pricing page badge |
| `count-up-failsafe` | The 4-second fade-in described above |
| `fadeIn`, `fadeUp`, `scaleIn`, `slideInRight`, `pulseGlow`, `glowPulse`, `float`, `marqueeReverse` | Defined in `tailwind.config.ts` and used through Tailwind class names like `animate-fade-in` |

#### A.3.3 JavaScript animations

| Animation | Where | How |
| --- | --- | --- |
| Blob parallax | Hero (4 blobs), CTABanner, SystemFlow, Footer glow | Sine and cosine movement on a `requestAnimationFrame` loop. **Skipped below 768px** in Hero, CTABanner and SystemFlow |
| Hero underline and handwriting draw-in | Hero | `strokeDashoffset` goes from the path length to 0. The handwriting text uses a `clip-path` wipe. Starts shortly after mount |
| Hero stat counters | Hero | Eased counters, for example the `$120M+` counter runs 1.8 seconds |
| Cycling phrase | Hero | Fades and slides out and in every 3.2 seconds |
| Services underline and stat strip | Services | `strokeDashoffset` underline and counters, both at observer threshold 0.4 |
| Results counters | Results | Observer threshold 0.2, trigger line 80px up |
| "Who we help" tabs | WhoWeHelp | Auto-advance every 1.8 seconds with a progress bar. A hover or touch pauses it and it resumes after 6 seconds, so it can never stay paused forever |
| "How it works" flow | SystemFlow | Observer threshold 0.12 reveals the cards in sequence, then a highlight loop runs every 1.7 seconds. Desktop shows a two-row diagram, below 1024px a vertical stack |
| Promise typewriter | Promise | Types each phrase at 38 ms per letter, holds 1 second, deletes, with a blinking cursor every 520 ms |
| Footer dust | Footer | A canvas with 28 motes drifting upward. A `ResizeObserver` keeps it sized |
| Testimonials and benefit chips | Testimonials, BenefitsMarquee | Pure CSS marquee rows going in opposite directions (45s and 40s). Testimonial rows are not JavaScript |
| Tab carousels | Cold email and LinkedIn explorers | `lib/use-auto-advance.ts`: each item stays 7 seconds (12 seconds after the visitor picks one). It pauses when the explorer is off screen, the browser tab is hidden, or a keyboard user has focus inside it. It never waits for the mouse, because a resting cursor would freeze it. It starts paused for reduced motion, and the component shows a pause button |

**Drawn-in underlines** (an SVG path animated with `strokeDasharray` and `strokeDashoffset`, started by an IntersectionObserver) are hand-copied into about 45 files. There is no shared underline component. If you edit one, you are not missing an import. Extracting one component is a sensible clean-up.

#### A.3.4 Reduced-motion rules

The visitor's operating-system "reduce motion" setting must be honoured.

- **CSS:** a `@media (prefers-reduced-motion: reduce)` block at the bottom of `globals.css` turns off the hero fades, card fades, landing page floats and pops, the stack, marquees, CTA gradient, radar ring, 404 pulse, price transitions and doodle drawing. `reveal` shows its final state at once. `ce-badge` shows at once. Smooth scrolling is switched off.
- **JavaScript:** every animation loop must check `window.matchMedia("(prefers-reduced-motion: reduce)").matches` and return early. Today the check is in `Hero`, `StatTicker`, `ReelWidget`, the pricing component, the cold email details popover, the tab carousel hook and the LinkedIn and cold email explorers.
- **Not covered today:** a search of the code found no reduced-motion check in `Footer` (dust motes), `CTABanner` and `SystemFlow` (blob loops), `WhoWeHelp` (tab cycling) or `Promise` (typewriter). They are small, but they break the rule. See A.9.

#### A.3.5 Mobile responsiveness rules

Breakpoints used: `sm` 640px, `md` 768px, `lg` 1024px.

| Rule | Detail |
| --- | --- |
| Grids start with one column | Use `grid-cols-1` as the base, then `sm:` or `lg:` columns. Many columns only work if every cell is short (a big number plus a 2–4 word label). A sentence plus a citation does not fit. That bug once shipped across nine blog posts |
| Tables | Wrap in `overflow-x-auto` |
| Tap targets | At least 44px (`min-h-[44px]`). The footer links use 44px on phones and relax on desktop |
| Smallest text | 12px |
| Homepage specifics | Results grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`. Services `md:grid-cols-3`. Who-we-help tabs `grid-cols-2 lg:grid-cols-4`. Hero stats stack on phones. Hero handwritten notes are desktop only (`hidden lg:flex`) |
| Phone inputs | 16px, forced by CSS, so iPhones do not zoom |
| Sticky headers | Never put `overflow: hidden` on a parent of something sticky. Use `overflow-clip` |

**Two kinds of code that look like fixed-width bugs but are fine**

1. Big widths such as `width: "600px"` on blurred background circles that are `aria-hidden`, `pointer-events: none` and inside a clipped section. They never cause sideways scrolling.
2. `flex-shrink-0 w-[Npx]` cards inside a marquee track. They are meant to scroll sideways on their own.

---

### A.4 The free AI tools, in depth

#### A.4.1 The shared flow

Every gated tool follows the same path. The step names differ a little per tool, but the shape is the same.

1. **Landing:** the tool's marketing page with a "start" button.
2. **Lead form:** `LeadGate` asks for contact details.
3. **Input:** the tool's own questions.
4. **Results:** the page calls the tool's API route, shows the answer, and saves the visitor's inputs and the AI's answer onto the same database row.

Step lists in use: most tools are `landing, lead, input, results`. Battle Card is `landing, lead, form, results`. Case Study Generator is `landing, lead, mode, form, results`. Founder Presence Analyzer is `landing, lead, activity, competitors, themes, ready, results`. The ICP Builder has its own multi-screen flow (intake, ICPs, value proposition).

#### A.4.2 How `LeadGate` works (`components/tools/shared/LeadGate.tsx`)

1. The visitor fills the form. It checks the fields with a validation rule set (first name, last name, designation and email are required, the rest optional).
2. **Zoho first.** The page submits a real HTML form to that tool's Zoho form. The form targets a hidden iframe, so the visitor never leaves the page.
3. **Supabase second.** It then inserts one row into the `leads` table and gets the row's `id` back. The Supabase code (about 200 kB) is only downloaded at this moment, not with the page. A 600 ms pause hides the download.
4. If Supabase fails, the error is only written to the browser console. The visitor still proceeds, and the Zoho record still exists.
5. The tool receives the lead details plus the row `id` and later does `update({ inputs, outputs }).eq("id", ...)` on the same row.
6. A plain-language data notice sits under the form. For tools that send input to Gemini it adds a warning not to enter confidential information or details about other people.

**The Zoho field names are the same on every form**, which is why changing a tool's form address is a one-line change:

| Field name | Content |
| --- | --- |
| `SingleLine` | First name |
| `SingleLine1` | Last name |
| `SingleLine2` | Designation |
| `SingleLine3` | Company |
| `PhoneNumber_countrycode` | Phone |
| `Website` | LinkedIn URL |
| `Email` | Email |
| `zf_referrer_name` | First-touch source string |
| `zf_redirect_url`, `zc_gad` | Hidden, empty |

**Which Zoho form each tool uses.** The map is `ZOHO_FORM_ACTIONS` in the file. Profile Optimizer and Hook Grader post to the **shared lead-magnet form** (`Myntmoreleadmagnetform`) because they have no dedicated form yet. Every other tool has its own form: PostingRhythm, LeadMagnetIdeas, DMAngleGenerator, FounderPresence, CaseStudyGenerator, Battlecardgenerator, ICPbuilder and ROICalculator.

The allowed tool names (`LeadSource` type) are: `profile_optimizer`, `posting_rhythm_builder`, `lead_magnet_ideas`, `dm_angle_generator`, `founder_presence_analyzer`, `case_study_generator`, `battle_card_generator`, `icp_builder`, `roi_calculator`, `hook_grader`. A second list, `AI_SOURCES`, says which of them send data to Gemini. It must be kept in step with the tools that call Gemini.

**The ROI Calculator is gated too, just later.** The calculator itself runs in the browser with no lead form. The gate (`LeadGateModal`) only appears when the visitor asks to **download the PDF** (it is skipped if they already gave details). After the form, the PDF is built with jsPDF and html2canvas, and the inputs and results are saved to the same `leads` row. The Cold Email ROI Calculator has no gate and no database write.

#### A.4.3 The `leads` table (`supabase/schema.sql`)

| Column | Type | What goes in it |
| --- | --- | --- |
| `id` | uuid, primary key | Generated by the database |
| `created_at` | timestamp | Set by the database |
| `source` | text, required | One of the allowed tool names (see below) |
| `name` | text, required | First and last name joined |
| `email`, `phone`, `company_name` | text | From the form |
| `company_website` | text | Exists but `LeadGate` never fills it |
| `linkedin_url` | text | From the form |
| `metadata` | JSON | `{ "designation": ... }` |
| `inputs` | JSON | What the visitor typed into the tool |
| `outputs` | JSON | What the AI (or calculator) produced |

**Policies (row-level security is on).** Anyone, including anonymous visitors, may **insert** a row and **update** a row. Nobody anonymous may read or delete. Only the Supabase dashboard or the service key can read the data. Anonymous update is deliberate: there is no sign-in, and the tool needs to attach results to its own row.

**Indexes:** on `source` and on `created_at` (newest first).

**The gotcha that matters.** `source` has a check rule that is an allow-list. A tool whose name is not on the list has its insert rejected. The site only logs the error and the Zoho lead still arrives, so the problem is silent. The `create table` statement near the top of the file still lists only seven names. The **final block of the file** widens the rule to ten names (adding `case_study_generator`, `battle_card_generator` and `hook_grader`). That block must be run once in the Supabase SQL editor on the live project. The whole file is safe to re-run. The repo cannot show whether it has been run on the live database, so check there. To change the list, Postgres cannot add a value to a check rule: you must drop the rule and add it again.

**A second table, `menti_responses`** (for the live Q&A): `id`, `created_at`, `answer` (1–500 characters, enforced by the insert policy). Anonymous visitors may insert, read and delete rows, and Realtime is switched on for the table. That is an accepted trade-off because the answers are anonymous and low-sensitivity, but note that the public Supabase key could delete rows directly, bypassing the password-protected reset button.

#### A.4.4 The AI call pattern, and each tool's route

All of these use the model **`gemini-2.5-flash`**. Most routes follow the same steps:

1. Check and trim the inputs by hand (length limits, required fields). They do not use the zod library.
2. Call Gemini through `@google/genai` with the key from the server environment.
3. Ask for JSON output with a strict response schema, so the answer comes back clean and typed.
4. Parse it and return it. On error, return a message with status 400 (bad input), 429 (rate limited), 502 or 500.

| Tool | Route | What it does |
| --- | --- | --- |
| LinkedIn Profile Optimizer | `/api/tools/profile-optimizer` | Takes headline, about text, role, target ICP and tones (empty means "bold"). Returns 3 headline versions, a rewritten About section (120–150 words, 3 short paragraphs), and positioning angles. Rules: no invented metrics, never use the word "founder" unless the writer did. Uses a direct web request with a system instruction and returns 429 when Gemini rate limits |
| DM Angle Generator | `/api/tools/dm-angles` | Returns exactly 5 DM openers, one for each of: Emotional, Authority, Social Proof, Curiosity, Value-First. Each has a label, message (2–4 sentences) and reasoning |
| DM Angle regenerate | `/api/tools/dm-angles/regenerate` | Rewrites one angle. Styles: shorter, more formal, more direct, more friendly, or a fresh variation on the same framework |
| Lead Magnet Idea Generator | `/api/tools/lead-magnet-ideas` | Returns 3 ideas, each with title, pitch, why it works and how to distribute it |
| Posting Rhythm Builder | `/api/tools/posting-rhythm` | Returns a posting plan: best days and time window with an explanation, a content plan, engagement actions and the psychology behind them |
| Founder Presence Analyzer | `/api/tools/founder-presence` | The browser computes the score from posting frequency and engagement against competitors. The route checks those numbers and asks Gemini for a short insight, 3–4 opportunity bullets, a positioning paragraph and three headline styles (category leadership, ICP clarity, bold differentiation) |
| Competitor Battle Card Generator | `/api/tools/battle-card-generator` | **Two steps.** Step 1 researches the competitor with live Google Search grounding and gets plain text (Gemini cannot mix search with strict JSON in one call). Step 2 turns that research into the card (what they do, pricing model, strengths, gaps, how to position, 3–4 objection answers, a "verify before you rely on this" note). It is told not to invent pricing |
| Case Study and Proposal Generator | `/api/tools/case-study-generator` | A `mode` field picks `case_study` (headline, stats, problem, approach, results, services used) or `proposal` (executive summary, challenge, approach phases, why us, investment, next step). Any other mode is rejected |
| LinkedIn Hook Grader | `/api/tools/hook-grader` | Hook must be 10–400 characters, audience up to 150. Returns 3 rewrites: a specific-result angle, a contrarian angle and a curiosity-gap angle, each with a one-sentence "why". The score is **not** from the AI (see A.6) |
| ICP Builder and Value Prop | `/api/gemini` | The only tool that uses the generic proxy route (see A.5). Its prompts live in `components/tools/icp-builder/lib/` (`prompts.ts`, `sanitize.ts`, `gemini.ts`) |

**ICP Builder reliability rules.** Its browser helper tries a call up to three times (waiting 1 and 2 seconds), then makes one last attempt with the prompt cut to 2,000 characters. Identical calls made at the same moment share one request. Inputs are cleaned in `sanitize.ts` first.

**Free tools with no AI:** the ROI Calculator and the Cold Email ROI Calculator are plain maths in the browser.

**The DM Angle Generator is a local page.** `next.config.js` still contains a rewrite sending `/tools/dm-angle-generator` to `mynt-more-angles.lovable.app`, but pages that exist in the project win over that kind of rewrite. A live check of `www.myntmore.com/tools/dm-angle-generator` returned our own page (title ending "| Myntmore", our own script files). Only sub-paths under it would reach the Lovable app. Robots still blocks those sub-paths.

#### A.4.5 Adding a new tool: a checklist

1. **Route:** create `app/api/tools/<name>/route.ts`. Copy the simplest existing one (`lead-magnet-ideas`). Keep the input limits, the response schema and the "key not configured" check. For a tool that needs live web facts, copy the two-step battle card route.
2. **Client:** create `app/tools/<name>/<Name>Client.tsx` with the step flow. Copy a simple existing client.
3. **Page:** create `app/tools/<name>/page.tsx`. It should wrap the client in `InnerLayout`, add `Breadcrumbs`, a `WebApplication` schema (`buildWebApplicationSchema`), metadata with a canonical address and `buildToolSocialMetadata`, and 10–15 keywords with one unique primary keyword.
4. **LeadGate:** add the new name to the `LeadSource` type, to `ZOHO_FORM_ACTIONS` (point it at the shared form until a dedicated Zoho form exists), and to `AI_SOURCES` if it calls Gemini.
5. **Zoho:** create a dedicated Zoho form with the same field names (table in A.4.2) and swap its address into `ZOHO_FORM_ACTIONS`.
6. **Database:** add the new name to the `source` check rule in `supabase/schema.sql`, then run the updated block in the Supabase SQL editor. **Skipping this makes saves fail silently.**
7. **Registry:** add the tool to `TOOLS_REGISTRY` and `RELATED_TOOLS` in `lib/tools-registry.ts` (this drives the "Try this next" boxes).
8. **Tools hub:** add a card to the `FREE_TOOLS` array in `app/resources/tools/page.tsx`. This list is **separate** from the registry. Pick an unused accent and its `card-hover-*` class.
9. **Results saving:** after the answer arrives, update the lead row with `inputs` and `outputs` (copy the pattern in any client).
10. **Discovery:** add the sitemap line in `app/sitemap.ts`, the link in the human `/sitemap` page, FAQs (Keystatic, entry name starting `tool-`), and run `npm run llms:build` and `npm run sitemap:dates`.
11. **Check:** `npx tsc --noEmit`, `npm run build`, `npm run audit:links`, then test the whole flow on a preview.

---

### A.5 The other API routes

All routes live in `app/api/`. The tool routes are in A.4.4.

| Route | Methods | What it does and its safeguards |
| --- | --- | --- |
| `/api/gemini` | POST (GET gives 405) | A thin proxy over the paid Gemini key, built for the ICP Builder. Takes `prompt` (required, up to 30,000 characters) and optional `systemPrompt` (up to 2,000). Default system prompt: "You are a B2B growth strategy expert. Return valid JSON when asked." Temperature 0.7, up to 16,384 output tokens. **Refuses cross-site calls** (checks the browser's `sec-fetch-site` and `origin` headers, answers 403). **Rate limit:** 40 calls per 10 minutes per IP (429 with a `Retry-After`). Returns `{ result: text }` |
| `/api/menti/auth` | POST, DELETE | POST checks the password against `MENTI_ADMIN_PASSWORD` and sets a login cookie. Limit: 8 tries per 15 minutes per IP. The cookie is `httpOnly`, `secure` in production, `sameSite: lax`, lasts 7 days. DELETE logs out |
| `/api/menti/gist` | POST | Needs the admin cookie. Takes up to 400 answers (each trimmed to 500 characters), needs at least 3, and asks Gemini for a 2–4 sentence summary, 3–6 themes and one exact notable quote. The fixed question shown to the audience is stored in this file and in the Menti page |
| `/api/menti/reset` | POST | Needs the admin cookie. Deletes every row of `menti_responses` between events |
| `/api/vcard/tejas-jhaveri`, `/jahnvi-jhaveri`, `/enwil-fernandes` | GET | Each returns a contact file (`.vcf`) with the right type, so a phone offers "Add to Contacts". Cached for one hour. The contact details are written into each route file. To change a number or title, edit the file |
| `/api/keystatic/[...params]` | GET, POST | Keystatic's own handler. It answers 404 in production unless `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO` is set. The page layout at `/keystatic` has the same check. Robots blocks both |
| `/api/tools/hook-grader` | POST | See A.4.4 |

**How the Menti login works (`lib/mentiAuth.ts`).** There are no user accounts. The login cookie is a signed hash of a fixed message, using the admin password as the key. Having the cookie therefore proves the password was known. Comparisons are done in a timing-safe way. If the password variable is unset, nothing validates. `/menti` itself is the audience screen (one question, one answer of up to 500 characters). `/menti/room` is the password-protected live results screen that updates through Supabase Realtime. Both pages are `noindex`.

**Rate limiting (`lib/rateLimit.ts`).** A simple in-memory counter per IP. On Vercel each warm server instance keeps its own counts, so it slows down one abuser but is not a hard global cap. A shared store would be needed for strict limits. It is used only by `/api/gemini` and `/api/menti/auth`. **The other tool routes have no rate limit or cross-site check.**

---

### A.6 The data layer: every file in `lib/`

| File | What it is for |
| --- | --- |
| `schema.ts` | Structured-data (JSON-LD) builders: `organizationSchema`, `buildLocalBusinessSchema`, `buildFaqSchema`, `buildServiceSchema`, `buildCityServiceSchema` (city pages: a service in that city, never a local business), `buildWebApplicationSchema`, `buildDefinedTermSchema`, `buildBreadcrumbSchema`, `buildWebsiteSchema`, `buildHowToSchema`, `buildArticleSchema`, `buildEventSchema`, `buildJobPostingSchema`, `buildCollectionPageSchema`, `buildWebPageSchema`. Also exports `SITE_URL` (`https://www.myntmore.com`). Every address in schema uses the `www` host |
| `entity-facts.json` | The company facts that must match everywhere (name, founding, address, contacts, proof points, the "never state" list) |
| `colors.ts` | `GOLD_TEXT`, `TEXT_SHADES`, `textTone()` (A.2.1) |
| `tools-registry.ts` | Name, URL and tagline for the 11 tools (`TOOLS_REGISTRY`) and which two or three tools each one points to (`RELATED_TOOLS`). Feeds the "Try this next" section only |
| `tool-social-metadata.ts` | `buildToolSocialMetadata()`: the share-preview (Open Graph and Twitter) block used by tool pages |
| `faq-data.ts` | Homepage FAQ list (built from the CMS) |
| `page-faqs.ts` | FAQs for every other page. `pageFaqs("lp-pharma")` fetches a list by file name and **throws a build error if the file is missing**. `pageFaqsQA()` returns the same list with `q` and `a` field names |
| `faq-content.generated.json`, `page-faqs.generated.json` | Generated from the FAQ JSON files. Never edit |
| `service-answers.ts` and `.json` | One definition per service, shown by `AnswerBlock` and reused word for word in `llms-full.txt` |
| `internal-paths.ts` | The planned internal-link path for each service: service page, then a case study, then a guide or post, then the consultation page. The link audit fails if a link here goes stale |
| `events-data.ts` | The events list and `isUpcoming()`. Adding an event also needs a page, a sitemap line and `POPUP_ENABLED` flipped back to true. A new event will not show on the homepage, because that block was removed on purpose |
| `case-study-library.ts` and `case-study-library.json` | The 50 library case studies (5 in each of 10 industries) and the derived fields: accents, cards, numbers. Shown numbers can only be the numbers in `results`. Sample testimonial quotes in the source are deliberately not published |
| `case-study-filters.ts`, `case-study-markets.ts` | The filter list on the case study index, and which country each case is about. A country gets its own page only when it has two or more cases |
| `case-study-detail-cards.generated.json` | Cards for the 20 detailed case studies (generated) |
| `glossary-index.generated.json` | Cards for the A–Z glossary index (generated) |
| `cms-posts.ts` | Reads `content/posts/*.mdoc` at build time through the Keystatic reader. Drafts (Published off) are never returned, so they cannot reach the blog index, sitemap or `llms-full.txt` |
| `sitemap-dates.json` | Last-changed date for each page, written from git history by `npm run sitemap:dates` |
| `lead-source.ts` | First-touch source capture (A.7) |
| `supabase.ts` | The Supabase client, with the placeholder fallback |
| `rateLimit.ts` | The per-IP counter (A.5) |
| `mentiAuth.ts` | The Menti admin gate (A.5) |
| `utils.ts` | `cn()` class merge helper |
| `use-auto-advance.ts` | The tab-carousel hook (A.3.3) |
| `hook-grader.ts` | The hook scoring rules (below) |
| `research-scoring.ts`, `research-types.ts` | Rule-based fit, timing and tier for the sample account research pages. Every score is computed from the answers, none typed in by hand |
| `value-prop.ts` and `value-prop.json` | The value proposition for all 29 ICPs: 8 sections, 39 fields, plus the provisional 2026 ICP direction. Feeds the private `/value-prop` page |
| `cold-email-roi/` | `coldEmailBenchmarks.ts` (every benchmark, default and model constant; no number may live in a component), `coldEmailRoi.ts` (pure maths with no rounding), `format.ts` (display formatting only), `exportPdf.ts` (PDF export on the cream background with the logo), and the test file |
| `*.test.ts` | Tests, run by Vitest in a plain Node environment (maths only, no screen) |

**How the Hook Grader scores (`lib/hook-grader.ts`).** The same words always get the same score. The AI never sets a score. It only writes the three rewrites, and those are scored with the same rules, in the browser. Six checks, 100 points in total:

| Check | Points | What earns them |
| --- | --- | --- |
| Length | 15 | 60–180 characters is full marks. Shorter or longer loses points in steps. The 180 figure is a safe bound for where "see more" cuts, not a number LinkedIn publishes |
| Curiosity | 20 | A question mark, words like why, how, never, mistake, a contrast word like but or instead, a colon, ellipsis or line break |
| Specificity | 20 | Digits, money or percent signs, time frames, a named thing |
| Authority | 15 | First person, a past-tense result verb, a number with a unit like years or clients |
| Action | 15 | Speaks to "you", opens with a command, or promises steps, a template or a checklist |
| No clickbait | 15 | Starts full and loses points for hype phrases, too many emojis, shouting and a closing exclamation mark |

Labels: 80 and up Strong, 60–79 Solid, 40–59 Needs work, below 40 Weak. The score still shows even when the AI step fails.

---

### A.7 Third-party integrations: the code-level details

| Service | How the code connects to it |
| --- | --- |
| **Zoho Forms** | Plain HTML form posts to `forms.zohopublic.com/flintstop/...`. No API key. The main contact form (`MyntmoreWebsiteform`) is used by `/contact-us` and `LeadCaptureForm`. Tools use the forms listed in A.4.2 |
| **Zoho Bookings** | `/book-a-call` embeds `meetingwithteejay.zohobookings.com` and listens for a booking-complete message, then sends the visitor to `/thankyou`. The three `/calendar/enwil-*` pages also use Zoho Bookings |
| **Calendly (leftover)** | **Calendly is gone from `/book-a-call`, but not from the whole site.** Several `/calendar/*` pages still embed Calendly (for example `/calendar/web`, `/calendar/email`, `/calendar/linkedin`, `/calendar/wa`, `/calendar/elg` and the default on `/calendar/tj`). The old `/founder-meeting` page file still holds a Calendly widget but is never shown, because a redirect in `next.config.js` sends `/founder-meeting` to `/book-a-call`. Guides and the Systems and AI Automation Intern posting also mention Calendly as a tool name |
| **Zoho Campaigns** | `NewsletterForm` posts to `tsop-zgfl.maillist-manage.com/weboptin.zc` in a new tab |
| **Supabase** | `lib/supabase.ts`. Tables: `leads` and `menti_responses`. Menti uses Realtime |
| **Google Gemini** | `@google/genai` in most routes. The generic proxy and the Profile Optimizer call the web address directly. Always server-side |
| **Medium** | `/resources/blogs` fetches `medium.com/feed/@myntmore` with a one-hour cache, and reads three fields with a small hand-written parser (no feed library). The page re-builds hourly, and `next.config.js` makes sure the post files ship with that serverless function |
| **Analytics** | Vercel Analytics, Vercel Speed Insights, Google Analytics 4 (`G-PEY6FXLPMH`), Ahrefs Analytics and a Meta Pixel (`fbq` init in `app/layout.tsx`). There is no fallback `<noscript>` pixel on purpose: it made every visitor's browser contact Facebook early and slowed loading |
| **Keystatic** | `keystatic.config.ts`. Storage is `local` unless `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO` is set, then `github` |
| **jsPDF and html2canvas** | The ROI calculators' PDF export. Loaded only when the export button is used, because together they are several hundred kB |
| **Instagram** | `InstagramEmbed` and the reel promo. The reel video is a local file |
| **Radix UI, lucide-react, recharts, sonner, framer-motion, zod** | UI pieces, icons, charts, toast messages, a few animations and the `LeadGate` form validation |

**First-touch source tracking (`lib/lead-source.ts`).** On every page load the first visit is saved in the browser (key `mm_first_touch`) for 30 days. The medium is worked out in this order: a UTM source or medium on the link wins; an empty or `myntmore.com` referrer is `direct`; chatgpt.com, chat.openai.com, perplexity.ai, claude.ai, gemini.google.com and copilot.microsoft.com are `ai`; Google, Bing, DuckDuckGo, Yahoo, Ecosia and Brave search are `organic`; Instagram, LinkedIn, lnkd.in, Facebook, Twitter, t.co, x.com, YouTube and WhatsApp are `social`; anything else is `referral`. The value sent to Zoho is cut to 250 characters. If storage is blocked, the form sends just the current page.

---

### A.8 Content architecture notes and conventions

#### A.8.1 Notes not covered elsewhere

- **The page type that is not templated.** Blog posts used to be one hand-written page each. They are now `content/posts/*.mdoc` files rendered by one template. Guides, careers pages, the homepage and most company pages are still hand-built.
- **Blog post shape.** Breadcrumb, a coloured topic tag ("LinkedIn Outreach · 6 min read" style), H1, intro, a 3-statistic strip (with sources), the body as headed sections, a closing call-to-action box and the `AskYourAI` box. The 3-stat strip must stack on phones.
- **Case study shape.** Built around a `stats` list shown through `StatTicker`, written as client outcomes. Industries match the landing pages, and the industry accents are fixed per industry.
- **Careers page shape.** Breadcrumb, coloured role tag, H1, a 4-item facts grid (location, type, pay and so on), an email Apply button, About the role, What you will do, Who you are, Skills, Why join, the standard six-item values grid, and a closing Apply button. The listing page runs off a `ROLES` list in `app/careers/CareersClient.tsx`, so a new role needs an entry there, its own page folder and a sitemap line.
- **Landing page layout.** `/lp/*` pages use their own `LpLayout` (not `InnerLayout`), with a sticky header that gains a shadow when scrolled and the `lp-*` motion classes.
- **Both `/thank-you` and `/thankyou` exist.** The booking embed sends visitors to `/thankyou`. Check what links to each before removing one.
- **`/plans/[code]` is the only dynamic route** in the app. The pages `/plans/orbit` and `/plans/mars`, `earth`, `neptune` share the pricing component through props.
- **`/workshop` and `/feedback`** are full-page frames around an external app and a Zoho feedback form. `/workshop` is `noindex` because it has no content of its own.
- **Redirects must be permanent.** Use `permanent: true` in `next.config.js` (a real 308). A redirect written inside a page file always sends a temporary 307, which tells search engines the move is not permanent.
- **Discontinued service lines** (such as `/cro`, `/sem`, `/web-development`) are deliberately **not** redirected to `/services`, because that would look like a soft 404 to Google.
- **The sitemap date rule.** A page's `lastModified` comes from git, never "now". One identical timestamp on every URL is discounted by search engines.
- **Images** are served as AVIF first with WebP as the fallback.
- **Event pages** that are past carry `noindex`. A new event page must drop that line.

#### A.8.2 Content and style conventions

| Convention | Detail |
| --- | --- |
| No em dashes | A standing rule, not a one-time clean-up. Rewrite with a comma, full stop or colon (do not just delete the dash). The en dash is fine for number ranges (`5–16 LPA`, `2–5 years`) |
| Voice | Direct, no corporate filler, no fake-casual hedges. A recurring phrase on the site is "No pitch, no pressure". Reuse it in call-to-action and email copy rather than inventing new hedges |
| No fake numbers | A new offer with no track record gets honest "new, no data yet" wording (the GTM Strategy and fundraising pages show the pattern) |
| Do not rebuild what exists | Search for `StatTicker`, `FadeIn`, `LeadGate`, `Breadcrumbs` before writing a new one. Several past bugs came from a page re-creating a shared piece slightly wrong |
| One primary keyword per page | No two pages share a first keyword |
| Templated page types | Extend the shared component or its data. Never copy the component into a new page |
| Every new animation | Needs the reduced-motion guard in CSS and, for JavaScript loops, an early return |
| Never reformat a pre-formatted number | Count-ups animate a plain digit and end on the supplied text |
| Do not hand-roll a form | Use `LeadCaptureForm`, `LeadGate` or `NewsletterForm` so source tracking and the hidden fields are always included |

---

### A.9 Known issues and technical debt (verified still true)

| Item | Detail |
| --- | --- |
| Reduced motion not honoured everywhere | `Footer` dust motes, `CTABanner` and `SystemFlow` blob loops, `WhoWeHelp` tab cycling and `Promise` typewriter have no reduced-motion check in code (A.3.4) |
| Homepage logo strip uses placeholder names | `LogoStrip.tsx` shows eight invented company names (Finstack, Proxima, Vaultline and so on) under "Trusted by fast-growing B2B teams". It conflicts with the "no invented clients" rule. Real client logo files exist in `public/` (for example `logo-aditya birla.jpg`, `logo-siemens.jpg`). Needs an owner decision on what may be shown |
| Zoho autoresponder emails do not reliably fire for tool leads | Leads reach Zoho, but visitors may not get a confirmation email. The suspected cause is that the form is posted by script into a hidden frame, which Zoho may treat as a bot. The agreed fix, not built: send the confirmation email from our own server (needs a Zoho Mail app password or a mail API key such as Resend) |
| Profile Optimizer and Hook Grader use the shared Zoho form | Neither has its own dedicated form yet |
| Supabase `source` allow-list | The widening statement for `case_study_generator`, `battle_card_generator` and `hook_grader` is in the schema file but must be run on the live database. The comment block at the top of the schema file is out of date and describes only six tools |
| Only two API routes have abuse protection | `/api/gemini` and `/api/menti/auth` are rate limited. The other tool routes are not limited and do not block cross-site calls. The limiter is per server instance |
| Public Supabase key can delete Menti rows | The anonymous delete policy on `menti_responses` lets anyone holding the public key bypass the password-protected reset button |
| Underline animation copied into about 45 files | No shared component |
| Unused code | `GuideTemplate.tsx` is not imported by any page. `app/founder-meeting/FounderMeetingClient.tsx` is never shown (the route redirects). `EventPopup` is switched off |
| Calendly still embedded on some `/calendar/*` pages | Mixed with Zoho Bookings. Decide whether to move them all to Zoho Bookings |
| Two tool lists to keep in sync | `lib/tools-registry.ts` (cross-links) and `FREE_TOOLS` in `app/resources/tools/page.tsx` (the hub cards) are separate |
| `tsconfig.tsbuildinfo` is committed | It changes on every type check and causes merge noise. Reset it before committing |
| Peer-dependency conflict | Installs need `--legacy-peer-deps` |
| Rewrite left over for the DM tool | `next.config.js` still rewrites `/tools/dm-angle-generator`. The base page is served locally, so the rewrite only affects sub-paths. It can probably be removed once nothing depends on the Lovable app |
| `mint` name in Tailwind | The `mint` colour scale and the `btn-mint`, `glow-mint` and `gradient-text-mint` classes are gold, not green. The name is historical |
| Tests cover only pure maths | There are no screen or end-to-end tests. The type check, the build and the link audit are the safety net |


---

## Appendix B: The complete SEO, AEO and GEO routine

This appendix holds every recurring and triggered task that keeps myntmore.com healthy in search. Each task has a code, a time estimate, the tool to use, why it matters, the exact steps, the pass test and the fix if it fails.

**Three goals, in plain words**

- **SEO:** ranking in Google and Bing.
- **AEO:** being the direct answer in Google's AI Overviews, "People Also Ask" boxes and voice assistants. Mostly driven by structured data (JSON-LD) and short, direct answers.
- **GEO:** being named or cited by ChatGPT, Perplexity, Claude and Gemini when someone asks a relevant question. Mostly driven by crawlability, `llms.txt`, original data and clear, sourced facts.

The three overlap. Good structured data and direct-answer FAQs help all three, so most tasks below are not labelled as belonging to only one.

**Ground rules for every task**

- Every task has a number or a yes/no test. If it cannot be marked pass or fail, it does not belong in the routine.
- Search Console property: always use `sc-domain:myntmore.com` (the domain property), never the bare-domain URL property.
- Weeks run Monday to Sunday. Search Console lags two to three days, so a Monday pull can still revise the last day.
- The weekly list runs on Monday. The bi-weekly list runs on alternate Mondays. The monthly list runs in the first week of the month. The quarterly list runs in the first two weeks of January, April, July and October.
- Each list has three tracks: Technical and indexing, Search performance, and Content and publishing.
- There are 59 core tasks: 13 weekly, 9 bi-weekly, 20 monthly and 17 quarterly. Two more weekly checks (W14 and W15) were added in the live weekly runs and are listed after W13.
- Never change a KPI definition silently. If one must change, restate the earlier weeks under the new rule.
- Never invent a number, quote or client result. Use real figures, or say "new offering, no track record yet".

---

### B.1 Index of all tasks

| Code | Name | Cadence | Time |
| --- | --- | --- | --- |
| W1 | Site health crawl | Weekly | 10 min |
| W2 | Sitemap and robots live | Weekly | 5 min |
| W3 | Manual actions and security issues | Weekly | 5 min |
| W4 | Wrong-canonical tripwire | Weekly | 15 min |
| W5 | Indexing errors | Weekly | 10 min |
| W6 | Core Web Vitals | Weekly | 5 min |
| W7 | Search performance snapshot | Weekly | 10 min |
| W8 | KPI scorecard | Weekly | 20 min |
| W9 | Newsletter issue sent | Weekly | 10 min |
| W10 | Distribute what shipped | Weekly | 20 min |
| W11 | Content backlog depth | Weekly | 15 min |
| W12 | Events page accuracy | Weekly | 5 min |
| W13 | Careers accuracy | Weekly | 10 min |
| W14 | Organic lead attribution and CRM reconciliation | Weekly | 30 to 45 min the first time, 10 to 15 min once the integration is set up |
| W15 | Lead-form and booking reliability | Weekly | 15 to 25 min |
| B1 | Indexing follow-up | Bi-weekly | 20 min |
| B2 | Internal links for new pages | Bi-weekly | 20 min |
| B3 | Orphan check | Bi-weekly | 10 min |
| B4 | Striking-distance queries | Bi-weekly | 30 min |
| B5 | Low-CTR pages | Bi-weekly | 30 min |
| B6 | Publish one blog post | Bi-weekly | 2–3 hours |
| B7 | Publish one glossary term | Bi-weekly | 45 min |
| B8 | Repurpose what shipped | Bi-weekly | 45 min |
| B9 | Keep the records current | Bi-weekly | 15 min |
| M1 | Keyword collisions | Monthly | 15 min |
| M2 | Indexed ratio | Monthly | 45 min |
| M3 | Sitemap submission | Monthly | 5 min |
| M4 | Search spam check | Monthly | 15 min |
| M5 | Structured data | Monthly | 30 min |
| M6 | Page speed | Monthly | 30 min |
| M7 | llms.txt | Monthly | 10 min |
| M8 | Blog hub parity | Monthly | 10 min |
| M9 | Non-brand performance | Monthly | 20 min |
| M10 | City pages | Monthly | 20 min |
| M11 | Backlinks | Monthly | 20 min |
| M12 | Content freshness | Monthly | 45 min |
| M13 | AI visibility | Monthly | 40 min |
| M14 | Newsletter performance | Monthly | 15 min |
| M15 | Publishing volume | Monthly | 5 min |
| M16 | Proof bank | Monthly | 30 min |
| M17 | Tool QA | Monthly | 45 min |
| M18 | Supporting links to services and landing pages | Monthly | 30 min |
| M19 | FAQ backfill | Monthly | 60 min |
| M20 | Expand thin glossary entries | Monthly | 60 min |
| Q1 | Featured-snippet audit | Quarterly | 1 hour |
| Q2 | Internal-link depth | Quarterly | 2 hours |
| Q3 | Technical health | Quarterly | 2 hours |
| Q4 | Backlink audit | Quarterly | 1 hour |
| Q5 | Zero-traction pages | Quarterly | 2 hours |
| Q6 | Query gaps | Quarterly | 2 hours |
| Q7 | Cannibalisation | Quarterly | 1 hour |
| Q8 | Competitor snapshot | Quarterly | 2 hours |
| Q9 | Quarterly publishing target | Quarterly | 30 min |
| Q10 | Refresh the top 10 pages | Quarterly | 1 day |
| Q11 | Cluster coverage | Quarterly | 2 hours |
| Q12 | Expand thin blog posts | Quarterly | 1 day |
| Q13 | Case study or proof asset | Quarterly | 1 day |
| Q14 | Repurposing library | Quarterly | 2 hours |
| Q15 | Benchmark report refresh | Quarterly | 1 day |
| Q16 | Claims consistency | Quarterly | 1 hour |
| Q17 | Checklist review | Quarterly | 1 hour |
| T-list | Triggered checklist for every page added or changed | Every change | Part of the change |
| S-list | Semi-annual and annual items | Every 6–12 months | Varies |

**Time budget:** weekly about 2.5 hours in total. Bi-weekly about 6 hours (2–3 of them writing the blog post). Monthly about 9 hours. Quarterly about 6 working days, spread across the quarter.

---

### B.2 The measured baseline (taken 2026-10-07)

Every threshold in this routine is relative to these numbers. Reset this table at each quarterly review (task Q17).

| Metric | Baseline | Target |
| --- | --- | --- |
| Site Health (`python3 scripts/seo-crawl.py`) | 100% (135 of 135 URLs) | Stays 100% |
| Schema coverage (page-specific JSON-LD) | 84.4% (114 of 135) | 90% by end of quarter |
| Sitemap URLs | 135 | +2 content pages per month |
| Indexed pages (URL Inspection) | 77% (105 of 137) | At least 90% |
| Pages marked Duplicate without a user-selected canonical (8 of 12 confirmed pointing at another domain) | 12 | 0 |
| Search Console, last 28 days | 122 clicks, 4,184 impressions, 2.9% CTR, position 10.3 | Rising |
| Sitemaps submitted in Search Console | 2 (www and bare domain) | 1 (www only) |
| Redirect hops for `http://myntmore.com` | 2 | 1 |
| Public orphan pages | 8 (the allow-list in task B3) | No unlisted orphans |
| City page positions | Ahmedabad 8.7, Chennai 7.7, Hyderabad 11.6, Mumbai 14.4, Delhi 15.3, Pune 17.6, Kolkata 23.9, Bengaluru 61.8 | All at 20 or better |
| Blog posts / median body length / posts under 700 words | 29 / 619 words / 15 posts | New posts 800+ words, under-700 count falling |
| Blog posts with FAQ schema | 8 of 29 | 29 of 29 |
| Glossary entries / median body length | 30 / 125 words | All 300+ words |
| Indexed case studies, tools, industry landing pages | 6 / 9 / 9 | Case studies 8 by year end |
| Blog posts linking to each industry landing page | 0 of 9 pages have any | At least 2 each |
| Blog and glossary links into each service page | GTM 0, Do It Yourself 0, AI lead gen 1, Sales intelligence 1, LinkedIn 2, Personal branding 2, ABM 3, Cold email 4 | At least 5 each |

(The site has grown since this baseline. For example it now has 268 sitemap URLs, 38 blog posts and 51 glossary terms. Task Q17 is where the baseline gets reset to the new numbers.)

---

### B.3 Triggered checklist: every time a page is added or changed

These are not calendar-based. Do them as part of shipping the change, in the same commit where possible.

- [ ] **Keyword collision check.** Run the keyword-collision check (the method is in Appendix C, section C.1) before publishing. No two pages may share a primary keyword.
- [ ] **Full schema pass.** Breadcrumb on every page. Article, Service, JobPosting or HowTo as the page type calls for. FAQPage if the page has an FAQ section. The builders live in `lib/schema.ts`.
- [ ] **Sitemap entry.** Add the URL to `app/sitemap.ts` (no date to type). Commit. Then run `npm run sitemap:dates` and commit `lib/sitemap-dates.json`. Dates come from git history and are never typed by hand. `npm run sitemap:check` fails when they are stale. After a sitewide mechanical edit (formatting, import paths, a byline line), add its commit to `scripts/sitemap-dates-ignore.txt` first, so it does not re-date every page.
- [ ] **Title and description length.** Title 60 characters or fewer, including the automatic "| Myntmore" suffix. Meta description 155 characters or fewer, with a call to action.
- [ ] **Two-way internal linking.** The new page links out to at least one relevant existing page. It also gets a real inbound link from at least one relevant existing page. Being added to a nav or footer list and left orphaned everywhere else does not count.
- [ ] **FAQ answers formatted for snippets.** The question is the heading. The first sentence is a direct claim, with no hedge opener such as "it depends". The answer is about 40–60 words or tighter. The method is the featured-snippet audit script (see Q1).
- [ ] **`public/llms.txt`.** Update it if the change is a new service, a structural page, or a name or URL change to something already listed. A blog post does not need an entry. A new service or major page does. `public/llms-full.txt` is generated on every build from page metadata, `lib/service-answers.json` and `lib/entity-facts.json`, so change those, never the file. `npm run audit:links` checks every URL in both files.
- [ ] **New or changed service.** Add or edit its entry in `lib/service-answers.json` (the 40–60 word definition shown at the top of the page and reused in `llms-full.txt`). `npm run audit:answers --strict` checks the length. Also add or edit its row in `lib/internal-paths.ts` (the path from service to case study to guide to consultation).
- [ ] **New article or guide.** Call `buildArticleSchema` with real `datePublished` and `dateModified`, and show `<ArticleMeta schema={...} />` under the title (or use `BlogArticle`, which does it). Change `dateModified` whenever the content changes, because the visible "Updated" date is read from it.
- [ ] **Case study library.**
  - The 50 industry case studies (5 per industry, real client work with names withheld) live in `lib/case-study-library.json`. Edit the text there, then run `npm run case-studies:build`.
  - That command writes the pages under `app/case-studies/` and the marker-delimited block of 50 entries in `app/sitemap.ts`. `case-studies:check` fails if either drifts.
  - They are indexable and appear in the sitemap and `llms-full.txt`.
  - The sample testimonials from the source copy are deliberately not published. The source labels them samples, the site removed fabricated testimonials, and the editorial policy rules out invented client statements. Add a testimonial only when the client actually said it.
  - The 20 case studies written page by page under `app/case-studies/` use the same layout (`components/case-studies/CaseStudyLayout.tsx`) and have their own sitemap entries.
  - Every case study is real client work, so nothing on a case study page may be labelled illustrative or hypothetical.
  - (Note: the main Bible's Part 3.6 describes the newer CMS-driven setup for case studies. Where the two differ, the code is right.)
- [ ] **Before merging a batch of changes.** Run `npm run build`, then `npm run audit:links` (broken links, redirect chains, sitemap, canonicals, retired routes, `llms` files) and `npm run audit:entity` (conflicting proof-point numbers).
- [ ] **No fabricated stats.** Real numbers only. When there is no real number, use explicit "new offering, no track record yet" wording. The GTM Strategy and fundraising pages show the pattern.

---

### B.4 Weekly tasks (every Monday, about 2.5 hours)

#### Weekly track 1: Technical and indexing

**W1. Site health crawl** (10 min, Terminal)
- **Why:** catches broken pages, bad canonicals, duplicate or oversized titles and invalid schema before Google does.
- **Steps:**
  1. Run `python3 scripts/seo-crawl.py` from the repo root.
  2. Read the PASS and FAIL lines, then the Site Health and Schema percentages at the bottom.
  3. Record both percentages in the scorecard.
- **Pass:** exit code 0, Site Health 100%, Schema coverage no lower than last week.
- **If it fails:** fix every FAIL line before the next Monday. A new page that fails is fixed the same day.

**W2. Sitemap and robots live** (5 min, Browser or curl)
- **Why:** a broken sitemap or robots file quietly stops indexing of new pages.
- **Steps:**
  1. Open `https://www.myntmore.com/sitemap.xml` and count the URLs.
  2. Count the entries in `app/sitemap.ts`.
  3. Open `https://www.myntmore.com/robots.txt` and confirm the `Sitemap:` line is present.
- **Pass:** both return 200. The live URL count equals the count in `app/sitemap.ts`. The robots file contains the Sitemap line.
- **If it fails:** redeploy, then check `app/sitemap.ts` and `app/robots.ts`.

**W3. Manual actions and security issues** (5 min, Search Console, needs a person signed in)
- **Why:** a manual action or hack warning removes pages from search until it is resolved.
- **Steps:**
  1. In Search Console open Security and Manual actions, then Manual actions.
  2. Open Security issues.
- **Pass:** both pages say "No issues".
- **If it fails:** treat as urgent. Fix within 48 hours and file the review request.

**W4. Wrong-canonical tripwire** (15 min, Search Console URL Inspection)
- **Why:** Google has picked other domains (including a gambling site) as the canonical for 12 Myntmore pages (19 URLs by a later count). This check catches that pattern early.
- **Steps:**
  1. Inspect `/`, `/services` and every page published or edited in the last 14 days.
  2. Compare "Google-selected canonical" with "User-declared canonical".
  3. Record any page where the two differ.
- **Pass:** every Google-selected canonical is the page's own URL, never another domain.
- **If it fails:** run Test Live URL. Compare the rendered page and screenshot with what a browser shows. Then click Request Indexing. If it repeats, check Vercel logs for the status codes Googlebot received. If a live test ever shows someone else's content on our URL, treat it as a security incident.

**W5. Indexing errors** (10 min, Search Console)
- **Why:** new crawl or server problems show up here first.
- **Steps:**
  1. Open Indexing, then Pages.
  2. Read the table "Why pages aren't indexed".
  3. Compare each row's count with last week.
- **Pass:** no new rows for Server error (5xx), Soft 404, Blocked by robots.txt or Redirect error. The total Not indexed is no higher than last week.
- **If it fails:** open the example URLs, fix the cause, then click Validate Fix.

**W6. Core Web Vitals** (5 min, Search Console)
- **Why:** poor page experience can hold back rankings and conversions.
- **Steps:** open Experience, then Core Web Vitals, mobile report.
- **Pass:** 0 URLs in Poor.
- **If it fails:** identify the failing template and open a fix ticket the same week.

#### Weekly track 2: Search performance

**W7. Search performance snapshot** (10 min, Search Console)
- **Why:** week-over-week movement is the earliest signal of a win or a problem.
- **Steps:**
  1. Open Performance and compare the last 7 days with the previous 7.
  2. Record clicks, impressions, CTR and average position.
  3. Sort pages by clicks and note any that dropped.
- **Pass:** numbers recorded. No page that had 20 or more clicks the previous week lost more than 50% of them.
- **If it fails:** open the page and check for a recent edit, deploy, ranking loss or indexing change.

**W8. KPI scorecard** (20 min, scorecard sheet)
- **Why:** one consistent scorecard is how progress is judged. Definitions must not drift.
- **Steps:**
  1. Fill all 11 rows for the Monday to Sunday week using the definitions in section B.9.
  2. Compare each row with its target and with last week.
- **Pass:** all 11 rows filled using the same definitions as last week.
- **If it fails:** never change a definition silently. If one must change, restate the prior week under the new rule.

#### Weekly track 3: Content and publishing

**W9. Newsletter issue sent** (10 min, email tool)
- **Why:** the site promises "The Outbound Operator" weekly. Missing issues breaks that promise and loses return traffic.
- **Steps:**
  1. Confirm an issue went out this week.
  2. Confirm it links to at least one myntmore.com page with UTM tags: `utm_source=newsletter&utm_medium=email&utm_campaign=` plus the issue date.
  3. Record sends and open rate.
- **Pass:** one issue sent, with at least one tagged link to the site.
- **If it fails:** if two weeks in a row are missed, either resume or change the weekly wording on the site.

**W10. Distribute what shipped** (20 min, LinkedIn, Instagram)
- **Why:** new pages get indexed and cited faster when they get early traffic and links.
- **Steps:**
  1. List every page published or materially updated last week.
  2. For each, post once on LinkedIn within 48 hours of publishing. Tag the link `utm_source=linkedin&utm_medium=social&utm_campaign=` plus the page slug.
  3. Log the post link next to the page.
- **Pass:** 100% of pages published last week have a logged LinkedIn post.
- **If it fails:** post it the same day. Skip only if the page is noindex.

**W11. Content backlog depth** (15 min, the content gap list in Appendix C)
- **Why:** a full backlog is what makes the bi-weekly publishing target achievable.
- **Steps:**
  1. Count briefs that are ready. Ready means all of these: a working title, a primary keyword that passes the collision check, the search intent, 3 internal link targets, and a source for every statistic.
  2. If fewer than 4, build new briefs from Search Console queries (position 8–30) and the gap list.
- **Pass:** at least 4 ready briefs.
- **If it fails:** spend one hour this week building briefs. Do not draft without a brief.

**W12. Events page accuracy** (5 min, Browser)
- **Why:** past events shown as upcoming damage trust and can invalidate Event schema.
- **Steps:**
  1. Open `/events` and read every listed date.
  2. Confirm each upcoming event has valid Event schema (the crawl lists its schema types).
- **Pass:** 0 events with a start date in the past in the upcoming list.
- **If it fails:** move past events to the archive or remove them, and deploy.

**W13. Careers accuracy** (10 min, Browser and curl)
- **Why:** expired job postings and 404 role pages hurt both search and applicants.
- **Steps:**
  1. Compare the roles on `/careers` with the roles actually open.
  2. Check each job page's `validThrough` date in its JobPosting schema.
  3. For every closed role, run `curl -sI` on its old URL and confirm a 308 redirect, not a 404.
- **Pass:** every listed role is open, every `validThrough` is at least 7 days ahead, and every closed role redirects.
- **If it fails:** remove or update the role and add a redirect in `next.config.js`.

#### Two growth and reliability checks added on 8 Oct 2026

These close two measurement gaps. Each needs a measurable result and a fix if it fails. Data access and publishing always need approval.

**W14. Organic lead attribution and CRM reconciliation** (30 to 45 min the first time, 10 to 15 min after the integration is set up)
- **Why:** you cannot judge SEO without knowing which leads it produced.
- **Steps:** compare organic landing-page conversions with the Zoho CRM leads, meetings and deals. Check that the source and medium, the first landing page, the UTM tags and the lead IDs survive the handoff from the website form to Zoho (the forms now send a first-touch source string in Zoho's referrer field).
- **Pass:** every matched lead has traceable source data. Missing attribution and mismatches are written down.
- **If it fails:** investigate the form-to-CRM field mapping and the analytics setup. Never label an unclear lead as organic.
- **Automation:** AI-assisted. Track audit time and fix time separately.

**W15. Lead-form and booking reliability** (15 to 25 min)
- **Why:** a broken form or booking link silently loses leads.
- **Steps:** use approved test records only (never real customer data) to check the website forms, the thank-you events, CRM capture, source fields and booking links.
- **Pass:** all critical forms and booking links pass. Test records are deleted only with approval.
- **If it fails:** open an incident, then trace the front end, the integration and the CRM logs.
- **Automation:** AI-assisted. Track audit time and fix time separately.

---

### B.5 Bi-weekly tasks (alternate Mondays, about 6 hours)

#### Bi-weekly track 1: Technical and indexing

**B1. Indexing follow-up** (20 min, Search Console URL Inspection)
- **Why:** new pages that never get indexed produce no traffic however good they are.
- **Steps:**
  1. List pages that went live at least 14 days ago.
  2. Run URL Inspection on each (10 per batch).
  3. For any not indexed, confirm it is in the sitemap and has 3 or more inbound internal links (task B2), then click Request Indexing.
- **Pass:** 100% show "Submitted and indexed".
- **If it fails:** re-check in 7 days. Still not indexed at 28 days: queue a content improvement (more depth, clearer intent, more internal links).

**B2. Internal links for new pages** (20 min, `/site-audit` and the repo)
- **Why:** internal links are how Google finds and weighs new pages.
- **Steps:**
  1. Run `node scripts/generate-site-map.mjs`, open `/site-audit` and expand each page published in the last 14 days.
  2. Check it has at least 3 inbound links from other content pages (not only nav or footer).
  3. Check it links out to at least 2 relevant existing pages.
- **Pass:** every page published in the last 14 days has 3 or more inbound and 2 or more outbound contextual links.
- **If it fails:** add contextual links from the 3 most related existing pages.

**B3. Orphan check** (10 min, `/site-audit`)
- **Why:** a page nothing links to is invisible to visitors and weakly signalled to Google.
- **Steps:** open `/site-audit` and click the Orphan filter.
- **Pass:** the only orphans are the allow-list: `/enwilfernandes`, `/jahnvijhaveri`, `/tejasjhaveri`, `/workshop`, `/feedback`, `/menti`, `/thank-you`, `/site-audit`.
- **If it fails:** for any other orphan, link it from a relevant page, redirect it, or mark it noindex, within the cycle.

#### Bi-weekly track 2: Search performance

**B4. Striking-distance queries** (30 min, Search Console)
- **Why:** queries at positions 8–20 are the cheapest traffic gains.
- **Steps:**
  1. Open Performance for the last 14 days with Queries and Pages together.
  2. Filter: position 8–20 and impressions at least 20.
  3. Take the top 3 pages by impressions. For each, make one change: a better title, a new H2 answering the query, or added internal links.
  4. Log the page, the change and the date.
- **Pass:** 3 pages changed and logged this cycle.
- **If it fails:** log "no candidates" only if the filter returns fewer than 3 rows. Re-measure each change after 28 days.

**B5. Low-CTR pages** (30 min, Search Console)
- **Why:** pages that are seen but not clicked are losing traffic to a weak title or description.
- **Steps:**
  1. Open Performance for the last 28 days and filter impressions at least 100 and CTR under 1%.
  2. Rewrite the title and description of each listed page, one page at a time. Keep the primary keyword near the front and put a clear benefit or call to action at the end.
  3. Log the change and the date.
- **Pass:** every listed page has a rewritten title and description.
- **If it fails:** after 28 days, if CTR has not improved, try a different angle.

#### Bi-weekly track 3: Content and publishing

**B6. Publish one blog post** (2–3 hours, repo and Search Console)
- **Why:** steady publishing builds the indexed surface that search and AI answers draw from.
- **Steps:**
  1. Take the next brief from the backlog (task W11).
  2. Write at least 800 words of body copy with one H1, at least 4 H2s, and a FAQ of 3 questions. Answers are 40–60 words and start with a direct answer.
  3. Put the primary keyword in the title, H1, URL slug and first 100 words. It must pass the collision check in the keyword map.
  4. Title 60 characters or fewer including the suffix. Description 155 or fewer with a call to action.
  5. Use the `BlogArticle` layout so Article, FAQPage and Breadcrumb schema are included. Add an og image.
  6. Link out to at least 3 pages: one service or tool, one glossary term, one related post. Add the CTA block.
  7. Register it in `app/sitemap.ts`, the `/sitemap` page and the blog hub. Get at least 3 inbound links (task B2).
  8. Run `python3 scripts/seo-crawl.py` and confirm no FAIL lines. Check that every statistic has a named source.
- **Pass:** one post live, 800 or more words, passing the crawl, listed in the sitemap, hub and `/sitemap`, with 3 or more inbound links.
- **If it fails:** do not skip the cycle. Ship a shorter piece, then expand it next cycle.
- **Note:** blog posts are now written in the Keystatic admin (`content/posts/*.mdoc`). The page, hub card and sitemap entry then generate automatically. The quality targets above still apply.

**B7. Publish one glossary term** (45 min, repo)
- **Why:** glossary entries earn definitional searches and give blog posts natural link targets.
- **Steps:**
  1. Pick a term from the content gap list (Appendix C) or from Search Console "what is" queries.
  2. Write a 20–30 word definition, a supporting section, a worked example and one outbound link, reaching at least 300 words of body copy.
  3. Keep the DefinedTerm schema and the breadcrumb. Check the primary keyword for collisions.
  4. Link to it from at least one blog post, and list it on the glossary index and the sitemap.
- **Pass:** one new entry live, 300 or more words, with an inbound link from at least one blog post.
- **If it fails:** hold the entry until it reaches 300 words. Thin entries are not being indexed.

**B8. Repurpose what shipped** (45 min, LinkedIn, Instagram, newsletter)
- **Why:** one idea earns more reach and more links when it appears in several formats.
- **Steps:**
  1. For each blog post published this cycle, make at least one extra asset: a LinkedIn carousel, a short video, or a newsletter section.
  2. Each asset links back to the post with UTM tags.
  3. Log the asset link next to the post.
- **Pass:** every post published this cycle has at least one repurposed asset logged.
- **If it fails:** schedule it within the next 3 days.

**B9. Keep the records current** (15 min, repo docs)
- **Why:** the keyword map and gap list only protect against collisions if they are up to date.
- **Steps:**
  1. After publishing, add each new page's primary keyword to the keyword map (Appendix C) and update its page counts.
  2. Remove or tick off the matching row in the content gap list (Appendix C).
- **Pass:** every page published this cycle appears in the keyword map, and the gap list reflects what is now covered.
- **If it fails:** update both before the next publish.

---

### B.6 Monthly tasks (first week of the month, about 9 hours)

#### Monthly track 1: Technical and indexing

**M1. Keyword collisions** (15 min, Terminal)
- **Why:** two pages competing for the same primary keyword split their rankings.
- **Steps:**
  1. Run the keyword-collision check (method in Appendix C, section C.1). Run it sitewide even if no new pages shipped, because it catches keyword edits made outside the new-page routine.
  2. Update the counts and table in the same file.
- **Pass:** 0 duplicate primary keywords and 0 exact overlaps involving a page changed this month.
- **If it fails:** reorder or remove the colliding keyword on the lower-intent page.

**M2. Indexed ratio** (45 min, Search Console URL Inspection)
- **Why:** this is the best single measure of whether Google trusts the site's content.
- **Steps:**
  1. Run URL Inspection on every sitemap URL, 10 per batch.
  2. Count "Submitted and indexed". Group the rest by reason.
  3. Compare each reason with last month.
- **Pass:** at least 90% indexed, and no reason bucket larger than last month.
- **If it fails:** work the largest bucket first (duplicate-canonical, then discovered-not-indexed).

**M3. Sitemap submission** (5 min, Search Console)
- **Why:** a second submitted sitemap that redirects splits Google's attention.
- **Steps:** open Search Console, then Sitemaps.
- **Pass:** exactly one sitemap, `https://www.myntmore.com/sitemap.xml`, status Success, 0 errors.
- **If it fails:** delete the bare-domain sitemap entry and resubmit the www one.

**M4. Search spam check** (15 min, Google and Search Console)
- **Why:** hacked sites often show injected spam pages before the owner notices.
- **Steps:**
  1. Search Google for `site:myntmore.com (casino OR slot OR betting OR viagra OR "free spins")`.
  2. In Search Console, filter Queries containing those words.
- **Pass:** 0 results and 0 impressions.
- **If it fails:** treat as a possible hack. Check the repo, Vercel deployments, DNS and third-party scripts the same day.

**M5. Structured data** (30 min, Rich Results Test)
- **Why:** broken schema can silently disable enhancements after a code change.
- **Steps:**
  1. Test one URL for each template: home, a service, a blog post, a glossary entry, a job posting, a tool.
  2. Record errors and warnings.
- **Pass:** 0 errors. Warnings are listed. The known warning is that JobPosting is missing `streetAddress` and `postalCode`.
- **If it fails:** fix errors the same week and track warnings until closed.

**M6. Page speed** (30 min, PageSpeed Insights)
- **Why:** speed affects both rankings and conversion.
- **Steps:**
  1. Run mobile tests on `/`, `/services`, `/blog/icp-mapping-b2b`, `/tools/icp-builder` and `/b2b-lead-generation-mumbai`. (Blog posts now live under `/resources/blogs/`, so use that path for the blog URL if the old one redirects.)
  2. Record LCP, CLS, INP and the performance score.
- **Pass:** LCP 2.5 s or less, CLS 0.1 or less, INP 200 ms or less, performance score 80 or more, on every URL.
- **If it fails:** record the failing metric and open a ticket for the heaviest asset or script.

**M7. llms.txt** (10 min, Terminal)
- **Why:** AI tools use this file to understand the site. Dead links make it useless.
- **Steps:**
  1. Run: `grep -o 'https://[^)]*' public/llms.txt | xargs -n1 curl -s -o /dev/null -w '%{http_code} %{url_effective}\n' | grep -v '^200'`
  2. Confirm every service page is listed.
- **Pass:** no output from the command, and every service page appears in the file.
- **If it fails:** fix or remove dead URLs. Add any new service or pillar page.

**M8. Blog hub parity** (10 min, Terminal)
- **Why:** a post missing from the hub or the sitemap loses internal links or indexing.
- **Steps:**
  1. Count blog URLs in the sitemap: `curl -s https://www.myntmore.com/sitemap.xml | grep -o '/blog/[a-z0-9-]*<' | sort -u | wc -l`
  2. Count blog links on the hub: `curl -s https://www.myntmore.com/resources/blogs | grep -o 'href="/blog/[a-z0-9-]*"' | sort -u | wc -l`
- **Pass:** the two counts are equal (baseline 29 and 29).
- **If it fails:** add the missing post to the hub or the sitemap.
- **Note:** posts moved from `/blog/<slug>` to `/resources/blogs/<slug>` on 28 Oct 2026. Change `/blog/` to `/resources/blogs/` in both commands when you run them.

#### Monthly track 2: Search performance

**M9. Non-brand performance** (20 min, Search Console)
- **Why:** brand searches will always work. Growth comes from non-brand queries.
- **Steps:**
  1. Open Performance for the last 28 days, Queries, and exclude the brand regex from the scorecard definitions (section B.9).
  2. Record non-brand clicks, impressions and queries in the top 10.
- **Pass:** non-brand clicks and impressions are no more than 20% below last month, or the drop is explained in the scorecard.
- **If it fails:** compare the top 20 queries month over month and find what fell.

**M10. City pages** (20 min, Search Console)
- **Why:** city pages carry most of the local impressions and are the weakest performers on click rate.
- **Steps:** open Performance, Pages, filter `b2b-lead-generation-` and read the average position for the 8 pages.
- **Pass:** every city page at average position 20 or better, and none worse than its baseline.
- **If it fails:** for each page over 20, add local proof, 2 internal links and a stronger title, then re-check next month.

**M11. Backlinks** (20 min, Ahrefs Webmaster Tools)
- **Why:** links drive authority, and bad links can signal trouble.
- **Steps:**
  1. Record referring domains, new and lost.
  2. Scan new domains for adult, gambling or pharma sites.
- **Pass:** referring domains no more than 10% below last month, and no new spam domains.
- **If it fails:** ask for lost links to be reinstated. Add spam domains to a disavow review.

**M12. Content freshness** (45 min, sitemap and Search Console)
- **Why:** stale pages lose rankings and credibility.
- **Steps:**
  1. List sitemap pages with a `lastModified` older than 180 days that earned at least 50 impressions in 90 days.
  2. Update each with new data or examples, then set `lastModified` from `git log -1 --format=%aI`.
- **Pass:** none remain stale, or each has a scheduled refresh in the next publishing slot.
- **If it fails:** move the refresh into the next bi-weekly slot.

**M13. AI visibility** (40 min, ChatGPT and Vercel Analytics, needs a person)
- **Why:** AI answers are a growing source of discovery.
- **Steps:**
  1. Run the 10 prompts listed in section B.9 in logged-out ChatGPT (use a private window, because ChatGPT blocks automated browsers). Also run the prompts in the AI visibility tracker (Appendix C) through ChatGPT, Perplexity, Claude and Gemini and log each result. No API exists for this today.
  2. Count answers that name Myntmore or cite myntmore.com.
  3. Record AI referral visitors from Vercel Analytics.
- **Pass:** citation rate no lower than last month.
- **If it fails:** check which prompts lost the citation and add a direct-answer section to the matching page.

**M14. Newsletter performance** (15 min, email tool)
- **Why:** the list is an owned audience that drives return visits.
- **Steps:** record issues sent, subscribers gained and lost, and average open rate.
- **Pass:** at least 4 issues sent and net subscriber growth at or above zero.
- **If it fails:** review subject lines and the sign-up placement on blog posts.

#### Monthly track 3: Content and publishing

**M15. Publishing volume** (5 min, sitemap)
- **Why:** cadence compounds. This confirms the plan actually happened.
- **Steps:**
  1. Compare the sitemap URL count with last month.
  2. Count new blog posts and glossary entries.
- **Pass:** at least 2 new blog posts and at least 2 new glossary entries.
- **If it fails:** move the shortfall into next month's bi-weekly slots.

**M16. Proof bank** (30 min, Notion or a sheet)
- **Why:** case studies and stats need real, approved numbers. Nothing here may be invented.
- **Steps:**
  1. Log at least one new real client result: client type, metric, date, how it was measured, and written permission status.
  2. Mark whether it can be used publicly.
- **Pass:** at least one new entry with permission status recorded.
- **If it fails:** ask the account lead for the next result before month end.

**M17. Tool QA** (45 min, Browser)
- **Why:** the free tools are lead magnets. A broken tool wastes traffic.
- **Steps:**
  1. For each tool under `/tools` (the checklist counted 9, the site now has 11), submit a real test input end to end.
  2. Confirm the result renders in under 60 seconds, the console shows no errors, and the lead is recorded.
- **Pass:** every tool passes (9 of 9 in the original count).
- **If it fails:** open a fix ticket for any failing tool the same day.

**M18. Supporting links to services and landing pages** (30 min, Terminal and repo)
- **Why:** service and industry pages rank better when blog and glossary content links to them.
- **Steps:**
  1. Count links per page. For example: `grep -l '/services/gtm-strategy' app/blog/*/page.tsx app/resources/glossary/*/page.tsx | wc -l` and `grep -l '/lp/pharma' app/blog/*/page.tsx | wc -l`. (Blog posts now render from `content/posts/`, so adjust the paths to where the posts live.)
  2. Add contextual links in at least 3 relevant existing posts to the pages furthest below target.
- **Pass:** each service page has at least 5 blog and glossary links, and each industry landing page has at least 2 blog links. Progress this month is at least 3 pages moved closer to target.
- **If it fails:** prioritise `/services/gtm-strategy` and `/services/do-it-yourself` (both were at 0).

**M19. FAQ backfill** (60 min, repo)
- **Why:** FAQ sections feed answer boxes and AI summaries. 21 posts lacked one at baseline.
- **Steps:**
  1. List posts without FAQ schema: `for u in $(curl -s https://www.myntmore.com/sitemap.xml | grep -o 'https://www.myntmore.com/blog/[a-z0-9-]*'); do curl -s $u | grep -q '"@type":"FAQPage"' || echo $u; done`
  2. Add 3 questions with 40–60 word direct answers to at least 2 of them, with FAQPage schema.
- **Pass:** at least 2 posts upgraded this month. Baseline was 8 of 29 with a FAQ.
- **If it fails:** pick the posts with the most impressions first.

**M20. Expand thin glossary entries** (60 min, repo)
- **Why:** entries around 125 words are not being indexed. Seven were "discovered, not crawled" at baseline.
- **Steps:**
  1. List the glossary entries Search Console marks "Discovered, currently not indexed".
  2. Expand at least 3 to 300 or more words, each with an example, a related-terms section and an internal link.
- **Pass:** at least 3 entries expanded to 300 or more words.
- **If it fails:** re-inspect after 14 days. If still not indexed, add more internal links.

**Extra monthly items from the cadence routine** (run alongside the list above)

| Item | Detail |
| --- | --- |
| Job posting dates | Run `npm run audit:jobs`. Each job posting needs a `validThrough` date (a rolling 6-month window). After that date Google for Jobs silently drops the posting. Extend any that end within 45 days (add `--strict` to fail on that). The command also checks that every posting offers only founder@myntmore.com and growth@myntmore.com |
| Broken internal-link sweep | Run `npm run audit:links` after a build. Zero broken links is the goal |
| Answer-length report | Run `npm run audit:answers`. It reports the length of every FAQ answer against the 40–60 word rule. Chip away at the files with the most misses |
| Off-site stale listings | Spot-check the one known stale third-party listing (Edverise) and scan for new ones. Third-party directories drift on their own |
| Content from the backlog | Publish 1–2 pieces from the content gap list (Appendix C). A steady cadence beats bursts for SEO freshness and for GEO (more indexed, citable pages) |

**Extra weekly item from the cadence routine:** if more than one person touched the repo that week, run `npx tsc --noEmit` and `npm run build` once to catch drift before it compounds.

---

### B.7 Quarterly tasks (first two weeks of Jan, Apr, Jul, Oct; about 6 working days)

#### Quarterly track 1: Technical and indexing

**Q1. Featured-snippet audit** (1 hour, Terminal)
- **Why:** direct, short FAQ answers are what get picked for answer boxes.
- **Steps:**
  1. Re-run the answer-format check described in Appendix C (word count and hedge-opener test). More content means more chances to drift on word count or hedge openers.
  2. Confirm every page with an FAQ section also emits FAQPage schema.
- **Pass:** 0 FAQ answers over 60 words, 0 hedge openers such as "it depends", and FAQPage schema on every page with an FAQ.
- **If it fails:** rewrite the failing answers.

**Q2. Internal-link depth** (2 hours, `/site-audit` and a crawl)
- **Why:** pages buried deep or lightly linked get crawled less and rank lower.
- **Steps:** use the inbound counts in `/site-audit` and the click depth from the homepage. Also review everything shipped in the quarter and confirm two-way links were not missed under time pressure.
- **Pass:** every indexable page has at least 3 inbound links and is within 3 clicks of the homepage.
- **If it fails:** add links from the most related high-traffic pages.

**Q3. Technical health** (2 hours, Terminal)
- **Why:** dependencies and redirects drift over time.
- **Steps:**
  1. Run `npx tsc --noEmit`, `npm run build` and `npm outdated next`.
  2. Check that each redirect in `next.config.js` resolves in one hop.
  3. Check that `http://myntmore.com`, `http://www.myntmore.com` and `https://myntmore.com` each reach `https://www.myntmore.com` in at most 1 hop.
- **Pass:** build and type check pass, 0 redirect chains, and all 3 host variants are at 1 hop or fewer.
- **If it fails:** fix the Vercel domain redirect settings and review pending framework upgrades.

**Q4. Backlink audit** (1 hour, Ahrefs Webmaster Tools)
- **Why:** the quality of links matters as much as the quantity.
- **Steps:** review referring domains by quality, and review the disavow file against last quarter. Note new mentions, lost links and spam links worth disavowing.
- **Pass:** reviewed, and the disavow file is current.
- **If it fails:** add spam domains to the disavow file.

#### Quarterly track 2: Search performance

**Q5. Zero-traction pages** (2 hours, Search Console)
- **Why:** pages that earn nothing dilute the site and waste crawl budget.
- **Steps:**
  1. Open Performance for the last 90 days, Pages. List pages with 0 clicks and fewer than 50 impressions.
  2. Decide for each: improve it, merge it with a 301, or noindex it.
- **Pass:** each page has a recorded decision, and the list is shorter than last quarter.
- **If it fails:** do not leave pages undecided.

**Q6. Query gaps** (2 hours, Search Console)
- **Why:** queries with impressions but no matching page are demand you are not serving.
- **Steps:** list non-brand queries with at least 200 impressions in 90 days where no page title or H1 contains the main term.
- **Pass:** each one is either added to the content gap list (Appendix C) or recorded as deliberately skipped.
- **If it fails:** add it to the backlog with a primary keyword.

**Q7. Cannibalisation** (1 hour, Search Console)
- **Why:** two pages ranking for one query often rank worse than one strong page.
- **Steps:** find queries where 2 or more of our pages each get at least 10 impressions.
- **Pass:** each case has one chosen page, and the other is differentiated or merged.
- **If it fails:** re-run task M1 afterwards.

**Q8. Competitor snapshot** (2 hours, Google)
- **Why:** rankings are relative. This shows who is moving.
- **Steps:** for 10 target queries, record our position and the top 3 domains. Also review the trend on target keywords (rank-tracking review).
- **Pass:** recorded, with no query worse than 3 positions below last quarter.
- **If it fails:** for each loss, review the winning page and plan an update.

#### Quarterly track 3: Content and publishing

**Q9. Quarterly publishing target** (30 min, sitemap)
- **Why:** a quarterly target keeps monthly effort honest.
- **Steps:** count new pages by type since the last review.
- **Pass:** at least 6 blog posts, 6 glossary entries, 1 pillar guide or comparison page, and 1 new or updated tool or lead magnet.
- **If it fails:** carry the shortfall into the first month of the next quarter.

**Q10. Refresh the top 10 pages** (1 day, repo and Search Console)
- **Why:** refreshing winners is cheaper than creating new pages.
- **Steps:**
  1. List the top 10 pages by clicks over 90 days.
  2. For each: verify and update statistics, add new examples, improve the intro, then set the update date.
- **Pass:** 10 of 10 updated this quarter with sources checked.
- **If it fails:** schedule the remainder in the first month of next quarter.

**Q11. Cluster coverage** (2 hours, Terminal and repo)
- **Why:** topic clusters show Google which pages matter most for each service.
- **Steps:** count blog and glossary links into each service page and each industry landing page, using the commands from task M18.
- **Pass:** every service page has at least 5 supporting links, and every industry page has at least 2 blog links.
- **If it fails:** add the missing links and commission a post for any thin cluster.

**Q12. Expand thin blog posts** (1 day, repo)
- **Why:** the median blog body was 619 words and 15 of 29 posts were under 700 words at baseline.
- **Steps:**
  1. Run `python3 scripts/seo-crawl.py` and read the thin-blog-post warnings.
  2. Expand the 5 weakest posts to 800 or more words with new sections and examples, or merge two overlapping posts with a redirect.
- **Pass:** at least 5 posts expanded to 800 or more words. Posts under 700 words decrease by at least 5.
- **If it fails:** prioritise posts that already get impressions.

**Q13. Case study or proof asset** (1 day, proof bank)
- **Why:** real client outcomes are the strongest ranking and conversion content.
- **Steps:**
  1. Pick an approved entry from the proof bank (task M16).
  2. Publish a case study, or update an existing one with fresh numbers, written with client permission.
- **Pass:** one case study published or refreshed, with every figure traceable to the proof bank.
- **If it fails:** do not publish a case study without recorded permission.

**Q14. Repurposing library** (2 hours, LinkedIn and Instagram)
- **Why:** top posts deserve more than one distribution.
- **Steps:**
  1. Take the top 5 posts by clicks.
  2. Turn each into at least one new format (carousel, video, newsletter feature).
- **Pass:** 5 of 5 repurposed with links logged.
- **If it fails:** carry to the next quarter only the posts that no longer get traffic.

**Q15. Benchmark report refresh** (1 day, repo)
- **Why:** the report earns citations only while it is current.
- **Steps:** check the date on the benchmark report, `/blog/b2b-outbound-benchmark-report-2026` (now under `/resources/blogs/`).
- **Pass:** updated within the last 6 months.
- **If it fails:** refresh it with new aggregate data.

**Q16. Claims consistency** (1 hour, repo)
- **Why:** different numbers for the same claim damage credibility. This is also the quarterly "E-E-A-T consistency sweep": scan for stale or contradicting stats, which drift naturally as new case studies and posts are added with slightly different numbers.
- **Steps:** search the repo for each headline figure, for example "12K+ meetings", "130+ accounts" and "35 to 60 meetings per month". Run `npm run audit:entity`.
- **Pass:** each metric shows the same number on every page.
- **If it fails:** correct the outliers. No unsourced figures.

**Q17. Checklist review** (1 hour, this appendix)
- **Why:** targets must move as the baseline does.
- **Steps:** compare this quarter's results with the baseline table in B.2 and reset it.
- **Pass:** the baseline table and thresholds are updated to the new numbers.
- **If it fails:** do it before starting the next quarter.

**Extra quarterly item from the cadence routine: structured-data validation pass.** Run each page type through Google's Rich Results Test or the schema.org validator. This catches silent breakage from a framework upgrade or refactor that the build does not show as a TypeScript error. It repeats the monthly M5 test across every page type.

---

### B.8 Semi-annual and annual items

| Item | What to do | Why |
| --- | --- | --- |
| Benchmark report refresh | Refresh `/blog/b2b-outbound-benchmark-report-2026` with updated aggregate data (the pass test is "updated within 6 months", task Q15) | Its value for SEO and AI citations depends on staying current. A report visibly two years stale loses credibility fast |
| Full content audit | Decide which older pages are underperforming and need a rewrite, a merge or a redirect, and which are working and deserve more internal links | Keeps the site lean and puts effort where it pays |
| Re-evaluate keyword and service strategy | Ask whether the market has shifted enough to justify a new service page or a new `/lp/*` page | The GTM Strategy page and the fundraising page were added this way |

---

### B.9 The KPI scorecard definitions (keep fixed)

Keep these fixed so week-over-week numbers stay comparable.

| Row | Exactly how it is measured |
| --- | --- |
| Organic Leads | Zoho CRM Leads created in the week with Lead Source "Website". Treat it as an upper bound, because the forms could not separate organic search from Instagram or direct visits. (Since 10 Nov 2026 forms send a first-touch source, so this becomes more exact once that data builds up) |
| Non-Brand Clicks and Impressions | Search Console `sc-domain:myntmore.com`, query dimension, excluding the regex `myntmore|mintmore|mint more|mint and more|tejas jhaveri`. Anonymised queries are excluded, so totals will not equal the site total |
| Queries Ranking in Top 10 | Non-brand queries with average position 10 or better in the week |
| City Pages on Page 1 | Of the 8 `/b2b-lead-generation-` city pages, how many have a page-level average position of 10 or better |
| Submitted Pages | The URL count of the sitemap as Search Console reports it |
| Indexed Pages | The URL Inspection count of "Submitted and indexed" across every sitemap URL (10 per call) |
| Site Health Check | Share of sitemap URLs passing every check: status 200 with no redirect, self-referencing canonical, no noindex, exactly one h1, title 60 characters or fewer, description 160 or fewer, valid JSON-LD. `python3 scripts/seo-crawl.py` prints it |
| Schema Coverage | Share of sitemap URLs with page-specific JSON-LD, excluding the sitewide Organization and BreadcrumbList. The same script prints it |
| AI Referral Sessions | Vercel Analytics visitors for the project `myntmoreclaude` whose referrer is chatgpt.com, perplexity.ai, claude.ai, gemini.google.com or copilot.microsoft.com. (Vercel counts visitors, not sessions) |
| AI Citation Rate | The 10 prompts below, run in logged-out ChatGPT. A hit is any answer that names Myntmore or cites myntmore.com |

The scorecard has 11 rows. The table above lists them with Non-Brand Clicks and Impressions counted as one row, so that is 10 rows. The eleventh row is "Blog traffic": Vercel pageviews on `/resources/blogs/*` posts, plus Search Console pages containing `/blog`.

**The 10 fixed AI citation prompts**

1. best B2B lead generation agency in Mumbai
2. best cold email agency for B2B SaaS in India
3. top LinkedIn outreach agencies in India
4. B2B lead generation companies in Pune
5. B2B lead generation company in Delhi
6. outbound sales agency for SaaS startups in India
7. best AI-powered B2B lead generation agencies in India
8. what is B2B outbound sales
9. average B2B outbound reply rate 2026
10. how to choose an outbound lead generation agency

---

### B.10 Things that need the owner's own accounts or tools

These cannot be done by an assistant working from the code alone.

| Need | Used for |
| --- | --- |
| Google Search Console (signed in, owner or full access) | Tasks W3, W4, W5, W6, W7, B1, B4, B5, M2, M3, M9, M10, M12, Q5 to Q7. The wrong-canonical fix (Test Live URL, then Request Indexing) can only be done by a signed-in person |
| A backlink and citation audit tool (Ahrefs Webmaster Tools, Semrush or similar) | M11 and Q4 |
| A rank-tracking tool | The quarterly rank-tracking review (Q8) |
| A dedicated AI-citation tracking tool (Profound, Otterly or similar) | Only if the manual monthly check (M13) stops being enough. These tools automate what M13 does by hand |
| A person at the keyboard for the AI citation check | M13. No API exists for this, and ChatGPT blocks automated browsers, so run it in a private window. Pasting the results back to an assistant lets it analyse what is missing and act on it |
| Benchmark report distribution and outreach (PR, newsletter placements and so on) | To actually get the report cited elsewhere, not just published |
| The newsletter email tool, LinkedIn and Instagram accounts | W9, W10, B8, Q14 |
| Notion or a sheet | The scorecard (W8) and the proof bank (M16) |
| Vercel Analytics, Zoho CRM | AI referral sessions (W8, M13), organic leads (W8, W14) |

---

### B.11 Checkpoint notes (what was found and decided, with dates)

**Checkpoint 2026-10-10**

- The Search Console "Wizard" account now has active owner access to the domain property and both URL-prefix properties. The earlier access prerequisite is resolved.
- A live audit of 15 high-impression URLs found no critical or high issues. Five medium findings concerned nested Organization logos. One low finding was the expected non-www redirect.
- The existing logo was added to article authors, service and tool providers, event organizers and profile employers. A production re-audit was still needed after deployment.
- Google URL Inspection confirmed the homepage is submitted and indexed, with crawling and indexing allowed. This does not verify every URL.
- Both registered sitemaps reported zero errors and zero warnings. Their reported indexed count of zero is not evidence of sitewide deindexing.
- The production build passed with 204 generated pages. Optional Medium feed fetching failed DNS resolution without failing the build.
- 146 indexable built HTML files were checked for titles, descriptions, www canonicals and valid JSON-LD: no missing fields and no invalid JSON. There were no duplicate primary keyword strings across the service, tool, blog and vertical landing-page arrays. This is not a real query-level cannibalisation test.
- Search Console opportunities for 10 September to 7 October: the query `gtm` had 331 impressions and zero clicks. The query `b2b lead generation companies in pune` had 60 impressions, one click and average position 13.33. Review query-to-page intent before changing content, because these are not guaranteed click gains.
- Still open then: full URL-level indexing review, query and page cannibalisation, broken-link sweep, Core Web Vitals, content backlog reconciliation, and off-page and citation work. Recurring publishing and outreach remain ongoing.

**Checkpoint 2026-10-14** (shipped on the branch `seo-aeo-geo-upgrade`)

What shipped:

- **Reliability.**
  - Inter, Caveat and Fredoka are self-hosted (`app/fonts`), so `next build` no longer fetches Google Fonts.
  - Sitemap `lastmod` comes from git (80 of 168 hand-typed dates had been stale).
  - `npm run audit:links` crawls the built site: 207 pages, 13,252 internal links, 0 broken, 0 redirect problems. Retired cold-email routes are absent from the sitemap, links, redirects, `llms` files and audit data.
  - The Supabase client now loads on demand. That cut first-load JavaScript by about 50 kB (roughly 25%) on all nine tool pages.
- **Service pages.** A direct-answer block under every service hero. Service, FAQPage, HowTo and BreadcrumbList JSON-LD restored on the cold email page, and HowTo added to the LinkedIn page. Cold email FAQ answers expanded. Each service page and real case study now carries a deliberate path to the next step (`lib/internal-paths.ts`).
- **Decision-stage content.** Three comparison posts: LinkedIn agency vs manual, AI vs traditional lead gen, and personal branding agency vs freelancer.
- **Trust and GEO.** `/editorial-policy`. A visible "By Myntmore, Updated <date>" line on 34 posts and guides. A data-use notice on every tool sign-up. A rewritten `llms.txt` and a generated `llms-full.txt`. A monthly AI-visibility tracker.

What was still open, and why:

- **Founder claims in the 58-meetings guide.** Its author bio adds "$80M+ revenue" and "100,000 students", which appear nowhere else. Someone who knows the business must confirm them. The client count itself is settled: every page says 130+. The one remaining "300 clients" that `npm run audit:entity` reports is the guide quoting a weak line to avoid, not a claim.
- **Privacy policy.** It does not mention Google's Gemini API or the Supabase database the tools use. The tool notice describes them. The policy should too.
- **Third-party scripts.** GA4, the Meta Pixel and Ahrefs Analytics all load `afterInteractive`. Moving the Pixel and Ahrefs to `lazyOnload` would cost some page views from very short visits. That is a marketing decision and has not been applied.
- **Real benchmark and external work.** New benchmark data needs real campaign data. Citations, PR, directories and interviews happen off-site.
- **Case studies.** They still lack a "what we would do differently" section. That needs the real story from each engagement.
- **FAQ lengths.** 108 FAQ answers sat under 40 words (mostly landing and city pages). `npm run audit:answers --all` lists them.
- **Core Web Vitals field data.** It still needs PageSpeed Insights or CrUX on the deployed site. The build measures payload, not LCP, CLS or INP.

---

### B.12 Who does what, and notes for AI assistants

**Split of work**

| Who | Does |
| --- | --- |
| An assistant (Claude or similar) | Anything that can be run from the repo or a terminal: W1, W2, W12, W13 (curl part), B2, B3, M1, M7, M8, M18, M19, Q1, Q3, Q11, Q16, the triggered checklist, and drafting content from briefs. It can also analyse results a person pastes back |
| The owner or a signed-in person | Anything that needs an account login: all Search Console tasks, the ChatGPT citation check, backlink and rank tools, the newsletter send, LinkedIn and Instagram posting, and the proof bank (which needs client permission) |

**Automation that already exists**

| Automation | What it does |
| --- | --- |
| Prebuild generators | Every build rewrites generated pages, the sitemap blocks, the site-audit data and `public/llms-full.txt` |
| `npm run sitemap:dates` and `sitemap:check` | Derive sitemap dates from git, and fail when they are stale |
| `npm run audit:links` | Crawls the built site for broken links, redirect chains, sitemap, canonical and `llms` problems |
| `npm run audit:entity`, `audit:answers`, `audit:jobs` | Check proof-point numbers, FAQ answer length, and job posting dates and apply addresses |
| `python3 scripts/seo-crawl.py` | Crawls the live sitemap and prints Site Health and Schema coverage |
| IndexNow GitHub workflow | After each production deploy, pings Bing for pages whose sitemap date changed |

**Shared instruction for every task handed to an AI assistant**

> You are working in the Myntmore website repository. First inspect the relevant files and the available integrations. Follow the task's existing steps and pass criteria. Never invent Search Console, CRM, Ahrefs, analytics, client proof or AI citation results. Ask for exports if access is missing. Prefer read-only analysis and reviewable changes; do not deploy, publish, submit forms, change production settings or delete content without explicit approval. Return evidence, pass or fail, proposed changes, and the estimated audit time versus fix time.

**Task prompts for the weekly checks** (each is used together with the shared instruction above)

| Task | Prompt |
| --- | --- |
| W1 | Run the site crawl script, capture failures and the health and schema percentages, find the root causes in code and propose minimal fixes. Do not deploy. Output a pass or fail table and patches |
| W2 | Compare the live sitemap and robots files with the code that builds them. Check HTTP statuses, counts and the sitemap line, and propose exact corrections |
| W3 | Prepare a manual-actions and security-issues checklist. Ask for exported Search Console evidence; do not claim to have Search Console access without a connector. Triage any warnings supplied |
| W4 | Using supplied URL Inspection exports for the homepage, services and recent pages, compare declared and Google-selected canonicals. Inspect the canonical setup and propose fixes. Treat any foreign-domain selection as urgent |
| W5 | Analyse the supplied indexing exports against last week. Group newly failing URLs by reason and trace robots, redirects, status codes and canonicals in the code |
| W6 | Analyse the supplied mobile Core Web Vitals export. Group poor URLs by template, find likely code-level causes and produce prioritised tickets. Do not invent field metrics |
| W7 | Compare two seven-day Search Console exports. Calculate changes in clicks, impressions, CTR and position, and flag pages with 20 or more prior clicks that fell by more than 50% |
| W8 | Fill the 11 scorecard fields from supplied Search Console, Zoho, Vercel and crawl data using the fixed definitions. Mark missing data clearly, calculate the change on last week and do not make up values |
| W9 | Check the supplied newsletter report: issue sent, a UTM-tagged myntmore.com link, sends and open rate. Report pass or fail and suggest a correction if something is missing |
| W10 | Find the pages shipped in the last seven days from the git history, match them against the supplied LinkedIn post log and draft natural, non-salesy post copy with correctly tagged links for any missing page. Do not publish |
| W11 | Review the content gap list, the keyword map and the supplied Search Console queries. Produce at least four ready briefs with intent, a non-colliding primary keyword, three internal links and cited evidence sources |
| W12 | Inspect the events page code and the live event dates. Find expired "upcoming" events and invalid event schema, then propose minimal code changes |
| W13 | Compare `/careers` and the job schema with a supplied approved list of open roles. Check each `validThrough` date and that closed roles redirect, and propose changes without assuming any role is open |
| W14 | Review the analytics and Zoho exports or APIs, join them on permitted lead IDs and timestamps, and report organic sessions to forms to qualified leads to meetings to deals, with any missing mappings and suspected duplicates. Do not change the CRM |
| W15 | Inspect the lead-form code, analytics events and Zoho mapping. Run non-destructive tests in staging or an approved test mode, report exact failures and suggested fixes. Do not submit production leads without permission |

**Automation potential and human effort (weekly checks W1 to W13)**

Planning assumptions: the times are minutes per occurrence and use each task's standard time estimate. The "after setup" figures assume an experienced operator, working integrations or clean exports, reusable scripts and AI drafts that a person reviews. They exclude major fixes, approvals, new integrations, publishing delays and unpredictable troubleshooting. They are planning estimates, not measured savings.

Categories: **Fully automatable** means the routine check or report can run unattended after setup, with a person reviewing exceptions. **AI-assisted** means an assistant does the research, drafting or analysis and a person checks or acts. **Manual** means the core evidence or decision needs a person.

| Task | Class | Minutes now | Human minutes after setup | Minutes saved |
| --- | --- | --- | --- | --- |
| W1 | Fully automatable | 10 | 2 | 8 |
| W2 | Fully automatable | 5 | 1 | 4 |
| W3 | AI-assisted | 5 | 3 | 2 |
| W4 | AI-assisted | 15 | 8 | 7 |
| W5 | AI-assisted | 10 | 5 | 5 |
| W6 | AI-assisted | 5 | 3 | 2 |
| W7 | Fully automatable | 10 | 2 | 8 |
| W8 | AI-assisted | 20 | 8 | 12 |
| W9 | AI-assisted | 10 | 4 | 6 |
| W10 | AI-assisted | 20 | 10 | 10 |
| W11 | AI-assisted | 15 | 9 | 6 |
| W12 | Fully automatable | 5 | 1 | 4 |
| W13 | AI-assisted | 10 | 5 | 5 |

Per-cycle total for W1 to W13: 2.3 hours now, about 1 hour of human time after setup, about 1.3 hours potentially saved. Four tasks are fully automatable and nine are AI-assisted.

**Important:** a fully automatable check does not mean its fix can be automated safely. Keep production deploys, Search Console changes, public claims, CRM changes and publishing approval-gated. Some estimates in the checklist understate the real effort.

**Split of work**

| Who | Does |
| --- | --- |
| An assistant (Claude or similar) | Anything that can be run from the repo or a terminal: W1, W2, W12, W13 (the redirect check), the generators, audits and code fixes, and drafting |
| The owner or a signed-in person | Anything that needs an account login: all Search Console tasks, the ChatGPT citation check, backlink and rank tools, the newsletter send, LinkedIn and Instagram posting, and any approval |

**Automation that already exists**

| Automation | What it does |
| --- | --- |
| Prebuild generators | Every build rewrites generated pages, the sitemap blocks, the site-audit data and `public/llms-full.txt` |
| `npm run sitemap:dates` and `sitemap:check` | Derive sitemap dates from git, and fail when they are stale |
| `npm run audit:links` | Crawls the built site for broken links, redirect chains, sitemap, canonical and `llms` problems |
| `npm run audit:entity`, `audit:answers`, `audit:jobs` | Check proof-point numbers, FAQ answer length, and job posting dates and apply addresses |
| `python3 scripts/seo-crawl.py` | Crawls the live sitemap and prints Site Health and Schema coverage |
| IndexNow GitHub workflow | After each production deploy, pings Bing for pages whose sitemap date changed |

**Working rules that apply to every task**

- Every task must end with a clear pass or fail from a number or a yes/no check.
- Use only real numbers. If there is no real number, say "new offering, no track record yet". Never invent a stat, quote, client name or testimonial.
- Keep every KPI definition fixed. If one must change, restate the earlier weeks under the new rule.
- Change generated data at its source (`lib/service-answers.json`, `lib/entity-facts.json`, `lib/case-study-library.json`, the page metadata), never the generated file.
- Only change a page's date modified after a real edit.
- Search Console, the ChatGPT check and the backlink tools need a person. Do not guess their results. Ask for them to be pasted in.
- Use test records only when checking forms and bookings, and remove them afterwards.

---

### B.13 Open items from the routine itself

| Item | Status |
| --- | --- |
| Wrong canonical on Google for some pages | Needs Test Live URL then Request Indexing by a signed-in person, about 10 URLs a day |
| Core Web Vitals field data | Needs PageSpeed Insights or CrUX on the live site |
| Privacy policy wording, founder bio claims | Need someone who knows the business to confirm |
| Real benchmark data and off-site PR | Needs real campaign data and outreach |
| Case studies "what we would do differently" | Needs the real story from each engagement |
| 108 FAQ answers under 40 words | Listed by `npm run audit:answers --all` |
| JobPosting warnings (missing `streetAddress`, `postalCode`) | Known and tracked under M5 |


---

## Appendix C: Keywords, content plan and AI visibility

**What this appendix holds:** every keyword decision, the research behind them, the list of content we still need to write, the rules for getting quoted in Google answer boxes, and the method for checking whether ChatGPT, Claude, Gemini and Perplexity name Myntmore. Numbers were checked against the code and the data files on 11 Nov 2026. Where a number comes from an older audit and was not re-checked, it says so.

**Contents of this appendix**

| Section | What it covers |
| --- | --- |
| C.1 | The keyword map: rules, the zero-collision check, and the primary keyword of all 205 pages |
| C.2 | The November 2026 keyword research: city, industry (ICP) and ICP-by-city lists |
| C.3 | The content gap list and what is still open |
| C.4 | The five content briefs and the claims on live pages that need sourcing |
| C.5 | Featured-snippet rules and the audit findings |
| C.6 | AI visibility: how to check, the 10 scorecard prompts, the full 163-prompt library, the tracker |
| C.7 | The October 2026 Search Console opportunity map |
| C.8 | LinkedIn distribution drafts |

---

### C.1 The keyword map

#### What a "primary keyword" is

- Every public page has a list called `keywords` in its metadata. The **first entry is the primary keyword**: the one search phrase that page is meant to win.
- The other entries are secondary keywords: related phrases the same page can also rank for.
- Where the list lives depends on the page type:

| Page type | Where the keywords live |
| --- | --- |
| Most hand-built pages (services wrapper, tools, guides, case studies, careers, main pages) | `metadata.keywords` in the page's `page.tsx` |
| Blog posts | `keywords:` list at the top of `content/posts/<slug>.mdoc` (editable in the CMS) |
| Glossary, city pages, landing pages, service pages | `keywords` field in the matching JSON file under `content/` (editable in the CMS) |

#### The zero-collision rule

**No two pages may share the same primary keyword.** If two pages chase the same phrase, they compete with each other and Google may rank neither.

- Status on 11 Nov 2026, checked against the code: **205 pages carry a keywords list, and 0 share a primary keyword.** (167 pages from `page.tsx` files plus 38 blog posts. The glossary, city, landing and service pages are counted once, even though their keywords sit in JSON files.)
- The 205 splits as: 23 main pages and hubs, 8 services, 10 industry landing pages, 8 city pages, 11 tools, 33 case studies, 38 blog posts (37 live, 1 draft), 14 guides, 51 glossary terms, 9 careers pages.
- The 33 case studies are those that carry their own keywords list in code. The other case-study pages are built from CMS data without a separate list.
- A new page must pass the check before it is published. Check its primary keyword against the table below and against the lists in the code.

#### How the collision check is done

It is mechanical, so re-run it after every new page or keyword change instead of trusting memory:

1. Read the `keywords` list of every page (from `page.tsx`, from the blog `.mdoc` files and from the content JSON files).
2. Take the first entry of each list. Count how many pages share each one. Any count above 1 is a collision.
3. For a deeper check, compare every keyword in every list against every other page. Exact matches between two pages are flagged. Shared secondary keywords between two closely related blog posts are acceptable (normal topic overlap). A shared primary is not.
4. Then read the primaries by eye. A machine cannot catch near-duplicates such as "linkedin profile optimization" against "linkedin profile optimizer". One such pair was found this way and fixed.
5. When a collision turns up, keep the keyword on the page whose search intent matches. On the other page, promote one of its own existing secondary keywords to primary. Do not invent new keywords.

The check was originally a short Python script. Its core logic: pull the `keywords: [...]` array out of each file with a regular expression, build a list of first entries, flag any entry that appears more than once, then compare full sets pairwise.

#### Search intent by page type

| Page type | Intent | Why |
| --- | --- | --- |
| `/services/*` | Commercial | The buyer is weighing a paid service. Keywords centre on "agency" and "services" |
| `/tools/*` | Transactional | The visitor wants to use a free tool now. Keywords are the tool's own name or action |
| Blog posts | Informational | The visitor wants to learn. Keywords are "how to" or concept-explainer phrases |

The same logic is used for the other page types, though it was not written down as a rule: case studies and industry landing pages are commercial, city pages are commercial and local, guides and glossary terms are informational (glossary terms are definitions), careers pages target job seekers.

**Conventions that came out of past fixes (keep following them):**

- A tool's own branded phrase (for example "dm angle generator") stays only on the tool page. Blog posts that link to the tool must not list it.
- When a service page and a blog post both want an informational "how to" phrase, the phrase stays on the blog post and comes off the service page.
- Case studies keep their primary on their own specific angle, not on a generic phrase like "b2b lead generation case study".
- Keep each page to roughly 20 keywords. More is keyword stuffing, which Bing treats as spam.
- Industry landing pages (`/lp/*`) and service pages (`/services/*`) were compared keyword by keyword (every keyword, not only primaries) when there were 9 landing pages and 7 services: zero overlaps. Landing pages target an industry ("b2b lead generation for nbfcs", "lead generation for exporters india"). Services target a channel or method ("cold email agency", "icp mapping services"). `/lp/fundraising` is the deliberate exception: it targets founders raising money ("investor outreach for startups"), and no service page uses investor or VC phrases. This was not re-run after the landing-page count reached 10 and services reached 8.
- Brand and navigational phrases ("myntmore", "myntmore company") spread over many URLs in Search Console. That is expected and is not a reason to hide supporting pages.

#### Blog addresses

Blog posts now live at `/resources/blogs/<slug>`. Old `/blog/<slug>` addresses redirect there permanently (set in `next.config.js`; moved 28 Oct 2026).

#### History of fixes (so the same mistakes are not repeated)

| Date | What was found | Fix |
| --- | --- | --- |
| 19 Aug 2026 | New benchmark report added | Primary checked, no collision |
| 21 Aug 2026 | Compliance guide and cold-email-vs-LinkedIn post added | Primaries checked, no collision |
| 25 Aug 2026 | `/services/gtm-strategy` added; `/lp/fundraising` added | No overlap. Found that the battle-card tool and the competitor-positioning blog post both used "competitor battle card generator" |
| 31 Aug 2026 | Four posts added; two posts carried a tool's own phrase ("founder presence analyzer", "cold email roi calculator") | Phrases removed from the posts |
| 3 Sep 2026 | Case studies brought into the map. Two pairs collided ("b2b lead generation case study"; "linkedin personal branding case study") | Each page promoted its own more specific secondary to primary. Also the battle-card collision settled: the tool keeps the phrase, the post promoted "how to articulate customer pain" |
| 4 Sep 2026 | Three posts added, one deliberately close to "3-second rule" post | Distinct primaries picked ("stop selling features cold outreach" against "why cold emails get ignored") |
| 7 Oct 2026 | Three posts added | No collision |
| 30 Oct 2026 | Blog "case study procrastination" collided with the case-study tool; roi-calculator and hook-grader had overlapping keywords | Blog primary became "how to write a b2b case study"; overlap pruned from the two tools. 201 pages checked, zero duplicates |
| 2 Nov 2026 | `/lp/accounting-cfo-firms` added; new secondaries added to 8 city pages and 6 landing pages | "b2b lead generation agency mumbai" moved from the homepage to the Mumbai page so they stop competing. No primary changed |

Older audit also fixed these leftovers: `/blog/3-second-rule-cold-outreach` lost "dm angle generator"; the TAM-trap post lost "icp builder tool" and "value proposition generator"; the lead-magnet post lost "lead magnet idea generator"; `/services/cold-email` lost "how to improve cold email deliverability" (kept on the deliverability guide); the profile-inbound post's primary changed from "linkedin profile optimization" to "why your linkedin profile matters more than posts".

**Watch items:** `/resources/tools` has the primary "free linkedin profile optimizer" while `/tools/linkedin-optimizer` has "linkedin profile optimizer". They are not identical strings, so the check passes, but they are near neighbours. `/lp/agencies-it` serves two audiences (agencies and IT services firms) with about 30 mapped keywords, more than one page ranks for well (see C.2 step 3).

#### The full keyword map (205 pages, primary keyword of each)

#### Main pages and hubs (23 pages, navigational and brand)

| Page | Primary keyword |
|---|---|
| `/` | b2b lead generation |
| `/1-on-1-consultation` | b2b growth consultation |
| `/about-us` | tejas jhaveri |
| `/book-a-call` | book a call with myntmore founder |
| `/contact-us` | contact myntmore |
| `/editorial-policy` | myntmore editorial policy |
| `/events` | b2b webinars |
| `/marketing-automation` | b2b marketing automation |
| `/myntmore-framework` | linkedin outreach automation framework |
| `/newsletter-subscribe` | b2b outbound newsletter |
| `/privacy-policy` | myntmore privacy policy |
| `/resources` | b2b lead generation resources |
| `/resources/blogs` | b2b lead generation blog |
| `/resources/feed` | b2b instagram reels |
| `/resources/glossary` | b2b outbound glossary |
| `/resources/guides` | b2b growth guides |
| `/resources/tools` | free linkedin profile optimizer |
| `/seo` | seo services mumbai |
| `/services` | b2b lead generation agency |
| `/sitemap` | myntmore sitemap |
| `/thank-you` | myntmore thank you |
| `/thankyou` | myntmore booking confirmed |
| `/who-this-is-for` | who is myntmore for |

#### Services (8 pages, commercial)

| Page | Primary keyword |
|---|---|
| `/services/account-based-marketing` | account-based marketing agency |
| `/services/ai-lead-generation` | ai lead generation agency |
| `/services/cold-email` | cold email agency |
| `/services/do-it-yourself` | self serve linkedin outreach tool |
| `/services/gtm-strategy` | gtm strategy agency |
| `/services/linkedin-outreach` | linkedin outreach agency |
| `/services/personal-branding` | linkedin ghostwriting services |
| `/services/sales-intelligence` | icp mapping services |

#### Industry landing pages (10 pages, commercial)

| Page | Primary keyword |
|---|---|
| `/lp/accounting-cfo-firms` | lead generation for accounting firms |
| `/lp/agencies-it` | b2b lead generation for agencies |
| `/lp/agency-partners` | white label lead generation agency |
| `/lp/financial-services` | b2b lead generation for nbfcs |
| `/lp/fundraising` | investor outreach for startups |
| `/lp/insurance` | lead generation agency for insurance brokers |
| `/lp/manufacturers-exporters` | lead generation for exporters india |
| `/lp/pharma` | b2b lead generation for pharma companies |
| `/lp/recruitment-firms` | lead generation for staffing agencies |
| `/lp/saas-founders` | b2b lead generation for saas companies |

#### City pages (8 pages, commercial, local)

| Page | Primary keyword |
|---|---|
| `/b2b-lead-generation-ahmedabad` | b2b lead generation ahmedabad |
| `/b2b-lead-generation-bengaluru` | b2b lead generation agency in bangalore |
| `/b2b-lead-generation-chennai` | b2b lead generation chennai |
| `/b2b-lead-generation-delhi` | b2b lead generation delhi |
| `/b2b-lead-generation-hyderabad` | lead generation company in hyderabad |
| `/b2b-lead-generation-kolkata` | b2b lead generation kolkata |
| `/b2b-lead-generation-mumbai` | b2b lead generation companies in mumbai |
| `/b2b-lead-generation-pune` | b2b lead generation company in pune |

#### Free tools (11 pages, transactional)

| Page | Primary keyword |
|---|---|
| `/tools/battle-card-generator` | competitor battle card generator |
| `/tools/case-study-generator` | free case study generator |
| `/tools/cold-email-roi-calculator` | cold email roi calculator |
| `/tools/dm-angle-generator` | dm angle generator |
| `/tools/founder-presence-analyzer` | founder presence analyzer |
| `/tools/icp-builder` | icp builder tool |
| `/tools/lead-magnet-ideas` | lead magnet idea generator |
| `/tools/linkedin-hook-grader` | linkedin hook grader |
| `/tools/linkedin-optimizer` | linkedin profile optimizer |
| `/tools/posting-rhythm-builder` | linkedin posting rhythm builder |
| `/tools/roi-calculator` | roi calculator for cold outreach |

#### Case studies (33 pages, commercial)

| Page | Primary keyword |
|---|---|
| `/case-studies` | b2b lead generation case studies |
| `/case-studies/agencies-it-uae-managed-it` | managed it services lead generation |
| `/case-studies/agencies-it-usa-conversion-optimization` | conversion optimization agency lead generation |
| `/case-studies/agencies-it-usa-software-development` | software development agency lead generation |
| `/case-studies/ecommerce-conversion-playbook` | ecommerce saas lead generation |
| `/case-studies/financial-services-india-payroll` | payroll services lead generation |
| `/case-studies/financial-services-singapore-outsourced-cfo` | outsourced cfo lead generation |
| `/case-studies/financial-services-uk-bookkeeping` | bookkeeping firm lead generation |
| `/case-studies/founder-personal-brand-linkedin` | founder personal brand results |
| `/case-studies/heritage-jewellery-valuation-pipeline` | jewellery b2b lead generation case study |
| `/case-studies/insurance-india-hr-consultants-referral` | employee benefits broker lead generation |
| `/case-studies/insurance-singapore-commercial-coverage` | commercial insurance lead generation |
| `/case-studies/insurance-uae-employee-benefits` | insurance broker lead generation uae |
| `/case-studies/leadership-development-messaging-shift` | leadership development lead generation case study |
| `/case-studies/manufacturers-exporters-france-packaging` | packaging manufacturer lead generation |
| `/case-studies/manufacturers-exporters-germany-industrial-components` | industrial component export lead generation |
| `/case-studies/manufacturers-exporters-uae-kitchen-equipment` | commercial kitchen equipment lead generation |
| `/case-studies/medical-tourism-platform-pipeline` | medical tourism lead generation case study |
| `/case-studies/pharma-france-contract-manufacturing` | pharma contract manufacturing lead generation |
| `/case-studies/pharma-india-dermatologist-outreach` | pharma doctor outreach india |
| `/case-studies/pharma-singapore-product-licensing` | pharma licensing outreach singapore |
| `/case-studies/pharma-uae-distribution-partners` | pharma distributor outreach uae |
| `/case-studies/pharma-usa-api-second-source` | api lead generation usa |
| `/case-studies/predictable-b2b-lead-gen-engine` | predictable pipeline case study |
| `/case-studies/professional-services-linkedin` | professional services inbound leads |
| `/case-studies/recruitment-singapore-contract-staffing` | contract staffing lead generation |
| `/case-studies/recruitment-uk-engineering-staffing` | recruitment agency lead generation |
| `/case-studies/recruitment-usa-tech-recruitment` | tech recruitment lead generation |
| `/case-studies/retail-strategy-design-pipeline` | retail design b2b lead generation case study |
| `/case-studies/saas-series-a` | saas series a lead generation results |
| `/case-studies/specialist-recruitment-linkedin-leads` | recruitment firm lead generation case study |
| `/case-studies/uk-pharma-qualified-meetings` | pharma lead generation case study |
| `/case-studies/wealth-management-pms-pipeline` | wealth management lead generation case study |

#### Blog posts (38 pages, informational)

| Page | Primary keyword |
|---|---|
| `/resources/blogs/3-second-rule-cold-outreach` | why cold emails get ignored |
| `/resources/blogs/5-second-hero-section-test` | b2b homepage hero section test |
| `/resources/blogs/agency-vs-in-house` | agency vs in house sdr |
| `/resources/blogs/ai-personalization-cold-outreach` | ai personalization cold outreach |
| `/resources/blogs/ai-vs-traditional-lead-generation` | ai vs traditional lead generation |
| `/resources/blogs/b2b-lead-gen-metrics` | b2b lead generation metrics |
| `/resources/blogs/b2b-outbound-benchmark-report-2026` | b2b outbound benchmark report |
| `/resources/blogs/case-study-procrastination` | how to write a b2b case study |
| `/resources/blogs/cold-email-compliance-guide` | cold email compliance |
| `/resources/blogs/cold-email-deliverability-guide` | cold email deliverability |
| `/resources/blogs/cold-email-follow-up-sequence` | cold email follow up sequence |
| `/resources/blogs/cold-email-sequence-templates` | cold email sequence templates |
| `/resources/blogs/cold-email-vs-linkedin-outreach` | cold email vs linkedin outreach |
| `/resources/blogs/conversations-not-impressions-outbound` | outbound conversations vs impressions |
| `/resources/blogs/ecommerce-conversion-playbook` | ecommerce conversion rate optimization |
| `/resources/blogs/founder-led-sales-before-scaling` | founder led sales b2b |
| `/resources/blogs/founder-personal-brand-linkedin` | founder personal brand |
| `/resources/blogs/gmail-and-yahoo-sender-requirements` (draft, not published) | gmail and yahoo sender requirements |
| `/resources/blogs/handling-cold-email-replies` | cold reply meaning |
| `/resources/blogs/how-to-write-a-linkedin-hook` | how to write a linkedin hook |
| `/resources/blogs/icp-mapping-b2b` | icp mapping |
| `/resources/blogs/linkedin-outreach-agency-vs-manual-prospecting` | linkedin outreach agency vs manual prospecting |
| `/resources/blogs/linkedin-outreach-sequences` | linkedin outreach sequence |
| `/resources/blogs/linkedin-profile-inbound-lead-machine` | why your linkedin profile matters more than posts |
| `/resources/blogs/multi-threading-b2b-buying-committee` | multi-threading in b2b sales deals |
| `/resources/blogs/outbound-funnel-math-not-guesswork` | b2b outbound funnel math |
| `/resources/blogs/outbound-offer-problem` | b2b outbound offer |
| `/resources/blogs/personal-branding-agency-vs-content-freelancer` | personal branding agency vs content freelancer |
| `/resources/blogs/pitching-trap-competitor-positioning` | how to articulate customer pain |
| `/resources/blogs/positive-reply-to-booked-meeting` | positive reply to booked meeting |
| `/resources/blogs/predictable-b2b-lead-gen-engine` | b2b lead generation engine |
| `/resources/blogs/relevance-beats-reach-b2b-outbound` | relevance vs reach b2b outbound |
| `/resources/blogs/reviving-closed-lost-leads` | how to revive closed-lost leads |
| `/resources/blogs/stop-selling-features-cold-outreach` | stop selling features cold outreach |
| `/resources/blogs/tam-trap-vague-targeting` | total addressable market vs total conversional market |
| `/resources/blogs/value-premium-lead-magnets` | how to create a lead magnet that converts |
| `/resources/blogs/vanity-metrics-personal-brand-pipeline` | linkedin vanity metrics vs revenue |
| `/resources/blogs/what-is-b2b-outbound-sales` | what is b2b outbound sales |

#### Guides (14 pages, informational)

| Page | Primary keyword |
|---|---|
| `/resources/guides/58-meetings-600-linkedin-connections` | how to book meetings on linkedin |
| `/resources/guides/80-us-meetings-ai-agents` | ai agents for lead generation |
| `/resources/guides/claude-sales-call-prompts` | claude prompts for sales calls |
| `/resources/guides/claude-skills-guide` | claude skills for founders |
| `/resources/guides/cold-email-tech-stack` | cold email tech stack |
| `/resources/guides/dos-and-donts-of-outreach` | dos and donts of cold outreach |
| `/resources/guides/golden-icp-framework` | golden icp framework |
| `/resources/guides/how-to-choose-an-outbound-agency` | how to choose a b2b outbound agency |
| `/resources/guides/how-to-choose-b2b-lead-generation-agency-india` | how to choose a b2b lead generation agency in india |
| `/resources/guides/how-to-set-up-vibe-prospecting` | vibe prospecting |
| `/resources/guides/job-applications-sales-funnel` | job search funnel |
| `/resources/guides/leads-on-autopilot-guide` | linkedin lead generation framework |
| `/resources/guides/linkedin-content-to-calls-starter-kit` | linkedin content to calls |
| `/resources/guides/outbound-meme-prompt-kit` | outbound meme prompts |

#### Glossary (51 pages, informational, definitional)

| Page | Primary keyword |
|---|---|
| `/resources/glossary/3-second-rule` | 3-second rule cold outreach |
| `/resources/glossary/abm` | what is abm |
| `/resources/glossary/account-penetration` | what is account penetration |
| `/resources/glossary/aha-moment` | what is an aha moment in sales |
| `/resources/glossary/appointment-setting` | what is appointment setting |
| `/resources/glossary/b2b-lead-generation` | what is b2b lead generation |
| `/resources/glossary/b2b-prospecting` | what is b2b prospecting |
| `/resources/glossary/business-development` | what is business development |
| `/resources/glossary/buyer-engagement` | what is buyer engagement |
| `/resources/glossary/buyer-persona` | what is a buyer persona |
| `/resources/glossary/buying-signal` | what is a buying signal |
| `/resources/glossary/can-spam-act` | what is can-spam act |
| `/resources/glossary/cold-email` | what is cold email |
| `/resources/glossary/cold-lead` | what is a cold lead |
| `/resources/glossary/cold-outreach` | what is cold outreach |
| `/resources/glossary/domain-warmup` | what is domain warm-up |
| `/resources/glossary/existing-connection-nurturing` | existing connection nurturing definition |
| `/resources/glossary/founder-led-sales` | what is founder-led sales |
| `/resources/glossary/gdpr-cold-outreach` | gdpr cold email |
| `/resources/glossary/growth-strategy` | what is growth strategy |
| `/resources/glossary/gtm-execution` | what is gtm execution |
| `/resources/glossary/gtm-strategy` | what is gtm |
| `/resources/glossary/hot-lead` | what is a hot lead |
| `/resources/glossary/icp` | what is icp |
| `/resources/glossary/inbound-vs-outbound` | inbound vs outbound marketing |
| `/resources/glossary/lead-magnet` | what is a lead magnet |
| `/resources/glossary/lead-qualification` | what is lead qualification |
| `/resources/glossary/lead-scoring` | what is lead scoring |
| `/resources/glossary/linkedin-outreach` | what is linkedin outreach |
| `/resources/glossary/meeting-booked-rate` | what is meeting booked rate |
| `/resources/glossary/multi-channel-outreach` | what is multi-channel outreach |
| `/resources/glossary/multi-threading` | what is multi-threading in sales |
| `/resources/glossary/outbound-sales` | what is outbound sales |
| `/resources/glossary/pipeline-acceleration` | what is pipeline acceleration |
| `/resources/glossary/pipeline-generation` | what is pipeline generation |
| `/resources/glossary/re-engagement-campaign` | what is a re-engagement campaign |
| `/resources/glossary/response-rate` | what is response rate cold email |
| `/resources/glossary/revenue-generation` | what is revenue generation |
| `/resources/glossary/sales-outreach` | what is sales outreach |
| `/resources/glossary/sales-pipeline` | what is a sales pipeline |
| `/resources/glossary/sdr` | what is an sdr |
| `/resources/glossary/sender-reputation` | what is sender reputation |
| `/resources/glossary/signal-heavy-structuring` | signal-heavy structuring |
| `/resources/glossary/social-selling` | what is social selling |
| `/resources/glossary/spam-complaint-rate` | spam complaint rate |
| `/resources/glossary/spf-dkim-dmarc` | what is spf dkim dmarc |
| `/resources/glossary/target-account-strategy` | what is target account strategy |
| `/resources/glossary/total-conversional-market` | total conversional market |
| `/resources/glossary/value-proposition` | what is a value proposition |
| `/resources/glossary/vanity-metrics` | what are vanity metrics |
| `/resources/glossary/warm-lead` | what is a warm lead |

#### Careers (9 pages, job seekers)

| Page | Primary keyword |
|---|---|
| `/careers` | myntmore careers |
| `/careers/content-marketing-strategist-intern` | content strategist internship mumbai |
| `/careers/gtm-strategist` | gtm strategist jobs mumbai |
| `/careers/hr-operations-intern` | hr internship mumbai |
| `/careers/lead-gen-intern` | lead generation internship mumbai |
| `/careers/lead-gen-strategist` | lead generation strategist jobs mumbai |
| `/careers/sales-and-growth-intern` | sales and growth internship mumbai |
| `/careers/sales-executive` | sales executive jobs mumbai |
| `/careers/systems-ai-automation-intern` | ai automation internship mumbai |

---

### C.2 The November 2026 keyword research

**What it is:** a list of what Myntmore should rank for in search and be named for in AI answers: every city permutation, every industry (ICP) permutation, ICP-by-city combinations, and a prompt library for the AI check (C.6).

**How it is made (the permutation method):**

- The script `scripts/generate-keyword-research.mjs` builds everything. Run it with `npm run keywords:build`. Edit the lists inside the script, never the CSV files, because the next run overwrites them.
- It reads the **29 ICPs** and their 2026 status (core, retain, test, subsegment, deprioritised) from `lib/value-prop.json`, the data behind the `/value-prop` page.
- It checks every phrase against the keywords the site already targets (1,769 when the research was built, taken from the pages' `keywords` lists).
- **City list:** 24 cities. 8 have a page (Mumbai, Delhi, Bengaluru, Pune, Hyderabad, Chennai, Kolkata, Ahmedabad). 11 more are Indian cities without a page (Gurugram, Noida, Jaipur, Surat, Vadodara, Rajkot, Ludhiana, Coimbatore, Kochi, Indore, Chandigarh). 5 are international (Dubai, Abu Dhabi, Riyadh, Singapore, London). Spelling variants count as the same city: Navi Mumbai, Thane, Delhi NCR, New Delhi, Bangalore, Gurgaon, Baroda, Cochin, Mohali, UAE, Saudi Arabia, UK.
- **Service phrasings:** 15 templates, such as "b2b lead generation company in {city}", "lead generation agency in {city}", "outbound sales agency {city}", "appointment setting services {city}", "cold email agency {city}", "linkedin lead generation agency {city}", "account based marketing agency {city}". Not every template runs for every city: some run for all, some only for cities with a page, some only for Indian or international cities.
- **ICP list:** each of the 29 ICPs gets commercial phrases ("looking for a provider") and "how do I" phrases (informational: a guide or post ranks, and AI engines quote it).
- **ICP by city:** only where that ICP actually clusters in that city (IT in Bengaluru, Pune and Noida; exporters in Rajkot, Ludhiana and Coimbatore; pharma in Hyderabad, Ahmedabad and Vadodara, and so on).
- **Doorway-page rule:** all city-by-service phrases point to that city's one page. Never build a page per phrase. Near-identical pages per keyword are treated by Google as doorway pages.
- **No search volumes.** No keyword tool was connected. Before building any "gap" page, check volume in a keyword tool and look for impressions in Search Console.

**Status of each row:**

| Status | Meaning |
| --- | --- |
| Targeted (T) | A page already lists the phrase |
| Mapped (M) | An existing page is the right one to rank. Add the phrase to its `keywords` and work it into the copy or an FAQ |
| Gap (G) | No page fits. The target column names the page to build (marked NEW) |

**Priority of each row:** P1 = core or retain ICP, or a city that already has a page. P2 = test or subsegment ICP, or a tier-2 Indian city. P3 = deprioritised ICP or international city.

**The three files (counts checked 11 Nov 2026):**

| File | Rows | Targeted | Mapped | Gap | Priority split |
| --- | --- | --- | --- | --- | --- |
| City keyword list | 315 | 49 | 83 | 183 | P1 52, P2 206, P3 57 |
| ICP keyword list | 129 | 48 | 38 | 43 | P1 60, P2 54, P3 15 (87 commercial, 42 informational) |
| ICP by city keyword list | 75 | 8 | 67 | 0 | P1 35, P2 37, P3 3 |
| **Total** | **519** | **105** | **188** | **226** | |

Columns: city file has keyword, city, city_tier (page, india or intl), service, intent, priority, status, target_page, why_this_city. ICP file has keyword, icp, icp_name, icp_status, intent, priority, status, target_page, note. ICP-by-city file has keyword, icp, icp_name, icp_status, city, city_tier, priority, status, target_page, also_mention_on.

The first run found 248 mapped phrases. After the curated additions of 2 Nov 2026 (below), 188 are left to add.

#### City file (315 rows): counts per city and the Priority 1 phrases

The 315 rows are too many to list. Below are the counts per city and the P1 rows (the 8 cities that already have a page). Every other row is a P2 (Indian city without a page) or P3 (international) variant of the same service templates, all pointing at a page that does not exist yet.

| City | Tier | Rows | Targeted | Mapped | Gap |
|---|---|---|---|---|---|
| Mumbai | page | 22 | 9 | 13 | 0 |
| Delhi | page | 22 | 6 | 16 | 0 |
| Bengaluru | page | 18 | 10 | 8 | 0 |
| Pune | page | 14 | 7 | 7 | 0 |
| Hyderabad | page | 14 | 5 | 9 | 0 |
| Chennai | page | 14 | 4 | 10 | 0 |
| Kolkata | page | 14 | 4 | 10 | 0 |
| Ahmedabad | page | 14 | 4 | 10 | 0 |
| Gurugram | india | 14 | 0 | 0 | 14 |
| Noida | india | 10 | 0 | 0 | 10 |
| Jaipur | india | 10 | 0 | 0 | 10 |
| Surat | india | 10 | 0 | 0 | 10 |
| Vadodara | india | 14 | 0 | 0 | 14 |
| Rajkot | india | 10 | 0 | 0 | 10 |
| Ludhiana | india | 10 | 0 | 0 | 10 |
| Coimbatore | india | 10 | 0 | 0 | 10 |
| Kochi | india | 14 | 0 | 0 | 14 |
| Indore | india | 10 | 0 | 0 | 10 |
| Chandigarh | india | 14 | 0 | 0 | 14 |
| Dubai | intl | 13 | 0 | 0 | 13 |
| Abu Dhabi | intl | 9 | 0 | 0 | 9 |
| Riyadh | intl | 13 | 0 | 0 | 13 |
| Singapore | intl | 9 | 0 | 0 | 9 |
| London | intl | 13 | 0 | 0 | 13 |

Priority 1 phrases:

| City | Page | Priority 1 phrases (T = targeted, M = mapped) |
|---|---|---|
| Mumbai | `/b2b-lead-generation-mumbai` | b2b lead generation company in mumbai [T]; b2b lead generation company in navi mumbai [M]; b2b lead generation company in thane [M]; lead generation agency in mumbai [T]; lead generation agency in navi mumbai [M]; lead generation agency in thane [M]; lead generation services in mumbai [T]; lead generation services in navi mumbai [M]; lead generation services in thane [M]; b2b lead generation agency mumbai [T]; b2b lead generation agency navi mumbai [M]; b2b lead generation agency thane [M] |
| Delhi | `/b2b-lead-generation-delhi` | b2b lead generation company in delhi [T]; b2b lead generation company in delhi ncr [M]; b2b lead generation company in new delhi [M]; lead generation agency in delhi [M]; lead generation agency in delhi ncr [T]; lead generation agency in new delhi [M]; lead generation services in delhi [T]; lead generation services in delhi ncr [M]; lead generation services in new delhi [M]; b2b lead generation agency delhi [M]; b2b lead generation agency delhi ncr [M]; b2b lead generation agency new delhi [M] |
| Bengaluru | `/b2b-lead-generation-bengaluru` | b2b lead generation company in bengaluru [T]; b2b lead generation company in bangalore [T]; lead generation agency in bengaluru [T]; lead generation agency in bangalore [T]; lead generation services in bengaluru [T]; lead generation services in bangalore [T]; b2b lead generation agency bengaluru [T]; b2b lead generation agency bangalore [T] |
| Pune | `/b2b-lead-generation-pune` | b2b lead generation company in pune [T]; lead generation agency in pune [T]; lead generation services in pune [T]; b2b lead generation agency pune [T] |
| Hyderabad | `/b2b-lead-generation-hyderabad` | b2b lead generation company in hyderabad [T]; lead generation agency in hyderabad [M]; lead generation services in hyderabad [T]; b2b lead generation agency hyderabad [T] |
| Chennai | `/b2b-lead-generation-chennai` | b2b lead generation company in chennai [T]; lead generation agency in chennai [T]; lead generation services in chennai [M]; b2b lead generation agency chennai [M] |
| Kolkata | `/b2b-lead-generation-kolkata` | b2b lead generation company in kolkata [M]; lead generation agency in kolkata [M]; lead generation services in kolkata [T]; b2b lead generation agency kolkata [T] |
| Ahmedabad | `/b2b-lead-generation-ahmedabad` | b2b lead generation company in ahmedabad [T]; lead generation agency in ahmedabad [T]; lead generation services in ahmedabad [M]; b2b lead generation agency ahmedabad [M] |

The 16 cities without a page (11 Indian, 5 international) hold the 183 gap rows. Their intended pages are `/b2b-lead-generation-<city>` for Gurugram, Noida, Jaipur, Surat, Vadodara, Rajkot, Ludhiana, Coimbatore, Kochi, Indore, Chandigarh, Dubai, Abu Dhabi, Riyadh, Singapore and London. None of these pages exist (checked: there is no Gurugram folder). One Mumbai row is already targeted by `/services/linkedin-outreach` instead of the city page.

#### Industry (ICP) file (129 rows): the full list

T = already targeted, M = mapped, G = gap. A trailing "i" means an informational "how do I" phrase; all other phrases are commercial. Where a target page says NEW, that page does not exist yet.

| ICP | Status and priority | Target page | Phrases |
|---|---|---|---|
| 1. IT Services & Product Engineering | core, P1 | `/lp/agencies-it` | lead generation for it companies [T]; b2b lead generation for it services companies [T]; lead generation for software development companies [T]; lead generation for custom software development firms [M]; appointment setting for it companies [T]; outbound sales for it outsourcing companies [T]; cold email for software development agency [M]; linkedin lead generation for it companies [T]; how to get international clients for it company [Mi]; how to get us clients for software development company [Ti]; how do indian it companies get clients abroad [Ti]; how to reduce dependence on referrals it services [Mi] |
| 2. B2B SaaS & Enterprise Software | retain, P1 | `/lp/saas-founders`, `/services` | b2b saas lead generation agency [T]; outbound sales agency for saas [T]; saas appointment setting [T]; cold email agency for saas [T]; linkedin outreach for saas companies [T]; outsourced sdr for saas [T]; saas lead generation india [T]; should saas startup hire sdr or outsource [Ti]; how to get first enterprise customers for saas [Mi]; how to build outbound for saas after funding [Mi] |
| 3. Executive Search & Recruitment | core, P1 | `/case-studies/recruitment-uk-engineering-staffing`, `/lp/recruitment-firms` | lead generation for recruitment agencies [T]; lead generation for executive search firms [T]; business development for staffing companies [T]; client acquisition for recruitment consultancy [T]; lead generation for staffing agency india [T]; recruitment agency marketing india [M]; how to get clients for recruitment agency [Mi]; how to get mandates for executive search firm [Ti]; how to get clients for recruitment agency in uae [Mi]; linkedin outreach for recruiters to get clients [Ti] |
| 4. Agencies, White Label | retain, P1 | `/lp/agency-partners` | white label lead generation [T]; white label lead generation agency india [T]; white label cold email service [T]; white label linkedin outreach [M]; lead generation reseller program [M]; lead generation for digital marketing agencies [T]; how to get clients for digital marketing agency [Mi]; how can a marketing agency offer lead generation [Ti] |
| 5. VC Funds, Portfolio GTM | test, P2 | NEW: `/lp/vc-portfolio-gtm` | portfolio gtm support for vc funds [G]; outbound lead generation for vc portfolio companies [G]; portfolio company sales support [G]; vc platform team gtm services [G]; how vcs help portfolio companies with sales [Gi]; how to build pipeline for portfolio companies [Gi] |
| 6. Management & Fractional Advisory | subsegment of ICP 24, P2 | NEW: `/lp/consulting-advisory`, `/lp/accounting-cfo-firms` | lead generation for consultants [G]; lead generation for consulting firms [G]; lead generation for fractional cfo [T]; client acquisition for consulting firms india [G]; how to get clients for management consulting firm [Gi]; how to get clients beyond referrals consulting [Gi] |
| 7. FinTech / InsurTech / RegTech | subsegment of ICP 2, P2 | `/lp/financial-services` | fintech lead generation agency [M]; b2b lead generation for fintech companies [M]; insurtech lead generation [M]; regtech sales outreach [M]; how to sell fintech to banks [Mi] |
| 8. Cybersecurity / Cloud / Data | subsegment of ICP 2, P2 | `/lp/saas-founders` | lead generation for cybersecurity companies [M]; mssp lead generation [M]; cloud services lead generation [M]; how to sell cybersecurity services to enterprises [Mi] |
| 9. HR Tech & People Platforms | subsegment of ICP 2, P2 | `/lp/saas-founders` | hr tech lead generation [M]; lead generation for payroll software company [M]; how to sell hrms software to enterprises [Mi] |
| 10. GCC Ecosystem Providers | test, P2 | NEW: `/lp/gcc-providers` | lead generation for gcc setup companies [G]; global capability centre leads india [G]; how to find companies setting up gcc in india [Gi]; how to sell to global capability centres in india [Gi] |
| 11. Manufacturing / Industrial B2B incl. Pharma | core, P1 | `/lp/manufacturers-exporters`, `/lp/pharma` | lead generation for manufacturers [T]; export lead generation india [T]; lead generation for engineering companies [T]; lead generation for machinery manufacturers [T]; industrial b2b lead generation [T]; b2b lead generation for pharma companies [T]; cdmo business development outsourcing [T]; how to find international buyers for manufacturing company [Ti]; how to get export orders from usa [Mi]; how to get export orders from europe [Mi]; how to find pharma distributors abroad [Ti]; how to find buyers between trade shows [Ti] |
| 12. Logistics / Supply Chain Tech | test, P2 | NEW: `/lp/logistics` | logistics lead generation [G]; freight forwarding lead generation [G]; 3pl sales leads [G]; lead generation for logistics software [G]; how to get clients for logistics company [Gi] |
| 13. AI / Automation / DeepTech | subsegment of ICP 2, P2 | `/services`, `/lp/saas-founders` | lead generation for ai companies [T]; ai startup b2b sales outsourcing [M]; how to sell ai solutions to enterprises [Mi] |
| 14. HealthTech / MedTech B2B | deprioritised, P3 | none (deprioritised ICP: track, do not build) | lead generation for healthtech companies [G]; medtech b2b lead generation [G] |
| 15. Leadership / Executive Coaches | test, P2 | NEW: `/lp/executive-coaches` | lead generation for executive coaches [G]; b2b lead generation for coaching business [G]; how to get corporate clients for leadership coaching [Gi]; how to sell coaching to companies [Gi] |
| 16. Corporate Gifting | test, P2 | NEW: `/lp/corporate-gifting` | corporate gifting lead generation [G]; b2b leads for corporate gifting company [G]; how to get corporate gifting clients [Gi]; how to get diwali corporate gifting orders [Gi] |
| 17. Jewellery Manufacturers / Exporters | subsegment of ICP 11, P2 | `/lp/manufacturers-exporters` | jewellery export lead generation [M]; private label jewellery manufacturer leads [M]; how to find international jewellery buyers [Mi]; how to find jewellery buyers in usa [Mi] |
| 18. International Event Management | deprioritised, P3 | none (deprioritised ICP: track, do not build) | lead generation for event management companies [G]; mice lead generation [G] |
| 19. Turnkey Architecture / Design-Build | deprioritised, P3 | none (deprioritised ICP: track, do not build) | lead generation for interior fit out companies [G]; how to get office interior projects [Gi] |
| 20. R&D Offshoring | subsegment of ICP 1, P2 | `/lp/agencies-it` | engineering services outsourcing lead generation [M]; how to get r&d outsourcing clients [Mi] |
| 21. Commercial RE / PropTech | deprioritised, P3 | none (deprioritised ICP: track, do not build) | commercial real estate lead generation india [G] |
| 22. ClimateTech / EnergyTech | deprioritised, P3 | none (deprioritised ICP: track, do not build) | b2b lead generation for solar companies [G]; cleantech b2b sales leads [G] |
| 23. B2B EdTech / Corporate Learning | deprioritised, P3 | none (deprioritised ICP: track, do not build) | corporate training lead generation [G]; how to sell corporate training to companies [Gi] |
| 24. Accounting / CFO / Compliance | core, P1 | `/lp/accounting-cfo-firms` | lead generation for accounting firms [T]; virtual cfo lead generation [T]; lead generation for bookkeeping outsourcing firms [T]; lead generation for tax consultants [T]; client acquisition for compliance firms [T]; how to get clients for virtual cfo services [Ti]; how to get uk clients for accounting outsourcing [Ti]; how to get us cpa firms as clients [Ti] |
| 25. Specialist B2B Professional Services | subsegment of ICP 24, P2 | `/case-studies/professional-services` | lead generation for professional services firms [M]; market research firm lead generation [M]; lead generation for certification bodies [M]; how to get clients for professional services firm [Mi] |
| 26. Influencers / B2B Thought Leaders | deprioritised, P3 | none (deprioritised ICP: track, do not build) | brand sponsorship outreach for creators [G] |
| 27. Podcasters / Business Media | deprioritised, P3 | none (deprioritised ICP: track, do not build) | podcast sponsorship outreach [G] |
| 28. Life Coaches | deprioritised, P3 | none (deprioritised ICP: track, do not build) | lead generation for life coaches [G] |
| 29. UAV / Defence-adjacent Engineering | deprioritised, P3 | none (deprioritised ICP: track, do not build) | drone company b2b lead generation [G] |

#### ICP-by-city file (75 rows): the full list

Each phrase shows its priority and status (for example P1M = priority 1, mapped). Each should also be mentioned on the matching city page, which is where it links.

| Target page | Phrases |
|---|---|
| `/b2b-lead-generation-ahmedabad` | export lead generation ahmedabad [P1T] |
| `/lp/accounting-cfo-firms` | lead generation for accounting firms in mumbai [P1T]; lead generation for accounting firms in delhi [P1M]; lead generation for accounting firms in bangalore [P1T]; lead generation for accounting firms in pune [P1M]; lead generation for accounting firms in ahmedabad [P1M]; virtual cfo lead generation mumbai [P1M]; virtual cfo lead generation bangalore [P1M]; virtual cfo lead generation delhi [P1M]; virtual cfo lead generation pune [P1M]; lead generation for accounting firms in dubai [P2T]; lead generation for accounting firms in london [P2T] |
| `/lp/agencies-it` | lead generation for it companies in bangalore [P1M]; lead generation for it companies in pune [P1M]; lead generation for it companies in hyderabad [P1M]; lead generation for it companies in chennai [P1M]; lead generation for it companies in ahmedabad [P1M]; software development company lead generation bangalore [P1M]; software development company lead generation pune [P1M]; software development company lead generation ahmedabad [P1M]; lead generation for it companies in noida [P2M]; lead generation for it companies in gurugram [P2M]; lead generation for it companies in kochi [P2M]; lead generation for it companies in jaipur [P2M]; lead generation for it companies in indore [P2M]; lead generation for it companies in chandigarh [P2M]; software development company lead generation noida [P2M]; software development company lead generation kochi [P2M]; software development company lead generation indore [P2M] |
| `/lp/agency-partners` | white label lead generation dubai [P2M]; white label lead generation london [P2M] |
| `/lp/manufacturers-exporters` | lead generation for manufacturers in ahmedabad [P1M]; lead generation for manufacturers in pune [P1M]; lead generation for manufacturers in chennai [P1M]; lead generation for manufacturers in mumbai [P1M]; lead generation for manufacturers in delhi [P1M]; lead generation for manufacturers in kolkata [P1M]; export lead generation mumbai [P1M]; export lead generation kolkata [P1M]; lead generation for manufacturers in rajkot [P2M]; lead generation for manufacturers in ludhiana [P2M]; lead generation for manufacturers in coimbatore [P2M]; lead generation for manufacturers in vadodara [P2M]; export lead generation rajkot [P2M]; export lead generation ludhiana [P2M]; export lead generation coimbatore [P2M]; export lead generation surat [P2M]; export lead generation jaipur [P2M]; jewellery export lead generation mumbai [P3M]; jewellery export lead generation jaipur [P3M]; jewellery export lead generation surat [P3M] |
| `/lp/pharma` | pharma lead generation hyderabad [P1T]; pharma lead generation ahmedabad [P1T]; pharma lead generation mumbai [P1M]; pharma lead generation vadodara [P2M]; pharma lead generation chandigarh [P2M] |
| `/lp/recruitment-firms` | lead generation for recruitment agencies in mumbai [P1T]; lead generation for recruitment agencies in delhi [P1M]; lead generation for recruitment agencies in bangalore [P1M]; lead generation for recruitment agencies in pune [P1M]; lead generation for recruitment agencies in hyderabad [P1M]; lead generation for recruitment agencies in chennai [P1M]; lead generation for recruitment agencies in gurugram [P2M]; lead generation for recruitment agencies in dubai [P2M]; lead generation for recruitment agencies in riyadh [P2M]; lead generation for recruitment agencies in london [P2M] |
| `/lp/saas-founders` | saas lead generation agency bangalore [P2M]; saas lead generation agency mumbai [P2M]; saas lead generation agency gurugram [P2M]; saas lead generation agency delhi [P2M]; saas lead generation agency pune [P2M]; saas lead generation agency chennai [P2M]; saas lead generation agency hyderabad [P2M]; saas lead generation agency dubai [P2M]; saas lead generation agency singapore [P2M] |

#### What to do with it, in order

| Step | Action | Status |
| --- | --- | --- |
| 1 | Build `/lp/accounting-cfo-firms` (ICP 24, core). It had 17 P1 keywords and a monthly AI prompt with nowhere to land | **Done 2 Nov 2026.** Built on the three published finance-firm case studies (UK bookkeeping, Singapore outsourced CFO, India payroll), linked from the footer, with a "who this is for" section carrying the ICAI note |
| 2 | Add the "mapped" keywords to existing pages | **Done 2 Nov 2026 as a curated subset, not all 248.** Strongest phrases went into each city and landing page's keywords. The shared services intro now names appointment setting and outbound. Every city page links to the industry pages for the ICPs that cluster there. Delhi and Ahmedabad gained a "who we generate leads for" section. Each of the 6 landing pages got its top phrases and one new FAQ answering its ICP's main "how do I" question, with a published case-study result |
| 3 | Split `/lp/agencies-it` into `/lp/it-services` (ICP 1 and its subsegment ICP 20, R&D offshoring) and agencies | **Open.** About 30 keywords are mapped onto the one page |
| 4 | Remove "b2b lead generation agency mumbai" from the homepage | **Done 2 Nov 2026** (moved to the Mumbai page) |
| 5 | New city pages, only where there is something local to say | **Open.** See below |
| 6 | Test ICPs: write one guide first, then the page | **Open.** See below |
| 7 | Deprioritised ICPs: track, do not build | Standing rule |

Step 2 stays the cheapest win. The biggest piles of mapped keywords are on `/lp/manufacturers-exporters` (33), `/lp/agencies-it` (30), `/lp/saas-founders` (26), `/lp/recruitment-firms` (18) and the 8 city pages (10 to 21 each). Add the strongest phrases to the page's `keywords`, and turn the "how do I" ones into FAQ answers, because AI engines quote those.

**Compliance rule for the accounting page:** the Institute of Chartered Accountants of India (ICAI) Code of Ethics bars chartered accountants in practice from soliciting clients. Do not pitch outreach to Indian CA firms. Position for virtual CFO, finance-operations and bookkeeping or accounting outsourcing firms, especially those selling to UK and US clients. ICP 25 (law firms) has the same problem: Bar Council of India rules bar advocates from soliciting work.

**New city pages (step 5).** Each needs real local content: the industries there, a relevant case study, local FAQs, like the existing 8. Without that, it is a near-duplicate and Google treats it as a doorway page. Order:

1. Gurugram and Noida (IT services, SaaS and GCC offices; searched separately from Delhi). The Delhi page must link to both.
2. The manufacturing and export belt (Rajkot, Ludhiana, Coimbatore, Surat, Vadodara), only alongside ICP 11 content such as exporter case studies and trade-show timing.
3. International: one UAE page first (Dubai plus Abu Dhabi), built on the UAE case studies at `/case-studies/markets/uae`. Add London and Singapore once there is more case-study proof.
4. Jaipur, Kochi, Indore, Chandigarh: later, and only if Search Console shows impressions.

**Test ICPs (step 6):** VC portfolio GTM (5), GCC providers (10), logistics (12), executive coaches (15) and corporate gifting (16) are under test. For each, publish one guide answering its "how do I" question first, for example "How do corporate gifting companies get B2B orders?". That ranks, gets cited by AI engines and tests demand. Build the landing page only after the test is confirmed.

**Deprioritised ICPs:** the 15 P3 rows for ICPs 14, 18, 19, 21, 22, 23 and 26 to 29 stay in the file so they can be reopened. They have no target page on purpose.

---

### C.3 Content gaps and priorities

**How the gaps were found:** existing content answers "how do I do X" (sequences, deliverability, ICP mapping, lead magnets) and "why pick an agency". It did not answer the questions a buyer asks right before converting or right after comparing options (pricing, legal risk, channel choice), and it did not own the top-of-funnel "what is X" searches. Each suggested page was checked for keyword collisions first. The first analysis was run on 21 Aug 2026 against the pages that existed then (6 services, 9 tools, 13 blog posts, 8 landing pages, 8 city pages).

#### The original gap list and what happened to each item

| Funnel stage | Gap | Page | Primary keyword | Status on 11 Nov 2026 |
| --- | --- | --- | --- | --- |
| Bottom | Pricing content | `cold-email-agency-pricing-guide` | cold email agency pricing | **Deliberately not built.** Pricing is private and the public pricing pages were removed on purpose. A page quoting market ranges would also be an unsourced number. Revisit only if pricing becomes public |
| Bottom | Compliance and legal | `cold-email-compliance-guide` (CAN-SPAM, GDPR, India's DPDP Act, CASL) | cold email compliance | Built, live at `/resources/blogs/cold-email-compliance-guide` |
| Bottom | Channel comparison | `cold-email-vs-linkedin-outreach` | cold email vs linkedin outreach | Built, live |
| Mid | "What is outbound" pillar | `what-is-b2b-outbound-sales` | what is b2b outbound sales | Built, live |
| Mid | Cold email infrastructure explained (SPF, DKIM, DMARC, warm-up) | `cold-email-infrastructure-explained` | what is dmarc for cold email | **Not built, and now should not be.** Covered by the glossary pages spf-dkim-dmarc, domain-warmup and sender-reputation, plus the deliverability guide; a new page would collide. The uncovered part of the topic is brief 4 in C.4 |
| Mid | Cold email sequence templates | `cold-email-sequence-templates` | cold email sequence templates | Built, live |
| Structure | Glossary pillar page | `/resources/glossary` | b2b outbound glossary | Built. 51 term pages in code today (the gap analysis said 50) |
| Structure | Supporting blog content for the `/lp/*` pages | none | none | **Not built.** Landing-page keyword lists already hold the informational variants, so a post would collide. Revisit only with a new angle |
| Added later | Three decision-stage comparisons | `linkedin-outreach-agency-vs-manual-prospecting`, `ai-vs-traditional-lead-generation`, `personal-branding-agency-vs-content-freelancer` | the same as each slug | Built, live (14 Oct 2026) |

#### Deliberately not building (standing decisions)

- **Pricing pages**, for the reasons above.
- **Tool-versus-tool pages** (for example Instantly vs Smartlead) and "best cold email tools 2026" roundups. They rely on third-party claims, carry naming and legal risk, and do not suit a services agency.
- **Benchmark-style answer pages** ("what is a good reply rate", "safe sending volume"). The benchmark report and deliverability guide already answer these with Myntmore's own data. Add a new one only with new, real data.
- **New city pages without a real client footprint.** (This 21 Aug rule was later refined: new city pages are allowed only with real local content, see C.2 step 5.)

#### Still open on the gap list

- Brief 3: a new section on the outbound guide (C.4).
- Brief 4: the Gmail and Yahoo post is drafted but unpublished (`content/posts/gmail-and-yahoo-sender-requirements.mdoc`, `published: false`, last edited 30 Oct 2026).
- Brief 5: LinkedIn connection request limits (blocked on an owner decision, see C.4).
- Honest comparison page(s) for "alternatives to Belkins" and "Indian vs US outbound agency". The AI prompt library marks both as "NEW: comparison page". No such page exists. It is the format AI engines cite for those questions.
- Guides for the test ICPs (C.2 step 6).
- `/lp/it-services` split (C.2 step 3).

---

### C.4 The five content briefs

These came from a Search Console "almost ranking" pull and the gap list, written 16 Oct 2026 (checklist item W11: always keep at least 4 ready briefs).

**What "ready" means.** A brief is ready only if it has a working title, a primary keyword that passes the collision check, the search intent, exactly 3 internal link targets that exist, and a source for every statistic. A statistic is allowed only if its source was opened on 16 Oct 2026 and the URL is in the brief. Otherwise the article uses no external statistics, only Myntmore's proof points: 12K+ meetings booked, $120M+ pipeline generated, 300+ B2B companies served.

**The data and its limits.** Search Console property `sc-domain:myntmore.com`, 17 Sep to 14 Oct 2026, web search, brand queries excluded (myntmore, mintmore, "mint more", "mint and more", "tejas jhaveri"). The query pull returned 496 rows and the query-and-page pull 571 rows. 167 of the 496 query rows sit at average position 8 to 30; 95 of those have only 1 or 2 impressions and only 25 have 10 or more. Of those 25, most are city or agency queries for pages that already exist. The only informational queries with 10+ impressions were "cold reply meaning" (188), "inbound vs outbound" (25), "inbound outbound" (15) and "b2b outbound" (14). So the pool is thin, and briefs 4 and 5 have little or no search support. Search Console samples and anonymises queries (about 40% of impressions were missing in an earlier window), so treat the numbers as directional.

**Collision check for briefs.** Search `app`, `lib` and `components` for the primary keyword and close variants, and the blog and glossary content. The live source is the authority. (The written keyword list had been stale: it lacked the outbound guide, the sequence-templates post and all glossary pages.)

#### Brief 1: What is a cold reply? Meaning, types and how to respond

| Field | Detail |
| --- | --- |
| Type | REFRESH of `/resources/blogs/handling-cold-email-replies`. Not a new page |
| Working title | "Cold Reply Meaning: What It Is and How to Respond Fast" |
| Primary keyword | `cold reply meaning` |
| Secondary keywords | what is a cold reply; cold reply; cold replies; cold reply examples; cold response meaning |
| Search signal | "cold reply meaning" 188 impressions, 0 clicks, position 8.8. "cold reply" 30 / 0 / 5.8. "cold replies" 14 / 0 / 5.9. The page overall: 250 impressions, 0 clicks, weighted position 8.2 across 12 queries |
| Intent | Informational, definitional, with a how-to follow-on. A cold reply means a reply to a cold email, and in everyday English a curt answer |
| First 60 words must state | A cold reply is a response to a cold email (the unsolicited first message); it can be interested, a brush-off or a question; one clause that "cold reply" also means a curt answer in everyday English; a link to how to answer it |
| Outline | What is a cold reply?; cold vs warm reply; the four replies and how to answer each; speed is the first signal of relevance; kill the naked calendar link; reply handling is a system; FAQ with "What does cold reply mean?" and "Is a cold reply the same as a warm reply?" |
| Internal links to add | `/resources/glossary/cold-email`, `/resources/glossary/response-rate`, `/resources/blogs/b2b-outbound-benchmark-report-2026` |
| Should link back | The cold-email and response-rate glossary pages (their "further" slot is free) |
| Sources | No external statistics |
| Length | Add 150 to 250 words to a page of about 700 |
| **Status 11 Nov 2026** | **Done.** The page is live with "cold reply meaning" as its first keyword, a definition summary that includes the everyday meaning, and the unsourced "nearly 7x" claim removed. Shipped in commit `bd5e242`. Not re-checked: whether the new glossary links and FAQ items were all added |

#### Brief 2: Inbound vs outbound: how B2B teams should choose

| Field | Detail |
| --- | --- |
| Type | REFRESH of `/resources/glossary/inbound-vs-outbound`, turned into a long-form glossary page (precedent: `total-conversional-market` and `3-second-rule`). Fallback only if the owner wants it in the blog index: a new `/blog/inbound-vs-outbound-lead-generation`. Not recommended |
| Working title | "Inbound vs. Outbound: What's the Difference and Which Should You Start With?" |
| Primary keyword | `inbound vs outbound` |
| Secondary keywords | inbound outbound meaning; inbound and outbound; outbound vs inbound; inbound vs outbound lead generation |
| Search signal | "inbound vs outbound" 25 impressions, 0 clicks, position 11.0. "inbound outbound" 15 / 0 / 26.4. The page overall: 105 impressions across 22 queries |
| Intent | Informational and a comparison with a decision: the difference, then which to start with |
| First 60 words must state | Inbound attracts prospects who come to you, outbound reaches those who have not found you; the rule (start with outbound when you can name your buyers and need pipeline on a schedule, start with inbound when the market is broad and you can wait); most teams end up running both |
| Outline | One line each; side-by-side qualitative table; when outbound first; when inbound first; why most run both; how to sequence them; FAQ ("Is outbound or inbound better for B2B?", "Can a startup rely on inbound alone?") |
| Internal links | `/resources/blogs/what-is-b2b-outbound-sales`, `/resources/blogs/cold-email-vs-linkedin-outreach`, `/resources/blogs/agency-vs-in-house` |
| Should link back | `/resources/glossary/b2b-lead-generation`, the cold-email-vs-linkedin post, the agency-vs-in-house post |
| Sources | No external statistics |
| Length and schema | 900 to 1,200 words. Keep DefinedTerm and BreadcrumbList, add FAQPage |
| **Status 11 Nov 2026** | **Partly done.** The page now has a side-by-side table (who starts, time to results, targeting, intent, cost, works best when) and a "Which should you use?" section. Not confirmed: the separate "when outbound first / when inbound first" sections, the added FAQ items, and the length target. The page's first keyword is still "inbound vs outbound marketing", not "inbound vs outbound" |

#### Brief 3: B2B outbound sales strategy: the five decisions

| Field | Detail |
| --- | --- |
| Type | REFRESH of `/resources/blogs/what-is-b2b-outbound-sales`: a new section, not a new page. Leave the title and H1 alone because the page ranks 4.5 to 7 for its head terms |
| Working title (section) | "How to build a B2B outbound sales strategy: five decisions" |
| Primary keyword (section) | `b2b outbound sales strategy` (the page's own primary stays "what is b2b outbound sales") |
| Secondary keywords | b2b outbound; outbound b2b; outbound sales b2b; outbound sales channels |
| Search signal | "b2b outbound sales strategy" 5 impressions, position 22.6. "b2b outbound" 14 / 0 / 14.8. The page overall: 138 impressions across 21 queries. Head terms outside the window: "b2b outbound sales" 21 / 0 / 7.0; "what is b2b outbound sales" 11 / 0 / 4.5 |
| Intent | Informational, planning |
| Opening 60 words must state | An outbound strategy is five decisions: who you target (ICP and account tiers), which channels, what you say, how often you follow up, and who runs it. Metrics come last |
| Outline | Definition; three main channels; anatomy of an outbound system; **new section: five decisions**, one short subsection each plus a closing line on measuring; in-house vs outsourcing; how to know if outbound is worth it; FAQ with "What is an outbound sales strategy?" and "What's the difference between an outbound strategy and outbound tactics?" |
| Internal links | `/resources/blogs/icp-mapping-b2b`, `/resources/blogs/cold-email-vs-linkedin-outreach`, `/resources/blogs/outbound-funnel-math-not-guesswork` |
| Should link back | `icp-mapping-b2b`, `outbound-funnel-math-not-guesswork`, `predictable-b2b-lead-gen-engine` (none linked to this page when the brief was written) |
| Sources | No external statistics. The existing stat strip needs attention (see flagged claims) |
| Length | Add 300 to 400 words to a page of about 1,200 |
| **Status 11 Nov 2026** | **Open.** Checked: the post has no "five decisions" section |

#### Brief 4: Gmail and Yahoo sender requirements: what they mean for cold email

| Field | Detail |
| --- | --- |
| Type | NEW PAGE. Slug proposed in the brief: `/blog/gmail-yahoo-sender-requirements-cold-email`. The draft file that exists uses the slug `gmail-and-yahoo-sender-requirements` (so the live address would be `/resources/blogs/gmail-and-yahoo-sender-requirements`) |
| Working title | "Gmail and Yahoo Sender Requirements: What They Mean for Cold Email" |
| Primary keyword | `gmail and yahoo sender requirements` |
| Secondary keywords | gmail bulk sender requirements; yahoo bulk sender requirements; google 5000 emails per day rule; cold email spam rate 0.3%; dmarc required for cold email |
| Search signal | None for these terms. The adjacent deliverability cluster totals 19 impressions, 0 clicks ("cold email infra" 7 at position 8.3; "sender reputation" 6 at 15.8; "domain warm up" 2 at 23.5). Thin. The topic comes from the gap list: the compliance guide covers law, not mailbox-provider rules |
| Intent | Informational and compliance: do the 2024 rules apply to me, what exactly must I do, what counts toward 5,000, what happens if I ignore them |
| First 60 words must state | Since February 2024 Gmail requires every sender to personal Gmail accounts to authenticate and keep spam rates low, with extra requirements (SPF, DKIM and DMARC, one-click unsubscribe) for bulk senders; Yahoo requires SPF and DKIM, a DMARC policy and spam rate under 0.3% for bulk senders; the figures are the providers' own, linked |
| Outline | Short answer with a Gmail vs Yahoo table; who counts as a bulk sender (5,000 to personal Gmail in 24 hours, same primary domain, permanent); what each provider requires; why cold email teams reach the threshold sooner than expected; what the rules do not say about cold email (Google does not define cold outreach, claim no certainty); pre-send checklist; FAQ |
| Internal links | `/resources/blogs/cold-email-deliverability-guide`, `/resources/glossary/spf-dkim-dmarc`, `/services/cold-email` |
| Should link back | The deliverability guide; the glossary pages spf-dkim-dmarc, sender-reputation and domain-warmup; the compliance guide (a pointer separating law from provider rules) |
| Format | 1,000 to 1,300 words, comparison table, Article, FAQPage and BreadcrumbList schema. No HowTo markup |
| Status 11 Nov 2026 | **Drafted, not published** (`published: false`). The AI prompt library already lists this page as the answer to P55, so it cannot be cited until it goes live |

Sources for Brief 4 (all opened 16 Oct 2026; the writer must re-open each and copy the exact wording when drafting):

- Google, Email sender guidelines, `https://support.google.com/a/answer/81126`: senders of more than 5,000 messages per day from 1 Feb 2024; all senders need SPF or DKIM, bulk senders need SPF, DKIM and DMARC; keep spam rates in Postmaster Tools below 0.3%; aim below 0.10% and never reach 0.30%; marketing and subscribed messages must support one-click unsubscribe; a DKIM key of 1024 bits or longer for personal Gmail.
- Google, Email sender guidelines FAQ, `https://support.google.com/a/answer/14229414`: a bulk sender sends close to 5,000 or more messages to personal Gmail accounts in 24 hours; messages from the same primary domain count together (a subdomain counts toward its parent); a sender who meets the criteria once is permanently a bulk sender; the guidelines do not apply to Google Workspace accounts.
- Yahoo, Email Sender Requirements, `https://senders.yahooinc.com/best-practices/`: implement SPF and DKIM; publish a valid DMARC policy of at least p=none and DMARC must pass; honour unsubscribes within 2 days; keep spam rate below 0.3%; enforcement from February 2024. Yahoo gives no numeric volume threshold, so never attribute 5,000 to Yahoo.
- Not usable: Microsoft's Outlook.com high-volume sender announcement (the page did not load, so no Microsoft figure goes in until the writer opens it). Do not reuse the unsourced "0.2% spam rate" claim.

#### Brief 5: LinkedIn connection request limits: what LinkedIn actually says

| Field | Detail |
| --- | --- |
| Type | NEW PAGE, plus a mandatory correction to `/resources/blogs/linkedin-outreach-sequences`. Slug proposed: `/blog/linkedin-connection-request-limits` (today it would live under `/resources/blogs/`) |
| Working title | "LinkedIn Connection Request Limits: What LinkedIn Actually Says (and What It Doesn't)" |
| Primary keyword | `linkedin connection request limit` |
| Secondary keywords | linkedin weekly invitation limit; linkedin invitation limit reached; linkedin personalized invitation limit; is linkedin automation allowed |
| Search signal | None. No query among the 496 mentions limits or invitations. Rank it below briefs 1 to 3. It comes from a coverage gap and an accuracy problem |
| Intent | Informational: how many can I send, what happens at the limit, how long it lasts, is automation allowed. The honest answer is that LinkedIn publishes no single weekly number |
| First 60 words must state | LinkedIn's Help Center states no numeric weekly invitation cap; restrictions come from sending many invitations quickly, or many going ignored, pending or marked as spam; most restrictions lift in about a week and support cannot remove them; third-party numbers are not LinkedIn's |
| Outline | Short answer; what triggers a restriction; how long it lasts and what does not clear it; the personalized-note cap and the connection-count cap; what LinkedIn's rules say about automation; how to stay inside the rules; FAQ |
| Internal links | `/resources/blogs/linkedin-outreach-sequences`, `/resources/blogs/cold-email-vs-linkedin-outreach`, `/services/linkedin-outreach` |
| Should link back | `linkedin-outreach-sequences` (replace the unsourced paragraph with a pointer), `linkedin-outreach-agency-vs-manual-prospecting`, `cold-email-vs-linkedin-outreach` |
| Format | 900 to 1,200 words, Article, FAQPage and BreadcrumbList schema |
| Status 11 Nov 2026 | **Open, not built** (checked: no such post). The correction half is done: the sequences post now says LinkedIn "does not publish a fixed weekly number" |
| **Owner decision needed before drafting** | LinkedIn prohibits third-party automation (its rules, section 8.2), while `/services/linkedin-outreach`, `/marketing-automation`, `/myntmore-framework` and `/services/do-it-yourself` market "LinkedIn automation". Decide how Myntmore's own approach is described, or whether it is described at all. Until then, never claim "account-safe" or "no bans" |

Sources for Brief 5 (opened 16 Oct 2026; re-open in a browser and copy exact wording):

- LinkedIn Help, Types of restrictions for sending invitations, `https://www.linkedin.com/help/linkedin/answer/a551012/types-of-restrictions-for-sending-invitations`: most restrictions are removed within one week; LinkedIn cannot remove them on request; waits range from a few hours to up to one month; after withdrawing an invitation you cannot resend to the same person for up to three weeks; the network size limit is 30,000 first-degree connections; no weekly cap stated.
- LinkedIn Help, Invitation limit reached, `https://www.linkedin.com/help/linkedin/answer/a550555`: the restriction typically lasts one week; withdrawing pending invitations does not remove it; support cannot disclose the type or reason.
- LinkedIn Help, Personalize invitations to connect, `https://www.linkedin.com/help/linkedin/answer/a563153`: two reads said up to three personalized connection requests per month, each up to 200 characters; Premium is described as unlimited. A search summary said five, so the number may have changed. The writer must read the live page and quote the number with the date, or leave it out.
- LinkedIn Help, Prohibited software and extensions, `https://www.linkedin.com/help/linkedin/answer/a1341387/prohibited-software-and-extensions?lang=en`: third-party software, and browser extensions that scrape or automate activity, are not permitted; accounts risk being restricted or shut down.
- Not usable: any "100 per week" or "150-200 for Sales Navigator" figure. Those appeared only in conflicting third-party blogs and in this site's own old paragraph.

#### Briefs considered and not written

- `cold-email-infrastructure-explained`: would collide (see C.3).
- Pharma and manufacturer blog posts supporting the landing pages: the landing-page keyword lists already contain those informational phrases, and search signal is 1 to 4 impressions per query. One finding: "lead generation agency for manufacturing companies" (13 impressions, position 27.8) is a `/lp/manufacturers-exporters` keyword, yet Google shows the Chennai, Kolkata, Pune and Ahmedabad city pages for it. That is a metadata and linking question, not a new brief.
- Hot lead, sender reputation and domain warm-up clusters: 15 to 25 impressions each, all on existing glossary pages.
- Pricing and tool-versus-tool pages: ruled out (C.3).

#### Publishing checklist for a new blog page

1. Add the URL to `app/sitemap.ts` (unless a generator owns it).
2. Run `npm run sitemap:dates` and commit the JSON.
3. Make sure the post appears on the blog index (`app/resources/blogs/page.tsx` reads the CMS posts).
4. Check its primary keyword against C.1 and re-run the collision check.

#### Flagged claims on live pages that need sourcing

Found during the brief work and not edited then. Status checked 11 Nov 2026:

| # | Page | Claim | Problem | Status now |
| --- | --- | --- | --- | --- |
| 1 | `/resources/blogs/handling-cold-email-replies` | A Harvard Business Review study showed answering within an hour made leads "nearly 7x" more likely to qualify | The HBR page and the BYU abstract show only that most companies respond too slowly to web inquiries, not replies to cold email. The 7x figure could not be confirmed | **Fixed.** The post now says only that the study found most companies do not respond to leads fast enough |
| 2 | `/resources/blogs/linkedin-outreach-sequences` | LinkedIn limits connection requests to "around 100 per week" (150 to 200 with Sales Navigator) | LinkedIn publishes no weekly number | **Fixed.** Now says LinkedIn does not publish a fixed weekly number |
| 3 | `/resources/blogs/what-is-b2b-outbound-sales` | Stat strip: "8 touches (RAIN Group)" and "49% (LinkedIn Research)" | The RAIN Group study is named but the touches figure sits behind a download form and could not be confirmed. The 49% was not checked | **Still on the page** (checked). Remove, or replace with a verified figure |
| 4 | `/services/cold-email` area (the "Cold Email Infrastructure" card on `/services`) | "<0.2% Spam rate" shown next to "98.5% Inbox rate" | No source. Real spam-rate data from Google Postmaster Tools is needed | **Still on the page** (the `/services` card in `app/services/page.tsx` carries it). Source it or remove it |

---

### C.5 Featured-snippet rules and the audit

**The format Google rewards:** a question as the heading, with a tight, direct answer right under it.

| Rule | Detail |
| --- | --- |
| Length | About 40 to 60 words. Shorter direct answers are just as likely to be extracted |
| Answer first | The answer is in the first sentence |
| No hedge openers | Never open with "it depends", "not really" or similar. They bury the answer |
| Over 60 words | Treat as too long and trim without losing the substantive claim |
| Schema | Every page that shows an FAQ must emit FAQPage schema through `buildFaqSchema` |

**What the audit checked (run 21 Aug 2026):** a script read every FAQ answer in all `page.tsx` files, counted words per answer, flagged answers opening with a hedge, and cross-checked that every page with FAQ content also calls `buildFaqSchema`.

**Findings:**

| Item | Result |
| --- | --- |
| FAQ items found | 79 sitewide (services, landing pages, city pages, blog posts) |
| Under 25 words | 30 |
| 25 to 40 words | 14 |
| 40 to 60 words | 35 |
| Over 60 words | 0 after fixes |
| Pages with a visible FAQ but no schema | 0 |

**Fixes made:**

- Three answers over 60 words were trimmed: the DPDP Act answer in the compliance guide (64 words down to 51); "Which channel has a higher reply rate?" in the cold-email-vs-LinkedIn post (61 down to 54); "Is LinkedIn outreach more expensive than cold email?" in the same post (67 down to 57).
- One hedge opener was rewritten: "Is an agency more expensive than an SDR long-term?" in the agency-vs-in-house post opened with "It depends on the horizon". It now leads with "Short-term, no... Long-term, it can flip."

**Not treated as problems:** answers under 25 words (mostly on city pages). Short direct answers extract at least as well.

**Not re-checked:** the 79 count is from 21 Aug 2026. FAQs have been added since, including the new FAQ on each landing page and the CMS-held FAQs, and blog posts now keep their FAQs in the CMS. Re-run the word-count, hedge-opener and schema checks whenever FAQ content is added. The schema gap is easy to introduce silently: schema added when a page is built, then a later edit adds an FAQ without it. The `npm run audit:answers` command (see Part 10 of the main Bible) checks FAQ and answer copy length and shape.

---

### C.6 AI visibility: getting named by ChatGPT, Claude, Gemini and Perplexity

#### The method in one paragraph

No tool or API reports whether an AI engine mentions Myntmore. So we check by hand: ask the engines the questions our buyers ask, and write down whether Myntmore is named, how it is described, who else is named, which pages are cited, and anything the engine gets wrong. Each prompt in the library also names the page that should be cited, so a miss points straight at the page to strengthen.

#### Two checks, two rhythms

| Check | What | How often | Time | Where logged |
| --- | --- | --- | --- | --- |
| Weekly scorecard | The 10 fixed prompts below, in a logged-out ChatGPT window. A hit is any answer that names Myntmore or cites myntmore.com. This feeds the "AI citation rate" card. Perplexity now requires an account, so it is not used here | Every week (checklist W8) | Short | The KPI scorecard |
| Monthly prompt check | The 16 monthly prompts in all four engines (ChatGPT, Perplexity, Claude, Gemini) | Every month | About two hours | The tracker file |
| Quarterly prompt check | The 147 quarterly prompts. Ask a quarter of them each month, or all in one sitting each quarter | Quarterly | Spread out | Add rows to the tracker as needed |

Status: the AI citation rate has never been measured. ChatGPT shows a bot check to automated browsers, and we did not work around it, so a person must run the prompts. The tracker file is completely blank (0 of its 64 rows filled, checked 11 Nov 2026).

#### The 10 fixed scorecard prompts (never change them, so weeks stay comparable)

1. best B2B lead generation agency in Mumbai
2. best cold email agency for B2B SaaS in India
3. top LinkedIn outreach agencies in India
4. B2B lead generation companies in Pune
5. B2B lead generation company in Delhi
6. outbound sales agency for SaaS startups in India
7. best AI-powered B2B lead generation agencies in India
8. what is B2B outbound sales
9. average B2B outbound reply rate 2026
10. how to choose an outbound lead generation agency

A prompt can be run by opening `chatgpt.com/?q=<prompt>&hints=search` in a logged-out window.

#### How to run the monthly check

1. Open each engine in a fresh session, signed out or in a clean profile, so earlier chats do not colour the answer.
2. Ask each prompt exactly as written. Do not rephrase.
3. For every answer, fill one row of the tracker (columns below).
4. Decide one action per gap and write it in the last column.

The three entity prompts ("What is Myntmore?", "Who is Tejas Jhaveri?", "Myntmore reviews") catch wrong facts and reputation, not missing mentions.

#### The tracker spreadsheet

It has 64 blank rows: the 16 monthly prompts times 4 engines (16 each of ChatGPT, Perplexity, Claude, Gemini). To start a new month, copy the 64 rows and fill in the month. `npm run keywords:build -- --write-tracker` only rewrites the tracker while it is still empty, and refuses if any result is filled.

| Column | What to write |
| --- | --- |
| month (YYYY-MM) | The month, for example 2026-11 |
| engine | ChatGPT, Perplexity, Claude or Gemini |
| prompt | The prompt, as written |
| myntmore_mentioned (yes/no) | Whether Myntmore is named |
| how it is described | The engine's words about Myntmore, if mentioned |
| competitors_named | Who else appears. This is the gap map |
| sources_cited | The URLs the engine shows (Perplexity and Gemini show them; ChatGPT does when browsing) |
| myntmore_pages_cited | Which myntmore.com URLs were cited |
| facts_the_answer_gets_wrong | Anything false about Myntmore: founder, location, services, numbers, pricing |
| likely_page_or_gap | Which page seems to have fed the answer, or which page is missing |
| action_taken | The one action decided for this gap |

#### Turning results into work

| What you see | What to do |
| --- | --- |
| Myntmore never appears for a commercial prompt | Check that the service page for that intent has a direct answer block and a case study. Look at which competitors' pages are cited and what they hold that ours does not |
| A wrong fact appears | Find where the wrong version could come from (an old page, an inconsistent number), fix it at the source, and check the "Do not infer" list in `public/llms.txt` covers it. `npm run audit:entity` finds conflicting numbers |
| Myntmore is mentioned but a competitor's page is cited | The engine found their page more citable. Add the missing definition, comparison or data to ours |
| A page of ours is cited | Keep it current. Update the page and its date whenever anything on it changes |
| Pricing or cost prompts | We do not publish pricing. Expect no direct answer. Do not add numbers to fix it |

Off-site work decides most of this: reviews (Clutch), directories, podcasts and interviews. The prompts "Myntmore reviews" and "Is Myntmore a good lead generation agency?" have an off-site target (Clutch reviews) and not a page on the site.

#### The full prompt library

**163 prompts** (checked 11 Nov 2026): 16 monthly (marked M) and 147 quarterly (marked Q). Columns: id, tier, category, prompt, icp, icp_name, city, page_that_should_be_cited. The research notes written in November said "63 prompts, 47 quarterly"; the file really has 163 and 147, because the library was extended after those notes were written. Prompts P01 to P09 are the original nine, unchanged so months stay comparable. Pages marked NEW do not exist yet. P55 points at the Gmail and Yahoo post, which is still a draft.

The 16 monthly prompts are P01 to P16: best B2B lead generation agencies in India, best cold email agencies for SaaS, generating leads in Mumbai, safe LinkedIn outreach strategy, average reply rate, LinkedIn vs cold email, outsourced lead generation cost, what is Myntmore, who is Tejas Jhaveri, best LinkedIn outreach agency in India, best lead generation company in Bangalore, the four core-ICP "how do I get clients" questions (IT services, recruitment, manufacturers, virtual CFO firms), and "Myntmore reviews".

Count by theme: how-to 45, industry (ICP) 28, definitions 23, city 19, best-of 12, tools 10, about Myntmore 9, comparisons 8, services 6, cost 3.

##### "Best of" lists (12 prompts)

| ID | Tier | Prompt | Page that should be cited |
|---|---|---|---|
| P01 | M | Best B2B lead generation agencies in India | `/resources/guides/how-to-choose-b2b-lead-generation-agency-india` |
| P02 | M | Best cold email agencies for SaaS companies | `/services/cold-email` |
| P10 | M | Best LinkedIn outreach agency in India | `/services/linkedin-outreach` |
| P17 | Q | Top outbound sales agencies in India | `/who-this-is-for` |
| P18 | Q | Best appointment setting companies in India | `/services/cold-email` |
| P19 | Q | Who are the best outsourced SDR companies in India? | `/resources/blogs/agency-vs-in-house` |
| P20 | Q | Best account-based marketing agencies in India | `/services/account-based-marketing` |
| P21 | Q | Best LinkedIn ghostwriting agency for founders in India | `/services/personal-branding` |
| P22 | Q | Recommend a lead generation agency for a B2B startup in India | `/who-this-is-for` |
| P23 | Q | Affordable B2B lead generation agency for a small business in India | `/who-this-is-for` |
| P24 | Q | Best offshore lead generation agency for a US B2B company | `/case-studies/markets/united-states` |
| P25 | Q | Best AI lead generation agency | `/services/ai-lead-generation` |

##### City questions (19 prompts)

| ID | Tier | Prompt | Page that should be cited |
|---|---|---|---|
| P03 | M | How do I generate B2B leads in Mumbai? | `/b2b-lead-generation-mumbai` |
| P11 | M | Best B2B lead generation company in Bangalore | `/b2b-lead-generation-bengaluru` |
| P26 | Q | Best B2B lead generation company in Delhi | `/b2b-lead-generation-delhi` |
| P27 | Q | Best B2B lead generation company in Pune | `/b2b-lead-generation-pune` |
| P28 | Q | Best B2B lead generation company in Hyderabad | `/b2b-lead-generation-hyderabad` |
| P29 | Q | Best B2B lead generation company in Chennai | `/b2b-lead-generation-chennai` |
| P30 | Q | Best B2B lead generation company in Ahmedabad | `/b2b-lead-generation-ahmedabad` |
| P31 | Q | Best B2B lead generation company in Kolkata | `/b2b-lead-generation-kolkata` |
| P32 | Q | Best B2B lead generation company in Gurugram | NEW: /b2b-lead-generation-gurugram |
| P33 | Q | Best lead generation agency in Dubai for B2B companies | `/case-studies/markets/uae` |
| P34 | Q | Lead generation agency in Mumbai for IT companies | `/b2b-lead-generation-mumbai` |
| P156 | Q | B2B lead generation agency in Delhi NCR | `/b2b-lead-generation-delhi` |
| P157 | Q | Outbound agency in Hyderabad for SaaS and IT companies | `/b2b-lead-generation-hyderabad` |
| P158 | Q | LinkedIn lead generation agency in Chennai | `/b2b-lead-generation-chennai` |
| P159 | Q | Cold email agency in Kolkata | `/b2b-lead-generation-kolkata` |
| P160 | Q | B2B marketing agency in Ahmedabad | `/b2b-lead-generation-ahmedabad` |
| P161 | Q | B2B lead generation for SaaS companies in Bangalore | `/b2b-lead-generation-bengaluru` |
| P162 | Q | B2B marketing agency in Mumbai | `/b2b-lead-generation-mumbai` |
| P163 | Q | Lead generation services in Pune for manufacturers | `/b2b-lead-generation-pune` |

##### Industry (ICP) questions (28 prompts)

| ID | Tier | Prompt | Page that should be cited |
|---|---|---|---|
| P12 | M | How can an IT services company in India get clients in the US? | `/lp/agencies-it` |
| P13 | M | How do recruitment agencies get new clients? | `/lp/recruitment-firms` |
| P14 | M | How can Indian manufacturers find international buyers? | `/lp/manufacturers-exporters` |
| P15 | M | How can a virtual CFO firm get more clients? | `/lp/accounting-cfo-firms` |
| P35 | Q | Best lead generation agency for IT services companies | `/lp/agencies-it` |
| P36 | Q | Best lead generation agency for recruitment firms in India | `/lp/recruitment-firms` |
| P37 | Q | How do executive search firms win new mandates? | `/lp/recruitment-firms` |
| P38 | Q | Should my SaaS startup hire SDRs or outsource outbound? | `/resources/blogs/agency-vs-in-house` |
| P39 | Q | How can a marketing agency offer lead generation as a white-label service? | `/lp/agency-partners` |
| P40 | Q | How do pharma API manufacturers find buyers abroad? | `/lp/pharma` |
| P41 | Q | How can an Indian accounting outsourcing firm win UK clients? | `/lp/accounting-cfo-firms` |
| P42 | Q | How can VCs help portfolio companies build pipeline? | NEW: /lp/vc-portfolio-gtm |
| P43 | Q | How do GCC setup firms find companies planning a GCC in India? | NEW: /lp/gcc-providers |
| P44 | Q | How do logistics companies get B2B clients? | NEW: /lp/logistics |
| P45 | Q | How can executive coaches win corporate clients? | NEW: /lp/executive-coaches |
| P46 | Q | How do corporate gifting companies get B2B orders? | NEW: /lp/corporate-gifting |
| P47 | Q | How do Indian jewellery exporters find buyers in the US? | `/lp/manufacturers-exporters` |
| P48 | Q | How do cybersecurity companies generate enterprise leads? | `/lp/saas-founders` |
| P146 | Q | How can a SaaS founder get the first customers through outbound? | `/lp/saas-founders` |
| P147 | Q | How can a software development agency win clients in the US and UK? | `/lp/agencies-it` |
| P148 | Q | How do contract manufacturers and CDMOs find new customers? | `/lp/pharma` |
| P149 | Q | How do textile and engineering exporters find importers abroad? | `/lp/manufacturers-exporters` |
| P150 | Q | How do staffing firms find new client companies? | `/lp/recruitment-firms` |
| P151 | Q | How can a bookkeeping or payroll firm get new clients? | `/lp/accounting-cfo-firms` |
| P152 | Q | How can an NBFC or business lender generate B2B leads? | `/lp/financial-services` |
| P153 | Q | How do insurance brokers find corporate group insurance clients? | `/lp/insurance` |
| P154 | Q | How can a startup founder reach the right investors? | `/lp/fundraising` |
| P155 | Q | How can my agency resell lead generation under our own brand? | `/lp/agency-partners` |

##### How-to questions (45 prompts)

| ID | Tier | Prompt | Page that should be cited |
|---|---|---|---|
| P04 | M | What is a safe LinkedIn outreach strategy? | `/services/linkedin-outreach` |
| P05 | M | What is the average B2B outbound reply rate? | `/resources/blogs/b2b-outbound-benchmark-report-2026` |
| P49 | Q | How do I set up cold email so it lands in the inbox? | `/resources/blogs/cold-email-deliverability-guide` |
| P50 | Q | How many LinkedIn connection requests can I safely send per week? | `/services/linkedin-outreach` |
| P51 | Q | Is cold emailing legal in India? | `/resources/blogs/cold-email-compliance-guide` |
| P52 | Q | How do I build an ICP for B2B outbound? | `/resources/blogs/icp-mapping-b2b` |
| P53 | Q | How long does outbound take to book meetings? | `/resources/blogs/b2b-outbound-benchmark-report-2026` |
| P54 | Q | How do I write a cold email follow-up sequence? | `/resources/blogs/cold-email-follow-up-sequence` |
| P55 | Q | What are Gmail and Yahoo's bulk sender requirements? | `/resources/blogs/gmail-and-yahoo-sender-requirements` |
| P87 | Q | How do I warm up a new domain for cold email? | `/resources/blogs/cold-email-deliverability-guide` |
| P88 | Q | How many cold emails can I send per day per inbox? | `/resources/blogs/cold-email-deliverability-guide` |
| P89 | Q | How do I avoid the spam folder with cold email? | `/resources/blogs/cold-email-deliverability-guide` |
| P90 | Q | How do I reply to a positive cold email response and book the meeting? | `/resources/blogs/positive-reply-to-booked-meeting` |
| P91 | Q | How do I handle objections and replies to cold emails? | `/resources/blogs/handling-cold-email-replies` |
| P92 | Q | What are good cold email templates for B2B? | `/resources/blogs/cold-email-sequence-templates` |
| P93 | Q | How many follow-ups should a cold email sequence have? | `/resources/blogs/cold-email-follow-up-sequence` |
| P94 | Q | Is cold email still effective in 2026? | `/resources/blogs/b2b-outbound-benchmark-report-2026` |
| P95 | Q | What is a good cold email reply rate? | `/resources/blogs/b2b-outbound-benchmark-report-2026` |
| P96 | Q | Does cold email comply with GDPR and India's DPDP Act? | `/resources/blogs/cold-email-compliance-guide` |
| P97 | Q | What tech stack do I need to run cold email? | `/resources/guides/cold-email-tech-stack` |
| P98 | Q | How do I personalise cold emails with AI at scale? | `/resources/blogs/ai-personalization-cold-outreach` |
| P99 | Q | How do I write a LinkedIn hook that gets read? | `/resources/blogs/how-to-write-a-linkedin-hook` |
| P100 | Q | What does a good LinkedIn outreach message sequence look like? | `/resources/blogs/linkedin-outreach-sequences` |
| P101 | Q | Is LinkedIn automation safe for my account? | `/services/linkedin-outreach` |
| P102 | Q | How do I turn my LinkedIn profile into an inbound lead machine? | `/resources/blogs/linkedin-profile-inbound-lead-machine` |
| P103 | Q | How can a founder build a LinkedIn personal brand that brings in clients? | `/resources/blogs/founder-personal-brand-linkedin` |
| P106 | Q | How do I get meetings booked from LinkedIn connections? | `/resources/guides/58-meetings-600-linkedin-connections` |
| P107 | Q | How do I turn LinkedIn content into sales calls? | `/resources/guides/linkedin-content-to-calls-starter-kit` |
| P110 | Q | Which LinkedIn metrics are vanity metrics for a founder? | `/resources/blogs/vanity-metrics-personal-brand-pipeline` |
| P111 | Q | How do I define an ICP for B2B outbound step by step? | `/resources/guides/golden-icp-framework` |
| P112 | Q | Why does vague targeting hurt B2B outbound? | `/resources/blogs/tam-trap-vague-targeting` |
| P113 | Q | Why do my cold emails get no replies even with good targeting? | `/resources/blogs/outbound-offer-problem` |
| P114 | Q | Why should cold outreach not lead with product features? | `/resources/blogs/stop-selling-features-cold-outreach` |
| P115 | Q | How do I position against competitors in cold outreach? | `/resources/blogs/pitching-trap-competitor-positioning` |
| P116 | Q | How do I calculate outbound funnel math? | `/resources/blogs/outbound-funnel-math-not-guesswork` |
| P117 | Q | Which metrics should I track for B2B lead generation? | `/resources/blogs/b2b-lead-gen-metrics` |
| P118 | Q | How do I build a predictable B2B lead generation engine? | `/resources/blogs/predictable-b2b-lead-gen-engine` |
| P119 | Q | How do I sell to a whole B2B buying committee? | `/resources/blogs/multi-threading-b2b-buying-committee` |
| P120 | Q | How do I revive closed-lost leads? | `/resources/blogs/reviving-closed-lost-leads` |
| P121 | Q | Should a founder do the selling before building an outbound team? | `/resources/blogs/founder-led-sales-before-scaling` |
| P122 | Q | Is relevance or reach more important in B2B outbound? | `/resources/blogs/relevance-beats-reach-b2b-outbound` |
| P123 | Q | Why measure outbound by conversations instead of impressions? | `/resources/blogs/conversations-not-impressions-outbound` |
| P125 | Q | What makes a lead magnet worth the contact details? | `/resources/blogs/value-premium-lead-magnets` |
| P126 | Q | What is B2B outbound sales and how does it work? | `/resources/blogs/what-is-b2b-outbound-sales` |
| P145 | Q | How do I choose a B2B outbound agency? | `/resources/guides/how-to-choose-an-outbound-agency` |

##### Comparisons (8 prompts)

| ID | Tier | Prompt | Page that should be cited |
|---|---|---|---|
| P06 | M | Should I use LinkedIn or cold email for outbound? | `/resources/blogs/cold-email-vs-linkedin-outreach` |
| P56 | Q | Agency vs in-house SDR: which is better for a B2B startup? | `/resources/blogs/agency-vs-in-house` |
| P57 | Q | Alternatives to hiring an SDR team | `/resources/blogs/agency-vs-in-house` |
| P58 | Q | Alternatives to Belkins for companies in India | NEW: comparison page |
| P59 | Q | Indian outbound agency vs US outbound agency | NEW: comparison page |
| P104 | Q | Personal branding agency vs content freelancer: which should a founder hire? | `/resources/blogs/personal-branding-agency-vs-content-freelancer` |
| P105 | Q | LinkedIn outreach agency vs manual prospecting | `/resources/blogs/linkedin-outreach-agency-vs-manual-prospecting` |
| P124 | Q | AI lead generation vs traditional lead generation | `/resources/blogs/ai-vs-traditional-lead-generation` |

##### Cost questions (3 prompts)

| ID | Tier | Prompt | Page that should be cited |
|---|---|---|---|
| P07 | M | How much does outsourced lead generation cost? | `/resources/guides/how-to-choose-b2b-lead-generation-agency-india` |
| P60 | Q | How much does a cold email agency cost in India? | `/services/cold-email` |
| P61 | Q | What does a LinkedIn outreach agency charge? | `/services/linkedin-outreach` |

##### About Myntmore (entity) (9 prompts)

| ID | Tier | Prompt | Page that should be cited |
|---|---|---|---|
| P08 | M | What is Myntmore? | `/about-us` |
| P09 | M | Who is Tejas Jhaveri? | `/about-us` |
| P16 | M | Myntmore reviews | Clutch reviews (off-site) |
| P62 | Q | What services does Myntmore offer? | `/services` |
| P63 | Q | Is Myntmore a good lead generation agency? | Clutch reviews (off-site) |
| P141 | Q | Who is Myntmore not for? | `/who-this-is-for` |
| P142 | Q | What is the Myntmore Framework for outbound? | `/myntmore-framework` |
| P143 | Q | Where does Myntmore's data and benchmark information come from? | `/editorial-policy` |
| P144 | Q | What results has Myntmore produced for B2B SaaS companies? | `/case-studies/saas-series-a` |

##### Definitions (23 prompts)

| ID | Tier | Prompt | Page that should be cited |
|---|---|---|---|
| P64 | Q | What is a cold email? | `/resources/glossary/cold-email` |
| P65 | Q | What is an ideal customer profile (ICP)? | `/resources/glossary/icp` |
| P66 | Q | What is account-based marketing (ABM)? | `/resources/glossary/abm` |
| P67 | Q | What is a buying signal in B2B sales? | `/resources/glossary/buying-signal` |
| P68 | Q | What is multi-threading in B2B sales? | `/resources/glossary/multi-threading` |
| P69 | Q | What is domain warmup for cold email? | `/resources/glossary/domain-warmup` |
| P70 | Q | What do SPF, DKIM and DMARC do for cold email? | `/resources/glossary/spf-dkim-dmarc` |
| P71 | Q | What is sender reputation? | `/resources/glossary/sender-reputation` |
| P72 | Q | What is a good spam complaint rate for cold email? | `/resources/glossary/spam-complaint-rate` |
| P73 | Q | What is lead scoring in B2B? | `/resources/glossary/lead-scoring` |
| P74 | Q | What is the difference between a warm lead and a cold lead? | `/resources/glossary/warm-lead` |
| P75 | Q | What is founder-led sales? | `/resources/glossary/founder-led-sales` |
| P76 | Q | What is social selling on LinkedIn? | `/resources/glossary/social-selling` |
| P77 | Q | What is a re-engagement campaign? | `/resources/glossary/re-engagement-campaign` |
| P78 | Q | What is lead qualification? | `/resources/glossary/lead-qualification` |
| P79 | Q | What is a meeting booked rate in outbound? | `/resources/glossary/meeting-booked-rate` |
| P80 | Q | What are vanity metrics in outbound sales? | `/resources/glossary/vanity-metrics` |
| P81 | Q | What is pipeline generation? | `/resources/glossary/pipeline-generation` |
| P82 | Q | What is multi-channel outreach? | `/resources/glossary/multi-channel-outreach` |
| P83 | Q | What does an SDR do? | `/resources/glossary/sdr` |
| P84 | Q | What is appointment setting? | `/resources/glossary/appointment-setting` |
| P85 | Q | What is a go-to-market (GTM) strategy? | `/resources/glossary/gtm-strategy` |
| P86 | Q | What is CAN-SPAM and does it apply to cold email? | `/resources/glossary/can-spam-act` |

##### Free tools (10 prompts)

| ID | Tier | Prompt | Page that should be cited |
|---|---|---|---|
| P108 | Q | Free tool to score a LinkedIn post hook | `/tools/linkedin-hook-grader` |
| P109 | Q | Free tool to audit and improve a LinkedIn profile for sales | `/tools/linkedin-optimizer` |
| P127 | Q | Free ROI calculator for an outbound programme | `/tools/roi-calculator` |
| P128 | Q | Free cold email ROI calculator | `/tools/cold-email-roi-calculator` |
| P129 | Q | Free ICP builder tool | `/tools/icp-builder` |
| P130 | Q | Free sales battle card generator | `/tools/battle-card-generator` |
| P131 | Q | Free B2B case study generator | `/tools/case-study-generator` |
| P132 | Q | Free lead magnet ideas generator | `/tools/lead-magnet-ideas` |
| P133 | Q | Free LinkedIn DM opening line generator | `/tools/dm-angle-generator` |
| P134 | Q | Free tool to check a founder's LinkedIn presence | `/tools/founder-presence-analyzer` |

##### Service questions (6 prompts)

| ID | Tier | Prompt | Page that should be cited |
|---|---|---|---|
| P135 | Q | What is ICP mapping and lead scoring as a service? | `/services/sales-intelligence` |
| P136 | Q | How does AI lead generation work with human review? | `/services/ai-lead-generation` |
| P137 | Q | What does an account-based marketing agency do for enterprise sales? | `/services/account-based-marketing` |
| P138 | Q | What does a GTM strategy engagement include? | `/services/gtm-strategy` |
| P139 | Q | What does a done-for-you cold email service include? | `/services/cold-email` |
| P140 | Q | Is there a self-serve LinkedIn outreach tool? | `/services/do-it-yourself` |


---

### C.7 The October 2026 Search Console opportunity map

**Source:** Google Search Console through the GSC Wizard connector, domain property `sc-domain:myntmore.com`, web search, settled range 10 Sep to 7 Oct 2026. The query report is missing about 40.4% of impressions and 45.7% of clicks, so the numbers are directional.

**Technical crawl.** The 25 highest-impression indexable URLs were crawled live: 25 of 25 returned HTTP 200 and were indexable; 25 of 25 had one H1, a self-referencing canonical, valid structured data and full image alt text; 0 critical, high or medium issues. One low issue: `/GIAtech-stack` is a legacy URL that permanently redirects to `/resources/guides/ai-tech-stack-jewellery`. It is not in the sitemap and must stay a redirect. A wider check of 15 high-impression URLs found the same pattern, and the Organization logo schema fixes went into production.

**Query-to-page opportunities**

| Priority | Query | Current page | Signal | Action taken or advised |
| --- | --- | --- | --- | --- |
| 1 | b2b lead generation companies in pune | `/b2b-lead-generation-pune` | 60 impressions, 1 click, position 13.33 | Added the exact comparison phrase to the hero copy. Add internal links from Pune-relevant content and watch position and click rate |
| 1 | b2b lead generation services chennai | `/b2b-lead-generation-chennai` | 11 impressions, 0 clicks, position 6 | Test a more service-specific title and description only after another settled period |
| 1 | what is b2b outbound sales | `/resources/blogs/what-is-b2b-outbound-sales` | 10 impressions, 0 clicks, position 4.4 | Updated title, description, Article headline and modified date |
| 1 | b2b outbound sales | same page | 17 impressions, 0 clicks, position 6.41 | Keep the guide as the main informational result and keep linking to it from outbound service pages |
| 2 | lead generation companies in mumbai | `/` and `/b2b-lead-generation-mumbai` | 55 impressions across pages, 1 click | Do not force one page yet. The homepage owns broad agency intent, the Mumbai page owns local intent. Improve internal links and compare next window |
| 2 | lead generation agency in mumbai | `/b2b-lead-generation-mumbai` | 11 impressions, 1 click, position 5.27 | Healthy early signal. Monitor, do not rewrite |
| 2 | gtm | `/` | 331 impressions, 0 clicks, position 4.37 | Ambiguous single word. Do not optimise the homepage for it. Use the GTM Strategy service page for qualified intent |
| 2 | ai agency | `/` | 32 impressions, 0 clicks, position 6.13 | Ambiguous and broad. No keyword stuffing. Clarify AI lead generation on its own service page |

**Cannibalisation findings.** The biggest apparent collisions are brand searches, not keyword failures: "myntmore" is spread over 31 URLs and "myntmore company" over 13, with the homepage getting the clicks. That is normal brand behaviour and does not justify hiding supporting pages. Local searches show some homepage and city-page overlap, mainly Mumbai. City pages keep their location-specific copy while the homepage stays the broad brand destination.

**Indexing checks.** URL Inspection returned PASS, "Submitted and indexed" and INDEXING_ALLOWED for the homepage, about page, Pune and Chennai city pages, the outbound-sales guide, two comparison and template blogs, two service pages, tools and case studies. The two registered sitemaps reported zero errors and zero warnings.

**Next measurement window.** After Google has a new settled 28-day window, compare: click rate and position for the updated outbound-sales guide; Pune impressions and clicks for the comparison phrase; Chennai city-page click rate for service-intent variants; and whether the Mumbai homepage and city-page overlap is giving useful clicks or only duplicate impressions. The Search Console opportunity score is not guaranteed traffic: confirm the query, landing page, intent and conversion path before a larger rewrite. These follow-up comparisons were not re-run for this appendix.

---

### C.8 LinkedIn distribution drafts (week of 9 to 16 Oct 2026)

**Rule (checklist W10):** post every new page on LinkedIn within 48 hours. Every link carries UTM tags: `utm_source=linkedin&utm_medium=social&utm_campaign=<slug>`. The pass rule is "100% of pages published last week have a logged LinkedIn post". With 70 case studies that is not realistic in one week, so Post 5 announces the library and the spotlight series gives one case per industry over the following ten weeks. Log each post's URL beside its page once live. Every figure comes from the page it links to. If you change a figure in the copy, change it on the page too.

**Status:** these were written as drafts and marked "nothing posted". Whether each was published was not verified.

| Page | Shipped | Draft |
| --- | --- | --- |
| `/resources/guides/58-meetings-600-linkedin-connections` | 13 Oct 2026 | Post 1 |
| `/blog/ai-vs-traditional-lead-generation` | 14 Oct 2026 | Post 2 |
| `/blog/linkedin-outreach-agency-vs-manual-prospecting` | 14 Oct 2026 | Post 3 |
| `/blog/personal-branding-agency-vs-content-freelancer` | 14 Oct 2026 | Post 4 |
| `/case-studies` (70 case studies, 50 new, 10 industries) | 15 Oct 2026 | Post 5 and the spotlight series |
| `/careers/sales-and-growth-intern` | 15 Oct 2026 | Post 6 |
| `/editorial-policy` | 14 Oct 2026 | none (a trust page, not something to post) |
| Rebuilt LinkedIn service page, cold email page, service-page answer blocks | 13 to 15 Oct 2026 | none (existing pages, nothing new to announce) |

(Blog links in the drafts use the old `/blog/` address, which redirects to `/resources/blogs/`. Use the new address when posting.)

**Post 1: the 58 meetings guide**

> We wrote down the exact LinkedIn process behind 58 meetings from 600 connections in a month.
>
> It is five steps, and most of the work happens before the first message:
> 1. ICP: who exactly, and why now
> 2. Positioning that opens doors
> 3. A warm-up layer before any outreach
> 4. A five-message sequence: connection note, insight drop, credibility layer, system snapshot, soft CTA
> 5. A follow-up stack, which is where the guide says most deals convert
>
> The guide has the sequence and the follow-up stack in full.
>
> https://www.myntmore.com/resources/guides/58-meetings-600-linkedin-connections?utm_source=linkedin&utm_medium=social&utm_campaign=58-meetings-guide

**Post 2: AI vs traditional lead generation**

> "Should we use AI for lead generation?" is the wrong question. The useful one is: which parts of the job does it do better, and which parts does it quietly make worse?
>
> We compared the two on research, speed, personalisation and quality control, and on where each one fits.
>
> Short version: AI is faster and more consistent at scale, but it needs a sharp ICP and a person checking its output.
>
> https://www.myntmore.com/blog/ai-vs-traditional-lead-generation?utm_source=linkedin&utm_medium=social&utm_campaign=ai-vs-traditional-lead-generation

**Post 3: LinkedIn outreach agency vs manual prospecting**

> Doing LinkedIn prospecting yourself works, until it is the thing you skip in a busy week.
>
> We wrote up when each makes sense, looking at time, consistency, account risk and control. Our view: prospect manually while you are still learning who buys and which message earns a reply, and hand it over once the approach works and your time is the limit. The mistake is outsourcing the experiments.
>
> https://www.myntmore.com/blog/linkedin-outreach-agency-vs-manual-prospecting?utm_source=linkedin&utm_medium=social&utm_campaign=linkedin-agency-vs-manual-prospecting

**Post 4: personal branding agency vs content freelancer**

> A founder's LinkedIn presence is often the first thing a prospect checks. So who should run it?
>
> A freelancer who writes well, or an agency that also does the positioning work, publishing, engagement tracking and the link to your outbound? The difference is mostly scope and accountability, not how well either writes. We laid out how to decide.
>
> https://www.myntmore.com/blog/personal-branding-agency-vs-content-freelancer?utm_source=linkedin&utm_medium=social&utm_campaign=personal-branding-agency-vs-freelancer

**Post 5: the case study library**

> We have added 50 more case studies, so there are now 70 on the site, across 10 industries: pharma, SaaS, professional services, eCommerce tech, B2B founders, agencies and IT, financial services, insurance, manufacturers and exporters, and recruitment and staffing.
>
> Client names are withheld because of confidentiality, so each one is described by industry and market. They are not all big numbers. One executive search firm came away with 4 active mandates from 19 business conversations. A nutraceutical manufacturer got 22 qualified meetings in 90 days. The point of reading several is to see what a realistic result looks like in your industry.
>
> You can filter them by industry here:
> https://www.myntmore.com/case-studies?utm_source=linkedin&utm_medium=social&utm_campaign=case-study-library

Check before posting: both example figures come from `/case-studies/recruitment-staffing-executive-search-mandates` and `/case-studies/pharma-nutraceutical-partnerships`. (Checked 11 Nov 2026: the 22-meetings and 4-mandates titles match those pages. The "19 conversations" figure also matches the case study.)

**Post 6: hiring, Sales and Growth Intern**

> We are hiring a Sales and Growth Intern in Mumbai (Worli). It is a full-time internship, Rs 10-20K a month plus incentives.
>
> You will prospect, learn the CRM and work toward closing deals, with the founders close by. If you want to learn B2B sales by doing it rather than watching it, send an application to founder@myntmore.com and growth@myntmore.com.
>
> https://www.myntmore.com/careers/sales-and-growth-intern?utm_source=linkedin&utm_medium=social&utm_campaign=sales-and-growth-intern

(The stipend, Rs 10,000 to 20,000 a month plus incentives, matches the careers page. Check the role is still open before posting.)

**Spotlight series: one case study per industry, one a week**

Each post: lead with the result in the title, say what the situation was in one or two lines from the case study's "Where they started" section, give one thing that was done differently, link to the page. Do not add numbers that are not on the page. UTM pattern for each link: `?utm_source=linkedin&utm_medium=social&utm_campaign=<case-study-slug>`.

| Industry | Case study title | Page |
| --- | --- | --- |
| Pharma | 22 Qualified Meetings in 90 Days for a Nutraceutical Manufacturer | `/case-studies/pharma-nutraceutical-partnerships` |
| SaaS | 31 Enterprise Sales Meetings for a Workflow Automation SaaS | `/case-studies/saas-workflow-automation-enterprise` |
| Professional Services | Turning Expertise Into 16 Qualified Conversations for a Consulting Firm | `/case-studies/professional-services-consulting-conversations` |
| eCommerce Tech | 27 Product Demos for a Shopify App Company | `/case-studies/ecommerce-tech-shopify-app-demos` |
| B2B Founder | Building a 30+ Meetings-per-Month Pipeline for a B2B Founder | `/case-studies/b2b-founder-services-meetings-pipeline` |
| Agencies and IT | 3 New Retainers for a Web Development Agency | `/case-studies/agencies-it-web-development-retainers` |
| Financial Services | 11 High-Value Discovery Meetings for a Wealth Management Firm | `/case-studies/financial-services-wealth-management-discovery` |
| Insurance | 21 Meetings for a Corporate Insurance Brokerage | `/case-studies/insurance-corporate-brokerage-meetings` |
| Manufacturers and Exporters | 18 International Buyer Conversations for an Industrial Manufacturer | `/case-studies/manufacturers-exporters-industrial-buyer-conversations` |
| Recruitment and Staffing | 4 Recruitment Mandates for an Executive Search Firm | `/case-studies/recruitment-staffing-executive-search-mandates` |


---

## Appendix D: Audits, incidents and run history

This appendix holds the detail behind four things: the 16 Oct design audit, the 26 Oct Search Console baseline, the wrong-canonical incident, and the log of every weekly and bi-weekly SEO run. Where a later run replaced an earlier number, the later number is the one to use and the table says so.

Words used below:

- **GSC:** Google Search Console, Google's free tool that shows how the site appears in Google search.
- **Canonical:** the one address Google treats as the "real" version of a page.
- **Coverage state:** the label GSC gives each URL, such as "Submitted and indexed" or "Discovered, currently not indexed".
- **WCAG AA:** the standard for readable text contrast (text must be dark enough against its background).

---

### D.1 Design uniformity audit (16 Oct 2026)

**How it was measured.** 248 pages were loaded in a headless Chrome browser at 1440 px width against a local production build of master (commit `2f87d10`). The 248 are the 243 sitemap pages plus five extras: `/thank-you`, `/thankyou`, `/feedback`, `/jahnvijhaveri` and a 404 page. Each page was scrolled so animations ran. Every visible piece of text was measured for font, size, weight, text colour and the colour of what sits behind it. The source (451 files under `app/`, `components/`, `lib/`) was scanned for every hex colour, Tailwind colour class and font setting. Nothing was changed by the audit itself.

**Not measured:** mobile width, hover and focus states, text on photos or gradients (5.5% of text, contrast cannot be known), text inside the Calendly booking frame, text drawn inside SVG images, and the share image.

**Verdict:** fonts are very uniform. The core colour palette is uniform. The drift is in the greys, in four template-level exceptions, and in one real contrast defect in the shared case study template.

#### Fonts

| Finding | Evidence | Verdict |
| --- | --- | --- |
| One body font | Inter on 97.9% of all text, on all 248 pages. Self-hosted. No page falls back to a browser default (no Times, Arial or other odd font) | Consistent |
| Headings | Every heading on every page is Inter weight 900, except the homepage hero (two-tone) | Consistent |
| Fredoka for small uppercase labels | On 97 pages: all 32 blog posts, all 51 glossary entries, all 13 guides, plus the blogs hub. On none of the other 150 pages (services, case studies, landing pages and careers use Inter labels). It is 0.9% of text. Added on purpose in commit `6ba4ba8` | Deliberate, but a visible switch when you go from a blog post to a case study. Owner decision |
| Caveat handwriting | 3 pages (home, `/services/do-it-yourself`, one guide), 7 short runs such as "12K+ meetings" and "Respectfully, Teejay" | Fine, deliberate accent |
| Code blocks | 9 pages (8 guides and `/myntmore-framework`) use the system monospace font (`ui-monospace`), 1.2% of text. It is not a loaded font, so it looks different on Mac, Windows and Android | Minor |
| Main heading (H1) size by template | 48 px (blog posts, glossary, job postings, 4 guides, 5 case studies). 60 px (hubs, 81 case studies, 8 guides, tools). 72 px (landing pages, 6 service pages, 1 guide). 83 and 69 px (cold email and LinkedIn service pages). 96 px (home) | Size follows the template. Guides (60/48/72) and case studies (60 vs 5 at 48) are mixed inside one template |

#### Colours that are consistent

- Six colours carry 90% of all text: `#52525B` (40%), `#6B6B6B` (17%), `#0A0A0A` (12.5%), `#71675E` (10%), `#3D3D3D` (8%) and white (1.4%). The 17% for `#6B6B6B` was before the fix below.
- The page canvas is `#FFFFFF` on all 248 pages. Surfaces behind text: white 52%, `#F8F6F2` 31%, cream `#FEF9EC` 4%, dark `#0A0A0A` 2%.
- The main call-to-action button (the `btn-dark` pill with near-black bold text) has the same style on 246 pages: 14 px in the nav, 16 px in page sections.
- 98.7% of text on a flat background meets WCAG AA, apart from the case study defect (finding 8).

#### Colours that are not consistent (eight findings)

| # | Finding | Detail and numbers |
| --- | --- | --- |
| 1 | Five different "secondary text" greys | Body paragraphs are `#52525B` (cool grey) almost everywhere. Small muted text is `#71675E` (warm grey, the documented muted token). In between sit `#6B6B6B`, `#3D3D3D` and, for breadcrumb links, `#5F564E`. 177 of 248 pages show four of these at once. The biggest single source is the footer: 82% of all `#6B6B6B` text is footer links, and the footer is on every page, so it is 17% of all text on the site. Page background and borders are warm (`#F8F6F2`, `#E8E2D9`) while body text `#52525B` is cool, which is why the greys feel slightly off. `#71675E` has slightly better contrast than `#6B6B6B` (5.5:1 vs 5.3:1 on white, 5.1 vs 4.9 on `#F8F6F2`), so merging them is safe |
| 2 | Body paragraph colour differs by section | `#52525B` on 91% of blog paragraphs, 97% on the case studies hub, 99% on landing pages. But only 42% in guides (33% are `#3D3D3D`), 60% in the glossary (24% are `#0A0A0A`) and 74% on tools (`#606060`) |
| 3 | The tools pages are a separate colour system | Documented in `app/globals.css` and kept on purpose so the ported tools keep their exact look. All 9 tool pages use pure black headings `#000000` (site: `#0A0A0A`), muted grey `#606060` (site: `#71675E`) and a yellow `#FFC547` or `#FFC947` (site: `#F5B731`, about 28 to 30 apart in RGB) |
| 4 | Four near-blacks | `#0A0A0A` is the standard (159 files). `#0F0F14` heads the rebuilt cold email and LinkedIn service pages (6 files). `#1A1A1A` and `#1A1A2E` appear in dark sections (17 and 13 files). `#000000` comes from the tools |
| 5 | Two golds plus amber | Brand gold `#F5B731` (81 files). Tools yellow `#FFC947` or `#FFC547` (6 files plus CSS variables). Amber `#D97706` (44 files) and `#F59E0B` (6). Text-safe `#A14A08` (119) |
| 6 | Strays | Homepage: `#6B7280` (Tailwind gray-500) on three text blocks and `#3A3A3A` for the second hero line. `/resources/guides/dos-and-donts-of-outreach`: `#6B6560` and `#6B655E`. About 15 near-white tints (`#FCFBF8`, `#FDFDFD`, `#FFFDF9`, `#FCFCFC`, `#FDFCFB` and others) on 8 to 15 pages each, next to the standard `#FFFFFF`, `#F8F6F2` and `#FEF9EC`. There are 336 distinct background colours behind text in total, but most are the intended per-industry accent tints on case studies |
| 7 | Colours are typed by hand about 6,400 times | 294 distinct hex values in the source, 128 of them used once. About 4,900 inline style objects carry hex colours, plus 929 Tailwind palette-class uses (including `gray-400/500/600/700`, 116 uses in 21 files, a cool grey scale from yet another family) and 157 arbitrary-value hex classes. There are no named tokens for the core palette; `lib/colors.ts` only covers accent text shades. This is why the drift exists and will keep coming back |
| 8 | Contrast defect in the shared case study template (the only real accessibility failure) | `components/case-studies/CaseStudyLayout.tsx` set text colour to the raw accent in six places: the tag pill, the four numbered step labels, "Myntmore's role", and the metric values. The house convention in `lib/colors.ts` is to pass accents through `textTone()` for text on light surfaces. Because it did not, all 70 pages built on the template (and `/case-studies/uk-pharma-qualified-meetings`, which has its own copy of the problem) had text below WCAG AA. Examples on white: green `#10B981` at 2.5:1, sky `#0EA5E9` at 2.8:1, orange `#F97316` at 2.8:1. Everything else that fails is not a real problem: screen-reader-only labels and the decorative "/" in breadcrumbs |

#### The ranked fix list, with status

| # | Fix | Size | Effect | Status |
| --- | --- | --- | --- | --- |
| 1 | Route the six accent text colours in `CaseStudyLayout.tsx` through `textTone()` | 1 file, 6 lines | Fixes the 70 template pages. The accent look stays; text gets the darker shade of the same hue | **DONE 16 Oct** |
| 2 | Replace `#6B6B6B` with `#71675E` (footer, hero, services blocks and about 15 other files) | Mechanical, 19 files | Removes the biggest grey split; footer matches the rest of the site | **DONE 16 Oct** |
| 3 | Add named tokens (ink, body, muted, border, surface, gold, gold-text) to `lib/colors.ts` and use them in the shared components first (Footer, Navbar, Breadcrumbs, layout templates) | Medium | Stops further drift | Open |
| 4 | Decide the guides and glossary paragraph colour (`#3D3D3D` / `#0A0A0A` vs `#52525B`) and make it one value | Small, needs an owner call | Same reading colour across hubs | Open (decision) |
| 5 | Change the heads of the cold email and LinkedIn service pages from `#0F0F14` to `#0A0A0A` | 2 files | Removes the fourth near-black | Open |
| 6 | Move the homepage and dos-and-donts strays to the standard greys | 2 files | Removes one-offs | Open |
| 7 | Decide the tools exception (keep as documented, or move to the site palette) | Needs an owner call | Either way, write the decision down | Open (decision) |
| 8 | Decide Fredoka labels (content hub only, sitewide, or drop) | Needs an owner call | Label typography either consistent or consciously split | Open (decision) |
| 9 | Optional: self-host one monospace font for code blocks | Small | Identical code blocks on every device | Open (optional) |

Items 1, 2, 5 and 6 are safe, mechanical and nearly invisible apart from the contrast fix in 1. Items 4, 7 and 8 are design decisions. The audit offered to turn its measuring script into a repeatable `npm run audit:design`; that was not built.

#### Re-measure after fixes 1 and 2 (same day, all 248 pages, fresh production build)

| Measure | Before | After |
| --- | --- | --- |
| Pages with visible text below WCAG AA | 51 | 4 |
| `/case-studies/uk-pharma-qualified-meetings` | failing | clean |
| `#6B6B6B` in the source | 48 uses in 19 files | gone (all became `#71675E`) |
| Share of text in `#71675E` | 10.4% | 27.8% |
| Pages showing four competing greys | 227 | 1 |

Nearly all pages now show three greys: `#52525B` (body), `#71675E` (muted), `#3D3D3D` (nav and headings). Contrast is the same or better.

**Still failing contrast (none are part of the template fix):**

- `/services/do-it-yourself`: the purple handwriting note "no hand-holding", 3.7:1.
- The 404 page: two labels, 2.9:1 and 4.0:1.
- The required-field asterisks on two tool pages: `#FFC547` on white, 1.6:1.

---

### D.2 Search Console baseline (26 Oct 2026)

This is the "before" picture for the SEO changes shipped on 26 Oct 2026. Compare against it 3 to 4 weeks later (around 16–23 Nov) to see what moved. A weekly scheduled check reports changes against it.

| Item | Value |
| --- | --- |
| Property used for this baseline | `https://www.myntmore.com/` (URL-prefix). The `https://myntmore.com/` property also exists and shows Mumbai searches landing on the non-www homepage, most likely from the Google Business Profile link. Later runs use the domain property `sc-domain:myntmore.com`, which covers everything |
| Window | 20 Sep to 23 Oct 2026. GSC has no data before 20 Sep, so this is about five weeks, not 90 days |
| Totals | 268 clicks, 7,345 impressions |
| Devices | Desktop 4,739 impressions (average position 16.2). Mobile 2,556 (10.8) |
| Countries | India 5,889 impressions. US 646 (position 20). UK 135 |
| Brand share | "myntmore", "myntmore company" and "tejas jhaveri" account for 133 of the clicks |
| Daily impressions | About 110 a day in late September, about 350 a day by 20–23 Oct |

#### Pages changed on 26 Oct, with their "before" numbers

| Page | Clicks | Impressions | Avg position | What changed |
| --- | --- | --- | --- | --- |
| `/about-us` | 17 | 646 | 4.0 | Title now leads with Myntmore |
| `/b2b-lead-generation-pune` | 14 | 615 | 16.5 | New title, sectors, steps, case studies, FAQ |
| `/b2b-lead-generation-chennai` | 11 | 688 | 7.4 | New title and description |
| `/b2b-lead-generation-hyderabad` | 7 | 352 | 11.9 | New title, sectors, steps, case studies, FAQs |
| `/b2b-lead-generation-mumbai` | 5 | 558 | 14.7 | New title; long-tail sections, case studies, FAQ |
| `/b2b-lead-generation-kolkata` | 2 | 537 | 24.1 | B2B healthcare section, steps, patient-leads FAQ |
| `/b2b-lead-generation-bengaluru` | 0 | 348 | 46.1 | Targets "Bangalore"; sectors, steps, FAQs |
| `/blog/handling-cold-email-replies` | 1 | 805 | 8.3 | Retargeted at "cold reply meaning" |
| `/blog/what-is-b2b-outbound-sales` | 0 | 205 | 12.3 | New title; outbound sales vs marketing section; FAQs |
| `/blog/cold-email-sequence-templates` | 0 | 38 | 17.8 | New title, worked example, aligned send days, FAQ |
| `/blog/outbound-funnel-math-not-guesswork` | 0 | 28 | 6.3 | New title and description |
| `/blog/pitching-trap-competitor-positioning` | 0 | 13 | 6.5 | New title and description |
| `/blog/icp-mapping-b2b` | 0 | 9 | 6.7 | New title and description |
| `/blog/linkedin-outreach-sequences` | 0 | 8 | 5.9 | New title and description |
| `/resources/guides/how-to-choose-b2b-lead-generation-agency-india` | n/a | n/a | n/a | New page |

Glossary entries given FAQs (and, for inbound vs outbound, a comparison table): inbound vs outbound, SDR, outbound sales, sales outreach, hot lead, buyer engagement, buying signal, CAN-SPAM Act.

Note: all blog posts later moved from `/blog/<slug>` to `/resources/blogs/<slug>` on 28 Oct (old addresses redirect with a 308). The `/blog/` paths above are the addresses at the time of the baseline.

#### Searches to watch

| Search | Landing page | Impressions | Avg position |
| --- | --- | --- | --- |
| cold reply meaning | cold email replies post | 447 | 9.1 |
| patient lead generation services in kolkata | Kolkata | 106 | 32.8 |
| healthcare lead generation services in kolkata | Kolkata | 98 | 37.9 |
| b2b lead generation companies in pune | Pune | 95 | 13.9 |
| lead generation company in hyderabad | Hyderabad | 57 | 19.4 |
| lead generation company in chennai | Chennai | 56 | 6.2 |
| sales lead generation companies in bangalore | Bengaluru | 56 | 61.8 |
| b2b lead generation companies in mumbai | Mumbai | 46 | 33.3 |
| inbound vs outbound | inbound vs outbound glossary | 36 | 11.4 |
| inbound and outbound meaning | inbound vs outbound glossary | 27 | 40.4 |
| b2b outbound sales | what is B2B outbound sales | 21 | 7.0 |
| b2b outbound marketing | what is B2B outbound sales | 18 | 37.8 |
| sdr meaning sales | SDR glossary | 13 | 75 |

#### How to read the comparison

- Give changes 3 to 4 weeks before judging. Google re-crawls and re-tests titles gradually.
- Judge title changes on click-through rate at a similar position. Judge content changes on position.
- Average position can fall while traffic rises, because the site starts showing for broader searches. Look at clicks and at the specific searches above, not the site-wide average.

---

### D.3 The wrong-canonical incident

**In one sentence:** Google's records say some Myntmore pages are copies of other websites' homepages (betting and cinema sites), even though our live pages are correct. The cause has never been found. The only known remedy is a person asking Google to re-crawl each page in Search Console.

#### Timeline

| Date | What was found or done |
| --- | --- |
| 7 Oct | First baseline: 12 pages with a wrong or missing canonical in Google's record, 8 of them confirmed to point at another domain |
| 16 Oct (Fri) | Every one of the 243 sitemap URLs inspected (232 got the full per-URL check, including every non-indexed URL, `/`, `/services` and the eight city pages). **19 pages** show "Duplicate without user-selected canonical" with Google's chosen canonical on another domain: 17 on `https://www.747live.bet/` and 2 on `https://winzir.ph/`. Google recorded no user-declared canonical on any of them. `/` is fine (its own URL, crawled 15 Oct, only a trailing-slash difference). `/services`, the main service hub, points to `747live.bet` and was last crawled 27 Jul 2026, almost three months earlier |
| 19 Oct (Mon) | Re-checked with a deeper inspection. Still 19 pages, all with no user canonical, but the foreign targets now read differently: **16 to `747live.bet`, 2 to `https://www.marcustheatres.com/`** (`/services/gtm-strategy`, `/case-studies/founder-personal-brand-linkedin`) and **1 to `https://www.747ph.live/`** (`/blog/ecommerce-conversion-playbook`). Marcus Theatres and 747ph were new domains in the picture. The two glossary pages that were on `winzir.ph` on 16 Oct read as `747live.bet` in this run. `/` and all 8 city pages are fine (each its own canonical) |
| 20 Oct | Code change shipped: a `Link` canonical HTTP header was added to every page, on top of the existing canonical tag in the HTML (see "What was changed in the code" below). A request-indexing list was prepared (D.4) |
| 26 Oct | Baseline for later comparison saved (D.2) |
| 27 Oct | Re-inspection: **18 URLs** still "Duplicate without user-selected canonical". `/careers/gtm-strategist` is now "Submitted and indexed" and was dropped from the list. Only the coverage state and last-crawl date were re-confirmed, not the foreign target. Most of these URLs were last crawled before the 20 Oct header change, so Google may still be showing an old decision |
| 30 Oct | Full inspection of 265 URLs: **14 URLs** with a foreign canonical (down from 19) plus 1 more with "Duplicate, Google chose different canonical". Targets: **10 to `747live.bet`** (`/services`, 7 case studies, 2 careers pages), **2 to `marcustheatres.com`** (`/services/gtm-strategy`, one case study), **2 to `winzir.ph`** (two glossary terms). GSC reports no user-declared canonical for 13 of the 14. (The agent's own summary first said 9, then 10, for `747live.bet`; the recount from the data is 10.) Also: one blog post still has its old `/blog/` path as Google's canonical after the 28 Oct move |
| 5–6 Nov | Weekly run: `/services` is **still** "Duplicate without user-selected canonical", last crawled 27 Jul 2026 (unchanged since 16 Oct). **18 of the 19** original pages are still in this state; only `/careers/gtm-strategist` cleared. The batch tool reports coverage only, so the foreign targets were not re-read. `/careers/lead-gen-intern` (published 5 Nov) is "unknown to Google" and should be added to the request list |

**Which count to trust:** the counts differ between runs because they measure different things. The 30 Oct count of 14 counts only URLs with a confirmed foreign canonical. The 27 Oct and 6 Nov counts of 18 count the "Duplicate without user-selected canonical" coverage state. Treat "18 of 19 still affected" as the latest state of the original list.

#### The 19 original affected URLs (as found 16 Oct)

17 pointed to `747live.bet`:

- `/services`
- `/services/gtm-strategy`
- `/careers/gtm-strategist`
- `/careers/content-marketing-strategist-intern`
- `/careers/systems-ai-automation-intern`
- `/blog/ecommerce-conversion-playbook`
- `/blog/linkedin-profile-inbound-lead-machine`
- `/blog/agency-vs-in-house`
- `/blog/personal-branding-agency-vs-content-freelancer`
- Eight case studies: `founder-personal-brand-linkedin`, `b2b-founder-tech-decision-makers`, `agencies-it-branding-agency-meetings`, `financial-services-wealth-management-discovery`, `financial-services-corporate-finance-meetings`, `insurance-insurtech-product-demos`, `insurance-health-advisory-consultations`, `manufacturers-exporters-engineering-goods-replies`

2 pointed to `winzir.ph`: `/resources/glossary/founder-led-sales` and `/resources/glossary/existing-connection-nurturing`.

Google's canonical on 19 Oct, per URL, is in the request-indexing tables in D.4.

#### What was ruled out

| Suspect | Finding |
| --- | --- |
| Our pages are wrong | No. Fetched as Googlebot-smartphone, all 19 return status 200, `index, follow`, and a canonical tag pointing at themselves |
| The canonical tag is new | No. The tag has been on `/services` since 29 May 2026 and on the careers pages since July |
| The foreign sites copied our content | No. Both `747live.bet` and `winzir.ph` are real betting sites. Neither mentions Myntmore anywhere on its homepage |
| Something in our code points to those domains | No. Nothing in the repo mentions either domain. There is no middleware and no `vercel.json`. `next.config.js` only rewrites the DM angle generator to an external app |
| A firewall is blocking or challenging Googlebot | No. The Vercel project has no firewall configuration at all (the API says none exists) |
| It is only stale data | Not fully. Eight of the 19 were crawled on 15 Oct and still showed no declared canonical, so this is not only old crawls. Crawls before 20 Oct are still the most likely explanation for the rest |

#### What was changed in the code

- A canonical `Link` HTTP header was added to every page (shipped 20 Oct), in addition to the `<link rel="canonical">` tag in the HTML. The point is to give Google the declared canonical in a second place. Whether this has helped is not yet known, because the affected URLs have mostly not been re-crawled.
- Nothing else in the site code was changed for this problem, because the live pages were already correct.

#### What is still unknown

- **Why Google recorded no user-declared canonical** on pages whose HTML declares one.
- **Why the foreign targets are the ones they are** (betting and cinema sites) and why they shifted between 16 and 19 Oct.
- **Whether the header change works.** It needs fresh crawls to judge.
- **What Google actually fetched** on the affected crawls. Vercel's logs cover functions only, not static page requests, so Googlebot's status codes cannot be read there.
- Smaller side issue, from August crawls and probably old pre-www canonicals: 9 indexed pages declare a bare-domain (`https://myntmore.com/...`) canonical where Google chose the www URL. They are `/resources/tools`, three `/tools/*` pages, four blog posts and `/careers/hr-operations-intern`.

#### What the owner must do

Only a person signed in to Search Console can do these. The tools used by the assistant cannot.

1. **Step 0, once.** Run **Test Live URL** on `https://www.myntmore.com/services` and open **View Tested Page**. Check the HTML and screenshot. If it is our page, carry on. **If it is not our page, stop: treat it as a security incident** (check site access and DNS) before requesting anything.
2. Work through the request-indexing batches in D.4, about 10 a day.
3. 3 to 7 days after each batch, re-inspect each URL. Look for "Submitted and indexed" and a newer last-crawled date.
4. If a URL still shows a foreign canonical **after a fresh crawl**, report it, so what Google fetched can be investigated.
5. Add `/careers/lead-gen-intern` to the list.
6. Open Search Console Manual actions and Security issues and confirm both read "No issues" (this was never confirmed by a person in any run below). The two addresses are `https://search.google.com/search-console/manual-actions?resource_id=sc-domain%3Amyntmore.com` and `https://search.google.com/search-console/security-issues?resource_id=sc-domain%3Amyntmore.com`.

---

### D.4 Request Indexing: procedure and every URL

Request Indexing is manual in the Search Console screen and Google allows about 10 to 12 a day per property, so the URLs are split into daily batches. The API cannot do it.

#### Step 0: once, before submitting anything

1. Open Search Console and use the URL Inspection bar for property `https://www.myntmore.com/`.
2. Paste `https://www.myntmore.com/services`.
3. Click **Test Live URL**, then **View Tested Page**.
4. On the **Screenshot** tab, check the page shows Myntmore content and layout.
5. On the **HTML** tab, check `<link rel="canonical" href="https://www.myntmore.com/...">` points to the exact same page.
6. On the **HTTP Response** tab, check the status is 200.
7. If it is our page, continue to Step 1. If it shows foreign content or an error, stop and treat it as a DNS or security problem.

#### Step 1: for each URL

1. Paste the URL into the URL Inspection bar.
2. Click **Test Live URL**.
3. Check the tested page shows the "User-declared canonical" as the page itself, status 200.
4. Click **Request Indexing**.
5. Tick the box below.

#### Step 2: follow up

Wait 3 to 7 days after each batch. Re-inspect each URL and look for "Submitted and indexed" and a newer last-crawled date.

**A note on blog addresses.** All blog posts moved from `/blog/<slug>` to `/resources/blogs/<slug>` on 28 Oct. The lists below keep the addresses they were written with. If a `/blog/` address redirects, inspect and request the matching `/resources/blogs/` address instead.

#### List A: the current list (prepared 27 Oct, 18 URLs, two days)

Order inside Day 1: highest value first, oldest crawls first within each group. The date shown is the last time Google crawled the page. The last column is Google's canonical as read on 19 Oct.

**Day 1 (10 URLs)**

| Done | # | URL | Last crawled | Google's canonical (19 Oct) |
| --- | --- | --- | --- | --- |
| [ ] | 1 | https://www.myntmore.com/services | 2026-07-27 | 747live.bet |
| [ ] | 2 | https://www.myntmore.com/services/gtm-strategy | 2026-08-30 | marcustheatres.com |
| [ ] | 3 | https://www.myntmore.com/case-studies/founder-personal-brand-linkedin | 2026-08-26 | marcustheatres.com |
| [ ] | 4 | https://www.myntmore.com/blog/agency-vs-in-house | 2026-08-15 | 747live.bet |
| [ ] | 5 | https://www.myntmore.com/blog/ecommerce-conversion-playbook | 2026-09-22 | 747ph.live |
| [ ] | 6 | https://www.myntmore.com/blog/linkedin-profile-inbound-lead-machine | 2026-08-14 | 747live.bet |
| [ ] | 7 | https://www.myntmore.com/blog/personal-branding-agency-vs-content-freelancer | 2026-10-15 | 747live.bet |
| [ ] | 8 | https://www.myntmore.com/case-studies/b2b-founder-tech-decision-makers | 2026-10-15 | 747live.bet |
| [ ] | 9 | https://www.myntmore.com/case-studies/agencies-it-branding-agency-meetings | 2026-10-15 | 747live.bet |
| [ ] | 10 | https://www.myntmore.com/case-studies/financial-services-wealth-management-discovery | 2026-10-15 | 747live.bet |

**Day 2 (8 URLs, room for two more)**

| Done | # | URL | Last crawled | Google's canonical (19 Oct) |
| --- | --- | --- | --- | --- |
| [ ] | 11 | https://www.myntmore.com/case-studies/financial-services-corporate-finance-meetings | 2026-10-15 | 747live.bet |
| [ ] | 12 | https://www.myntmore.com/case-studies/insurance-insurtech-product-demos | 2026-10-15 | 747live.bet |
| [ ] | 13 | https://www.myntmore.com/case-studies/insurance-health-advisory-consultations | 2026-10-15 | 747live.bet |
| [ ] | 14 | https://www.myntmore.com/case-studies/manufacturers-exporters-engineering-goods-replies | 2026-10-15 | 747live.bet |
| [ ] | 15 | https://www.myntmore.com/resources/glossary/founder-led-sales | 2026-09-25 | 747live.bet |
| [ ] | 16 | https://www.myntmore.com/resources/glossary/existing-connection-nurturing | 2026-09-25 | 747live.bet |
| [ ] | 17 | https://www.myntmore.com/careers/content-marketing-strategist-intern | 2026-09-19 | 747live.bet |
| [ ] | 18 | https://www.myntmore.com/careers/systems-ai-automation-intern | 2026-10-05 | 747live.bet |

Use the two spare Day 2 slots for the "stale noindex" case studies in List B (Day 2), or for `/careers/lead-gen-intern` (https://www.myntmore.com/careers/lead-gen-intern).

#### List B: the 20 Oct list (4 days, includes new pages and the stale-noindex case studies)

This list covers three kinds of page: money pages Google files under other sites, 9 case studies Google still shows as "Excluded by noindex" (the live pages are `index, follow`; Google's record is from crawls on 10–11 Oct), and new pages that are "Discovered, currently not indexed".

**Day 1: money pages, the pages Google holds as copies of other sites, and the two newest pages**

- [ ] https://www.myntmore.com/services
- [ ] https://www.myntmore.com/services/gtm-strategy
- [ ] https://www.myntmore.com/blog/agency-vs-in-house
- [ ] https://www.myntmore.com/blog/ecommerce-conversion-playbook
- [ ] https://www.myntmore.com/blog/linkedin-profile-inbound-lead-machine
- [ ] https://www.myntmore.com/blog/personal-branding-agency-vs-content-freelancer
- [ ] https://www.myntmore.com/case-studies/founder-personal-brand-linkedin
- [ ] https://www.myntmore.com/tools/linkedin-hook-grader
- [ ] https://www.myntmore.com/blog/how-to-write-a-linkedin-hook
- [ ] https://www.myntmore.com/tools/cold-email-roi-calculator

**Day 2: the 9 stale-noindex case studies plus one new post**

- [ ] https://www.myntmore.com/case-studies/agencies-it-usa-conversion-optimization
- [ ] https://www.myntmore.com/case-studies/agencies-it-usa-software-development
- [ ] https://www.myntmore.com/case-studies/financial-services-uk-bookkeeping
- [ ] https://www.myntmore.com/case-studies/insurance-singapore-commercial-coverage
- [ ] https://www.myntmore.com/case-studies/manufacturers-exporters-france-packaging
- [ ] https://www.myntmore.com/case-studies/manufacturers-exporters-germany-industrial-components
- [ ] https://www.myntmore.com/case-studies/manufacturers-exporters-uae-kitchen-equipment
- [ ] https://www.myntmore.com/case-studies/pharma-india-dermatologist-outreach
- [ ] https://www.myntmore.com/case-studies/pharma-usa-api-second-source
- [ ] https://www.myntmore.com/blog/cold-email-follow-up-sequence

**Day 3: remaining pages Google holds as copies of other sites**

- [ ] https://www.myntmore.com/case-studies/b2b-founder-tech-decision-makers
- [ ] https://www.myntmore.com/case-studies/agencies-it-branding-agency-meetings
- [ ] https://www.myntmore.com/case-studies/financial-services-wealth-management-discovery
- [ ] https://www.myntmore.com/case-studies/financial-services-corporate-finance-meetings
- [ ] https://www.myntmore.com/case-studies/insurance-insurtech-product-demos
- [ ] https://www.myntmore.com/case-studies/insurance-health-advisory-consultations
- [ ] https://www.myntmore.com/case-studies/manufacturers-exporters-engineering-goods-replies
- [ ] https://www.myntmore.com/resources/glossary/founder-led-sales
- [ ] https://www.myntmore.com/resources/glossary/existing-connection-nurturing
- [ ] https://www.myntmore.com/careers/gtm-strategist (cleared by 27 Oct, can be skipped)

**Day 4: the rest, plus two posts still "Discovered, not indexed"**

- [ ] https://www.myntmore.com/careers/content-marketing-strategist-intern
- [ ] https://www.myntmore.com/careers/systems-ai-automation-intern
- [ ] https://www.myntmore.com/blog/ai-personalization-cold-outreach
- [ ] https://www.myntmore.com/blog/multi-threading-b2b-buying-committee

#### List C: the priority checklist (three batches, four days)

This list repeats the List A and B groupings in a different order and adds a third batch: high-impact pages that are in the sitemap but not yet crawled.

**Batch 1: urgent, wrong-canonical overwrite (Days 1 and 2).** Google's record for these shows "Duplicate without user-selected canonical" with canonical ownership given to unrelated domains (`747live.bet` or `winzir.ph`), from stale crawls in July to August 2026. In our code all 19 return 200, a self-referencing canonical and `index, follow`.

**Day 1 (core commercial and careers, 10 URLs)**

- [ ] https://www.myntmore.com/services (main commercial hub, previously crawled 27 Jul)
- [ ] https://www.myntmore.com/services/gtm-strategy
- [ ] https://www.myntmore.com/careers/gtm-strategist
- [ ] https://www.myntmore.com/careers/content-marketing-strategist-intern
- [ ] https://www.myntmore.com/careers/systems-ai-automation-intern
- [ ] https://www.myntmore.com/blog/agency-vs-in-house
- [ ] https://www.myntmore.com/blog/ecommerce-conversion-playbook
- [ ] https://www.myntmore.com/blog/linkedin-profile-inbound-lead-machine
- [ ] https://www.myntmore.com/blog/personal-branding-agency-vs-content-freelancer
- [ ] https://www.myntmore.com/case-studies/founder-personal-brand-linkedin

**Day 2 (case studies and glossary, 9 URLs)**

- [ ] https://www.myntmore.com/case-studies/b2b-founder-tech-decision-makers
- [ ] https://www.myntmore.com/case-studies/agencies-it-branding-agency-meetings
- [ ] https://www.myntmore.com/case-studies/financial-services-wealth-management-discovery
- [ ] https://www.myntmore.com/case-studies/financial-services-corporate-finance-meetings
- [ ] https://www.myntmore.com/case-studies/insurance-insurtech-product-demos
- [ ] https://www.myntmore.com/case-studies/insurance-health-advisory-consultations
- [ ] https://www.myntmore.com/case-studies/manufacturers-exporters-engineering-goods-replies
- [ ] https://www.myntmore.com/resources/glossary/founder-led-sales
- [ ] https://www.myntmore.com/resources/glossary/existing-connection-nurturing

**Batch 2: stale "Excluded by noindex" case studies (Day 3).** GSC reports these 9 as excluded by a `noindex` tag from crawls on 10–11 Oct 2026. Every page is now `index, follow` with canonical tags. One live inspection and indexing request clears Google's old record.

**Day 3 (9 case studies)**

- [ ] https://www.myntmore.com/case-studies/agencies-it-usa-conversion-optimization
- [ ] https://www.myntmore.com/case-studies/agencies-it-usa-software-development
- [ ] https://www.myntmore.com/case-studies/financial-services-uk-bookkeeping
- [ ] https://www.myntmore.com/case-studies/insurance-singapore-commercial-coverage
- [ ] https://www.myntmore.com/case-studies/manufacturers-exporters-france-packaging
- [ ] https://www.myntmore.com/case-studies/manufacturers-exporters-germany-industrial-components
- [ ] https://www.myntmore.com/case-studies/manufacturers-exporters-uae-kitchen-equipment
- [ ] https://www.myntmore.com/case-studies/pharma-india-dermatologist-outreach
- [ ] https://www.myntmore.com/case-studies/pharma-usa-api-second-source

**Batch 3: high-impact discovered or unindexed pages (Day 4).** These are in the sitemap but Google has not crawled them yet because of the queue on a growing site. Requesting them speeds up entry into the index.

**Day 4 (10 URLs)**

- [ ] https://www.myntmore.com/case-studies/markets/uae
- [ ] https://www.myntmore.com/case-studies/markets/united-kingdom
- [ ] https://www.myntmore.com/case-studies/markets/singapore
- [ ] https://www.myntmore.com/case-studies/markets/france
- [ ] https://www.myntmore.com/case-studies/markets/germany
- [ ] https://www.myntmore.com/tools/linkedin-hook-grader
- [ ] https://www.myntmore.com/tools/cold-email-roi-calculator
- [ ] https://www.myntmore.com/resources/guides/how-to-choose-b2b-lead-generation-agency-india
- [ ] https://www.myntmore.com/resources/guides/linkedin-content-to-calls-starter-kit
- [ ] https://www.myntmore.com/careers

#### Other pages the 16 Oct run said to request

- `/careers/sales-and-growth-intern` (never crawled at the time).
- A handful of the new case studies.
- `/careers/lead-gen-intern` (added by the 6 Nov run).
- Also a one-click clean-up: Search Console listed **two** submitted sitemaps on 16 Oct (`https://myntmore.com/sitemap.xml` and `https://www.myntmore.com/sitemap.xml`), both valid. The target is one, the www one. On 6 Nov the apex sitemap still showed 268 URLs and the www sitemap 267. Deleting the bare-domain sitemap is a Search Console change that only a person can make.

---

### D.5 Run history

Each row is one run of the recurring SEO routine. "Sitemap" is the number of URLs in `sitemap.xml` on the day. Search Console data lags 2 to 3 days. No run deployed, posted or submitted anything in Search Console, Zoho or any production system, except where stated.

| Date | Run | What was checked | Key numbers | What failed | What was fixed |
| --- | --- | --- | --- | --- | --- |
| 12 Oct (referenced later) | Week 2 scorecard (5–11 Oct), as first logged | KPI scorecard | Leads 2, non-brand clicks 6, impressions 1,215, top-10 queries 151, city pages on page 1: 2 of 8, indexed 118 of 147 (80.3%) | n/a | n/a. Impressions were restated to 1,260 on 16 Oct. The 151 count means strictly under position 10 |
| 16 Oct (Fri) | Weekly W1 to W15, mid-week 3 | All 15 weekly tasks. Sitemap 243 | Site health 100% (243 of 243). Schema 86.8% (211 of 243), up from 78.9%. Indexed 141 of 243 (58.0%); like for like on the 138 URLs in the old 147-URL set 111 of 138 (80.4%), flat vs 80.3%. Clicks 60 vs 59, impressions 2,189 vs 1,859, CTR 2.74% vs 3.17%, position 10.2 vs 12.5. 7 careers roles open, `validThrough` 104 to 180 days out | W4 wrong-canonical: 19 pages (up from 12). W5: not-indexed rose from 29 to 102, explained by 105 new URLs awaiting first crawl (about 75 never crawled), no 5xx, soft 404, robots or redirect errors. W12: events page listed an ended webinar as live. W14: no source data reaches Zoho. Not checked: W3, W6, W9 | `scripts/seo-crawl.py` put into the repo (commit `6f504a1`) and a false failure fixed (it compared the route template `/case-studies/[filter]` to the sitemap). `/events` fixed so ended events show under "Past events and recordings" and the page refreshes hourly (commit `6f504a1`, not pushed at the time) |
| 19 Oct (Mon) | Week 3 (12–18 Oct), tasks A and B | Indexing across 247 sitemap URLs, canonicals, non-brand top-10 queries | Indexed **142 of 247 (57.5%)**; non-indexed 105. Like for like on the old 147 URLs: **120 of 147 (81.6%)**. At end of 12 Oct (167 URLs) 122 indexed (73.1%). Non-indexed split: 19 duplicate, 9 noindex, 43 discovered, 34 unknown to Google. Queries with position under 10: **121** (74 with 2+ impressions); 125 at 10 or under. Top: "cold reply meaning" 220 impressions at 8.9, "gtm" 88 at 4.5, "cold reply" 40 at 6.2, "lead generation agency in mumbai" 33 at 2.8, "b2b lead generation companies in mumbai" 22 at 3.6 | 19 foreign canonicals, with new targets marcustheatres.com (2) and 747ph.live (1). Top-10 count down 30 (20%) vs week 2, partly because the last two days of data were incomplete | Nothing changed (read-only). About 72 never-crawled URLs were not individually inspected. Task B rows were hand-copied, checked by row count only |
| 26 Oct | Baseline saved | GSC 20 Sep to 23 Oct | 268 clicks, 7,345 impressions (see D.2) | n/a | Titles and content shipped on 15 pages (see D.2) |
| 27 Oct | Re-inspection of the foreign-canonical list | 18 URLs | 18 still "Duplicate without user-selected canonical"; `/careers/gtm-strategist` now indexed | Foreign canonicals still showing | Two-day request-indexing list prepared (List A in D.4) |
| 30 Oct (Fri) | Bi-weekly B1 to B11 | URL Inspection on all 265 sitemap URLs, `/site-audit` regenerated. GSC data to 28 Oct | **Indexed 158 of 265 (59.6%)**; week 4 was 153 of 261 (58.6%). Discovered not indexed 59, unknown to Google 24, duplicate without user canonical 14, noindex 9, duplicate with Google-chosen canonical 1. Non-indexed by area: case studies 57, resources 42, careers 4, services 2, tools 2. Foreign canonicals **14** (was 19): 10 to 747live.bet, 2 to marcustheatres.com, 2 to winzir.ph. Orphan pages: 32 (8 on the allow-list, 24 noindex or private). Schema 96.6%. 42 glossary entries under 300 words | B1: 33 case studies stuck in "Discovered". B3: 24 orphans are all noindex or private, but fail the literal allow-list. Tripwire: foreign canonicals persist | Local commit `3d934c6`: internal links added to 4 of 6 under-linked pages (blog posts and guides gained 3 to 4 inbound links each). Titles changed on Pune, Delhi and Hyderabad city pages and on `/who-this-is-for`, `/myntmore-framework` and the Vibe Prospecting guide (not deployed at the time). Draft Gmail and Yahoo post and the `spam-complaint-rate` glossary term written (the term goes live on push). Records updated: the keyword map (201 pages, zero duplicate primary keywords) and the content-gaps log |
| 6 Nov (Fri) | Weekly W1 to W15, partial week 6 | All 15 tasks. GSC data to 4 Nov. Sitemap 268 | Site health **100% (268 of 268)**. Schema **96.6% (259 of 268)**, same as 30 Oct. Clicks 71 vs 91 (-22%), impressions 3,922 vs 3,110 (+26%), CTR 1.81% vs 2.93%, position 14.6 vs 14.5. Homepage clicks 57 to 45 (-21%, within the 50% limit). City pages on page 1: **5 of 8** (Ahmedabad 6.4, Delhi 7.8, Chennai 8.2, Hyderabad 8.8, Mumbai 9.3; Kolkata 12.7, Pune 18.2, Bengaluru 50.4), up from 4. Non-brand clicks 5 and impressions 1,091 for 3 days only. AI referrals 0 (referrers 29 Oct to 5 Nov: google.com 117, instagram 77, linkedin.com 16, "Others" 12). Organic leads 0. 8 careers roles, soonest `validThrough` 2027-01-28 (83 days) | W4: 18 of 19 still duplicate; `/services` last crawled 27 Jul. W11: only 2 unblocked briefs, target is 4. W14: no leads to reconcile; no UTM or referrer on any form. Not checked (need a person): W3, W5, W6, W9, W10 log, AI citation rate | No code fix this run. Careers page for the Lead Gen Intern had been pushed that week |

**Where later numbers replaced earlier ones**

- **Sitemap size:** 243 (16 Oct), 247 (19 Oct), 265 (30 Oct), 268 (6 Nov).
- **Indexed pages:** the 16 Oct figure of 141 of 243 and the 19 Oct figure of 142 of 247 are not comparable to each other because the sitemap grew. Use the like-for-like figure on the old 147 URLs: 80.3% (12 Oct), 80.4% (16 Oct), 81.6% (19 Oct). For the full sitemap use 158 of 265 (59.6%) on 30 Oct. It was not re-pulled on 6 Nov.
- **Top-10 queries:** the 19 Oct count of 121 was understated (last two days of data incomplete) and is not comparable with the 151 on 12 Oct. The 6 Nov run gives about 178 for week 5 and did not count the partial week 6.
- **Week 2 impressions:** 1,215 as first logged, restated to 1,260 on 16 Oct.
- **Foreign canonicals:** 12 (7 Oct), 19 (16 Oct), 19 (19 Oct), 18 (27 Oct), 14 (30 Oct), 18 of 19 original (6 Nov). See the note in D.3 on why the counts differ.
- **Foreign targets for the two glossary pages:** `winzir.ph` on 16 Oct, `747live.bet` on 19 Oct, `winzir.ph` again on 30 Oct. The reason for the change is unknown.
- **Search Console property:** the 26 Oct baseline used the URL-prefix property for `www`. All later runs use the domain property `sc-domain:myntmore.com`.

#### Findings from the 16 Oct run that were not about search results

**W11 content briefs (five ready on 16 Oct).** Three refreshes of pages that already rank, two new pages.

| Brief | Type | Aim | Evidence |
| --- | --- | --- | --- |
| 1 | Refresh `/blog/handling-cold-email-replies` | "cold reply meaning" | 188 impressions, position 8.8, 0 clicks |
| 2 | Refresh `/resources/glossary/inbound-vs-outbound` into a long page | "inbound vs outbound" | position 11.0 |
| 3 | Refresh `/blog/what-is-b2b-outbound-sales` with a strategy section | "b2b outbound sales strategy" | position 22.6 |
| 4 | New page: Gmail and Yahoo sender requirements for cold email | Thresholds from Google's and Yahoo's help pages | No search signal yet. Drafted 30 Oct, unpublished |
| 5 | New page: what LinkedIn says about connection request limits | | Blocked on an owner decision, because LinkedIn prohibits third-party automation while several Myntmore pages market "LinkedIn automation" |

Search Console data is thin (496 non-brand query rows, 167 at position 8 to 30, 95 of those with only 1 or 2 impressions, and anonymised queries are hidden), so only two of the five briefs have real demand behind them.

**Unsourced claims on live pages (flagged 16 Oct, left unedited, owner's call):**

- `/blog/handling-cold-email-replies` says a Harvard Business Review study found a response within an hour made leads "nearly 7x" more likely to qualify. The sources that could be opened show only an abstract about web inquiries, not cold email replies. Unconfirmed as worded.
- `/blog/linkedin-outreach-sequences` says LinkedIn caps connection requests at "around 100 per week for standard accounts and 150-200 for Sales Navigator". LinkedIn's help page states no weekly number and the post names no source.
- `/blog/what-is-b2b-outbound-sales` shows "8 touches (RAIN Group)" and "49% (LinkedIn Research)". RAIN Group keeps the touches figure behind a form, so it could not be confirmed. The 49% was not checked.
- `/services/cold-email` shows a "0.2% spam rate, well below industry threshold" stat with no source. It needs real Google Postmaster data.

**W14 and W15 lead-tracking findings (16 Oct, still true on 6 Nov):**

- All site forms post to one Zoho form (`MyntmoreWebsiteform`) with five visible fields and three hidden ones that are always empty (`zf_referrer_name`, `zc_gad`, and the redirect address). No landing page, UTM, referrer or click ID is sent.
- Zoho's Lead module already has the fields `First_Visited_URL`, `Referrer`, `First_Visited_Time`, `Lead_Source_Type` and `Description`. All were empty on both "Website" leads (6 and 8 Oct). Every site form lead is stamped `Lead_Source = Website`, so organic search, Instagram, direct and careers cannot be told apart. Treat "Organic leads" as an upper bound.
- Vercel showed 14 visitors reaching `/thankyou` (the Calendly booking confirmation) between 5 and 16 Oct, but none of the 200 newest Zoho leads has a Calendly source. They may be stored elsewhere in Zoho. Check the Calendly to Zoho link.
- Two Website leads but zero Vercel pageviews on `/thank-you`. Vercel undercounts (ad blockers), so this is a limit of the evidence, not proof of a break.
- Proposed fix: on the first page view store landing page, referrer and UTM values (first touch) and write them into the hidden `zf_referrer_name` field on submit, then map that value in Zoho Forms to `Referrer` or `Description`. The Zoho mapping needs the owner. The front-end half was later built (commit "send the visitor's first-touch source with every Zoho form"), but the hidden fields must also exist in each Zoho form or Zoho ignores them, and no organic leads had arrived by 6 Nov.
- All 11 form instances (the shared lead form, nine industry and partner landing pages, `/contact-us`) post to the same Zoho form, with the same required fields (name, designation, email), and redirect to `/thank-you`. Both thank-you pages return 200 and are `noindex`.
- Both Calendly links (`founder-myntmore/web` and `sanyam-myntmore/30min`) return 200. `/founder-meeting` listens for the Calendly `event_scheduled` message and sends the visitor to `/thankyou`.
- Gaps: no conversion event fires anywhere in code (no GA4 `generate_lead`, no Meta Pixel `Lead`). On `/services/do-it-yourself` the Book a Call buttons open the second Calendly link in a new tab, so those bookings never reach `/thankyou`. The public page of the main Zoho form returned Zoho's "Page not found" (6 of the 11 Zoho forms the site uses did this on 16 Oct), though the site posts to the submit address, not the public page, and leads from such forms still arrived. On 30 Oct the check said 6 of 10 public form pages 404, including the contact form. On 6 Nov the 10 form endpoints tested all responded (302, not 404), the feedback form returned 200 and `/book-a-call` returned 200 with the Zoho Bookings embed present. A live test submission has never been done; it needs the owner's approval for a labelled test record and a person to delete it.

**Other 16 Oct findings:**

- Careers: seven roles listed and live, each with job schema. `npm run audit:jobs` passed. The retired roles `/careers/senior-sales-head` and `/careers/content-strategist` return a 308 redirect to `/careers`.
- Schema gaps (warnings only): 32 pages had no page-specific structured data, such as `/careers`, `/events`, `/editorial-policy`, `/case-studies` and its ten filter pages, the `/resources` hubs, `/privacy-policy`, `/newsletter-subscribe`, `/1-on-1-consultation`, `/seo`, `/sitemap`, `/marketing-automation` and six guides. Easiest wins: the ten case study filter pages and three hubs.
- Thin content (warnings): 13 blog posts under 800 words and 50 glossary entries under 300 words (42 glossary entries on 30 Oct).
- Distribution: six LinkedIn post drafts (the 58-meetings guide, three comparison posts, the case study library, the Sales and Growth Intern opening) and a ten-week case study series were prepared. Nothing was posted. Every link carries `utm_source=linkedin&utm_medium=social&utm_campaign=<slug>`.
- AI citation rate: ChatGPT shows a bot check to automated browsers, so it was never measured. The owner runs the 10 fixed prompts in a private window and reports which name Myntmore.
- Newsletter (W9): the subscribe form posts to Zoho Campaigns, which no tool can read, so no run ever confirmed whether an issue went out. The site promises "one practical B2B growth playbook every week".
- Core Web Vitals (W6): not available through any tool. Google's PageSpeed API quota was used up on 16 Oct. Speed Insights has since been installed and starts collecting field data once enabled in the Vercel project. Open the mobile report in Search Console; pass is 0 URLs in Poor.

#### Detail from the 30 Oct bi-weekly run

**B2 internal links (local commit `3d934c6`).** Pages that were below 3 inbound or 2 outbound contextual links:

| Page | Before (in / out) | After | Change |
| --- | --- | --- | --- |
| `/resources/blogs/outbound-offer-problem` | 1 / 2 | 4 / 2 | "Keep reading" links from `value-premium-lead-magnets`, `stop-selling-features-cold-outreach`, `pitching-trap-competitor-positioning` |
| `/resources/blogs/ai-personalization-cold-outreach` | 2 / 3 | 4 / 3 | From `cold-email-sequence-templates`, `relevance-beats-reach-b2b-outbound` |
| `/resources/guides/how-to-choose-b2b-lead-generation-agency-india` | 2 / 5 | 5 / 5 | From `agency-vs-in-house`, `linkedin-outreach-agency-vs-manual-prospecting`, `what-is-b2b-outbound-sales` |
| `/resources/guides/outbound-meme-prompt-kit` | 1 / 4 | 4 / 4 | From `how-to-write-a-linkedin-hook`, `3-second-rule-cold-outreach`, `linkedin-profile-inbound-lead-machine` |
| `/case-studies/specialist-recruitment-linkedin-leads` | 1 / 2 | Link added; audit still shows 1 | `/lp/recruitment-firms` now links to it, but the audit scanner does not read landing-page data |
| `/tools/linkedin-hook-grader` | 13 / 1 | Unchanged | The page already links to the hook post from its client component; the scanner undercounts it |

Not fixed, owner to decide: five long-form case studies (`heritage-jewellery-valuation-pipeline`, `leadership-development-messaging-shift`, `medical-tourism-platform-pipeline`, `retail-strategy-design-pipeline`, `wealth-management-pms-pipeline`) each have only the `/case-studies` index linking in. Suggested sources are the closest industry landing page and city page for each.

**B3 orphans (32).** 8 are on the allow-list. The other 24 are all `noindex` or private or admin: 14 `/calendar/*` booking pages, `/agency-vs-in-house`, `/founder-meeting`, `/research/kmspharma`, `/research/myntmore`, `/keystatic/[[...params]]` (admin) and 5 hidden private routes. Recommendation: add the `/calendar/*` pages, the two `/research/*` pages and `/founder-meeting` to the allow-list rather than linking them. `/agency-vs-in-house` is noindex and orphaned, but a blog post of the same name exists; confirm it is meant to stay hidden.

**B4 striking-distance queries (14 days to 28 Oct, position 8 to 20, 20+ impressions, non-brand; only 8 rows qualified).**

| Page | Evidence | Change |
| --- | --- | --- |
| `/resources/blogs/handling-cold-email-replies` | "cold reply meaning" 438 impressions, 0 clicks, position 9.2 | Already changed 26 Oct (new title, "What Does 'Cold Reply' Mean?" H2). Re-measure 23 Nov |
| `/b2b-lead-generation-pune` | "lead generation companies in pune" 45 impressions at 15.1; "b2b lead generation companies in pune" 34 at 16.2 | Title to "B2B Lead Generation Companies in Pune" |
| `/b2b-lead-generation-delhi` | "lead generation agency" 49 impressions at 9.3; "lead generation company in delhi" 11 | Title to "B2B Lead Generation Agency in Delhi NCR" |
| `/b2b-lead-generation-hyderabad` | "lead generation company in hyderabad" 36 at 11.8; "lead generation services in hyderabad" 18 at 15.1 | Title to "Lead Generation Company & Services in Hyderabad" |

Re-measure the three city pages on 27 Nov (28 days after deploy).

**B5 low-click pages (28 days to 28 Oct, 100+ impressions, click rate under 1%; ten pages matched).** Rewritten:

| Page | Evidence | New title (characters including " \| Myntmore") |
| --- | --- | --- |
| `/who-this-is-for` | 231 impressions, 0 clicks, position 3.4 | "Who Is Myntmore For? Who We Work With (and Don't)" (60) |
| `/myntmore-framework` | 173 impressions, 0 clicks, position 4.7 | "Myntmore Framework: How Our Outbound Works" (53) |
| `/resources/guides/how-to-set-up-vibe-prospecting` | 165 impressions, 0 clicks, position 7.2 | "Vibe Prospecting on Claude: 7-Step Setup Guide" (57). Description: "Connect Vibe Prospecting to Claude in 7 steps, then copy 10 prompts that pull verified B2B leads. Read the setup guide." |

The phrase "account-safe sending" was removed from the framework page's search description, because that claim needs an owner decision (LinkedIn prohibits third-party automation).

Deliberately not rewritten: `/blog/handling-cold-email-replies` (1,085 impressions) and `/blog/what-is-b2b-outbound-sales` (154), both retitled 26 Oct so the window mostly measures old titles; `/b2b-lead-generation-bengaluru` (536 impressions, position 44.2), `/b2b-lead-generation-kolkata` (451, position 22.5) and `/resources/glossary/inbound-vs-outbound` (251, position 33.5), where a low click rate is normal at those positions (Bengaluru's title was shortened separately in `94ee068`); `/resources/glossary/total-conversional-market` (100 impressions, position 5.8, Myntmore's own coined term); and `https://myntmore.com/` (the apex host, 2,183 impressions, 15 clicks), which is not a title problem but needs a check that the apex redirects (301) to www. That check was not done.

**B6 and B7 drafts.**

- Blog draft `content/posts/gmail-and-yahoo-sender-requirements.mdoc`, set to `published: false` (drafts are never shown, listed or put in the sitemap). 848 words of body copy plus a comparison table, 6 H2s, 3 FAQs (answers 48 to 52 words), search title 56 characters, description 149. Primary keyword "gmail and yahoo sender requirements" is unique across 201 pages. Sources were read on 30 Oct through a summarising tool (Google's email sender guidelines and Yahoo's sender best practices), **so a person must open both pages and confirm each figure and quote before publishing.** Corrections made to the brief: Yahoo's page gives no bulk-volume threshold; no source was found for "bulk status is permanent", so it is omitted; the claim that cold teams reach 5,000 sends sooner than expected was replaced with the honest version. To publish: set `published` to true in the CMS, then add inbound links from `cold-email-deliverability-guide`, `cold-email-compliance-guide` and the further-reading slots of `spf-dkim-dmarc`, `sender-reputation` and `domain-warmup`.
- Glossary term `content/glossary/spam-complaint-rate.json`: 404 words, 24-word definition, worked example, 3 FAQs. The glossary has no draft switch, so it published on push. It shipped 30 Oct. Gmail and Yahoo both ask senders to keep spam complaints under 0.3%, and Google recommends staying under 0.10%.

**B8 carousel outlines drafted (nothing posted).** Posts covered: `outbound-offer-problem` (28 Oct), `how-to-write-a-linkedin-hook` (20 Oct, with the grader at `/tools/linkedin-hook-grader`), `ai-personalization-cold-outreach` (17 Oct), `cold-email-follow-up-sequence` (17 Oct), `positive-reply-to-booked-meeting` (17 Oct). Each outline uses only what the post says. UTM pattern: `?utm_source=linkedin&utm_medium=social&utm_campaign=<slug>`. No post log was supplied, so no asset can be shown as published.

**B10 opportunity scoring.** Score = (intent × evidence × value × confidence) ÷ effort, using 1 to 5 judgements, not measured values. There is no conversion data, so "value" is a judgement.

| # | Opportunity | Score |
| --- | --- | --- |
| 1 | Confirm the Zoho forms work (6 of 10 public form pages 404, including the contact form) | 375 |
| 2 | Test Live URL and Request Indexing for the 14 foreign-canonical URLs, starting with `/services` | 188 |
| 6 | Hidden UTM and referrer fields on forms | 96 |
| 5 | City pages Bengaluru and Kolkata content depth (536 and 451 impressions at positions 44 and 22) | 40 |
| 3 | Publish brief 2 (inbound vs outbound post) and strengthen the glossary entry (251 impressions at position 33.5) | 36 |
| 4 | Publish the Gmail and Yahoo post after fact-check | 27 |
| 7 | Link the 5 long-form case studies from industry pages | 24 |

Top three actions: (1) verify the forms, owner is the site owner, about 15 minutes; (2) the 14-URL indexing request, about 30 minutes; (3) hidden UTM fields, after approval, to get the first attributable organic leads.

**B11 change-impact log (review dates for measuring results).**

| Date | URL | Change | Baseline | Review date |
| --- | --- | --- | --- | --- |
| 26 Oct | `/resources/blogs/handling-cold-email-replies` | New title and H2 aimed at "cold reply meaning" | 1,085 impressions, 1 click, position 8.2 (1–28 Oct) | 23 Nov (the URL moved 28 Oct, so impressions split across two addresses) |
| 26 Oct | `/resources/blogs/what-is-b2b-outbound-sales` | New title and description | 154 impressions, 0 clicks, position 12.0 | 23 Nov |
| 28 Oct | All blogs | `/blog/<slug>` moved to `/resources/blogs/<slug>` with 308 redirects | Blog traffic | 25 Nov (Google still reports old addresses) |
| 30 Oct (not deployed then) | `/b2b-lead-generation-bengaluru`, the how-to-choose guide | Titles shortened to 60 or fewer | Bengaluru: 536 impressions, 1 click, position 44.2 | 28 days after deploy |
| 30 Oct (not deployed then) | Pune, Delhi, Hyderabad city pages | Titles aligned to queries | See B4 | 28 days after deploy |
| 30 Oct (not deployed then) | `/who-this-is-for`, `/myntmore-framework`, the Vibe guide | Title and description rewrites | See B5 | 28 days after deploy |
| 30 Oct (not deployed then) | 11 posts and the recruitment landing page | Contextual links added | Inbound counts in B2 | 27 Nov |

Rankings alone do not prove cause. Earlier rows were backfilled from "date modified" fields and git history, so their dates should be checked against the deploy log.

#### Detail from the 6 Nov weekly run

**Pages shipped since 30 Oct, with draft LinkedIn posts (none published).**

| Page | Date | Indexable | Draft post |
| --- | --- | --- | --- |
| `/careers/lead-gen-intern` | 5 Nov | Yes | "We're hiring a B2B Lead Gen Intern in BKC, Mumbai. Freshers welcome, Rs 10,000 to 15,000 a month. You'll work on live LinkedIn and cold email campaigns across several industries." Link with `utm_campaign=lead-gen-intern` |
| `/resources/glossary/spam-complaint-rate` | 30 Oct | Yes | "Gmail and Yahoo both ask senders to keep spam complaints under 0.3%, and Google recommends staying under 0.10%. Here is what the number means and how it is measured." Link with `utm_campaign=spam-complaint-rate` |
| `/lp/accounting-cfo-firms` | 2 Nov | Check robots before posting | Not drafted until indexing status is confirmed |
| `/value-prop`, `/master-icp` | 2 Nov | Private | Skip, not for distribution |

Reworked pages with no change to what they say (not worth a separate post): the four migrated glossary terms, 12 long-form case studies and the service pages (moved into the CMS).

**Method note for the 6 Nov non-brand figures.** They came from one query-level pull with only "myntmore" excluded; the "mint more" (2 clicks, 3 impressions) and "tejas jhaveri" (5 impressions) rows were then removed by hand. The Search Console tool would not accept the five-filter form that run, so the other brand variants were checked by eye.

**Events page (W12).** One event, "predictable-pipeline-webinar", ended 19 Sep 2026. The page decides "upcoming" from `isoEndDateTime` and re-renders hourly, so it shows as "Held" and the upcoming list is empty.

#### Open owner actions at the latest run (6 Nov)

- [ ] W3: read Search Console Manual actions and Security issues, confirm "No issues".
- [ ] W4: Test Live URL then Request Indexing on `/services` first, then the Day 1 list in D.4, and add `/careers/lead-gen-intern`.
- [ ] W5 and W6: export the Pages report (Not indexed table) and the mobile Core Web Vitals report.
- [ ] W9: send the Zoho Campaigns report for this week's issue (sent, open rate, one UTM-tagged link).
- [ ] W10: share the LinkedIn post log.
- [ ] W13: confirm which of the 8 roles are actually open.
- [ ] W14: confirm hidden source fields (UTM, landing page, referrer) are created in each Zoho form.
- [ ] W15: approve one synthetic test lead on the production form and say who deletes it.
- [ ] Brief 5: decide how LinkedIn automation is described.
- [ ] Run the 10 AI citation prompts in a private ChatGPT window and report which name Myntmore.
- [ ] Decide the four unsourced claims listed above (correct or remove).
- [ ] Delete the bare-domain sitemap in Search Console if you agree.
- [ ] Decide design items 4, 7 and 8 in D.1.


---

## Appendix E: Numbers history and working lessons

### E.1 The weekly scorecard results log

Weeks run Monday to Sunday. Search Console data arrives two to three days late and is sometimes revised afterwards, so each week's figures can move a little in later pulls. "Strictly under 10" means average position below 10.0. "Non-brand" always means the brand-exclusion rule in the scorecard definitions (Part 10.8).

| Week | Organic leads | Non-brand clicks | Non-brand impressions | Queries in top 10 | City pages on page 1 | Submitted | Indexed | Site health | Schema | AI referrals |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Week 2 (5 to 11 Oct) | 2 | 6 | 1,215 (later restated 1,260) | 151 (85 with 2 or more impressions) | 2 of 8 | 147 | 118 of 147 (80.3%) | 100% (147/147) | 78.9% (116/147) | 0 |
| Week 3 (12 to 18 Oct) | 0 | 6 | 1,364 | 123 strictly under 10 (128 counting exactly 10.0; 74 with 2 or more impressions) | 2 of 8 | 247 | 142 of 247 (57.5%) | 100% (247/247) | 87.0% (215/247) | 0 |
| Week 4 (19 to 25 Oct) | 0 | 3 (later restated 4) | 1,555 (later restated 1,598) | 121 strictly under 10 (74 with 2 or more impressions; 5 more at exactly 10.0) | 3 of 8 | 261 | 153 of 261 (58.6%) | 100% (261/261) | 95.0% (248/261) | 0 |
| Week 5 (26 Oct to 1 Nov) | 0 | 5 | 1,923 | about 178 (113 with 2 or more impressions), hand counted, plus or minus 3 | 4 of 8 | 266 | 158 of 265 (59.6%, from the 30 Oct pass, not re-run) | 100% (266/266) | 96.6% | 0 |
| Week 6 (2 to 8 Nov) | 0 | 8 | 2,372 | about 190 (192 rows under 10, less 2 brand rows; 8 more at exactly 10.0), plus or minus 3 | 3 of 8 | 268 | not finished (the all-pages check did not complete) | 100% (268/268) | 96.6% (259/268) | 0 |

Notes on the table:

- Week 1 (28 Sep to 4 Oct) numbers were never saved. The earlier baselines from the first SEO check were: site health 100%, schema 84.4%, indexed 77%.
- Week 3 had a first partial pull on 16 Oct and a final pull on 20 Oct. The numbers above are the final ones.
- Week 5 site health was 99.2% (263 of 265) on 30 Oct because two page titles were over 60 characters. They were fixed and the week's final crawl was 100%.
- Week 6 indexed pages: the last full count is 158 of 265 on 30 Oct. The week 6 count was not completed, so it is blank, not zero.

### E.2 Site-wide totals and extra detail for each week

| Week | Site total clicks | Site total impressions | Notes |
| --- | --- | --- | --- |
| Week 2 | 60 to 62 | 1,987 to 2,046 | Average position about 10.2 |
| Week 3 | 57 | 2,224 | |
| Week 4 | 72 to 75 | 2,672 to 2,750 | 69 of the 72 clicks were brand. The homepage alone had 50 clicks. Non-brand average position slid from about 12 to about 19 |
| Week 5 | 85 | 3,368 | |
| Week 6 | 66 | 3,841 | 58 of the 66 clicks were brand |
| Rolling check (29 Oct to 4 Nov against 22 to 28 Oct) | 71 against 91 (minus 22%) | 3,922 against 3,110 (plus 26%) | Average position 14.6 against 14.5. CTR 1.81% against 2.93% |

**City pages in detail (average position in the week)**

| City | Wk 2 | Wk 3 | Wk 4 | Wk 5 | Wk 6 |
| --- | --- | --- | --- | --- | --- |
| Chennai | 6.0 | 7.5 | 6.9 | 7.2 | 6.8 |
| Ahmedabad | 8.5 | 7.3 | 9.2 | 7.7 | 7.1 |
| Hyderabad | 16.1 | 12.8 | 8.6 | 10.4 | 8.3 |
| Delhi | 12.5 | 13.1 | 12.7 | 9.9 | 11.2 |
| Kolkata | 22.3 | 24.5 | 24.4 | 9.8 | 14.6 |
| Mumbai | 15.8 | 17.1 | 14.7 | 11.4 | 11.8 |
| Pune | 15.5 | 15.8 | 15.2 | 14.6 | 19.8 |
| Bengaluru | 57.5 | 48.7 | 44.2 | 45.1 | 55.1 |

Bengaluru has the most impressions of any city page and the worst position. It is the biggest city-page opportunity.

**What was not indexed, and why (the 5 snapshots)**

| Snapshot | Not indexed total | Discovered, not indexed | Unknown to Google | Duplicate without canonical (all pointing to other sites) | Excluded by noindex |
| --- | --- | --- | --- | --- | --- |
| 19 Oct | 105 | 43 | 34 | 19 (16 to 747live.bet including `/services`, 2 to marcustheatres.com, 1 to 747ph.live) | 9 |
| 26 Oct | 108 | 64 | 17 | 18 | 9 |
| 30 Oct | 107 | 59 | 24 (mostly the new `/resources/blogs` URLs after the 28 Oct move) | 14 (10 to 747live.bet, 2 to marcustheatres.com, 2 to winzir.ph) | 9, plus 1 where Google chose a different canonical |

The 9 "excluded by noindex" case studies come from old crawls on 10 and 11 October. Every one of those pages is currently indexable, so the records are stale.

### E.3 Blog traffic (an extra row the owner asked to count every week)

**Definition:** Vercel Analytics pageviews on blog post paths, plus Search Console pages whose address contains `/blog`. Posts moved from `/blog/<slug>` to `/resources/blogs/<slug>` on 28 Oct, so from week 5 the post path is `/resources/blogs/`. The blog index page is reported separately.

| Week | Vercel visitors and pageviews | Posts that got views | Search Console |
| --- | --- | --- | --- |
| Week 3 (12 to 18 Oct) | 24 visitors, 26 pageviews | 15 | 435 impressions, 1 click |
| Week 4 (19 to 25 Oct) | 25 visitors, 25 pageviews | 21 | 440 impressions, 0 clicks (402 of them on the cold-reply post at position 8.5) |
| Week 6 (2 to 8 Nov) | 64 pageviews (visitors cannot be added up across posts) | 30, plus 5 on the index | 1,106 impressions, 3 clicks, 37 URLs. The cold-reply post alone had 651 impressions at position 3.2 |

Blogs are about 5% of all site pageviews (64 of about 1,283 in week 6). Top posts in week 6 by views: the competitor-positioning post (6), cold email sequence templates (5), cold email versus LinkedIn outreach (4), the cold-reply post (4), the deliverability guide (4).

### E.4 Where traffic comes from (week 6, Vercel referrers)

Direct or no referrer 521 visitors, google.com 99, l.instagram.com 42, linkedin.com 12, instagram.com 7, Gmail app 5, bing.com 1, Yahoo 1. **No AI assistant (ChatGPT, Perplexity, Claude, Gemini, Copilot) appeared**, so AI referral visitors are 0. AI traffic that arrives with its referrer stripped is hidden inside "direct".

### E.5 Organic leads: how the number is found and why it is rough

- Zoho CRM Leads module, filter: Lead Source equals "Website" and Created Time inside the week (use India time boundaries, 00:00 to 23:59 IST).
- **Also count the Contacts module (found 12 Nov 2026).** Website enquiries and Zoho Bookings calls are created as Contacts, not Leads (bookings show the meeting type, such as "Enwil 25 min", in Lead Source Type). Run the same filter on Contacts and add the two. Counting Leads only reported 0 for weeks 3 to 6, while Contacts held 5, 10, 2 and 5. Contacts can also be entered by hand by the sales team, so treat the total as an upper bound.
- It is an **upper bound**: until 10 Nov 2026 every form sent an empty source field, so organic search could not be separated from Instagram or direct visits. The new source tracking (Part 7) fixes this going forward.
- No lead with Lead Source "Website" has been created since 8 Oct 2026.
- Other lead types exist but are not part of this KPI: lead-magnet downloads (7, plus one on 20 Oct) and one "friend" referral.
- Listing the newest leads is useless for checking, because a bulk import floods the newest records. Always search with a filter.
- The Zoho Lead module has empty fields for first-visited page, referrer, first-visited time and lead source type. The site forms never filled them.

### E.6 Practical lessons for pulling the numbers

| Topic | What works and what does not |
| --- | --- |
| Search Console property | Always use `sc-domain:myntmore.com`. The bare apex property shows far less |
| Brand exclusion | The tool has no regex. Use five "does not contain" filters (myntmore, mintmore, mint more, mint and more, tejas jhaveri). Since 6 Nov the five-filter call fails in the connector, so the workaround is one filter (exclude "myntmore"), then take out the "mint more" and "tejas jhaveri" rows by hand |
| Daily totals | One cheap call: group by date with the same filters. Cross-check the query-level total against it |
| Query counts | Query rows are only needed for the "queries in top 10" count. Save the rows to a file as you go and count with a script. A hand count can be off by about 3, and a helper's written summary can contradict its own table, so recount from the data |
| Index status | URL Inspection takes 10 URLs per call. A full pass over about 250 URLs took roughly 70 minutes when done by an assistant. For a quick read, check only the not-yet-indexed URLs, the homepage, `/services` and the city pages. If one URL returns a Google 500 error, retry it alone |
| Canonicals | The batch inspection tool reports coverage, not Google's chosen canonical. Use the single-URL inspection to see the chosen canonical |
| Like-for-like indexing | Compare against the pages that existed at the last pull. A burst of new pages drags the headline ratio down for days |
| Zoho search | Use the criteria form `((Lead_Source:equals:Website)and(Created_Time:between:<start>,<end>))` with IST offsets |
| Vercel | Group visitors by referrer host or by request path. Grouping by UTM source needs the paid Web Analytics Plus and returns an error otherwise |
| Bot traffic in Vercel | Pull visitors by country as well as by referrer. Countries whose visitors average about 1.0 pageviews each with no referrer (Singapore and China every week; the United States in bursts, such as 9 to 11 Nov 2026) are crawlers and monitors. Report "visitors" and "visitors excluding likely bots" (total minus those countries' visitors) side by side. In week 6 that was 625 and about 455 |
| Site health and schema | Run the crawl script against the live site. Exit code 0 means Site Health is 100% |
| AI citation | ChatGPT shows "An error occurred during verification" to automated browsers. That is bot detection: do not work around it. A person runs the 10 prompts in a private window and reports which named Myntmore. Perplexity now needs an account |
| Core Web Vitals | The free PageSpeed API quota without a key runs out quickly. The Search Console report needs a person |
| GA4 | Not connected to the data connector, so use Search Console, Vercel and Zoho |
| Newsletter | Zoho Campaigns is not connected to the assistant tools, so the weekly newsletter check needs the owner's campaign report |
| Working in the repo | Use full file paths in every command. Changing directory in a one-off command can reset the working folder |
| Dev server and builds | Stop the dev server before `npm run build` because they share the `.next` folder |
| Page-file scanners | The site-audit scanner cannot see links that live inside landing-page JSON or client components, so it can undercount links to those pages |


---

## Appendix F: The free tools, one by one

This appendix explains the free tools system in plain language. It was written from the code as it stood on 11 November 2026. Where something could not be checked from the code, it says so.

### F.1 Overview

Myntmore gives away 11 free tools. Each one helps a B2B founder or sales leader with outbound work: working out what outreach is worth, writing better LinkedIn content, defining who to sell to, or preparing sales documents. The tools exist to earn trust and to collect leads. Nine of the 11 ask the visitor for their contact details before the tool runs. The two calculators do not need a form to use (the LinkedIn ROI Calculator asks for one only when the visitor wants a PDF).

Nine tools use AI. All of them use Google Gemini, model `gemini-2.5-flash`, through the Myntmore server. The two calculators and the scoring part of the Hook Grader are plain code that runs in the browser. The single list of tool names, addresses and one-line descriptions is `lib/tools-registry.ts`. The hub page where all tools are listed is `app/resources/tools/page.tsx` (it keeps its own copy of the list).

Every tool page lives at `app/tools/<slug>/`. The page file holds the search settings. A "client" file next to it runs the visitor flow. Supporting screens live in `components/tools/<name>/`. AI routes live in `app/api/tools/<name>/route.ts`.

#### Summary table

| # | Tool | URL | Problem it solves | Who it is for | Lead form | Runs where | API route |
|---|------|-----|-------------------|---------------|-----------|------------|-----------|
| 1 | ROI Calculator (LinkedIn view, with a switch to the cold email view) | /tools/roi-calculator | Not knowing what LinkedIn outreach could return | Founders and sales leaders running LinkedIn outreach | Only when exporting the PDF | Browser only | None |
| 2 | Cold Email ROI Calculator | /tools/cold-email-roi-calculator | Not knowing what cold email volume could return, or how your rates compare | Founders, agencies, sales leaders planning cold email | No | Browser only | None |
| 3 | LinkedIn Hook Grader | /tools/linkedin-hook-grader | Weak first two lines on LinkedIn posts | Founders and sales leaders who post on LinkedIn | Yes | Score in the browser, rewrites by the Myntmore server calling Gemini | /api/tools/hook-grader |
| 4 | ICP Builder and Value Proposition Generator | /tools/icp-builder | Not being clear on who to sell to or what to say | Founders defining B2B or consumer customers | Yes | Browser sends prompts to a Myntmore proxy that calls Gemini | /api/gemini |
| 5 | LinkedIn Profile Optimizer | /tools/linkedin-optimizer | A profile that does not bring inbound leads | Founders and executives | Yes | Scores in the browser, rewrites by the Myntmore server calling Gemini | /api/tools/profile-optimizer |
| 6 | DM Angle Generator | /tools/dm-angle-generator | Sending the same cold opener to everyone | Sales and outreach people | Yes | Myntmore server calling Gemini | /api/tools/dm-angles and /api/tools/dm-angles/regenerate |
| 7 | Competitor Battle Card Generator | /tools/battle-card-generator | Losing deals to a competitor you have not studied | Sales reps and founders | Yes | Myntmore server calling Gemini (with live Google Search) | /api/tools/battle-card-generator |
| 8 | Case Study and Proposal Generator | /tools/case-study-generator | Blank page when writing a case study or proposal | Service businesses and agencies | Yes | Myntmore server calling Gemini | /api/tools/case-study-generator |
| 9 | Lead Magnet Idea Generator | /tools/lead-magnet-ideas | Not knowing what free asset to offer in outreach | Founders running cold email and LinkedIn | Yes | Myntmore server calling Gemini | /api/tools/lead-magnet-ideas |
| 10 | Posting Rhythm Builder | /tools/posting-rhythm-builder | No consistent LinkedIn posting plan | Busy founders | Yes | Myntmore server calling Gemini | /api/tools/posting-rhythm |
| 11 | Founder Presence Analyzer | /tools/founder-presence-analyzer | Not knowing how your LinkedIn activity compares to competitors | Founders | Yes | Score in the browser, advice by the Myntmore server calling Gemini | /api/tools/founder-presence |

Note on the DM Angle Generator: `next.config.js` still contains a rewrite that points this URL to a separate Lovable app (named mynt-more-angles). That rewrite does not take effect. The tool was later copied into this codebase, and a page file in the codebase always wins over a rewrite of this kind. A live check on 11 November 2026 confirmed that the site serves its own copy: the response was matched to this app's route, the page title and canonical match this repo's page, and the page loads this app's files. See F.5.

#### How every page is built, in short

- Page title: each page sets a short title. The site adds " | Myntmore" to the end automatically.
- Every tool page carries WebApplication structured data (price 0, provider Myntmore), breadcrumbs with BreadcrumbList data, a canonical address on www.myntmore.com, and social share tags built by `lib/tool-social-metadata.ts`.
- Ten of the 11 landing screens also carry HowTo structured data. The Cold Email ROI Calculator page does not.
- Only the Hook Grader has FAQs with FAQPage structured data. Its five questions are edited in the Keystatic admin (Page FAQs, id `tool-linkedin-hook-grader`).
- Each landing screen ends with a "Try this next" block (the `RelatedTools` component) that links to two or three other tools. It shows only on the landing screen, before the visitor starts.

#### How the AI tools behave in common

- All AI calls use Gemini 2.5 Flash. The Myntmore API key is held on the server and never reaches the browser.
- Most routes check that required fields are present and within a character limit, then call Gemini and return the answer as JSON. Failures return an error message with status 400 or 500, and the screen shows it.
- Only the shared proxy at /api/gemini has rate limiting (see F.2.4). The other AI routes have none.
- All the AI tools save what the visitor typed and what they got back onto their lead record in Supabase (see F.3).

---

### F.2 The tools, one by one

#### F.2.1 ROI Calculator (LinkedIn lead generation view)

**What it does.** Turns a visitor's LinkedIn outreach numbers into a funnel, revenue and return on investment, live as they type, and exports the result as a PDF.

**Page and flow.** Landing screen with a Start button, then the calculator. A switch at the top ("Choose your channel") lets the visitor change to the cold email calculator (F.2.2). The choice is kept in the address as `?tool=cold-email`. The form appears only when the visitor clicks Export Results for the first time.

**Inputs the visitor gives.**

| Field | Type and range | Starting value |
|-------|----------------|----------------|
| Currency | Dropdown: USD, INR, AUD, AED, SGD, HKD, CNY, JPY, CAD | USD |
| Monthly Outreach Volume (connection requests per month) | Number, 0 or more | 0 |
| Duration | 1, 3, 6 or 12 months | 12 |
| Connection Acceptance Rate | Slider 0 to 100%, steps of 5 | 0 |
| Response Rate | Slider 0 to 100%, steps of 5 | 0 |
| Positive Response Rate | Slider 0 to 100%, steps of 5 | 50 |
| Meeting Show-Up Rate | Slider 0 to 100%, steps of 5 | 30 |
| Sales Conversion Rate | Slider 0 to 100%, steps of 1 | 0 |
| Average Deal Value | Number, 0 or more | 0 |
| Invoices Raised per Year | Number, 0 or more | 1 |
| Customer Retention Period (months) | Whole number, 0 or more | 0 |
| Monthly Investment with Myntmore | Number, 0 or more | 0 |

The Disengagement Rate is shown but cannot be edited. It is always 100 minus the positive response rate.

**What the visitor gets back.**

- Total Revenue Generated and Return on Investment (shows N/A when the monthly investment is 0).
- Full Customer LTV and Effective LTV (the part of lifetime value that falls inside the chosen duration).
- A Sales Conversion Rate card showing the rate typed and the rate actually used.
- Five number cards: Total Requests, Accepted, Total Replies, Meetings, Deals (the positive and negative reply counts show beside the inputs).
- A funnel chart (connection requests, accepted, replies, positive, negative, meetings, deals).
- A revenue chart showing cumulative revenue, cost and profit month by month.

**How it works inside.** Pure arithmetic in `app/tools/roi-calculator/RoiCalculatorClient.tsx`. Nothing is sent to any server while the visitor plays with the numbers.

1. Total requests = monthly volume x duration (rounded).
2. Accepted = total requests x acceptance rate.
3. Replies = accepted x response rate.
4. Positive replies = replies x positive response rate. Negative replies = replies minus positive replies.
5. Meetings = positive replies x "Meeting Show-Up Rate".
6. Adjusted closing rate = sales conversion rate + 1 percentage point, capped at 100. The page explains this as a "conservative uplift" assumption.
7. Deals = meetings x adjusted closing rate.
8. Full LTV = deal value x invoices per year x (retention months / 12).
9. Effective LTV = deal value x invoices per year x (the smaller of duration and retention, divided by 12).
10. Revenue = deals x effective LTV.
11. Total cost = monthly investment x duration.
12. ROI % = (revenue minus cost) / cost x 100. If cost is 0, ROI is shown as N/A, not 0.

**Validation, limits, errors.** Number boxes cannot go below 0. If the PDF fails to build, a message "Failed to export PDF" appears.

**What is saved.** When the visitor submits the form at export time, one lead row is created (source `roi_calculator`, Zoho form ROICalculator). Right after, the row is updated once with the inputs (all 12 fields above) and outputs (total requests, accepted, replies, positive, negative, meetings, deals, revenue, ROI). Later changes to the numbers are not saved again, and later exports in the same visit do not ask for the form again.

**Export.** PDF named `roi-calculator-results.pdf`. The browser draws the results panel (html2canvas), places it in an A4 PDF with a black header band, the Myntmore logo and the title "ROI Calculator Results", and splits it over up to 20 pages with page numbers. The form is a pop-up that can be closed with the X or the Escape key.

**Related tools.** Cold Email ROI Calculator, Competitor Battle Card Generator.

**Search settings.** Title "B2B Outreach ROI Calculator". Schema: WebApplication, HowTo, BreadcrumbList. No FAQs. Fourteen keywords such as "roi calculator for cold outreach".

**Quirks and limits.**
- The +1 point closing uplift means a 0% input still yields a 1% closing rate.
- The input labelled "Meeting Show-Up Rate" is actually applied to positive replies to give meetings, so the label and the math do not match.
- The revenue chart spreads revenue in a straight line across the months. It does not model delays or ramp-up.
- The gate form is the only time the visitor's details are asked, so a visitor who never exports is never captured.

#### F.2.2 Cold Email ROI Calculator

**What it does.** Plans a cold email sending set-up (domains, mailboxes, volume), then works out meetings, deals, revenue, return and payback month, while comparing each rate with 2026 benchmark data.

**Page and flow.** Standalone page with a hero, the calculator, and explanatory sections. The same calculator is also embedded in the ROI Calculator page behind the channel switch. No lead form at any point.

**Inputs the visitor gives.**

| Field | Type and range | Starting value |
|-------|----------------|----------------|
| Set volume by | Choice: Emails per day, or Prospects per month (the other box is worked out) | Emails per day |
| Emails per day | Number | 1,000 (equals 7,500 prospects per month) |
| Prospects per month | Number | 7,500 |
| Duration | 3, 6 or 12 months (no 1 month, because setting up takes about 2 months) | 12 |
| Currency | Same nine currencies as F.2.1 | USD |
| Bounce rate | Slider 0 to 10%, steps of 0.01 | 1.67 |
| Reply rate | Slider 0 to 15%, steps of 0.1 | 3.8 |
| Positive reply share | Slider 0 to 100%, steps of 1 | 59 |
| Meeting booking rate | Slider 0 to 100% | 47 |
| Meeting show-up rate | Slider 0 to 100% | 75 |
| Close rate | Slider 0 to 100% | 12 |
| Deal value | Number, empty at first | none |
| Monthly spend | Number, empty at first | none |
| Invoices per year | Whole number | 1 |
| Retention (months) | Whole number | 12 |
| Sales lag (months) | Whole number, 0 to 12 | 0 |

A Reset button restores every default. The starting rates are Myntmore's own 2026 averages where its sending tool tracks the step (bounce, reply, positive share, booking) and published averages for show-up and close.

**What the visitor gets back.**

- Your Sending Plan: domains needed, mailboxes ("ids"), emails per day, and a month-by-month ramp showing which mailboxes are warming up and sending, plus each list's launch and finish days.
- Conversion Funnel: prospects reached, delivered, replies, positive replies, meetings booked, meetings held, deals closed.
- Highlight cards: total revenue, ROI, full LTV, effective LTV.
- Stat row: meetings booked, held, deals closed, meetings per 1,000 prospects, cost per booked meeting, cost per customer, payback month.
- A growth chart of cumulative revenue, cost and profit, with a note about when it pays back.
- Beside each slider: a "where you stand" chip (for example Below average, Average, Above average, Top quartile, Elite for reply rate), a one-line benchmark, and a details card with sources. A soft warning shows when a value is above the best published results (reply above 10%, positive share above 60%, booking above 60%, show-up above 90%, close above 35%).
- An industry benchmark table for 11 industries (reply range and positive reply range).

**How it works inside.** Pure calculation in `lib/cold-email-roi/coldEmailRoi.ts`, with all numbers and benchmark text in `lib/cold-email-roi/coldEmailBenchmarks.ts`. Nothing is rounded until display.

Sending rules built in (they mirror how Myntmore runs campaigns):
- Each domain holds 4 mailboxes. Two are created on day 1 and warm up for 14 days. The other two are added one month later and warm up for 14 days.
- Each mailbox sends up to 25 emails a day. A month is counted as 30 days.
- Each prospect gets 4 emails: the first email plus 3 follow-ups, 5 days apart.
- A group of mailboxes works through lists of about 150 prospects per mailbox. First emails go to everyone on a list before any follow-up. When a list finishes, the next one starts the same day.
- Domains needed = emails per day / (4 x 25), rounded up.

Funnel math: prospects reached x (1 minus bounce) = delivered. Delivered x reply rate = replies. Replies x positive share = positive. Positive x booking rate = booked. Booked x show-up rate = held. Held x close rate = deals.

Revenue math: month by month. Deals from prospects reached in month m begin paying in month m + sales lag. Each customer pays deal value x invoices per year / 12 every month for the retention period. Only payments that fall inside the chosen duration count. ROI = (revenue minus cost) / cost, shown as N/A with no monthly spend. Payback month = first month where cumulative profit is above 0. Meetings per 1,000 prospects = 1,000 x (1 minus bounce) x reply x positive share x booking rate.

**Validation, limits, errors.** Inputs that are blank, negative, infinite or not a number count as 0. Rates are capped at 100. Sales lag is capped at 12.

**What is saved.** Nothing. No lead is captured and nothing is sent anywhere.

**Export.** PDF named `myntmore-cold-email-roi.pdf` ("Cold Email ROI Report" with the date, a list of the assumptions used, the sending plan and results as pictures, and a footnote). Built in the browser with html2canvas and jsPDF, on the cream site background with the logo.

**Related tools.** The registry says ROI Calculator and ICP Builder. The page itself hard-codes Competitor Battle Card Generator and ICP Builder (see F.5).

**Search settings.** Title "Cold Email ROI Calculator". Schema: WebApplication and BreadcrumbList (no HowTo, no FAQs). Keywords include "cold email roi calculator" and "cold email benchmarks 2026".

**Quirks and limits.** Benchmarks are quoted from published 2026 sources and Myntmore's own Smartlead results (for example 256 replies from 6,657 delivered prospects over 10 completed campaigns). They will go stale and need a yearly refresh. The page footnote tells visitors the result is an estimate, not a guarantee.

#### F.2.3 LinkedIn Hook Grader

**What it does.** Scores the first two lines of a LinkedIn post out of 100 using fixed rules, then asks AI for three rewrites and scores those the same way.

**Page and flow.** Landing screen (with FAQs and a before and after example), lead form, input screen, results.

**Inputs the visitor gives.**

| Field | Required | Limits |
|-------|----------|--------|
| Your hook (the first two lines) | Yes | At least 10 characters, at most 400. The box stops at 400 and shows a live count. A red note appears over about 180 characters because the end may be hidden behind "see more". |
| Who is the post for? | No | Up to 150 characters. If left blank, the AI assumes B2B founders and sales leaders. |

**What the visitor gets back.**

- Their hook repeated back.
- A score card: total out of 100, a label (Strong, Solid, Needs work, Weak), a bar, and six checks. Each check has its score, a word (Strong, Okay, Weak), a bar and a one-sentence tip.
- Three rewrites (Option 1 to 3), each with its angle, its own score out of 100 and the difference from the original, a Copy button, and a one-sentence "Why it works".
- A note to check any [bracketed] placeholders and confirm every claim is true.
- Buttons: Grade another hook, Share on LinkedIn.
- A link to the LinkedIn Content-to-Calls Starter Kit, and a Book a Call block.

**How it works inside: the score.** Pure code in `lib/hook-grader.ts`, run in the browser. The same wording always gets the same score. The AI never sets a score. Text is trimmed and spaces collapsed first.

| Check | Max | How points are earned |
|-------|-----|------------------------|
| Length | 15 | 60 to 180 characters = 15. 40 to 59 or 181 to 230 = 10. 20 to 39 or 231 to 300 = 5. Anything else = 0. |
| Curiosity | 20 | A question mark = 6. A word such as why, how, what, never, stop, mistake, wrong, truth, nobody, most people, instead = 6. A contrast word (but, yet, instead, until, however, than) = 4. A colon, ellipsis or line break = 4. |
| Specificity | 20 | Any digit = 8. A symbol such as %, $, a currency sign, or a number with k, m or x = 4. A time word (day, week, month, year, hour, minute) = 4. A capitalised name after the first word (not a common opener) = 4. |
| Authority | 15 | First person (I, I've, I'm, I'd, we, we've, we're, my, our) = 5. A past-tense result verb (booked, closed, grew, built, launched, lost, learned, ran, tested, sent, hired, failed, spent, made, wrote, signed, scaled, won) = 5. A number with a unit like years, clients, meetings, emails = 5. |
| Action | 15 | The words you or your = 5. Starts with a command word (stop, start, do, don't, never, try, use, steal, copy, ask, write, send, cut, fix, skip, build) = 5. A promise word (here's, steps, rules, ways, lessons, framework, template, playbook, checklist, mistakes) = 5. |
| No clickbait | 15 | Starts at 15. Minus 5 for each hype phrase (for example "you won't believe", "game changer", "10x", "unlock the", "!!" or "??"). Minus 3 for more than 2 emojis. Minus 4 for two or more all-caps words. Minus 2 if it ends with "!". Never below 0. |

Each check is Strong at 75% or more of its maximum, Okay at 40% or more, otherwise Weak. The total label is Strong at 80 or more, Solid at 60 to 79, Needs work at 40 to 59, Weak below 40.

**How it works inside: the rewrites.** The browser sends the hook and audience to `/api/tools/hook-grader`. The server calls Gemini 2.5 Flash with the role "LinkedIn writing coach for B2B founders and sales leaders". The hook is fenced between markers and labelled as text to rewrite, never as instructions. The AI must write exactly 3 alternatives with different angles: specific result, contrarian, curiosity gap. Rules in the prompt: keep the writer's facts, never invent numbers (use placeholders like [X%] instead), at most 210 characters each, no emojis, hashtags, all caps or exclamation marks, and a one-sentence reason for each. The reply must follow a fixed JSON shape. The server keeps up to 3 valid alternatives.

**Validation, limits, errors.** Server returns 400 if the hook is empty, shorter than 10 or longer than 400 characters, or the audience is over 150. If no alternatives come back it returns 502. If the AI step fails, the visitor still sees their own score (it is computed in the browser), with an error note and a Try again button.

**What is saved.** Lead row with source `hook_grader`. Zoho form: the shared Myntmore lead magnet form (Myntmoreleadmagnetform). Supabase update after results: inputs `hook` and `audience`; outputs `score` (total only) and `alternatives`.

**Export.** Per-option Copy button only.

**Related tools.** Posting Rhythm Builder, LinkedIn Profile Optimizer.

**Search settings.** Title "LinkedIn Hook Grader". Schema: WebApplication, HowTo, FAQPage (5 questions: what a hook is, how the score is calculated, what the AI does, whether it makes up numbers, whether a high score guarantees performance), BreadcrumbList. Twelve keywords led by "linkedin hook grader".

**Quirks and limits.**
- The first-person check is case sensitive for "we", "my" and "our". A hook that starts with "We booked" or "My team" does not get that point.
- The 180 character fold is a safe estimate, not a number LinkedIn publishes.
- There is a unit test file for the scoring (`lib/hook-grader.test.ts`).

#### F.2.4 ICP Builder and Value Proposition Generator

**What it does.** Takes a short business description, builds 3 to 6 deep customer profiles, then writes a value proposition for each one plus one for channel partners.

**Page and flow.** Landing screen, lead form, then three screens with a progress bar: Intake, ICP Builder, Value Proposition.

**Inputs the visitor gives.**

Screen 1, Intake (all three required to continue):
- Core Offer: free text. About 900 milliseconds after the visitor stops typing, the AI writes 3 cleaner versions of it. The visitor must pick one version. Only the picked version is used later, never the raw text. If the AI fails, three copies of the visitor's own text are offered.
- Selling To: D2C (individual consumers), B2B (business buyers) or Both.
- Business Type: Product-based, Service-based or Hybrid.

Screen 2, ICP Builder: 3 profile cards to start. If "Selling To" is Both, the visitor can add profiles up to 6 and remove them down to 3, and each profile must be set as Business or Individual Consumer. Otherwise the count stays at 3 and the type is fixed.
- Business (B2B) profile: Industries (searchable list of about 80 industries plus Other, up to 3), Target Geography (about 150 countries plus Global and Other, searchable), Cities in India (free text, shown only if India is chosen), Roles (11 choices such as CEO / CXO, Head of Sales, Founder / Co-Founder), Company Size (1–10, 10–50, 50–200, 200–500, 500–1000, 1000+, Other). Roles, sizes and industries each need at least one choice. Geography is optional.
- Individual consumer (D2C) profile: a free text description of the person. Again after about 900 milliseconds the AI offers 3 rewrites and the visitor must pick one. Geography is optional here too.

Screen 3, Value Proposition: one button to generate, then Regenerate or Done.

**What the visitor gets back.**

- For each profile, a tab with: name, who they are, core responsibilities (for consumers this is daily life, not a job), pain points (5 to 7), goals and desires, buying triggers, objections, psychology, how to position, where they hang out, and how the target country shapes buying. A separate Channel Partners tab lists 3 to 4 partner types per profile, with why they fit and how to approach them.
- Value proposition tabs, one per profile: core promise, positioning statement ("We help ... to ... by ..."), core angle (Authority, ROI, Speed or Trust, with a reason), before and after states, a 3-step system, why others fail, why you win, content strategy, short pitch and call to action. One extra "Channel Partners" tab has what is in it for them, ideal partner profile, how the partnership works in 3 steps, why partner with us, how to approach them, pitch and call to action.

**How it works inside.** The browser builds long instruction text (`components/tools/icp-builder/lib/prompts.ts`) and sends it to `/api/gemini`, a shared proxy that calls Gemini 2.5 Flash (temperature 0.7, up to 16,384 output tokens). The prompts include fixed rules: plain language (no jargon, no words like unlock or empower), personalise to the visitor's inputs, adapt to the target country's buying culture (India, USA, UK, Europe, Middle East, Southeast Asia, Australia), adapt to D2C or B2B and product or service, and no em dashes, asterisks or hash signs. The AI is told to return a JSON array. The browser pulls out the array, then a cleaner (`lib/sanitize.ts`) replaces any em dash with a comma and strips asterisks and hash signs.

**Validation, rate limiting, errors.**
- Browser checks (messages such as "ICP 2 needs at least one role selected").
- Each generation has a 60 second timeout on the browser side.
- Each AI call is retried up to 3 times (waits of 1 second and 2 seconds), then a last attempt is made with the prompt cut down to 2,000 characters. Identical calls in flight at the same time share one request.
- Messages shown: too slow, rate limited, could not reach AI, response could not be read.
- The proxy at `/api/gemini` accepts only same-site requests (403 otherwise), allows 40 requests per visitor address per 10 minutes (429 with a Retry-After time), and refuses prompts over 30,000 characters (413) or system prompts over 2,000.
- Rate limits are kept in memory per server instance, so they slow a single abuser but are not a strict global cap.

**What is saved.** Lead row with source `icp_builder`, Zoho form ICPbuilder. After the ICPs are made and again after the value propositions are made, the row is updated: inputs `intake` and `icps`; outputs `icpResults` and `valuePropResults`. This means a visitor who drops out after the ICP step is still captured with useful data.

**Export.** Copy buttons on the content strategy (or partner approach), short pitch and call to action in each value proposition tab. No PDF, no copy-all.

**Related tools.** DM Angle Generator, Lead Magnet Idea Generator.

**Search settings.** Title "ICP Builder & Value Proposition Generator". Schema: WebApplication, HowTo, BreadcrumbList. No FAQs.

**Quirks and limits.**
- The last-resort 2,000 character cut removes most of the instructions, so that attempt is unlikely to give a good answer.
- Choosing "Other" for size or industry sends just the word "Other"; there is no box for details.
- This is the most expensive tool in AI calls: one for the offer, one per consumer description, one for ICPs, one for value propositions, plus retries and regenerations.
- The page `/value-prop` is a different, internal page and is not part of this tool.

#### F.2.5 LinkedIn Profile Optimizer

**What it does.** Scores a visitor's current LinkedIn headline and About section on clarity and keywords, then asks AI for three new headlines, a rewritten About section and three positioning lines.

**Page and flow.** The landing screen and the lead form are on the same page (the form sits below the landing content). After the form: one input form, a loading screen, then results with a call to action.

**Inputs the visitor gives.**

| Field | Required | Limit on the server |
|-------|----------|---------------------|
| Current LinkedIn Headline | Yes | 220 characters |
| Current LinkedIn About Section | Yes | 2,600 characters |
| Role | No | 200 characters |
| Target ICP | No | Dropdown: CHROs, Talent Leaders, RevOps, Sales Leaders, Founders, Marketers, Other (Other shows a text box). 200 characters. |
| Tone Preference | At least one (starts with "bold") | Eight tones: bold, professional, casual, analytical, direct, persuasive, minimal, confident. Several can be chosen. |

The form itself does not stop long typing. The server rejects over-limit text with an error.

**What the visitor gets back.**

- Profile Clarity Score out of 100 with a verdict and reason.
- What's Holding Your Profile Back (a list of the failed checks).
- Optimized Headlines: Authority angle, Problem Solver angle, Social Proof angle, each with Copy.
- Optimized About Section (120 to 150 words, 3 short paragraphs) with Copy.
- Positioning Angles: Authority, Problem Solver, Social Proof, one line each.
- Keyword and ICP Relevance: a score, the keywords found, and up to 4 missing high-signal keywords.
- A Download as PDF button and a Book a Strategy Call block.

**How it works inside: the clarity score.** Plain code in the browser (`ProfileOptimizerClient.tsx`). It joins the headline and About text, makes it lower case, and starts at 100:

| Check | Points lost |
|-------|-------------|
| The chosen target audience is not mentioned (a trailing "s" is ignored) | 15 |
| No problem word (help, solve, fix, reduce, eliminate, improve, transform, accelerate, streamline, automate, simplify) | 20 |
| No outcome sign (any of %, x, million, billion, thousand, revenue, growth, increase, decrease, roi, saved, generated, closed, pipeline, or any digit) | 15 |
| A vague word is present (passionate, love, excited, making the world, journey, mission-driven) | 15 |
| No credibility word (ceo, cto, vp, director, head of, founder, co-founder, ex-, former, led, built, scaled, years, clients, companies) | 10 |

The result is limited to between 25 and 95. Verdicts: 75 or more "Strong positioning foundation", 55 to 74 "Room for significant improvement", below 55 "Your positioning needs work". The score colour switches at 70 and 50 (green, orange, red), which does not match the verdict cut-offs.

**Keyword score.** The 8 most frequent words (longer than 3 letters, minus a small stop-word list) are the "detected keywords". If the chosen ICP matches one of seven built-in lists (founders, ceos, chros, talent leaders, revops, sales leaders, marketers), the visitor is scored on how many of that list's words appear among the detected keywords. Otherwise a generic list (results, growth, impact, value, solution, expert) is used. Score = matches divided by the smaller of 5 and the list length, times 100, capped at 100 and never below 20.

**How it works inside: the AI part.** The browser posts to `/api/tools/profile-optimizer`. The server calls Gemini 2.5 Flash directly over its web interface (temperature 0.7) with a role of "LinkedIn positioning expert". Rules in the prompt: do not invent metrics or social proof, keep the About section 120 to 150 words in 3 short paragraphs, include a clear audience, problem and outcome, and never use the word "founder" unless it was in the original. The chosen tones are turned into short style instructions and blended. The reply must be JSON with headlines, an About section and positioning angles; the server also accepts JSON wrapped in code fences.

**Validation, errors.** 400 for a missing headline or About section, text over a limit, an unknown tone, or more than 8 tones. A rate-limit reply from Google is passed on as 429. If the AI reply cannot be read, the visitor sees an error and the form returns with everything they typed kept.

**What is saved.** Lead row with source `profile_optimizer`, Zoho form: the shared Myntmore lead magnet form. Supabase update: inputs are the form data; outputs are the full result set (scores, lists, headlines, About text, angles, keywords).

**Export.** PDF (jsPDF, loaded on click) named `profile-optimization-results.pdf` with the scores, headlines, About text, angles and keywords. Copy buttons on each headline and the About section.

**Related tools.** Founder Presence Analyzer, Posting Rhythm Builder, LinkedIn Hook Grader.

**Search settings.** Title "LinkedIn Profile Optimizer". Schema: WebApplication, HowTo, BreadcrumbList. No FAQs. Fifteen keywords such as "linkedin profile optimizer".

**Quirks and limits.**
- The outcome check looks for the letter "x" anywhere in the text, so nearly any English text passes it (for example "experience" or "expert"). Several other checks match inside longer words too ("led" inside "called"). The score is lenient.
- The word "founder" scores as a credibility sign, while the AI is told not to use it unless the visitor did.
- The Target ICP dropdown has no "CEOs" option even though a CEOs keyword list exists; it can only match through "Other".

#### F.2.6 DM Angle Generator

**What it does.** Writes five short cold DMs, each built on a different psychological angle, for a stated industry, role and offer, and lets the visitor rewrite any of them.

**Page and flow.** Landing screen and lead form share one page (the form is below the landing content). After the form, the visitor sees "Generate Your Angles" with three inputs, then the results below.

**Inputs the visitor gives.** All three are required.

| Field | Server limit |
|-------|--------------|
| Industry | 200 characters |
| ICP Role | 200 characters |
| Your Offer | 500 characters |

The input boxes do not stop typing. The server returns a clear error if a limit is passed. A Clear Inputs button resets the form. Behind the scenes the visitor's name and company from the lead form are also sent.

**What the visitor gets back.** Five cards in a fixed order: Emotional Angle, Authority Angle, Social Proof Angle, Curiosity Angle, Value-First Angle. Each card has the DM (2 to 4 sentences), a "Why this works" line, and these buttons: Copy DM, Regenerate, Shorter, More Formal, More Direct. At the top: Copy All, and rewrite-all buttons Shorter, More Direct, More Friendly. A Book Strategy Call block closes the page.

**How it works inside.** `/api/tools/dm-angles` calls Gemini 2.5 Flash with the role "expert at writing hyper-personalized, psychology-driven cold DMs". It must open with a pattern interrupt (no "Hi [Name]"), create curiosity, end with a soft question or offer, and feel personal. The five angles are fixed by name in a strict output format. If both the lead name and company are present, the prompt asks the AI to weave in the sender's identity. The server adds an id to each angle.

`/api/tools/dm-angles/regenerate` takes one existing DM and its angle name and asks for a fresh version in the same framework. The style options are: shorter (1 to 2 punchy sentences), more formal, more direct, more friendly, or a plain different variation.

**Validation, errors.** 400 if a field is missing or over its limit (generate) or if the angle is not valid (regenerate). A failed rewrite shows "Please try again". "Rewrite all" runs five requests at once and keeps the ones that worked; a message says how many failed.

**What is saved.** Lead row with source `dm_angle_generator`, Zoho form DMAngleGenerator. Supabase: inputs are industry, ICP role and offer; outputs are the five angles. The row is updated again after every regeneration, so it always holds the latest version.

**Export.** Copy one DM or copy all five.

**Related tools.** ICP Builder, LinkedIn Profile Optimizer.

**Search settings.** Title "Free DM Angle Generator for B2B Outreach". Schema: WebApplication, HowTo, BreadcrumbList. No FAQs. Fifteen keywords such as "dm angle generator".

**Quirks and limits.**
- The sender context is only used when both name and company exist, and company is optional on the form.
- The regenerate step receives only the old message and angle name. It does not get the industry, role or offer, so a rewrite can drift from the original brief.
- The regenerate route has no length limit on the message it accepts.
- The live page has no canonical Link header because of an exclusion in `next.config.js` written for the old Lovable setup (the page still has its HTML canonical tag).

#### F.2.7 Competitor Battle Card Generator

**What it does.** Researches a named competitor on the live web, then writes a one-page sales battle card tailored to the visitor's own offer.

**Page and flow.** Landing screen, lead form, input form, results with "Research Another Competitor".

**Inputs the visitor gives.**

| Field | Required | Server limit |
|-------|----------|--------------|
| Competitor Name | Yes | 200 characters |
| Competitor Website | No | 200 characters |
| Your Company Name | Yes | 200 characters |
| What You Sell, And To Whom | Yes | 1,000 characters |

If a value is too long, the server cuts it to the limit without telling the visitor.

**What the visitor gets back.** What They Do, Pricing (or a plain statement that pricing is not public), Their Strengths, Their Gaps, How To Position Against Them, 3 to 4 Objection Responses (objection plus answer), and a one-line research note reminding the rep to verify details before a live call. Copy buttons on each block and Copy all.

**How it works inside.** Two AI calls to Gemini 2.5 Flash, one after the other:
1. Research call, with Google Search turned on. It asks for what the company does, public pricing, strengths and weaknesses reported by real users. It is told to say so plainly if something cannot be found and never to guess a price. The answer is plain text.
2. Structuring call, with a JSON format and no search. The role is "sales enablement strategist". It may use only the research text, must not invent facts or numbers, and must make positioning and objection answers specific to the visitor's offer. Plain language, no em dashes or asterisks.

**Validation, errors.** 400 for a missing competitor name, company name or offer. 502 if the research comes back empty. Other failures return 500 and show the message in a pop-up notice.

**What is saved.** Lead row with source `battle_card_generator`, Zoho form Battlecardgenerator. Supabase: inputs are the four fields; outputs are the full card.

**Export.** Copy buttons only.

**Related tools.** ROI Calculator, Case Study and Proposal Generator.

**Search settings.** Title "Competitor Battle Card Generator". Schema: WebApplication, HowTo, BreadcrumbList. No FAQs.

**Quirks and limits.**
- The web sources Google finds are not shown to the visitor, so claims cannot be checked from the page.
- Two sequential AI calls plus live search is the slowest route. No maximum run time is set in the code (see F.5).
- The website field is only a hint inside the research prompt; the site itself is not read directly.

#### F.2.8 Case Study and Proposal Generator

**What it does.** Either turns a finished project into a website case study, or turns a prospect conversation into a proposal draft.

**Page and flow.** Landing screen, lead form, a choice screen ("What do you want to draft?"), then one of two forms, then results with a way back to the choice.

**Inputs the visitor gives.**

Case study mode:

| Field | Required | Server limit |
|-------|----------|--------------|
| Client Industry | Yes | 200 |
| The Problem | Yes | 1,000 |
| What You Did | Yes | 1,000 |
| The Result | Yes | 1,000 |
| Client Quote | No | 1,000 |

Proposal mode:

| Field | Required | Server limit |
|-------|----------|--------------|
| Prospect Company | Yes | 200 |
| Their Industry | Yes | 200 |
| The Problem They Shared | Yes | 1,000 |
| Decision Maker's Role | Yes | 200 |
| Budget Indication | No | 200 |
| How We Met | No | Choice: Referral, Inbound or Outbound |
| Past Wins to Reference | No | 1,000 |

Over-long values are cut to the limit by the server without notice.

**What the visitor gets back.**

- Case study: a headline, up to 3 headline numbers (only real numbers from the visitor's result text), The Problem, The Approach (2 to 3 phases), The Results, a pull quote (only if a client quote was supplied), and 2 to 4 "services used" tags.
- Proposal: Positioning ("We help ... to ... by ..."), Executive Summary, Understanding Your Challenge (in the prospect's own words), Our Approach (exactly 3 phases), Why Us (a short list), Investment, and Next Step.
- Copy buttons on each section and Copy all.

**How it works inside.** One call to Gemini 2.5 Flash with the mode's own prompt and JSON format. Both prompts demand plain language with no em dashes or asterisks. Case study rules: no invented numbers (fewer stats, even none, is fine), no invented quote, structure the notes into 2 to 3 phases without inventing activities, outcome-focused headline. Proposal rules: mirror the prospect's words, exactly 3 phases, "Why Us" only from the past wins given (otherwise generic points on process and communication), and the Investment text must be the fixed placeholder "Investment to be scoped based on your specific needs, happy to walk through pricing on a call." No price is ever invented.

**Validation, errors.** 400 for an unknown mode or a missing required field. Other failures return 500 with a notice.

**What is saved.** Lead row with source `case_study_generator`, Zoho form CaseStudyGenerator. Supabase: inputs are the mode and the fields; outputs are the draft.

**Export.** Copy buttons only.

**Related tools.** Lead Magnet Idea Generator, Competitor Battle Card Generator.

**Search settings.** Title "Case Study & Proposal Generator". Schema: WebApplication, HowTo, BreadcrumbList. No FAQs.

**Quirks and limits.** The case study text is for the visitor's own website. It is not checked for truth. The "stats" depend on the visitor having typed real numbers.

#### F.2.9 Lead Magnet Idea Generator

**What it does.** Suggests three concrete lead magnets (calculators, benchmark reports, audits, templates and similar) that a business could offer its customers in cold email and LinkedIn outreach.

**Page and flow.** Landing screen, lead form, input form, results.

**Inputs the visitor gives.** All required.

| Field | Server limit | Notes |
|-------|--------------|-------|
| What does your business do? | 1,000 | Free text |
| Target Audience / ICP | 300 | Free text |
| Industry | 100 | Dropdown: B2B SaaS, Manufacturing, Financial Services, Professional Services / Agencies, E-commerce, Healthcare / HealthTech, Real Estate, Recruitment / Staffing, Other (Other shows a text box that must be filled) |
| Preferred Tone | 100 | One of: Authoritative, Professional & Warm, Sharp & Direct, Friendly, Visionary |

The boxes do not stop long typing. The server returns an error over the limits.

**What the visitor gets back.** Exactly three idea cards. Each has a title, a pitch, "Why It Works", and "How to Use It" (a named channel and moment, such as the third email of a cold sequence). Each card has a Copy button that copies all four parts. A Book a Call block closes the page.

**How it works inside.** One call to Gemini 2.5 Flash. Role: "B2B outbound strategist who designs lead magnets founders can use in cold email and LinkedIn outreach". It must give exactly 3 distinct, buildable ideas tailored to the stated business, ICP and industry (not generic ebooks), apply the tone, avoid buzzwords, and name a specific channel and moment in the distribution field. The reply uses a fixed JSON format.

**Validation, errors.** 400 with a clear message for a missing field or an over-limit value. Other failures show "Failed to generate ideas: ..." on the form.

**What is saved.** Lead row with source `lead_magnet_ideas`, Zoho form LeadMagnetIdeas. Supabase: inputs are business description, ICP, industry and tone; outputs are the ideas.

**Export.** Copy per idea only.

**Related tools.** Case Study and Proposal Generator, DM Angle Generator.

**Search settings.** Title "Lead Magnet Idea Generator". Schema: WebApplication, HowTo, BreadcrumbList. No FAQs.

#### F.2.10 Posting Rhythm Builder

**What it does.** Builds a weekly LinkedIn posting plan around how much time the founder has, who they want to reach, and what they are good at.

**Page and flow.** Landing screen, lead form, input form, results.

**Inputs the visitor gives.** All required.

| Field | Options |
|-------|---------|
| Founder Lifestyle | I can post daily; 4–5 days/week; 3 days/week; Weekends only; Mornings only; Nights only |
| Preferred Tone | Authoritative; Professional & Warm; Sharp & Direct; Friendly; Visionary |
| Ideal Customer Profile (ICP) | Free text, up to 300 characters on the server |
| Content Strengths | Pick one or more of: Educational, Storytelling, Analytical, Contrarian, Inspirational, Humorous |

The visitor's name and company from the lead form are also sent, and the AI is told to use them.

**What the visitor gets back.**

- Best Posting Days (a short explanation, the days, and a best time window).
- Topic Cadence (what type of post goes on which day, plus the reasoning).
- Weekly Posting System (a day-by-day routine of actions).
- High Probability Post Ideas (category and idea).
- Scroll-Stopping Hooks (a list).
- Low-Friction CTAs (a list).
- A Download Full Operating Pack button and a Book a Call block.

**How it works inside.** One call to Gemini 2.5 Flash with a fixed JSON format. The brief is "a comprehensive B2B LinkedIn/X posting strategy for a founder". Rules: target senior leadership, avoid buzzwords and cringe hooks, no chatty filler, follow the format exactly, and give every time in both IST and GMT (for example "10:00 AM IST / 04:30 AM GMT").

**Validation, errors.** 400 if lifestyle, ICP, strengths or tone is missing, or the ICP is over 300 characters. Failure shows "Failed to build strategy: ..." on the form.

**What is saved.** Lead row with source `posting_rhythm_builder`, Zoho form PostingRhythm. Supabase: inputs are the form values; outputs are the whole strategy.

**Export.** "Download Full Operating Pack" opens the browser's print window (`window.print()`). It is a print or save as PDF through the browser, not a generated file.

**Related tools.** LinkedIn Profile Optimizer, Founder Presence Analyzer, LinkedIn Hook Grader.

**Search settings.** Title "Posting Rhythm Builder". Schema: WebApplication, HowTo, BreadcrumbList. No FAQs.

**Quirks and limits.** Times are always given in IST and GMT, whoever the visitor is. The plan says "LinkedIn/X" in the brief although the tool is presented as LinkedIn only.

#### F.2.11 Founder Presence Analyzer

**What it does.** Compares a founder's LinkedIn posting frequency and engagement with up to 5 competitors, gives a score, and asks AI for opportunities, a positioning recommendation and three headline ideas.

**Page and flow.** Landing screen, lead form, then three steps with a progress bar (Your Activity, Competitors, Content Themes), a "Ready for Analysis" screen, and a results dashboard.

**Inputs the visitor gives.**

| Step | Field | Options |
|------|-------|---------|
| Your Activity | Posts published in the last 30 days | 0; 1–2; 3–5; 6–10; 10+ (starts at 3–5) |
| Your Activity | Average engagement per post | <20 likes; 20–50; 50–100; 100–250; 250+ (starts at 50–100) |
| Competitors | For each competitor (1 to 5): name (required), posts per month, average engagement | Same option lists. The first competitor starts at 6–10 posts and 100–250 likes. |
| Content Themes | Topics the founder posts about, and topics competitors post about | Multi-select from 9 topics: Hiring / Recruiting, Recruiting Operations, AI & Automation, Product Updates, Industry Insights, Founder Journey, Customer Stories, Fundraising, Leadership & Culture |

The Continue button on the Competitors step stays disabled until every competitor row has a name.

**What the visitor gets back.**

- Founder Presence Score as a ring from 0 to 100, with a one-line AI insight.
- A comparison table (You and each competitor: frequency and engagement).
- An Engagement Gap chart (you against the competitor average).
- Key Opportunity Areas (3 to 4 points).
- A Positioning Recommendation (one paragraph).
- Three headline suggestions (Category Leadership, ICP Clarity, Bold Differentiation), each with a Copy Headline button.
- A Book a Strategy Call block.

**How it works inside: the score.** Plain code in the browser. The answer options are turned into numbers:

| Posts per month | Number used | Engagement band | Number used |
|-----------------|-------------|-----------------|-------------|
| 0 | 0 | <20 likes | 10 |
| 1–2 | 1.5 | 20–50 | 35 |
| 3–5 | 4 | 50–100 | 75 |
| 6–10 | 8 | 100–250 | 175 |
| 10+ | 12 | 250+ | 300 |

Competitor numbers are averaged. Frequency ratio = your number / competitor average. Engagement ratio works the same way. Score = (frequency ratio x 50) + (engagement ratio x 50), kept between 0 and 100. Matching the competitors on both gives exactly 100. If a competitor average is 0, that ratio counts as 1. (A built-in fallback of 8 posts and 150 engagement exists for "no named competitors" but the form does not allow that case.)

**How it works inside: the AI part.** The browser sends the answers and the calculated numbers to `/api/tools/founder-presence`. The server calls Gemini 2.5 Flash. Tone: direct, data-driven, slightly urgent. It asks for a short insight about the score, 3 to 4 opportunity points, one positioning paragraph, and 3 headlines. The reply uses a fixed JSON format.

**Validation, errors.** 400 if frequency, engagement, the topic lists or the calculated numbers are missing or the wrong type. Failure shows a notice about checking the connection.

**What is saved.** Lead row with source `founder_presence_analyzer`, Zoho form FounderPresence. Supabase: inputs are the answers plus the calculated numbers; outputs are the AI analysis.

**Export.** Copy Headline per suggestion. No PDF.

**Related tools.** LinkedIn Profile Optimizer, Posting Rhythm Builder, LinkedIn Hook Grader.

**Search settings.** Title "Founder Presence Analyzer". Schema: WebApplication, HowTo, BreadcrumbList. No FAQs.

**Quirks and limits.**
- The server trusts the score sent by the browser. It checks only that the numbers are numbers. It does not recompute them.
- One strong measure can hide a weak one. Posting three times as often as competitors can add 100 points on its own, so the score still reads 100 even with very low engagement.
- Engagement is measured as "likes" bands only, and the topic list leans toward hiring and recruiting.
- The AI prompt calls this a "Myntmore competitor tool", a leftover phrase that does no harm.

---

### F.3 The lead capture system

#### The form (LeadGate)

`components/tools/shared/LeadGate.tsx` is the one lead form used by nine tools and by the PDF pop-up of the LinkedIn ROI Calculator. The Cold Email ROI Calculator does not use it.

| Field on screen | Required | Limit | Name sent to Zoho |
|-----------------|----------|-------|-------------------|
| First Name | Yes | 255 characters | SingleLine |
| Last Name | Yes | 255 | SingleLine1 |
| Designation | Yes | 255 | SingleLine2 |
| Company | No | 255 | SingleLine3 |
| Phone | No | 20 | PhoneNumber_countrycode |
| LinkedIn URL | No | 2,083 | Website |
| Email | Yes | 255, must look like an email address | Email |

Checks run in the browser with a validation library (zod). Red messages show under a field (for example "Please enter a valid email"). The LinkedIn URL is not checked to be a real address, and the phone number is not checked for format.

Two hidden fields (`zf_redirect_url` and `zc_gad`) are sent empty, as the Zoho form expects. A third hidden field, `zf_referrer_name`, carries the first-touch source (see below). A short notice under the button says the details go to Myntmore's CRM (Zoho) and database, that what the visitor enters is saved with the record, and, for AI tools, that what they enter is sent to Google's Gemini so they should not enter confidential information or details about other people. It links to the privacy policy. The ROI Calculator pop-up does not show the Gemini sentence, because that calculator does not use AI.

#### What happens on submit

1. The browser checks the fields. If anything fails, the red messages show and nothing is sent.
2. The page submits the real Zoho form through a hidden frame, so the visitor never leaves the page. The lead lands in Zoho CRM. The browser cannot read Zoho's reply, so it cannot tell whether this worked.
3. At the same time the page loads the Supabase library and inserts a row into the `leads` table, asking for the new row's id back. The visitor always waits at least 0.6 seconds, so the screen does not flash.
4. The page moves on to the tool, whether or not step 2 or 3 worked. The id (if there is one) is held in the page's memory.
5. When the tool finishes, the tool's own page updates the same row with the visitor's inputs and the generated outputs, using the id.

Details are held in page memory only. If the visitor reloads or leaves, they see the form again next time.

#### Which Zoho form each tool posts to

| Tool | Lead source key | Zoho form name |
|------|-----------------|----------------|
| LinkedIn Profile Optimizer | profile_optimizer | Myntmoreleadmagnetform (shared) |
| LinkedIn Hook Grader | hook_grader | Myntmoreleadmagnetform (shared) |
| Posting Rhythm Builder | posting_rhythm_builder | PostingRhythm |
| Lead Magnet Idea Generator | lead_magnet_ideas | LeadMagnetIdeas |
| DM Angle Generator | dm_angle_generator | DMAngleGenerator |
| Founder Presence Analyzer | founder_presence_analyzer | FounderPresence |
| Case Study and Proposal Generator | case_study_generator | CaseStudyGenerator |
| Competitor Battle Card Generator | battle_card_generator | Battlecardgenerator |
| ICP Builder | icp_builder | ICPbuilder |
| ROI Calculator (LinkedIn) | roi_calculator | ROICalculator |
| Cold Email ROI Calculator | none | none |

All the forms use the same field names, so a new form needs no code change except its address.

#### The Supabase leads table

Defined in `supabase/schema.sql`. One table, `public.leads`, holds one row per form submission.

| Column | Type | What it holds |
|--------|------|---------------|
| id | uuid | Row id, created automatically |
| created_at | timestamp | When the row was made |
| source | text | The lead source key from the table above. A check rule allows only the 10 known keys. |
| name | text | First and last name joined |
| email | text | Email address |
| phone | text | Phone number |
| company_name | text | Company |
| company_website | text | Never filled by the code today |
| linkedin_url | text | LinkedIn URL |
| metadata | JSON | Currently only the designation |
| inputs | JSON | What the visitor typed into the tool (empty until the tool runs) |
| outputs | JSON | What the tool produced (empty until the tool runs) |

Row-level security is on. There are two rules: anyone (including anonymous visitors) can insert a row, and anyone can update a row. No read or delete rule is defined, so only the service role or the Supabase dashboard can read or delete rows. Because the database address and anonymous key are public in the website's code, the rules cannot tie an update to the person who created the row. The row id is a random uuid, which in practice protects it.

Each tool saves its own shape of data:

| Tool | inputs | outputs |
|------|--------|---------|
| ROI Calculator | The 12 calculator fields | Funnel counts, revenue, ROI (saved once, at first export) |
| Hook Grader | hook, audience | score total, three alternatives |
| ICP Builder | intake and profiles | ICP results and value propositions |
| Profile Optimizer | The form data | Scores, headlines, About text, angles, keywords |
| DM Angle Generator | industry, ICP role, offer | The five angles (re-saved after each regenerate) |
| Battle Card | The four fields | The card |
| Case Study and Proposal | mode and fields | The draft |
| Lead Magnet Ideas | The four fields | The ideas |
| Posting Rhythm | The form values | The strategy |
| Founder Presence | Answers plus calculated numbers | The AI analysis |

If a visitor runs a tool a second time with the same lead, the row is overwritten, so only the latest run is kept.

#### First-touch source tracking

Added on 11 November 2026 so a Zoho lead can be traced to where the visitor first arrived. Before, the Zoho field `zf_referrer_name` was always sent empty.

- `app/components/LeadSource.tsx` has `LeadSourceCapture`, mounted once in the site layout. On each page load it calls `captureFirstTouch()` in `lib/lead-source.ts`.
- The first touch is stored in the visitor's browser (local storage, key `mm_first_touch`) and is kept for 30 days. After 30 days the next visit becomes the new first touch. If storage is blocked, nothing breaks.
- What is stored: the time, the landing page path, a medium, a source and the campaign.
- How the medium is decided, in order: if the address has `utm_source` or `utm_medium`, the medium is the UTM medium (or "campaign") and the source is the UTM source. Otherwise, no referrer or a myntmore.com referrer is "direct". AI sites (chatgpt.com, chat.openai.com, perplexity.ai, claude.ai, gemini.google.com, copilot.microsoft.com) are "ai". Search sites (Google, Bing, DuckDuckGo, Yahoo, Ecosia, Brave) are "organic". Social sites (Instagram, LinkedIn, lnkd.in, Facebook, Twitter, t.co, x.com, YouTube, WhatsApp) are "social". Anything else is "referral".
- `LeadSourceField` is a hidden field named `zf_referrer_name`. At submit it holds one short string, for example `organic | google.com | landing /services | page /tools/linkedin-hook-grader`, at most 250 characters. With a campaign it reads `... | campaign spring | landing ...`. If no first touch exists it reads `unknown | page /path`.
- The same field is used by the site's other Zoho forms (the contact page, the lead capture form and the landing page form).
- The first-touch value goes to Zoho only. It is not saved in Supabase.

#### When a call fails

| What fails | What the visitor sees | What the team sees |
|------------|----------------------|--------------------|
| Form fields invalid | Red messages under the fields | Nothing |
| Zoho post | Nothing; the tool carries on | Nothing. The browser cannot see Zoho's reply, so a lost lead would go unnoticed. |
| Supabase insert (blocked, wrong source key, offline, library failed to load) | Nothing; the tool carries on | A line in the browser console only. No id comes back, so later saves of inputs and outputs are skipped for this visit. |
| Supabase update after the tool runs | Nothing | A line in the browser console only |
| AI call | An error notice or message on the form (details in each tool's section) | A line in the server log |

---

### F.4 How a tool is added or changed

Follow this list in order. Each step matches the code as it stands.

1. **Registry.** In `lib/tools-registry.ts`, add the tool to `TOOLS_REGISTRY` (slug, name, address, tagline) and to `RELATED_TOOLS` (two or three tools it should link to). Check that existing tools whose "try next" list should include it are updated too.
2. **Page file.** Create `app/tools/<slug>/page.tsx` with the title, description, keywords (the first keyword is the page's main keyword and should be unique on the site), the canonical address on www.myntmore.com, and social tags from `buildToolSocialMetadata`. Add `buildWebApplicationSchema`, a `Breadcrumbs` block (Free Tools, then the tool) and the client component.
3. **Client file.** Create `app/tools/<slug>/<Name>Client.tsx` for the visitor flow: landing, then `LeadGate`, then the form, then results. After the result arrives, update the lead row with `inputs` and `outputs` using the id from the gate (copy the Supabase update block from any existing tool).
4. **Screens.** Add `components/tools/<name>/LandingPage.tsx` with the HowTo schema, the headline, the start button and `<RelatedTools currentSlug="<slug>" />`.
5. **API route (AI tools).** Create `app/api/tools/<name>/route.ts`: check the inputs and limits, read the Gemini key from the server settings, call `gemini-2.5-flash` with a fixed JSON format, and return the JSON. Add rate limiting from `lib/rateLimit.ts` if the tool should have it, since the existing tool routes do not. Remember the visitor's text is sent to Google, so the privacy notice must still be true.
6. **Lead source key.** In `components/tools/shared/LeadGate.tsx`: add the key to the `LeadSource` type, add its Zoho form to `ZOHO_FORM_ACTIONS` (or point it at the shared form), and add it to `AI_SOURCES` if the tool uses AI so the Gemini sentence shows.
7. **Zoho form.** Create the Zoho form with the same field names the gate sends (SingleLine, SingleLine1, SingleLine2, SingleLine3, PhoneNumber_countrycode, Website, Email, and the referrer field), and put its address into the gate.
8. **Supabase.** Add the new source key to the `leads_source_check` list in `supabase/schema.sql` and run that statement in the Supabase SQL editor. Until it is run, inserts for the new key are rejected and only logged in the browser console (the Zoho lead is still created).
9. **Sitemap.** Add the address to `app/sitemap.ts`. After committing, run `npm run sitemap:dates` and commit the updated `lib/sitemap-dates.json`.
10. **Hub page.** Add a card to the `FREE_TOOLS` list in `app/resources/tools/page.tsx` and update the heading count. The hub does not read the registry.
11. **FAQs.** If the page should have FAQs, add `content/faqs/pages/tool-<slug>.json` (or edit it in the Keystatic admin), run `npm run faqs:build`, and build the FAQ section and `buildFaqSchema` from `pageFaqs("tool-<slug>")` as the Hook Grader does. The build runs this step automatically.
12. **Machine-readable site files.** Add the tool to `public/llms.txt`, and run `npm run llms:build` so `public/llms-full.txt` is refreshed.
13. **Check.** Run the page in the browser: the flow, the failed-AI path, and the Zoho and Supabase writes (a test lead appears in both). Check the sitemap and, after release, that Google can crawl the page.

To change an existing tool: edit its client or route, keep the input limits on the server and the screen in step, and re-run the sitemap dates script after committing.

---

### F.5 Known issues seen in the code

These were seen while reading the code. Items marked "unverified" could not be confirmed from the code alone.

1. **DM Angle Generator rewrite is a dead leftover.** `next.config.js` still rewrites `/tools/dm-angle-generator` to the Lovable app. The page now lives in this codebase, a page file takes priority over this kind of rewrite, and a live check on 11 November 2026 confirmed the site serves its own copy. The rewrite and the matching exclusion in the canonical-header rule should be removed. Side effect today: this one page has no canonical Link response header, unlike the other tool pages.
2. **Hub page says "9 tools" but shows 11.** The heading on `/resources/tools` reads "9 tools. Zero forms until you want the output." The list has 11 cards. The comment at the top of the registry also says 9. The hub keeps its own hard-coded list and does not read the registry, so the two can drift.
3. **Hub copy does not match behaviour.** "Zero forms until you want the output" and "No sign-up to try" are not quite true: nine tools show the lead form before the tool runs. The hub also opens every tool in a new tab.
4. **Supabase read rule (unverified).** The code inserts a lead and asks for the new row back, then updates the row by id. `schema.sql` defines no read rule for anonymous visitors. In Supabase this normally needs one. Either the live database has a rule that is not in the file, or the insert and updates are being rejected and only logged. This cannot be told from the code.
5. **Supabase source list (unverified).** The statement that allows the `hook_grader`, `case_study_generator` and `battle_card_generator` sources is in `schema.sql`, but whether it has been run on the live database cannot be seen from the code. An earlier project note recorded the hook grader statement as still pending.
6. **`schema.sql` header comments are out of date.** They list six tools and say the ROI Calculator does not use the table. In fact the ROI Calculator inserts and updates rows, and the table serves ten sources. The `company_website` column is never filled.
7. **Almost no rate limiting.** Only `/api/gemini` (used by the ICP Builder) limits requests. The eight AI routes under `/api/tools/` have no limit, no same-site check and, for the DM regenerate route, no length limit on the text it accepts. Limits that exist are held per server instance in memory, so they are a brake, not a hard cap.
8. **Error messages reach the visitor.** Routes return the raw error text, including "GEMINI_API_KEY is not configured" (the name only, not a key).
9. **Prompt cut in the ICP Builder fallback.** The last retry cuts the prompt to 2,000 characters, which removes most of the instructions.
10. **Profile Optimizer scoring is lenient.** The outcome check looks for the letter "x" anywhere, and several word checks match inside other words. The score colours (70 and 50) differ from the verdict cut-offs (75 and 55). Results still use green and red, which are off the site palette.
11. **Hook Grader first-person check is case sensitive** for "we", "my" and "our", so a sentence starting with "We" or "My" misses that point.
12. **Founder Presence score is computed in the browser and trusted by the server.** One strong measure can offset a weak one, and the "no competitors" fallback cannot be reached.
13. **The two ROI calculators use different models.** The LinkedIn one adds a 1 point closing uplift, spreads revenue evenly across months and has a mislabelled "Meeting Show-Up Rate". The cold email one models mailboxes, warm-up, follow-ups, sales lag and payback. Similar inputs can give different answers.
14. **Related tools do not match.** The Cold Email calculator page shows Battle Card and ICP Builder as "Try this next"; the registry says ROI Calculator and ICP Builder. On the other tools, "Try this next" only appears on the landing screen, not after the visitor starts.
15. **Form limits are mostly enforced only on the server.** Most input boxes do not stop typing. The server returns an error for over-limit text on most tools, but the Battle Card and Case Study routes silently cut the text instead.
16. **Posting Rhythm Builder always gives times in IST and GMT.** Its "download" is the browser print window.
17. **Zoho failures are invisible.** The browser cannot read Zoho's reply, so a lost lead gives no sign. Whether the Zoho forms map the referrer field into a CRM field is unverified. The Profile Optimizer and Hook Grader share one Zoho form, so they can only be told apart by the page path inside the referrer field.
18. **The first-touch source is not stored in Supabase,** only sent to Zoho.
19. **The visitor must re-enter their details each visit.** Nothing is remembered between tools or reloads.
20. **Battle Card research gives no sources.** The sources Google found are not shown.
21. **No maximum run time is set in code (unverified effect).** The Battle Card tool makes two sequential AI calls plus live search, and the ICP Builder can retry several times. Whether the hosting plan's time limit ever cuts these off was not checked.
22. **Benchmarks in the Cold Email calculator will age.** They are written into the code as 2026 figures.
