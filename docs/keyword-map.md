# Keyword Map & Search Intent

Reference audit of every service, tool, and blog page's primary target keyword and search intent. Regenerate/re-audit this whenever pages are added or their `keywords` metadata changes  -  the check is mechanical (see method below) and should be re-run rather than hand-maintained from memory.

**Rule enforced:** no two pages across these 46 share the same primary keyword (the first entry in each page's `keywords` array). As of 2026-10-30 this holds with **zero collisions sitewide** (script-verified across all pages carrying `keywords` metadata). (Updated 2026-10-30: resolved `/resources/blogs/case-study-procrastination` primary to "how to write a b2b case study" to prevent tool collision with `/tools/case-study-generator`; pruned tool keyword overlap from `/tools/roi-calculator` and `/tools/linkedin-hook-grader`. Full sitewide collision check clean with 0 duplicate primaries.) (Updated 2026-10-07: added 3 blog posts (`/blog/handling-cold-email-replies`, `/blog/multi-threading-b2b-buying-committee`, `/blog/reviving-closed-lost-leads`)  -  re-ran the full sitewide collision check across all 157 pages carrying `keywords` metadata, no duplicate primaries and no exact-keyword overlap between the new pages and any existing page. Updated 2026-09-04 (second pass): added `/blog/stop-selling-features-cold-outreach`  -  note this post is intentionally thematically close to the existing `/blog/3-second-rule-cold-outreach` (same "3-second rule" cold-outreach angle), a deliberate choice made with the user after flagging the overlap; picked a distinct primary keyword (`"stop selling features cold outreach"` vs the existing post's `"why cold emails get ignored"`) so the two don't collide on the mechanical check even though they share topic territory. Re-ran the full sitewide collision check, no new overlap. Updated 2026-09-04: added 2 new blog posts (`/blog/5-second-hero-section-test`, `/blog/founder-led-sales-before-scaling`)  -  re-ran the full sitewide collision check, no new overlap. Updated 2026-09-03 (second pass): resolved the last long-open collision  -  `/tools/battle-card-generator` vs `/blog/pitching-trap-competitor-positioning` both used `"competitor battle card generator"`. Per this doc's own search-intent convention (transactional `/tools/*` pages keep the tool's own name/action as primary), left it on the tool page and promoted the blog post's own already-present, informational-intent secondary keyword (`"how to articulate customer pain"`) to primary instead. Re-ran the full sitewide collision check afterward: clean. Updated 2026-09-03: brought Case Studies into this doc's tracked scope for the first time (6 pages, count jumps from 37 to 43) as part of a full-site bug/link/SEO audit. Found 2 undocumented primary-keyword collisions: `/case-studies/ecommerce-conversion-playbook` vs `/case-studies/predictable-b2b-lead-gen-engine` both used `"b2b lead generation case study"`, and `/case-studies/founder-personal-brand-linkedin` vs `/case-studies/professional-services-linkedin` both used `"linkedin personal branding case study"`. Fixed both by reordering each page's own already-present, more-specific secondary keyword to primary (no new keywords invented). Updated 2026-08-31: added 4 new blog posts (`/blog/vanity-metrics-personal-brand-pipeline`, `/blog/outbound-funnel-math-not-guesswork`, `/blog/relevance-beats-reach-b2b-outbound`, `/blog/conversations-not-impressions-outbound`)  -  re-ran the full collision check, no new overlap. Two blog posts each shared an exact keyword with the tool page they link to (`"founder presence analyzer"` and `"cold email roi calculator"`, both branded/primary terms of their tool pages)  -  removed from the blog posts' own `keywords` arrays, matching the existing convention below of leaving a tool's own branded phrase solely on the tool page. Also backfilled two pre-existing blog posts missing from this table, `/blog/case-study-procrastination` and `/blog/pitching-trap-competitor-positioning`, which is why the tracked count jumps from 31 to 37 rather than by 4. Updated 2026-08-25: added `/services/gtm-strategy` (primary "gtm strategy agency"), a new 7th service page  -  re-ran the full collision check, no new overlap introduced; the pre-existing `/tools/battle-card-generator` vs `/blog/pitching-trap-competitor-positioning` collision noted below is still open, unrelated to this change. Re-ran the check while adding the new `/lp/fundraising` page below  -  found a real, pre-existing collision introduced between this doc's last audit and now: `/tools/battle-card-generator` and `/blog/pitching-trap-competitor-positioning` both use "competitor battle card generator" as their primary keyword. Not touched in this pass  -  flagged as a separate task. Updated 2026-08-21: added `/blog/cold-email-compliance-guide` and `/blog/cold-email-vs-linkedin-outreach` from the content-gap analysis, primaries checked against all others, no collision. Updated 2026-08-19: added `/blog/b2b-outbound-benchmark-report-2026`, primary keyword checked against all others, no collision.)

City, ICP and ICP × city keyword lists (what to add to existing pages and which pages are missing) are in [`keyword-research-2026-11.md`](./keyword-research-2026-11.md) and `docs/keywords/`. Check a new page's primary keyword against this map before adopting one from there.

## Search intent convention

| Page type | Intent | Why |
|---|---|---|
| `/services/*` | Commercial | Buyer is evaluating a paid service; keywords center on "agency", "services" |
| `/tools/*` | Transactional | Visitor wants to use a free tool right now; keywords are the tool's own name/action |
| `/blog/*` | Informational | Visitor wants to learn something; keywords are "how to" / concept-explainer phrasing |

## Case Studies (Commercial)  -  6 pages

Added to this doc's tracked scope 2026-09-03 (previously only Services/Tools/Blog were tracked  -  a full-site audit found 2 undocumented primary-keyword collisions among case studies, fixed by reordering each page's own already-present secondary keyword to primary rather than inventing new terms).

