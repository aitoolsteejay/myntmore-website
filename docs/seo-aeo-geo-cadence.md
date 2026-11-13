# SEO / AEO / GEO Recurring Task Cadence

Reference checklist for ongoing site health across three related but distinct goals:

- **SEO** (Search Engine Optimization) - ranking in traditional Google/Bing search results.
- **AEO** (Answer Engine Optimization) - being the direct answer in Google's AI Overviews, People Also Ask, and voice assistants. Driven mostly by structured data (schema.org JSON-LD) and tightly-formatted direct-answer content.
- **GEO** (Generative Engine Optimization) - being cited or mentioned by generative AI chat tools (ChatGPT, Perplexity, Claude, Gemini) when someone asks them a relevant question. Driven by crawlability, `llms.txt`, citation-worthy original data, and clear factual claims with sources.

The three overlap heavily in practice (good structured data and direct-answer FAQs serve all three at once), so most tasks below aren't labeled as belonging to just one.

## Triggered - every time a page is added or changed

Not calendar-based; do these as part of shipping the change itself, same commit where possible.

- [ ] **Keyword collision check** - run the script in `docs/keyword-map.md`'s "Method" section before publishing. No two pages should share a primary keyword.
- [ ] **Full schema pass** - Breadcrumb on every page; Article/Service/JobPosting/HowTo as the page type calls for; FAQPage if the page has an FAQ section. See `lib/schema.ts` for the builders.
- [ ] **Sitemap entry** - add the URL to `app/sitemap.ts` (no date to type), commit, then run `npm run sitemap:dates` and commit `lib/sitemap-dates.json`. Dates are derived from git history, not hand-typed; `npm run sitemap:check` fails when they are stale. After a sitewide mechanical edit (formatting, import paths, a byline line), add its commit to `scripts/sitemap-dates-ignore.txt` first so it does not re-date every page.
- [ ] **Title/description length** - title ≤60 chars including the auto-appended `| Myntmore`, meta description ≤155 chars with a CTA.
- [ ] **Bidirectional internal linking** - new page should link out to at least one relevant existing page, and get a real inbound link from at least one relevant existing page (not just added to a nav/footer list and left orphaned everywhere else).
- [ ] **FAQ answers formatted for snippets** - question as the heading, direct claim in the first sentence (no "it depends"-style hedge openers), ~40-60 words or tighter. See `docs/featured-snippet-audit.md`'s method.
- [ ] **`public/llms.txt`** - update if the change is a new service, a structural page, or a name/URL change to something already listed. Its own footer note requires this; a blog post doesn't need an entry, a new service or major page does. `public/llms-full.txt` is generated on every build from the page metadata, `lib/service-answers.json` and `lib/entity-facts.json`; change those, not the file. `npm run audit:links` checks every URL in both.
- [ ] **New or changed service** - add or edit its entry in `lib/service-answers.json` (the 40-60 word definition shown at the top of the page and reused in `llms-full.txt`; `npm run audit:answers --strict` checks the length) and its row in `lib/internal-paths.ts` (the service -> case study -> guide -> consultation path).
- [ ] **New article or guide** - call `buildArticleSchema` with real `datePublished`/`dateModified` and render `<ArticleMeta schema={...} />` under the title (or use `BlogArticle`, which does it). Change `dateModified` whenever the content changes: the visible "Updated" date is read from it.
- [ ] **Case study library** - the 50 industry case studies (5 per industry, real client work with names withheld) live in `lib/case-study-library.json`: edit the text there, then `npm run case-studies:build` (writes the pages under `app/case-studies/` and the marker-delimited block of 50 entries in `app/sitemap.ts`; `case-studies:check` fails if either drifts). They are indexable, in the sitemap and `llms-full.txt`. The sample testimonials from the source copy are deliberately not published (the source labels them samples; the site removed fabricated testimonials in 3e79c28 and the editorial policy rules out invented client statements). Add a testimonial only when the client actually said it. The 20 case studies written page by page under `app/case-studies/` use the same layout (`components/case-studies/CaseStudyLayout.tsx`) and have their own hand-written sitemap entries. Every case study on the site is real client work, so nothing on a case study page may be labelled illustrative or hypothetical.
- [ ] **Before merging a batch of changes** - `npm run build`, then `npm run audit:links` (broken links, redirect chains, sitemap, canonicals, retired routes, llms files) and `npm run audit:entity` (conflicting proof-point numbers).
- [ ] **No fabricated stats** - real numbers only, or explicit "new offering, no track record yet" framing when there isn't a real number to cite (see `docs/content-gaps.md` and the GTM Strategy / fundraising pages for the pattern).

