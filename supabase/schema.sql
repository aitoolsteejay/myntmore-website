-- Myntmore lead-magnet tools: shared Supabase schema
--
-- Run this once in your new Supabase project's SQL Editor
-- (Dashboard -> SQL Editor -> New query -> paste -> Run).
--
-- Profile Optimizer, Posting Rhythm Builder, Lead Magnet Idea Generator,
-- DM Angle Generator, Founder Presence Analyzer, and ICP Builder all gate
-- access behind the shared LeadGate component
-- (components/tools/shared/LeadGate.tsx), each posting to its own Zoho
-- form (or the shared one, if it doesn't have a dedicated form yet) as the
-- primary record, and logging here as a secondary record. ROI Calculator
-- has no backend and does not use this table.
--
-- Each row starts life at LeadGate submission (name/email/phone/etc, plus
-- `inputs`/`outputs` empty). Once the tool actually runs, the same page
-- updates that row in place with what the visitor typed in (`inputs`) and
-- what the AI generated for them (`outputs`), keyed off the row `id`
-- LeadGate hands back on insert. So a single row captures the full
-- session: who they are, what they asked for, and what they got.

-- This whole file is safe to re-run: creating the table is a no-op if it
-- already exists, the two `alter table` lines below backfill `inputs`/
-- `outputs` onto a table created by an earlier version of this file, and
-- the policies are dropped and recreated so their definitions can change
-- without erroring on "policy already exists".

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source text not null check (source in ('profile_optimizer', 'posting_rhythm_builder', 'lead_magnet_ideas', 'dm_angle_generator', 'founder_presence_analyzer', 'roi_calculator', 'icp_builder')),
  name text not null,
  email text,
  phone text,
  company_name text,
  company_website text,
  linkedin_url text,
  metadata jsonb not null default '{}'::jsonb,
  inputs jsonb not null default '{}'::jsonb,
  outputs jsonb not null default '{}'::jsonb
);

alter table public.leads add column if not exists inputs jsonb not null default '{}'::jsonb;
alter table public.leads add column if not exists outputs jsonb not null default '{}'::jsonb;

-- Backfill: widen the source check constraint to include icp_builder for
-- tables created by an earlier version of this file.
alter table public.leads drop constraint if exists leads_source_check;
alter table public.leads add constraint leads_source_check
  check (source in ('profile_optimizer', 'posting_rhythm_builder', 'lead_magnet_ideas', 'dm_angle_generator', 'founder_presence_analyzer', 'roi_calculator', 'icp_builder'));

alter table public.leads enable row level security;

-- Anyone (including anonymous site visitors) can submit a lead.
drop policy if exists "Allow anonymous inserts" on public.leads;
create policy "Allow anonymous inserts"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);

-- Anyone can also update a row (there's no user auth in these tools, so
-- this can't be scoped to "only the row's own creator" the way a signed-in
-- app would). This is only used by each tool's own client, right after its
-- own LeadGate submission, to attach that same session's `inputs`/
-- `outputs` by row id. Matches the same anonymous-write trust level as the
-- insert policy above.
drop policy if exists "Allow anonymous updates" on public.leads;
create policy "Allow anonymous updates"
  on public.leads
  for update
  to anon, authenticated
  using (true)
  with check (true);

-- No select/delete policy is defined for anon/authenticated, so only the
-- service role (or you, in the Supabase dashboard) can read or delete
-- rows. This matches how the original tools' tables were locked down.

create index if not exists idx_leads_source on public.leads(source);
create index if not exists idx_leads_created_at on public.leads(created_at desc);

-- ─────────────────────────────────────────────────────────────────────
-- Live "gist of the room" feature (/menti, /menti/room)
--
-- A single fixed question is shown to a live audience at /menti; each
-- visitor submits one free-text answer, fully anonymous (no name/email,
-- unrelated to the `leads` table above). /menti/room is an unlisted,
-- password-protected results view for whoever is running the event: it
-- shows a live-updating count and list of answers (via Supabase Realtime),
-- a button to have Gemini summarize the room into an overall gist, and a
-- reset button to clear all responses between sessions/events.
--
-- Because /menti/room has no login, it relies on Realtime + a direct
-- anon `select` to read responses, so unlike `leads` this table allows
-- anonymous reads too. That's an accepted tradeoff for this feature:
-- answers are anonymous and low-sensitivity, and the room view's only
-- protection is not publicizing its URL.

create table if not exists public.menti_responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  answer text not null
);

alter table public.menti_responses enable row level security;

drop policy if exists "Allow anonymous inserts" on public.menti_responses;
create policy "Allow anonymous inserts"
  on public.menti_responses
  for insert
  to anon, authenticated
  with check (char_length(answer) > 0 and char_length(answer) <= 500);

drop policy if exists "Allow anonymous reads" on public.menti_responses;
create policy "Allow anonymous reads"
  on public.menti_responses
  for select
  to anon, authenticated
  using (true);

