import type { Metadata } from "next";
import { withPageSeo } from "@/lib/page-seo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FredokaLabels from "../components/FredokaLabels";
import MasterIcpClient from "./MasterIcpClient";

// Myntmore's internal ICP strategy. Shared by link only, so it stays out of search results and the sitemap.
export const metadata: Metadata = withPageSeo("/master-icp", {
  title: "Master ICP Strategy 2026",
  description: "Myntmore's market-led ICP strategy for 2026: 29 ICPs compared on buyer, pains, triggers, buying behaviour, channels, messaging, journey and priority, with the prioritisation framework and numeric scores.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.myntmore.com/master-icp" },
});

// The same shell as InnerLayout, but with overflow-x: clip instead of hidden. Hidden turns the wrapper into a
// scroll container, which stops the page's sticky section bar from sticking.
export default function MasterIcpPage() {
  return (
    <FredokaLabels>
      <div className="min-h-screen overflow-x-clip" style={{ backgroundColor: "#F8F6F2", color: "#0a0a0a" }}>
        <Navbar />
        <main id="main-content">
          <MasterIcpClient />
        </main>
        <Footer />
      </div>
    </FredokaLabels>
  );
}
