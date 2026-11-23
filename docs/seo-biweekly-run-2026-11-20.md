# Biweekly SEO run · November 20, 2026

Audited against the live site (`https://www.myntmore.com`), local codebase, site audit inventory, and published Search Console baselines.

---

## Result Table

| Task | Result | Evidence or remaining work |
| --- | --- | --- |
| **B1 · Indexing** | Queued | Baseline audit (`docs/gsc-audit-2026-11-19.md`) verifies 235 of 311 indexed (76%). 9 stale "noindex" case studies identified for manual "Test Live URL" fetch in Search Console to overwrite October cache. |
| **B2 · Internal links** | Verified | [Cold Email Infrastructure Explained](../content/posts/cold-email-infrastructure-explained.mdoc) has 3 contextual inbound links (infrastructure guide, Smartlead guide, sender requirements post) and 5 outbound links. All new pages meet the threshold. |
| **B3 · Orphans** | Pass (Rules-compliant) | 39 orphan records in `site-audit/data.json`: 12 private pricing routes and 27 operational paths (`/calendar/*`, `/research/*`). All 27 non-allowlisted routes carry `noindex: true` and are excluded from `sitemap.xml`. |
| **B4 · Positions 8–20** | Pending data | Awaiting 14-day Search Console Query × Page export (filtered for position 8.0–20.0 with $\ge 20$ impressions) to implement the top 3 on-page patches. |
| **B5 · Low CTR** | Pending data | Awaiting 28-day Search Console Page export (impressions $\ge 100$, CTR $< 1\%$) to draft title and description rewrites. |
| **B6 · Blog** | Published | [Cold Email Infrastructure Explained: SPF, DKIM, and DMARC](../content/posts/cold-email-infrastructure-explained.mdoc). 950+ words, 5 H2s, 3 direct FAQ answers (40–50 words each), `BlogArticle` and `FAQPage` schema, 45-character `metaTitle`, and 154-character description. |
| **B7 · Glossary** | Verified | Verified definitions for `buying-committee` and `spf-dkim-dmarc`. |
| **B8 · Distribution** | Drafted | Produced 7-slide LinkedIn carousel script and *The Outbound Operator* newsletter segment with UTM tags (documented below). |
| **B9 · Records** | Updated | [docs/keyword-map.md](keyword-map.md) updated with `cold-email-infrastructure-explained`, IT services, buying committee, and 10 world city pages. [docs/content-gaps.md](content-gaps.md) status entry added for November 20. |
| **B10 · Commercial opportunities** | Scored | Top 3 commercial backlog gaps ranked: 1. Belkins Alternatives, 2. Corporate Gifting Playbook, 3. Outbound Offer Framework. |
| **B11 · Impact log** | Logged | Initialized [docs/seo-experiments-log.md](seo-experiments-log.md) tracking 3 active experiments (Topical Authority, CWV LCP/CLS optimizations, and Global City mesh). |

---

## B1 · Indexing Follow-up Queue

The 9 case studies with stale October "noindex" cache in GSC (code verified with `<meta name="robots" content="index, follow" />` and self-referencing canonicals):
1. `https://www.myntmore.com/case-studies/agencies-it-usa-conversion-optimization`
2. `https://www.myntmore.com/case-studies/agencies-it-usa-software-development`
3. `https://www.myntmore.com/case-studies/financial-services-uk-bookkeeping`
4. `https://www.myntmore.com/case-studies/insurance-singapore-commercial-coverage`
5. `https://www.myntmore.com/case-studies/manufacturers-exporters-france-packaging`
6. `https://www.myntmore.com/case-studies/manufacturers-exporters-germany-industrial-components`
7. `https://www.myntmore.com/case-studies/manufacturers-exporters-uae-kitchen-equipment`
8. `https://www.myntmore.com/case-studies/pharma-india-dermatologist-outreach`
9. `https://www.myntmore.com/case-studies/pharma-usa-api-second-source`

**Action:** Run URL Inspection, click **Test Live URL**, verify user-declared canonical, and click **Request Indexing**.

---

## B2 & B3 · Link & Orphan Audit

- **Site Audit Counts:** 350 pages total (311 linked, 39 orphan), 32 redirects.
- **Inbound Contextual Links:**
  - `/resources/blogs/cold-email-infrastructure-explained`: 3 inbound links from `/resources/guides/cold-email-infrastructure-setup`, `/resources/guides/smartlead-setup`, and `/resources/blogs/gmail-and-yahoo-sender-requirements`.
  - `/resources/blogs/b2b-lead-generation-for-it-services`: 4 inbound links from Account Targeting Strategy, Multi-Threading, What is B2B Outbound Sales, and Blog hub.
- **Orphan Exceptions:** All 27 non-allowlisted orphans are confirmed `noindex` and excluded from `sitemap.xml`.

---

## B6 · New Blog Publication

- **Title:** Cold Email Infrastructure Explained: SPF, DKIM, and DMARC
- **Target Keyword:** `what is dmarc for cold email`
- **File:** `content/posts/cold-email-infrastructure-explained.mdoc`
- **Word Count:** 950+ words of body copy.
- **Schema:** `BlogArticle`, `FAQPage`, `BreadcrumbList`.

---

## B8 · Repurposed Assets

### 1. LinkedIn Carousel Script (7 Slides)
- **Target URL:** `https://www.myntmore.com/resources/blogs/cold-email-infrastructure-explained?utm_source=linkedin&utm_medium=social&utm_campaign=carousel-cold-email-infrastructure`
- **Slide 1:** Hook on the 0.10% spam threshold and why copy doesn't save unauthenticated email.
- **Slide 2:** The Primary Domain Trap (risking transactional and client emails).
- **Slide 3:** Secondary Lookalike Domains (301 redirects to homepage).
- **Slide 4:** The DNS Trinity (SPF guest lists, DKIM cryptographic seals, DMARC policies).
- **Slide 5:** Custom Tracking Domains (CNAME to remove shared pixel deliverability penalties).
- **Slide 6:** Warmup Limits (21 days, max 30-35 emails/inbox/day).
- **Slide 7:** Implementation Checklist & guide link.

### 2. Newsletter Excerpt (*The Outbound Operator*)
- **Subject:** The anatomy of an un-burnable outreach domain
- **URL:** `https://www.myntmore.com/resources/blogs/cold-email-infrastructure-explained?utm_source=newsletter&utm_medium=email&utm_campaign=outbound-operator-2026-11-20`

---

## B10 · Commercial Opportunity Ranking

1. **Alternatives to Belkins:** High-intent commercial evaluation query capturing buyers comparing outbound agencies.
2. **Corporate Gifting Playbook:** High-intent vertical query with strong seasonal procurement cycle.
3. **Outbound Offer Creation Framework:** Addresses the primary reason outbound reply rates stall (offer design).

---

## B11 · SEO Experiment Log

Tracked in [docs/seo-experiments-log.md](seo-experiments-log.md):
- `EXP-2026-11-20-01`: Cold email infrastructure topical authority expansion.
- `EXP-2026-11-20-02`: Core Web Vitals LCP & CLS hero headline stabilization.
- `EXP-2026-11-19-01`: Global international city landing page mesh.
