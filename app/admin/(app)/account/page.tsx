import type { Metadata } from "next";
import ChangePassword from "@/components/admin/ChangePassword";
import { currentEditor } from "@/lib/admin/auth";
import { MIN_PASSWORD } from "@/lib/admin/passwords";

export const metadata: Metadata = { title: "My password" };

export default async function AccountPage() {
  const me = (await currentEditor())!;
  return (
    <>
      <h1 className="text-3xl font-black">My password</h1>
      <p className="mt-1 text-sm text-[#52525B]">
        Signed in as {me.name} ({me.email}). If you were given a password by an admin, change it here to one only you know.
      </p>
      <ChangePassword min={MIN_PASSWORD} />
    </>
  );
}
