import { fields } from "../../../lib/admin/fields";

// Keystatic fields for the main hand-written pages (content/site-copy/*.json). The pages read the JSON;
// layout, colours and icons stay in code. In longer texts, [link text](/address) becomes a link.

const text = (label: string, multiline = false) => fields.text({ label, multiline });
const textList = (label: string, itemLabel = "Text") => fields.array(fields.text({ label: itemLabel }), { label, itemLabel: (props) => props.value });
const link = (labelName = "Text") =>
  fields.object({
    label: fields.text({ label: labelName }),
    href: fields.text({ label: "Address, e.g. /services/cold-email" }),
  });

export const aboutCopySchema = {
  badge: text("Badge above the headline"),
  heading: text("Headline (H1)"),
  lead: text("Opening paragraph", true),
  credentials: fields.array(
    fields.object({
      stat: fields.text({ label: "Figure (verified numbers only; counts up, e.g. 12K+)" }),
      label: fields.text({ label: "Label" }),
    }),
    { label: "Figures strip (4 fit the layout, each with its own colour)", validation: { length: { max: 4 } }, itemLabel: (props) => `${props.fields.stat.value} ${props.fields.label.value}` },
  ),
  photoAlt: text("Photo description (for screen readers and Google)"),
  name: text("Name under the photo"),
  nameLine: text("Line under the name"),
  linkedinButton: text("LinkedIn button"),
  linkedinUrl: text("LinkedIn profile address"),
  bio: fields.array(fields.text({ label: "Paragraph ([link text](/address) becomes a link)", multiline: true }), {
    label: "Story paragraphs",
    itemLabel: (props) => props.value.slice(0, 80),
  }),
  philosophyHeading: text("Philosophy box: heading"),
  philosophy: text("Philosophy box: text", true),
  quote: text("Quote (with its quotation marks)", true),
  quoteBy: text("Quote: who said it"),
  expertiseHeading: text("Expertise: heading"),
  expertise: fields.array(link("Chip text"), { label: "Expertise chips (each links to a page)", itemLabel: (props) => props.fields.label.value }),
  ctaHeading: text("Closing section: heading"),
  ctaText: text("Closing section: text", true),
  ctaButton: text("Closing section: main button (goes to /book-a-call)"),
  ctaEmailButton: text("Closing section: email button (emails growth@myntmore.com)"),
  ctaNote: text("Closing section: small print"),
};

export const servicesHubCopySchema = {
  badge: text("Badge above the headline"),
  headingLine1: text("Headline, first line"),
  headingLine2: text("Headline, second line"),
  intro: text("Text under the headline", true),
  services: fields.array(
    fields.object({
      title: fields.text({ label: "Service name" }),
      tagline: fields.text({ label: "Coloured line under the name" }),
      description: fields.text({ label: "Text", multiline: true }),
      href: fields.text({ label: "Links to, e.g. /services/cold-email" }),
      stats: fields.array(
        fields.object({
          value: fields.text({ label: "Figure (counts up)" }),
          label: fields.text({ label: "Label" }),
        }),
        { label: "Figures on the card", itemLabel: (props) => `${props.fields.value.value} ${props.fields.label.value}` },
      ),
    }),
    { label: "Service cards (7, each with its own number and colour)", itemLabel: (props) => props.fields.title.value },
  ),
  faqHeading: text("Questions and answers: heading (the questions are under FAQs on pages > service-overview)"),
  locationsBadge: text("Locations: badge"),
  locationsHeading: text("Locations: heading"),
  locationsText: text("Locations: text ([link text](/address) becomes a link)", true),
  cities: fields.array(
    fields.object({
      city: fields.text({ label: "City" }),
      href: fields.text({ label: "Links to, e.g. /b2b-lead-generation-pune" }),
      blurb: fields.text({ label: "Sectors line" }),
    }),
    { label: "City cards", itemLabel: (props) => props.fields.city.value },
  ),
};

