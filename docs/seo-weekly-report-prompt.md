# Weekly SEO report PDF: prompt to paste into any chat

Paste everything inside the box into a new Claude chat that has the Search Console, Zoho CRM and Vercel connectors and
can run shell commands in the myntmore-website repo. It produces the weekly SEO report as a PDF in the same layout as
`docs/seo-report-2026-10-20-week3.pdf`. Replace Part 7 with the latest week's numbers each time. Last updated 23 Nov 2026.

```text
You are producing Myntmore's WEEKLY SEO REPORT as a PDF for myntmore.com. The deliverable is a 9 to 11 page A4 PDF in
Myntmore's colours, built from live data, in the same layout as the previous weeks' reports (newest docs/seo-report-*.pdf
in the repo is the reference). Follow the data rules in Parts 2 and 3 EXACTLY: week-over-week movement is only meaningful
if the method never changes. If a rule must change, say so in the appendix and restate last week under the new rule.

PART 0. GROUND RULES
- Week = Monday 00:00 to Sunday 23:59, IST. Default to the last COMPLETED week. Week 1 was Mon 28 Sep to Sun 4 Oct 2026,
  so Week N starts 28 Sep + 7*(N-1) days (week 8 = 16 to 22 Nov). If I give dates, use mine.
- Search Console lags 2 to 3 days and revises recent days. Name the days that may still change and mark any partial day.
- Never invent a number. If something cannot be pulled, print "not measured" and explain why in the appendix.
- Zoho data contains personal data. Use only Lead_Source, Lead_Source_Type, Created_Time (and Email only to spot
  duplicates, never printed). No names or emails in the PDF or in chat.
- Tool outputs too large for chat are saved to a file: process them with Python, never by eye. Recount any total a
  subagent gives you; a subagent's prose can contradict its own table.
- Use absolute paths in every shell command (a bare cd can reset the working directory). Run independent tool calls in
  one parallel message.
- Do not commit, push or change the site. Write only the report files.

PART 1. TOOLS AND IDENTIFIERS
- Search Console property: sc-domain:myntmore.com (NOT the https://myntmore.com/ URL-prefix property).
- Vercel Analytics project prj_vd4uktjtfBS9nfUVC2xxEAzYeIxA, team team_gsSo95qOCAOfp7ZG6uQKGElO.
- Zoho CRM modules: Leads and Contacts.
- Repo: myntmore-website, branch master. Crawler: scripts/seo-crawl.py. Logo: public/logo.png.
- Live site https://www.myntmore.com. Sitemap https://www.myntmore.com/sitemap.xml.
- Last week's numbers: use the newest docs/seo-report-*.pdf and docs/seo-weekly-run-*.md; if absent, use Part 7, or ask me.

PART 2. THE 11 SCORECARD KPIs (exact definitions)
1. ORGANIC LEADS. Zoho Leads AND Contacts, Lead_Source = "Website", Created_Time inside the week (IST). Website enquiries and
   booking-form calls land in Contacts, not Leads. Use zoho_list_records with fields=Lead_Source,Lead_Source_Type,Created_Time
   sorted by Created_Time desc (add Email only to spot repeats). Report the raw count, how many look like tests (an
   @myntmore.com address, gibberish, the same email twice within minutes) and any Lead_Source_Type such as "Google search".
   It is an UPPER BOUND: site forms record no referrer, so organic search cannot be split from direct or Instagram.
   Ignore bulk imports (for example Lead_Source "ASCENT"). For context only, list the other sources that week (Lead Magnet,
   WhatsApp, LinkedIn Inbound, ...) and state they are not in the KPI.
2. NON-BRAND CLICKS and 3. NON-BRAND IMPRESSIONS. Search Console, dimension query, row_limit 5000, the week's dates. Exclude
   queries matching (case-insensitive) myntmore|mintmore|mint more|mint and more|tejas jhaveri. The tool's `filters`
   parameter fails with several filters, so pull ALL rows and apply the regex in Python. Anonymised queries are not in the
   rows, so non-brand totals are lower than the site total. Also compute non-brand CTR and impression-weighted average
   position, and the SITE total from dimension=date (sum of the 7 days: clicks, impressions, CTR, position).
4. QUERIES IN THE TOP 10. Non-brand queries with average position strictly below 10. Also report the count with 2+
   impressions (the number that matters) and the count including exactly 10.0.
5. CITY PAGES ON PAGE 1. Exactly these 8 pages: /b2b-lead-generation- followed by mumbai, delhi, bengaluru, pune, hyderabad,
   chennai, kolkata, ahmedabad. Search Console dimension=page, filter page contains "/b2b-lead-generation-". Count pages with
   average position <= 10; list all 8 with position, clicks, impressions. Other city/industry pages are shown separately.
6. SUBMITTED PAGES. Search Console get_sitemaps for the www sitemap (the field labelled indexed_urls is really the submitted
   count) and the live sitemap's <loc> count. Say if they differ and why.
7. INDEXED PAGES. Count of sitemap URLs whose URL Inspection coverage is "Submitted and indexed" (only URL Inspection decides;
   ranking or impressions do not prove indexing). batch_url_inspection accepts max 10 URLs per call.
   - If last week's non-indexed list exists: re-inspect that list plus every URL added to the sitemap since, carry over last
     week's indexed count, and state that assumption.
   - Otherwise inspect every sitemap URL (about 33 calls, ALL issued in ONE parallel message).
   - Retry any URL that errors (Google 500, timeout) alone with inspect_url_enhanced.
   Report indexed/submitted and %, like-for-like against last week's URL set, the non-indexed breakdown by state (Discovered
   - currently not indexed; URL is unknown to Google; Crawled - currently not indexed; Duplicate without user-selected
   canonical; Duplicate, Google chose different canonical; Excluded by noindex) and the breakdown by site section (case
   studies, blog, glossary, city pages, tools, careers, landing pages, guides).
8. SITE HEALTH CHECK. Run python3 scripts/seo-crawl.py --json <file> against the live site (NEVER with python -I). Health % =
   share of sitemap URLs that return 200 with no redirect, have a self-referencing canonical, no noindex, exactly one h1,
   title <= 60 chars, description <= 160 chars, valid JSON-LD.
9. SCHEMA COVERAGE. Same crawl: share of sitemap URLs with page-specific JSON-LD beyond the sitewide Organization +
   BreadcrumbList. Count the schema types in use (Article, DefinedTerm, FAQPage, HowTo, Service, WebApplication, JobPosting,
   ...) and list every page without it.
10. AI REFERRAL SESSIONS. Vercel aggregate_pageviews by referrerHostname for the week (IST). Count visitors from chatgpt.com,
    perplexity.ai, claude.ai, gemini.google.com, copilot.microsoft.com (and any other AI host you see). Vercel counts visitors,
    not sessions; an AI visit with a stripped referrer hides inside "direct".
11. AI CITATION RATE. ChatGPT blocks automated browsers (bot check): do NOT try to work around it. Put it in "Needs you this week"
    and ask me to run these 10 prompts in a logged-out ChatGPT window (chatgpt.com/?q=<prompt>&hints=search) and tell you which
    name Myntmore or cite myntmore.com: (1) best B2B lead generation agency in Mumbai; (2) best cold email agency for B2B SaaS in
    India; (3) top LinkedIn outreach agencies in India; (4) B2B lead generation companies in Pune; (5) B2B lead generation company
    in Delhi; (6) outbound sales agency for SaaS startups in India; (7) best AI-powered B2B lead generation agencies in India;
    (8) what is B2B outbound sales; (9) average B2B outbound reply rate 2026; (10) how to choose an outbound lead generation
    agency. Score = hits / 10. Until I answer: "not measured".

PART 3. EXTRA DATA THE PDF NEEDS
- WHERE THE CLICKS COME FROM: site clicks vs non-brand clicks vs brand clicks (query rows matching the brand regex) vs the
  remainder (anonymised queries = site clicks minus all query-row clicks). Homepage share of clicks (dimension page).
- TOP NON-BRAND QUERIES by impressions (top 15: impressions, clicks, position, landing page).
- "STRONG RANKINGS THAT EARN ALMOST NO CLICKS": non-brand queries at position <= 5 with 20+ impressions and 0 or 1 click. For each,
  say what the searcher most likely wants and what the page's title/description should change to. Check whether the intent is
  actually commercial; if it is informational or slang (for example "cold reply meaning"), say so and recommend accordingly.
- "DEEP RANKINGS WITH REAL BUYER INTENT": non-brand queries at positions 11 to 30 containing agency, company, services, provider,
  outsourcing, a city name or a buying phrase, with 5+ impressions.
- CITY PAGES TABLE: all 8 pages this week vs last week (position, clicks, impressions), plus other city and industry-by-city pages
  that earned impressions. TOP 10 PAGES by impressions for the whole site.
- FOREIGN-CANONICAL TRACKER: Google has recorded another website's homepage as the canonical for some Myntmore URLs, including
  /services, since July. Use inspect_url_enhanced (user_canonical vs google_canonical, last_crawled) on /, /services,
  /services/gtm-strategy, the 8 city pages and every URL in that state. Keep a reading-by-reading table (date, number of URLs,
  where Google points) from the previous report plus today's reading. State whether /services has been recrawled since the last
  report. Also include the "what has been ruled out" paragraph (identical HTML for Googlebot and Chrome user agents, canonical
  tag and Link header present, no rewrites, no firewall challenge) and what only the Search Console UI (Test Live URL, then
  Request Indexing) can settle.
- CITY PAGE INDEX STATUS table: status, canonical, last crawled for the 8 pages.
- TECHNICAL CHECK TABLE from the crawler summary (each check, failures, PASS/FAIL) plus its WARN list, and content-depth warnings
  (glossary entries under 300 words, blog posts under 800 words) with counts and examples.
- SITE TRAFFIC BY REFERRER (Vercel, whole site): visitors per referrerHostname, total pageviews, and an estimate without likely
  bots (subtract countries averaging about 1 pageview per visitor with no referrer, e.g. Singapore and China every week, US in
  short bursts). Label the bot-free figure an estimate.
- BLOG TRAFFIC: Vercel requestPath startswith '/resources/blogs' (posts), the index page /resources/blogs separately, and the
  legacy startswith '/blog' path. Report visitors and pageviews (per-post visitors summed = "visitor-visits"), posts with traffic,
  top 5 posts. Search Console dimension=page, filter page contains "/blog": clicks, impressions, top pages with position and CTR.
  Compare with last week re-pulled the same way, and add 2 or 3 sentences on what to improve.
- WHAT SHIPPED THIS WEEK: in the repo run git log origin/master --since=<Monday> --until=<next Monday> --format='%ad %s'
  --date=short. Group into SEO/content, technical, tools, other; one plain-language line each; skip pure chore commits.
- WEEK OVER WEEK: re-pull LAST week's non-brand clicks, impressions and top-10 count with today's data (Google revises) and compare
  against that, not against the figure printed last week. Also compare against the records on my sheet if I give them.
- RECOMMENDED ACTIONS: 6 to 10, ranked by expected value, each with the page or query, the evidence and the exact change
  (title rewrite for a page with impressions but no clicks; internal links for pages stuck in "Discovered"; indexing requests;
  a Test Live URL on /services; fixes for anything failing).

PART 4. WORKFLOW (do it in this order)
1. Work out the week dates and week number. Read last week's report/notes.
2. In one parallel batch: Search Console query rows, date totals, city-page rows, blog rows, sitemaps; Zoho Leads and Contacts;
   Vercel referrers and blog paths; fetch the live sitemap; start the crawl in the background.
3. Process everything in Python from saved files. Compute every KPI and extra table. Reconcile: non-brand + brand + anonymised
   clicks must equal the site total; daily impressions must equal the query-level total where applicable.
4. Run the indexing inspections (all batches in one parallel message), then the canonical spot checks.
5. Write the findings, the executive summary and the ranked actions.
6. Build the PDF (Part 5), render it, inspect every page, fix, rebuild.
7. Cross-check the numbers printed in the PDF against your notes using pdftotext.
8. Save the files and reply (Part 6).

PART 5. PDF SPECIFICATION (match the previous reports)
Build with Python reportlab from user site-packages (run python3 build_report.py WITHOUT -I, or the import fails). Use the Arial
TTFs in /System/Library/Fonts/Supplemental (Arial.ttf, Arial Bold.ttf) so arrows and minus signs render. Keep the build script in
the session scratchpad. A4 portrait, margins about 40 pt.
Brand colours: page background cream #F8F6F2; cards white with border #E8E2D9; gold #F5B731 (accent bars, header rule); ink
#0A0A0A; body text #3D3D3D; muted #52525B; amber #A14A08 for small accent text. No dark backgrounds, no green, blue or purple
accents. Put the Myntmore logo (public/logo.png) on the cover.
Running header on every page after the cover: "MYNTMORE   Weekly SEO Report · Week N · D–D Month YYYY". Footer on every page:
"Sources: Google Search Console (sc-domain:myntmore.com), Zoho CRM, Vercel Analytics, live-site crawl. Pulled D Month YYYY." and
"Page N". Tables: shaded header row, thin row rules, a Change column using "▲ better", "▼ worse", "▬ flat" (colour only the
symbol), and never split a row across pages.
Page plan (adjust breaks to fit, keep the order):
 COVER AND SUMMARY (page 1): logo, "Weekly SEO Report", "Week N · Monday D – Sunday D Month YYYY", one line "Search, indexing,
   site health, AI visibility, traffic and lead data for myntmore.com. Prepared <weekday> D Month YYYY." Then 8 hero cards in two
   rows of four: NON-BRAND CLICKS, NON-BRAND IMPRESSIONS, TOP-10 QUERIES, CITY PAGES ON PAGE 1, SITE HEALTH, SCHEMA COVERAGE,
   PAGES INDEXED, WEBSITE LEADS (ZOHO), each with the big number and a "vs last week" line. Then "Executive summary": 6 to 8
   plain-language bullets (what moved, what did not, the biggest risk, one watch item). Then a "Needs you this week" box with
   what only I can do (the AI-citation prompts, Search Console Test Live URL and Request Indexing, manual actions and security
   pages, anything else).
 1. KPI scorecard: all 11 KPIs (this week | last week | change | how measured / note) plus a "Leads outside the KPI definition"
    paragraph.
 2. Search performance: site vs non-brand table (clicks, impressions, CTR, average position, this week vs last week with change)
    and "Where the clicks come from".
 3. Queries and rankings: top non-brand queries; strong rankings that earn almost no clicks; deep rankings with real buyer intent.
 4. City pages: the 8-page table (position now vs last week, clicks, impressions), other city/industry pages with impressions,
    top 10 pages by impressions.
 5. Indexing and the foreign-canonical issue: headline (indexed/submitted and like-for-like), indexing by section, non-indexed by
    state with what each means and what to do, the foreign-canonical tracker table, what has been ruled out, city page index
    status.
 6. Technical health and schema: the check table, schema types in use, pages without schema, content-depth warnings.
 7. Site traffic by referrer: a horizontal bar chart of visitors per referrer (gold bars), total pageviews, the bot estimate,
    then BLOG TRAFFIC (small table, top posts, what to improve).
 8. What shipped this week.
 9. Recommended actions: ranked table of action, evidence, expected effect.
 APPENDIX: method and limits. One line per KPI rule, the data sources and pull times, which days may be revised, which figures are
 derived or estimated, anything not measured, and any rule that changed.
QA before sending: render every page with pdftoppm -r 60 -png and LOOK at each image. No clipped text, no table broken across a
page, no empty page, arrows and bars visible. Fix and rebuild until clean.

PART 6. OUTPUT
- Save the PDF as docs/seo-report-YYYY-MM-DD-weekN.pdf (date = pull date) and a run log docs/seo-weekly-run-YYYY-MM-DD.md with
  the raw numbers and the exact method notes. Do not commit them.
- Send me the PDF, then a six-line chat summary: the three biggest wins or risks, the numbers that moved, and what you need from
  me.
- Mistakes to avoid: counting Zoho bulk imports as leads; calling a URL indexed without URL Inspection; using the site-audit
  scanner for link counts (it cannot see links inside landing-page JSON or client components); presenting a number as final while
  the last two days can still change; changing a KPI definition without saying so.

PART 7. LAST PULL FOR COMPARISON (Mon 16 to Sun 22 Nov 2026, pulled 23 Nov)
Organic leads 11 Website-source contacts (about 9 excluding tests; 0 in Leads) | Non-brand clicks 15 | impressions 2,865 (week
before, re-pulled: 14 / 2,893) | Top-10 queries 271 strictly below 10 (154 with 2+ impressions; 280 including 10.0; week before 224)
| City pages on page 1: 3 of 8 (Chennai 4.6, Hyderabad 6.8, Ahmedabad 8.0; Delhi 10.2, Kolkata 10.1, Mumbai 14.0, Pune 20.1,
Bengaluru 47.0) | Submitted 322 (live 325 on 23 Nov) | Indexed 240 of 322 (74.5%; 19 Nov full pass 235 of 311) | Site health 100%
(325/325) | Schema 99.1% (322/325; missing /resources/feed, /seo, /sitemap) | AI referral visitors 0 | AI citation not measured |
Site total 103 clicks / 4,935 impressions | Blog 57 visitor-visits / 60 pageviews over 29 posts (week before 79 / 81 over 42), Search
Console blog pages 8 clicks / 1,605 impressions (week before 3 / 1,375). Records on my sheet then: non-brand clicks 14,
impressions 2,718, top-10 queries 213, city pages 4, indexed 207, submitted 290, schema 96.6%, AI referrals 5, AI citation 20%.
```
