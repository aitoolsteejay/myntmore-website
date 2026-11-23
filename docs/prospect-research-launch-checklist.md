# Prospect Research tool: status and launch checklist

`/tools/prospect-research` went live, hidden, on 12 Nov 2026. It works at its URL but is `noindex, nofollow`,
is not linked from any page and is not listed anywhere. This file lists what is still to do and every place a
public tool is wired in, so launching is a short checklist.

**Status on 23 Nov 2026:** working end to end. The database blocker from 12 Nov is fixed, the first real run
finished (8 of 10 companies, $0.86, 5.6 minutes), and the timeouts and retry that run exposed are fixed. A second
run is needed to confirm the fixes before launch (see "Still to do").

## How it works

| Step | Route | What it does | Typical time |
| --- | --- | --- | --- |
| 1 | `POST /api/tools/prospect-research/profile` | Fetches the homepage, one grounded call to define the ideal customer, creates the run row | 15 to 30 s |
| 2 | `POST /api/tools/prospect-research/discover` | Grounded call for 15 to 20 candidates, removes own company, exclusions, duplicates and dead domains, keeps 10. The run counts from here. Limit 120 s. | 60 to 90 s (83 s measured) |
| 3 | `POST /api/tools/prospect-research/account` | One per prospect, 5 at once, 1 retry: grounded research (limit 110 s), format on Flash-Lite, link check in code, scores from `lib/research-scoring.ts`. Cached 7 days. | 65 to 80 s each (measured) |
| 4 | `POST /api/tools/prospect-research/finish` | Saves accounts, timings and real cost on the run row and on the lead row. Called again after "Retry the ones that failed" (`retry: true`), which keeps the first run's timings. | under 1 s |

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
- The `leads` table has no anonymous read policy, on purpose (visitors must not read other people's details). The
  lead form therefore creates the lead's id in the browser and inserts without asking for the row back
  (`components/tools/shared/LeadGate.tsx`); an insert that returns the row is rejected by row level security.
  Only the server, with the service role key, reads leads.

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

First real run, 23 Nov 2026 (website `myntmore.com`): 40 searches, **$0.86**, 335 s in total, first company after 165 s.
Profile $0.04, discovery $0.17, research $0.66 for the 8 that finished (about $0.08 each, range $0.03 to $0.14).
10 companies found, 8 researched: `finpilot.ai` and `different.ai` timed out at the old 80 s limit on both tries (the ones
that finished took 65 to 78 s), and discovery timed out once at the old 90 s limit and had to be started again.
Failed calls log $0.00 here but Google may still bill part of them, so treat the cost as a floor.

Cost is estimated at list price, with every search at $14 per 1,000 (the 5,000 free searches a month are not
subtracted). 3.8 Flash token prices double on 1 Jan 2027; `lib/prospect-research/config.ts` already switches.
If a run costs over $1.30 or takes over 2.5 minutes, the likely levers are: fewer searches per research call
(prompt says about 6), a lower thinking level on the research calls, or 8 prospects instead of 10.

## Still to do before launch

- [x] **Database blocker, fixed 23 Nov 2026.** Production pointed at `ycdmczmtekhyfjivvhio.supabase.co`
      ("LeadMagnetData"), a project that had been paused, so every lead insert failed and this tool refused to run.
      The live project is `gapaawxbkfmpthfesuyw` ("workupdatetracker", which also holds the client tracking and outreach
      apps). `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel now point at it and production was
      rebuilt; `SUPABASE_SERVICE_ROLE_KEY` was already valid for it. The old project holds 5 test leads from 27 and 28 Jul
      and nothing else; it was restored by mistake while diagnosing, so pause or delete it when convenient.
- [x] Lead form fixed for this project's row level security (commit `6e03ddf`, see Protection).
- [x] Timeouts and retry from the first run (commits `ed3150e`, `839af9e`): research 80 s to 110 s per company, discovery
      90 s to 120 s, function limits 150 s and 180 s, and a "Retry the N that could not be researched" button.
- [ ] **Run it again** to confirm 10 of 10 and measure the time: the first run took 5.6 minutes (one discovery restart
      included), against a 2.5 minute target. A clean run should be about 3 to 4 minutes. If speed matters, the levers are
      listed above (fewer searches per company, lower thinking level, or 8 prospects instead of 10). Check
      `ai_usage_log` for `AbortError` rows after the run.
- [ ] More real runs measured (cost, searches, time to first prospect, total time, link-check downgrades).
- [ ] The tool's own Zoho form: put its action URL in `ZOHO_FORM_ACTIONS.prospect_research` in
      `components/tools/shared/LeadGate.tsx`. Until then the lead is saved to Supabase only.
- [ ] `SUPABASE_SERVICE_ROLE_KEY` in Vercel for Preview too (it is Production only), so branch previews work. Note
      that the two `NEXT_PUBLIC_SUPABASE_*` variables are set for Preview as well, so a preview deploy writes real leads
      to the live project.
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

## Supabase project notes (not launch blockers)

The live project is shared with other apps, so these were left alone on purpose. Found 23 Nov 2026:

- **Tool results are not being saved to the lead row.** The ten older tools update `leads.inputs` and `outputs` after
  the form, but an anonymous update matches zero rows (no read policy), so nothing is stored. The code now calls
  `public.save_lead_result(...)` through `lib/save-lead-result.ts` (commit `8c53769`), but that database function has not
  been created, because the SQL was reviewed and not run. Until it is, those tools keep failing quietly. This tool is not
  affected: it saves through the server with the service role key. The SQL is in commit `8c53769`
  (`docs/supabase-lockdown-2026-11-23.sql`); its section 3 only touches `public.leads`, which the 24-hour request logs show only the website using.
- **Six work-tracker tables in `public` have row level security off** (`app_users`, `project_tasks`, `task_folders`,
  `daily_updates`, `task_comments`, `task_templates`). The anon key is public, so anyone can read or change them. Five are
  empty; `app_users` has 2 rows whose passwords look unhashed. The logs show no use in 24 hours. Section 1 of the SQL locks
  them; it stops the old tracker app, so check first.
- **14 `SECURITY DEFINER` functions in the `myntmore` and `outreach` schemas can be run by anonymous visitors.** Section 2
  of the SQL revokes this. Do not touch `get_invite_by_token` or `outreach.has_admin` without checking the sign-in flows.
- Supabase Auth leaked-password protection is off (dashboard setting).
