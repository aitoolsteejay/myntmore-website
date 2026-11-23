// Admin passwords. Sign-in uses Supabase's email + password accounts; no email is ever sent. An admin
// sets the first password when adding someone (or resets it), and each person can change their own.
import "server-only";
import { randomInt } from "node:crypto";

export const MIN_PASSWORD = 10;

/** A random password that is easy to read out or type: three groups of four, e.g. "kp7r-x2mv-9tqe". */
export function generatePassword(): string {
  const chars = "abcdefghjkmnpqrstuvwxyz23456789"; // no 0/o, 1/l/i
  const group = () => Array.from({ length: 4 }, () => chars[randomInt(chars.length)]).join("");
  return `${group()}-${group()}-${group()}`;
}

export function passwordProblem(password: string): string | null {
  if (password.length < MIN_PASSWORD) return `Use at least ${MIN_PASSWORD} characters.`;
  if (password.length > 72) return "Use at most 72 characters.";
  return null;
}

async function findUser(email: string) {
  const { dbClient } = await import("./supabase-server");
  const admin = dbClient().auth.admin;
  for (let page = 1; page <= 50; page++) {
    const { data, error } = await admin.listUsers({ page, perPage: 200 });
    if (error) throw new Error(`Could not look up the account: ${error.message}`);
    const user = data.users.find((u) => u.email?.toLowerCase() === email);
    if (user || data.users.length < 200) return user ?? null;
  }
  return null;
}

/**
 * Make sure the person has a sign-in. Someone who already has a Myntmore login (the same Supabase
 * accounts the team's other tools use) keeps their password untouched; for anyone else an account is
 * created with this password, already confirmed, so no email is involved.
 */
export async function ensureAccount(email: string, password: string): Promise<{ created: boolean }> {
  if (await findUser(email)) return { created: false };
  const { dbClient } = await import("./supabase-server");
  const { error } = await dbClient().auth.admin.createUser({ email, password, email_confirm: true });
  if (error) throw new Error(`Could not create the account: ${error.message}`);
  return { created: true };
}

/** Set a new password on someone's existing sign-in (creating it if they have none). */
export async function setAccountPassword(email: string, password: string): Promise<void> {
  const user = await findUser(email);
  const { dbClient } = await import("./supabase-server");
  const admin = dbClient().auth.admin;
  const { error } = user ? await admin.updateUserById(user.id, { password }) : await admin.createUser({ email, password, email_confirm: true });
  if (error) throw new Error(`Could not set the password: ${error.message}`);
}
