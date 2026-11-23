import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EditorsManager from "@/components/admin/EditorsManager";
import { currentEditor } from "@/lib/admin/auth";
import { listEditors, ROLES } from "@/lib/admin/editors";

export const metadata: Metadata = { title: "Editors" };

export default async function EditorsPage() {
  const me = (await currentEditor())!;
  if (me.role !== "admin") notFound();
  const editors = await listEditors();
  return (
    <>
      <h1 className="text-3xl font-black">Editors</h1>
      <p className="mt-1 max-w-2xl text-sm text-[#52525B]">
        Who can sign in to this admin. Invited people get an email with a sign-in link; afterwards they sign in at /admin with their email. Every change here is recorded in Activity.
      </p>
      <EditorsManager initial={editors} roles={ROLES} me={me.email} />
    </>
  );
}
