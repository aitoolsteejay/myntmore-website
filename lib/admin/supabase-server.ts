// Supabase clients for the admin, server side only.
//  - authClient(): the signed-in editor's session, read from and refreshed into cookies.
//  - dbClient(): the service-role client for the admin_editors and admin_activity tables. Those tables
//    have row-level security on with no policies, so only this key can read or write them; it never
//    reaches the browser.
import "server-only";
import { createServerClient } from "@supabase/ssr";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

function env(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`The admin is not configured: set ${name} (see docs/admin-setup.md)`);
  return value;
}

/** Session client for server components and route handlers. */
export function authClient() {
  const store = cookies();
  return createServerClient(env("NEXT_PUBLIC_SUPABASE_URL"), env("NEXT_PUBLIC_SUPABASE_ANON_KEY"), {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try {
          list.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {
          // Server components cannot set cookies; the middleware refreshes the session instead.
        }
      },
    },
  });
}

let db: SupabaseClient | undefined;

/** Service-role client for the admin tables. */
export function dbClient(): SupabaseClient {
  db ??= createClient(env("NEXT_PUBLIC_SUPABASE_URL"), env("SUPABASE_SERVICE_ROLE_KEY"), { auth: { persistSession: false, autoRefreshToken: false } });
  return db;
}
