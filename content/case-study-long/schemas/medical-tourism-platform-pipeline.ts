import { fields } from "@keystatic/core";
import { longCaseMetaFields } from "./_meta";

// A run of text where some parts are bold. Keep the spaces at the edges of each part as they should appear.
const richParts = (label: string) =>
  fields.array(
    fields.object({
      text: fields.text({ label: "Text (keep the spaces at its edges)", multiline: true }),
      bold: fields.checkbox({ label: "Bold", defaultValue: false }),
    }),
    { label, itemLabel: (props) => (props.fields.bold.value ? "Bold: " : "") + props.fields.text.value.slice(0, 40) },
  );

export const medicalTourismPlatformPipelineCaseSchema = {
  ...longCaseMetaFields,
  hero: fields.object(
    {
      breadcrumbLabel: fields.text({ label: "Breadcrumb label (last crumb)" }),
      badge: fields.text({ label: "Badge above the headline" }),
      headline: fields.text({ label: "Headline (H1)", multiline: true }),
      intro: fields.text({ label: "Intro paragraph", multiline: true }),
      stats: fields.array(
        fields.object({
          value: fields.text({ label: "Value (e.g. 140, 61.6%)" }),
          label: fields.text({ label: "Label" }),
        }),
        { label: "Headline stat cards (the layout shows three; the middle one is highlighted)", itemLabel: (props) => props.fields.label.value },
      ),
      quickMetrics: fields.array(
        fields.object({
          value: fields.text({ label: "Bold figure (e.g. 59.7%)" }),
          text: fields.text({ label: "Text after the figure" }),
        }),
        { label: "Quick metrics strip (four fit the row)", itemLabel: (props) => props.fields.value.value + " " + props.fields.text.value },
      ),
    },
    { label: "Hero" },
  ),
  challenge: fields.object(
    {
      eyebrow: fields.text({ label: "Section label" }),
      heading: fields.text({ label: "Heading" }),
      paragraphs: fields.array(fields.text({ label: "Paragraph", multiline: true }), {
        label: "Paragraphs (exactly two; the layout shows the first two)",
        itemLabel: (props) => props.value.slice(0, 50),
      }),
    },
    { label: "Section: The challenge" },
  ),
  approach: fields.object(
    {
      eyebrow: fields.text({ label: "Section label" }),
      heading: fields.text({ label: "Heading" }),
      intro: fields.text({ label: "Intro paragraph", multiline: true }),
      audiences: fields.array(
        fields.object({
          tag: fields.text({ label: "Audience tag (small pill)" }),
          title: fields.text({ label: "Card title" }),
          body: fields.text({ label: "Description", multiline: true }),
        }),
        { label: "Audience cards (the layout shows three across)", itemLabel: (props) => props.fields.tag.value },
      ),
      openingLabel: fields.text({ label: "Highlight box: bold lead-in (e.g. Strategic Opening:)" }),
      openingText: fields.text({ label: "Highlight box: text after the lead-in", multiline: true }),
    },
    { label: "Section: The approach" },
  ),
  segmentResults: fields.object(
    {
      eyebrow: fields.text({ label: "Section label" }),
      heading: fields.text({ label: "Heading" }),
      intro: richParts("Intro paragraph (bold parts marked)"),
      columns: fields.object(
        {
          segment: fields.text({ label: "Column heading: segment" }),
          acceptance: fields.text({ label: "Column heading: acceptance" }),
          response: fields.text({ label: "Column heading: response" }),
          leads: fields.text({ label: "Column heading: leads" }),
          notes: fields.text({ label: "Column heading: notes" }),
        },
        { label: "Table column headings" },
      ),
      table: fields.array(
        fields.object({
          name: fields.text({ label: "Segment" }),
          acceptance: fields.text({ label: "Acceptance rate" }),
          response: fields.text({ label: "Response rate" }),
          leads: fields.text({ label: "Leads" }),
          notes: fields.text({ label: "Notes", multiline: true }),
          highlight: fields.checkbox({ label: "Highlight this row (tinted background)", defaultValue: false }),
        }),
        { label: "Segment table rows", itemLabel: (props) => props.fields.name.value },
      ),
      insightHeading: fields.text({ label: "Insight box heading" }),
      insight: richParts("Insight box paragraph (bold parts marked)"),
    },
    { label: "Section: Outreach results by segment" },
  ),
  messaging: fields.object(
    {
      eyebrow: fields.text({ label: "Section label" }),
      heading: fields.text({ label: "Heading" }),
      intro: fields.text({ label: "Intro paragraph", multiline: true }),
      cards: fields.array(
        fields.object({
          title: fields.text({ label: "Title" }),
          body: fields.text({ label: "Description", multiline: true }),
        }),
        { label: "Messaging cards (the layout shows two across)", itemLabel: (props) => props.fields.title.value },
      ),
    },
    { label: "Section: The messaging strategy" },
  ),
  takeaways: fields.object(
    {
      eyebrow: fields.text({ label: "Section label" }),
      heading: fields.text({ label: "Heading" }),
      items: fields.array(
        fields.object({
          title: fields.text({ label: "Title" }),
          body: fields.text({ label: "Description", multiline: true }),
        }),
        { label: "Takeaways (numbered automatically)", itemLabel: (props) => props.fields.title.value },
      ),
    },
    { label: "Section: Key takeaways" },
  ),
  services: fields.object(
    {
      heading: fields.text({ label: "Heading" }),
      items: fields.array(
        fields.object({
          name: fields.text({ label: "Link text" }),
          href: fields.text({ label: "Link target (e.g. /services/ai-lead-generation)" }),
        }),
        { label: "Service links", itemLabel: (props) => props.fields.name.value },
      ),
    },
    { label: "Services used" },
  ),
  cta: fields.object(
    {
      heading: fields.text({ label: "Heading", multiline: true }),
      body: fields.text({ label: "Paragraph", multiline: true }),
      buttonLabel: fields.text({ label: "Button label (links to /book-a-call)" }),
    },
    { label: "Bottom call to action" },
  ),
};
