# Content admin (/admin): setup and how it works

`/admin` is Myntmore's own content editor. Editors sign in with their Myntmore email and password (the same Supabase logins the team's other tools use), and only people on the admin's Editors list get in. Every save becomes one commit on `master` with the editor as the author, and Vercel deploys it like any other push. Git stays the single source of truth; Supabase only holds sign-ins, editor roles and the activity log.

```
Editor's browser ──▶ Vercel function ──▶ GitHub (master) ──▶ Vercel build ──▶ live site
                          │
                          └──▶ Supabase: who may edit + activity log
```

**Phase 1:** sign-in and roles, reading from GitHub, saving with conflict checks, the activity log, Page FAQs.
**Phase 2:** every JSON content type (13 collections, 15 single pages) is editable; new entries can be created for landing, city and industry-city pages, events, case studies, the glossary, careers, FAQs and search titles; and every save is checked against the build's own rules (`scripts/lib/content-rules.mjs`, shared with the page generators), so the admin cannot commit a change that would stop the site from building. Blog posts are still edited in Keystatic (`/keystatic`).

## How a save works

1. The form posts the edited entry to `/api/admin/entries/<type>/<entry>`.
2. The server checks the person is signed in, is an active editor, and may edit that content type.
3. It validates the entry with **Keystatic's own field rules** (required fields, character limits, dropdown options), from `keystatic.config.ts`, then with the **build rules** the page generators apply (exact list lengths, links to pages that must exist, a landing or city page's FAQ file), answered from the latest `master`.
4. It writes the file the way Keystatic does (`JSON.stringify(value, null, 2)` + newline), keeping the existing file's layout so a save changes only the lines that were edited.
5. It reads the latest `master`; if the file changed since the editor opened it, it stops with "This was edited by Rahul at 3:42 pm" and nothing is committed. The editor's changes stay in the form.
6. It commits through a GitHub App: author = the editor (e.g. `Priya <priya@myntmore.com>`), committer = the App.
7. It records the save in the activity log: who, when, which entry, the commit link, and each changed field (`items.2.answer: old → new`).
8. The push deploys the site, usually live in about 2 minutes. If the build fails, Vercel keeps the previous version live.

## One-time setup

### 1. GitHub App (lets the server commit)

1. GitHub → your profile → **Settings → Developer settings → GitHub Apps → New GitHub App**.
2. Name: `Myntmore Admin`. Homepage URL: `https://www.myntmore.com`. **Webhook: untick Active.**
3. **Repository permissions → Contents: Read and write.** (Metadata: Read-only is set automatically.) No other permissions.
4. **Where can this GitHub App be installed: Only on this account.** Create the App.
5. On the App's page, note the **App ID**, then **Generate a private key** (a `.pem` file downloads).
6. **Install App** → choose the account → **Only select repositories → `myntmore-website`**. After installing, the browser address ends in `/installations/<number>`: that number is the **installation ID**.

If `master` has branch protection that requires pull requests, allow this App to bypass it, or saves will be refused.

### 2. Supabase (sign-in, roles, activity log)

Use the same Supabase project the site already uses.

1. **SQL Editor:** run `supabase/admin.sql`. Then add yourself as the first admin (replace the email and name):
   ```sql
   insert into public.admin_editors (email, name, role) values ('you@myntmore.com', 'Your Name', 'admin');
   ```
2. **Authentication → Providers → Email:** must be enabled (it is by default). Sign-in uses email and password; the admin sends no emails, so the email templates and Supabase's email limits do not matter for it.

### 3. Vercel environment variables (Production only)

| Variable | Value |
|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API → `service_role` key. **Server only: never prefix it with `NEXT_PUBLIC_`.** |
| `ADMIN_GITHUB_APP_ID` | The App ID from step 1 |
| `ADMIN_GITHUB_APP_PRIVATE_KEY` | The full contents of the `.pem` file |
| `ADMIN_GITHUB_INSTALLATION_ID` | The installation ID from step 1 |
| `ADMIN_GITHUB_REPO` | `aitoolsteejay/myntmore-website` |
| `ADMIN_GITHUB_BRANCH` | Optional, defaults to `master` |
| `ADMIN_VERCEL_DEPLOY_HOOK_URL` | Optional, see below |

