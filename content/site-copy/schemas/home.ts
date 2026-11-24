import { fields } from "../../../lib/admin/fields";

// Keystatic fields for the homepage copy (content/site-copy/home.json), one group per section, in page
// order. The components in app/components/ read the JSON; colours, icons, drawings and animation timing
// stay in code and are matched to items by position, so counts the layout depends on are noted below.

const stat = (valueLabel: string) =>
  fields.object({
    value: fields.text({ label: valueLabel }),
    label: fields.text({ label: "Label" }),
  });

const textList = (label: string, itemLabel = "Text") => fields.array(fields.text({ label: itemLabel }), { label, itemLabel: (props) => props.value });

export const homeCopySchema = {
  hero: fields.object(
    {
      badgeBefore: fields.text({ label: "Badge: text before the highlighted part (keep the space at the end)" }),
      badgeHighlight: fields.text({ label: "Badge: highlighted part" }),
      badgeAfter: fields.text({ label: "Badge: text after the highlighted part (keep the space at the start)" }),
      headline: fields.text({ label: "Headline, first line" }),
      rotatingPhrases: textList("Headline, second line: the phrases that take turns", "Phrase"),
      subheading: fields.text({ label: "Text under the headline", multiline: true }),
      primaryButton: fields.text({ label: "Main button (goes to /book-a-call)" }),
      secondaryButton: fields.text({ label: "Second link (scrolls down to the results)" }),
      stats: fields.array(stat("Figure (counts up from zero, e.g. $120M+, 18 Days, 12K+)"), {
        label: "Stats row (3 fit the layout)",
        validation: { length: { max: 3 } },
        itemLabel: (props) => `${props.fields.value.value} ${props.fields.label.value}`,
      }),
      noteRightLine1: fields.text({ label: "Handwritten note, right: first line (desktop only)" }),
      noteRightLine2: fields.text({ label: "Handwritten note, right: second line" }),
      noteLeftLine1: fields.text({ label: "Handwritten note, left: first line (desktop only)" }),
      noteLeftLine2: fields.text({ label: "Handwritten note, left: second line" }),
    },
    { label: "Top of the page" },
  ),

  logoStrip: fields.object(
    {
      heading: fields.text({ label: "Small heading above the names" }),
      companies: textList("Company names in the scrolling strip (real clients only)", "Company"),
    },
    { label: "Scrolling company names" },
  ),

  whoWeHelp: fields.object(
    {
      heading: fields.text({ label: "Heading" }),
      intro: fields.text({ label: "Intro", multiline: true }),
      personas: fields.array(
        fields.object({
          tab: fields.text({ label: "Tab name" }),
          heading: fields.text({ label: "Heading (a new line splits it in two)", multiline: true }),
          tagline: fields.text({ label: "Text under the heading", multiline: true }),
          cta: fields.text({ label: "Button (goes to /book-a-call)" }),
          benefits: fields.array(
            fields.object({
              title: fields.text({ label: "Title" }),
              description: fields.text({ label: "Text", multiline: true }),
            }),
            { label: "Benefits (3 fit the layout)", itemLabel: (props) => props.fields.title.value },
          ),
        }),
        { label: "Tabs (4, each with its own colour and drawing)", itemLabel: (props) => props.fields.tab.value },
      ),
    },
    { label: "Who we help (tabs)" },
  ),

  industries: fields.object(
    {
      eyebrow: fields.text({ label: "Small label above the heading" }),
      headingPlain: fields.text({ label: "Heading, plain part" }),
      headingAccent: fields.text({ label: "Heading, coloured part" }),
      intro: fields.text({ label: "Intro", multiline: true }),
      pills: fields.array(
        fields.object({
          label: fields.text({ label: "Sector" }),
          color: fields.text({ label: "Colour (hex, e.g. #3B82F6)" }),
        }),
        { label: "Sector bubbles", itemLabel: (props) => props.fields.label.value },
      ),
      footerText: fields.text({ label: "Line under the bubbles" }),
      footerLink: fields.text({ label: "Link at the end of that line (goes to /book-a-call)" }),
    },
    { label: "Industries" },
  ),

  services: fields.object(
    {
      eyebrow: fields.text({ label: "Small label above the heading" }),
      headingLine1: fields.text({ label: "Heading, first line" }),
      headingLine2: fields.text({ label: "Heading, coloured second line" }),
      intro: fields.text({ label: "Intro", multiline: true }),
      cards: fields.array(
        fields.object({
          title: fields.text({ label: "Title" }),
          description: fields.text({ label: "Text", multiline: true }),
          features: textList("Ticked points", "Point"),
          metricValue: fields.text({ label: "Figure at the bottom of the card" }),
          metricLabel: fields.text({ label: "Label for that figure" }),
        }),
        { label: "Service cards (3, each with its own number, colour and icon)", itemLabel: (props) => props.fields.title.value },
      ),
      button: fields.text({ label: "Button under the cards (goes to /book-a-call)" }),
      buttonNote: fields.text({ label: "Small text under the button" }),
      linkText: fields.text({ label: "Link under that: text" }),
      linkHref: fields.text({ label: "Link under that: address, e.g. /b2b-lead-generation-mumbai" }),
      stats: fields.array(stat("Figure (counts up, e.g. 3.2x, 18 days, 130+)"), {
        label: "Stats strip (3 fit the layout)",
        validation: { length: { max: 3 } },
        itemLabel: (props) => `${props.fields.value.value} ${props.fields.label.value}`,
      }),
    },
    { label: "Services" },
  ),

  systemFlow: fields.object(
    {
      eyebrow: fields.text({ label: "Small label above the heading" }),
      headingLine1: fields.text({ label: "Heading, first line" }),
      headingLine2: fields.text({ label: "Heading, coloured second line" }),
      intro: fields.text({ label: "Intro", multiline: true }),
      steps: fields.array(
        fields.object({
          title: fields.text({ label: "Title" }),
          description: fields.text({ label: "Text", multiline: true }),
        }),
        { label: "Steps (exactly 6: the diagram has six places)", validation: { length: { min: 6, max: 6 } }, itemLabel: (props) => props.fields.title.value },
      ),
      brandEyebrow: fields.text({ label: "Side panel: small label" }),
      brandBadge: fields.text({ label: "Side panel: badge" }),
      brandTitle: fields.text({ label: "Side panel: title" }),
      brandItems: fields.array(
        fields.object({
          title: fields.text({ label: "Title" }),
          description: fields.text({ label: "Text", multiline: true }),
        }),
        { label: "Side panel: points (3 fit the layout)", itemLabel: (props) => props.fields.title.value },
      ),
      resultEyebrow: fields.text({ label: "Result box: small label" }),
      resultHeading: fields.text({ label: "Result box: heading" }),
      resultText: fields.text({ label: "Result box: text", multiline: true }),
    },
    { label: "The Myntmore system (6 steps)" },
  ),

  benefits: fields.object(
    {
      eyebrow: fields.text({ label: "Small label above the heading" }),
      heading: fields.text({ label: "Heading" }),
      row1: textList("Scrolling chips, first row", "Chip"),
      row2: textList("Scrolling chips, second row", "Chip"),
      row3: textList("Scrolling chips, third row", "Chip"),
    },
    { label: "Benefits strip" },
  ),

  testimonials: fields.object(
    {
      headingLine1: fields.text({ label: "Heading, first line" }),
      headingLine2: fields.text({ label: "Heading, coloured second line" }),
      intro: fields.text({ label: "Intro", multiline: true }),
      badges: fields.array(
        fields.object({
          score: fields.text({ label: "Figure (verified numbers only)" }),
          label: fields.text({ label: "Label" }),
          icon: fields.select({
            label: "Icon",
            options: [
              { label: "Tick", value: "check" },
              { label: "Arrows in a circle", value: "repeat" },
              { label: "Rising line", value: "trend" },
            ],
            defaultValue: "check",
          }),
        }),
        { label: "Rating badges (up to 3)", validation: { length: { max: 3 } }, itemLabel: (props) => `${props.fields.score.value} ${props.fields.label.value}` },
      ),
      row1: fields.array(testimonial(), { label: "Testimonials, first scrolling row", itemLabel: (props) => `${props.fields.name.value}, ${props.fields.company.value}` }),
      row2: fields.array(testimonial(), { label: "Testimonials, second scrolling row", itemLabel: (props) => `${props.fields.name.value}, ${props.fields.company.value}` }),
      note: fields.text({ label: "Small print under the testimonials", multiline: true }),
    },
    { label: "Testimonials" },
  ),

  promise: fields.object(
    {
      eyebrow: fields.text({ label: "Small label" }),
      lead: fields.text({ label: "Typed heading: the fixed start, e.g. We book" }),
      typedEndings: textList("Typed heading: the endings that are typed out in turn", "Ending"),
    },
    { label: "Our promise (typed heading)" },
  ),

  faqSection: fields.object(
    {
      eyebrow: fields.text({ label: "Small label" }),
      heading: fields.text({ label: "Heading" }),
      intro: fields.text({ label: "Intro" }),
      nudge: fields.text({ label: "Line under the questions" }),
      link: fields.text({ label: "Link after that line (goes to /book-a-call)" }),
    },
    { label: "Questions and answers: headings (the questions themselves are under Homepage FAQs)" },
  ),

  closing: fields.object(
    {
      badge: fields.text({ label: "Badge" }),
      headingLine1: fields.text({ label: "Heading, first line" }),
      headingLine2: fields.text({ label: "Heading, coloured second line" }),
      textBefore: fields.text({ label: "Text: part before the bold words (keep the space at the end)" }),
      textBold: fields.text({ label: "Text: bold words" }),
      textAfter: fields.text({ label: "Text: part after the bold words (keep the space at the start)", multiline: true }),
      button: fields.text({ label: "Button (goes to /book-a-call)" }),
      note: fields.text({ label: "Small text under the button" }),
      ticks: textList("Ticked points at the bottom", "Point"),
    },
    { label: "Closing call to action" },
  ),
};

function testimonial() {
  return fields.object({
    name: fields.text({ label: "Name" }),
    role: fields.text({ label: "Role" }),
    company: fields.text({ label: "Company" }),
    initials: fields.text({ label: "Initials (shown in the circle)" }),
    color: fields.select({
      label: "Card colour",
      options: [
        { label: "Rose", value: "rose" },
        { label: "Sky", value: "sky" },
        { label: "Violet", value: "violet" },
        { label: "Mint", value: "mint" },
        { label: "Amber", value: "amber" },
        { label: "Blush", value: "blush" },
      ],
      defaultValue: "amber",
    }),
    quote: fields.text({ label: "Quote", multiline: true }),
    rating: fields.integer({ label: "Stars (1 to 5)", defaultValue: 5, validation: { min: 1, max: 5 } }),
  });
}
