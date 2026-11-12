# Prospect Research tool: status and launch checklist

`/tools/prospect-research` went live, hidden, on 12 Nov 2026. It works at its URL but is `noindex, nofollow`,
is not linked from any page and is not listed anywhere. This file lists what is still to do and every place a
public tool is wired in, so launching is a short checklist.

## How it works

| Step | Route | What it does | Typical time |
| --- | --- | --- | --- |
| 1 | `POST /api/tools/prospect-research/profile` | Fetches the homepage, one grounded call to define the ideal customer, creates the run row | 15 to 30 s |
| 2 | `POST /api/tools/prospect-research/discover` | Grounded call for 15 to 20 candidates, removes own company, exclusions, duplicates and dead domains, keeps 10. The run counts from here. | 30 to 60 s |
| 3 | `POST /api/tools/prospect-research/account` | One per prospect, 5 at once, 1 retry: grounded research, format on Flash-Lite, link check in code, scores from `lib/research-scoring.ts`. Cached 7 days. | 25 to 60 s each |
| 4 | `POST /api/tools/prospect-research/finish` | Saves accounts, timings and real cost on the run row and on the lead row | under 1 s |

Code: `lib/prospect-research/` (core and net are pure and tested), `app/tools/prospect-research/`,
`app/api/tools/prospect-research/`. Models: `PROSPECT_RESEARCH_MODEL` (default `gemini-3.8-flash`) and
`PROSPECT_FORMAT_MODEL` (default `gemini-3.1-flash-lite`).

## Protection

- Every route checks on the server, with `SUPABASE_SERVICE_ROLE_KEY`, that the lead exists, has source
  `prospect_research` and is under 24 hours old. Without the key the tool refuses to run.
- Durable caps counted in `prospect_research_runs`: 2 runs per email and 5 per IP in any 24 hours; 6 profile
  checks per email and 12 per IP; global daily cap `PROSPECT_RESEARCH_DAILY_RUN_CAP` (default 30, UTC day).
  Over the cap the request is stored with status `capacity` and the visitor sees "We'll email your report tomorrow".
- Per run: at most 2 discovery attempts and 22 research calls; only the 10 discovered domains can be researched;
  the run expires after 1 hour. Plus `lib/rateLimit.ts` per request.
- Note: anyone can insert a lead with any email through the public anon key, so the per-email cap is soft. The
  per-IP and global caps are the hard limits.
- The server fetches visitor and model URLs through `safeFetch`, which refuses private and loopback addresses at
  every redirect hop.

## Measure a run

After a run, paste this into the Supabase SQL editor:

```sql
select r.id, r.created_at, r.status,
       r.inputs->>'website' as website,
       jsonb_array_length(coalesce(r.accounts, '[]'::jsonb)) as accounts,
       (r.timings->>'firstProspectMs')::int / 1000 as first_prospect_s,
       (r.timings->>'totalMs')::int / 1000 as total_s,
       r.total_searches, r.total_cost_usd, r.checks
from prospect_research_runs r
order by r.created_at desc
limit 5;

-- Per step, for one run:
select step, count(*) as calls, sum(searches) as searches,
       round(sum(cost_usd), 4) as cost_usd, round(avg(duration_ms) / 1000.0, 1) as avg_s,
       sum(prompt_tokens) as prompt, sum(output_tokens) as output, sum(thinking_tokens) as thinking,
       count(*) filter (where not ok) as failed
from ai_usage_log where run_id = '<run id>'
group by step order by step;
```

Cost is estimated at list price, with every search at $14 per 1,000 (the 5,000 free searches a month are not
subtracted). 3.8 Flash token prices double on 1 Jan 2027; `lib/prospect-research/config.ts` already switches.
If a run costs over $1.30 or takes over 2.5 minutes, the likely levers are: fewer searches per research call
(prompt says about 6), a lower thinking level on the research calls, or 8 prospects instead of 10.

## Still to do before launch

- [ ] **Blocker found 12 Nov 2026:** production `NEXT_PUBLIC_SUPABASE_URL` points to `ycdmczmtekhyfjivvhio.supabase.co`,
      which no longer resolves (the project is gone). Every tool's Supabase lead insert fails silently, and this tool
      refuses to run. Point `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` and `SUPABASE_SERVICE_ROLE_KEY`
      in Vercel at the live project (the one the SQL was run in), then redeploy.

- [ ] Real runs measured (cost, searches, time to first prospect, total time, link-check downgrades).
- [ ] The tool's own Zoho form: put its action URL in `ZOHO_FORM_ACTIONS.prospect_research` in
      `components/tools/shared/LeadGate.tsx`. Until then the lead is saved to Supabase only.
- [ ] `SUPABASE_SERVICE_ROLE_KEY` in Vercel for Preview too (it is Production only), so branch previews work.
- [ ] Someone to handle `capacity` rows (status `capacity` in `prospect_research_runs`): the page promises an email.
- [ ] Privacy policy: mention Gemini (Google) and Supabase.

## Launch wiring (mirror the Battle Card Generator)

- [ ] `app/tools/prospect-research/page.tsx`: drop `robots`; add `alternates.canonical`, keywords,
      `buildToolSocialMetadata(...)` and `<JsonLd data={buildWebApplicationSchema(...)} />`; consider `withPageSeo`.
- [ ] `content/page-seo/tools-prospect-research.json` (Keystatic page SEO), then `lib/page-seo.generated.json` regenerates.
- [ ] `lib/tools-registry.ts` (also feeds `RelatedTools`, the "Try this next" lists).
- [ ] `app/resources/tools/page.tsx` (tools hub card).
- [ ] `app/sitemap.ts` and `npm run sitemap:dates` (`lib/sitemap-dates.json`).
- [ ] `app/sitemap/page.tsx` (HTML sitemap).
- [ ] `public/llms.txt` and `npm run llms:build` (`public/llms-full.txt`).
- [ ] Cross-links where they fit: `app/tools/cold-email-roi-calculator/ColdEmailRoiPageClient.tsx` "Try this next",
      relevant blog posts (the battle card is linked from `content/posts/pitching-trap-competitor-positioning.mdoc`).
- [ ] `scripts/generate-keyword-research.mjs` keyword row, `README.md` tools table, `docs/keyword-map.md`,
      `docs/ai-visibility-prompts.csv`, `docs/website-bible.md` tools list.
- [ ] `scripts/generate-site-map.mjs`: remove `/tools/prospect-research` from `isPrivate` and the
      `/api/tools/prospect-research` filter on `apiRoutes`.
- [ ] Navbar and footer: nothing to do. Both link only to the `/resources/tools` hub, not to single tools.
