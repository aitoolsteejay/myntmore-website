import Link from "next/link";
import { currentEditor, type Editor } from "@/lib/admin/auth";
import { isLocalDevMode } from "@/lib/admin/store";

export const dynamic = "force-dynamic";

function Shell({ editor, children }: { editor: Editor | null; children: React.ReactNode }) {
  return (
    <>
      <header className="border-b border-[#E8E2D9] bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
          <Link href="/admin" className="text-sm font-black">
            Myntmore <span className="font-semibold text-[#71675E]">admin</span>
          </Link>
          {editor && (
            <nav className="flex gap-4 text-sm font-semibold text-[#52525B]" aria-label="Admin">
              <Link href="/admin" className="hover:text-[#0A0A0A]">
                Content
              </Link>
              <Link href="/admin/drafts" className="hover:text-[#0A0A0A]">
                My drafts
              </Link>
              <Link href="/admin/activity" className="hover:text-[#0A0A0A]">
                Activity
              </Link>
              <Link href="/admin/health" className="hover:text-[#0A0A0A]">
                Site health
              </Link>
              {editor.role === "admin" && (
                <Link href="/admin/editors" className="hover:text-[#0A0A0A]">
                  Editors
                </Link>
              )}
            </nav>
          )}
          <div className="ml-auto flex items-center gap-3 text-sm">
            {editor && (
              <Link href="/admin/account" className="text-[#52525B] hover:text-[#0A0A0A]" title="Change my password">
                {editor.name} <span className="rounded-full bg-[#F8F6F2] px-2 py-0.5 text-xs font-semibold text-[#71675E]">{editor.role}</span>
              </Link>
            )}
            {!isLocalDevMode() && (
              <form action="/api/admin/auth/logout" method="post">
                <button className="font-semibold text-[#A14A08] hover:underline">Sign out</button>
              </form>
            )}
          </div>
        </div>
        {isLocalDevMode() && (
          <p className="bg-[#FEF9EC] px-4 py-1.5 text-center text-xs text-[#A14A08]">
            Local development mode: saves write to the files on this computer, not to GitHub.
          </p>
        )}
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">{children}</main>
    </>
  );
}

export default async function AdminAppLayout({ children }: { children: React.ReactNode }) {
  let editor: Editor | null;
  try {
    editor = await currentEditor();
  } catch (err) {
    return (
      <Shell editor={null}>
        <h1 className="text-2xl font-black">The admin is not set up yet</h1>
        <p className="mt-2 max-w-xl text-sm text-[#52525B]">{err instanceof Error ? err.message : "A required setting is missing."}</p>
        <p className="mt-2 text-sm text-[#52525B]">The setup steps are in docs/admin-setup.md in the repository.</p>
      </Shell>
    );
  }
  if (!editor) {
    return (
      <Shell editor={null}>
        <h1 className="text-2xl font-black">This account doesn&apos;t have admin access</h1>
        <p className="mt-2 max-w-xl text-sm text-[#52525B]">Ask an admin to add your email as an editor, then sign in again.</p>
      </Shell>
    );
  }
  return <Shell editor={editor}>{children}</Shell>;
}