`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are already set for the lead forms.

Set these for **Production only**. A preview deployment with the same values would also commit straight to `master`.

**Deploy hook (check this on the first save).** On Vercel's Hobby plan, a private repo's commits deploy automatically only when their author is on the Vercel team, and admin saves are authored by the editor, so Vercel may mark them "Blocked". If the first admin save does not deploy, create a hook (Vercel project → **Settings → Git → Deploy Hooks**, branch `master`) and put its URL in `ADMIN_VERCEL_DEPLOY_HOOK_URL`. The admin then asks Vercel to build the latest `master` after every save. Leave it unset if saves already deploy, or each save will build twice.

Redeploy once after adding the variables.

### 4. Sign in

Go to `https://www.myntmore.com/admin` and sign in with your Myntmore email and password. If you have no Supabase login yet, create one in Supabase (**Authentication → Users → Add user**, tick **Auto Confirm User**).

## Managing editors

Admins manage people on the **Editors** page (`/admin/editors`): add someone with a role, change a role, set a new password, remove or restore access. Someone who already has a Myntmore login keeps their password; for anyone else a login is created and the admin is shown the password once, to pass on. "Set new password" changes that person's password everywhere the login is used. Everyone can change their own password by clicking their name, top right. Every change is recorded in Activity. There is always at least one admin, and admins cannot remove their own admin access.

The same can be done in the Supabase SQL editor:

```sql
-- Add an editor who may edit everything
insert into public.admin_editors (email, name, role) values ('priya@myntmore.com', 'Priya', 'editor');
-- Limit someone to certain content types (keys as in keystatic.config.ts)
update public.admin_editors set allowed_types = '{pageFaqs}' where email = 'priya@myntmore.com';
-- Read-only access
update public.admin_editors set role = 'viewer' where email = 'rahul@myntmore.com';
-- Remove access (keeps their name in the activity log)
update public.admin_editors set active = false where email = 'rahul@myntmore.com';
```

Roles: **admin** (everything), **editor** (edit the allowed content types), **viewer** (read only). Emails must be lowercase.

## Security

- The GitHub App can only reach this repository, and the server only ever writes files under `content/`.
- The App key and the Supabase service-role key live only in server environment variables.
- Middleware turns away anyone not signed in from `/admin` and `/api/admin`; every page and every save then checks the editor's role on the server.
- The editors and activity tables have row-level security with no policies: the browser cannot read or change them.
- Only active editors can sign in; a valid login that is not on the Editors list gets the same "wrong email or password" answer, so the form does not reveal who has access. Attempts are rate limited per IP and per email.
- `/admin` is `noindex`, disallowed in `robots.txt`, and hidden from `/site-audit`.

## Local development

```bash
ADMIN_LOCAL_DEV=1 npm run dev
```

Then open `http://localhost:3000/admin`. You are signed in as "Local developer", saves write to the files on your computer (like Keystatic's local mode) and the activity log is kept in memory. This mode is ignored on Vercel and in production builds.

## Code map

| File | What it does |
|---|---|
| `lib/admin/fields.ts` | Keystatic's `fields`, recording each field's settings so the admin can draw the form. `keystatic.config.ts` and the content schemas import `fields` from here. |
| `lib/admin/schema.ts` | Parse, validate and write entries with Keystatic's own field functions; describe fields for the form; field-level diffs. |
| `lib/admin/store.ts`, `lib/admin/github.ts` | Reading and committing: GitHub App in production, local files in development. Conflict checks. |
| `lib/admin/entries.ts` | Load, save, create and log entries. `CREATABLE_TYPES` lists where new entries can be added. |
| `scripts/lib/content-rules.mjs`, `lib/admin/rules.ts` | Build rules shared by the generators and the admin. |
| `lib/admin/auth.ts`, `middleware.ts` | Sign-in check and roles. |
| `lib/admin/activity.ts` | Activity log. |
| `components/admin/EntryEditor.tsx` | The form renderer. |
| `supabase/admin.sql` | Tables for editors and the activity log. |

Tests: `npm run test:roi` runs everything, including `lib/admin/schema.test.ts` (every JSON entry on disk survives a load and save through Keystatic's rules unchanged) and `lib/admin/github.test.ts` (commits, conflicts and races against a fake GitHub).

## Next phases

- **Phase 3:** blog posts (Markdoc editor with preview, image upload).
- **Phase 4:** deploy status in the admin, Undo, an Editors page, and a guide for editors.
