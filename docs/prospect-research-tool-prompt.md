# Build prompt: Prospect Research tool

How to use: open Claude Code in this repo and paste everything below the line, or say
"Build what's in docs/prospect-research-tool-prompt.md". Written 12 Nov 2026.

---

## Goal

Build a free tool at `/tools/prospect-research`. A visitor enters their own company. The tool finds
10 companies that look ready to buy from them right now, researches each one, and shows the result
as a scored, sourced report that looks and works like `/research/myntmore`.

Every answer in the report must link to a real public source with a date, or say "No evidence found".
That is what makes the report worth reading. Accuracy matters more than finding 10 companies: if only
7 good prospects can be found, show 7.

## What already exists (reuse it, do not rebuild it)

Read these before writing code:

- `components/research/ResearchReport.tsx`: the report layout, table, expandable evidence, tier filter,
  sort and CSV download. The results page must render through this component.
- `lib/research-types.ts`: the `Account`, `Answer` and `Verdict` types.
- `lib/research-scoring.ts` and its tests: rule-based fit, timing and tier, plus `parseSourceDate`,
  `latestSignalDate` and `ago`. Scores must come from this code, never from the model.
- `app/research/myntmore/` (data.ts and MyntmoreResearchClient.tsx): the reference for the questions,
  the method text, the footnote and the report config. Match its tone.
- `app/tools/battle-card-generator/` and `app/api/tools/battle-card-generator/route.ts`: the tool page
  pattern (landing, then lead form, then input form, then results) and the two-step Gemini pattern
  (a search-grounded research call, then a separate structured-output call). Search grounding and a
  strict response schema could not be combined in one call there. Keep the two steps unless you confirm
  the current model supports both together.
- `components/tools/shared/LeadGate.tsx`: the lead form. Add a `prospect_research` source. Ask me for
  the Zoho form action URL for this tool; do not reuse another tool's.
- `lib/rateLimit.ts`: an in-memory, per-instance limiter. Use it, but it is not enough on its own
  (see "Abuse and budget protection").
- `lib/tools-registry.ts`, `lib/schema.ts` (`buildWebApplicationSchema`), `lib/tool-social-metadata.ts`,
  `app/components/Breadcrumbs.tsx`, `app/components/JsonLd.tsx`, `app/components/InnerLayout.tsx`.
- `supabase/schema.sql`: add new tables here and give me the SQL to run by hand.
- `docs/website-bible.md`, Part 8 and Appendix A.2: the design rules (summarised below).

To find every place a tool is wired in (registry, tools hub, sitemap, cross-links, footer, llms files),
search the repo for `battle-card-generator` and mirror each one.

## User flow

1. **Landing:** what the tool does, a sample of the output (link to `/research/myntmore` as a
   live example), and a start button.
2. **Lead form:** `LeadGate` with source `prospect_research`.
3. **Input form:**
   - Your company website (required).
   - What you sell, in a sentence (required).
   - Who you sell to: industry, company size, regions (optional; the tool works it out if empty).
   - Companies to exclude, such as existing clients or competitors (optional, one per line).
4. **Profile check:** show what the tool understood about the company and its ideal customer, with an
   "Edit" option, before spending money on the search. One click to continue.
5. **Results:** the report renders immediately with placeholders. Each prospect appears as soon as its
   research finishes, with a "Researching 6 of 10" progress line. The CSV download works once all are done.

## Architecture

Split the work into short API requests that the browser calls in sequence, then in parallel. One long
request would hit Vercel's function time limit. Set `export const maxDuration` on each route and keep
every route comfortably under it.

