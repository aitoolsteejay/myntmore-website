import { fields } from "@keystatic/core";

// Page-copy fields for the long-form case studies that carry a client quote (layout: CaseStudyStoryQuote).
const stat = fields.object(
  {
    value: fields.text({ label: "Figure (e.g. 28, 41%, $400K)", validation: { isRequired: true } }),
    label: fields.text({ label: "Label", validation: { isRequired: true } }),
  },
  { label: "Figure" },
);

export const storyQuoteFields = {
  hero: fields.object(
    {
      breadcrumbLabel: fields.text({ label: "Breadcrumb label", validation: { isRequired: true } }),
      badge: fields.text({ label: "Badge above the headline", validation: { isRequired: true } }),
      headline: fields.text({ label: "Headline", multiline: true, validation: { isRequired: true } }),
      intro: fields.text({ label: "Intro paragraph", multiline: true, validation: { isRequired: true } }),
      stats: fields.array(stat, { label: "Headline figures (exactly 3; the layout is a three-column row)", itemLabel: (props) => props.fields.value.value }),
    },
    { label: "Hero" },
  ),
  colors: fields.object(
    {
      badgeBackground: fields.text({ label: "Badge background (CSS colour)", validation: { isRequired: true } }),
      badgeText: fields.text({ label: "Badge text (CSS colour)", validation: { isRequired: true } }),
      badgeBorder: fields.text({ label: "Badge border (CSS colour)", validation: { isRequired: true } }),
      resultFigureText: fields.text({ label: "Results figures text (CSS colour)", validation: { isRequired: true } }),
      quoteBackground: fields.text({ label: "Quote box background (CSS colour)", validation: { isRequired: true } }),
      quoteBorder: fields.text({ label: "Quote box left border (CSS colour)", validation: { isRequired: true } }),
      quoteAuthorText: fields.text({ label: "Quote attribution text (CSS colour)", validation: { isRequired: true } }),
    },
    { label: "Accent colours (use brand palette values)" },
  ),
  problem: fields.object(
    { body: fields.text({ label: "The problem", multiline: true, validation: { isRequired: true } }) },
    { label: "Problem section" },
  ),
  solution: fields.object(
    {
      body: fields.text({ label: "The solution", multiline: true, validation: { isRequired: true } }),
      highlights: fields.array(fields.text({ label: "Highlight" }), { label: "Highlight cards (3 fit the layout)", itemLabel: (props) => props.value }),
    },
    { label: "Solution section" },
  ),
  results: fields.object(
    {
      figures: fields.array(stat, { label: "Result figures (exactly 3; the layout is a three-column row)", itemLabel: (props) => props.fields.value.value }),
      summary: fields.text({ label: "Results paragraph", multiline: true, validation: { isRequired: true } }),
    },
    { label: "Results section" },
  ),
  quote: fields.object(
    {
      text: fields.text({ label: "Client quote (without quotation marks; the page adds them)", multiline: true, validation: { isRequired: true } }),
      attribution: fields.text({ label: "Who said it", validation: { isRequired: true } }),
    },
    { label: "Client quote" },
  ),
  services: fields.array(
    fields.object({
      name: fields.text({ label: "Service name", validation: { isRequired: true } }),
      href: fields.text({ label: "Link to the service page (e.g. /services/cold-email)" }),
    }),
    { label: "Services used", itemLabel: (props) => props.fields.name.value },
  ),
};
