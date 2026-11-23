-- Myntmore admin (/admin): editors and the activity log.
--
-- Run once in the Supabase SQL editor (Dashboard -> SQL Editor -> New query -> paste -> Run).
-- Safe to re-run. See docs/admin-setup.md for the rest of the setup.
--
-- Both tables have row-level security ON and NO policies: the browser (anon or signed-in keys)
-- can neither read nor write them. Only the site's server, using SUPABASE_SERVICE_ROLE_KEY, can.
-- Content itself is never stored here; it lives in the GitHub repository.

create table if not exists public.admin_editors (
  email text primary key check (email = lower(email)),
  name text not null default '',
  role text not null default 'editor' check (role in ('admin', 'editor', 'viewer')),
  -- Content type keys this person may edit (e.g. '{pageFaqs,cityPages}'); null = all types.
  allowed_types text[],
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.admin_editors enable row level security;

create table if not exists public.admin_activity (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  editor_email text not null,
  editor_name text not null default '',
  action text not null check (action in ('update', 'create', 'delete', 'revert')),
  content_type text not null,
  content_label text not null default '',
  entry text not null default '',
  files text[] not null default '{}',
  commit_sha text not null,
  commit_url text,
  -- Field-level changes: [{ "path": "items.2.answer", "before": "...", "after": "..." }]
  changes jsonb not null default '[]'::jsonb,
  -- For a revert: the row it undid. On an undone row: the revert that undid it.
  reverts_id uuid references public.admin_activity(id),
  reverted_by_id uuid references public.admin_activity(id)
);

alter table public.admin_activity enable row level security;

create index if not exists idx_admin_activity_created_at on public.admin_activity(created_at desc);
create index if not exists idx_admin_activity_editor on public.admin_activity(editor_email, created_at desc);
create index if not exists idx_admin_activity_type on public.admin_activity(content_type, created_at desc);

-- First admin. Replace the email and name, then run this line once:
-- insert into public.admin_editors (email, name, role) values ('founder@example.com', 'Your Name', 'admin') on conflict (email) do nothing;
