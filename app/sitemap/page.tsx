import { CASE_STUDY_MARKETS } from "@/lib/case-study-markets";
import type { Metadata } from "next";
import Link from "next/link";
import InnerLayout from "../components/InnerLayout";
import FadeIn from "../components/FadeIn";
import JsonLd from "../components/JsonLd";
import { buildBreadcrumbSchema, SITE_URL } from "@/lib/schema";
import { textTone } from "@/lib/colors";
import { getCmsPostSummaries } from "@/lib/cms-posts";
import glossaryCards from "@/lib/glossary-index.generated.json";
import { OG_BASE } from "@/lib/og";

export const metadata: Metadata = {
  title: { absolute: "Site Map: Every Page on Myntmore" },
  description: "Every page on Myntmore, organised by section: services, case studies, blog posts, guides, the glossary, free tools, careers and more.",
  alternates: { canonical: "https://www.myntmore.com/sitemap" },
  openGraph: {
    ...OG_BASE,
    title: "Site Map: Every Page on Myntmore",
    description: "Every page on Myntmore, organised by services, case studies, resources, free tools, careers, and more.",
    url: "https://www.myntmore.com/sitemap",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Myntmore" }],
  },
  keywords: [
    "myntmore sitemap",
    "myntmore site navigation",
    "all myntmore pages",
    "myntmore services list",
    "myntmore resources index",
    "site map",
  ],
};

const BREADCRUMB_SCHEMA = buildBreadcrumbSchema([
  { name: "Home", url: SITE_URL },
  { name: "Site Map", url: `${SITE_URL}/sitemap` },
]);

interface SitemapLink {
  label: string;
  href: string;
  note?: string;
}

interface SitemapGroup {
  title: string;
  accent: string;
  links: SitemapLink[];
}

