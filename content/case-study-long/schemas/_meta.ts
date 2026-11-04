import { fields } from "@keystatic/core";

// Search, share and article-schema fields every long-form case study has. Each page's own schema spreads this in
// front of its page-copy fields: `{ ...longCaseMetaFields, ...copyFields }`. The JSON keys are read by
// scripts/generate-case-study-long-pages.mjs, which writes the page's literal metadata from them.
export const longCaseMetaFields = {
  metaTitle: fields.text({ label: "Search title", description: "Aim for 49 characters or fewer (the site adds \" | Myntmore\"); Google cuts long titles.", validation: { isRequired: true, length: { max: 70 } } }),
  metaDescription: fields.text({ label: "Search description", multiline: true, validation: { isRequired: true, length: { max: 160 } } }),
  keywords: fields.array(fields.text({ label: "Keyword" }), { label: "Keywords (one search phrase each)", itemLabel: (props) => props.value }),
  ogTitle: fields.text({ label: "Share title (LinkedIn, WhatsApp)", validation: { isRequired: true } }),
  ogDescription: fields.text({ label: "Share description", multiline: true, validation: { isRequired: true } }),
  schemaHeadline: fields.text({ label: "Structured data: article headline", validation: { isRequired: true } }),
  schemaDescription: fields.text({ label: "Structured data: article description", multiline: true, validation: { isRequired: true } }),
  datePublished: fields.text({ label: "Date published (ISO, e.g. 2026-10-22T10:00:00+05:30)", validation: { isRequired: true } }),
  dateModified: fields.text({ label: "Date last updated (ISO, e.g. 2026-10-22T10:00:00+05:30)", validation: { isRequired: true } }),
};
