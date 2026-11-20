# SEO Experiment and Change-Impact Log (B11)

This log tracks every material on-page, architectural, and schema change across Myntmore to measure search impact and prevent attribution guesswork. Every entry records the hypothesis, baseline, exact change, deployment date, owner, review window, and post-change evaluation.

---

## Active & Recent Experiments

### EXP-2026-11-20-01: Cold Email Infrastructure Topical Authority Expansion
- **URLs:**
  - `/resources/blogs/cold-email-infrastructure-explained` (New publication)
  - `/resources/guides/cold-email-infrastructure-setup` (Inbound link addition)
  - `/resources/guides/smartlead-setup` (Inbound link addition)
  - `/resources/blogs/gmail-and-yahoo-sender-requirements` (Inbound link addition)
- **Deployment Date:** 2026-11-20
- **Owner:** Growth & Content Team
- **Hypothesis:** Publishing a deep technical explainer (800+ words, 4+ H2s, direct-answer FAQs) targeting `what is dmarc for cold email` and interconnecting it with existing setup guides will capture top-of-funnel technical intent (positions 8–20) and pass topical authority to `/services/cold-email`.
- **Baseline:**
  - Impressions for cluster: ~35/month.
  - Average position for `what is dmarc for cold email`: Unranked / >50.
  - Inbound links to target: 0.
- **Change Implemented:**
  - Published `content/posts/cold-email-infrastructure-explained.mdoc` with custom FAQs, `BlogArticle` schema, and CTA block.
  - Added 3 contextual internal links from the infrastructure setup guide, Smartlead guide, and Gmail/Yahoo sender requirements post.
  - Registered in `app/sitemap.ts` and `docs/keyword-map.md`.
- **Review Window:** 28 days (Follow-up date: 2026-12-18).
- **Confounders to Watch:** Google core update rollouts, seasonal December enterprise B2B search volume dips.

---

### EXP-2026-11-20-02: Core Web Vitals LCP & CLS Optimization
- **URLs:** Sitewide templates (Homepage, Services, Guides, Blog)
- **Deployment Date:** 2026-11-20 (Commit `946b0c5`)
- **Owner:** Engineering Team
- **Hypothesis:** Restricting animated text shifts and counting hero headlines as prioritized elements for Largest Contentful Paint (LCP) will lower cumulative layout shift (CLS < 0.05) and decrease Mobile Poor URLs in Search Console to 0.
- **Baseline:**
  - Prior Mobile CWV Poor URLs: Pending GSC verification.
  - Layout shifts observed during font/headline hero rendering.
- **Change Implemented:**
  - Optimized hero headlines for LCP in `app/components/Hero.tsx`.
  - Stabilized animated text height/margins to eliminate layout shift during typewriter/ticker rotation.
- **Review Window:** 28 days (Follow-up date: 2026-12-18, aligning with GSC 28-day rolling field data).
- **Confounders to Watch:** Third-party widgets (e.g. Zoho form iframe, Vercel analytics).

---

### EXP-2026-11-19-01: Global International City Expansion Mesh
- **URLs:** 10 international hub pages (`/b2b-lead-generation-london`, `/b2b-lead-generation-new-york`, `/b2b-lead-generation-paris`, `/b2b-lead-generation-singapore`, etc.)
- **Deployment Date:** 2026-11-19 (Commit `4befe32`)
- **Owner:** SEO & International Growth
- **Hypothesis:** Creating high-intent local landing pages for global financial and tech hubs with localized industry breakdowns and pairing them with market case study links will allow Myntmore to index and rank for cross-border B2B lead generation queries outside India.
- **Baseline:**
  - 0 impressions for international city keywords.
  - Pages newly discovered by search crawlers.
- **Change Implemented:**
  - Generated 10 international city pages with custom schema and metadata.
  - Linked to market hubs (`/case-studies/markets/united-kingdom`, `/case-studies/markets/united-states`, etc.).
  - Added to global footer and `sitemap.xml`.
- **Review Window:** 42 days (Follow-up date: 2027-01-01).
- **Confounders to Watch:** Crawl budget allocation for new programmatic landing pages.
