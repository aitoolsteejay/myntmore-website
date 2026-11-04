import { fields } from "@keystatic/core";
import { longCaseMetaFields } from "./_meta";

const richNote = "Wrap words in **double asterisks** to make them bold.";

export const heritageJewelleryValuationPipelineCaseSchema = {
  ...longCaseMetaFields,
  hero: fields.object(
    {
      breadcrumbLabel: fields.text({ label: "Breadcrumb label" }),
      badge: fields.text({ label: "Badge above the headline" }),
      headline: fields.text({ label: "Page headline (H1)", multiline: true }),
      intro: fields.text({ label: "Intro paragraph", description: richNote, multiline: true }),
      stats: fields.array(
        fields.object({
          value: fields.text({ label: "Value (animates when shown, e.g. 43.7%)" }),
          label: fields.text({ label: "Label" }),
        }),
        { label: "Headline stat cards (exactly 3; the middle one is highlighted)", itemLabel: (props) => props.fields.label.value }
      ),
      metricsStrip: fields.array(
        fields.object({
          value: fields.text({ label: "Bold figure" }),
          label: fields.text({ label: "Text after the figure" }),
        }),
        { label: "Quick metrics strip (4 items)", itemLabel: (props) => props.fields.value.value + " " + props.fields.label.value }
      ),
    },
    { label: "Hero" }
  ),
  challenge: fields.object(
    {
      eyebrow: fields.text({ label: "Small label above the heading" }),
      heading: fields.text({ label: "Heading" }),
      paragraphs: fields.array(fields.text({ label: "Paragraph", description: richNote, multiline: true }), {
        label: "Paragraphs",
        itemLabel: (props) => props.value.slice(0, 50),
      }),
    },
    { label: "The Challenge" }
  ),
  approach: fields.object(
    {
      eyebrow: fields.text({ label: "Small label above the heading" }),
      heading: fields.text({ label: "Heading" }),
      intro: fields.text({ label: "Intro paragraph", multiline: true }),
      audiences: fields.array(
        fields.object({
          title: fields.text({ label: "Audience" }),
          role: fields.text({ label: "Tag shown above the audience" }),
          description: fields.text({ label: "Description", multiline: true }),
        }),
        { label: "Audience cards (laid out two per row)", itemLabel: (props) => props.fields.title.value }
      ),
      architecture: fields.object(
        {
          heading: fields.text({ label: "Box heading" }),
          stages: fields.array(
            fields.object({
              title: fields.text({ label: "Stage title (include its number)" }),
              description: fields.text({ label: "Description", multiline: true }),
            }),
            { label: "Stages (exactly 3, laid out in one row)", itemLabel: (props) => props.fields.title.value }
          ),
        },
        { label: "Outreach architecture box" }
      ),
    },
    { label: "The Approach" }
  ),
  results: fields.object(
    {
      eyebrow: fields.text({ label: "Small label above the heading" }),
      heading: fields.text({ label: "Heading" }),
      intro: fields.text({ label: "Intro paragraph", description: richNote, multiline: true }),
      tableHeaders: fields.array(fields.text({ label: "Column heading" }), {
        label: "Table column headings (exactly 5, in order: segment, acceptance, response, hot leads, notes)",
        itemLabel: (props) => props.value,
      }),
      segments: fields.array(
        fields.object({
          name: fields.text({ label: "Segment" }),
          acceptance: fields.text({ label: "Acceptance rate" }),
          response: fields.text({ label: "Response rate" }),
          leads: fields.text({ label: "Hot leads" }),
          notes: fields.text({ label: "Strategic notes", multiline: true }),
          highlight: fields.checkbox({ label: "Tint this row", defaultValue: false }),
        }),
        { label: "Segment table rows", itemLabel: (props) => props.fields.name.value }
      ),
      insight: fields.object(
        {
          heading: fields.text({ label: "Insight box heading" }),
          text: fields.text({ label: "Insight text", description: richNote, multiline: true }),
        },
        { label: "Insight box" }
      ),
    },
    { label: "Results by segment" }
  ),
  whyItWorked: fields.object(
    {
      eyebrow: fields.text({ label: "Small label above the heading" }),
      heading: fields.text({ label: "Heading" }),
      intro: fields.text({ label: "Intro paragraph", multiline: true }),
      points: fields.array(fields.text({ label: "Point", description: richNote, multiline: true }), {
        label: "Checklist points",
        itemLabel: (props) => props.value.slice(0, 50),
      }),
    },
    { label: "Why it worked" }
  ),
  takeaways: fields.object(
    {
      eyebrow: fields.text({ label: "Small label above the heading" }),
      heading: fields.text({ label: "Heading" }),
      items: fields.array(
        fields.object({
          title: fields.text({ label: "Takeaway" }),
          body: fields.text({ label: "Explanation", multiline: true }),
        }),
        { label: "Takeaways (numbered automatically)", itemLabel: (props) => props.fields.title.value }
      ),
    },
    { label: "Key takeaways" }
  ),
  servicesUsed: fields.object(
    {
      heading: fields.text({ label: "Heading" }),
      links: fields.array(
        fields.object({
          name: fields.text({ label: "Link text" }),
          href: fields.text({ label: "Link target (e.g. /services/linkedin-outreach)" }),
        }),
        { label: "Service links", itemLabel: (props) => props.fields.name.value }
      ),
    },
    { label: "Services used" }
  ),
  cta: fields.object(
    {
      heading: fields.text({ label: "Heading" }),
      text: fields.text({ label: "Paragraph", multiline: true }),
      buttonLabel: fields.text({ label: "Button text" }),
    },
    { label: "Bottom call to action" }
  ),
};
