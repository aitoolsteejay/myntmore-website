# Myntmore Markdown pilot

## Architecture audit

Myntmore uses Next.js 14.2.3 and the App Router on Vercel. Production deploys from the Git `master` branch. The site combines Keystatic/Markdoc blog posts, structured landing page, service and case study content, and copy authored in React components. The checked-in sitemap inventory covered 274 URLs at the start of the pilot, including 9 service URLs, 83 case-study URLs, 122 resource URLs, 10 landing pages, and the homepage, company, career, event and tool pages.

The app already renders canonical tags, page metadata, Open Graph data, structured data, a sitemap and robots.txt. `next.config.js` supplies permanent redirects, canonical response headers for selected routes and the external tool rewrite. Robots rules allow named AI search and assistant crawlers with the same disallow list as the wildcard group, which includes Keystatic and the externally rewritten tool subpaths. `public/llms.txt` and `public/llms-full.txt` already exist. The project had no routing middleware or checked-in Vercel routing configuration.

## Implementation

Exact-route middleware intercepts eligible document GET and HEAD requests before Next.js renders the page. The client must explicitly prefer `text/markdown`; HTML wins quality ties and remains the fallback. Middleware retrieves the current deployment's normal server-rendered HTML using only the trusted same-deployment Vercel hostname, or a configured loopback port for local testing. It converts the rendered `main` content and checks the source canonical and robots metadata. Using rendered HTML keeps CMS edits, React copy and case-study figures synchronized. A header-only rewrite would still need a handler that can render the same content, and an App Router handler cannot occupy the same segment as the existing page. The middleware keeps existing URLs, redirects and App Router pages in place. [Next.js 14 middleware documentation](https://nextjs.org/docs/14/app/building-your-application/routing/middleware)

The Markdown response includes UTF-8, a canonical Link header, `Vary: Accept` and explicit no-store directives. Next.js 14 can overwrite the HTML response's `Vary` header, so the pilot also sets targeted CDN no-store headers for the eight HTML documents while enabled. Verify that Vercel honors those headers, and that RSC, browser and Markdown requests cannot mix, before enabling production. Static generation and Next.js's own route cache still apply where the application normally uses them. [Vercel CDN cache](https://vercel.com/docs/caching/cdn-cache) · [Vercel cache-control headers](https://vercel.com/docs/caching/cache-control-headers)

| Pilot URL | Page |
| --- | --- |
| `/` | Home |
| `/about-us` | About Myntmore |
| `/services` | Service overview |
| `/services/gtm-strategy` | GTM strategy |
| `/services/sales-intelligence` | Sales intelligence |
| `/case-studies/agencies-it-usa-software-development` | Software development case study |
| `/resources/blogs/account-targeting-strategy` | Account targeting article |
| `/resources/blogs/b2b-lead-generation-for-it-services` | IT lead generation article |

Requests with draft-mode cookies, RSC, router prefetch, methods other than GET and HEAD, and paths outside the allowlist use the normal router. A timeout, non-HTML source, canonical mismatch, noindex metadata or missing main content falls through to the normal response. The converter preserves server-rendered facts, headings, links, lists, tables and meaningful image descriptions. It strips global navigation, footers, interactive controls and marked decorative and duplicate UI. Client-only content or content revealed only by JavaScript is outside the pilot's extraction scope. Only published canonical URLs belong on the allowlist.

| File | Change |
| --- | --- |
| `middleware.ts` | Feature flag, route allowlist, source fetch, response headers and event logs |
| `lib/markdown/negotiate.ts` | HTTP media-type preference |
| `lib/markdown/render.ts` | Canonical and indexability checks and HTML-to-Markdown conversion |
| `lib/markdown/*.test.ts` | Negotiation, rendering and source update tests |
| `scripts/check-markdown-pilot.mjs` | Local and preview HTTP verification |
| `app/components/AskYourAI.tsx`, `app/components/SystemFlow.tsx` | Mark decorative and duplicate homepage content for exclusion |
| `package.json`, `package-lock.json` | Add the HTML parser |
| `docs/markdown-pilot.md` | Audit, validation, measurement and rollback |

## Validation and release

Run the unit tests and production build, then verify the enabled local server.

```sh
npm run test:roi
npm run build
MARKDOWN_PILOT=1 MARKDOWN_LOCAL_PORT=4336 npm run start -- --hostname 127.0.0.1 --port 4336
```

In another terminal, run `node scripts/check-markdown-pilot.mjs http://127.0.0.1:4336`. Restart without the environment flags and append `--disabled` to the check command to confirm rollback. The runner alternates HTML and Markdown requests, checks canonical, title, meta description, Open Graph and structured data, and probes quality values, HEAD, RSC, 308, 404, API, asset, sitemap and robots responses.

The local production build, all 84 unit tests and the HTTP suite passed with the flag on and off. The enabled HTML response carried both targeted CDN no-store headers, while Next.js retained its original RSC-oriented `Vary` value. The existing sitemap date check warned about 11 stale date entries. Vercel preview cache behavior is pending.

For an approved Vercel preview, set `MARKDOWN_PILOT=1` only in that preview and redeploy. Vercel must provide `VERCEL_URL` and allow the source HTML fetch. Protected previews may require a project-scoped `VERCEL_AUTOMATION_BYPASS_SECRET`. Use that secret only against the verified deployment hostname. Run the same HTTP script against the preview. Repeat alternating requests against the same URL, including warm requests and both orderings. Inspect response content types, `Cache-Control`, `Vary` and `x-vercel-cache`, and check Vercel logs for fallback events and source latency. Confirm browser navigation and RSC independently. Spot-check Markdown against each rendered page's factual copy, links and outcomes. Capture source failure or deployment protection behavior using the preview. Production requires approval and a passing preview check.

For rollback, remove `MARKDOWN_PILOT` or set it to `0`, then redeploy. Rerun the HTTP check with `--disabled` and verify the same URLs return HTML when asked for Markdown. Revert the change if code removal is needed.

## Measurement

Capture a pre-release baseline for the eight pilot pages and comparable HTML-only pages, using Search Console and existing analytics to record traffic, AI referral sessions where referrers are visible, and qualified inquiries by landing page. At release and weekly for 30–60 days, use Vercel logs to track successful Markdown requests, HTML fallbacks, response sizes and available source cache outcomes. Compare bytes and response times for HTML and Markdown. Review representative AI answers using a fixed set of relevant questions, recording cited URLs, description accuracy and factual errors. Track lead quality using existing attribution fields and keep unattributed leads separate.

Events include the canonical path, time, format decision, response status for successful Markdown, source status and cache marker when available, byte count, Accept category and coarse agent category. Use Vercel request logs for final statuses on HTML fallbacks because middleware hands them to Next.js. The agent category records self-identified AI, other named automated clients and unclassified traffic. Report verified crawlers separately only if an existing trusted verification signal is available. The application records no raw user agent, client IP, cookies or query strings in pilot events. Referral and citation changes may have several causes, and the 30–60 day comparison is observational.

## Content opportunities

- Use a consistent one-sentence Myntmore description across the home, about and service introductions.
- Cross-link service pages, relevant industry pages and case studies with descriptive anchors. Document dates, scope and outcome definitions where the source evidence supports them.
- Make author, publication and update information visible in articles and keep it aligned with article structured data.
- Check that Organization and Service markup agree with visible names, descriptions and contact details. Add FAQs where customers ask distinct questions and answers exist on the page.

Evaluate these separately. Markdown, structured data and the existing discovery files are experiments whose value depends on crawler behavior and measured results.