## Weekly

- [ ] Skim Google Search Console for new indexing errors, manual actions, or coverage drops. *(Needs GSC access confirmed/connected - flagged below.)*
- [ ] If multiple people touched the repo that week: run `tsc --noEmit` + `npm run build` once to catch drift before it compounds.

## Monthly

- [ ] Re-run the keyword-collision script sitewide, even with no new pages shipped - catches keyword edits made outside the "new page" checklist above.
- [ ] `npm run audit:jobs`: each job posting's structured data has a `validThrough` date (a rolling 6-month window); past it Google for Jobs silently drops the posting. Extend any that end within 45 days (add `--strict` to fail on that). It also checks every posting offers only founder@ and growth@myntmore.com.
- [ ] Broken internal-link sweep (same method used in the free-tools cross-linking pass).
- [ ] Publish 1-2 pieces of content from the `docs/content-gaps.md` backlog. Steady cadence beats sporadic bursts for both SEO freshness signals and GEO surface area (more indexed, citable pages).
- [ ] Spot-check the one known off-page stale listing (Edverise) and scan for any new ones - third-party directories drift independent of the site's own changes.
- [ ] **GEO citation spot-check**: run the prompts in `docs/ai-visibility-tracker.csv` through ChatGPT, Perplexity, Claude, and Gemini and log the result (procedure and how to turn gaps into work: `docs/ai-visibility-tracking.md`). No API exists for this today - needs a human at the keyboard, but paste results back and I can help analyze and act on what's missing.
- [ ] `npm run audit:answers` - answer-length report across every FAQ (the 40-60 word guideline); chip away at the files with the most misses.

## Quarterly

- [ ] Full re-run of the featured-snippet audit (`docs/featured-snippet-audit.md`) - more content accumulated means more chances to drift on word count or hedge-openers.
- [ ] Full internal-linking review of everything shipped in the past quarter - confirm bidirectional links didn't get missed under time pressure.
- [ ] Structured-data validation pass - run each page type through Google's Rich Results Test / schema.org validator. Catches silent breakage from a framework upgrade or refactor that the build doesn't surface as a TypeScript error.
- [ ] E-E-A-T consistency sweep - scan for stale or contradicting stats across the site (the pass done earlier: case-studies stat strip vs. sitewide figures). Drifts naturally as new case studies and posts get added with slightly different numbers.
- [ ] Backlink/citation audit - new mentions, lost links, spam links worth disavowing. *(Needs an Ahrefs/Semrush-class tool - flagged below.)*
- [ ] Rank tracking review - trend on target keywords. *(Needs a rank-tracking tool - flagged below.)*

## Semi-annual / Annual

- [ ] Refresh the benchmark report (`/blog/b2b-outbound-benchmark-report-2026`) with updated aggregate data. Its value for both SEO citations and GEO/LLM citations depends on staying current - a report visibly two years stale loses credibility fast.
- [ ] Full content audit - which older pages are underperforming and need a rewrite, consolidation, or redirect, vs. which are working and deserve more internal links pointed at them.
- [ ] Re-evaluate keyword/service strategy - has the market shifted enough to warrant a new service or `/lp/*` page (the pattern behind GTM Strategy and the fundraising page this year)?

## Needs the user's own accounts/tooling, not something executable from here

- Google Search Console - confirm connection status, review it directly for the weekly/monthly items above.
- Backlink/citation audit tool (Ahrefs, Semrush, or similar) for the quarterly item.
- Rank tracking tool for the quarterly item.
- Dedicated GEO/AI-citation tracking (Profound, Otterly, or similar) if manual monthly spot-checks stop being enough - these platforms automate what the monthly GEO check above does by hand.
- Benchmark report distribution/outreach (PR, newsletter placements, etc.) to actually get it cited elsewhere, not just published.

## Checkpoint: 2026-10-10

