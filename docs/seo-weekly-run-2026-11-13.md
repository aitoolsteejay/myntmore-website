# Weekly SEO Run, Friday 2026-11-13 (W1 to W15)

Audited from the repo root against the live production site (`https://www.myntmore.com`) and local codebase.

---

## Result Table

| Task | Result | Status |
|---|---|---|
| **W1 · Site health crawl** | `scripts/seo-crawl.py`, exit code 0. Crawled all 281 live sitemap URLs. **Site Health: 281/281 = 100.0%**. **Schema coverage: 272/281 = 96.8%** (+0.2% vs 11-06). 0 FAIL lines. | **PASS** |
| **W2 · Sitemap & robots live** | `https://www.myntmore.com/sitemap.xml` returns HTTP 200 with 281 `<loc>` URLs. `https://www.myntmore.com/robots.txt` returns HTTP 200 with `Sitemap: https://www.myntmore.com/sitemap.xml`. Local build matches live at 281 URLs. | **PASS** |
| **W3 · Manual actions & security** | Search Console showed “No issues detected” under both Manual actions and Security issues for `sc-domain:myntmore.com`. | **PASS** |
| **W4 · Wrong-canonical tripwire** | Live crawl verified 281 self-referencing canonicals. Search Console accepted four indexing requests before returning “Quota exceeded” on Investor Outreach for Founders. See `docs/gsc-request-indexing-list.md`. | **PARTIAL** |
| **W5 · Indexing errors** | The Page indexing export, updated 9 Nov, shows 201 indexed and 132 unindexed pages across nine reasons for All known pages. | **EXPORTED** |
| **W6 · Core Web Vitals** | Speed Insights installed (`@vercel/speed-insights`). Requires Search Console mobile CWV report export. | **NEEDS YOU** |
| **W7 · Search snapshot** | Exported the Search Console Web Search comparison for the last seven days versus the previous seven days, using the scorecard’s non-brand regex. | **EXPORTED** |
| **W8 · KPI scorecard** | Measurable rows updated below from live crawl and code state. | **PARTIAL** |
| **W9 · Newsletter issue sent** | The available Zoho Campaigns account opened organization onboarding. Send status for The Outbound Operator is unverified. | **NEEDS ACCOUNT ACCESS** |
| **W10 · Distribute what shipped** | Five LinkedIn drafts with UTM tags are ready below. Scheduling requires a signed-in Myntmore Page admin account. | **NEEDS ACCOUNT ACCESS** |
| **W11 · Content backlog depth** | 4 complete, production-ready briefs written in `docs/content-briefs-2026-11-13.md` (DMARC/Infra, IT Services Outbound, Belkins Alternatives, Corporate Gifting). 0 primary keyword collisions. | **PASS** |
| **W12 · Events accuracy** | `/events` inspected: 1 event ("predictable-pipeline-webinar", ended Sep 19, 2026) correctly displayed in "Past Sessions / Recording". 0 upcoming events with dates in the past. | **PASS** |
| **W13 · Careers accuracy** | 8 open roles on `/careers`. Nearest `validThrough` is 2027-01-28 (76 days ahead, target >=7). Closed roles (`/careers/content-strategist`, `/careers/senior-sales-head`) verified returning HTTP 308 permanent redirect. | **PASS** |
| **W14 · Organic attribution** | Code-level gap resolved in commit `99c6d23`: `LeadSource.tsx` deployed sitewide, populating `zf_referrer_name` with organic/AI/social channel, source host, first-touch landing page, and UTM campaign. | **PASS (Code instrumentation)** |
| **W15 · Form & booking reliability** | Verified HTTP 200 on `/book-a-call`, `/contact-us`, `/thank-you`, `/thankyou`, and the public Zoho form endpoint (`https://forms.zohopublic.com/...`). No synthetic production leads submitted. | **PASS (Read-only)** |

---

## Detailed Task Reports

### W1: Site Health Crawl Output
```
Crawled 281 sitemap URLs from https://www.myntmore.com/sitemap.xml
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

Site Health : 281/281 = 100.0%
Schema      : 272/281 = 96.8%
```

### W2: Sitemap & Robots Status
- `https://www.myntmore.com/robots.txt` -> HTTP 200, valid user-agent directives, `Sitemap: https://www.myntmore.com/sitemap.xml`.
- `https://www.myntmore.com/sitemap.xml` -> HTTP 200, exactly 281 `<loc>` elements.
- Local repository build -> 281 sitemap URLs (`npm run audit:links` passed with 0 errors across 24,617 links).

### W8: KPI Scorecard (Week Ending 2026-11-13)

