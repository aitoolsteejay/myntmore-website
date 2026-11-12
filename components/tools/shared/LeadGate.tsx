"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { LeadSourceField } from "@/app/components/LeadSource";

export interface LeadData {
  id?: string;
  name: string;
  companyName: string;
  designation: string;
  email: string;
  phone: string;
  linkedinUrl: string;
}

interface FormState {
  firstName: string;
  lastName: string;
  designation: string;
  companyName: string;
  phone: string;
  linkedinUrl: string;
  email: string;
}

const leadSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(255),
  lastName: z.string().trim().min(1, "Last name is required").max(255),
  designation: z.string().trim().min(1, "Designation is required").max(255),
  companyName: z.string().trim().max(255).optional(),
  phone: z.string().trim().max(20).optional(),
  linkedinUrl: z.string().trim().max(2083).optional(),
  email: z.string().trim().min(1, "Email is required").email("Please enter a valid email").max(255),
});

export type LeadSource = "profile_optimizer" | "posting_rhythm_builder" | "lead_magnet_ideas" | "dm_angle_generator" | "founder_presence_analyzer" | "case_study_generator" | "battle_card_generator" | "icp_builder" | "roi_calculator" | "hook_grader" | "prospect_research";

// Every tool except the ROI calculator sends what the visitor types to Google's
// Gemini API (through our /api routes) to generate the result. Keep this list in
// step with the tools that call /api/gemini or /api/tools/*.
const AI_SOURCES: LeadSource[] = [
  "profile_optimizer",
  "posting_rhythm_builder",
  "lead_magnet_ideas",
  "dm_angle_generator",
  "founder_presence_analyzer",
  "case_study_generator",
  "battle_card_generator",
  "icp_builder",
  "hook_grader",
  "prospect_research",
];

interface LeadGateProps {
  onComplete: (data: LeadData) => void;
  source: LeadSource;
  heading?: React.ReactNode;
  description?: string;
}

const SHARED_ZOHO_FORM_ACTION =
  "https://forms.zohopublic.com/flintstop/form/Myntmoreleadmagnetform/formperma/z-AuIY9K-mm72IUDW3h9bnsB3ye_AQgaIjI4xrdii1o/htmlRecords/submit";

// Each tool posts to its own Zoho form when one exists; otherwise it falls
// back to the shared lead-magnet form. Field names (SingleLine, SingleLine1,
// etc.) are consistent across these forms, so no other changes are needed
// when adding a dedicated form for a tool.
const ZOHO_FORM_ACTIONS: Record<LeadSource, string> = {
  profile_optimizer: SHARED_ZOHO_FORM_ACTION,
  posting_rhythm_builder:
    "https://forms.zohopublic.com/flintstop/form/PostingRhythm/formperma/btpD3CWLnvNwmuKABmv1eiFifirOxmMSKkD2gzzoxns/htmlRecords/submit",
  lead_magnet_ideas:
    "https://forms.zohopublic.com/flintstop/form/LeadMagnetIdeas/formperma/rGceryxx4yNK3wd1J8TlvghlR5WKKFAc8qkBec_-CZo/htmlRecords/submit",
  dm_angle_generator:
    "https://forms.zohopublic.com/flintstop/form/DMAngleGenerator/formperma/62jROMu8G-5OfsQqYL4Bfn4tL1ArsSVjbBXAJwbI4N8/htmlRecords/submit",
  founder_presence_analyzer:
    "https://forms.zohopublic.com/flintstop/form/FounderPresence/formperma/JnJcgXg8AbGtNsscKQtYvGFJs8d1HB94fIKK8xsnvAc/htmlRecords/submit",
  case_study_generator:
    "https://forms.zohopublic.com/flintstop/form/CaseStudyGenerator/formperma/kGi_6je9VtNTQT585wuklYngFEcYQnDWrOLxD4Ja1VQ/htmlRecords/submit",
  battle_card_generator:
    "https://forms.zohopublic.com/flintstop/form/Battlecardgenerator/formperma/L6FLsnJj7kt0kDqoENc2F2Drbuo22v376RxReGr9t58/htmlRecords/submit",
  icp_builder:
    "https://forms.zohopublic.com/flintstop/form/ICPbuilder/formperma/an5nBPpkO1WIJo1cdInDWDmGb__ufD3Qdhqh1OrjlZg/htmlRecords/submit",
  hook_grader: SHARED_ZOHO_FORM_ACTION,
  // TODO before launch: the Prospect Research tool's own Zoho form. Until then (empty) the lead is
  // saved to Supabase only and nothing is posted to Zoho.
  prospect_research: "",
  roi_calculator:
    "https://forms.zohopublic.com/flintstop/form/ROICalculator/formperma/qjOewrgpxVp_WRKEGfJpQLvGELpRzoPr9ILtpbTvWiQ/htmlRecords/submit",
};
const ZOHO_IFRAME_NAME = "zoho-lead-magnet-iframe";

const DEFAULT_HEADING = (
  <>
    Myntmore <span className="text-[#A14A08]">LinkedIn</span> Profile Optimizer
  </>
);
const DEFAULT_DESCRIPTION = "Audit your LinkedIn profile and get specific improvements to make it work harder for you.";

