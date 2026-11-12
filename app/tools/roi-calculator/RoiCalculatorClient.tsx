"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { LandingPage } from "@/components/tools/roi-calculator/LandingPage";
import { CalculatorInputs } from "@/components/tools/roi-calculator/CalculatorInputs";
import { ResultsDashboard } from "@/components/tools/roi-calculator/ResultsDashboard";
import { FunnelChart } from "@/components/tools/roi-calculator/FunnelChart";
import { LeadGateModal } from "@/components/tools/roi-calculator/LeadGateModal";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { LeadData } from "@/components/tools/shared/LeadGate";
import { HandUnderline, PillBadge } from "@/components/cold-email-roi/HandUnderline";

// RevenueChart pulls in recharts (~5MB of source), so it's kept out of this
// route's initial bundle and only fetched once the calculator is actually
// showing results, not on the (always-visible) landing screen.
const RevenueChart = dynamic(
  () => import("@/components/tools/roi-calculator/RevenueChart").then((m) => m.RevenueChart),
  { ssr: false }
);

const currencies = {
  USD: "$",
  INR: "₹",
  AUD: "A$",
  AED: "د.إ",
  SGD: "S$",
  HKD: "HK$",
  CNY: "¥",
  JPY: "¥",
  CAD: "C$",
};

