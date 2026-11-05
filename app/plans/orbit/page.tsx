import type { Metadata } from "next";
import OrbitPlanClient from "./OrbitPlanClient";

export const metadata: Metadata = {
  title: "The Orbit Plan",
  description: "An essential GTM foundation for companies ready to build consistent visibility and outbound momentum.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.myntmore.com/plans/orbit" },
};

export default function OrbitPlanPage() {
  return <OrbitPlanClient />;
}
