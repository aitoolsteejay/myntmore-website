import { fields } from "@keystatic/core";
import { longCaseMetaFields } from "./_meta";

const richHint = "Wrap words in **double asterisks** for bold and __double underscores__ for italic.";

export const retailStrategyDesignPipelineCaseSchema = {
  ...longCaseMetaFields,
  hero: fields.object(
    {
      breadcrumbLabel: fields.text({ label: "Breadcrumb label" }),
      badge: fields.text({ label: "Badge above the headline" }),
      headline: fields.text({ label: "Headline (H1)", multiline: true }),
      intro: fields.text({ label: "Intro paragraph", multiline: true, description: richHint }),
      stats: fields.array(
        fields.object({
          value: fields.text({ label: "Value (e.g. 69, 8+)" }),
          label: fields.text({ label: "Label" }),
        }),
        { label: "Headline stat cards (the layout fixes three; the middle one is highlighted)", itemLabel: (props) => `${props.fields.value.value} ${props.fields.label.value}` }
      ),
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
      intro: fields.text({ label: "Intro paragraph", multiline: true, description: richHint }),
      sectors: fields.array(
        fields.object({
          sector: fields.text({ label: "Sector tag" }),
          hook: fields.text({ label: "Hook (card title)" }),
          description: fields.text({ label: "Description", multiline: true }),
        }),
        { label: "Sector cards (two per row)", itemLabel: (props) => props.fields.sector.value }
      ),
      followUp: fields.object(
        {
          heading: fields.text({ label: "Heading" }),
          stages: fields.array(
            fields.object({
              title: fields.text({ label: "Stage title (include the number)" }),
              description: fields.text({ label: "Description", multiline: true }),
            }),
            { label: "Stages (the layout fixes three columns)", itemLabel: (props) => props.fields.title.value }
          ),
        },
        { label: "Follow-up structure box" }
      ),
    },
    { label: "The Approach" }
  ),
  results: fields.object(
    {
      eyebrow: fields.text({ label: "Small label above the heading" }),
      heading: fields.text({ label: "Heading" }),
      intro: fields.text({ label: "Intro paragraph", multiline: true, description: richHint }),
      tableHeaders: fields.object(
        {
          segment: fields.text({ label: "Segment column" }),
          accepted: fields.text({ label: "Accepted connections column" }),
          responses: fields.text({ label: "Responses column" }),
          leads: fields.text({ label: "Hot leads column" }),
          notes: fields.text({ label: "Notes column" }),
        },
        { label: "Table column headings" }
      ),
      segments: fields.array(
        fields.object({
          name: fields.text({ label: "Segment name" }),
          accepted: fields.text({ label: "Accepted connections" }),
          responses: fields.text({ label: "Responses" }),
          leads: fields.text({ label: "Hot leads" }),
          notes: fields.text({ label: "Strategic notes", multiline: true }),
          highlight: fields.checkbox({ label: "Highlight this row", defaultValue: false }),
        }),
        { label: "Segment table rows", itemLabel: (props) => props.fields.name.value }
      ),
      insight: fields.object(
        {
          heading: fields.text({ label: "Heading" }),
          body: fields.text({ label: "Body", multiline: true, description: richHint }),
        },
        { label: "Insight box under the table" }
      ),
    },
    { label: "Outreach results by segment" }
  ),
  whyItWorked: fields.object(
    {
      eyebrow: fields.text({ label: "Small label above the heading" }),
      heading: fields.text({ label: "Heading" }),
      intro: fields.text({ label: "Intro paragraph", multiline: true }),
      drivers: fields.array(
        fields.object({
          title: fields.text({ label: "Bold lead-in (include the colon)" }),
          description: fields.text({ label: "Description", multiline: true }),
        }),
        { label: "Key drivers (checklist)", itemLabel: (props) => props.fields.title.value }
      ),
    },
    { label: "Why it worked" }
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