| Page | Primary keyword |
|---|---|
| `/case-studies/saas-series-a` | saas series a lead generation results |
| `/case-studies/professional-services-linkedin` | professional services inbound leads |
| `/case-studies/ecommerce-conversion-playbook` | ecommerce saas lead generation |
| `/case-studies/founder-personal-brand-linkedin` | founder personal brand results |
| `/case-studies/predictable-b2b-lead-gen-engine` | predictable pipeline case study |
| `/case-studies/uk-pharma-qualified-meetings` | pharma lead generation case study |

## Services (Commercial)  -  7 pages

| Page | Primary keyword |
|---|---|
| `/services/account-based-marketing` | account-based marketing agency |
| `/services/ai-lead-generation` | ai lead generation agency |
| `/services/cold-email` | cold email agency |
| `/services/gtm-strategy` | gtm strategy agency |
| `/services/linkedin-outreach` | linkedin outreach agency |
| `/services/personal-branding` | linkedin ghostwriting services |
| `/services/sales-intelligence` | icp mapping services |

## Tools (Transactional)  -  9 pages

| Page | Primary keyword |
|---|---|
| `/tools/battle-card-generator` | competitor battle card generator |
| `/tools/case-study-generator` | free case study generator |
| `/tools/dm-angle-generator` | dm angle generator |
| `/tools/founder-presence-analyzer` | founder presence analyzer |
| `/tools/icp-builder` | icp builder tool |
| `/tools/lead-magnet-ideas` | lead magnet idea generator |
| `/tools/linkedin-optimizer` | linkedin profile optimizer |
| `/tools/posting-rhythm-builder` | linkedin posting rhythm builder |
| `/tools/roi-calculator` | roi calculator for cold outreach |

## Blog (Informational)  -  30 pages

