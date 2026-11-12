import type { Metadata } from "next";
import MentiClient from "./MentiClient";
import { withPageSeo } from "@/lib/page-seo";

export const metadata: Metadata = withPageSeo("/menti", {
  title: "Live Q&A",
  description: "Answer today's question live.",
  robots: { index: false, follow: false },
});

export default function MentiPage() {
  return <MentiClient />;
}
