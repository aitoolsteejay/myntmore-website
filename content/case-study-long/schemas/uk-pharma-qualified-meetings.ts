import { fields } from "@keystatic/core";
import { longCaseMetaFields } from "./_meta";

export const ukPharmaQualifiedMeetingsCaseSchema = {
  ...longCaseMetaFields,
  hero: fields.object(
    {
      breadcrumbLabel: fields.text({ label: "Breadcrumb label (last crumb)" }),
      badge: fields.text({ label: "Badge above the headline (shown in capitals)" }),
      headline: fields.text({ label: "Headline (H1)", multiline: true }),
      intro: fields.text({ label: "Intro paragraph", multiline: true }),
      stats: fields.array(
        fields.object({
          value: fields.text({ label: "Value (e.g. 20+, 35%, £200K+)" }),
          label: fields.text({ label: "Label" }),
        }),
        { label: "Headline stats (the layout shows three)", itemLabel: (props) => props.fields.label.value },
      ),
    },
    { label: "Hero" },
  ),
  problem: fields.object(
    {
      eyebrow: fields.text({ label: "Section label" }),
      heading: fields.text({ label: "Heading" }),
      paragraphs: fields.array(fields.text({ label: "Paragraph", multiline: true }), { label: "Paragraphs", itemLabel: (props) => props.value.slice(0, 50) }),
    },
    { label: "Section 1: The problem" },
  ),
  solution: fields.object(
    {
      eyebrow: fields.text({ label: "Section label" }),
      heading: fields.text({ label: "Heading" }),
      paragraphs: fields.array(fields.text({ label: "Paragraph", multiline: true }), { label: "Paragraphs", itemLabel: (props) => props.value.slice(0, 50) }),
      areas: fields.array(
        fields.object({
          title: fields.text({ label: "Title" }),
          body: fields.text({ label: "Description", multiline: true }),
        }),
        { label: "Solution cards (the layout shows three across; numbered automatically)", itemLabel: (props) => props.fields.title.value },
      ),
    },
    { label: "Section 2: The solution" },
  ),
  results: fields.object(
    {
      eyebrow: fields.text({ label: "Section label" }),
      heading: fields.text({ label: "Heading" }),
      intro: fields.text({ label: "Intro paragraph", multiline: true }),
      beforeLabel: fields.text({ label: "Table column heading: before" }),
      afterLabel: fields.text({ label: "Table column heading: after" }),
      table: fields.array(
        fields.object({
          before: fields.text({ label: "Before value" }),
          after: fields.text({ label: "After value" }),
          label: fields.text({ label: "Metric label" }),
        }),
        { label: "Before and after rows", itemLabel: (props) => props.fields.label.value },
      ),
      calloutHeadline: fields.text({ label: "Callout headline", multiline: true }),
      calloutBody: fields.text({ label: "Callout body", multiline: true }),
    },
    { label: "Section 3: The results" },
  ),
  services: fields.object(
    {
      heading: fields.text({ label: "Heading" }),
      items: fields.array(
        fields.object({
          name: fields.text({ label: "Link text" }),
          href: fields.text({ label: "Link target (e.g. /services/linkedin-outreach)" }),
        }),
        { label: "Service links", itemLabel: (props) => props.fields.name.value },
      ),
    },
    { label: "Services used" },
  ),
};
