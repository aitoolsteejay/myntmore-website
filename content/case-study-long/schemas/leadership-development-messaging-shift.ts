import { fields } from "@keystatic/core";
import { longCaseMetaFields } from "./_meta";

const richNote = "Wrap words in **double asterisks** to make them bold.";

const sectionHead = {
  eyebrow: fields.text({ label: "Small label above the heading" }),
  heading: fields.text({ label: "Heading" }),
};

const phaseCard = (label: string) =>
  fields.object(
    {
      label: fields.text({ label: "Phase label" }),
      heading: fields.text({ label: "Heading" }),
      text: fields.text({ label: "Text", multiline: true }),
    },
    { label }
  );

export const leadershipDevelopmentMessagingShiftCaseSchema = {
  ...longCaseMetaFields,
  hero: fields.object(
    {
      breadcrumbLabel: fields.text({ label: "Breadcrumb label" }),
      badge: fields.text({ label: "Badge above the headline" }),
      headline: fields.text({ label: "Page headline (H1)", multiline: true }),
      intro: fields.text({ label: "Intro paragraph", description: richNote, multiline: true }),
      stats: fields.array(
        fields.object({
          value: fields.text({ label: "Value (animates when shown, e.g. 60%)" }),
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
      ...sectionHead,
      paragraphs: fields.array(fields.text({ label: "Paragraph", description: richNote, multiline: true }), {
        label: "Paragraphs",
        itemLabel: (props) => props.value.slice(0, 50),
      }),
    },
    { label: "The Challenge" }
  ),
  journey: fields.object(
    {
      ...sectionHead,
      testing: phaseCard("Phase 1 card"),
      breakthrough: fields.object(
        {
          label: fields.text({ label: "Phase label" }),
          tag: fields.text({ label: "Tag at the top right" }),
          heading: fields.text({ label: "Heading" }),
          text: fields.text({ label: "Text", multiline: true }),
          tableHeaders: fields.array(fields.text({ label: "Column heading" }), {
            label: "Comparison table column headings (exactly 4: metric, before, after, net shift)",
            itemLabel: (props) => props.value,
          }),
          rows: fields.array(
            fields.object({
              metric: fields.text({ label: "Metric" }),
              before: fields.text({ label: "Before (May to June)" }),
              after: fields.text({ label: "After (July)" }),
              shift: fields.text({ label: "Net shift" }),
              tone: fields.select({
                label: "Net shift colour",
                description: "Positive is green, caution is amber, highlight is the bold purple summary row.",
                options: [
                  { label: "Positive (green)", value: "positive" },
                  { label: "Caution (amber)", value: "caution" },
                  { label: "Highlight row (purple, bold)", value: "highlight" },
                ],
                defaultValue: "positive",
              }),
            }),
            { label: "Comparison table rows", itemLabel: (props) => props.fields.metric.value }
          ),
        },
        { label: "Phase 2 card (July breakthrough, with comparison table)" }
      ),
      momentum: phaseCard("Phase 3 card"),
      alignment: phaseCard("Phase 4 card"),
    },
    { label: "The 4-phase journey" }
  ),
  lifetime: fields.object(
    {
      ...sectionHead,
      intro: fields.text({ label: "Intro paragraph", description: richNote, multiline: true }),
      tableHeaders: fields.array(fields.text({ label: "Column heading" }), {
        label: "Table column headings (exactly 8, in order: period, sent, accepted, acceptance, replies, response, hot leads, meetings)",
        itemLabel: (props) => props.value,
      }),
      periods: fields.array(
        fields.object({
          period: fields.text({ label: "Reporting period" }),
          sent: fields.text({ label: "Sent" }),
          accepted: fields.text({ label: "Accepted" }),
          acceptance: fields.text({ label: "Acceptance rate" }),
          replies: fields.text({ label: "Replies" }),
          response: fields.text({ label: "Response rate" }),
          leads: fields.text({ label: "Hot leads" }),
          meetings: fields.text({ label: "Meetings" }),
          highlight: fields.checkbox({ label: "Tint this row", defaultValue: false }),
        }),
        { label: "Period rows", itemLabel: (props) => props.fields.period.value }
      ),
      total: fields.object(
        {
          label: fields.text({ label: "Row label" }),
          sent: fields.text({ label: "Sent" }),
          accepted: fields.text({ label: "Accepted" }),
          acceptance: fields.text({ label: "Acceptance rate" }),
          replies: fields.text({ label: "Replies" }),
          response: fields.text({ label: "Response rate" }),
          leads: fields.text({ label: "Hot leads (include the * if the footnote applies)" }),
          meetings: fields.text({ label: "Meetings" }),
        },
        { label: "Lifetime total row" }
      ),
      footnote: fields.text({ label: "Footnote under the table", multiline: true }),
    },
    { label: "Lifetime performance table" }
  ),
  sequence: fields.object(
    {
      ...sectionHead,
      intro: fields.text({ label: "Intro paragraph", multiline: true }),
      steps: fields.array(
        fields.object({
          title: fields.text({ label: "Stage" }),
          description: fields.text({ label: "Description", multiline: true }),
        }),
        { label: "Sequence stages (4, numbered automatically, two per row)", itemLabel: (props) => props.fields.title.value }
      ),
    },
    { label: "Messaging sequence" }
  ),
  takeaways: fields.object(
    {
      ...sectionHead,
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
