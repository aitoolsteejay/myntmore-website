# Biweekly SEO run · November 13, 2026

The site owner authorized the website release. The newsletter section is a distribution draft. The November 13 Search Console seven-day export, the 28-day overview, the coverage export, the previous cycle, the site audit and the production build are the evidence for this run. November 13 is the run date.

| Task | Result | Evidence or remaining work |
| --- | --- | --- |
| B1 · Indexing | Partial | The November 9 Page indexing data shows 201 indexed and 132 unindexed across all known pages. It cannot establish individual status or sitemap coverage. Use the follow-up below and the existing [request queue](gsc-request-indexing-list.md). |
| B2 · Internal links | Local patch | The five November 12 posts now each have three or more contextual inbound links. The draft article has three before counting its hub listing. Related city pages, career listings and existing content gained links as well. |
| B3 · Orphans | Fails literal allow-list | 35 orphan records. Eight match the named routes. The other 27 are listed or grouped below. |
| B4 · Positions 8–20 | Pending data | The 14-day query × page data is still needed to qualify and rank candidates. |
| B5 · Low CTR | Pending data | Search Console displayed 282 clicks, 12.9k impressions, 2.2% CTR and position 14 for October 14–November 10. Chrome blocked the export. Windsor has GA4 connected but no Search Console property. The overview does not provide qualifying page rows. |
| B6 · Blog | Draft verified | [B2B Lead Generation for IT Services](../content/posts/b2b-lead-generation-for-it-services.mdoc). 844 body words, five H2s, three FAQ answers of 50–51 words, existing CMS article layout and branded OG image, service and glossary links, and booking CTA. |
| B7 · Glossary | Draft verified | [Buying Committee](../content/glossary/buying-committee.json). 24-word definition, 325-word supporting body, worked example, DefinedTerm schema, breadcrumb and two inbound blog links. |
| B8 · Distribution | Draft ready | Newsletter section and UTM-tagged link below. |
| B9 · Records | Updated | [Keyword map](keyword-map.md) records the live additions and two drafts. [Content gaps](content-gaps.md) reflects both topics. The first-keyword scan found zero exact duplicates across 268 page and post records. |
| B10 · Commercial opportunities | Scored | Ranked below. Conversion estimates remain qualitative until qualified organic enquiries can be tied to landing pages. |
| B11 · Impact log | Backfilled | See the deployment and measurement rows below. |

## B1 · Inspection queue

The cutoff for URLs live at least 14 days is October 30. Start with the October 28 blog migration and the older service and case-study URLs already flagged in the request queue. Use the canonical URL for each inspection and log Google’s selected canonical, coverage reason, sitemap membership and contextual inbound count. All seven named targets below appear in the sitemap. The site audit reports 16 inbound sources for the services hub, 15 for GTM Strategy and 3–4 for each listed blog. The Positive Reply article has only two recorded editorial sources once its hub listing is excluded, so check that threshold before requesting indexing. The October 30 snapshot verified 158 of 265 sitemap URLs as indexed and reported 24 URLs unknown to Google, mostly after the blog migration. That is historical evidence. November 12 posts become eligible November 26.

| Order | Targets | Follow-up |
| --- | --- | --- |
| 1 | `/services`, `/services/gtm-strategy` | Confirm whether Google now selects the site’s own canonical. The previous request for `/services` was accepted on November 13. |
| 2 | `/resources/blogs/outbound-offer-problem`, `/resources/blogs/how-to-write-a-linkedin-hook`, `/resources/blogs/ai-personalization-cold-outreach`, `/resources/blogs/cold-email-follow-up-sequence`, `/resources/blogs/positive-reply-to-booked-meeting` | Check indexing on the migrated paths and compare the old paths if Google still selects them. |
| 3 | The remaining case-study, career and glossary URLs in the request queue | Confirm sitemap and contextual links before requesting indexing. Recheck an eligible unindexed URL seven days after inspection, then queue improvements if it remains unindexed at 28 days. |

## B2 and B3 · Link audit