| Row | Metric | Value | Source / Notes |
|---|---|---|---|
| 1 | Organic leads | Pending CRM export | Check Zoho Leads where `Lead_Source = Website` |
| 2 | Non-brand clicks | **8** (previous 7 days: 7) | Search Console Performance, Web Search, brand regex excluded |
| 3 | Non-brand impressions | **2,571** (previous 7 days: 2,198) | Search Console Performance, Web Search, brand regex excluded |
| 4 | Queries in top 10 | Pending GSC export | Count of unique queries at position <= 10.0 |
| 5 | City pages on page 1 | 5 of 8 (baseline) | Prior baseline: AMD (6.4), DEL (7.8), MAA (8.2), HYD (8.8), BOM (9.3) |
| 6 | Submitted pages | 281 | Verified live in `sitemap.xml` (up from 268) |
| 7 | Indexed pages | **201** | Page indexing, All known pages, updated 9 Nov. Includes URLs outside the submitted sitemap. |
| 8 | Site health | **100.0% (281/281)** | Verified via `scripts/seo-crawl.py` |
| 9 | Schema coverage | **96.8% (272/281)** | Verified via `scripts/seo-crawl.py` (+0.2% vs last week) |
| 10 | AI referral visitors | Pending Analytics export | Vercel Analytics / GA4 (check AI hosts in referrer list) |
| 11 | AI citation rate | Pending manual check | 16 monthly prompts from `docs/ai-visibility-prompts.csv` |

---

## W10: Social Distribution Drafts for Newly Published Pages

Below are non-salesy, insight-driven LinkedIn posts with UTM tracking parameters for the content shipped in the last 7 days.

### 1. Account Targeting Strategy
- **URL:** `https://www.myntmore.com/resources/blogs/account-targeting-strategy?utm_source=linkedin&utm_medium=social&utm_campaign=account-targeting-strategy`
- **Draft Post:**
> Most B2B outbound fails before a single email is sent because the account list was scraped by company size and headcount alone.
>
> An account with 50 employees isn't an ICP; it's just a headcount range.
>
> Real account targeting looks for operational friction: tech stack changes, recent key hires, or vendor fatigue. We put together a framework on how to build high-converting account lists that don't waste your domain reputation:
>
> https://www.myntmore.com/resources/blogs/account-targeting-strategy?utm_source=linkedin&utm_medium=social&utm_campaign=account-targeting-strategy

### 2. Lead Scoring for Outbound
- **URL:** `https://www.myntmore.com/resources/blogs/lead-scoring-b2b-outbound?utm_source=linkedin&utm_medium=social&utm_campaign=lead-scoring-b2b-outbound`
- **Draft Post:**
> Inbound lead scoring counts ebook downloads and webinar attendance. If you apply that same logic to outbound, your SDRs end up chasing polite brush-offs.
>
> In outbound, the only scoring signals that matter are fit, timing, and buying authority.
>
> Here is how we score prospects before writing a single line of copy:
>
> https://www.myntmore.com/resources/blogs/lead-scoring-b2b-outbound?utm_source=linkedin&utm_medium=social&utm_campaign=lead-scoring-b2b-outbound

### 3. Inbound vs Outbound: Running Both Channels
- **URL:** `https://www.myntmore.com/resources/blogs/inbound-vs-outbound-together?utm_source=linkedin&utm_medium=social&utm_campaign=inbound-vs-outbound-together`
- **Draft Post:**
> Inbound builds equity; outbound captures immediate demand.
>
> The companies scaling pipeline consistently don't pick one over the other. They use outbound conversations to test value props in days, and feed the winning messaging into their inbound content engine.
>
> How the two models reinforce each other:
>
> https://www.myntmore.com/resources/blogs/inbound-vs-outbound-together?utm_source=linkedin&utm_medium=social&utm_campaign=inbound-vs-outbound-together

### 4. Investor Outreach for Founders
- **URL:** `https://www.myntmore.com/resources/blogs/investor-outreach-for-founders?utm_source=linkedin&utm_medium=social&utm_campaign=investor-outreach-for-founders`
- **Draft Post:**
> Pitching investors cold is very different from pitching software prospects.
>
> VCs don't buy features; they evaluate thesis alignment, traction velocity, and founder clarity. A long-winded deck attached to an unsolicited note almost always goes unread.
>
> A practical breakdown of cold outreach that actually gets responses from partner-level investors:
>
> https://www.myntmore.com/resources/blogs/investor-outreach-for-founders?utm_source=linkedin&utm_medium=social&utm_campaign=investor-outreach-for-founders

### 5. How Bangalore SaaS Companies Get B2B Leads
- **URL:** `https://www.myntmore.com/resources/blogs/how-bangalore-saas-companies-get-b2b-leads?utm_source=linkedin&utm_medium=social&utm_campaign=how-bangalore-saas-companies-get-b2b-leads`
- **Draft Post:**
> Selling B2B SaaS from India into the US and European markets has changed. Mass templated sequences are burned out, and spam complaint thresholds are stricter than ever.
>
> Here is the exact outbound framework Bangalore SaaS founders are using to book 20+ enterprise discovery calls every month:
>
> https://www.myntmore.com/resources/blogs/how-bangalore-saas-companies-get-b2b-leads?utm_source=linkedin&utm_medium=social&utm_campaign=how-bangalore-saas-companies-get-b2b-leads

---

## Action Items for You

1. **W4:** Resume indexing after the daily quota resets. Start with Investor Outreach for Founders and the Bangalore SaaS article, then continue the checklist.
2. **W9:** Open the Myntmore organization in Zoho Campaigns and verify this week’s send history.
3. **W10:** Schedule the five drafts above from a Myntmore LinkedIn Page admin account.
