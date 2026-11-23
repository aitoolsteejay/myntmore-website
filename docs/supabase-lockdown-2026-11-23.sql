-- Supabase lockdown for project gapaawxbkfmpthfesuyw ("workupdatetracker")
-- Written 2026-11-23 for REVIEW. NOT APPLIED. Run it in the SQL editor as ONE transaction
-- (wrap in BEGIN; ... COMMIT;) and read the notes on each section first.
--
-- Why: this project's public anon key is now in the website's JavaScript, so assume anyone has it.
--
--   1. Six work-tracker tables in `public` have row level security OFF. Anyone can read, change or
--      delete every row, including app_users (names, emails, passwords that look unhashed).
--   2. Anonymous visitors can run 14 SECURITY DEFINER functions through /rest/v1/rpc/.
--   3. `leads`: anonymous visitors can update EVERY lead row (policy "true"), yet the tools' own
--      "save inputs and results" update currently matches zero rows (see section 3), so it fails silently.
--
-- Section 3 needs a small code change on the website (rpc call instead of .update). Do not run
-- section 3 without that change, or the tools stop saving results (they already are not).

-- =====================================================================================
-- SECTION 1: work-tracker tables (public.*)
-- =====================================================================================
-- Facts: every table except app_users is EMPTY today (0 rows); app_users has 2 rows. The tracker app is
-- not in this repo. It logs in against app_users with the anon key, so no policy can tell users apart:
-- any policy that lets it work lets everyone in. The only safe options are (a) lock the tables to the
-- server (service role) and move the app server-side, or (b) move the app to Supabase Auth and write
-- per-user policies. This section does (a)'s first step: block anon and signed-in browser access.
-- EFFECT: the tracker app stops working until it is moved. Skip this section if someone still uses it.

alter table public.app_users       enable row level security;
alter table public.task_folders    enable row level security;
alter table public.project_tasks   enable row level security;
alter table public.daily_updates   enable row level security;
alter table public.task_comments   enable row level security;
alter table public.task_templates  enable row level security;

-- No policies on purpose: with RLS on and no policy, only the service role (and the dashboard) can use them.
-- Also take away the table privileges, so a future "disable RLS" mistake does not re-open them.
revoke all on public.app_users, public.task_folders, public.project_tasks,
              public.daily_updates, public.task_comments, public.task_templates
  from anon, authenticated;

-- AFTER this: reset the two app_users passwords (they look unhashed) once the app is moved. Store only hashes.

-- =====================================================================================
-- SECTION 2: functions callable by anonymous visitors
-- =====================================================================================
-- Rule used: the RLS helper functions are called from policies that apply to signed-in users, so
-- `authenticated` keeps EXECUTE and only anon/PUBLIC lose it. Trigger functions never need EXECUTE
-- (Postgres checks it when the trigger is created, not when it fires), so nobody keeps it.
-- Postgres grants EXECUTE to PUBLIC by default, so PUBLIC must be revoked too, not only anon.

-- 2a. Trigger functions: nobody should call these over the API.
revoke execute on function myntmore.handle_new_user()                from public, anon, authenticated;
revoke execute on function outreach.handle_new_user()                from public, anon, authenticated;
revoke execute on function myntmore.enforce_campaign_weekly_client() from public, anon, authenticated;

-- 2b. RLS helpers and signed-in-only functions: keep for `authenticated`, remove from anon.
revoke execute on function myntmore.accept_invite(text)                       from public, anon;  -- returns false when signed out anyway
revoke execute on function myntmore.has_role(uuid, myntmore.app_role)         from public, anon;
revoke execute on function myntmore.is_assigned(uuid, uuid)                   from public, anon;
revoke execute on function myntmore.is_internal_user()                        from public, anon;
revoke execute on function myntmore.is_own_campaign(uuid)                     from public, anon;
revoke execute on function myntmore.is_own_client(uuid)                       from public, anon;
revoke execute on function outreach.has_outreach_access(uuid)                 from public, anon;
revoke execute on function outreach.is_admin()                                from public, anon;
revoke execute on function outreach.is_admin_user(uuid)                       from public, anon;
-- Make sure signed-in users still have it (revoking from PUBLIC can remove an implicit grant).
grant  execute on function myntmore.accept_invite(text)                       to authenticated;
grant  execute on function myntmore.has_role(uuid, myntmore.app_role)         to authenticated;
grant  execute on function myntmore.is_assigned(uuid, uuid)                   to authenticated;
grant  execute on function myntmore.is_internal_user()                        to authenticated;
grant  execute on function myntmore.is_own_campaign(uuid)                     to authenticated;
grant  execute on function myntmore.is_own_client(uuid)                       to authenticated;
grant  execute on function outreach.has_outreach_access(uuid)                 to authenticated;
grant  execute on function outreach.is_admin()                                to authenticated;
grant  execute on function outreach.is_admin_user(uuid)                       to authenticated;

