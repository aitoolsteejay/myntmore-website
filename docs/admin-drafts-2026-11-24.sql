-- Private drafts for the content admin. Each row belongs to one signed-in editor and is only ever
-- read or written for that editor's own email by the admin server (service-role key). Like
-- admin_editors and admin_activity, row-level security is on with no policies, so the browser and
-- the public anon key can't touch it.
create table if not exists public.admin_drafts (
  id uuid primary key default gen_random_uuid(),
  editor_email text not null,
  type_key text not null,
  slug text not null default '',        -- entry file name; '' for a not-yet-created entry
  title text not null default '',       -- what the editor sees in "My drafts"
  state jsonb not null,
  body text,                            -- blog posts: the article
  base_sha text not null default '',    -- version of the saved entry the draft started from
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index if not exists admin_drafts_one_per_entry
  on public.admin_drafts (editor_email, type_key, slug) where slug <> '';
create index if not exists admin_drafts_by_editor on public.admin_drafts (editor_email, updated_at desc);
alter table public.admin_drafts enable row level security;
