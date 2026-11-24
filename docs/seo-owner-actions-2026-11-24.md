# SEO: what only the owner can do (24 Nov 2026)

These steps need someone signed in to Google Search Console. They are the remaining fix for the pages Google files under other sites (betting and cinema domains): the site code already declares every page as its own original, in the HTML and in a response header, so nothing more can be done in code. Full background: `docs/website-bible.md`, section D.3 and D.4.

## 1. Check /services first (5 minutes)

1. Search Console, property `https://www.myntmore.com/`, paste `https://www.myntmore.com/services` into the inspection bar.
2. **Test Live URL**, then **View Tested Page**.
3. Screenshot tab: it should be the Myntmore Services page. HTML tab: `<link rel="canonical" href="https://www.myntmore.com/services">`. HTTP response: 200.
4. If anything else shows up, stop and treat it as a security problem (DNS, hosting access).
5. Otherwise click **Request Indexing**.

## 2. Request indexing, about 10 a day

Day 1:
- https://www.myntmore.com/services (done in step 1)
- https://www.myntmore.com/services/gtm-strategy
- https://www.myntmore.com/case-studies/founder-personal-brand-linkedin
- https://www.myntmore.com/resources/blogs/agency-vs-in-house
- https://www.myntmore.com/resources/blogs/ecommerce-conversion-playbook
- https://www.myntmore.com/resources/blogs/linkedin-profile-inbound-lead-machine
- https://www.myntmore.com/resources/blogs/personal-branding-agency-vs-content-freelancer
- https://www.myntmore.com/case-studies/b2b-founder-tech-decision-makers
- https://www.myntmore.com/case-studies/agencies-it-branding-agency-meetings
- https://www.myntmore.com/case-studies/financial-services-wealth-management-discovery

Day 2:
- https://www.myntmore.com/case-studies/financial-services-corporate-finance-meetings
- https://www.myntmore.com/case-studies/insurance-insurtech-product-demos
- https://www.myntmore.com/case-studies/insurance-health-advisory-consultations
- https://www.myntmore.com/case-studies/manufacturers-exporters-engineering-goods-replies
- https://www.myntmore.com/resources/glossary/founder-led-sales
- https://www.myntmore.com/resources/glossary/existing-connection-nurturing
- https://www.myntmore.com/careers/content-marketing-strategist-intern
- https://www.myntmore.com/b2b-lead-generation-mumbai
- https://www.myntmore.com/b2b-lead-generation-pune
- https://www.myntmore.com/b2b-lead-generation-bengaluru

3 to 7 days later, inspect each again: look for "Submitted and indexed" and a newer "Last crawl" date.

## 3. Two screens nobody has checked yet

- Manual actions: https://search.google.com/search-console/manual-actions?resource_id=sc-domain%3Amyntmore.com
- Security issues: https://search.google.com/search-console/security-issues?resource_id=sc-domain%3Amyntmore.com

Both should say "No issues". If either does not, send a screenshot.

## 4. An export for the next round of title rewrites

Search Console, **Performance**, last 28 days, tick **Average position**, then **Export, Google Sheets or CSV**, with both the **Queries** and the **Pages** tabs. With that file the search titles and descriptions of pages sitting in positions 4 to 15 can be rewritten for clicks (non-brand click rate is 0.5% today).

## 5. Google Business Profile (local results for the city pages)

Keep the BKC office profile complete and active: category "Marketing agency", the website link, opening hours, a few photos, a post every week or two, and replies to reviews. This is the biggest single lever for "lead generation company in Mumbai" style searches, and only the profile owner can do it.