| Page | Primary keyword |
|---|---|
| `/blog/linkedin-outreach-agency-vs-manual-prospecting` | linkedin outreach agency vs manual prospecting |
| `/blog/ai-vs-traditional-lead-generation` | ai vs traditional lead generation |
| `/blog/personal-branding-agency-vs-content-freelancer` | personal branding agency vs content freelancer |
| `/resources/guides/how-to-choose-b2b-lead-generation-agency-india` | how to choose a b2b lead generation agency in india |
| `/blog/handling-cold-email-replies` | cold reply meaning |
| `/blog/multi-threading-b2b-buying-committee` | multi-threading in b2b sales deals |
| `/blog/reviving-closed-lost-leads` | how to revive closed-lost leads |
| `/blog/stop-selling-features-cold-outreach` | stop selling features cold outreach |
| `/blog/5-second-hero-section-test` | b2b homepage hero section test |
| `/blog/founder-led-sales-before-scaling` | founder led sales b2b |
| `/blog/vanity-metrics-personal-brand-pipeline` | linkedin vanity metrics vs revenue |
| `/blog/outbound-funnel-math-not-guesswork` | b2b outbound funnel math |
| `/blog/relevance-beats-reach-b2b-outbound` | relevance vs reach b2b outbound |
| `/blog/conversations-not-impressions-outbound` | outbound conversations vs impressions |
| `/resources/blogs/case-study-procrastination` | how to write a b2b case study |
| `/blog/pitching-trap-competitor-positioning` | how to articulate customer pain |
| `/blog/cold-email-compliance-guide` | cold email compliance |
| `/blog/cold-email-vs-linkedin-outreach` | cold email vs linkedin outreach |
| `/blog/b2b-outbound-benchmark-report-2026` | b2b outbound benchmark report |
| `/blog/3-second-rule-cold-outreach` | why cold emails get ignored |
| `/blog/agency-vs-in-house` | agency vs in-house sdr |
| `/blog/b2b-lead-gen-metrics` | b2b lead generation metrics |
| `/blog/cold-email-deliverability-guide` | cold email deliverability |
| `/blog/ecommerce-conversion-playbook` | ecommerce conversion rate optimization |
| `/blog/founder-personal-brand-linkedin` | founder personal brand |
| `/blog/icp-mapping-b2b` | icp mapping |
| `/blog/linkedin-outreach-sequences` | linkedin outreach sequence |
| `/blog/linkedin-profile-inbound-lead-machine` | why your linkedin profile matters more than posts |
| `/blog/predictable-b2b-lead-gen-engine` | b2b lead generation engine |
| `/blog/tam-trap-vague-targeting` | total addressable market vs total conversional market |
| `/blog/value-premium-lead-magnets` | how to create a lead magnet that converts |

## Added 2026-10-30 (bi-weekly B9): pages published 2026-10-16 to 2026-10-30

Primary keyword is the first entry in each page's `keywords`. The sitewide check on 2026-10-30 (201 pages carrying keywords, parsed from page files, CMS posts and glossary JSON) found zero duplicate primaries. Blog posts now live at `/resources/blogs/<slug>`.

| Page | Primary keyword |
|---|---|
| `/resources/blogs/ai-personalization-cold-outreach` | ai personalization cold outreach |
| `/resources/blogs/cold-email-follow-up-sequence` | cold email follow up sequence |
| `/resources/blogs/how-to-write-a-linkedin-hook` | how to write a linkedin hook |
| `/resources/blogs/positive-reply-to-booked-meeting` | positive reply to booked meeting |
| `/resources/blogs/outbound-offer-problem` | b2b outbound offer |
| `/resources/guides/how-to-choose-b2b-lead-generation-agency-india` | how to choose a b2b lead generation agency in india |
| `/resources/guides/linkedin-content-to-calls-starter-kit` | linkedin content to calls |
| `/resources/guides/outbound-meme-prompt-kit` | outbound meme prompts |
| `/tools/cold-email-roi-calculator` | cold email roi calculator |
| `/tools/linkedin-hook-grader` | linkedin hook grader |
| `/case-studies/specialist-recruitment-linkedin-leads` | recruitment firm lead generation case study |
| `/resources/glossary/spam-complaint-rate` | spam complaint rate |
| `/resources/blogs/gmail-and-yahoo-sender-requirements` (DRAFT, `published: false`) | gmail and yahoo sender requirements |

## Added 2026-11-02: accounting and CFO firms landing page, keyword expansion

| Page | Primary keyword |
|---|---|
| `/lp/accounting-cfo-firms` | lead generation for accounting firms |

Secondary keywords from `docs/keyword-research-2026-11.md` were added to the 8 city pages and 6 landing pages (`agencies-it`, `recruitment-firms`, `manufacturers-exporters`, `saas-founders`, `pharma`, `agency-partners`); no page's primary keyword changed. "b2b lead generation agency mumbai" moved from the homepage to `/b2b-lead-generation-mumbai`, so the two no longer compete for it. Sitewide check after the change: no duplicate primaries.

## `/lp/*` vs `/services/*` cannibalization check