export default function RoiCalculatorClient() {
  const [started, setStarted] = useState(false);
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [showGate, setShowGate] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [currency, setCurrency] = useState("USD");
  const [connectionRequests, setConnectionRequests] = useState(0);
  const [acceptanceRate, setAcceptanceRate] = useState(0);
  const [replyRate, setReplyRate] = useState(0);
  const [positiveResponseRate, setPositiveResponseRate] = useState(50);
  const [meetingRateFromPositive, setMeetingRateFromPositive] = useState(30);
  const [closingRate, setClosingRate] = useState(0);
  const [averageTicketPrice, setAverageTicketPrice] = useState(0);
  const [transactionsPerYear, setTransactionsPerYear] = useState(1);
  const [monthsCustomerStays, setMonthsCustomerStays] = useState(0);
  const [duration, setDuration] = useState(12);
  const [monthlyCost, setMonthlyCost] = useState(0);

  // Calculations
  const totalRequests = Math.round(connectionRequests * duration);
  const acceptedConnections = Math.round(totalRequests * (acceptanceRate / 100));
  const replies = Math.round(acceptedConnections * (replyRate / 100));
  const positiveReplies = Math.round(replies * (positiveResponseRate / 100));
  // Derived from positiveReplies, not rounded independently, so the two
  // always sum back to `replies` exactly (rounding both separately could
  // over/undercount by a reply -- e.g. replies=3 at a 50/50 split would
  // round 1.5 up to 2 on both sides, summing to 4).
  const negativeReplies = replies - positiveReplies;
  const meetings = Math.round(positiveReplies * (meetingRateFromPositive / 100));

  // Sales Conversion Rate Adjustment: +1 percentage point
  const adjustedClosingRate = Math.min(closingRate + 1, 100);
  const deals = Math.round(meetings * (adjustedClosingRate / 100));

  // LTV Calculation with Duration Proration (retention in months)
  const fullLifetimeLTV = averageTicketPrice * transactionsPerYear * (monthsCustomerStays / 12);
  const coveredMonths = Math.min(duration, monthsCustomerStays);
  const effectiveLTV = Math.round(averageTicketPrice * transactionsPerYear * (coveredMonths / 12));

  const revenue = Math.round(deals * effectiveLTV);
  const totalServiceCost = Math.round(monthlyCost * duration);
  // null (not 0) when there's no cost to divide by -- ROI is mathematically
  // undefined here, not "no return". Forcing it to 0% would misrepresent a
  // scenario with real positive revenue as a break-even one.
  const roi = totalServiceCost > 0 ? Math.round(((revenue - totalServiceCost) / totalServiceCost) * 100) : null;

  const currencySymbol = currencies[currency as keyof typeof currencies];

  const funnelData = [
    { label: "Connection Requests", value: totalRequests, percentage: 100, previousValue: totalRequests },
    { label: "Accepted Connections", value: acceptedConnections, percentage: acceptanceRate, previousValue: totalRequests },
    { label: "Total Replies", value: replies, percentage: replies > 0 ? (replies / acceptedConnections) * 100 : 0, previousValue: acceptedConnections },
    { label: "Positive Responses", value: positiveReplies, percentage: positiveResponseRate, previousValue: replies },
    { label: "Negative Responses", value: negativeReplies, percentage: 100 - positiveResponseRate, previousValue: replies },
    { label: "Meetings Booked", value: meetings, percentage: positiveReplies > 0 ? (meetings / positiveReplies) * 100 : 0, previousValue: positiveReplies },
    { label: "Deals Closed", value: deals, percentage: meetings > 0 ? (deals / meetings) * 100 : 0, previousValue: meetings },
  ];

  // Loads an image via the normal async <img> path (not jsPDF's own
  // synchronous-XHR string fallback) so we get its natural dimensions for
  // aspect-ratio-correct sizing, and can add it to the PDF as an
  // HTMLImageElement directly.
  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  const handleExport = async () => {
    if (!resultsRef.current) return;

    toast.loading("Generating PDF...");

    // html2canvas and jsPDF together are several hundred KB and are only
    // ever needed here, on the "Export Results" click: loading them
    // dynamically keeps them out of the page's initial JS bundle entirely.
    const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
      import("html2canvas"),
      import("jspdf"),
    ]);

    // html2canvas clones the target node into an off-screen document to
    // render it. resultsRef's width comes from its parent's CSS Grid
    // (`lg:col-span-8`), which the clone doesn't inherit: without an
    // explicit width, the clone can collapse to 0px wide, producing a
    // canvas with `width: 0` and blank/broken pages. Locking the element's
    // own inline width right before capture (and telling html2canvas that
    // exact width) gives the clone something concrete to render at,
    // regardless of grid context.
    const target = resultsRef.current;
    const measuredWidth = target.getBoundingClientRect().width;
    const previousInlineWidth = target.style.width;

    try {
      if (measuredWidth > 0) {
        target.style.width = `${measuredWidth}px`;
      }

      const canvas = await html2canvas(target, {
        scale: 1.5,
        backgroundColor: "#ffffff",
        logging: false,
        width: measuredWidth > 0 ? measuredWidth : undefined,
        windowWidth: measuredWidth > 0 ? measuredWidth : undefined,
      });

      if (!canvas.width || !canvas.height || !Number.isFinite(canvas.width) || !Number.isFinite(canvas.height)) {
        throw new Error(`Captured canvas has invalid dimensions (${canvas.width}x${canvas.height}); aborting export instead of generating blank pages.`);
      }

      // JPEG instead of PNG: this is a screenshot of mostly flat-colour
      // cards and charts, not a photo, so lossless PNG buys nothing here
      // but multiplies file size. Combined with the 1.5x (down from 2x)
      // capture scale, this keeps the export legible while cutting a
      // multi-page export down from tens of MB to a few MB.
      const imgData = canvas.toDataURL("image/jpeg", 0.8);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = 210;
      const pageHeight = 297;
      const headerHeight = 45;

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (!Number.isFinite(imgHeight) || imgHeight <= 0) {
        throw new Error(`Computed image height is invalid (${imgHeight}); aborting export instead of generating blank pages.`);
      }

      // Header banner: black band first, everything else drawn on top of
      // it, so nothing added afterwards gets painted over.
      pdf.setFillColor(0, 0, 0);
      pdf.rect(0, 0, pageWidth, headerHeight, "F");

      try {
        const logo = await loadImage("/logo.png");
        const logoHeight = 15;
        const logoWidth = (logo.naturalWidth / logo.naturalHeight) * logoHeight;
        pdf.addImage(logo, "PNG", 10, (headerHeight - logoHeight) / 2, logoWidth, logoHeight);
      } catch (logoError) {
        console.error("Logo failed to load for PDF export, continuing without it:", logoError);
      }

      pdf.setFontSize(20);
      pdf.setTextColor(255, 255, 255);
      pdf.text("ROI Calculator Results", pageWidth / 2, 35, { align: "center" });

      // Paginate the results image across as many pages as it needs
      // instead of letting it silently overflow past the first page. The
      // same full image is re-added on each page at an increasing negative
      // offset; each page's own boundary clips it to just that slice.
      const firstPageContentHeight = pageHeight - headerHeight;
      const maxPages = 20;
      let shown = 0;
      let pageIndex = 0;

      while (shown < imgHeight && pageIndex < maxPages) {
        if (pageIndex > 0) pdf.addPage();
        const y = pageIndex === 0 ? headerHeight : -shown;
        pdf.addImage(imgData, "JPEG", 0, y, imgWidth, imgHeight);
        shown += pageIndex === 0 ? firstPageContentHeight : pageHeight;
        pageIndex++;
      }

      const totalPages = pdf.getNumberOfPages();
      if (totalPages > 1) {
        const footerBandHeight = 14;
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          // White band first, footer text on top -- same pattern as the
          // header banner above -- so the page number stays legible
          // instead of overlapping whatever the captured content painted
          // at this exact position.
          pdf.setFillColor(255, 255, 255);
          pdf.rect(0, pageHeight - footerBandHeight, pageWidth, footerBandHeight, "F");
          pdf.setFontSize(9);
          pdf.setTextColor(140, 130, 121);
          pdf.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 8, { align: "center" });
        }
      }

      pdf.save("roi-calculator-results.pdf");
      toast.success("PDF exported successfully!");
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Failed to export PDF");
    } finally {
      target.style.width = previousInlineWidth;
    }
  };

  const handleExportClick = () => {
    if (leadData) {
      handleExport();
    } else {
      setShowGate(true);
    }
  };

  const handleLeadComplete = (data: LeadData) => {
    setLeadData(data);
    setShowGate(false);

    if (data.id) {
      // The Supabase client (~200 kB) is loaded on first use, not with the page.
      void import("@/lib/supabase")
        .then(({ supabase }) => {
          supabase
            .from("leads")
            .update({
              inputs: { currency, connectionRequests, acceptanceRate, replyRate, positiveResponseRate, meetingRateFromPositive, closingRate, averageTicketPrice, transactionsPerYear, monthsCustomerStays, duration, monthlyCost },
              outputs: { totalRequests, acceptedConnections, replies, positiveReplies, negativeReplies, meetings, deals, revenue, roi },
            })
            .eq("id", data.id)
            .then(({ error }) => {
              if (error) console.error("Supabase inputs/outputs update failed:", error);
            });
        })
        .catch((error) => console.error("Supabase inputs/outputs update failed:", error));
    }

    handleExport();
  };

  if (!started) {
    return <LandingPage onStart={() => setStarted(true)} />;
  }

  return (
    <div className="min-h-screen bg-cream text-foreground relative overflow-hidden">
      {/* Vivid background blobs, matching the homepage hero's color treatment */}
      <div aria-hidden="true" style={{ position: "absolute", top: "-120px", left: "-140px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,183,49,0.28) 0%, rgba(255,160,0,0.10) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", top: "160px", right: "-120px", width: "550px", height: "550px", borderRadius: "50%", background: "radial-gradient(circle, rgba(168,139,250,0.22) 0%, rgba(139,92,246,0.08) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", bottom: "-160px", left: "20%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(234,88,12,0.14) 0%, rgba(234,88,12,0.05) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none" }} />

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="mb-4">
              <PillBadge>ROI Calculator</PillBadge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-foreground mb-3 leading-tight">
              LinkedIn Outreach <HandUnderline>ROI Calculator</HandUnderline>
            </h1>
            <p className="text-lg text-muted-foreground">
              Calculate your LinkedIn outreach ROI in real time
            </p>
          </div>
          <Button
            onClick={handleExportClick}
            className="bg-accent hover:bg-accent/90 text-primary-foreground font-semibold"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Results
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Panel - Inputs */}
          <div className="lg:col-span-4">
            <div className="bg-card border border-border rounded-2xl p-6 lg:sticky lg:top-24">
              <h2 className="text-2xl font-black text-foreground mb-6">Your Inputs</h2>
              <CalculatorInputs
                currency={currency}
                setCurrency={setCurrency}
                connectionRequests={connectionRequests}
                setConnectionRequests={setConnectionRequests}
                acceptanceRate={acceptanceRate}
                setAcceptanceRate={setAcceptanceRate}
                replyRate={replyRate}
                setReplyRate={setReplyRate}
                positiveResponseRate={positiveResponseRate}
                setPositiveResponseRate={setPositiveResponseRate}
                meetingRateFromPositive={meetingRateFromPositive}
                setMeetingRateFromPositive={setMeetingRateFromPositive}
                closingRate={closingRate}
                setClosingRate={setClosingRate}
                averageTicketPrice={averageTicketPrice}
                setAverageTicketPrice={setAverageTicketPrice}
                transactionsPerYear={transactionsPerYear}
                setTransactionsPerYear={setTransactionsPerYear}
                monthsCustomerStays={monthsCustomerStays}
                setMonthsCustomerStays={setMonthsCustomerStays}
                duration={duration}
                setDuration={setDuration}
                monthlyCost={monthlyCost}
                setMonthlyCost={setMonthlyCost}
                acceptedConnections={acceptedConnections}
                replies={replies}
                positiveReplies={positiveReplies}
                negativeReplies={negativeReplies}
                meetings={meetings}
                deals={deals}
                fullLifetimeLTV={fullLifetimeLTV}
                effectiveLTV={effectiveLTV}
              />
            </div>
          </div>

          {/* Right Panel - Results */}
          <div ref={resultsRef} className="lg:col-span-8 space-y-6">
            <ResultsDashboard
              totalRequests={totalRequests}
              acceptedConnections={acceptedConnections}
              replies={replies}
              positiveReplies={positiveReplies}
              negativeReplies={negativeReplies}
              meetings={meetings}
              deals={deals}
              revenue={revenue}
              roi={roi}
              currency={currency}
              currencySymbol={currencySymbol}
              fullLifetimeLTV={fullLifetimeLTV}
              effectiveLTV={effectiveLTV}
              acceptanceRate={acceptanceRate}
              replyRate={replyRate}
              positiveResponseRate={positiveResponseRate}
              meetingRateFromPositive={meetingRateFromPositive}
              closingRate={closingRate}
              adjustedClosingRate={adjustedClosingRate}
            />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <FunnelChart data={funnelData} currency={currency} />
              <RevenueChart
                duration={duration}
                revenue={revenue}
                currency={currency}
                currencySymbol={currencySymbol}
                serviceCost={totalServiceCost}
              />
            </div>
          </div>
        </div>
      </div>

      {showGate && <LeadGateModal onComplete={handleLeadComplete} onClose={() => setShowGate(false)} />}
    </div>
  );
}