-- 2c. LEFT ALONE ON PURPOSE (check before changing):
--   myntmore.get_invite_by_token(text)  An invite page is opened before sign-in, so it probably needs anon.
--                                       It returns email, name, department, status for a token: the token is the secret.
--   outreach.has_admin()                Probably used by a first-run "no admin yet" screen before sign-in.
--                                       If the outreach app never calls it signed out, revoke it from public, anon too.

-- =====================================================================================
-- SECTION 3: leads table (needs the website code change first)
-- =====================================================================================
-- Finding: as anon, `update public.leads set outputs = ... where id = <that row's id>` updates ZERO rows,
-- because anon has no SELECT policy and Postgres requires one for an UPDATE with a WHERE clause. So the
-- ten tools' "save inputs and results to the lead" call is a silent no-op today (the insert works).
-- Giving anon a SELECT policy would expose every lead's name, email and phone, so it is not an option.
-- Fix: one narrow function that can only set inputs/outputs on a lead created in the last 24 hours.

create or replace function public.save_lead_result(p_lead_id uuid, p_inputs jsonb, p_outputs jsonb)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  -- Payload cap so the function cannot be used to stuff the table.
  if pg_column_size(p_inputs) > 200000 or pg_column_size(p_outputs) > 400000 then
    raise exception 'payload too large';
  end if;
  update public.leads
     set inputs  = coalesce(p_inputs,  inputs),
         outputs = coalesce(p_outputs, outputs)
   where id = p_lead_id
     and created_at > now() - interval '24 hours';
end;
$$;

revoke all     on function public.save_lead_result(uuid, jsonb, jsonb) from public;
grant  execute on function public.save_lead_result(uuid, jsonb, jsonb) to anon, authenticated;

-- Now close the old hole: nobody but the service role can update or read leads from the browser.
drop policy if exists "Allow anonymous updates" on public.leads;
revoke all on public.leads from anon, authenticated;
grant insert on public.leads to anon, authenticated;   -- the form only inserts (it generates its own id)

-- =====================================================================================
-- VERIFY (run after COMMIT; each should return what the comment says)
-- =====================================================================================
-- select count(*) from information_schema.role_table_grants
--   where grantee in ('anon','authenticated') and table_schema='public'
--     and table_name in ('app_users','task_folders','project_tasks','daily_updates','task_comments','task_templates');  -- 0
-- select n.nspname, p.proname, has_function_privilege('anon', p.oid, 'EXECUTE') as anon_exec
--   from pg_proc p join pg_namespace n on n.oid = p.pronamespace
--   where n.nspname in ('myntmore','outreach') and p.prosecdef and has_function_privilege('anon', p.oid, 'EXECUTE');
--   -- only get_invite_by_token (and has_admin) should remain

-- =====================================================================================
-- ROLLBACK (puts things back the way they were; run only if something breaks)
-- =====================================================================================
-- alter table public.app_users, ... disable row level security;  (one statement per table)
-- grant all on public.app_users, public.task_folders, public.project_tasks, public.daily_updates,
--   public.task_comments, public.task_templates to anon, authenticated;
-- grant execute on function <each function above> to public, anon, authenticated;
-- create policy "Allow anonymous updates" on public.leads for update to anon, authenticated using (true) with check (true);
-- grant all on public.leads to anon, authenticated;
-- drop function public.save_lead_result(uuid, jsonb, jsonb);