const GROUPS: SitemapGroup[] = [
  {
    title: "Services",
    accent: "#D97706",
    links: [
      { label: "All Services", href: "/services" },
      { label: "LinkedIn Outreach & Automation", href: "/services/linkedin-outreach" },
      { label: "Cold Email Infrastructure", href: "/services/cold-email" },
      { label: "ICP Mapping & Lead Scoring", href: "/services/sales-intelligence" },
      { label: "AI Lead Generation", href: "/services/ai-lead-generation" },
      { label: "Account-Based Marketing", href: "/services/account-based-marketing" },
      { label: "Personal Branding", href: "/services/personal-branding" },
      { label: "GTM Strategy", href: "/services/gtm-strategy" },
      { label: "Marketing Automation", href: "/marketing-automation" },
      { label: "SEO Services", href: "/seo" },
    ],
  },
  {
    title: "Case Studies",
    accent: "#14B8A6",
    links: [
      { label: "All Case Studies", href: "/case-studies" },
      ...CASE_STUDY_MARKETS.map((m) => ({ label: `Case Studies in ${m.label}`, href: `/case-studies/markets/${m.slug}` })),
      { label: "Specialist Recruitment LinkedIn Leads", href: "/case-studies/specialist-recruitment-linkedin-leads" },
      { label: "Leadership Development Messaging Shift", href: "/case-studies/leadership-development-messaging-shift" },
      { label: "Retail Strategy & Store Design Pipeline", href: "/case-studies/retail-strategy-design-pipeline" },
      { label: "Heritage Jewellery Valuation Pipeline", href: "/case-studies/heritage-jewellery-valuation-pipeline" },
      { label: "AI Medical Tourism Platform Pipeline", href: "/case-studies/medical-tourism-platform-pipeline" },
      { label: "Wealth Management & PMS Pipeline", href: "/case-studies/wealth-management-pms-pipeline" },
      { label: "SaaS, Series A", href: "/case-studies/saas-series-a" },
      { label: "Professional Services, LinkedIn", href: "/case-studies/professional-services-linkedin" },
      { label: "Ecommerce Conversion Playbook", href: "/case-studies/ecommerce-conversion-playbook" },
      { label: "Founder Personal Brand on LinkedIn", href: "/case-studies/founder-personal-brand-linkedin" },
      { label: "Predictable B2B Lead Gen Engine", href: "/case-studies/predictable-b2b-lead-gen-engine" },
      { label: "UK Pharma, Qualified Meetings", href: "/case-studies/uk-pharma-qualified-meetings" },
    ],
  },
  {
    title: "Blog",
    accent: "#3B82F6",
    links: [
      { label: "All Blog Posts", href: "/resources/blogs" },
      { label: "Stop Selling Features", href: "/resources/blogs/stop-selling-features-cold-outreach" },
      { label: "The 5-Second Homepage Test", href: "/resources/blogs/5-second-hero-section-test" },
      { label: "The Founder's Pipeline", href: "/resources/blogs/founder-led-sales-before-scaling" },
      { label: "Visibility vs. Value: Founder Personal Brand", href: "/resources/blogs/vanity-metrics-personal-brand-pipeline" },
      { label: "Gut Feel vs. Funnel Math", href: "/resources/blogs/outbound-funnel-math-not-guesswork" },
      { label: "Relevance Beats Reach", href: "/resources/blogs/relevance-beats-reach-b2b-outbound" },
      { label: "The Impression Illusion", href: "/resources/blogs/conversations-not-impressions-outbound" },
      { label: "The TAM Trap", href: "/resources/blogs/tam-trap-vague-targeting" },
      { label: "The 3-Second Rule", href: "/resources/blogs/3-second-rule-cold-outreach" },
      { label: "The Value Premium", href: "/resources/blogs/value-premium-lead-magnets" },
      { label: "Predictable B2B Lead Gen Engine", href: "/resources/blogs/predictable-b2b-lead-gen-engine" },
      { label: "Cold Email Deliverability Guide", href: "/resources/blogs/cold-email-deliverability-guide" },
      { label: "ICP Mapping for B2B", href: "/resources/blogs/icp-mapping-b2b" },
      { label: "LinkedIn Outreach Sequences", href: "/resources/blogs/linkedin-outreach-sequences" },
      { label: "7 B2B Lead Gen Metrics That Matter", href: "/resources/blogs/b2b-lead-gen-metrics" },
      { label: "Ecommerce Conversion Playbook", href: "/resources/blogs/ecommerce-conversion-playbook" },
      { label: "Founder Personal Brand on LinkedIn", href: "/resources/blogs/founder-personal-brand-linkedin" },
      { label: "The 2026 B2B Outbound Benchmark Report", href: "/resources/blogs/b2b-outbound-benchmark-report-2026" },
      { label: "Case Study Procrastination", href: "/resources/blogs/case-study-procrastination" },
      { label: "Cold Email Compliance Guide", href: "/resources/blogs/cold-email-compliance-guide" },
      { label: "Cold Email vs. LinkedIn Outreach", href: "/resources/blogs/cold-email-vs-linkedin-outreach" },
      { label: "The Silent Salesperson: LinkedIn Lead Machine", href: "/resources/blogs/linkedin-profile-inbound-lead-machine" },
      { label: "The Pitching Trap", href: "/resources/blogs/pitching-trap-competitor-positioning" },
      { label: "What Is B2B Outbound Sales?", href: "/resources/blogs/what-is-b2b-outbound-sales" },
      { label: "Cold Email Sequence Templates", href: "/resources/blogs/cold-email-sequence-templates" },
      { label: "The Reply Isn't the Win: Handling Cold Email Replies", href: "/resources/blogs/handling-cold-email-replies" },
      { label: "Single-Threaded Deals Die: Multi-Threading the Buying Committee", href: "/resources/blogs/multi-threading-b2b-buying-committee" },
      { label: "The Pipeline Graveyard: Reviving Closed-Lost Leads", href: "/resources/blogs/reviving-closed-lost-leads" },
      { label: "LinkedIn Outreach Agency vs. Manual Prospecting", href: "/resources/blogs/linkedin-outreach-agency-vs-manual-prospecting" },
      { label: "AI vs. Traditional B2B Lead Generation", href: "/resources/blogs/ai-vs-traditional-lead-generation" },
      { label: "Personal Branding Agency vs. Content Freelancer", href: "/resources/blogs/personal-branding-agency-vs-content-freelancer" },
      { label: "The Follow-Up Ladder: Cold Email Follow-Up Sequence", href: "/resources/blogs/cold-email-follow-up-sequence" },
      { label: "The Reply Gap: Positive Reply to Booked Meeting", href: "/resources/blogs/positive-reply-to-booked-meeting" },
      { label: "The Personalization Paradox: AI in Cold Outreach", href: "/resources/blogs/ai-personalization-cold-outreach" },
      { label: "How to Write a LinkedIn Hook That Earns the Click", href: "/resources/blogs/how-to-write-a-linkedin-hook" },
    ],
  },
  {
    title: "Guides",
    accent: "#8B5CF6",
    links: [
      { label: "All Guides", href: "/resources/guides" },
      { label: "Who Myntmore Is For (and Who It Isn't)", href: "/who-this-is-for" },
      { label: "How to Choose a B2B Outbound Agency", href: "/resources/guides/how-to-choose-an-outbound-agency" },
      { label: "Pattern Disruption: The Do's and Don'ts of Cold Outreach", href: "/resources/guides/dos-and-donts-of-outreach" },
      { label: "The 6 Claude Skills Guide", href: "/resources/guides/claude-skills-guide" },
      { label: "80+ US Meetings with AI Agents", href: "/resources/guides/80-us-meetings-ai-agents" },
      { label: "How to Set Up Vibe Prospecting", href: "/resources/guides/how-to-set-up-vibe-prospecting" },
      { label: "The Golden ICP Framework", href: "/resources/guides/golden-icp-framework" },
      { label: "Leads on Autopilot: A Step-by-Step Framework", href: "/resources/guides/leads-on-autopilot-guide" },
      { label: "58 Meetings from 600 LinkedIn Connections", href: "/resources/guides/58-meetings-600-linkedin-connections" },
      { label: "The Cold Email Stack Behind an Extra $7,000", href: "/resources/guides/cold-email-tech-stack" },
      { label: "5 Claude Prompts for Sales Calls", href: "/resources/guides/claude-sales-call-prompts" },
      { label: "LinkedIn Content-to-Calls Starter Kit", href: "/resources/guides/linkedin-content-to-calls-starter-kit" },
      { label: "The Outbound Meme Prompt Kit", href: "/resources/guides/outbound-meme-prompt-kit" },
      { label: "Job Applications Are a Sales Funnel", href: "/resources/guides/job-applications-sales-funnel" },
    ],
  },
  {
    title: "Glossary",
    accent: "#0EA5E9",
    links: [
      { label: "All Terms", href: "/resources/glossary" },
      { label: "Total Conversional Market (TCM)", href: "/resources/glossary/total-conversional-market" },
      { label: "Signal-Heavy Structuring", href: "/resources/glossary/signal-heavy-structuring" },
      { label: "The 3-Second Rule", href: "/resources/glossary/3-second-rule" },
      { label: "SPF, DKIM & DMARC", href: "/resources/glossary/spf-dkim-dmarc" },
      { label: "ICP (Ideal Customer Profile)", href: "/resources/glossary/icp" },
      { label: "ABM (Account-Based Marketing)", href: "/resources/glossary/abm" },
      { label: "Cold Email", href: "/resources/glossary/cold-email" },
      { label: "Domain Warm-up", href: "/resources/glossary/domain-warmup" },
      { label: "Sender Reputation", href: "/resources/glossary/sender-reputation" },
      { label: "CAN-SPAM Act", href: "/resources/glossary/can-spam-act" },
      { label: "GDPR for Cold Outreach", href: "/resources/glossary/gdpr-cold-outreach" },
      { label: "Buyer Persona", href: "/resources/glossary/buyer-persona" },
      { label: "Buying Signal", href: "/resources/glossary/buying-signal" },
      { label: "SDR (Sales Development Rep)", href: "/resources/glossary/sdr" },
      { label: "Multi-Threading", href: "/resources/glossary/multi-threading" },
      { label: "Lead Magnet", href: "/resources/glossary/lead-magnet" },
      { label: "Founder-Led Sales", href: "/resources/glossary/founder-led-sales" },
      { label: "Vanity Metrics", href: "/resources/glossary/vanity-metrics" },
      { label: "Sales Pipeline", href: "/resources/glossary/sales-pipeline" },
      { label: "Inbound vs. Outbound", href: "/resources/glossary/inbound-vs-outbound" },
      { label: "Aha Moment", href: "/resources/glossary/aha-moment" },
      { label: "Existing Connection Nurturing", href: "/resources/glossary/existing-connection-nurturing" },
      { label: "Hot Lead", href: "/resources/glossary/hot-lead" },
      { label: "Warm Lead", href: "/resources/glossary/warm-lead" },
      { label: "Cold Lead", href: "/resources/glossary/cold-lead" },
      { label: "Lead Scoring", href: "/resources/glossary/lead-scoring" },
      { label: "Value Proposition", href: "/resources/glossary/value-proposition" },
      { label: "Response Rate", href: "/resources/glossary/response-rate" },
      { label: "Meeting-Booked Rate", href: "/resources/glossary/meeting-booked-rate" },
      { label: "Re-engagement Campaign", href: "/resources/glossary/re-engagement-campaign" },
    ],
  },
  {
    title: "The Feed",
    accent: "#E1306C",
    links: [
      { label: "The Feed", href: "/resources/feed" },
    ],
  },
  {
    title: "Free Tools",
    accent: "#F97316",
    links: [
      { label: "All Free Tools", href: "/resources/tools" },
      { label: "LinkedIn Profile Optimizer", href: "/tools/linkedin-optimizer" },
      { label: "DM Angle Generator", href: "/tools/dm-angle-generator" },
      { label: "ROI Calculator", href: "/tools/roi-calculator" },
      { label: "Cold Email ROI Calculator", href: "/tools/cold-email-roi-calculator" },
      { label: "Posting Rhythm Builder", href: "/tools/posting-rhythm-builder" },
      { label: "LinkedIn Hook Grader", href: "/tools/linkedin-hook-grader" },
      { label: "Lead Magnet Idea Generator", href: "/tools/lead-magnet-ideas" },
      { label: "Founder Presence Analyzer", href: "/tools/founder-presence-analyzer" },
      { label: "ICP Builder & Value Prop Generator", href: "/tools/icp-builder" },
      { label: "Case Study & Proposal Generator", href: "/tools/case-study-generator" },
      { label: "Competitor Battle Card Generator", href: "/tools/battle-card-generator" },
    ],
  },
  {
    title: "Events & Comparisons",
    accent: "#8B5CF6",
    links: [
      { label: "Events & Webinars", href: "/events" },
      { label: "Agency vs. In-House SDR", href: "/resources/blogs/agency-vs-in-house" },
    ],
  },
  {
    title: "Careers",
    accent: "#6366F1",
    links: [
      { label: "All Open Roles", href: "/careers" },
      { label: "Lead Gen Strategist", href: "/careers/lead-gen-strategist" },
      { label: "Lead Gen Intern", href: "/careers/lead-gen-intern" },
      { label: "GTM Strategist", href: "/careers/gtm-strategist" },
      { label: "HR Operations Intern", href: "/careers/hr-operations-intern" },
      { label: "Content Marketing Strategist Intern", href: "/careers/content-marketing-strategist-intern" },
      { label: "Sales Executive", href: "/careers/sales-executive" },
      { label: "Sales and Growth Intern", href: "/careers/sales-and-growth-intern" },
    ],
  },
  {
    title: "Industry Pages",
    accent: "#A855F7",
    links: [
      { label: "For Agencies & IT", href: "/lp/agencies-it" },
      { label: "For Manufacturers & Exporters", href: "/lp/manufacturers-exporters" },
      { label: "For B2B SaaS Founders", href: "/lp/saas-founders" },
      { label: "For Recruitment & Staffing Firms", href: "/lp/recruitment-firms" },
      { label: "For Pharma Companies", href: "/lp/pharma" },
      { label: "For Insurance Brokers", href: "/lp/insurance" },
      { label: "For Financial Services Firms", href: "/lp/financial-services" },
      { label: "For Founders Raising Capital", href: "/lp/fundraising" },
    ],
  },
  {
    title: "City Pages",
    accent: "#0EA5E9",
    links: [
      { label: "B2B Lead Generation in Mumbai", href: "/b2b-lead-generation-mumbai" },
      { label: "B2B Lead Generation in Delhi", href: "/b2b-lead-generation-delhi" },
      { label: "B2B Lead Generation in Gurugram", href: "/b2b-lead-generation-gurugram" },
      { label: "B2B Lead Generation in Noida", href: "/b2b-lead-generation-noida" },
      { label: "B2B Lead Generation in Bengaluru", href: "/b2b-lead-generation-bengaluru" },
      { label: "B2B Lead Generation in Pune", href: "/b2b-lead-generation-pune" },
      { label: "B2B Lead Generation in Hyderabad", href: "/b2b-lead-generation-hyderabad" },
      { label: "B2B Lead Generation in Chennai", href: "/b2b-lead-generation-chennai" },
      { label: "B2B Lead Generation in Kolkata", href: "/b2b-lead-generation-kolkata" },
      { label: "B2B Lead Generation in Ahmedabad", href: "/b2b-lead-generation-ahmedabad" },
      { label: "B2B Lead Generation in Jaipur", href: "/b2b-lead-generation-jaipur" },
      { label: "B2B Lead Generation in Indore", href: "/b2b-lead-generation-indore" },
      { label: "B2B Lead Generation in Surat", href: "/b2b-lead-generation-surat" },
      { label: "B2B Lead Generation in Coimbatore", href: "/b2b-lead-generation-coimbatore" },
      { label: "B2B Lead Generation in Dubai", href: "/b2b-lead-generation-dubai" },
      { label: "B2B Lead Generation in Abu Dhabi", href: "/b2b-lead-generation-abu-dhabi" },
    ],
  },
  {
    title: "Company",
    accent: "#52525B",
    links: [
      { label: "About Myntmore & Tejas Jhaveri", href: "/about-us" },
      { label: "Contact", href: "/contact-us" },
      { label: "Book a Call", href: "/book-a-call" },
      { label: "1-on-1 Consultation", href: "/1-on-1-consultation" },
      { label: "Partner with Us", href: "/lp/agency-partners" },
      { label: "Editorial Policy & Methodology", href: "/editorial-policy" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
];

export default async function SitemapPage() {
  // Blog posts come from the CMS: any post without a hand-written label above is listed by its title.
  const known = new Set(GROUPS.flatMap((g) => g.links.map((l) => l.href)));
  const extraPosts = (await getCmsPostSummaries()).filter((p) => !known.has(p.href)).map((p) => ({ label: p.title, href: p.href }));
  // Glossary terms come from the CMS too: any term without a hand-written label above is listed by its name.
  const extraTerms = glossaryCards.filter((c) => !known.has(c.href)).map((c) => ({ label: c.title, href: c.href }));
  const groups: SitemapGroup[] = GROUPS.map((g) =>
    g.title === "Blog" ? { ...g, links: [...g.links, ...extraPosts] } : g.title === "Glossary" ? { ...g, links: [...g.links, ...extraTerms] } : g
  );
  return (
    <InnerLayout>
      <JsonLd data={BREADCRUMB_SCHEMA} />
      <section className="pt-32 pb-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-4">
            <span className="inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ backgroundColor: "#FEF9EC", color: "#A14A08", border: "1px solid rgba(245,183,49,0.3)" }}>
              Navigation
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight" style={{ color: "#0a0a0a" }}>
            Site Map
          </h1>
          <p className="text-base max-w-xl mx-auto" style={{ color: "#52525B" }}>
            Every page on Myntmore, in one place. Looking for the machine-readable version instead? See{" "}
            <a href="/sitemap.xml" className="link-subtle font-semibold" style={{ color: "#0a0a0a" }}>sitemap.xml</a>.
          </p>
        </div>
      </section>

      <section className="py-16 px-4" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((group) => (
                <div key={group.title} className="rounded-2xl border p-6" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: group.accent }} />
                    <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: textTone(group.accent) }}>{group.title}</h2>
                  </div>
                  <ul className="space-y-2.5">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="text-sm leading-snug hover:underline" style={{ color: "#3D3D3D" }}>
                          {link.label}
                        </Link>
                        {link.note && <span className="text-xs ml-2" style={{ color: "#71675E" }}>{link.note}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </InnerLayout>
  );
}