The blog source check excludes the blog hub. Account Targeting Strategy receives contextual links from the Target Account Strategy glossary, ICP Mapping, the multi-threading article and the new IT services draft. Lead Scoring receives links from Account Targeting Strategy, ICP Mapping and Outbound Funnel Math. Inbound and Outbound receives links from the benchmark report, Founder-Led Sales and the outbound sales guide. Investor Outreach receives links from Account Targeting Strategy, Founder-Led Sales and the multi-threading article. The Bangalore SaaS article receives links from the benchmark report, Inbound and Outbound and Lead Scoring. Each of these posts already links to at least two related pages.

The city audit undercounts links rendered from city JSON. The rendered pages confirm three contextual inbound links each for Coimbatore, Gurugram, Indore, Jaipur, Noida and Surat, and four each for Abu Dhabi and Dubai. Each city page links out to multiple related services or case studies. The career intern listing has two related role links and its careers index link. Its body links to two relevant guides. The Accounting and CFO Firms landing page and the Spam Complaint Rate glossary entry each have at least three editorial references in the draft.

The eight approved orphans are present. Of the 27 additional records, 14 are noindex booking paths under `/calendar/`, one is the noindex legacy `/agency-vs-in-house`, one is the noindex redirect alias `/founder-meeting`, two are noindex internal research routes, eight are masked private routes and one is the Keystatic admin template. Recommend documenting exceptions for the booking, research, private and admin routes. Keep the existing founder-meeting redirect. For the legacy agency comparison, redirect to `/resources/blogs/agency-vs-in-house` after confirming the older landing page has no distinct audience or active use.

## B4 and B5 · Search Console follow-up

Provide Search Console Web Search rows for October 28–November 10 by query and page, with impressions and position, and October 14–November 10 by page, with clicks and impressions. Apply the requested thresholds to each row. The 28-day query table showed 900 impressions and one click for “cold reply meaning.” The previous seven-day page export showed 443 impressions and no clicks for the cold-replies article. The live crawl found the current page title was 67 characters, so the draft shortens the search title to “Cold Reply Meaning, Examples & How to Respond | Myntmore” (56 characters) while keeping the current H1. This is a crawl fix independent of B4 and B5 qualification.

## B6 and B7 · Source and release checks

The earlier DMARC brief overlaps with existing deliverability and glossary content. The IT services article uses the next backlog brief. It cites Myntmore’s published US software development case study, which reports 24 booked meetings, 19 held, seven defined requirements and four proposals requested. The draft brief’s figure of 38 does not match the published case study. The Buying Committee draft supports the existing multi-threading guide and uses a hypothetical warehouse integration example.

The build renders both routes. The blog appears on the blog hub and in both sitemaps. The glossary entry appears in the glossary index and in both sitemaps. The local crawl reports 286 of 286 healthy sitemap URLs and zero failures. The link audit found zero broken internal links. The live crawl reported one real page-level failure, the cold-replies title, plus two sitemap mismatches because the live crawl read the draft’s local audit inventory.

## B8 · Newsletter draft

**Subject line or section heading:** One project your IT services buyer can recognize

“Custom software development” asks the buyer to imagine where you fit. Start with a project instead. If a retailer opens a second warehouse and posts a job for an integration engineer, ask how the new site will share stock data with its existing order system. The question gives the engineering or operations lead something specific to answer.

Before you build the list, choose one project your team has already delivered. Find the technical and business owners, then match each one to an example they can use. On the first call, ask what triggered the project and who owns the next decision.

