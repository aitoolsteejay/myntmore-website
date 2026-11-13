# Content Gap Analysis

Audit of high-intent B2B outbound topics, questions, and comparison queries not yet covered by any existing page, as of 2026-08-21. Cross-checked against all 28 pages in [`keyword-map.md`](./keyword-map.md) (6 services + 9 tools + 13 blog) plus the 8 `/lp/*` vertical pages and 8 `/b2b-lead-generation-{city}` pages, to avoid proposing anything that would cannibalize an existing primary keyword.

## Status, 2026-10-14

Built since this audit: `cold-email-compliance-guide`, `cold-email-vs-linkedin-outreach`, `what-is-b2b-outbound-sales`, `cold-email-sequence-templates` and the glossary pillar (50 terms), plus three decision-stage comparison posts (`linkedin-outreach-agency-vs-manual-prospecting`, `ai-vs-traditional-lead-generation`, `personal-branding-agency-vs-content-freelancer`).

Deliberately not built:
- **`cold-email-agency-pricing-guide`** (and any "how much does an agency cost" page). Pricing is kept private, and the pricing pages were removed from the public site on purpose. A page quoting market ranges would also be the kind of unsourced number the editorial policy rules out. Revisit only if pricing becomes public.
- **Tool-vs-tool pages (for example Instantly vs Smartlead).** Same reasoning as the "Explicitly NOT recommended" list below: third-party claims, naming risk, off-strategy for a services agency.
- **Benchmark-style answer pages** ("what is a good reply rate", "safe sending volume"). The benchmark report and the deliverability guide already answer these with Myntmore's own data; a thinner second page would compete with them. Add a new one only with new, real data.

## Status, 2026-10-30

- Drafted (not published): Gmail and Yahoo sender requirements post (`content/posts/gmail-and-yahoo-sender-requirements.mdoc`, brief 4 of `content-briefs-2026-10-16.md`) and the `spam-complaint-rate` glossary term, which partly covers the provider-rules half of the compliance gap.
- Still open: brief 3 (new section on the outbound guide), brief 5 (LinkedIn connection request limits; blocked on the owner decision about how automation is described), and `cold-email-infrastructure-explained`.

## Status, 2026-11-13

- Drafted [B2B Lead Generation for IT Services](../content/posts/b2b-lead-generation-for-it-services.mdoc), covering a specific project offer, buying signals, stakeholder outreach and a pilot. It fills part of the vertical content gap and links to the existing IT landing page and software development case study.
- Drafted [Buying Committee](../content/glossary/buying-committee.json) to cover the definition, stakeholder roles and a worked example alongside the existing multi-threading article.
- The DMARC brief remains open. The current deliverability guide, SPF/DKIM/DMARC glossary entry and draft sender requirements article already cover much of its proposed outline. A separate page needs a distinct setup or troubleshooting focus.

## Method

Existing content answers "how do I do X" (tactics: sequences, deliverability, ICP mapping, lead magnets) and "why should I pick an agency" (agency-vs-in-house). It does not yet answer the questions a buyer asks in the two moments right before they convert or right after they start comparing options - pricing, legal risk, and channel choice - nor does it own the top-of-funnel definitional searches ("what is X") that a glossary/pillar strategy would normally capture. Gaps below are grouped by funnel stage.

## Bottom-funnel gaps (highest priority - buyer is close to a decision)

| Gap | Suggested page | Why it matters | Primary keyword (checked, no collision) |
|---|---|---|---|
| No pricing content anywhere on the site | `/blog/cold-email-agency-pricing-guide` | "How much does X cost" is one of the highest-intent, lowest-competition query patterns in B2B services SEO - searched by people actively budgeting, not researching. Every existing pricing *mention* is a passing phrase inside an `/lp/*` or city page, never its own ranking page. | `cold email agency pricing` |
| No compliance/legal content as its own page (only fleeting mentions in `cold-email-deliverability-guide` and one city page) | `/blog/cold-email-compliance-guide` (CAN-SPAM, GDPR, DPDP Act for India, CASL) | Real objection ("is this even legal?") that stalls deals; also a common informational search with very buyer-adjacent intent. India-specific (DPDP Act) angle is currently owned by no B2B outbound competitor content Myntmore would be up against. | `cold email compliance` |
| No channel-comparison content | `/blog/cold-email-vs-linkedin-outreach` | "X vs Y" is a proven comparison-intent format (site already validates this pattern with `agency-vs-in-house`, its highest structural analog) and directly pre-sells two of the 6 service pages at once. | `cold email vs linkedin outreach` |

## Mid-funnel gaps (evaluating approach, not yet vendor)

| Gap | Suggested page | Why it matters | Primary keyword (checked, no collision) |
|---|---|---|---|
| No dedicated "what is outbound / SDR" definitional pillar | `/blog/what-is-b2b-outbound-sales` | Definitional "what is X" searches are top-of-funnel but high-volume and easy to rank for with zero competition from bottom-funnel commercial pages; a natural internal-link hub pointing to all 6 service pages. | `what is b2b outbound sales` |
| No cold-email infrastructure/technical glossary (SPF/DKIM/DMARC/warm-up explained in plain English) | `/blog/cold-email-infrastructure-explained` | These exact acronyms already appear unexplained inside 3+ case studies and the deliverability guide; a dedicated explainer captures "what is DMARC for cold email"-type long-tail searches the current pages don't target directly. | `what is dmarc for cold email` |
| No sequence/cadence template content beyond one LinkedIn-specific post | `/blog/cold-email-sequence-templates` | `linkedin-outreach-sequences` exists but has no cold-email equivalent - an asymmetry given cold-email is the site's #1 service by page count of supporting content elsewhere. | `cold email sequence templates` |

## Structural / distribution gaps (not new topics - fixing how existing content is found)

- **No glossary/pillar page** tying the definitional posts above together (`/resources/glossary` or similar) - lower priority than the content itself; only worth building once 2-3 definitional posts exist to link from it.
- **`/lp/*` vertical pages have no supporting blog content** - e.g. nothing blog-side reinforces `saas-founders`, `pharma`, `financial-services`. Not urgent (the `/lp/*` pages are self-contained landing pages, not meant to rank organically the way blog posts do), but worth revisiting once the bottom-funnel gaps above are filled.

## Explicitly NOT recommended

- **"Best cold email tools 2026" / competitor roundup content** - usually written to rank for competitor brand terms; higher legal/reputational risk (naming competitors, third-party tool claims) for a marginal traffic gain, and off-strategy for a services agency vs. a software vendor.
- **New city pages** - 8 already exist and were deliberately scoped to metros with real client presence; adding more without a genuine client footprint would repeat the exact "invented fact" problem flagged and avoided elsewhere this session (LocalBusiness schema, benchmark report).

## Recommendation

Three bottom-funnel pages first (pricing, compliance, cold-email-vs-linkedin) - highest buyer-intent, lowest existing coverage, and none require any client-specific stat or claim beyond what's already public knowledge (pricing ranges, published compliance law, channel tradeoffs), so none carry the "don't fabricate a number" risk that constrained the benchmark-report and LocalBusiness-schema work.