Programmatically diffed the full keyword arrays (every keyword, not just primary) of all 9 `/lp/*` pages against all 7 `/services/*` pages: **zero exact overlaps**. This holds structurally  -  most `/lp/*` pages target industry verticals (`b2b lead generation for nbfcs`, `lead generation for exporters india`, `lead generation for staffing agencies`, …) while `/services/*` pages target channels/methods or, for the newest one, the strategic layer above them (`cold email agency`, `linkedin outreach agency`, `icp mapping services`, `gtm strategy agency`, …). Different axis of differentiation, no query overlap.

`/lp/fundraising` (added 2026-08-25) breaks the "industry vertical" pattern on purpose  -  it targets an ICP defined by fundraising stage (pre-seed/seed/Series A founders), not an industry, and pitches a new service angle (investor outreach) rather than the usual B2B customer-outreach services. Its keywords (`investor outreach for startups`, `vc outreach service for founders`, `cold email investors`, …) are structurally distinct from every `/services/*` keyword since none of the services pages target "investor" or "vc" queries  -  checked and confirmed no overlap.

(Note: as of this audit there are 9 `/lp/*` pages and 7 `/services/*` pages, not the "3 and 5" some older checklists reference  -  the site grew since that count was written. Re-run the check below against the current file list if that changes again.)

## Issues found and fixed in this pass

Three blog posts had a tool's own primary/branded keyword phrase listed verbatim in their own `keywords` array (leftover from templated keyword generation, not intentional targeting)  -  removed from the blog post since the tool page already owns that exact phrase as its primary term:

- `/blog/3-second-rule-cold-outreach` had `"dm angle generator"` (primary term of `/tools/dm-angle-generator`)
- `/blog/tam-trap-vague-targeting` had `"icp builder tool"` and `"value proposition generator"` (from `/tools/icp-builder`)
- `/blog/value-premium-lead-magnets` had `"lead magnet idea generator"` (primary term of `/tools/lead-magnet-ideas`)

One service/blog secondary-keyword collision:
- `/services/cold-email` and `/blog/cold-email-deliverability-guide` both listed `"how to improve cold email deliverability"`  -  an informational "how to" phrase. Removed from the service page (commercial intent) and left on the blog post (informational intent), matching the intent convention above.

One near-duplicate *primary* term (not an exact string match, so the mechanical diff didn't catch it  -  found by manual review):
- `/blog/linkedin-profile-inbound-lead-machine`'s primary was `"linkedin profile optimization"`, nearly identical to `/tools/linkedin-optimizer`'s primary `"linkedin profile optimizer"`. Reordered the blog's keyword array to promote `"why your linkedin profile matters more than posts"` (already in its list, matches the post's actual narrative angle) to primary; `"linkedin profile optimization"` stays in the list as a secondary term.

Left as-is (acceptable, not cannibalization): a handful of shared *secondary* keywords between blog↔blog pairs on genuinely related topics (e.g. `"b2b targeting strategy"` shared by the ICP-mapping and TAM-trap posts)  -  normal topic-cluster overlap between related informational content, not two pages competing for the same primary term.

## Method (for re-auditing later)

```python
import re, glob

def extract_keywords(text):
    m = re.search(r'keywords:\s*\[(.*?)\]', text, re.DOTALL)
    return re.findall(r'"([^"]+)"', m.group(1)) if m else []

groups = {
    'service': sorted(glob.glob('app/services/*/page.tsx')),
    'tool': sorted(glob.glob('app/tools/*/page.tsx')),
    'blog': sorted(glob.glob('app/blog/*/page.tsx')),
    'lp': sorted(glob.glob('app/lp/*/page.tsx')),
}
all_kw = {f: extract_keywords(open(f).read()) for files in groups.values() for f in files}

# Primary-keyword uniqueness
primaries = [kws[0] for kws in all_kw.values() if kws]
dupes = {x for x in primaries if primaries.count(x) > 1}
print("Duplicate primaries:", dupes or "None")

# Full exact-match overlap, any position, any pair
files = list(all_kw.keys())
for i in range(len(files)):
    for j in range(i + 1, len(files)):
        overlap = set(all_kw[files[i]]) & set(all_kw[files[j]])
        if overlap:
            print(files[i], "<->", files[j], ":", overlap)
```
