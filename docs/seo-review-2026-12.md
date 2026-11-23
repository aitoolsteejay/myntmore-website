# SEO review sheet: changes from 11 to 19 November 2026

Fill this in between **9 and 11 December 2026**, when the changes below have had about four weeks in Google. Everything a person needs to fill in is marked `__`. Nothing here needs code.

## How to pull the numbers

1. **Search Console → Performance → Search results.** Set the date range to **Compare**, "Last 28 days" against "Previous period". On 9 December that compares 11 Nov to 8 Dec with 14 Oct to 10 Nov, which puts almost all of these changes in the "after" window.
2. For a page row below: **+ New → Page → Exact URL**, paste the address, and read clicks, impressions, CTR and average position for both periods.
3. For a query row: filter **Query → Exact query** instead.
4. **New pages** have no "before". For those, record whether the page is indexed (**URL Inspection**) and its impressions and clicks since launch.
5. Judge changes as groups, not page by page. The city pages each had three or four changes in one week, so no single change can be credited on its own.

Rules of thumb, from `docs/gsc-baseline-2026-10-26.md`: judge a **title** change on CTR at a similar position, and a **content** change on position. Average position can fall while traffic rises, because the site starts showing for broader searches.

## 1. Site-wide numbers

| Measure | Before (source) | 9 Dec | Change |
|---|---|---|---|
| Clicks, last 28 days | 282, for 14 Oct to 10 Nov (biweekly run, 13 Nov) | __ | __ |
| Impressions, last 28 days | 12.9k, same window | __ | __ |
| CTR | 2.2%, same window | __ | __ |
| Average position | 14, same window | __ | __ |
| Pages indexed | 201 indexed, 132 not, on 9 Nov (Pages report) | __ | __ |
| City pages on page 1 (position 10 or better) | 5 of 8, week to 6 Nov | __ of 16 | __ |
| AI tracker prompts that mention Myntmore | not measured (0 of 64 rows filled) | __ of 64 | n/a |

## 2. City pages

Every city page changed between 12 and 17 November: internal links from across the site, a block of real case studies, a service-in-this-city schema instead of a local-business one, emojis and hub strips, and all FAQ answers rewritten to 40 to 60 words. The rows note the changes specific to each city.

Before = average position for the week to 6 November (`docs/seo-weekly-run-2026-11-06.md`).

| Page | Changes specific to this page | Before | 9 Dec position | Clicks before → after | Verdict |
|---|---|---|---|---|---|
| `/b2b-lead-generation-ahmedabad` | Filled out on 17 Nov | 6.4 | __ | __ | __ |
| `/b2b-lead-generation-delhi` | 12 Nov: title to "B2B Lead Generation Company in Delhi NCR", new intro naming Gurugram and Noida; Delhi FAQs added | 7.8 | __ | __ | __ |
| `/b2b-lead-generation-chennai` | Filled out on 17 Nov | 8.2 | __ | __ | __ |
| `/b2b-lead-generation-hyderabad` | 12 Nov: headline and intro around "lead generation company in Hyderabad"; 13 Nov: links to the pharma guide | 8.8 | __ | __ | __ |
| `/b2b-lead-generation-mumbai` | 13 Nov: copy and case proof; 17 Nov: takes over the Mumbai queries from the homepage | 9.3 (7-day row on 13 Nov: 55 impressions, 0 clicks, position 22.2) | __ | __ | __ |
| `/b2b-lead-generation-kolkata` | 12 Nov: title to "B2B Lead Generation Company in Kolkata", "business buyers, not patients" in the snippet; 13 Nov: links to the healthcare guide | 12.7 | __ | __ | __ |
| `/b2b-lead-generation-pune` | 12 Nov: headline and intro around "lead generation companies in Pune"; 13 Nov: links to the manufacturing guide | 18.2 | __ | __ | __ |
| `/b2b-lead-generation-bengaluru` | 12 Nov: title to "Lead Generation Companies in Bangalore for SaaS", SaaS-first rewrite; links to the Bangalore guide | 50.4 | __ | __ | __ |
| `/b2b-lead-generation-gurugram` | New, 12 Nov | new | __ | __ | __ |
| `/b2b-lead-generation-noida` | New, 12 Nov | new | __ | __ | __ |
| `/b2b-lead-generation-jaipur` | New, 12 Nov | new | __ | __ | __ |
| `/b2b-lead-generation-indore` | New, 12 Nov | new | __ | __ | __ |
| `/b2b-lead-generation-surat` | New, 12 Nov | new | __ | __ | __ |
| `/b2b-lead-generation-coimbatore` | New, 12 Nov | new | __ | __ | __ |
| `/b2b-lead-generation-dubai` | New, 12 Nov | new | __ | __ | __ |
| `/b2b-lead-generation-abu-dhabi` | New, 12 Nov | new | __ | __ | __ |

**City queries to check** (Query filter; before = `docs/gsc-baseline-2026-10-26.md`, 28 days to 26 Oct):

