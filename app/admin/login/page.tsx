import type { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";
import { safeAdminPath } from "@/lib/admin/redirect";

export const metadata: Metadata = { title: "Sign in" };

export default function AdminLoginPage({ searchParams }: { searchParams: { next?: string } }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4 py-16">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#A14A08]">Myntmore</p>
      <h1 className="mt-2 text-3xl font-black">Content admin</h1>
      <p className="mt-2 text-sm text-[#52525B]">Sign in with your work email and password.</p>
      <LoginForm next={safeAdminPath(searchParams.next)} />
    </main>
  );
}
