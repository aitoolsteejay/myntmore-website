import { fields } from "@keystatic/core";
import { longCaseMetaFields } from "./_meta";

const sectionParagraphs = fields.array(fields.text({ label: "Paragraph", multiline: true }), { label: "Paragraphs", itemLabel: (props) => props.value.slice(0, 50) });

export const specialistRecruitmentLinkedinLeadsCaseSchema = {
  ...longCaseMetaFields,
  hero: fields.object(
    {
      breadcrumbLabel: fields.text({ label: "Breadcrumb label (last crumb)" }),
      badge: fields.text({ label: "Badge above the headline (shown in capitals)" }),
      headline: fields.text({ label: "Headline (H1)", multiline: true }),
      intro: fields.text({ label: "Intro paragraph", multiline: true }),
      stats: fields.array(
        fields.object({
          value: fields.text({ label: "Value (e.g. 50%, 15)" }),
          label: fields.text({ label: "Label" }),
        }),
        { label: "Headline stats (the layout shows three)", itemLabel: (props) => props.fields.label.value },
      ),
    },
    { label: "Hero" },
  ),
  challenge: fields.object(
    {
      eyebrow: fields.text({ label: "Section label" }),
      heading: fields.text({ label: "Heading" }),
      paragraphs: sectionParagraphs,
    },
    { label: "Section 1: The challenge" },
  ),
  approach: fields.object(
    {
      eyebrow: fields.text({ label: "Section label" }),
      heading: fields.text({ label: "Heading" }),
      intro: fields.text({ label: "Intro paragraph", multiline: true }),
      segments: fields.array(
        fields.object({
          title: fields.text({ label: "Audience" }),
          body: fields.text({ label: "Message angle", multiline: true }),
        }),
        { label: "Audience cards (two across; numbered automatically)", itemLabel: (props) => props.fields.title.value },
      ),
    },
    { label: "Section 2: The approach" },
  ),
  results: fields.object(
    {
      eyebrow: fields.text({ label: "Section label" }),
      heading: fields.text({ label: "Heading" }),
      metricColumnHeading: fields.text({ label: "Table column heading: metric" }),
      resultColumnHeading: fields.text({ label: "Table column heading: result" }),
      table: fields.array(
        fields.object({
          metric: fields.text({ label: "Metric" }),
          value: fields.text({ label: "Result" }),
        }),
        { label: "Results table rows", itemLabel: (props) => props.fields.metric.value },
      ),
    },
    { label: "Section 3: The results" },
  ),
  messaging: fields.object(
    {
      eyebrow: fields.text({ label: "Section label" }),
      heading: fields.text({ label: "Heading" }),
      themes: fields.array(
        fields.object({
          title: fields.text({ label: "Title" }),
          body: fields.text({ label: "Description", multiline: true }),
        }),
        { label: "Theme cards (the layout shows three across)", itemLabel: (props) => props.fields.title.value },
      ),
    },
    { label: "Section 4: The messaging" },
  ),
  whyItWorked: fields.object(
    {
      eyebrow: fields.text({ label: "Section label" }),
      heading: fields.text({ label: "Heading" }),
      points: fields.array(fields.text({ label: "Point", multiline: true }), { label: "Bullet points", itemLabel: (props) => props.value.slice(0, 50) }),
      calloutHeadline: fields.text({ label: "Callout headline", multiline: true }),
      calloutBody: fields.text({ label: "Callout body", multiline: true }),
    },
    { label: "Section 5: Why it worked" },
  ),
  services: fields.object(
    {
      heading: fields.text({ label: "Heading" }),
      items: fields.array(
        fields.object({
          name: fields.text({ label: "Link text" }),
          href: fields.text({ label: "Link target (e.g. /services/cold-email)" }),
        }),
        { label: "Service links", itemLabel: (props) => props.fields.name.value },
      ),
    },
    { label: "Services used" },
  ),
};
