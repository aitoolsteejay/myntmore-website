import Link from "next/link";
import InnerLayout from "@/app/components/InnerLayout";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import JsonLd from "@/app/components/JsonLd";
import { textTone } from "@/lib/colors";

export interface CareerRoleData {
  slug: string;
  title: string;
  tag: string;
  accent: string;
  badge: string;
  cardDesc: string;
  cardBullets: string[];
  applySubject: string;
  grid: { label: string; value: string }[];
  schemaDescription: string;
  employmentType: string;
  salaryMin: number;
  salaryMax: number;
  salaryUnit: string;
  datePosted: string;
  validThrough: string;
  aboutIntro: string;
  aboutNoteText?: string;
  aboutNoteHref?: string;
  aboutCalloutTitle?: string;
  aboutCalloutText?: string;
  primaryGoal?: string;
  responsibilitiesTitle: string;
  responsibilities: { title: string; desc: string }[];
  whoYouAreTitle: string;
  whoYouAreIntro?: string;
  whoYouAre: { label: string; desc: string }[];
  skills?: string[];
  whatYoullLearn?: string[];
  whyJoin: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
}

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("WeWork Enam Sambhav, C - 20, G Block Rd, G Block BKC, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051")}`;

export default function JobPostingPage({ data, schema }: { data: CareerRoleData; schema: Record<string, unknown> }) {
  const accent = data.accent || "#3b82f6";
  const applySubject = data.applySubject || `Application for ${data.title}`;
  const mailtoUrl = `mailto:founder@myntmore.com,growth@myntmore.com?subject=${encodeURIComponent(applySubject)}`;

  return (
    <InnerLayout>
      <JsonLd data={schema} />
      <section className="pt-32 pb-16 px-4" style={{ backgroundColor: "#F8F6F2" }}>
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs
            items={[
              { label: "Careers", href: "/careers" },
              { label: data.title, href: `/careers/${data.slug}` },
            ]}
          />
          <span
            className="inline-flex text-xs font-bold px-3 py-1 rounded-full mb-4"
            style={{
              backgroundColor: `${accent}14`,
              color: textTone(accent),
              border: `1px solid ${accent}33`,
            }}
          >
            {data.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mb-6 leading-tight" style={{ color: "#0a0a0a" }}>
            {data.title}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {data.grid.map((item) => (
              <div key={item.label} className="rounded-xl border p-4" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9" }}>
                <p className="text-xs mb-1" style={{ color: "#71675E" }}>{item.label}</p>
                {item.label === "Location" ? (
                  <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-bold hover:underline" style={{ color: "#0a0a0a" }}>
                    {item.value} <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <p className="text-sm font-bold" style={{ color: "#0a0a0a" }}>{item.value}</p>
                )}
              </div>
            ))}
          </div>

          <a href={mailtoUrl} className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center gap-2">
            Apply Now
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <p className="mt-3 text-xs" style={{ color: "#71675E" }}>
            Send to founder@myntmore.com and growth@myntmore.com with subject: {applySubject}
          </p>
        </div>
      </section>

      <section className="py-16 px-4 border-t" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-3xl mx-auto space-y-12">
          {/* About the role */}
          <div>
            <h2 className="text-2xl font-black mb-4" style={{ color: "#0a0a0a" }}>About the role</h2>
            {data.aboutNoteText && data.aboutNoteHref && (
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#52525B" }}>
                <Link href={data.aboutNoteHref} className="underline">{data.aboutNoteText}</Link>
              </p>
            )}
            {data.aboutIntro.split("\n\n").map((para, i) => (
              <p key={i} className="text-base leading-relaxed mb-4" style={{ color: "#52525B" }}>
                {para}
              </p>
            ))}
            {data.aboutCalloutTitle && data.aboutCalloutText && (
              <div className="rounded-xl p-6 mt-4" style={{ backgroundColor: "#FEF9EC", border: "1px solid rgba(245,183,49,0.3)" }}>
                <p className="text-sm font-bold mb-2" style={{ color: "#0a0a0a" }}>{data.aboutCalloutTitle}</p>
                {data.aboutCalloutText.split("\n").map((line, i) => (
                  <p key={i} className="text-sm leading-relaxed mb-1" style={{ color: "#52525B" }}>
                    {line}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Primary goal */}
          {data.primaryGoal && (
            <div>
              <h2 className="text-2xl font-black mb-2" style={{ color: "#0a0a0a" }}>Primary goal</h2>
              <p className="text-base leading-relaxed" style={{ color: "#52525B" }}>
                {data.primaryGoal}
              </p>
            </div>
          )}

          {/* Responsibilities */}
          {data.responsibilities.length > 0 && (
            <div>
              <h2 className="text-2xl font-black mb-6" style={{ color: "#0a0a0a" }}>{data.responsibilitiesTitle}</h2>
              <div className="space-y-4">
                {data.responsibilities.map((item) => (
                  <div key={item.title} className="rounded-xl border p-5" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                    <h3 className="text-sm font-black mb-2" style={{ color: textTone(accent) }}>{item.title}</h3>
                    {item.desc.includes("\n") ? (
                      <ul className="space-y-1.5 list-disc pl-5 text-sm leading-relaxed" style={{ color: "#52525B" }}>
                        {item.desc.split("\n").filter(Boolean).map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{item.desc}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Who you are */}
          {data.whoYouAre.length > 0 && (
            <div>
              <h2 className="text-2xl font-black mb-6" style={{ color: "#0a0a0a" }}>{data.whoYouAreTitle}</h2>
              {data.whoYouAreIntro && (
                <p className="text-base leading-relaxed mb-4" style={{ color: "#52525B" }}>
                  {data.whoYouAreIntro}
                </p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.whoYouAre.map((item) => (
                  <div key={item.label} className="rounded-xl border p-4" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                    <p className="text-xs font-black mb-1" style={{ color: textTone(accent) }}>{item.label}</p>
                    {item.desc.includes("\n") ? (
                      <ul className="space-y-1 list-disc pl-4 text-sm" style={{ color: "#52525B" }}>
                        {item.desc.split("\n").filter(Boolean).map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm" style={{ color: "#52525B" }}>{item.desc}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills & mindset we value */}
          {data.skills && data.skills.length > 0 && (
            <div>
              <h2 className="text-2xl font-black mb-6" style={{ color: "#0a0a0a" }}>Skills & mindset we value</h2>
              {data.skills.map((item) => (
                <div key={item} className="flex items-center gap-3 mb-3">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke={accent} strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-base" style={{ color: "#3D3D3D" }}>{item}</p>
                </div>
              ))}
            </div>
          )}

          {/* What you'll learn */}
          {data.whatYoullLearn && data.whatYoullLearn.length > 0 && (
            <div>
              <h2 className="text-2xl font-black mb-6" style={{ color: "#0a0a0a" }}>What you'll learn</h2>
              {data.whatYoullLearn.map((item) => (
                <div key={item} className="flex items-center gap-3 mb-3">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke={accent} strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-base" style={{ color: "#3D3D3D" }}>{item}</p>
                </div>
              ))}
            </div>
          )}

          {/* Why join Myntmore */}
          {data.whyJoin && (
            <div>
              <h2 className="text-2xl font-black mb-4" style={{ color: "#0a0a0a" }}>Why join Myntmore</h2>
              <p className="text-base leading-relaxed" style={{ color: "#52525B" }}>
                {data.whyJoin}
              </p>
            </div>
          )}

          {/* Our values */}
          <div>
            <h2 className="text-2xl font-black mb-6" style={{ color: "#0a0a0a" }}>Our values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: "⚡", title: "Ship fast", desc: "We move in days, not quarters. If it can be tested, it gets tested this week." },
                { icon: "🎯", title: "Outcome over hours", desc: "We don't track time. We track results. Own your output, own your schedule." },
                { icon: "✨", title: "AI-native by default", desc: "Every workflow starts with: how do we use AI here? Not as a buzzword, as leverage." },
                { icon: "📖", title: "Learn out loud", desc: "Share what's working. Share what failed. The whole team gets smarter together." },
              ].map((v) => (
                <div key={v.title} className="rounded-xl border p-4" style={{ backgroundColor: "#F8F6F2", borderColor: "#E8E2D9" }}>
                  <div className="text-xl mb-2">{v.icon}</div>
                  <p className="text-sm font-black mb-1" style={{ color: "#0a0a0a" }}>{v.title}</p>
                  <p className="text-sm" style={{ color: "#52525B" }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Ready to apply? */}
          <div className="rounded-2xl p-8 border" style={{ backgroundColor: "#FEF9EC", borderColor: "rgba(245,183,49,0.3)" }}>
            <h3 className="text-lg font-black mb-4" style={{ color: "#0a0a0a" }}>Ready to apply?</h3>
            <div className="space-y-2 mb-6">
              <a href={`mailto:founder@myntmore.com?subject=${encodeURIComponent(applySubject)}`} className="flex min-h-[44px] items-center text-sm font-semibold" style={{ color: "#A14A08" }}>
                founder@myntmore.com
              </a>
              <a href={`mailto:growth@myntmore.com?subject=${encodeURIComponent(applySubject)}`} className="flex min-h-[44px] items-center text-sm font-semibold" style={{ color: "#A14A08" }}>
                growth@myntmore.com
              </a>
            </div>
            <a href={mailtoUrl} className="btn-dark px-6 py-3 text-sm font-bold inline-flex items-center gap-2">
              Apply Now
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </InnerLayout>
  );
}
