"use client";

import { Phone } from "lucide-react";
import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const motes = Array.from({ length: 28 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.8 + 0.5,
      speed: Math.random() * 0.18 + 0.06,
      drift: (Math.random() - 0.5) * 0.12,
      opacity: Math.random() * 0.18 + 0.06,
      phase: (i / 28) * Math.PI * 2,
    }));
    let animId: number;
    let t = 0;
    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      t += 0.004;
      ctx!.shadowColor = "rgba(245,183,49,0.3)";
      ctx!.shadowBlur = 6;
      for (const p of motes) {
        p.y -= p.speed;
        p.x += Math.sin(t + p.phase) * p.drift;
        if (p.y < -10) { p.y = canvas!.height + 10; p.x = Math.random() * canvas!.width; }
        if (p.x < -10) p.x = canvas!.width + 10;
        if (p.x > canvas!.width + 10) p.x = -10;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(245,183,49,${p.opacity})`;
        ctx!.fill();
      }
      ctx!.shadowBlur = 0;
      animId = requestAnimationFrame(draw);
    }
    animId = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);
  return <canvas ref={canvasRef} aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

function LinkedInIcon() {
  return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;
}
function InstagramIcon() {
  return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>;
}
function YouTubeIcon() {
  return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>;
}

const SERVICES_LINKS = [
  { label: "LinkedIn Outreach & Automation", href: "/services/linkedin-outreach" },
  { label: "Cold Email Infrastructure", href: "/services/cold-email" },
  { label: "ICP Mapping & Lead Scoring", href: "/services/sales-intelligence" },
  { label: "AI Lead Generation", href: "/services/ai-lead-generation" },
  { label: "Account-Based Marketing", href: "/services/account-based-marketing" },
  { label: "Personal Branding", href: "/services/personal-branding" },
  { label: "GTM Strategy", href: "/services/gtm-strategy" },
  { label: "Marketing Automation", href: "/marketing-automation" },
  { label: "SEO Services", href: "/seo" },
];
const COMPANY_LINKS = [
  { label: "About Myntmore", href: "/about-us" },
  { label: "The Myntmore Framework", href: "/myntmore-framework" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Resources & Playbooks", href: "/resources" },
  { label: "Blog", href: "/resources/blogs" },
  { label: "Guides", href: "/resources/guides" },
  { label: "The Feed", href: "/resources/feed" },
  { label: "Newsletter", href: "/newsletter-subscribe" },
  { label: "Careers", href: "/careers" },
  { label: "Partner with Us", href: "/lp/agency-partners" },
  { label: "1-on-1 Consultation", href: "/1-on-1-consultation" },
  { label: "Contact", href: "/contact-us" },
];

const ICP_LINKS = [
  { label: "For Agencies & IT", href: "/lp/agencies-it" },
  { label: "For Manufacturers & Exporters", href: "/lp/manufacturers-exporters" },
  { label: "For B2B SaaS Founders", href: "/lp/saas-founders" },
  { label: "For Recruitment & Staffing Firms", href: "/lp/recruitment-firms" },
  { label: "For Pharma Companies", href: "/lp/pharma" },
  { label: "For Insurance Brokers", href: "/lp/insurance" },
  { label: "For Financial Services Firms", href: "/lp/financial-services" },
  { label: "For Accounting & CFO Firms", href: "/lp/accounting-cfo-firms" },
  { label: "For Founders Raising Capital", href: "/lp/fundraising" },
];

const CITY_LINKS = [
  { label: "Lead generation in Mumbai", href: "/b2b-lead-generation-mumbai" },
  { label: "Delhi", href: "/b2b-lead-generation-delhi" },
  { label: "Gurugram", href: "/b2b-lead-generation-gurugram" },
  { label: "Noida", href: "/b2b-lead-generation-noida" },
  { label: "Bengaluru", href: "/b2b-lead-generation-bengaluru" },
  { label: "Pune", href: "/b2b-lead-generation-pune" },
  { label: "Hyderabad", href: "/b2b-lead-generation-hyderabad" },
  { label: "Chennai", href: "/b2b-lead-generation-chennai" },
  { label: "Kolkata", href: "/b2b-lead-generation-kolkata" },
  { label: "Ahmedabad", href: "/b2b-lead-generation-ahmedabad" },
  { label: "Jaipur", href: "/b2b-lead-generation-jaipur" },
  { label: "Indore", href: "/b2b-lead-generation-indore" },
  { label: "Surat", href: "/b2b-lead-generation-surat" },
  { label: "Coimbatore", href: "/b2b-lead-generation-coimbatore" },
  { label: "Dubai", href: "/b2b-lead-generation-dubai" },
  { label: "Abu Dhabi", href: "/b2b-lead-generation-abu-dhabi" },
];

export default function Footer() {
  const ctaHref = "/book-a-call";
  const breathRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let animId: number;
    const start = performance.now();
    function animate() {
      const t = (performance.now() - start) / 1000;
      if (breathRef.current) {
        const x = Math.sin(t * 0.18) * 60 + Math.sin(t * 0.09) * 30;
        const y = Math.cos(t * 0.14) * 40 + Math.cos(t * 0.07) * 20;
        breathRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      animId = requestAnimationFrame(animate);
    }
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <footer className="relative overflow-hidden border-t" style={{ backgroundColor: "#FFFFFF", borderColor: "#E8E2D9" }} aria-label="Site footer">
      <div ref={breathRef} aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", width: "900px", height: "500px", marginTop: "-250px", marginLeft: "-450px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(245,183,49,0.07) 0%, rgba(245,183,49,0.03) 45%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none", willChange: "transform" }} />
      <ParticleCanvas />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 py-14 border-b" style={{ borderColor: "#E8E2D9" }}>

          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center mb-5" aria-label="Myntmore home">
              <Image src="/logo.png" alt="Myntmore" width={200} height={56} className="h-10 sm:h-14 w-auto object-contain" />
            </Link>
            <p className="text-sm leading-relaxed mb-4 max-w-xs" style={{ color: "#71675E" }}>
              B2B growth systems for companies that want predictable pipeline, not more promises.
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=WeWork%20Enam%20Sambhav%2C%20C%20-%2020%2C%20G%20Block%20Rd%2C%20G%20Block%20BKC%2C%20Bandra%20Kurla%20Complex%2C%20Bandra%20East%2C%20Mumbai%2C%20Maharashtra%20400051"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs mb-3 leading-relaxed block hover:underline transition-colors duration-200"
              style={{ color: "#71675E" }}
              aria-label="View WeWork Enam Sambhav BKC on Google Maps"
            >
              WeWork Enam Sambhav<br />
              C - 20, G Block Rd, G Block BKC,<br />
              Bandra Kurla Complex, Bandra East,<br />
              Mumbai, Maharashtra 400051
            </a>
            <a
              href="tel:+918169318951"
              className="mb-6 inline-flex min-h-[44px] items-center gap-2.5 text-sm font-semibold transition-colors duration-200"
              style={{ color: "#3D3D3D" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#0a0a0a"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#3D3D3D"; }}
              aria-label="Call Myntmore on +91 81693 18951"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(245,183,49,0.16)", color: "#A14A08" }}>
                <Phone className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden="true" />
              </span>
              +91 81693 18951
            </a>
            <div className="flex items-center gap-3">
              {[
                { href: "https://linkedin.com/company/myntmore", icon: <LinkedInIcon />, label: "Myntmore on LinkedIn" },
                { href: "https://instagram.com/myntmore", icon: <InstagramIcon />, label: "Myntmore on Instagram" },
                { href: "https://youtube.com/@TJtheLeadGenExpert", icon: <YouTubeIcon />, label: "Myntmore on YouTube" },
              ].map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-200" style={{ border: "1px solid #E8E2D9", color: "#71675E" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#A14A08"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(245,183,49,0.4)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#71675E"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "#E8E2D9"; }}
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] mb-5" style={{ color: "#3D3D3D" }}>Services</h3>
            <ul className="space-y-0 lg:space-y-3" role="list">
              {SERVICES_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="inline-flex min-h-[44px] items-center text-sm transition-colors duration-200 lg:min-h-0" style={{ color: "#71675E" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#0a0a0a"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#71675E"; }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] mb-5" style={{ color: "#3D3D3D" }}>Company</h3>
            <ul className="space-y-0 lg:space-y-3" role="list">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="inline-flex min-h-[44px] items-center text-sm transition-colors duration-200 lg:min-h-0" style={{ color: "#71675E" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#0a0a0a"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#71675E"; }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] mb-5" style={{ color: "#3D3D3D" }}>We Work With</h3>
            <ul className="space-y-0 lg:space-y-3" role="list">
              {ICP_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="inline-flex min-h-[44px] items-center text-sm transition-colors duration-200 lg:min-h-0" style={{ color: "#71675E" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#0a0a0a"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#71675E"; }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] mb-5" style={{ color: "#3D3D3D" }}>Get in Touch</h3>
            <ul className="space-y-0 lg:space-y-3 mb-6" role="list">
              <li><a href="mailto:growth@myntmore.com" className="inline-flex min-h-[44px] items-center text-sm transition-colors duration-200 lg:min-h-0" style={{ color: "#71675E" }} onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#0a0a0a"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#71675E"; }}>growth@myntmore.com</a></li>
              <li><a href="tel:+918169318951" className="inline-flex min-h-[44px] items-center text-sm transition-colors duration-200 lg:min-h-0" style={{ color: "#71675E" }} onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#0a0a0a"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#71675E"; }}>+91 81693 18951</a></li>
              <li><Link href={ctaHref} className="inline-flex min-h-[44px] items-center text-sm transition-colors duration-200 lg:min-h-0" style={{ color: "#71675E" }} onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#0a0a0a"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#71675E"; }}>Book a Free GTM Audit</Link></li>
              <li><Link href="/contact-us" className="inline-flex min-h-[44px] items-center text-sm transition-colors duration-200 lg:min-h-0" style={{ color: "#71675E" }} onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#0a0a0a"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#71675E"; }}>Contact Page</Link></li>
            </ul>
            <div className="mb-4 p-4 rounded-xl border" style={{ background: "#FEF9EC", borderColor: "rgba(245,183,49,0.3)" }}>
              <Link href="/newsletter-subscribe" className="inline-flex min-h-[44px] items-center text-xs font-semibold hover:underline lg:min-h-0 lg:mb-1" style={{ color: "#0a0a0a" }}>The Outbound Operator</Link>
              <p className="text-xs mb-3" style={{ color: "#71675E" }}>Weekly AI outbound insights. No fluff.</p>
              <NewsletterForm inputId="footer-newsletter-email" compact />
            </div>
            <Link href={ctaHref} className="btn-dark px-5 py-2.5 text-xs font-bold inline-flex items-center gap-1.5">
              Book a Call
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>

        <div className="py-4 lg:py-6 flex flex-wrap items-center gap-x-2 gap-y-0 lg:gap-y-2 border-b" style={{ borderColor: "#E8E2D9" }}>
          <span className="text-xs font-semibold uppercase tracking-wider mr-1" style={{ color: "#71675E" }}>B2B Lead Generation In:</span>
          {CITY_LINKS.map((link, i) => (
            <span key={link.href} className="flex items-center gap-x-2">
              <Link href={link.href} className="inline-flex min-h-[44px] items-center px-1 text-xs transition-colors lg:min-h-0 lg:px-0" style={{ color: "#71675E" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#0a0a0a"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#71675E"; }}
              >
                {link.label}
              </Link>
              {i < CITY_LINKS.length - 1 && <span aria-hidden="true" style={{ color: "#E8E2D9" }}>&middot;</span>}
            </span>
          ))}
        </div>

        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "#71675E" }}>&copy; 2026 Myntmore. Built in Mumbai.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-0">
            <Link href="/about-us" className="inline-flex min-h-[44px] items-center text-xs transition-colors lg:min-h-0" style={{ color: "#71675E" }} onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#0a0a0a"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#71675E"; }}>About</Link>
            <Link href="/contact-us" className="inline-flex min-h-[44px] items-center text-xs transition-colors lg:min-h-0" style={{ color: "#71675E" }} onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#0a0a0a"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#71675E"; }}>Contact</Link>
            <Link href="/careers" className="inline-flex min-h-[44px] items-center text-xs transition-colors lg:min-h-0" style={{ color: "#71675E" }} onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#0a0a0a"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#71675E"; }}>Careers</Link>
            <Link href="/privacy-policy" className="inline-flex min-h-[44px] items-center text-xs transition-colors lg:min-h-0" style={{ color: "#71675E" }} onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#0a0a0a"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#71675E"; }}>Privacy Policy</Link>
            <Link href="/editorial-policy" className="inline-flex min-h-[44px] items-center text-xs transition-colors lg:min-h-0" style={{ color: "#71675E" }} onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#0a0a0a"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#71675E"; }}>Editorial Policy</Link>
            <Link href="/sitemap" className="inline-flex min-h-[44px] items-center text-xs transition-colors lg:min-h-0" style={{ color: "#71675E" }} onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#0a0a0a"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#71675E"; }}>Site Map</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
