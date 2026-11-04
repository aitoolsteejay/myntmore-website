import { fields } from "@keystatic/core";

export const doItYourselfCopySchema = {
  schema: fields.object(
    {
      name: fields.text({ label: "Service name (structured data)" }),
      description: fields.text({ label: "Service description (structured data)", multiline: true }),
      serviceType: fields.text({ label: "Service type (structured data)" }),
    },
    { label: "Structured data (search engines)" }
  ),
  hero: fields.object(
    {
      badge: fields.text({ label: "Badge text" }),
      headlineLead: fields.text({ label: "Headline, first part" }),
      headlineHighlight: fields.text({ label: "Headline, highlighted part (purple, underlined)" }),
      intro: fields.text({ label: "Intro paragraph", multiline: true }),
      primaryCtaLabel: fields.text({ label: "Primary button label (links to the booking page)" }),
      secondaryCtaLabel: fields.text({ label: "Secondary button label" }),
      secondaryCtaHref: fields.text({ label: "Secondary button link" }),
      annotations: fields.object(
        {
          right: fields.object(
            {
              line1: fields.text({ label: "Line 1 (large)" }),
              line2: fields.text({ label: "Line 2 (small)" }),
            },
            { label: "Handwritten note, right side" }
          ),
          left: fields.object(
            {
              line1: fields.text({ label: "Line 1" }),
              line2: fields.text({ label: "Line 2" }),
            },
            { label: "Handwritten note, left side" }
          ),
        },
        { label: "Handwritten notes (desktop only)" }
      ),
    },
    { label: "Hero" }
  ),
  capabilityMarquee: fields.object(
    {
      ariaLabel: fields.text({ label: "Accessible label for the scrolling strip" }),
      chips: fields.array(fields.text({ label: "Chip text" }), {
        label: "Scrolling capability chips",
        itemLabel: (props) => props.value,
      }),
    },
    { label: "Capability marquee" }
  ),
  howItWorks: fields.object(
    {
      eyebrow: fields.text({ label: "Eyebrow" }),
      heading: fields.text({ label: "Heading" }),
      intro: fields.text({ label: "Intro paragraph", multiline: true }),
      calloutNote: fields.text({ label: "Handwritten callout pointing at the demo (desktop only)" }),
      steps: fields.array(
        fields.object({
          number: fields.text({ label: "Step number (e.g. 01)" }),
          title: fields.text({ label: "Title" }),
          description: fields.text({ label: "Description", multiline: true }),
        }),
        {
          label: "Steps (exactly 6: the interactive demo has one screen per step, keep six)",
          itemLabel: (props) => props.fields.title.value,
        }
      ),
    },
    { label: "How it works (interactive demo)" }
  ),
  features: fields.object(
    {
      eyebrow: fields.text({ label: "Eyebrow" }),
      heading: fields.text({ label: "Heading" }),
      items: fields.array(
        fields.object({
          title: fields.text({ label: "Title" }),
          description: fields.text({ label: "Description", multiline: true }),
        }),
        {
          label: "Feature cards (exactly 4: each has a fixed icon, in this order)",
          itemLabel: (props) => props.fields.title.value,
        }
      ),
    },
    { label: "Features" }
  ),
  dashboard: fields.object(
    {
      eyebrow: fields.text({ label: "Eyebrow" }),
      heading: fields.text({ label: "Heading" }),
      intro: fields.text({ label: "Intro paragraph", multiline: true }),
      metrics: fields.array(
        fields.object({
          title: fields.text({ label: "Title" }),
          description: fields.text({ label: "Description", multiline: true }),
        }),
        {
          label: "Metric cards (exactly 3, laid out in three columns)",
          itemLabel: (props) => props.fields.title.value,
        }
      ),
    },
    { label: "Dashboard" }
  ),
  deliverables: fields.object(
    {
      eyebrow: fields.text({ label: "Eyebrow" }),
      heading: fields.text({ label: "Heading" }),
      items: fields.array(fields.text({ label: "Item", multiline: true }), {
        label: "Checklist items",
        itemLabel: (props) => props.value,
      }),
    },
    { label: "What you get" }
  ),
  whoFor: fields.object(
    {
      eyebrow: fields.text({ label: "Eyebrow" }),
      heading: fields.text({ label: "Heading" }),
      items: fields.array(
        fields.object({
          title: fields.text({ label: "Title" }),
          description: fields.text({ label: "Description", multiline: true }),
        }),
        {
          label: "Audience cards (exactly 3: each has a fixed icon, in this order)",
          itemLabel: (props) => props.fields.title.value,
        }
      ),
    },
    { label: "Who it's for" }
  ),
  faqSection: fields.object(
    {
      eyebrow: fields.text({ label: "Eyebrow" }),
      heading: fields.text({ label: "Heading" }),
    },
    { label: "FAQ section heading (the questions themselves are managed in Page FAQs)" }
  ),
  finalCta: fields.object(
    {
      headingLine1: fields.text({ label: "Heading, line 1" }),
      headingLine2: fields.text({ label: "Heading, line 2 (purple)" }),
      intro: fields.text({ label: "Intro paragraph", multiline: true }),
      buttonLabel: fields.text({ label: "Button label (links to the booking page)" }),
      footnoteLead: fields.text({ label: "Footnote, opening words" }),
      doneForYouLinkLabel: fields.text({ label: "Footnote link 1 label" }),
      doneForYouLinkHref: fields.text({ label: "Footnote link 1 target" }),
      footnoteMiddle: fields.text({ label: "Footnote, words between the two links" }),
      consultationLinkLabel: fields.text({ label: "Footnote link 2 label" }),
      consultationLinkHref: fields.text({ label: "Footnote link 2 target" }),
    },
    { label: "Final call to action" }
  ),
};
