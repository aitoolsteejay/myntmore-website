import { fields } from "@keystatic/core";
import { longCaseMetaFields } from "./_meta";

const richHint = "Wrap words in **double asterisks** for bold, __double underscores__ for italic and [link text](/path) for a link.";

const statItem = (valueLabel: string) =>
  fields.object({
    value: fields.text({ label: valueLabel }),
    label: fields.text({ label: "Label" }),
  });

export const wealthManagementPmsPipelineCaseSchema = {
  ...longCaseMetaFields,
  hero: fields.object(
    {
      breadcrumbLabel: fields.text({ label: "Breadcrumb label" }),
      badge: fields.text({ label: "Badge above the headline" }),
      headline: fields.text({ label: "Headline (H1)", multiline: true }),
      intro: fields.text({ label: "Intro paragraph", multiline: true }),
      stats: fields.array(statItem("Value (e.g. 150+, 52%)"), {
        label: "Headline stat cards (the layout fixes three; the middle one is highlighted)",
        itemLabel: (props) => `${props.fields.value.value} ${props.fields.label.value}`,
      }),
      metricsStrip: fields.array(
        fields.object({
          value: fields.text({ label: "Bold number" }),
          label: fields.text({ label: "Text after the number" }),
        }),
        { label: "Quick metrics strip (four items under the stat cards)", itemLabel: (props) => `${props.fields.value.value} ${props.fields.label.value}` }
      ),
    },
    { label: "Hero" }
  ),
  challenge: fields.object(
    {
      eyebrow: fields.text({ label: "Small label above the heading" }),
      heading: fields.text({ label: "Heading" }),
      paragraphs: fields.array(fields.text({ label: "Paragraph", multiline: true, description: richHint }), {
        label: "Paragraphs",
        itemLabel: (props) => props.value.slice(0, 60),
      }),
    },
    { label: "The Challenge" }
  ),
  approach: fields.object(
    {
      eyebrow: fields.text({ label: "Small label above the heading" }),
      heading: fields.text({ label: "Heading" }),
      intro: fields.text({ label: "Intro paragraph", multiline: true }),
      pillars: fields.array(
        fields.object({
          number: fields.text({ label: "Number shown after \"Pillar\" (e.g. 01)" }),
          title: fields.text({ label: "Title" }),
          description: fields.text({ label: "Description", multiline: true }),
        }),
        { label: "Approach pillars (two per row)", itemLabel: (props) => `${props.fields.number.value} ${props.fields.title.value}` }
      ),
    },
    { label: "The Approach" }
  ),
  contentImpact: fields.object(
    {
      eyebrow: fields.text({ label: "Small label above the heading" }),
      heading: fields.text({ label: "Heading" }),
      intro: fields.text({ label: "Intro paragraph", multiline: true }),
      stats: fields.array(statItem("Value (e.g. 86%)"), {
        label: "Growth stats (the layout fixes four; the second one is highlighted)",
        itemLabel: (props) => `${props.fields.value.value} ${props.fields.label.value}`,
      }),
      audienceNote: fields.text({ label: "Paragraph under the stats", multiline: true, description: richHint }),
    },
    { label: "Content Impact" }
  ),
  results: fields.object(
    {
      eyebrow: fields.text({ label: "Small label above the heading" }),
      heading: fields.text({ label: "Heading" }),
      intro: fields.text({ label: "First paragraph", multiline: true, description: richHint }),
      marketNote: fields.text({ label: "Second paragraph", multiline: true, description: richHint }),
      playbook: fields.array(
        fields.object({
          title: fields.text({ label: "Title" }),
          body: fields.text({ label: "Body", multiline: true }),
        }),
        { label: "Playbook callouts (the layout fixes three columns)", itemLabel: (props) => props.fields.title.value }
      ),
      tableHeaders: fields.object(
        {
          segment: fields.text({ label: "Segment column" }),
          acceptance: fields.text({ label: "Acceptance column" }),
          response: fields.text({ label: "Response column" }),
          leads: fields.text({ label: "Leads column" }),
          notes: fields.text({ label: "Notes column" }),
        },
        { label: "Table column headings" }
      ),
      segments: fields.array(
        fields.object({
          name: fields.text({ label: "Segment name" }),
          acceptance: fields.text({ label: "Acceptance rate" }),
          response: fields.text({ label: "Response rate" }),
          leads: fields.text({ label: "Leads (type N/A for none)" }),
          notes: fields.text({ label: "Notes", multiline: true }),
          highlight: fields.checkbox({ label: "Highlight this row", defaultValue: false }),
        }),
        { label: "Segment table rows", itemLabel: (props) => props.fields.name.value }
      ),
      footnote: fields.text({ label: "Italic footnote under the table", multiline: true }),
    },
    { label: "Outreach results by segment" }
  ),
  flywheel: fields.object(
    {
      eyebrow: fields.text({ label: "Small label above the heading" }),
      heading: fields.text({ label: "Heading" }),
      intro: fields.text({ label: "Intro paragraph", multiline: true }),
      points: fields.array(
        fields.object({
          title: fields.text({ label: "Bold lead-in (include the colon)" }),
          description: fields.text({ label: "Description", multiline: true }),
        }),
        { label: "Checklist points", itemLabel: (props) => props.fields.title.value }
      ),
      callout: fields.text({ label: "Highlighted callout", multiline: true, description: richHint }),
    },
    { label: "Why it worked: the flywheel" }
  ),
  takeaways: fields.object(
    {
      eyebrow: fields.text({ label: "Small label above the heading" }),
      heading: fields.text({ label: "Heading" }),
      items: fields.array(
        fields.object({
          title: fields.text({ label: "Title" }),
          body: fields.text({ label: "Body", multiline: true }),
        }),
        { label: "Takeaways (numbered automatically)", itemLabel: (props) => props.fields.title.value }
      ),
    },
    { label: "Key takeaways" }
  ),
  services: fields.object(
    {
      heading: fields.text({ label: "Heading" }),
      links: fields.array(
        fields.object({
          name: fields.text({ label: "Link text" }),
          href: fields.text({ label: "Link target (e.g. /services/gtm-strategy)" }),
        }),
        { label: "Service links", itemLabel: (props) => props.fields.name.value }
      ),
    },
    { label: "Services used" }
  ),
  relatedPaths: fields.object(
    {
      heading: fields.text({ label: "Heading" }),
      intro: fields.text({ label: "Intro line" }),
    },
    { label: "Related paths block (the links come from the site's internal-links list)" }
  ),
  cta: fields.object(
    {
      heading: fields.text({ label: "Heading" }),
      body: fields.text({ label: "Body", multiline: true }),
      button: fields.text({ label: "Button text" }),
    },
    { label: "Bottom call to action" }
  ),
};
