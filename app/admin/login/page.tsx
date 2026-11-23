import type { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";
import { safeAdminPath } from "@/lib/admin/redirect";

export const metadata: Metadata = { title: "Sign in" };

export default function AdminLoginPage({ searchParams }: { searchParams: { next?: string; error?: string } }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4 py-16">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#A14A08]">Myntmore</p>
      <h1 className="mt-2 text-3xl font-black">Content admin</h1>
      <p className="mt-2 text-sm text-[#52525B]">Sign in with your work email. We&apos;ll email you a link; there is no password.</p>
      {searchParams.error === "link" && (
        <p role="alert" className="mt-6 rounded-lg border border-[#F5C2C0] bg-[#FDECEA] px-3 py-2 text-sm text-[#9F1D1D]">
          That sign-in link has expired or was already used. Ask for a new one below.
        </p>
      )}
      <LoginForm next={safeAdminPath(searchParams.next)} />
    </main>
  );
}