| Query | Page it should land on | Before | 9 Dec position | Lands on the right page? |
|---|---|---|---|---|
| b2b lead generation companies in pune | Pune | 95 impressions, position 13.9 | __ | __ |
| lead generation company in hyderabad | Hyderabad | 57 impressions, position 19.4 | __ | __ |
| lead generation company in chennai | Chennai | 56 impressions, position 6.2 | __ | __ |
| sales lead generation companies in bangalore | Bengaluru | 56 impressions, position 61.8 | __ | __ |
| b2b lead generation companies in mumbai | Mumbai (not the homepage) | 46 impressions, position 33.3 | __ | __ |
| healthcare lead generation services in kolkata | Kolkata | 98 impressions, position 37.9 | __ | __ |
| patient lead generation services in kolkata | Kolkata (expect fewer clicks: the page now says it is not for patient leads) | 106 impressions, position 32.8 | __ | __ |
| lead generation company in delhi | Delhi | 11 impressions (biweekly run, 30 Oct) | __ | __ |

## 3. Industry × city pages (new, 18 Nov)

Fifteen pages, about 1,150 to 1,300 words each. For each: is it indexed, and does it get impressions? A page with no impressions after four weeks is worth a request in URL Inspection; several with none would suggest Google sees them as too similar.

| Page | Indexed? | Impressions | Clicks |
|---|---|---|---|
| `/b2b-lead-generation-automotive-manufacturing-chennai` | __ | __ | __ |
| `/b2b-lead-generation-bfsi-gurugram` | __ | __ | __ |
| `/b2b-lead-generation-brokers-mumbai` | __ | __ | __ |
| `/b2b-lead-generation-chemical-manufacturing-ahmedabad` | __ | __ | __ |
| `/b2b-lead-generation-distributors-mumbai` | __ | __ | __ |
| `/b2b-lead-generation-exporters-kolkata` | __ | __ | __ |
| `/b2b-lead-generation-industrial-automation-pune` | __ | __ | __ |
| `/b2b-lead-generation-insurance-gurugram` | __ | __ | __ |
| `/b2b-lead-generation-insurance-mumbai` | __ | __ | __ |
| `/b2b-lead-generation-logistics-mumbai` | __ | __ | __ |
| `/b2b-lead-generation-pharma-hyderabad` | __ | __ | __ |
| `/b2b-lead-generation-pharma-mumbai` | __ | __ | __ |
| `/b2b-lead-generation-stone-marble-exporters-jaipur` | __ | __ | __ |
| `/b2b-lead-generation-textile-manufacturing-ahmedabad` | __ | __ | __ |
| `/b2b-lead-generation-textile-manufacturing-surat` | __ | __ | __ |

## 4. Other new pages

| Page | Date | What it should rank for | Indexed? | Impressions | Clicks |
|---|---|---|---|---|---|
| `/resources/blogs/lead-scoring-b2b-outbound` | 12 Nov | lead scoring for outbound | __ | __ | __ |
| `/resources/blogs/investor-outreach-for-founders` | 12 Nov | investor outreach | __ | __ | __ |
| `/resources/blogs/inbound-vs-outbound-together` | 12 Nov | running inbound and outbound together | __ | __ | __ |
| `/resources/blogs/account-targeting-strategy` | 12 Nov | account targeting strategy | __ | __ | __ |
| `/resources/blogs/how-bangalore-saas-companies-get-b2b-leads` | 12 Nov | how to get B2B leads in Bengaluru; supports the Bengaluru page | __ | __ | __ |
| `/resources/blogs/how-hyderabad-pharma-companies-find-b2b-buyers` | 13 Nov | pharma lead generation Hyderabad; supports the Hyderabad page | __ | __ | __ |
| `/resources/blogs/how-pune-manufacturers-find-b2b-buyers` | 13 Nov | lead generation for manufacturers in Pune; supports the Pune page | __ | __ | __ |
| `/resources/blogs/how-kolkata-healthcare-suppliers-reach-hospital-buyers` | 13 Nov | B2B healthcare lead generation Kolkata; supports the Kolkata page | __ | __ | __ |
| `/resources/blogs/b2b-lead-generation-for-it-services` | 13 Nov (expanded the same day) | b2b lead generation for IT services | __ | __ | __ |
| `/resources/blogs/b2b-lead-generation-for-corporate-gifting` | 13 Nov | **Test market.** Any impressions or enquiries at all show whether corporate gifting is worth pursuing | __ | __ | __ |
| `/resources/glossary/buying-committee` | 13 Nov | buying committee | __ | __ | __ |
| `/resources/glossary/cold-reply` | 17 Nov | cold reply meaning (took over from the reply post) | __ | __ | __ |
| `/resources/guides/cold-email-infrastructure-setup` | 17 Nov | cold email infrastructure setup | __ | __ | __ |
| `/resources/guides/smartlead-setup` | 17 Nov | Smartlead setup | __ | __ | __ |
| `/tools/cold-email-inbox-calculator` | 17 Nov | cold email inbox and domain calculator | __ | __ | __ |
| `/lp/ecommerce-tech` | 17 Nov | lead generation for eCommerce tech | __ | __ | __ |
| `/lp/professional-services` | 17 Nov | lead generation for professional services | __ | __ | __ |

