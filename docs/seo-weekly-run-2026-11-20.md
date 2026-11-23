# Weekly SEO Run, Friday 2026-11-20 (W1 to W15)

Audited from the repository root against the live production site (`https://www.myntmore.com`) and local codebase.

---

## Result Table

| Task | Result | Status |
|---|---|---|
| **W1 · Site health crawl** | `scripts/seo-crawl.py`, exit code 0. Crawled all 322 live sitemap URLs. **Site Health: 322/322 = 100.0%**. **Schema coverage: 319/322 = 99.1%** (+2.3% vs 11-13). 0 FAIL lines. | **PASS** |
| **W2 · Sitemap & robots live** | `https://www.myntmore.com/sitemap.xml` returns HTTP 200 with 322 `<loc>` URLs. `https://www.myntmore.com/robots.txt` returns HTTP 200 with `Sitemap: https://www.myntmore.com/sitemap.xml`. Local build matches live at 322 URLs. | **PASS** |
| **W3 · Manual actions & security** | Search Console baseline (`docs/gsc-audit-2026-11-19.md`) showed "No issues detected" under both Manual actions and Security issues for `sc-domain:myntmore.com`. | **PASS (Baseline verified)** |
| **W4 · Wrong-canonical tripwire** | Live crawl verified 322 self-referencing canonicals in code/HTML (0 pointing to external scraper domains). Search Console URL inspection requested for `/services` and `/` to overwrite stale July/August caches. | **PARTIAL (Code clean, GSC pending)** |
| **W5 · Indexing errors** | 311 URLs audited: 235 indexed (76%), 76 not indexed. 9 stale "noindex" confirmed false positives in code (`index, follow`). Awaiting latest weekly GSC Pages export. | **PARTIAL** |
| **W6 · Core Web Vitals** | Speed Insights installed (`@vercel/speed-insights`). Commit `946b0c5` optimized hero headlines for LCP and stabilized animated text for CLS. Requires Search Console mobile CWV export to verify 0 Poor URLs. | **PENDING GSC EXPORT** |
| **W7 · Search snapshot** | Baseline comparison from previous week: 8 non-brand clicks, 2,571 non-brand impressions. Awaiting last 7-day GSC Performance export to compare WoW. | **PENDING GSC EXPORT** |
| **W8 · KPI scorecard** | Measurable rows updated below from live crawl and code state (Submitted: 322, Health: 100%, Schema: 99.1%). | **PARTIAL** |
| **W9 · Newsletter issue sent** | *The Outbound Operator* weekly issue dispatch status requires confirmation from Zoho Campaigns. Copy and UTM links drafted below. | **PENDING SEND VERIFICATION** |
| **W10 · Distribute what shipped** | Identified newly shipped pages from git history (`gmail-and-yahoo-sender-requirements`, 10 international city pages, `/calendar/IG`). Natural, non-salesy LinkedIn distribution copy prepared below. | **DRAFTS READY** |
| **W11 · Content backlog depth** | Backlog audited. 4 production-ready briefs verified in `docs/content-briefs-2026-11-13.md` (0 keyword collisions, clear search intent, 3 internal link targets, and factual citations). | **PASS** |
| **W12 · Events accuracy** | `/events` inspected: 1 event ("predictable-pipeline-webinar", ended Sep 19, 2026) correctly displayed in "Past Sessions / Recording". 0 upcoming events with dates in the past. | **PASS** |
| **W13 · Careers accuracy** | Ran `scripts/audit-job-postings.mjs`: 8 active open roles on `/careers`. Nearest `validThrough` is 2027-01-28 (68 days ahead, target >=7). Closed roles (`/careers/content-strategist`, `/careers/senior-sales-head`) verified with 308 permanent redirects in `next.config.js`. | **PASS** |
| **W14 · Organic attribution** | Code-level instrumentation active: `LeadSource.tsx` deployed sitewide, populating `zf_referrer_name` with organic/AI/social channel, source host, first-touch landing page, and UTM campaign. CRM join requires Zoho CRM export. | **PASS (Code instrumentation)** |
| **W15 · Form & booking reliability** | Verified HTTP 200 on `/book-a-call`, `/contact-us`, `/calendar/IG`, `/thank-you`, and the public Zoho form endpoint. Synthetic test submissions withheld per safety instructions. | **PASS (Read-only)** |

---

## Detailed Task Reports

### W1: Site Health Crawl Output
```
Crawled 322 sitemap URLs from https://www.myntmore.com/sitemap.xml
PASS  status: 0
PASS  missing title: 0
PASS  title: 0
PASS  missing description: 0
PASS  description: 0
PASS  noindex but listed in sitemap: 0
PASS  canonical tags: 0
PASS  canonical points elsewhere: 0
PASS  h1 tags: 0
PASS  invalid JSON-LD block(s): 0
PASS  duplicate title: 0
PASS  duplicate description: 0
PASS  internal links to non-200 / redirecting URLs: 0
PASS  indexable pages missing from sitemap (per /site-audit data): 0

WARN (do not affect Site Health or exit code):
     5  description N chars (>155): /b2b-lead-generation-gurugram, /b2b-lead-generation-indore, /b2b-lead-generation-insurance-mumbai, /b2b-lead-generation-mumbai ...
     3  no page-specific JSON-LD: /resources/feed, /seo, /sitemap
     1  og:title N chars (>70, X cuts card titles there): /b2b-lead-generation-automotive-manufacturing-chennai

Site Health : 322/322 = 100.0%
Schema      : 319/322 = 99.1%
```

