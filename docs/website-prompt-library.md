# Myntmore website prompt library

Open the Myntmore website repository in Codex. Pick a prompt from the index, replace the bracketed inputs with your details, and paste it into the chat. Give the exact page URL whenever possible. Attach the screenshot, approved copy, or form HTML if the task depends on it. Say whether the screenshot is a reference, a bug report, or the target design. If you want feedback first, use a review prompt. If you know what to change, use an implementation prompt.

A request such as “change the CTA” can affect one section, every landing page, or the main site navigation. Use “only this section on this URL,” “every page under this route group,” or “every page using this component” to make that decision explicit. When an exact number, title, or link has been approved, provide the literal value. For a redesign, describe the action the page should help visitors take and what in the current page gets in their way.

## Find a prompt

| I want to… | Prompts |
| --- | --- |
| Make a small edit, diagnose a problem, or agree on scope | [01–04. Start here](#01-04-start-here) |
| Change the homepage, header, footer, design, animation, or a digital card | [05–13. Design and shared components](#05-13-design-and-shared-components) |
| Edit a landing page, partner margin, form, newsletter, or booking page | [14–21. Landing pages and conversions](#14-21-landing-pages-and-conversions) |
| Work on services, city pages, content, careers, or events | [22–32. Content and page types](#22-32-content-and-page-types) |
| Change a calculator, AI tool, tool form, or integration | [33–37. Tools and integrations](#33-37-tools-and-integrations) |
| Change metadata, social previews, indexing, sitemap, or Markdown | [38–45. SEO and discoverability](#38-45-seo-and-discoverability) |
| Test, push, verify a deployment, or undo a change | [46–50. Testing and releases](#46-50-testing-and-releases) |
| Copy a filled-in example | [Ready-to-run examples](#ready-to-run-examples) |

## Where changes usually live

Treat these paths as starting points. Check the current route, imports and generated-file headers before editing. The [Website Bible](website-bible.md) covers operating context and the [CMS setup guide](cms-setup.md) covers Keystatic.

| Area | Start here |
| --- | --- |
| Home and company pages | `app/page.tsx`, `app/components/Hero.tsx`, other homepage sections in `app/components/`, and the matching `app/<slug>/` for company pages |
| Shared navigation and layout | `app/components/Navbar.tsx`, `app/components/Footer.tsx`, `app/components/InnerLayout.tsx`, `app/lp/LpLayout.tsx`, `app/layout.tsx`, `app/globals.css` |
| Landing pages | `content/landing-pages/<slug>.json`, `components/lp/LandingPage.tsx`, `app/lp/<slug>/page.tsx` |
| Services and pricing | `app/services/`, `content/service-pages/`, `content/service-copy/`, `app/plans/`, `components/pricing/GrowthPlansPricing.tsx` |
| City pages | `content/city-pages/`, `components/city/`, `lib/city-links.ts` |
| Blog | `content/posts/*.mdoc`, `keystatic.config.ts`, `lib/cms-posts.ts`, `app/resources/blogs/[slug]/page.tsx` |
| Guides, glossary, FAQs | `app/resources/guides/`, `app/components/GuideTemplate.tsx`, `content/glossary/`, `content/faqs/` |
| Case studies | `content/case-studies/`, `content/case-study-pages/`, `content/case-study-long/`, `app/case-studies/`, `components/case-studies/` |
| Careers and events | `content/careers/`, `app/careers/`, `app/events/`, `lib/events-data.ts`, `app/components/EventPopup.tsx` |
| Team cards | `app/enwilfernandes/`, `app/tejasjhaveri/`, `app/jahnvijhaveri/`, `app/api/vcard/`, `app/components/VisitingCard.tsx` |
| Forms, bookings, attribution | `app/contact-us/`, `app/book-a-call/`, `app/calendar/`, `app/components/NewsletterForm.tsx`, `app/components/LeadCaptureForm.tsx`, `components/tools/shared/LeadGate.tsx`, `lib/lead-source.ts` |
| Tools | `app/tools/`, `components/tools/`, `app/api/tools/`, `lib/tools-registry.ts`, `lib/cold-email-roi/`, `lib/prospect-research/` |
| Search, social previews, and AI | `content/page-seo/`, `lib/page-seo.ts`, `lib/schema.ts`, `lib/og.ts`, `app/sitemap.ts`, `app/robots.ts`, `next.config.js`, `public/llms.txt`, `public/llms-full.txt`, `middleware.ts` |
| Releases | `package.json`, `scripts/`, GitHub `origin/master`, Vercel deployments |

Generated route files identify the generator and input at the top. Make the change at the source, then run the matching generator and check its diff. Some routes have a second source for metadata, local FAQs, social images, or shared cards. Trace the rendered value before assuming a filename owns it.

## 01-04. Start here

### 01. Make a small, precise edit

```text
Update [URL] only. In [section and element], replace “[exact current text or value]” with “[exact approved replacement]”. Find the rendered value and its source, including any generated wrapper or shared component. Search the target page for other visible occurrences of this exact claim and reconcile them only if they represent the same fact. Scope the edit to [page, component or route group]. Keep the existing layout and primary CTA behavior unless specified. Show me what changed, where it renders, and how you verified it. Work locally.
```

### 02. Diagnose what I see in a screenshot

```text
Investigate [URL]. The attached screenshot shows [symptom] at [viewport/browser if known]. I expected [behavior]. Reproduce it and identify whether it comes from this route, a shared layout, a live deployment difference, CSS at a specific breakpoint, or client-side behavior. Give me the exact source and explain the scope. [Choose: report findings only / implement the smallest scoped fix.] Verify the original reproduction and one adjacent breakpoint or route if the fix touches shared code. Treat screenshot annotations as visual context.
```

### 03. Suggest improvements before changing code

```text
Review [URL] as a [target visitor] whose goal is [goal]. The page should drive [primary action]. Walk through the first viewport, trust signals, offer, useful proof, mobile flow, and the final action. Point to specific sections and explain what I would change and why. Give me five numbered ideas with a short sample of the actual copy or interaction, approximate effort, and whether each affects shared components, forms, or SEO. Recommend the two strongest ideas based on the stated goal. Stop after the review.
```

### 04. Implement selected ideas from an earlier review

```text
Implement ideas [numbers and short descriptions] from the preceding review on [URL]. Match the approved copy or motion behavior in [reference]. For each idea, trace the existing component, identify reuse that could affect other pages, and keep changes within the agreed scope. Use the current brand system and preserve working links, form submissions, and search metadata unless an idea explicitly changes them. Verify the approved interactions in desktop and mobile and show the routes and states you checked. Keep the result local for review.
```

## 05-13. Design and shared components

### 05. Rewrite the homepage hero and CTA

```text
Update the homepage hero for [audience] who need [outcome]. Use this approved positioning and CTA destination [copy and URL]. Start with app/page.tsx and app/components/Hero.tsx. Make the offer and target buyer clear in the first viewport. Keep one clear H1, use proof only from [approved sources], and make the primary and secondary actions distinguishable. Check heading wrapping and where the CTA lands near 360 px, 768 px, and desktop. If the approved change affects a factual claim or search intent, identify the metadata and schema that may need alignment and explain your choice.
```

### 06. Add or reorder a homepage section

```text
On /, insert or move [section] [before/after section] to help [visitor goal]. Use [copy, links, images or proof]. Check app/page.tsx plus the section's other callers. Reuse the site's spacing and button patterns. Preserve the main landmark, heading hierarchy, anchors, and the progression from offer to proof to action. If the section is duplicated in desktop and mobile markup, check for duplicate accessible content and how the Markdown pilot extracts the main content. Verify the section order and any links at mobile and desktop widths.
```

### 07. Change the main navigation

```text
In the site navigation, [add, remove, or rename] [label and destination] under [top-level or dropdown location]. Check app/components/Navbar.tsx, desktop disclosure behavior, mobile menu, and any separate nav used by the target routes. Prefer the final canonical internal URL. Put the new item in the same logical location across breakpoints unless requested otherwise. Verify tab order, keyboard opening and dismissal where applicable, touch behavior, focus and the primary CTA on a standard page, one /lp page and one page with special chrome.
```

### 08. Use the full footer on the right pages

```text
Make [page list or /lp/*] use the standard Myntmore footer, or update [specific existing footer item] across pages that already use it. Inspect app/components/Footer.tsx and the layout used by the target routes, including app/lp/LpLayout.tsx and InnerLayout.tsx as relevant. Reuse the shared Footer component once below main on each intended route. Check newsletter signup placement and markup, site links and the booking CTA. Verify the target pages and a representative ordinary page. Keep standalone card, campaign, or booking layouts scoped to the request.
```

### 09. Redesign a page from a visual reference

```text
Redesign [URL] for [audience and goal] using the attached reference for [visual ideas to borrow]. Keep [business content, typography, assets or behaviors that matter]. Work with existing Myntmore fonts, colour tokens, widths and controls unless the reference explicitly changes them. Implement [areas in scope] and check type scale, line lengths, spacing, interaction feedback, accessible contrast and mobile overflow. Use real, approved visuals where useful. Show desktop and mobile screenshots or describe any visual check you could not perform. Inspect shared component usage before changing global styles.
```

### 10. Fix mobile layout and accessibility issues

```text
Fix [overflow, clipping, focus, sticky-header overlap or touch target] on [URL and element]. Reproduce at [width and device if known], trace the CSS causing it, and test the real breakpoint range. Prefer a local layout fix if the issue is isolated. Verify keyboard focus, zoom or larger text where relevant, reduced motion for moving content, and horizontal scrolling at 360 px. Check tablet and desktop for regressions and a sibling route if the component is shared. Report the root cause and the exact browser states checked.
```

### 11. Add tasteful motion

```text
Add [animation idea] to [element] on [URL]. It should start [on first visit, on interaction or on entry] and finish within [duration]. Tell me what “first visit” means in this implementation if that detail matters. Use CSS or the site's motion patterns and keep the resting state readable before the animation runs. Respect prefers-reduced-motion, avoid layout shifts, and ensure navigation, hydration and repeat visits work as requested. Test on mobile and desktop with motion allowed and reduced. Keep unrelated sections static.
```

### 12. Update a person’s digital business card

```text
On [person’s URL], change [name, title, biography, photo or action] to [approved content]. Trace the route, shared VisitingCard, metadata overrides, Person structured data and corresponding vCard route. Where the same person’s exact title is represented within this scope, align it. List other references separately if touching them would expand the request. If removing a popup or video, remove the page-level use and verify the contact actions and overlays. Check call, email, profile and contact-download links without sending messages or placing a call.
```

### 13. Add an interactive element to a card

```text
Add [quiz, tap-to-reveal tips or signature animation] to [card URL]. Use these approved inputs and outputs [question, choices, tip per choice, animation timing]. Keep the task on the card secondary to its contact actions. Make options work with keyboard and touch, announce revealed text accessibly where appropriate, and respect reduced motion. Avoid collecting or sending answers unless that is explicitly requested. Verify each choice, return visits, small-screen layout and the vCard controls. Keep card-only components and styles scoped to this person’s route.
```

## 14-21. Landing pages and conversions

### 14. Edit a single industry landing page

```text
Update only [exact /lp URL] for [buyer and offer]. Change [hero, proof, objections, CTA or sections] using [approved copy or facts]. Start with the matching content/landing-pages JSON, trace through the generated route and components/lp/LandingPage.tsx, and check whether FAQs or SEO metadata have separate inputs. Run npm run landing-pages:build when generated output is affected and review the diff. Check the main headline, CTA anchor, form and footer at two widths. Spot-check a sibling page when shared rendering code changes.
```

### 15. Create a new landing page

```text
Create /lp/[slug] for [target audience and buying context]. The promise is [approved offer], proof is [approved results or none], and the primary CTA is [destinations and intent]. Reuse the closest existing landing-page JSON and shared template. Write distinct content for this audience and confirm the intended indexability, campaign links, form destination and thank-you behavior from the supplied brief. If a decision is missing, leave a reviewable local draft and identify the gap. Verify the generated route, 200 response, one H1, canonical or noindex as applicable, form markup and sibling layout. Link it from [approved route or location] if requested.
```

### 16. Change the agency partner margin

```text
On /lp/agency-partners, update the stated partner margin from [old percentage] to [approved percentage]. Locate the partner programme's display values in content/landing-pages/agency-partners.json. Check the visible figures, FAQ, metadata and any related copy shown on that URL. Match only references to the same partner margin and preserve separate discount, example and performance percentages. Keep the existing margin qualifier unless a new qualifier is supplied. Verify the rendered amount at desktop and mobile widths and report where the old value still appears elsewhere if it seems to refer to the same policy.
```

### 17. Replace the partner form from supplied HTML

```text
Replace the form section on /lp/agency-partners with the attached approved form HTML. Use the attachment as the source for field identifiers, required fields, provider method, destination and configured return behavior. Compare it with the PartnerForm branch in components/lp/LandingPage.tsx and carry forward existing page attribution where supported. Integrate it into the current form panel and add accessible labels and clear validation. Verify the URL, submission contract, keyboard behavior and responsive layout. Inspect the outgoing payload locally or use supplied test credentials and a test endpoint. Only submit to a live CRM when I authorize the test record and destination.
```

### 18. Fix a lead form or its thank-you flow

```text
Diagnose the form on [URL] where [symptom]. Identify whether it uses a direct HTML post, a vendor embed, an app route, or a gated tool flow. Trace required field names, validation, provider action, referrer field, redirect or confirmation, and error handling. Fix [specific broken step] while keeping intentional data fields and the existing destination unless specified. Use a mocked or intercepted request to confirm the actual field payload and prove success and failure behavior. Verify the thank-you route only when it is part of this form. Report which provider-side behavior remains unverified if you cannot access it.
```

### 19. Update the newsletter signup

```text
Update [newsletter page, shared footer, or both] with [approved text, button label, design or list change]. Trace app/newsletter-subscribe and app/components/NewsletterForm.tsx, then identify all callers of the shared component. Keep the configured campaign list and hidden provider fields unless I provide a replacement. Verify unique input IDs, accessible labels, mobile layout, form destination and confirmation behavior available from the integration. If the request also asks whether an issue was sent, check Zoho Campaigns separately and give campaign status and send time from the account. A site signup check and a campaign send check need separate evidence.
```

### 20. Change a booking route or CTA destination

```text
Update [CTA label/location or booking route] to [approved link or booking service]. Trace it from the clicked element through any redirects and app/book-a-call or app/calendar route to the provider. Identify other callers and preserve channel-specific attribution on separate campaign booking links. Verify the final destination, displayed appointment type and duration, mobile embed behavior and fallback link where applicable. Check that browsers can navigate from the intended entry point. If a new booking is required to verify the last step, use the test procedure I supply.
```

### 21. Audit all website and tool forms

```text
Inventory the forms for [routes or whole website]. For each visible entry point, show the route, owning component, implementation type (native HTML post, iframe, vendor embed, app API or combination), required fields, destination service, attribution field, success behavior and test coverage. Include shared components, page-specific overrides and tool flows with a secondary destination. Check what is rendered and trace code rather than inferring from the vendor brand. Mask tokens and avoid recording visitor data. Report rows that need account access or a test submission. Read-only audit.
```

## 22-32. Content and page types

### 22. Rewrite a service page

```text
Improve [service URL] for [target buyer and intent]. Make the service, use cases, implementation steps, proof and next action explicit using [approved inputs]. Trace content/service-pages and content/service-copy before changing JSX. Check the related FAQ entry, service overview card and existing service schema. Keep promises and metrics aligned with visible evidence. Verify the generated page with npm run service-pages:build where applicable. Check internal links to one relevant case study and related service, search metadata, the booking action, and responsive layout. Keep the current URL.
```

### 23. Add a new service or reorganise the service catalogue

```text
[Create a service at /services/slug or reorganise these existing services] for [buyer and business reason]. Use [approved service scope, exclusions, proof and CTA]. Compare the closest service templates and determine what needs data, a custom component, or changes to /services and navigation. Check the existing keyword map so the new page has a distinct intent. Document where the service should appear and verify indexability, canonical, visible copy, structured data, discovery links and related case studies. If renaming an existing URL, use the redirect prompt and explicitly map old to new.
```

### 24. Make a pricing update

```text
Update [plan URL and tier] to [exact prices, currency, billing cadence, inclusions and terms]. Inspect app/plans and components/pricing/GrowthPlansPricing.tsx to see which plans share the value. Keep unrelated plan variants and calculations scoped out. Where the displayed plan has totals, comparisons, billing toggles, or a checkout or enquiry action, verify all states from the supplied source of truth. Check mobile cards and desktop comparisons. Report old values that persist on other surfaces and distinguish public page copy from third-party billing configuration.
```

### 25. Add or update a city page

```text
[Add or update] /b2b-lead-generation-[city] for [local industries and target buyer]. Start with content/city-pages, the city template and existing internal city links. Use supplied local context and credible proof. Describe how Myntmore serves this market. Only mention a physical office if I supply an approved address for it. Check for overlap with neighbouring city, service and industry pages. Run npm run city-pages:build and verify canonical, H1, FAQs, any structured location claims, contextual links and sitemap presence if the page is intended for search.
```

### 26. Draft a new blog post in Keystatic content

```text
Draft a post on [topic] for [audience]. Target [search intent] and answer [main question] in the opening. Use [source materials and sources to cite], [author], [slug if known], and [preferred CTA]. Inspect content/posts/*.mdoc and the Keystatic schema for the expected fields. Check related existing pages before choosing the angle. Include a useful example or procedure, clearly label assumptions, and use relevant internal links and questions. Put it in the repository as an unpublished draft and show a summary, the opening, metadata and evidence gaps. Verify that the draft stays out of public listings and the sitemap.
```

### 27. Publish or refresh an existing article

```text
[Publish the approved draft or refresh] [article URL or slug] using [approved changes and status]. Inspect the Markdoc source and any metadata or FAQ override. Preserve existing slug and valid anchors unless requested. Keep publication and update dates accurate. Confirm author, citations, headings, related links, callouts and blog index placement. After publishing, verify that the route serves the intended content and appears in the sitemap and relevant discovery outputs. If refreshing without publishing, preserve the prior draft state. Leave the change ready for review unless I authorize a release.
```

### 28. Add or revise a guide or downloadable resource

```text
Create or revise [guide URL] for [audience and practical outcome]. Inspect app/resources/guides and GuideTemplate before choosing a wrapper. Use the approved [guide copy, file, external resource or vendor form]. Check internal headings and anchors, download link accessibility, relevant resource listings and any opt-in flow. Set indexability according to the guide's intended audience. Verify document title, canonical or noindex, destination, mobile reading layout and the actual link or attachment. If replacing a public asset, check existing callers before changing its filename or path.
```

### 29. Add a glossary entry or edit FAQs

```text
[Add glossary term / update FAQs] for [term or target URL]. Read the matching JSON source in content/glossary or content/faqs and find any local FAQ fallback. Define the term in plain language or answer the intended question directly. Include a useful example and context-specific links using [approved sources]. Run npm run glossary:build or npm run faqs:build as applicable then check the rendered text. If FAQ JSON-LD is emitted, compare it with the visible questions and answers. Confirm index, sitemap and discovery links for a new glossary page intended for search.
```

### 30. Add or correct a case study

```text
[Add or correct] [case-study slug] using [client permissions and proof]. Specify [industry, market, timeframe, situation, what Myntmore did and approved outcomes]. Determine whether this is a library, detailed or long-form case by inspecting content/case-studies, content/case-study-pages and content/case-study-long. Keep metric definitions and denominators intact. Mark missing evidence for review. Verify the appropriate generated page, preview card, title and canonical, contextual service links, filters and sitemap behavior. Run the generator for the selected case type and the content generator if it feeds the library.
```

### 31. Post, amend, or close a job

```text
[Add, edit or close] [job title and slug] with [status, role details, location, employment type, application channel and dates]. Start with the matching record in content/careers and the Keystatic fields, then inspect the careers index and generated detail route. Verify public listing state and application action. If JobPosting JSON-LD is used, keep it consistent with the visible role and intended open or closed state. Run npm run careers:build and npm run audit:jobs. Check the rendered route and sitemap behavior for the selected status. Do not add a compensation figure or location without supplied evidence.
```

### 32. Add an event or retire a time-sensitive promotion

```text
[Add, update or retire] [event or promotion] at [URL] using [start date, time zone, registration destination, and replay or archive decision]. Trace lib/events-data.ts, the route under app/events, and app/components/EventPopup.tsx where relevant. Apply the agreed visibility window to the homepage, cards and registration entry points. Decide whether past visitors should see a recap or replay using the supplied archive plan. Verify before, during and after states, time zone display, mobile dismissal and interaction, and the chosen sitemap or indexing treatment. Keep unrelated events and overlays scoped out.
```

## 33-37. Tools and integrations

### 33. Update a calculator

```text
Change [calculator URL and calculation] to [approved formula, default values, units and rounding]. Trace the page UI and calculation source, including lib/cold-email-roi where applicable. Keep the displayed values, chart, examples and exports aligned. Check empty, zero, fractional, bounds, currency and unusually large inputs appropriate to the formula. Use small hand-calculated fixtures to confirm results, and add or update focused tests if existing coverage would miss the change. Validate one mobile flow and verify that toggling calculator modes behaves as expected.
```

### 34. Improve an AI tool’s instructions or output

```text
For [tool URL], change [input, server-side instructions or output format] to achieve [user outcome]. Trace the client, server route, model instructions and response parsing before editing. Use these approved examples [inputs and outputs] and check that the UI and exported results still interpret them correctly. Validate required fields, blank or malformed data, timeouts and provider failures. Use deterministic fixtures or mocked provider responses for repeatable validation. Report which checks exercised the actual model. Keep credentials server-side and avoid persisting inputs or outputs unless the tool already does so for the requested purpose.
```

### 35. Add a free tool

```text
Build [tool name] at /tools/[slug] for [audience and user task]. Specify [inputs, output example, calculation or server behavior, gating decision and lead destination]. Compare an existing tool with similar requirements, reuse relevant UI and update lib/tools-registry.ts if discovery or recommendations should include it. Provide input validation, understandable results and useful empty, loading and error states. Check mobile behavior and keyboard interaction. Run deterministic tests for the core output and describe any live-provider checks. Verify canonical, metadata, internal discovery links and the intended sitemap treatment.
```

### 36. Change or diagnose a tool’s lead gate

```text
On [tool URL], [change or diagnose] the lead capture step [details]. Inspect components/tools/shared/LeadGate.tsx, the tool's caller, provider integration and any Supabase lead write. Identify whether the change is tool-specific or shared. Keep provider field mappings and attribution intact unless a replacement is approved. Verify the user's progress can continue or recover when either persistence destination fails, using mocked responses where practical. Inspect the submitted payload with synthetic values. Report which destinations you verified, with any live writes limited to the test destination I supply.
```

### 37. Diagnose an integration or API issue

```text
Diagnose [tool, booking or form] on [URL and environment]. Reproduce [symptom] with [synthetic input]. Trace browser request, server handler or provider post, credentials required by name, and response and error handling. Compare preview and production behavior only where you have access. Identify the first failing boundary. Make the smallest fix that solves it in the intended environment and confirm success, validation errors and a recoverable provider failure where relevant. Summarise relevant status codes and evidence without printing secrets, raw lead records or personal data. List any provider-side configuration that remains pending.
```

## 38-45. SEO and discoverability

### 38. Improve a title, description or canonical

```text
Review [URL] for [target query and search intent]. Inspect rendered HTML and response headers, then trace the final title, description, canonical and robots directive to the right owner, including content/page-seo and withPageSeo where relevant. Suggest or apply [requested metadata changes] based on page content and any supplied Search Console data. Keep the URL and visible H1 coherent with the intended search result. Verify final rendered metadata, any HTTP canonical Link header, and consistency with redirects and the sitemap. Show the old and new values and the final source.
```

### 39. Update an Open Graph or social preview

```text
Update the social preview for [URL] using [approved image or design, title and description]. Inspect lib/og.ts, the route's metadata and image source. Keep the canonical URL correct and verify the absolute image URL, successful image response, dimensions and meaningful alt text if supported. Check the 1200 × 630 preview and how central elements read when cropped to a square. Confirm the page renders the intended Open Graph and Twitter metadata. Distinguish what you verified directly from any external platform cache that has yet to refresh.
```

### 40. Diagnose a noindex, wrong canonical or excluded URL

```text
Investigate [URLs] using [crawler export, screenshot or Search Console details]. For each URL, follow redirects and inspect final status, HTML meta robots, HTTP X-Robots-Tag, canonical tags and Link headers, robots.txt, sitemap presence and internal links. Flag differences between local, live and Search Console evidence. Confirm the intended indexability with [approved list]. Fix conflicting directives only for pages intended for search and preserve deliberate restrictions on utilities and unpublished content. Verify the live or local result as applicable. Record what Google reported and what still requires recrawling or URL inspection.
```

### 41. Add or verify a redirect

```text
Redirect [old URL] to [approved destination] because [reason]. Check next.config.js, route files, existing prefix rules and any canonical response headers. Use a permanent redirect for a permanent move as requested. Verify the old URL reaches the correct destination in one hop, its redirect canonical header is coherent, and the destination returns the expected status and canonical. Confirm expected query handling. Update owned internal links and sitemap references to the final address. Check a neighbouring URL if a path pattern is involved. Report old links outside the repository separately.
```

### 42. Audit sitemap, robots and Markdown negotiation

```text
Audit [URLs, sitemap or rollout] in [local, preview and/or production]. Check app/sitemap.ts, app/robots.ts, middleware.ts and docs/markdown-pilot.md. Keep each existing indexable page listed at its canonical URL once. Check that there are zero separate Markdown URLs and that the current pilot variant shares the same URL and requires the flag and an explicit Accept preference. Compare ordinary and Markdown-capable clients and inspect Content-Type, canonical and cache headers. Confirm framework requests stay in their expected format. Show exact environment and evidence, and leave the rollout flag as configured by the owner. Run the pilot HTTP checks when testing an enabled preview.
```

### 43. Improve internal linking and structured data

```text
Audit [page or route group] for [topic, visitor journey or search issue]. Map meaningful links to the relevant service, glossary, case study and conversion pages. Identify broken, redirected, duplicate and orphan relationships. Propose or add contextual anchors where readers can use them. Compare structured data from lib/schema.ts and the route with visible facts and approved claims. Use suitable types only when the rendered page supports them. Validate links and JSON-LD from rendered HTML and report changes, including which pages received new inbound links.
```

### 44. Run a Search Console comparison and indexing triage

```text
For the Search Console property [property], compare [exact date range] to [comparison range] using [search type, geography and device filters]. Export the Pages “Why pages aren’t indexed” report and the Performance comparison if accessible. Report exact clicks, impressions, CTR and position by the requested dimensions. Apply the agreed brand exclusion regex [regex] and keep filtered query totals distinguishable from property totals. Inspect the indexing queue in docs/gsc-request-indexing-list.md. If this run includes authorized indexing requests, submit up to [daily target] eligible URLs, prioritise [routes], stop on quota and log each outcome. Label data and UI actions you could not verify.
```

### 45. Audit AI discovery and answer quality

```text
Evaluate [service, audience or question set] using docs/ai-visibility-tracking.md and docs/ai-visibility-prompts.csv. Keep prompt wording, providers and dates visible. Record answer excerpts, cited URLs and factual discrepancies against lib/entity-facts.json and approved public sources. Check existing llms files and search snippets for consistency with rendered pages. Prioritise corrections Myntmore controls and identify observations that may vary across runs. If applying edits, use the existing content source and run npm run audit:entity, npm run audit:answers or npm run llms:check as relevant. Report baseline results without implying that a technical change guarantees citations.
```

## 46-50. Testing and releases

### 46. Run a targeted pre-release QA pass

```text
Verify [changed routes and flows] against [approved requirements] before release. Read the Git diff and identify shared components, generated sources, metadata and form dependencies that the change touches. Check normal entry points on desktop and mobile, keyboard interactions, error or empty states, and a relevant sibling page. Run the applicable generator checks, unit tests, typecheck or production build. Stop any dev server owned by this task before building into the same .next directory. Report each passed, failed or unverified check with evidence. Leave commit, push and deployment for a separate instruction unless I include them here.
```

### 47. Prepare a review branch or draft PR

```text
Prepare [change] for review against master. Inspect the working tree and recent commits, keep unrelated edits out of scope, and run relevant checks. Use a codex/ branch unless I give a different branch name. Commit the agreed files and [choose: keep the branch local / push it and open a draft PR]. In the PR, explain the user-visible change, affected routes, data or config dependencies, test evidence and any remaining verification. Include a preview link if a preview exists. Leave production as it is until I authorize a release.
```

### 48. Push approved changes to master

```text
Push [exact changes, commits or file scope] to origin/master. Verify the remote and fetch the latest master. Check the current branch, commit list, clean diff and any unrelated edits before staging. If the branch has advanced, integrate upstream history safely and revalidate the affected changes. Use ordinary commits and a normal push. Report the resulting commit hashes and confirm the remote accepted them. A push to master can trigger a production deployment. [Choose: finish after confirming the push / monitor Vercel and run the live verification below.]
```

### 49. Monitor deployment and verify the live result

```text
Follow Vercel deployment for [commit SHA, branch and environment] through its terminal state. Confirm whether it is a preview or production deployment. Once ready, open [live route list] and verify [specific visible copy, footer, form markup, redirect or metadata]. Tie the live check to the intended commit and test without creating real leads or bookings unless authorised. If the deployment fails, inspect the first actionable error and fix recoverable issues within the authorised scope. Report deployment state, tested URLs, evidence and any items still blocked by account access or required decisions.
```

### 50. Roll back a bad change

```text
Investigate [regression] on [environment and URLs]. Identify when it started and the responsible commit, flag, content change or deployment. Show the smallest rollback that preserves subsequent unrelated changes. [Choose: prepare the rollback locally / apply the approved revert or config rollback]. Use a reversible change and preserve shared Git history. Verify the previously broken behavior and one nearby flow. If publishing the rollback is authorised, monitor the intended deployment and check the live routes before reporting success. Include the reverted change, resulting commit or deployment, and verification evidence.
```

## Ready-to-run examples

These examples use real Myntmore routes. Prompts that describe changes already made show how to scope a similar future task.

### Partner percentage only

```text
On /lp/agency-partners, set the displayed typical partner margin to 10%. Search the page data and any partner FAQ shown on that page for references to the same margin. Keep separate performance percentages, qualifiers and the form as configured. Edit the authoritative content and verify that a new page load shows 10%. Keep the change local.
```

### Replace a single LP form

```text
Use the attached index 2.html to replace only the form on /lp/agency-partners. Use the attached form action, field identifiers, required fields and configured return behavior. Keep the surrounding offer, CTA anchors, standard footer and other landing-page forms in their current layout. Validate the outbound provider payload with synthetic values and a local intercepted request. Show the before and after fields, mobile layout and any provider-side checks that need a test submission.
```

### Give Enwil’s page something interactive

```text
On /enwilfernandes, add a small keyboard- and touch-friendly quiz titled “Where’s your pipeline getting stuck?” with choices “Finding the right buyers”, “Getting replies”, and “Turning replies into calls”. Each choice reveals one short practical tip. Use these tips in order: “Pick one buyer role and look for one buying signal you can reference”, “Lead with a specific observation and ask one easy question”, and “Offer two concrete time slots while the conversation is active”. Add a gold underline that draws in once per browser session and stays visible for users who prefer reduced motion. Preserve the Head of Sales title, contact actions and vCard. Make the changes on this card only and keep them local.
```

### Explain and fix missing LP chrome

```text
The screenshot for /lp/agencies-it should show the full Myntmore footer. Trace the landing-page layout and tell me why it differs from the standard site footer. If the difference is a layout override, use the shared Footer below main on every page under /lp. Verify one footer per route and confirm that the newsletter signup and privacy link render. Keep this local for review.
```

### Verify that Markdown is absent from the sitemap

```text
Check https://www.myntmore.com/sitemap.xml for separate Markdown URLs, including .md and .markdown paths. Confirm each of the eight pilot pages from docs/markdown-pilot.md appears once under its existing canonical path. Request /services with Accept: text/markdown to confirm the current production behavior. Show counts and the observed Content-Type. Treat this as a read-only check.
```

### Release only the approved change

```text
Push only the approved landing-page footer change to origin/master. Inspect staged and unstaged files first and leave unrelated work outside the release. Verify that the commit reached origin/master, then monitor the matching Vercel deployment. When ready, verify the full footer and newsletter input on /lp/agencies-it and /lp/agency-partners. Report the commit, deployment status and both live checks.
```

## Verification commands

Run commands from the repository root. Pick the checks relevant to the change and use the current `package.json` as the command reference.

| Change | Commands and checks |
| --- | --- |
| Local browser review | `npm run dev`. Open the URL printed by the server. |
| TypeScript or React | `npx tsc --noEmit`, `npm run build`. Review generated diffs after the build. |
| Landing pages | `npm run landing-pages:build`, `npm run landing-pages:check`. |
| Services or cities | `npm run service-pages:build`, `npm run service-pages:check`, or the corresponding `city-pages:build` and `city-pages:check`. |
| FAQs, glossary or page metadata | `npm run faqs:build`, `npm run glossary:build`, or `npm run page-seo:build`. Run the corresponding `:check`. |
| Case studies | `npm run case-studies:content` and `npm run case-studies:build` for the library where relevant. Use `npm run case-study-pages:build` for detailed pages and `npm run case-study-long:build` for long-form pages. |
| Careers | `npm run careers:build`, `npm run careers:check`, `npm run audit:jobs`. |
| Tools and server logic | `npm run test:roi` runs the repository’s Vitest suite. Use deterministic fixtures or approved test services for provider behavior. |
| SEO and content | `npm run audit:links` after building, plus `npm run audit:entity`, `npm run audit:answers`, `npm run sitemap:check` and `npm run llms:check` as appropriate. |
| Markdown pilot | `node scripts/check-markdown-pilot.mjs [origin]`. Append `--disabled` when verifying the default state. See the [Markdown pilot notes](markdown-pilot.md) for local setup and preview validation. |

For recurring search work, use the [SEO cadence](seo-aeo-geo-cadence.md) and the [indexing queue](gsc-request-indexing-list.md). For an implementation that touches approved claims, use the [Website Bible](website-bible.md), the matching live page and the evidence supplied with the request.
