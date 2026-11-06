# Weekly SEO run, Friday 2026-11-06 (W1 to W15)

Run from the repo root against the live site and the connected tools (Search Console, Zoho CRM, Vercel). Search Console data runs through Wed 2026-11-04. Week 6 (Mon 2 to Sun 8 Nov) is not finished, so the scorecard below is partial and is marked as such. Nothing was deployed, published or submitted other than the careers page already pushed this week.

## Result table

| Task | Result | Status |
| --- | --- | --- |
| W1 Site health crawl | `scripts/seo-crawl.py`, exit 0. Site Health 268/268 = 100%. Schema 259/268 = 96.6% (same as the 10-30 run). | PASS |
| W2 Sitemap and robots | sitemap.xml 200 with 268 URLs. robots.txt 200 with the `Sitemap:` line. The local build of the same code lists 268 URLs (267 plus the new Lead Gen Intern page). | PASS |
| W3 Manual actions and security | Not reachable by API; no Chrome extension connected. Needs you. | NEEDS YOU |
| W4 Wrong-canonical tripwire | `/` indexed (crawled today). `/services` still "Duplicate without user-selected canonical", last crawled 2026-07-27 (unchanged since 10-16). 18 of the 19 Batch 1 URLs are still in this state; only `/careers/gtm-strategist` cleared. `/careers/lead-gen-intern` is "unknown to Google" (published yesterday). The batch tool reports coverage, not the Google-selected canonical, so the foreign-domain targets were not re-read. | FAIL (known, waiting on Request Indexing) |
| W5 Indexing errors | The Pages report is not available through the API. Needs a Search Console export to compare with last week. Last measured: 158 of 265 indexed (10-30). | NEEDS YOU |
| W6 Core Web Vitals | Not available (no Search Console UI access; PageSpeed keyless quota was exhausted on 10-16). Speed Insights is now installed on the site and will start collecting field data once enabled in the Vercel project. | NEEDS YOU |
| W7 Search snapshot | See below. | PASS |
| W8 KPI scorecard | See below (partial week). | PARTIAL |
| W9 Newsletter | Zoho Campaigns is not connected. Needs the campaign report. | NEEDS YOU |
| W10 Distribute what shipped | Pages shipped since 10-30 listed below with draft copy. No LinkedIn post log was supplied, so pass/fail cannot be set. | NEEDS YOU |
| W11 Content backlog | 5 briefs were written on 10-16. Since then brief 4 (Gmail and Yahoo post) is drafted and unpublished, and the `spam-complaint-rate` term shipped. Briefs 3 and 5 and `cold-email-infrastructure-explained` are open, and brief 5 is blocked on your decision about how LinkedIn automation is described. Unblocked and ready: 2 (briefs 3 and the infrastructure explainer). Target is 4. | FAIL, build 2 new briefs |
| W12 Events accuracy | One event, "predictable-pipeline-webinar", ended 2026-09-19. The page decides "upcoming" from `isoEndDateTime` and re-renders hourly, so it shows as "Held" and the upcoming list is empty. No event in the upcoming list has a past date. | PASS |
| W13 Careers accuracy | 8 role pages, each with a card on `/careers`. Soonest `validThrough` is 2027-01-28 (83 days). Closed roles `/careers/content-strategist` and `/careers/senior-sales-head` both return 308 to `/careers`. I cannot confirm each role is actually open without your approved list. | PASS (list unverified) |
| W14 Organic attribution | Zoho search for Lead_Source = Website, created 2026-10-26 to 2026-11-06, returned no records, so there is nothing to reconcile this week. Structural gap: every Zoho form posts `zf_referrer_name` empty and carries no UTM, landing page or referrer field (`LeadCaptureForm.tsx`, `contact-us/page.tsx`, `LandingPage.tsx`, `LeadGate.tsx`), so organic cannot be separated from other sources even when leads arrive. | FAIL (instrumentation) |
| W15 Form and booking reliability | I did not submit any form, because production forms create real CRM records. Checked instead: the 10 Zoho form endpoints I tested all respond (302, not 404), the feedback form returns 200, and `/book-a-call` returns 200 with the Zoho Bookings embed present. A real submit test needs your approval for a synthetic record. | PASS (read-only) |

## W7 Search performance (Search Console, sc-domain:myntmore.com, web)

Window 10-29 to 11-04 against 10-22 to 10-28.

| Metric | 10-29 to 11-04 | 10-22 to 10-28 | Change |
| --- | --- | --- | --- |
| Clicks | 71 | 91 | -22% |
| Impressions | 3,922 | 3,110 | +26% |
| CTR | 1.81% | 2.93% | down |
| Average position (impression weighted) | 14.6 | 14.5 | flat |

