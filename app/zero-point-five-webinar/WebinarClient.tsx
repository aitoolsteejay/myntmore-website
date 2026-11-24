"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Calendar, Clock, Video, CheckCircle2, Sparkles, Users } from "lucide-react";
import InnerLayout from "../components/InnerLayout";

// Zoho Forms endpoint. The input `name` attributes below must match Zoho's field names exactly,
// otherwise the submitted record comes through with empty values.
const ZOHO_ACTION =
  "https://forms.zohopublic.com/flintstop/form/ZeroPointFiveWebinar28thNovember2026/formperma/r456R8DogVFkZhFyaXUSjqUFBrdIeSLA4kZnqj6Is-U/htmlRecords/submit";

const ROLES = ["New Startup", "Traditional Business", "Service Provider"];
const INDUSTRIES = [
  "D2C/Consumer Brand",
  "Food & Beverage/Cafe",
  "Fashion & Apparel",
  "Retail & Trading",
  "Manufacturing",
  "IT/Software/SaaS",
  "Fintech & Finance",
  "Healthcare & Wellness",
  "Education",
  "Real Estate & Construction",
  "Marketing/Agency/Creative",
  "Professional Services (CA, Legal, Consulting)",
  "Logistics",
  "Agriculture",
];
const SIZES = ["0-10", "11-50", "51-100", "101-200", "201-500", "500+"];
const CHANNELS = ["Cold Emailing", "Cold Calling", "LinkedIn Outreach"];

const TAKEAWAYS = [
  "The right outbound channels for your stage",
  "A LinkedIn profile that sells",
  "Messages that actually get replies",
  "What the LinkedIn and cold email funnel looks like",
];

const inputCls =
  "w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#0A0A0A] placeholder:text-[#9A9189] focus:outline-none focus:ring-2 focus:ring-[#F5B731]/50 focus:border-[#F5B731]";
const borderStyle = { borderColor: "#D9D2C7", color: "#0A0A0A" };

function Field({ label, htmlFor, error, children }: { label: string; htmlFor?: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-semibold mb-1.5" style={{ color: "#0A0A0A" }}>
        {label} <span style={{ color: "#C2410C" }}>*</span>
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-xs font-medium" style={{ color: "#B91C1C" }}>
          {error}
        </p>
      )}
    </div>
  );
}

function RadioGroup({ name, options, label }: { name: string; options: string[]; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-3">
      {options.map((o) => (
        <label
          key={o}
          className="inline-flex items-center gap-2 rounded-xl border bg-white px-4 py-2.5 text-sm font-medium cursor-pointer has-[:checked]:border-[#F5B731] has-[:checked]:bg-[#FEF9EC]"
          style={{ ...borderStyle, color: "#0A0A0A" }}
        >
          <input type="radio" name={name} value={o} className="accent-[#D97706]" />
          <span style={{ color: "#0A0A0A" }}>{o}</span>
        </label>
      ))}
    </div>
  );
}

