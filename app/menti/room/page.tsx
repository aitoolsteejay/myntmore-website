import type { Metadata } from "next";
import { cookies } from "next/headers";
import InnerLayout from "../../components/InnerLayout";
import RoomClient from "./RoomClient";
import RoomLogin from "./RoomLogin";
import { ADMIN_COOKIE_NAME, isValidAdminCookie } from "@/lib/mentiAuth";
import { withPageSeo } from "@/lib/page-seo";

export const metadata: Metadata = withPageSeo("/menti/room", {
  title: "Room",
  robots: { index: false, follow: false },
});

export const dynamic = "force-dynamic";

export default function RoomPage() {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  const authed = isValidAdminCookie(token);

  return <InnerLayout>{authed ? <RoomClient /> : <RoomLogin />}</InnerLayout>;
}