const LeadGate = ({ onComplete, source, heading = DEFAULT_HEADING, description = DEFAULT_DESCRIPTION }: LeadGateProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormState>({
    firstName: "",
    lastName: "",
    designation: "",
    companyName: "",
    phone: "",
    linkedinUrl: "",
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = leadSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Submit the real Zoho form in the background (hidden iframe target) so the
    // lead lands in Zoho CRM without leaving this page.
    if (ZOHO_FORM_ACTIONS[source]) formRef.current?.submit();

    const d = result.data;

    // Also log to our own Supabase leads table as a secondary record. The
    // returned row id lets the tool attach its inputs/outputs to this same
    // row once it has something to show.
    // The Supabase client (~200 kB) is loaded here, on submit, rather than with the page;
    // the 600 ms pause below hides the download. A failed chunk load is reported like any
    // other failed insert instead of leaving the form stuck on "Saving".
    const [{ data: insertedLead, error }] = await Promise.all([
      import("@/lib/supabase")
        .then(({ supabase }) =>
          supabase
            .from("leads")
            .insert([
              {
                source,
                name: `${d.firstName} ${d.lastName}`.trim(),
                email: d.email || null,
                phone: d.phone || null,
                company_name: d.companyName || null,
                linkedin_url: d.linkedinUrl || null,
                metadata: { designation: d.designation },
              },
            ])
            .select()
            .single(),
        )
        .catch((err: unknown) => ({ data: null, error: err })),
      new Promise((resolve) => setTimeout(resolve, 600)),
    ]);

    if (error) console.error("Supabase lead insert failed:", error);

    setIsSubmitting(false);
    onComplete({
      id: insertedLead?.id,
      name: `${d.firstName} ${d.lastName}`.trim(),
      companyName: d.companyName || "",
      designation: d.designation,
      email: d.email || "",
      phone: d.phone || "",
      linkedinUrl: d.linkedinUrl || "",
    });
  };

  const updateField = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in px-4 py-12">
      <div className="text-center mb-8 max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-black mb-4 leading-tight">{heading}</h2>
        <p className="text-muted-foreground text-sm md:text-lg max-w-lg mx-auto">{description}</p>
      </div>

      <div className="card-elevated p-8 glow-accent max-w-md mx-auto">
        <iframe name={ZOHO_IFRAME_NAME} title="zoho-lead-magnet" style={{ display: "none" }} />
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          action={ZOHO_FORM_ACTIONS[source] || undefined}
          method="POST"
          acceptCharset="UTF-8"
          encType="multipart/form-data"
          target={ZOHO_IFRAME_NAME}
          className="space-y-5"
        >
          <LeadSourceField />
          <input type="hidden" name="zf_redirect_url" value="" />
          <input type="hidden" name="zc_gad" value="" />

          <div className="space-y-1.5">
            <label htmlFor="firstName" className="block text-sm font-medium text-foreground">
              First Name <span className="text-[#A14A08]">*</span>
            </label>
            <Input
              id="firstName"
              name="SingleLine"
              type="text"
              maxLength={255}
              placeholder="Sarah"
              value={formData.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
              className={errors.firstName ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}
              disabled={isSubmitting}
            />
            {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="lastName" className="block text-sm font-medium text-foreground">
              Last Name <span className="text-[#A14A08]">*</span>
            </label>
            <Input
              id="lastName"
              name="SingleLine1"
              type="text"
              maxLength={255}
              placeholder="Chen"
              value={formData.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              className={errors.lastName ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}
              disabled={isSubmitting}
            />
            {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="designation" className="block text-sm font-medium text-foreground">
              Designation <span className="text-[#A14A08]">*</span>
            </label>
            <Input
              id="designation"
              name="SingleLine2"
              type="text"
              maxLength={255}
              placeholder="Head of Sales"
              value={formData.designation}
              onChange={(e) => updateField("designation", e.target.value)}
              className={errors.designation ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}
              disabled={isSubmitting}
            />
            {errors.designation && <p className="text-xs text-destructive">{errors.designation}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="companyName" className="block text-sm font-medium text-foreground">
              Company
            </label>
            <Input
              id="companyName"
              name="SingleLine3"
              type="text"
              maxLength={255}
              placeholder="Brightloop"
              value={formData.companyName}
              onChange={(e) => updateField("companyName", e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="phone" className="block text-sm font-medium text-foreground">
              Phone
            </label>
            <Input
              id="phone"
              name="PhoneNumber_countrycode"
              type="text"
              maxLength={20}
              placeholder="+1 415 555 0182"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="linkedinUrl" className="block text-sm font-medium text-foreground">
              LinkedIn URL
            </label>
            <Input
              id="linkedinUrl"
              name="Website"
              type="text"
              maxLength={2083}
              placeholder="https://linkedin.com/in/sarahchen"
              value={formData.linkedinUrl}
              onChange={(e) => updateField("linkedinUrl", e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-medium text-foreground">
              Email <span className="text-[#A14A08]">*</span>
            </label>
            <Input
              id="email"
              name="Email"
              type="email"
              maxLength={255}
              placeholder="sarah@brightloop.com"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={errors.email ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}
              disabled={isSubmitting}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>

          <Button type="submit" variant="hero" className="w-full mt-6 rounded-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Saving…
              </>
            ) : (
              "Get Started →"
            )}
          </Button>

          {/* Data use, stated plainly: what the code below actually does with the form
              and with whatever the visitor later types into the tool. */}
          <p className="text-xs leading-relaxed text-muted-foreground" data-testid="tool-data-notice">
            <strong className="font-semibold text-foreground">How your details are used.</strong> Your contact details are saved in
            Myntmore&apos;s CRM (Zoho) and our database, and what you enter into this tool is saved with that record.
            {AI_SOURCES.includes(source) && (
              <>
                {" "}
                This tool sends what you enter to Google&apos;s Gemini API to generate your result, so please don&apos;t enter confidential
                information or personal details about other people.
              </>
            )}{" "}
            See our{" "}
            <Link href="/privacy-policy" className="underline underline-offset-2">
              privacy policy
            </Link>
            .
          </p>
        </form>
      </div>
    </div>
  );
};

export default LeadGate;
