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
        Only the people listed here can sign in to this admin, with their Myntmore email and password. Having a Myntmore login is not enough on its own. Every change here is recorded in Activity.
      </p>
      <EditorsManager initial={editors} roles={ROLES} me={me.email} />
    </>
  );
}
