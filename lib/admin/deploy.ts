// Optional: ask Vercel to deploy after a save.
//
// Normally the commit itself triggers the deploy. On Vercel's Hobby plan, though, a private repo's
// commits are only deployed automatically when their author is on the Vercel team, and admin saves
// are authored by the editor. A Deploy Hook (Vercel project → Settings → Git → Deploy Hooks, branch
// master) builds the latest master whoever wrote it. Set ADMIN_VERCEL_DEPLOY_HOOK_URL to use one.
import "server-only";

/** Triggers the deploy hook if one is configured. Returns a warning for the editor if it failed. */
export async function triggerDeploy(): Promise<string | undefined> {
  const hook = process.env.ADMIN_VERCEL_DEPLOY_HOOK_URL;
  if (!hook) return undefined;
  try {
    const res = await fetch(hook, { method: "POST", signal: AbortSignal.timeout(8000), cache: "no-store" });
    if (res.ok) return undefined;
    console.error("admin: deploy hook answered", res.status);
  } catch (err) {
    console.error("admin: deploy hook failed", err);
  }
  return "Saved to GitHub, but the deploy could not be started. It will go live with the next deploy.";
}
