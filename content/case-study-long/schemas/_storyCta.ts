import { fields } from "@keystatic/core";

// Page-copy fields for the long-form case studies that end on a "book a call" block (layout: CaseStudyStoryCta).
export const storyCtaFields = {
  hero: fields.object(
    {
      breadcrumbLabel: fields.text({ label: "Breadcrumb label", validation: { isRequired: true } }),
      badge: fields.text({ label: "Badge above the headline", validation: { isRequired: true } }),
      headline: fields.text({ label: "Headline", multiline: true, validation: { isRequired: true } }),
      intro: fields.text({ label: "Intro paragraph", multiline: true, validation: { isRequired: true } }),
      stats: fields.array(
        fields.object({
          value: fields.text({ label: "Figure (e.g. 40, 34%, $1.2M)", validation: { isRequired: true } }),
          label: fields.text({ label: "Label", validation: { isRequired: true } }),
        }),
        { label: "Headline figures (exactly 3; the layout is a three-column row)", itemLabel: (props) => props.fields.value.value },
      ),
    },
    { label: "Hero" },
  ),
  colors: fields.object(
    {
      badgeBackground: fields.text({ label: "Badge background (CSS colour)", validation: { isRequired: true } }),
      badgeText: fields.text({ label: "Badge text (CSS colour)", validation: { isRequired: true } }),
      badgeBorder: fields.text({ label: "Badge border (CSS colour)", validation: { isRequired: true } }),
    },
    { label: "Badge colours (use brand palette values)" },
  ),
  problem: fields.object(
    { body: fields.text({ label: "The problem", multiline: true, validation: { isRequired: true } }) },
    { label: "Problem section" },
  ),
  solution: fields.object(
    {
      body: fields.text({ label: "The solution", multiline: true, validation: { isRequired: true } }),
      cards: fields.array(
        fields.object({
          title: fields.text({ label: "Card title", validation: { isRequired: true } }),
          description: fields.text({ label: "Card description", multiline: true, validation: { isRequired: true } }),
        }),
        { label: "Solution cards (an even number sits in two columns, otherwise three)", itemLabel: (props) => props.fields.title.value },
      ),
    },
    { label: "Solution section" },
  ),
  results: fields.object(
    {
      summary: fields.text({ label: "Results paragraph", multiline: true, validation: { isRequired: true } }),
      figures: fields.array(
        fields.object({
          value: fields.text({ label: "Figure (e.g. 3x, 18K, 4.8%)", validation: { isRequired: true } }),
          label: fields.text({ label: "Label", validation: { isRequired: true } }),
          note: fields.text({ label: "Small note under the label", validation: { isRequired: true } }),
        }),
        { label: "Result figures (exactly 3; the layout is a three-column row)", itemLabel: (props) => props.fields.value.value },
      ),
    },
    { label: "Results section" },
  ),
  services: fields.array(
    fields.object({
      name: fields.text({ label: "Service name", validation: { isRequired: true } }),
      href: fields.text({ label: "Link to the service page (e.g. /services/cold-email)", validation: { isRequired: true } }),
    }),
    { label: "Services used", itemLabel: (props) => props.fields.name.value },
  ),
  closingCta: fields.object(
    {
      heading: fields.text({ label: "Heading", validation: { isRequired: true } }),
      body: fields.text({ label: "Paragraph", multiline: true, validation: { isRequired: true } }),
      buttonLabel: fields.text({ label: "Button label", validation: { isRequired: true } }),
    },
    { label: "Closing call to action (button links to /book-a-call)" },
  ),
};