- GSC Wizard now has active owner access to the domain and both URL-prefix properties. The earlier GSC-access prerequisite is resolved.
- Live audit of 15 high-impression URLs: no critical or high findings. Five medium findings concerned nested Organization logos; one low finding was the expected non-www redirect.
- Added the existing logo to article authors, service/tool providers, event organizers and profile employers. A production re-audit is still needed after deployment.
- Google URL Inspection confirms the homepage is submitted and indexed, with crawling and indexing allowed. This does not verify every URL.
- Both registered sitemaps report zero errors and warnings. Their reported indexed count of zero is not evidence of sitewide deindexing.
- Production build passed with 204 generated pages. Optional Medium feed fetching failed DNS resolution without failing the build.
- Checked 146 indexable built HTML files for titles, descriptions, www canonicals and valid JSON-LD: no missing fields or invalid JSON. No duplicate primary keyword strings across service, tool, blog and vertical landing-page arrays. This is not a real query-level cannibalization test.
- GSC opportunities for September 10 through October 7: `gtm` has 331 impressions and zero clicks; `b2b lead generation companies in pune` has 60 impressions, one click and average position 13.33. Review query-to-page intent before changing content; these are not guaranteed click gains.
- Still open: full URL-level indexing review, query/page cannibalization, broken-link sweep, Core Web Vitals, content backlog reconciliation and off-page/citation work. Recurring publishing and outreach remain ongoing.

## Checkpoint: 2026-10-14

Shipped on branch `seo-aeo-geo-upgrade` (not yet merged):
- **Reliability.** Inter, Caveat and Fredoka are self-hosted (`app/fonts`), so `next build` no longer fetches Google Fonts. Sitemap `lastmod` comes from git (80 of 168 hand-typed dates were stale). `npm run audit:links` crawls the built site: 207 pages, 13,252 internal links, 0 broken, 0 redirect problems, retired cold-email routes absent from sitemap, links, redirects, `llms` files and audit data. The Supabase client now loads on demand, cutting first-load JS by about 50 kB (roughly 25%) on all nine tool pages.
- **Service pages.** A direct-answer block under every service hero; Service, FAQPage, HowTo and BreadcrumbList JSON-LD restored on the cold email page and HowTo added to the LinkedIn page; cold email FAQ answers expanded; each service page and real case study now carries a deliberate path to the next step (`lib/internal-paths.ts`).
- **Decision-stage content.** Three comparison posts (LinkedIn agency vs manual, AI vs traditional lead gen, personal branding agency vs freelancer).
- **Trust and GEO.** `/editorial-policy`; a visible "By Myntmore, Updated <date>" line on 34 posts and guides; a data-use notice on every tool sign-up; rewritten `llms.txt` and generated `llms-full.txt`; a monthly AI-visibility tracker.

Still open, and why:
- **Founder claims in the 58-meetings guide.** Its author bio adds $80M+ revenue and 100,000 students, which appear nowhere else. Someone who knows the business has to confirm them. (The client count itself is settled: every page now says 130+, following 76daf7f; the 120+ bios were updated in 01b28fc. The one remaining "300 clients" that `npm run audit:entity` reports is the guide quoting a weak line to avoid, not a claim.)
- **Privacy policy** does not mention Google's Gemini API or the Supabase database the tools use. The tool notice describes them; the policy should too.
- **Third-party scripts.** GA4, the Meta Pixel and Ahrefs Analytics all load `afterInteractive`. Moving the Pixel and Ahrefs to `lazyOnload` would cost some page views from very short visits, so that is a marketing decision, not applied.
- **Real benchmark and external work.** New benchmark data needs real campaign data; citations, PR, directories and interviews happen off-site (`myntmore-ai-visibility-checklist.md`).
- **Case studies** still lack a "what we would do differently" section; that needs the real story from each engagement.
- **FAQ lengths.** All FAQ answers sit in the 40 to 60 word range as of 2026-11-13 (`npm run audit:answers` to recheck).
- Core Web Vitals field data still needs PageSpeed Insights / CrUX on the deployed site; the build measures payload, not LCP, CLS or INP.

## Re-auditing later

Every checklist item that says "re-run the script/method" points to a doc that already contains that exact, mechanical method (`docs/keyword-map.md`, `docs/featured-snippet-audit.md`, `docs/content-gaps.md`). Update this file itself whenever a new recurring pattern gets established, the same way those docs get updated when they're re-run.