export const contactCopySchema = {
  badge: text("Badge above the headline"),
  headingLine1: text("Headline, first line"),
  headingLine2: text("Headline, second line"),
  intro: text("Text under the headline", true),
  cards: fields.array(
    fields.object({
      icon: fields.text({ label: "Emoji" }),
      title: fields.text({ label: "Small title" }),
      value: fields.text({ label: "Main line" }),
      href: fields.text({ label: "Link: a page (/book-a-call), mailto:name@myntmore.com or tel:+91…" }),
      cta: fields.text({ label: "Link text (an arrow is added)" }),
    }),
    { label: "Contact cards (3 fit the layout)", itemLabel: (props) => props.fields.title.value },
  ),
  formHeading: text("Form: heading"),
  formIntro: text("Form: text under the heading", true),
  form: fields.object(
    {
      nameLabel: text("Name: label"),
      namePlaceholder: text("Name: example inside the box"),
      designationLabel: text("Designation: label"),
      designationPlaceholder: text("Designation: example inside the box"),
      companyLabel: text("Company: label"),
      companyPlaceholder: text("Company: example inside the box"),
      phoneLabel: text("Phone: label"),
      phonePlaceholder: text("Phone: example inside the box"),
      emailLabel: text("Email: label"),
      emailPlaceholder: text("Email: example inside the box"),
      submit: text("Submit button"),
      note: text("Small print under the button"),
    },
    { label: "Form fields" },
  ),
  nextHeading: text("What happens next: heading"),
  nextSteps: textList("What happens next: steps (numbered automatically)", "Step"),
  officeHeading: text("Office: heading"),
  officeLinkText: text("Office: link text"),
  officeLinkHref: text("Office: link address"),
  officeAddress: textList("Office: address lines", "Line"),
  officeMapUrl: text("Office: Google Maps link"),
  officeMapLabel: text("Office: map link description (for screen readers)"),
};

const pair = (first: string, second: string) =>
  fields.object({
    title: fields.text({ label: first }),
    description: fields.text({ label: second, multiline: true }),
  });

export const bookACallCopySchema = {
  badge: text("Badge above the headline"),
  headlineStart: text("Headline: start"),
  headlineHighlight: text("Headline: highlighted word(s)"),
  headlineEnd: text("Headline: end (on its own line on larger screens)"),
  intro: text("Text under the headline", true),
  hostsEyebrow: text("Hosts card: small label"),
  hostsNames: text("Hosts card: names"),
  hostsRole: text("Hosts card: role line"),
  host1PhotoAlt: text("Hosts card: first photo description (screen readers)"),
  host2PhotoAlt: text("Hosts card: second photo description (screen readers)"),
  chipLength: text("Format chip: length"),
  chipPlace: text("Format chip: where"),
  chipPrice: text("Format chip: price"),
  agendaHeading: text("What we cover: heading"),
  agenda: fields.array(pair("Title", "Text"), { label: "What we cover (3 fit the layout)", itemLabel: (props) => props.fields.title.value }),
  stats: fields.array(
    fields.object({
      value: fields.text({ label: "Figure (verified numbers only)" }),
      label: fields.text({ label: "Label" }),
    }),
    { label: "Figures box (4 fit the layout)", validation: { length: { max: 4 } }, itemLabel: (props) => `${props.fields.value.value} ${props.fields.label.value}` },
  ),
  trust1Bold: text("First reassurance: bold start"),
  trust1Text: text("First reassurance: rest"),
  trust2Bold: text("Second reassurance: bold start"),
  trust2Text: text("Second reassurance: rest"),
  calendarHeading: text("Calendar: heading"),
  calendarOpenNew: text("Calendar: 'open in new window' link"),
  calendarLoading: text("Calendar: text while it loads"),
  calendarPrefer: text("Calendar: line before the full-window link"),
  calendarOpenTab: text("Calendar: full-window link"),
  helpText: text("Help line under the calendar: start"),
  helpWhatsapp: text("Help line: WhatsApp link text"),
  helpOrEmail: text("Help line: words before the email address"),
  stepsBadge: text("How it works: badge"),
  stepsHeading: text("How it works: heading"),
  stepsIntro: text("How it works: intro", true),
  steps: fields.array(pair("Title", "Text"), { label: "How it works: steps (2 fit the layout, numbered 01 and 02)", itemLabel: (props) => props.fields.title.value }),
  faqBadge: text("Questions: badge"),
  faqHeading: text("Questions: heading"),
  faqIntro: text("Questions: intro"),
  faqs: fields.array(
    fields.object({
      question: fields.text({ label: "Question" }),
      answer: fields.text({ label: "Answer", multiline: true }),
    }),
    { label: "Questions and answers", itemLabel: (props) => props.fields.question.value },
  ),
};