-- No update policy for anon/authenticated: answers are write-once from
-- the audience.
--
-- Delete IS allowed via anon key, so the room's "Reset room" button can
-- clear all responses between events. This is the same trust tradeoff as
-- the anonymous-read policy above: the app layer only exposes delete
-- through the password-gated /api/menti/reset route, but the anon key
-- itself (already public in the site's JS bundle) could delete rows
-- directly, bypassing the app. Accepted for the same reason as reads --
-- this table only ever holds anonymous, low-sensitivity event answers.
drop policy if exists "Allow anonymous deletes" on public.menti_responses;
create policy "Allow anonymous deletes"
  on public.menti_responses
  for delete
  to anon, authenticated
  using (true);

create index if not exists idx_menti_responses_created_at on public.menti_responses(created_at desc);

-- Enable Realtime on this table so /menti/room gets new answers pushed
-- live instead of having to poll. Safe to re-run: the exception handler
-- swallows "already added to publication" on subsequent runs.
do $$
begin
  alter publication supabase_realtime add table public.menti_responses;
exception
  when duplicate_object then null;
end $$;


-- LinkedIn Hook Grader (/tools/linkedin-hook-grader): allow its lead source.
-- The leads.source check constraint is an allow-list, so inserts with a new value are rejected
-- (the site only logs that error; the Zoho lead is still created) until this has been run.
-- Run once in the Supabase SQL editor. The list also covers the tools added since the last backfill.
alter table public.leads drop constraint if exists leads_source_check;
alter table public.leads add constraint leads_source_check
  check (source in ('profile_optimizer', 'posting_rhythm_builder', 'lead_magnet_ideas', 'dm_angle_generator', 'founder_presence_analyzer', 'roi_calculator', 'icp_builder', 'case_study_generator', 'battle_card_generator', 'hook_grader'));

-- ─────────────────────────────────────────────────────────────────────
-- Prospect Research tool (/tools/prospect-research)
--
-- Every call costs real money (Gemini with Google Search grounding), so the API routes check on the
-- server, with the service-role key (SUPABASE_SERVICE_ROLE_KEY), that the lead exists, came from this
-- tool and is under 24 hours old, and count runs here for the per-email, per-IP and daily caps.
-- The three tables below have row level security on and NO policies: the anon key in the browser can
-- neither read nor write them. Only the server (service role) can. Safe to re-run.

-- 1. Allow the new lead source.
alter table public.leads drop constraint if exists leads_source_check;
alter table public.leads add constraint leads_source_check
  check (source in ('profile_optimizer', 'posting_rhythm_builder', 'lead_magnet_ideas', 'dm_angle_generator', 'founder_presence_analyzer', 'roi_calculator', 'icp_builder', 'case_study_generator', 'battle_card_generator', 'hook_grader', 'prospect_research'));

-- 2. One row per Gemini call: real token and search counts, duration and estimated cost.
create table if not exists public.ai_usage_log (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  tool text not null,
  run_id uuid,
  step text not null,
  model text not null,
  prospect_domain text,
  prompt_tokens integer not null default 0,
  output_tokens integer not null default 0,
  thinking_tokens integer not null default 0,
  tool_use_tokens integer not null default 0,
  searches integer not null default 0,
  duration_ms integer not null default 0,
  cost_usd numeric(10, 6) not null default 0,
  ok boolean not null default true,
  error text
);
alter table public.ai_usage_log enable row level security;
create index if not exists idx_ai_usage_log_run on public.ai_usage_log(run_id, step);
create index if not exists idx_ai_usage_log_created_at on public.ai_usage_log(created_at desc);

-- 3. One row per run: inputs, the profile, the prospects, the final accounts, timings and total cost.
--    status: profiled -> running -> done, or failed; capacity = over the daily cap, to be run by hand.
create table if not exists public.prospect_research_runs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  started_at timestamptz,
  finished_at timestamptz,
  lead_id uuid references public.leads(id) on delete set null,
  email text,
  ip_hash text,
  status text not null check (status in ('profiled', 'running', 'done', 'failed', 'capacity')),
  inputs jsonb not null default '{}'::jsonb,
  profile jsonb,
  questions jsonb,
  questions_hash text,
  prospects jsonb,
  accounts jsonb,
  checks jsonb,
  timings jsonb,
  total_cost_usd numeric(10, 4),
  total_searches integer
);
alter table public.prospect_research_runs enable row level security;
create index if not exists idx_pr_runs_email on public.prospect_research_runs(email, created_at desc);
create index if not exists idx_pr_runs_ip on public.prospect_research_runs(ip_hash, created_at desc);
create index if not exists idx_pr_runs_status on public.prospect_research_runs(status, created_at desc);

-- 4. Research per prospect, reused for 7 days for the same domain and the same seven questions.
create table if not exists public.prospect_research_cache (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  domain text not null,
  questions_hash text not null,
  prospect jsonb,
  result jsonb not null,
  unique (domain, questions_hash)
);
alter table public.prospect_research_cache enable row level security;