Read the [IT services lead generation playbook](https://www.myntmore.com/resources/blogs/b2b-lead-generation-for-it-services?utm_source=outbound_operator&utm_medium=email&utm_campaign=it_services_lead_generation) for the account selection checklist and 30-day pilot.

Distribution log: November 13, article `b2b-lead-generation-for-it-services`, newsletter section above, draft. Use the tagged URL after the article is live.

## B10 · Commercial opportunities

Score is intent + visibility gap + conversion value + confidence + ease, each from 1 to 3. Where evidence is missing, confidence and visibility scores are conservative. Owners are proposed roles.

| Rank | Opportunity | Score | Evidence and dependency | Proposed owner and outcome |
| --- | --- | ---: | --- | --- |
| 1 | Reinspect the core services hub | 14 | Prior indexing exclusion and accepted request. Requires URL Inspection. | SEO operator · Verify indexed status and canonical |
| 2 | Measure the Mumbai landing page refresh | 13 | Prior seven-day page row showed 55 impressions and zero clicks. Requires post-release search and enquiry data. | SEO operator · More attributable service enquiries |
| 3 | Fix the cold-replies search title | 12 | 67-character live title and prior seven-day page row of 443 impressions. Local patch is ready. | Website owner · Release a concise search title |
| 4 | Release the IT services playbook | 12 | Published case study and relevant service coverage. Requires release approval. | Content owner · Attract qualified IT services readers |
| 5 | Review Delhi and Hyderabad query-to-page matches | 11 | Prior seven-day page rows showed 80 and 36 impressions. Requires paired query and page rows. | SEO operator · Align local search pages with buyer intent |
| 6 | Improve discovery of new city pages | 11 | New city pages needed contextual links. Draft adds editorial paths. | Website owner · Make regional service pages easier to find |
| 7 | Review Vibe Prospecting guide CTR | 10 | Prior seven-day page row showed 276 impressions and one click. Requires 28-day row. | Content owner · Identify whether the snippet needs a revision |
| 8 | Reinspect older commercial case studies | 10 | Prior inspection found many discovered URLs. Requires current individual results. | SEO operator · Identify where case-study proof is absent from search |
| 9 | Measure qualified organic enquiries | 10 | First-touch capture deployed November 11. Requires actual form and CRM records. | Revenue operations · Connect organic landing pages to qualified leads |
| 10 | Release Buying Committee glossary entry | 9 | Draft fills a definition gap and links to the related article. | Content owner · Give buyers a reference for stakeholder mapping |

## B11 · Change impact

| Date | URL or group | Hypothesis and baseline | Review and confounders |
| --- | --- | --- | --- |
| Nov 11 · deployed | Vibe Prospecting guide | Clearer setup language may improve clicks. Seven-day pre-review page row: 276 impressions, one click, position 6.67. | Dec 9 · SEO operator. Capture full comparable pre-release dates if available. |
| Nov 11 · deployed | Forms and booking attribution | First-touch landing page and source can tie enquiries to SEO. No verified pre-release count for qualified organic enquiries. | Dec 9 · Revenue operations. Confirm field coverage and deduplicate submissions. |
| Nov 12 · deployed | Eight city pages and existing city page refreshes | Region-specific copy and internal links improve discovery. Baseline pending by page. | Dec 10 · SEO operator. Separate new pages from existing pages. |
| Nov 13 · deployed | Mumbai | Clearer service copy and case proof may increase qualified clicks. Seven-day page baseline: 55 impressions, zero clicks, position 22.2. | Dec 11 · SEO operator. Check query overlap with homepage. |
| Nov 13 · deployed | Cold-replies article | Definition-led title and opening may improve clicks. Seven-day page baseline: 443 impressions, zero clicks, position 2.75. | Dec 11 · SEO operator. Log the local title shortening as a second change when released. |
| Nov 13 · deployed | Webinar recording and two guides | Index directives and sitemap entries let Google consider the three pages for indexing. Pre-release HTML used `noindex`. | Check individual coverage after recrawl · SEO operator. |
| Pending release | IT services article, glossary and contextual links | New pages should be discoverable through hub and content links. Both routes are new and have no pre-release search metrics. | 28 days after release · SEO operator. Record the production date first. |

The checklist budgets about 80 minutes for the B1–B4 audits, 30 minutes for B5 and 35–50 minutes for B10–B11. Estimate 30–60 minutes for the remaining Search Console extraction, filtering and inspection triage once access is restored, plus time to review and release the local patch.
