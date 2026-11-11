"use client";

import { useState } from "react";
import { LeadSourceField } from "./LeadSource";

interface LeadCaptureFormProps {
  title?: string;
  subtitle?: string;
}

const inputClass = "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200";
const inputStyle = { backgroundColor: "#F8F6F2", border: "1px solid #E8E2D9", color: "#0a0a0a" };
const focusHandlers = {
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = "rgba(245,183,49,0.6)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(245,183,49,0.08)"; },
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = "#E8E2D9"; e.currentTarget.style.boxShadow = "none"; },
};

export default function LeadCaptureForm({
  title = "Let's build your AI engine",
  subtitle = "Fill out the form below and our team will get back to you within 24 hours with a custom GTM strategy.",
}: LeadCaptureFormProps) {
  const [submitting, setSubmitting] = useState(false);

  return (
    <section className="py-20 px-4" style={{ backgroundColor: "#F8F6F2" }}>
      <div className="max-w-2xl mx-auto">
        <div className="rounded-2xl border p-8 sm:p-12" style={{ backgroundColor: "#ffffff", borderColor: "#E8E2D9", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: "#0a0a0a" }}>{title}</h2>
            <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{subtitle}</p>
          </div>

          <form
            action="https://forms.zohopublic.com/flintstop/form/MyntmoreWebsiteform/formperma/3F8IpEgLtb2RnoXcr_yUsp56_-WdQdO2-sM6eaCOKi0/htmlRecords/submit"
            name="form"
            id="form"
            method="POST"
            acceptCharset="UTF-8"
            encType="multipart/form-data"
            className="space-y-4"
            onSubmit={() => setSubmitting(true)}
          >
            <LeadSourceField />
            <input type="hidden" name="zf_redirect_url" value="https://www.myntmore.com/thank-you" />
            <input type="hidden" name="zc_gad" value="" />

            <div>
              <label htmlFor="SingleLine" className="block text-xs font-semibold mb-1.5" style={{ color: "#3D3D3D" }}>Full Name <span style={{ color: "#A14A08" }}>*</span></label>
              <input id="SingleLine" name="SingleLine" type="text" required maxLength={255}
                className={inputClass} style={inputStyle} {...focusHandlers} placeholder="David Kim" />
            </div>

            <div>
              <label htmlFor="SingleLine2" className="block text-xs font-semibold mb-1.5" style={{ color: "#3D3D3D" }}>Designation <span style={{ color: "#A14A08" }}>*</span></label>
              <input id="SingleLine2" name="SingleLine2" type="text" required maxLength={255}
                className={inputClass} style={inputStyle} {...focusHandlers} placeholder="Founder / Head of Sales" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="SingleLine3" className="block text-xs font-semibold mb-1.5" style={{ color: "#3D3D3D" }}>Company</label>
                <input id="SingleLine3" name="SingleLine3" type="text" maxLength={255}
                  className={inputClass} style={inputStyle} {...focusHandlers} placeholder="Kim Ventures" />
              </div>
              <div>
                <label htmlFor="PhoneNumber_countrycode" className="block text-xs font-semibold mb-1.5" style={{ color: "#3D3D3D" }}>Phone</label>
                <input id="PhoneNumber_countrycode" name="PhoneNumber_countrycode" type="tel" maxLength={20}
                  className={inputClass} style={inputStyle} {...focusHandlers} placeholder="+1 212 555 0147" />
              </div>
            </div>

            <div>
              <label htmlFor="Email" className="block text-xs font-semibold mb-1.5" style={{ color: "#3D3D3D" }}>Email <span style={{ color: "#A14A08" }}>*</span></label>
              <input id="Email" name="Email" type="email" required maxLength={255}
                className={inputClass} style={inputStyle} {...focusHandlers} placeholder="david@kimventures.com" />
            </div>

            <button type="submit" disabled={submitting} className="btn-dark w-full py-4 text-sm font-bold disabled:opacity-60 disabled:cursor-not-allowed">
              {submitting ? "Submitting…" : "Get Your Custom Strategy"}
            </button>
            <p className="text-center text-xs" style={{ color: "#71675E" }}>No commitments. No agency pitch decks. Just a real conversation about your pipeline.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