## 5. Existing pages that changed

| Page | Date and change | Before | 9 Dec | Verdict |
|---|---|---|---|---|
| `/resources/blogs/handling-cold-email-replies` | 13 Nov: definition-led title and opening; 17 Nov: the "cold reply" definition moved to the new glossary term, and the post went back to being about handling replies | 443 impressions, 0 clicks, position 2.75 (7-day row, 13 Nov) | __ | __ |
| `/resources/blogs/cold-email-sequence-templates` | 17 Nov: title to "Cold Email Sequence Template: 5 Emails + Follow-Ups" and copy-ready templates; **19 Nov: title shortened to "Cold Email Sequence Template: 5 Emails + Example"** to fit the new 49-character limit. Two title changes in three days, so judge this page on the combined result | __ (pull 14 Oct to 10 Nov) | __ | __ |
| `/resources/blogs/agency-vs-in-house` | 17 Nov: sharpened comparison | __ | __ | __ |
| `/resources/blogs/cold-email-vs-linkedin-outreach` | 17 Nov: sharpened comparison | __ | __ | __ |
| `/resources/guides/how-to-set-up-vibe-prospecting` | 11 Nov: clearer setup language | 276 impressions, 1 click, position 6.67 (7-day row) | __ | __ |
| `/` (homepage) | 12 Nov: sharper snippet; 17 Nov: Mumbai queries handed to the Mumbai page | __ | __ | __ |
| `/resources/guides/education-guide` and two other resources | 13 Nov: made indexable (were noindex) | not indexed | Indexed? __ | __ |
| The 10 free tool pages under `/tools/` | 12 Nov: titles and descriptions aimed at what people search | __ (total for the group) | __ | __ |
| The six market pages under `/case-studies/markets/` | 17 Nov: real content on each | __ (total for the group) | __ | __ |

## 6. Site-wide changes to check separately

These touched many pages at once, so they show up in the AI tracker and Google's rich results rather than in one page's numbers.

| Change | Date | How to check | Result |
|---|---|---|---|
| Every FAQ answer rewritten to 40 to 60 words, answer first (394 answers) | 13 Nov | Run the AI tracker prompts (`docs/ai-visibility-tracker.csv`); check whether Google shows FAQ-style answers from the site | __ |
| City pages declare a service in that city instead of a local business at the Mumbai address | 12 Nov | Rich Results Test on two city pages: no errors | __ |
| Open Graph tags completed, branded share cards | 11 and 14 Nov | Paste three pages into LinkedIn's Post Inspector | __ |
| Blog posts and glossary terms link to the service pages | 12 Nov | Service pages' positions, in the Performance report | __ |
| Search titles and descriptions editable in Keystatic; the CMS refuses titles over 49 characters | 12 and 19 Nov | Nothing to measure; prevents titles being cut off in Google | n/a |
| Page speed fixes, site-wide: hero headlines now count for Largest Contentful Paint (they faded in from opacity 0, so the reels pop-up at 5s became the LCP on several pages), and count-up figures and the homepage's rotating text no longer shift the layout | 20 Nov | Search Console, Core Web Vitals report (mobile): expect fewer "poor" or "needs improvement" URLs once 28 days of field data have passed. Lab before and after: LCP about 6.4s to 0.3s on the Mumbai, cold email, LinkedIn and case studies pages; layout shift 0.53 to 0 (LinkedIn page), 0.24 to 0 (pharma page), 0.36 to under 0.01 (homepage). This also touches the city pages in section 2, so a small ranking gain there may be partly speed | __ |

## Held until after this review

Small fixes deliberately not made, so they don't change pages being measured here. Apply them once the review is done:

- Search descriptions a few characters over 155 (Google may cut the last word): `/b2b-lead-generation-mumbai` (159), `/b2b-lead-generation-noida` (160), `/b2b-lead-generation-insurance-mumbai` (157), `/b2b-lead-generation-gurugram` (156), `/b2b-lead-generation-indore` (156).
- Share title over 70 characters (cut off on X): `/b2b-lead-generation-automotive-manufacturing-chennai` (76).
- FAQ answer that opens with a hedge instead of the answer: `/lp/ecommerce-tech`, "Who should we contact at a D2C brand: the founder or someone else?" starts "It depends on what your product fixes." (edit in Keystatic, Page FAQs, `lp-ecommerce-tech`).

## 7. What to do with the results

- **A city page that moved onto page 1:** leave it alone for another month.
- **A city page still past position 20:** it needs more than copy changes; links from other sites (directories, reviews, PR) are the remaining lever.
- **A new page not indexed after four weeks:** request indexing once in URL Inspection, then improve it if it is still out a week later.
- **Industry × city pages with no impressions:** compare them with the parent city page before writing more of them.
- **Corporate gifting post:** no impressions or enquiries by January means the test market is not worth a landing page yet.
