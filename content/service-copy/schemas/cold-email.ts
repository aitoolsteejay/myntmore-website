import { fields } from "@keystatic/core";

// Keystatic fields for the /services/cold-email page copy
// (content/service-copy/cold-email.json). Keys match the JSON exactly.
// Counts that the layout fixes (icons and positions are set in code) are noted in the labels.

const headline = {
  headlineLead: fields.text({ label: "Headline, plain part" }),
  headlineAccent: fields.text({ label: "Headline, italic coloured part" }),
};

export const coldEmailCopySchema = {
  structuredData: fields.object(
    {
      serviceName: fields.text({ label: "Service name" }),
      serviceDescription: fields.text({ label: "Service description", multiline: true }),
      serviceType: fields.text({ label: "Service type" }),
      howToName: fields.text({ label: "How-to name (process structured data)" }),
    },
    { label: "Structured data (search engines only, not shown on the page)" }
  ),

  hero: fields.object(
    {
      breadcrumbServicesLabel: fields.text({ label: "Breadcrumb: Services link text" }),
      breadcrumbPageLabel: fields.text({ label: "Breadcrumb: this page" }),
      badge: fields.text({ label: "Badge above the headline" }),
      headlineLine1: fields.text({ label: "Headline, first line" }),
      headlineAccent: fields.text({ label: "Headline, second line (italic; the gold full stop is added automatically)" }),
      subheadline: fields.text({ label: "Sub-headline", multiline: true }),
      primaryButtonLabel: fields.text({ label: "Primary button label (links to /book-a-call)" }),
      secondaryButtonLabel: fields.text({ label: "Secondary button label (scrolls to the process section)" }),
      flow: fields.object(
        {
          nodes: fields.array(
            fields.object({
              label: fields.text({ label: "Label" }),
              caption: fields.text({ label: "Caption" }),
            }),
            { label: "Flow diagram boxes (exactly 4, in order: list, segmented, inbox-ready, booked calls)", itemLabel: (props) => props.fields.label.value }
          ),
          emailsChip: fields.text({ label: "Floating chip, top" }),
          launchChip: fields.text({ label: "Floating chip, bottom" }),
        },
        { label: "Hero flow diagram" }
      ),
    },
    { label: "Hero" }
  ),

  numbers: fields.object(
    {
      stats: fields.array(
        fields.object({
          value: fields.text({ label: "Number (counts up on scroll, e.g. 1,200)" }),
          label: fields.text({ label: "Label" }),
        }),
        { label: "Headline numbers (exactly 4 fit the layout)", itemLabel: (props) => `${props.fields.value.value} ${props.fields.label.value}` }
      ),
      targetsLabel: fields.text({ label: "Label before the targets" }),
      targets: fields.array(fields.text({ label: "Target" }), { label: "Targets (pills)" }),
    },
    { label: "Numbers strip" }
  ),

  pillars: fields.object(
    {
      eyebrow: fields.text({ label: "Eyebrow" }),
      ...headline,
      items: fields.array(
        fields.object({
          title: fields.text({ label: "Title" }),
          line: fields.text({ label: "Description", multiline: true }),
        }),
        { label: "Pillar cards (exactly 3, each has its own icon)", itemLabel: (props) => props.fields.title.value }
      ),
      results: fields.array(fields.text({ label: "Result" }), { label: "Result pills under the cards (exactly 4, each has its own icon)" }),
    },
    { label: "Pillars section" }
  ),

  package: fields.object(
    {
      eyebrow: fields.text({ label: "Eyebrow" }),
      ...headline,
      intro: fields.text({ label: "Intro line", multiline: true }),
      items: fields.array(
        fields.object({
          label: fields.text({ label: "Card title" }),
          info: fields.text({ label: "Explanation shown in the popover", multiline: true }),
        }),
        { label: "Package cards (exactly 10, each has its own icon; grid is 5 across)", itemLabel: (props) => props.fields.label.value }
      ),
      responsibilities: fields.array(
        fields.object({
          label: fields.text({ label: "Small label" }),
          value: fields.text({ label: "Text" }),
        }),
        { label: "Who does what rows (exactly 3, each has its own icon)", itemLabel: (props) => props.fields.label.value }
      ),
    },
    { label: "Package section" }
  ),

  process: fields.object(
    {
      eyebrow: fields.text({ label: "Eyebrow" }),
      ...headline,
      intro: fields.text({ label: "Intro line" }),
      resultLabel: fields.text({ label: "Label on the result box in each step" }),
      previousButtonLabel: fields.text({ label: "Previous button" }),
      nextButtonLabel: fields.text({ label: "Next button" }),
      restartButtonLabel: fields.text({ label: "Button on the last step" }),
      steps: fields.array(
        fields.object({
          short: fields.text({ label: "Short name (under the step circle)" }),
          title: fields.text({ label: "Title" }),
          summary: fields.text({ label: "Summary", multiline: true }),
          points: fields.array(
            fields.object({
              label: fields.text({ label: "Point heading" }),
              text: fields.text({ label: "Point text" }),
            }),
            { label: "Points", itemLabel: (props) => props.fields.label.value }
          ),
          result: fields.text({ label: "Result", multiline: true }),
        }),
        { label: "Process steps (exactly 10, each has its own icon; also feeds the how-to structured data)", itemLabel: (props) => props.fields.title.value }
      ),
    },
    { label: "Process section" }
  ),

  whyMyntmore: fields.object(
    {
      eyebrow: fields.text({ label: "Eyebrow" }),
      ...headline,
      items: fields.array(
        fields.object({
          title: fields.text({ label: "Title" }),
          line: fields.text({ label: "Description" }),
        }),
        { label: "Reason cards (exactly 4, each has its own icon)", itemLabel: (props) => props.fields.title.value }
      ),
    },
    { label: "Why Myntmore" }
  ),

  faq: fields.object(
    {
      badge: fields.text({ label: "Badge" }),
      title: fields.text({ label: "Title (the questions themselves are edited in the page FAQs)" }),
    },
    { label: "FAQ heading" }
  ),

  relatedPath: fields.object(
    {
      heading: fields.text({ label: "Heading" }),
      intro: fields.text({ label: "Intro", multiline: true }),
    },
    { label: "Related links heading" }
  ),

  founder: fields.object(
    {
      eyebrow: fields.text({ label: "Eyebrow" }),
      imageAlt: fields.text({ label: "Photo alt text" }),
      name: fields.text({ label: "Name" }),
      linkedinUrl: fields.text({ label: "Name links to (LinkedIn URL)" }),
      role: fields.text({ label: "Role" }),
      bioBeforeLink: fields.text({ label: "Bio, text before the link", multiline: true }),
      bioLinkText: fields.text({ label: "Bio, link text" }),
      bioLinkHref: fields.text({ label: "Bio, link target (page path)" }),
      bioAfterLink: fields.text({ label: "Bio, text after the link" }),
      credentials: fields.array(fields.text({ label: "Credential" }), { label: "Credential pills" }),
    },
    { label: "Founder card" }
  ),

  closingCta: fields.object(
    {
      eyebrow: fields.text({ label: "Eyebrow" }),
      ...headline,
      subtext: fields.text({ label: "Sub-text", multiline: true }),
      primaryButtonLabel: fields.text({ label: "Primary button label" }),
      primaryButtonHref: fields.text({ label: "Primary button target" }),
      secondaryButtonLabel: fields.text({ label: "Secondary button label" }),
      secondaryButtonHref: fields.text({ label: "Secondary button target" }),
      calculatorPrompt: fields.text({ label: "Text before the calculator link" }),
      calculatorLinkText: fields.text({ label: "Calculator link text" }),
      calculatorLinkHref: fields.text({ label: "Calculator link target" }),
    },
    { label: "Closing call to action" }
  ),
};
