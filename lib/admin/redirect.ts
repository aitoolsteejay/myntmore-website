/** A post-login destination is only ever an admin page on this site. */
export function safeAdminPath(next: string | null | undefined): string {
  if (!next || !next.startsWith("/admin") || next.startsWith("//") || next.includes("\\") || next.startsWith("/admin/auth") || next === "/admin/login")
    return "/admin";
  return next;
}