1. `POST /api/tools/prospect-research/profile`
   - Fetch the company's homepage directly on the server (timeout about 8s), so "what does this company
     do" comes from the page itself, not from the model's memory.
   - One search-grounded call: summarise the offer and define the ideal customer (industries, size,
     regions, the buyer's role).
   - Returns the profile and the 7 question texts adapted to this offer (see below).
2. `POST /api/tools/prospect-research/discover`
   - Search-grounded: find 15 to 20 candidate companies that match the ideal customer **and** have a
     dated public signal from the last 12 months (funding, hiring for relevant roles, new leader, new
     product or market, expansion).
   - Remove the user's own company, the exclusion list and duplicates. Check each candidate's domain
     resolves. Pick the best 10 by strength and recency of signal.
3. `POST /api/tools/prospect-research/account` (one call per prospect; the browser runs up to 5 at once)
   - Step A, search-grounded research call: answer the 7 questions for this company. Each answer gets a
     verdict (yes, likely, no), one plain sentence, a source URL and a date.
   - Step B, formatting call on the cheaper model: turn step A's text into the `Answer[]` shape, plus a
     `pitch` (how this user should open) and `who` (the role that usually owns this problem; never a
     person's name).
   - Step C, source check (in code, no AI):
     - Gemini search results come back as `vertexaisearch.cloud.google.com/grounding-api-redirect/...`
       links that expire. Resolve each one to its final URL before saving.
     - Fetch every source URL with a normal browser user-agent and an 8s timeout.
     - If a page returns 404 or the domain does not resolve, remove the link and lower the verdict one
       step (yes to likely, likely to no).
     - If a page loads but does not mention the company name, also lower the verdict one step.
     - Many sites (SEC, BusinessWire, drugs.com) return 403 to scripts. Keep those links and mark
       them as not checked automatically; do not downgrade them.
   - Step D: compute `fit`, `timing` and `tier` with `lib/research-scoring.ts`, and `when` with
     `latestSignalDate` and `ago` against the run date.

## The seven questions and scoring

Keep exactly the seven slots and weights that `lib/research-scoring.ts` already uses, so scoring stays
rule-based and identical to `/research/myntmore`. The wording of each question can be adapted to the
user's offer in the profile step, but the meaning of each slot is fixed:

| Slot | Meaning | Fit points | Timing points |
| --- | --- | --- | --- |
| Q1 | Matches the ideal customer (industry, size, region, how they buy) | 25 | - |
| Q2 | Raised funding in the last 12 months | 15 | 3 if within 90 days, else 2 |
| Q3 | Said it will invest in the area this offer serves | 20 | 2 |
| Q4 | Hiring now for roles this offer helps with or replaces | 20 | 2 |
| Q5 | New leader in the buyer's role in the last 12 months | 10 | 2 |
| Q6 | New product, market or region in the last 12 months | 10 | 1 |
| Q7 | Risk: already uses a direct competitor or does this in-house | -15 yes, -7 likely | - |

A "likely" earns half the points, as in the existing code. If `research-scoring.ts` needs changes to
support this, update its tests too, and confirm both `/research` pages still show the same scores.

## Research rules (put these in the prompts)

- Every "yes" or "likely" needs a public source URL and a date. With no source, the answer is "no",
  with the text "No evidence found".
- "Likely" means the evidence is older, indirect or only partly confirmed.
- Signals older than 18 months do not count.
- Dates must be in a format `parseSourceDate` understands: "6 Aug 2026", "Aug 2026" or "2026-08-06".
  Careers pages without a date get "checked <run date>". Those dates are ignored when working out "when".
- Never invent facts, numbers, funding amounts or links. Never include a person's name; give a role.
- Plain, direct English. No jargon, no buzzwords, no em dashes, no asterisks.
- Each research call should use no more than about 6 searches. Searches are the main cost.

## Models and cost

- Model names live in env vars with defaults:
  - `PROSPECT_RESEARCH_MODEL`, default `gemini-3.8-flash`, for the search-grounded steps.
  - `PROSPECT_FORMAT_MODEL`, default `gemini-3.1-flash-lite`, for formatting.
- Check both model IDs against Google's current model list before coding. Do not use
  `gemini-2.5-flash`: Google has deprecated it and moves it to 3.8 Flash on 1 Dec 2026.
- Expected cost: about $1.10 to $1.30 per run, with Google Search at $14 per 1,000 searches as the
  biggest part (5,000 free a month). Token prices for 3.8 Flash double on 1 Jan 2027.
- Log every Gemini call to a Supabase table `ai_usage_log`: run id, step, model, prompt tokens, output
  tokens, thinking tokens, tool-use tokens, the number of searches (`webSearchQueries` in the grounding
  metadata), duration and estimated cost. I need real numbers, not estimates.

## Caching

- Table `prospect_research_cache`, keyed by prospect domain plus a hash of the 7 question texts.
  Reuse an entry younger than 7 days instead of researching again.
- Table `prospect_research_runs`: one row per run with the inputs, the profile, the final accounts,
  the lead id, timings and total cost. Also save inputs and outputs onto the lead row, as the other
  tools do.

## Abuse and budget protection (required before launch)

This tool costs real money per run, so the API must not be callable by anyone without limits.

- Every API route requires a lead id. Check on the server that the lead exists in Supabase, has source
  `prospect_research` and was created in the last 24 hours. If that needs a server-only Supabase key,
  tell me which one; do not weaken the check.
- Limits: 2 runs per email per day and 5 per IP per day, counted in Supabase (durable), plus
  `lib/rateLimit.ts` per request.
- A global daily cap in env `PROSPECT_RESEARCH_DAILY_RUN_CAP`, default 30. Over the cap, show a
  friendly "We're at capacity today. We'll email your report tomorrow." and store the request. Google
  also caps search at about 1,500 requests a day on Gemini 3 models, so this cap protects the other
  AI tools too.
- Validate and trim every input (lengths, URL format). Return friendly errors, never raw error messages.

## Speed

- Target about 1.5 to 2.5 minutes per run, with the first prospects shown in under a minute.
- Research prospects in parallel (up to 5 at once). Never one after another.
- If one prospect fails, retry it once, then show it as "Could not research" and continue. Never lose
  the whole run because one call failed.

## Design: use the website's own design sense only

Do not invent a new look and do not add fonts, colours or UI libraries. The results must look like
`/research/myntmore`, and the rest of the tool like the site's other tool pages after the 22 Oct
restyle. The rules (from `docs/website-bible.md`, Part 8 and Appendix A.2):

**Colours.** Plain hex values, written inline as the rest of the site does.

| Use | Hex |
| --- | --- |
| Page background (never pure white pages) | `#F8F6F2` cream |
| Cards | `#FFFFFF` with a 1px `#E8E2D9` border |
| Headings and main text | `#0A0A0A` |
| Body text | `#52525B` |
| Muted text | `#71675E` |
| Brand gold: fills, borders, dots, underlines only, never text on light backgrounds | `#F5B731` |
| Gold as text on light backgrounds | `#A14A08` (`GOLD_TEXT` in `lib/colors.ts`) |
| Orange accent (dots, Tier 1) | `#EA580C`, text version `#9A3412` |
| Soft gold panels | `#FEF9EC` |
| Gold borders | `rgba(245,183,49,0.35)` to `0.5` |
| Risk only | `#B91C1C` |

- Free tools use orange and gold on cream only. No blue, teal, purple or green accents, no red
  theme (the battle card page's red is a known mistake), and no dark sections, panels or banners.
- Any coloured text goes through `textTone()` from `lib/colors.ts` so it passes 4.5:1 contrast.
- Decorative blurred blobs: gold and orange only, `aria-hidden`, `pointer-events-none`, inside a clipped
  section. `ResearchReport.tsx` has one lavender blob; do not copy it. If you change the shared component,
  check `/research/kmspharma` and `/research/myntmore` still look right.

**Type.** Inter only (already loaded). Headings `font-black` (weight 900) with `text-wrap: balance`.
Page H1 `text-4xl sm:text-5xl`. Small labels above headings `text-xs uppercase tracking-widest`.
Highlight one phrase of the H1 in `#A14A08` (as in "Who to contact this month, *and why now.*").
No all-caps body text, no forced tight tracking, nothing smaller than 12px.

**Components.**
- Primary button: the `btn-dark` class (a light cream pill with a gold border and bold black text;
  the name is historical). Secondary: `btn-ghost`. Do not hand-style new buttons.
- Cards: `rounded-2xl`, white, `#E8E2D9` border, shadow `0 24px 70px rgba(15,15,20,0.06)`.
- Gold pill badge above the H1, as on the other tool pages, in gold rather than the battle card's red.
- Loading state: calm and on-brand. A progress line, the table with soft placeholder rows, and each
  row filling in. No spinners over the whole page.

**Layout and accessibility.**
- Wrap the page in `InnerLayout`, with `Breadcrumbs`: Free Tools, then Prospect Research.
- Mobile first: single-column base grids, 16px side padding, no sideways page scroll.
  Tables sit in a horizontal scroll wrapper.
- Tap targets at least 44px (`min-h-[44px]`).
- Every animation respects `prefers-reduced-motion`.

**Voice.** Short, plain sentences, as on `/research/myntmore`. Say what the tool did and why each
company is on the list. No hype, no em dashes.

## Page, SEO and wiring

**The tool stays hidden for now.** It must work at its URL, but nobody should find it:

- `app/tools/prospect-research/page.tsx`: metadata with `robots: { index: false, follow: false }`
  (as on `/research/kmspharma`), a title under 60 characters and a description under 155, and
  `Breadcrumbs`. Leave out the canonical, keywords, social metadata and the `WebApplication` schema.
  They are for launch.
- Do **not** add it to `lib/tools-registry.ts`, the `/resources/tools` hub, `app/sitemap.ts`,
  `app/sitemap/page.tsx`, the navbar, the footer, `public/llms.txt`, `public/llms-full.txt` or any
  "Try this next" list, and do not link to it from any page.
- Search the repo for `battle-card-generator` and write down, in the PR description, every place a
  public tool is wired in, so launching later is a short checklist.
- Results stay on the page; they are not indexed.
- The report's closing call to action: "Want us to run the outreach to these accounts?", linking to
  `/book-a-call`. Include the line that the companies named have not reviewed or endorsed the research.

## Tests and checks

- Vitest tests for the source check (404 and DNS failure downgrade, 403 kept, redirect links resolved),
  the exclusion and dedupe logic, and any change to the scoring.
- `npm run build` and the full test suite pass.
- Run the whole flow locally with the dev server on two real companies of different kinds (for example
  a B2B SaaS company and an Indian manufacturing or pharma company). Report, for each run:
  - time to the first prospect and in total;
  - the real cost and number of searches, from `ai_usage_log`;
  - how many answers the source check downgraded or removed.
- Screenshots on desktop and phone width.
- If the measured cost is over $1.30 a run or the time is over 2.5 minutes, tell me and propose fixes.
  Do not quietly switch models.

## Rules for this repo

- `master` deploys straight to production, and another session also pushes to it. Fetch and merge
  first, work on a new branch, and ask me before merging or pushing to `master`.
- Give me the Supabase SQL to run by hand; do not assume the tables exist.
- Ask me for the Zoho form action URL and any new environment variables. Never print keys.
