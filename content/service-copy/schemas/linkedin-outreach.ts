import { fields } from "@keystatic/core";

const t = (label: string, description?: string) => fields.text({ label, description });
const para = (label: string, description?: string) => fields.text({ label, multiline: true, description });
const list = (label: string, itemLabel: string, description?: string) =>
  fields.array(fields.text({ label: itemLabel }), { label, description });

export const linkedinOutreachCopySchema = {
  schema: fields.object(
    {
      howToName: t("How-to schema name", "Machine-readable title for the four-step 'How we run it' timeline (search engines only)."),
      serviceName: t("Service schema name", "Machine-readable (search engines only)."),
      serviceDescription: para("Service schema description", "Machine-readable (search engines only)."),
      serviceType: t("Service schema type", "Machine-readable (search engines only)."),
    },
    { label: "Search-engine schema text (not visible on the page)" }
  ),

  hero: fields.object(
    {
      breadcrumbServices: t("Breadcrumb: Services label"),
      breadcrumbPage: t("Breadcrumb: this page label"),
      badge: t("Badge above the headline"),
      headlineStart: t("Headline, first line"),
      headlineBeforeEm: t("Headline, text before the highlighted word"),
      headlineEm: t("Headline, highlighted (underlined, blue italic) word"),
      headlineAfterEm: t("Headline, text after the highlighted word", "The gold full stop is added automatically."),
      subhead: para("Sub-headline"),
      primaryCtaLabel: t("Primary button label"),
      secondaryCtaLabel: t("Secondary button label (scrolls to the AI agents section)"),
    },
    { label: "Hero" }
  ),

  flowVisual: fields.object(
    {
      nodes: fields.array(
        fields.object({
          label: t("Title"),
          caption: t("Caption"),
        }),
        {
          label: "Hero diagram steps (exactly 4, in order: buyers, personal touch, conversations, booked meetings)",
          itemLabel: (props) => props.fields.label.value || "Step",
        }
      ),
      aiBadge: t("Floating badge: AI agents"),
      safetyBadge: t("Floating badge: account safety"),
    },
    { label: "Hero diagram (animated flow)" }
  ),

  numbers: fields.object(
    {
      stats: fields.array(
        fields.object({
          value: t("Value", "Animated number, e.g. 45%, 13.57x, 90 min."),
          label: t("Caption"),
        }),
        {
          label: "Stat tiles (layout fits 4)",
          itemLabel: (props) => props.fields.value.value || "Stat",
        }
      ),
      pills: list("Trust pills under the stats", "Pill text"),
    },
    { label: "Numbers strip" }
  ),

  reputation: fields.object(
    {
      eyebrow: t("Eyebrow"),
      headlineStart: t("Headline, first part"),
      headlineEm: t("Headline, blue italic part"),
      subhead: t("Sub-headline"),
      cards: fields.array(
        fields.object({
          number: t("Large background number"),
          eyebrow: t("Small label"),
          title: t("Card title"),
          text: para("Card text"),
        }),
        {
          label: "Two cards (exactly 2: reputation, then pipeline)",
          itemLabel: (props) => props.fields.title.value || "Card",
        }
      ),
      closingStart: t("Closing line, first part"),
      closingEm: t("Closing line, blue italic part"),
    },
    { label: "Reputation + pipeline section" }
  ),

  comparison: fields.object(
    {
      eyebrow: t("Eyebrow"),
      headlineStart: t("Headline, first part"),
      headlineEm: t("Headline, blue italic part"),
      columnWhatYouGet: t("Table column heading: first column"),
      columnMyntmore: t("Table column heading: Myntmore"),
      columnOthers: t("Table column heading: other agencies"),
      basicsGroupLabel: t("Group label above the first 3 rows"),
      skippedGroupLabel: t("Group label above rows 4 onwards"),
      rows: fields.array(
        fields.object({
          label: t("Row label"),
          othersDoIt: fields.checkbox({ label: "Other agencies do this too", defaultValue: false }),
        }),
        {
          label: "Comparison rows (the first 3 sit under 'The basics' and the rest under 'What most agencies skip': keep 3 basics first)",
          itemLabel: (props) => props.fields.label.value || "Row",
        }
      ),
    },
    { label: "Comparison table" }
  ),

  agents: fields.object(
    {
      eyebrow: t("Eyebrow"),
      headlineStart: t("Headline, first part"),
      headlineEm: t("Headline, blue italic part"),
      subhead: para("Sub-headline"),
      footerText: para("Strip below the agents: text"),
      footerLinkLabel: t("Strip below the agents: link label"),
      footerLinkHref: t("Strip below the agents: link address"),
      agentLabel: t("Word before the agent number (Agent 1, Agent 2 ...)"),
      resultLabel: t("Heading of the yellow 'result' box"),
      playLabel: t("Button label when auto-advance is paused"),
      pauseLabel: t("Button label when auto-advance is playing"),
      items: fields.array(
        fields.object({
          title: t("Agent title"),
          summary: para("Summary"),
          points: list("Checklist points", "Point"),
          result: t("Result line"),
        }),
        {
          label: "AI agents (exactly 6: each has its own icon and animation in order, so keep the order and count)",
          itemLabel: (props) => props.fields.title.value || "Agent",
        }
      ),
      illustrations: fields.object(
        {
          targetingChips: list("Agent 1 animation: three chips (exactly 3)", "Chip"),
          targetingCaption: t("Agent 1 animation: caption"),
          priorityTags: list("Agent 2 animation: four row tags (exactly 4, top to bottom)", "Tag"),
          prospectingFields: list("Agent 3 animation: four field labels (exactly 4)", "Field"),
          competitorRivalA: t("Agent 4 animation: first rival bar label"),
          competitorRivalB: t("Agent 4 animation: second rival bar label"),
          competitorYou: t("Agent 4 animation: your bar label"),
          competitorChip: t("Agent 4 animation: floating chip"),
          engagementBadge: t("Agent 5 animation: badge"),
          scaleGreeting: t("Agent 6 animation: greeting word"),
          scaleTokens: list("Agent 6 animation: three personalisation tokens (exactly 3)", "Token"),
        },
        { label: "Text inside the agent animations" }
      ),
    },
    { label: "AI agents explorer" }
  ),

  included: fields.object(
    {
      eyebrow: t("Eyebrow"),
      headlineStart: t("Headline, first part"),
      headlineEm: t("Headline, blue italic part"),
      subhead: t("Sub-headline"),
      items: fields.array(
        fields.object({
          label: t("Title"),
          text: t("Description"),
        }),
        {
          label: "What's included cards (exactly 8: each has its own icon in order)",
          itemLabel: (props) => props.fields.label.value || "Card",
        }
      ),
    },
    { label: "What's included" }
  ),

  process: fields.object(
    {
      eyebrow: t("Eyebrow"),
      headlineStart: t("Headline, first part"),
      headlineEm: t("Headline, blue italic part"),
      steps: fields.array(
        fields.object({
          number: t("Step number badge"),
          title: t("Step title"),
          text: para("Step text"),
        }),
        {
          label: "Timeline steps (exactly 4)",
          itemLabel: (props) => props.fields.title.value || "Step",
        }
      ),
      playbookIntro: t("Line under the timeline"),
      playbookLinkLabel: t("Link text"),
      playbookLinkHref: t("Link address"),
    },
    { label: "How we run it" }
  ),

  beforeWeStart: fields.object(
    {
      eyebrow: t("Eyebrow"),
      headlineStart: t("Headline, first part"),
      headlineEm: t("Headline, italic part"),
      notes: fields.array(
        fields.object({
          title: t("Title"),
          text: para("Text"),
        }),
        {
          label: "Notes (exactly 5: each has its own icon in order)",
          itemLabel: (props) => props.fields.title.value || "Note",
        }
      ),
      yourPart: fields.object(
        {
          label: t("Small label"),
          value: t("Animated number"),
          unit: t("Unit after the number"),
          text: t("Text under the number"),
          youLabel: t("Bar label: you"),
          usLabel: t("Bar label: us"),
        },
        { label: "Yellow 'Your part' tile" }
      ),
    },
    { label: "Before we start" }
  ),

  proof: fields.object(
    {
      eyebrow: t("Eyebrow"),
      headline: t("Headline"),
      disclaimer: para("Confidentiality note"),
      ctaLabel: t("Button label"),
      ctaHref: t("Button address"),
    },
    { label: "See the proof" }
  ),

  faq: fields.object(
    {
      badge: t("FAQ badge"),
      title: t("FAQ heading", "The questions themselves are edited in the page FAQs section, not here."),
    },
    { label: "FAQ heading" }
  ),

  relatedPath: fields.object(
    {
      heading: t("Heading"),
      intro: t("Intro line"),
    },
    { label: "Related path block" }
  ),

  outcomes: fields.object(
    {
      eyebrow: t("Eyebrow"),
      headlineStart: t("Headline, first part"),
      headlineEm: t("Headline, blue italic part"),
      items: fields.array(
        fields.object({
          title: t("Title"),
          text: para("Text"),
        }),
        {
          label: "Outcome cards (exactly 6: each has its own icon in order)",
          itemLabel: (props) => props.fields.title.value || "Outcome",
        }
      ),
    },
    { label: "What changes" }
  ),

  founder: fields.object(
    {
      eyebrow: t("Eyebrow"),
      imageAlt: t("Photo alt text"),
      name: t("Name"),
      profileHref: t("Name link (LinkedIn profile)"),
      role: t("Role line"),
      bioBeforeLink: para("Bio, text before the link", "Do not end with a space; one is added before the link."),
      bioLinkLabel: t("Bio link text"),
      bioLinkHref: t("Bio link address"),
      bioAfterLink: t("Bio, text after the link"),
      stats: list("Credential pills", "Pill text"),
    },
    { label: "Meet the founder" }
  ),

  finalCta: fields.object(
    {
      eyebrow: t("Eyebrow"),
      headlineStart: t("Headline, first part"),
      headlineEm: t("Headline, italic part"),
      subhead: t("Sub-headline"),
      primaryLabel: t("Primary button label (goes to the booking page)"),
      secondaryLabel: t("Secondary button label"),
      secondaryHref: t("Secondary button address"),
    },
    { label: "Final call to action" }
  ),
};