export default function WebinarClient({ registered }: { registered: boolean }) {
  const formRef = useRef<HTMLFormElement>(null);
  const redirectRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // After Zoho saves the record it redirects back here with ?registered=1 (shows the confirmation).
  useEffect(() => {
    if (redirectRef.current) {
      redirectRef.current.value = `${window.location.origin}/zero-point-five-webinar?registered=1`;
    }
  }, []);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    const next: Record<string, string> = {};
    const req = "This field is required.";

    if (!fd.get("Radio")) next.Radio = req;
    if (!fd.get("Radio1")) next.Radio1 = req;
    if (!get("Name_First") || !get("Name_Last")) next.Name = "Enter your first and last name.";
    if (!get("PhoneNumber_countrycode")) next.Phone = req;
    if (!get("Email")) next.Email = req;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get("Email"))) next.Email = "Enter a valid email address.";
    if (!get("Website")) next.Website = req;
    else if (!/linkedin\.com\//i.test(get("Website"))) next.Website = "Enter your LinkedIn profile URL (linkedin.com/in/...).";
    if (!get("SingleLine")) next.SingleLine = req;
    if (!get("SingleLine1")) next.SingleLine1 = req;
    for (const k of ["Dropdown", "Dropdown1", "Dropdown3", "Dropdown2"]) if (get(k) === "-Select-") next[k] = req;
    if (!fd.get("Radio2")) next.Radio2 = req;
    if (!get("SingleLine2")) next.SingleLine2 = req;

    setErrors(next);
    if (Object.keys(next).length > 0) {
      e.preventDefault();
      const first = formRef.current?.querySelector<HTMLElement>('[role="alert"]');
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSubmitting(true);
  }

  return (
    <InnerLayout>
      <div className="relative overflow-hidden" style={{ backgroundColor: "#F8F6F2" }}>
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #F5B731, transparent 70%)" }}
          aria-hidden="true"
        />

        <section className="pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
          {registered ? (
            <div className="max-w-xl mx-auto text-center py-16">
              <div
                className="mx-auto mb-8 flex items-center justify-center"
                style={{ width: 88, height: 88, borderRadius: 9999, backgroundColor: "rgba(34,197,94,0.12)", border: "2px solid rgba(34,197,94,0.35)" }}
              >
                <CheckCircle2 className="w-10 h-10" style={{ color: "#16A34A" }} />
              </div>
              <h1 className="text-4xl sm:text-5xl font-black mb-5 leading-tight" style={{ color: "#0A0A0A" }}>
                You&apos;re registered.
              </h1>
              <p className="text-lg mb-2" style={{ color: "#52525B" }}>
                Thanks for signing up for the LinkedIn Sales Outreach masterclass.
              </p>
              <p className="text-base" style={{ color: "#52525B" }}>
                Saturday, 28 November 2026 · 12:00 to 1:00 PM IST. We&apos;ll email the online link to your registered address closer to the date.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left: event details */}
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <div
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border"
                  style={{ backgroundColor: "#FEF9EC", color: "#A14A08", borderColor: "rgba(245,183,49,0.35)" }}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#F5B731]" />
                  <span>Zero Point Five Community · Masterclass</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4" style={{ color: "#0A0A0A" }}>
                  LinkedIn Sales Outreach,{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10">live.</span>
                    <span className="absolute left-0 bottom-1 w-full h-3 rounded-sm -z-0 opacity-40" style={{ backgroundColor: "#F5B731" }} aria-hidden="true" />
                  </span>
                </h1>

                <p className="text-base sm:text-lg leading-relaxed mb-6" style={{ color: "#52525B" }}>
                  A hands-on approach to booking over 200 meetings a month and expanding your GTM capabilities, with Tejas Jhaveri, Founder, Myntmore.
                </p>

                <div className="rounded-2xl border bg-white/95 p-6 shadow-sm mb-6" style={{ borderColor: "#E8E2D9" }}>
                  <div className="flex items-center gap-4 mb-5 pb-5 border-b" style={{ borderColor: "#F1EBE1" }}>
                    <div className="relative w-14 h-14 rounded-full border-2 border-white shadow-md overflow-hidden bg-amber-50 shrink-0">
                      <Image src="/tejas.png" alt="Tejas Jhaveri, Founder of Myntmore" fill sizes="56px" className="object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold" style={{ color: "#0A0A0A" }}>Tejas Jhaveri</p>
                      <p className="text-xs" style={{ color: "#71675E" }}>Founder, Myntmore</p>
                    </div>
                  </div>
                  <ul className="space-y-3 text-sm" style={{ color: "#3D3D3D" }}>
                    <li className="flex items-center gap-3"><Calendar className="w-4 h-4 text-[#D97706] shrink-0" /> Saturday, 28 November 2026</li>
                    <li className="flex items-center gap-3"><Clock className="w-4 h-4 text-[#D97706] shrink-0" /> 12:00 to 1:00 PM IST</li>
                    <li className="flex items-center gap-3"><Video className="w-4 h-4 text-[#D97706] shrink-0" /> Online, link shared with registered participants</li>
                    <li className="flex items-center gap-3"><Users className="w-4 h-4 text-[#D97706] shrink-0" /> Free for Zero Point Five Community members</li>
                  </ul>
                </div>

                <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#A14A08" }}>What you&apos;ll learn</p>
                <ul className="space-y-2.5">
                  {TAKEAWAYS.map((t) => (
                    <li key={t} className="flex items-start gap-2.5 text-sm" style={{ color: "#3D3D3D" }}>
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#16A34A" }} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: registration form */}
              <div className="lg:col-span-7">
                <form
                  ref={formRef}
                  action={ZOHO_ACTION}
                  name="form"
                  id="form"
                  method="POST"
                  acceptCharset="UTF-8"
                  encType="multipart/form-data"
                  onSubmit={onSubmit}
                  noValidate
                  className="rounded-2xl border bg-white p-6 sm:p-8 shadow-sm space-y-6"
                  style={{ borderColor: "#E8E2D9" }}
                >
                  <input type="hidden" name="zf_referrer_name" value="" />
                  <input type="hidden" name="zf_redirect_url" defaultValue="" ref={redirectRef} />
                  <input type="hidden" name="zc_gad" value="" />

                  <div>
                    <h2 className="text-xl font-black" style={{ color: "#0A0A0A" }}>Reserve your spot</h2>
                    <p className="text-sm mt-1" style={{ color: "#71675E" }}>All fields are required.</p>
                  </div>

                  <Field label="Will you join the masterclass?" error={errors.Radio}>
                    <RadioGroup name="Radio" options={["Yes", "No"]} label="Will you join the masterclass?" />
                  </Field>

                  <Field label="Are you already part of Zero Point Five Community?" error={errors.Radio1}>
                    <RadioGroup name="Radio1" options={["Yes", "No"]} label="Already part of Zero Point Five Community?" />
                  </Field>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="First name" htmlFor="Name_First" error={errors.Name}>
                      <input id="Name_First" type="text" name="Name_First" maxLength={255} autoComplete="given-name" className={inputCls} style={borderStyle} />
                    </Field>
                    <Field label="Last name" htmlFor="Name_Last">
                      <input id="Name_Last" type="text" name="Name_Last" maxLength={255} autoComplete="family-name" className={inputCls} style={borderStyle} />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Phone" htmlFor="PhoneNumber_countrycode" error={errors.Phone}>
                      <input id="PhoneNumber_countrycode" type="tel" name="PhoneNumber_countrycode" maxLength={20} autoComplete="tel" placeholder="+91 98765 43210" className={inputCls} style={borderStyle} />
                    </Field>
                    <Field label="Work email" htmlFor="Email" error={errors.Email}>
                      <input id="Email" type="email" name="Email" maxLength={255} autoComplete="email" className={inputCls} style={borderStyle} />
                    </Field>
                  </div>

                  <Field label="Your LinkedIn profile URL" htmlFor="Website" error={errors.Website}>
                    <input id="Website" type="url" name="Website" maxLength={2083} placeholder="https://www.linkedin.com/in/your-name" className={inputCls} style={borderStyle} />
                  </Field>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Company name" htmlFor="SingleLine" error={errors.SingleLine}>
                      <input id="SingleLine" type="text" name="SingleLine" maxLength={255} autoComplete="organization" className={inputCls} style={borderStyle} />
                    </Field>
                    <Field label="Your designation" htmlFor="SingleLine1" error={errors.SingleLine1}>
                      <input id="SingleLine1" type="text" name="SingleLine1" maxLength={255} autoComplete="organization-title" className={inputCls} style={borderStyle} />
                    </Field>
                  </div>

                  <Field label="Which best describes you?" htmlFor="Dropdown" error={errors.Dropdown}>
                    <select id="Dropdown" name="Dropdown" defaultValue="-Select-" className={inputCls} style={borderStyle}>
                      <option value="-Select-">Select</option>
                      {ROLES.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </Field>

                  <Field label="Industry" htmlFor="Dropdown1" error={errors.Dropdown1}>
                    <select id="Dropdown1" name="Dropdown1" defaultValue="-Select-" className={inputCls} style={borderStyle}>
                      <option value="-Select-">Select</option>
                      {INDUSTRIES.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </Field>

                  <Field label="How many employees does your company have?" htmlFor="Dropdown3" error={errors.Dropdown3}>
                    <select id="Dropdown3" name="Dropdown3" defaultValue="-Select-" className={inputCls} style={borderStyle}>
                      <option value="-Select-">Select</option>
                      {SIZES.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </Field>

                  <Field label="Have you done outbound outreach before?" error={errors.Radio2}>
                    <RadioGroup name="Radio2" options={["Yes", "No"]} label="Done outbound outreach before?" />
                  </Field>

                  <Field label="If yes, which channels have you used?" htmlFor="Dropdown2" error={errors.Dropdown2}>
                    <select id="Dropdown2" name="Dropdown2" defaultValue="-Select-" className={inputCls} style={borderStyle}>
                      <option value="-Select-">Select</option>
                      {CHANNELS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <p className="mt-1.5 text-xs" style={{ color: "#71675E" }}>If you answered No, pick the channel you are most curious about.</p>
                  </Field>

                  <Field label="What's one thing you'd like answered in this session?" htmlFor="SingleLine2" error={errors.SingleLine2}>
                    <input id="SingleLine2" type="text" name="SingleLine2" maxLength={255} className={inputCls} style={borderStyle} />
                  </Field>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-dark w-full px-8 py-4 text-base font-bold inline-flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {submitting ? "Submitting..." : "Register for the masterclass"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </section>
      </div>
    </InnerLayout>
  );
}
