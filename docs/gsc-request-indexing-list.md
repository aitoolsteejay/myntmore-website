# Google Search Console Request Indexing Priority Checklist

This checklist organizes the URLs that require manual "Request Indexing" submission in Google Search Console (GSC). Google imposes a daily inspection/request quota (typically 10 to 12 requests per day), so process these in batches following the schedule below.

---

## How to Submit URLs in Google Search Console

For each URL in the priority batches below:
1. Open Google Search Console for property `https://www.myntmore.com/`.
2. Paste the full URL into the top search bar ("Inspect any URL in https://www.myntmore.com/").
3. Click **Test Live URL** (top right).
4. Wait for the test to complete, then click **View Tested Page**:
   - Check the **Screenshot** tab: Ensure the rendered page displays Myntmore content and layout.
   - Check the **HTML** tab: Verify `<link rel="canonical" href="https://www.myntmore.com/..." />` points to the exact same page.
   - Check the **HTTP Response**: Ensure HTTP status is 200.
5. If the live test confirms indexability, click **Request Indexing**.
6. If the live test displays foreign content or errors, treat as a DNS/security issue immediately.

---

## November 13 priority articles

- [x] `https://www.myntmore.com/resources/blogs/account-targeting-strategy`
- [x] `https://www.myntmore.com/resources/blogs/lead-scoring-b2b-outbound`
- [x] `https://www.myntmore.com/resources/blogs/inbound-vs-outbound-together`
- [ ] `https://www.myntmore.com/resources/blogs/investor-outreach-for-founders` (live test passed, request rejected due to the daily quota)
- [ ] `https://www.myntmore.com/resources/blogs/how-bangalore-saas-companies-get-b2b-leads`

Search Console accepted `/services` and the three checked articles on November 13. Resume with the two unchecked articles when the quota resets.

## Batch 1: Urgent - Wrong-Canonical Overwrite (Days 1 & 2)

**Issue:** Google has historically flagged these URLs as "Duplicate without user-selected canonical" and attributed canonical ownership to unrelated external domains (`747live.bet` or `winzir.ph`) based on stale crawls (July to August 2026).
**Status in Code:** All 19 pages return HTTP 200, self-referencing canonical tags, and `index, follow` robots headers.

### Day 1 (Core Commercial & Careers - 10 URLs)
- [x] `https://www.myntmore.com/services` (request accepted November 13)
- [ ] `https://www.myntmore.com/services/gtm-strategy`
- [ ] `https://www.myntmore.com/careers/gtm-strategist`
- [ ] `https://www.myntmore.com/careers/content-marketing-strategist-intern`
- [ ] `https://www.myntmore.com/careers/systems-ai-automation-intern`
- [ ] `https://www.myntmore.com/blog/agency-vs-in-house`
- [ ] `https://www.myntmore.com/blog/ecommerce-conversion-playbook`
- [ ] `https://www.myntmore.com/blog/linkedin-profile-inbound-lead-machine`
- [ ] `https://www.myntmore.com/blog/personal-branding-agency-vs-content-freelancer`
- [ ] `https://www.myntmore.com/case-studies/founder-personal-brand-linkedin`

### Day 2 (Case Studies & Stale Canonical Glossaries - 9 URLs)
- [ ] `https://www.myntmore.com/case-studies/b2b-founder-tech-decision-makers`
- [ ] `https://www.myntmore.com/case-studies/agencies-it-branding-agency-meetings`
- [ ] `https://www.myntmore.com/case-studies/financial-services-wealth-management-discovery`
- [ ] `https://www.myntmore.com/case-studies/financial-services-corporate-finance-meetings`
- [ ] `https://www.myntmore.com/case-studies/insurance-insurtech-product-demos`
- [ ] `https://www.myntmore.com/case-studies/insurance-health-advisory-consultations`
- [ ] `https://www.myntmore.com/case-studies/manufacturers-exporters-engineering-goods-replies`
- [ ] `https://www.myntmore.com/resources/glossary/founder-led-sales`
- [ ] `https://www.myntmore.com/resources/glossary/existing-connection-nurturing`

---

## Batch 2: Stale "Excluded by 'noindex' tag" Case Studies (Day 3)

**Issue:** GSC reports these 9 case studies as excluded by a `noindex` tag from crawls on 10-11 October 2026.
**Status in Code:** Every page is currently `index, follow` with canonical tags. A single live inspection and indexing request will clear Google's stale record.

### Day 3 (9 Case Studies)
- [ ] `https://www.myntmore.com/case-studies/agencies-it-usa-conversion-optimization`
- [ ] `https://www.myntmore.com/case-studies/agencies-it-usa-software-development`
- [ ] `https://www.myntmore.com/case-studies/financial-services-uk-bookkeeping`
- [ ] `https://www.myntmore.com/case-studies/insurance-singapore-commercial-coverage`
- [ ] `https://www.myntmore.com/case-studies/manufacturers-exporters-france-packaging`
- [ ] `https://www.myntmore.com/case-studies/manufacturers-exporters-germany-industrial-components`
- [ ] `https://www.myntmore.com/case-studies/manufacturers-exporters-uae-kitchen-equipment`
- [ ] `https://www.myntmore.com/case-studies/pharma-india-dermatologist-outreach`
- [ ] `https://www.myntmore.com/case-studies/pharma-usa-api-second-source`

---

## Batch 3: High-Impact Discovered / Unindexed Assets (Day 4)

**Issue:** Pages listed in the sitemap that Google has discovered but not yet crawled due to queue backlog on a growing site.
**Fix:** Accelerate entry into the index for our highest-converting tools, geographic hubs, and commercial guides.

### Day 4 (10 High-Priority Assets)
- [ ] `https://www.myntmore.com/case-studies/markets/uae`
- [ ] `https://www.myntmore.com/case-studies/markets/united-kingdom`
- [ ] `https://www.myntmore.com/case-studies/markets/singapore`
- [ ] `https://www.myntmore.com/case-studies/markets/france`
- [ ] `https://www.myntmore.com/case-studies/markets/germany`
- [ ] `https://www.myntmore.com/tools/linkedin-hook-grader`
- [ ] `https://www.myntmore.com/tools/cold-email-roi-calculator`
- [ ] `https://www.myntmore.com/resources/guides/how-to-choose-b2b-lead-generation-agency-india`
- [ ] `https://www.myntmore.com/resources/guides/linkedin-content-to-calls-starter-kit`
- [ ] `https://www.myntmore.com/careers`
