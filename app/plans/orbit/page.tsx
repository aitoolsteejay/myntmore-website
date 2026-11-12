import type { Metadata } from "next";
import OrbitPlanClient from "./OrbitPlanClient";
import { withPageSeo } from "@/lib/page-seo";

export const metadata: Metadata = withPageSeo("/plans/orbit", {
  title: "The Orbit Plan",
  description: "An essential GTM foundation for companies ready to build consistent visibility and outbound momentum.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.myntmore.com/plans/orbit" },
});

export default function OrbitPlanPage() {
  return <OrbitPlanClient />;
}