### W2: Sitemap & Robots Status
- `https://www.myntmore.com/robots.txt` -> HTTP 200, valid user-agent directives, `Sitemap: https://www.myntmore.com/sitemap.xml`, explicit rules for AI crawlers (`GPTBot`, `ClaudeBot`, `PerplexityBot`).
- `https://www.myntmore.com/sitemap.xml` -> HTTP 200, exactly 322 `<loc>` elements.
- Local repository build -> 322 sitemap URLs (274 static routes in `app/sitemap.ts` + 48 published Keystatic CMS posts).
- Git timestamps -> `npm run sitemap:check` verified 100% current across all 274 routes in `lib/sitemap-dates.json`.

---

### W8: KPI Scorecard (Week Ending 2026-11-20)

| Row | Metric | Value | Previous Week (11-13) | Source / Notes |
|:---:|---|:---:|:---:|---|
| 1 | Organic leads | Pending CRM export | — | Zoho Leads where `Lead_Source = Website` |
| 2 | Non-brand clicks | Pending GSC export | 8 | Search Console Performance, Web Search, brand regex excluded |
| 3 | Non-brand impressions | Pending GSC export | 2,571 | Search Console Performance, Web Search, brand regex excluded |
| 4 | Queries in top 10 | Pending GSC export | — | Count of unique queries at position <= 10.0 |
| 5 | City pages on page 1 | Pending GSC export | 5 of 8 | Baseline: AMD (6.4), DEL (7.8), MAA (8.2), HYD (8.8), BOM (9.3) |
| 6 | Submitted pages | **322** | 281 | Verified live in `sitemap.xml` (+41 URLs from 10 world cities & CMS posts) |
| 7 | Indexed pages | **235** *(Nov 19 audit)* | 201 | Page indexing, All known pages. 76 unindexed undergoing crawl |
| 8 | Site health | **100.0% (322/322)** | 100.0% | Verified via `scripts/seo-crawl.py` (0 FAIL lines) |
| 9 | Schema coverage | **99.1% (319/322)** | 96.8% | Verified via `scripts/seo-crawl.py` (+2.3% gain) |
| 10 | AI referral visitors | Pending Analytics export | — | Vercel Analytics / GA4 (check AI hosts in referrer list) |
| 11 | AI citation rate | Pending manual check | — | 16 monthly prompts from `docs/ai-visibility-prompts.csv` |

---

### W10: Social Distribution Drafts for Shipped Pages

Non-salesy, insight-driven LinkedIn posts with UTM tracking parameters for content shipped in the last 7 days:

#### 1. Gmail & Yahoo Sender Requirements Guide
- **URL:** `https://www.myntmore.com/resources/blogs/gmail-and-yahoo-sender-requirements?utm_source=linkedin&utm_medium=social&utm_campaign=gmail-and-yahoo-sender-requirements`
- **Draft Post:**
> Most cold email advice around Google and Yahoo's sender updates focuses on the 5,000 email threshold. That misses the number that actually burns domains: 0.10%.
>
> While Google notes enforcement begins above 0.30% spam complaints, Postmaster Tools guidance strongly recommends staying under 0.10% (one report per 1,000 sent emails) to preserve inbox placement.
>
> Neither provider defines what constitutes "cold outreach." If your secondary domain triggers spam reports, your deliverability burns regardless of volume.
>
> We broke down the exact requirements (SPF/DKIM/DMARC alignment, Google's 5,000 rule, and one-click unsubscribe) in a practical pre-send checklist:
>
> https://www.myntmore.com/resources/blogs/gmail-and-yahoo-sender-requirements?utm_source=linkedin&utm_medium=social&utm_campaign=gmail-and-yahoo-sender-requirements

#### 2. International B2B Lead Generation Expansion
- **URL:** `https://www.myntmore.com/b2b-lead-generation-london?utm_source=linkedin&utm_medium=social&utm_campaign=b2b-lead-generation-london`
- **Draft Post:**
> Selling B2B services into the UK and Europe requires a very different outbound motion than domestic outreach.
>
> Generic volume gets flagged under GDPR, and US-style hyperbole triggers immediate unsubscribes. What works is verifiable peer proof and specific regulatory alignment.
>
> We've documented how we run targeted, compliant outbound pipelines for firms expanding into London and European markets:
>
> https://www.myntmore.com/b2b-lead-generation-london?utm_source=linkedin&utm_medium=social&utm_campaign=b2b-lead-generation-london

---

### W12 & W13: Events & Careers Accuracy
- **Events (W12):** `app/events/page.tsx` and `lib/events-data.ts` inspected. Only 1 event (`predictable-pipeline-webinar`, ended Sep 19, 2026), correctly routed to the archive/recording view. 0 upcoming events with dates in the past. **PASS**.
- **Careers (W13):** `scripts/audit-job-postings.mjs` passed with 0 errors across 8 open roles. Nearest `validThrough` date is `2027-01-28` (68 days out). 308 permanent redirects verified for `/careers/content-strategist` and `/careers/senior-sales-head`. **PASS**.

---

### W14 & W15: Code Instrumentation & Form Reliability
- **Attribution (W14):** `app/components/LeadSource.tsx` verified active sitewide, capturing `zf_referrer_name` with UTM campaign, organic channel, source host, and landing page.
- **Form Reliability (W15):** Verified HTTP 200 on `/book-a-call`, `/contact-us`, `/calendar/IG`, `/thank-you`.