Pages with 20 or more clicks the previous week: only the homepage (57 to 45 clicks, -21%). That is inside the 50% limit. Smaller drops are below the threshold: `/careers/hr-operations-intern` 4 to 0, `/contact-us` 3 to 0, `/resources/tools` 2 to 0. Biggest impression gain: `/resources/blogs/handling-cold-email-replies`, 0 to 604, at position 3.1 with 1 click.

## W8 Scorecard, week 6 so far (Mon 11-02 to Wed 11-04 only)

| Row | Value | Notes |
| --- | --- | --- |
| Organic leads | 0 | Zoho Website source, 10-26 to 11-06: none |
| Non-brand clicks | 5 | 3 days only (week 5: 5) |
| Non-brand impressions | 1,091 | 3 days only (week 5: 1,923) |
| Queries in top 10 | not counted | Partial week, hand count would not be comparable (week 5: about 178) |
| City pages on page 1 | 5 of 8 | Ahmedabad 6.4, Delhi 7.8, Chennai 8.2, Hyderabad 8.8, Mumbai 9.3. Kolkata 12.7, Pune 18.2, Bengaluru 50.4 (week 5: 4 of 8) |
| Submitted pages | 267 in GSC for the www sitemap, 268 for the apex sitemap, 268 live | 0 errors |
| Indexed pages | not re-pulled | Last: 158 of 265 on 10-30 |
| Site health | 100% (268/268) | Live crawl today |
| Schema coverage | 96.6% (259/268) | Same as 10-30 |
| AI referral visitors | 0 visible | Referrers 10-29 to 11-05: google.com 117, instagram 77 (l.instagram.com and instagram.com), linkedin.com 16, "Others" 12 not broken out. No AI host appears in the list |
| AI citation rate | not measured | Needs you (ChatGPT bot check) |

The non-brand totals came from one query-level pull with only "myntmore" excluded, then I removed the "mint more" (2 clicks, 3 impressions) and "tejas jhaveri" (5 impressions) rows by hand. The Search Console tool would not accept the five-filter form this time, so the other brand variants were checked by eye, not by filter.

## W10 Pages shipped since 2026-10-30

| Page | Date | Indexable | Draft LinkedIn post (not published) |
| --- | --- | --- | --- |
| `/careers/lead-gen-intern` | 11-05 | yes | We're hiring a B2B Lead Gen Intern in BKC, Mumbai. Freshers welcome, Rs 10,000 to 15,000 a month. You'll work on live LinkedIn and cold email campaigns across several industries. Details: https://www.myntmore.com/careers/lead-gen-intern?utm_source=linkedin&utm_medium=social&utm_campaign=lead-gen-intern |
| `/resources/glossary/spam-complaint-rate` | 10-30 | yes | Gmail and Yahoo both ask senders to keep spam complaints under 0.3%, and Google recommends staying under 0.10%. Here is what the number means and how it is measured: https://www.myntmore.com/resources/glossary/spam-complaint-rate?utm_source=linkedin&utm_medium=social&utm_campaign=spam-complaint-rate |
| `/lp/accounting-cfo-firms` | 11-02 | check robots before posting | Not drafted until its indexing status is confirmed. |
| `/value-prop`, `/master-icp` | 11-02 | private | Skip, not for distribution. |

Materially reworked pages with no change to what they say: the four migrated glossary terms, 12 long-form case studies and the service pages (moved into the CMS). Not worth a separate post.

## What I need from you

1. **W3:** open Search Console, Security and Manual actions, and confirm both read "No issues".
2. **W4 and the 18 duplicate-canonical URLs:** Test Live URL then Request Indexing on `/services` first, then the Day 1 list in `docs/gsc-request-indexing-list.md`. Add `/careers/lead-gen-intern`.
3. **W5 and W6:** export the Pages report (Not indexed table) and the mobile Core Web Vitals report.
4. **W9:** the Zoho Campaigns report for this week's issue (sent, open rate, one UTM-tagged link).
5. **W10:** your LinkedIn post log.
6. **W13:** which of the 8 roles are actually open today.
7. **W14:** whether I may add hidden source fields (UTM, landing page, referrer) to the Zoho forms. They must also be created in each Zoho form, or Zoho ignores them.
8. **W15:** whether I may send one synthetic test lead to the production form, and who deletes it.
9. **Brief 5:** your decision on how LinkedIn automation is described.
10. **AI citation prompts:** run the 10 in a private ChatGPT window and paste which named Myntmore.
