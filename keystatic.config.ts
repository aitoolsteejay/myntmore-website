import { collection, config, fields, singleton } from "@keystatic/core";
import { coldEmailCopySchema } from "./content/service-copy/schemas/cold-email";
import { linkedinOutreachCopySchema } from "./content/service-copy/schemas/linkedin-outreach";
import { doItYourselfCopySchema } from "./content/service-copy/schemas/do-it-yourself";
import { ecommerceConversionPlaybookCaseSchema } from "./content/case-study-long/schemas/ecommerce-conversion-playbook";
import { predictableB2BLeadGenEngineCaseSchema } from "./content/case-study-long/schemas/predictable-b2b-lead-gen-engine";
import { founderPersonalBrandLinkedinCaseSchema } from "./content/case-study-long/schemas/founder-personal-brand-linkedin";
import { professionalServicesLinkedinCaseSchema } from "./content/case-study-long/schemas/professional-services-linkedin";
import { saasSeriesACaseSchema } from "./content/case-study-long/schemas/saas-series-a";
import { ukPharmaQualifiedMeetingsCaseSchema } from "./content/case-study-long/schemas/uk-pharma-qualified-meetings";
import { specialistRecruitmentLinkedinLeadsCaseSchema } from "./content/case-study-long/schemas/specialist-recruitment-linkedin-leads";
import { medicalTourismPlatformPipelineCaseSchema } from "./content/case-study-long/schemas/medical-tourism-platform-pipeline";
import { heritageJewelleryValuationPipelineCaseSchema } from "./content/case-study-long/schemas/heritage-jewellery-valuation-pipeline";
import { leadershipDevelopmentMessagingShiftCaseSchema } from "./content/case-study-long/schemas/leadership-development-messaging-shift";
import { retailStrategyDesignPipelineCaseSchema } from "./content/case-study-long/schemas/retail-strategy-design-pipeline";
import { wealthManagementPmsPipelineCaseSchema } from "./content/case-study-long/schemas/wealth-management-pms-pipeline";

// Content lives as files in the repo.
//  - Homepage FAQs: JSON files. `npm run faqs:build` (run by prebuild) turns
//    them into lib/faq-content.generated.json, which lib/faq-data.ts
//    re-exports, so the FAQ components and FAQPage JSON-LD read the same data
//    they always did.
//  - Page FAQs: one JSON file per page (service, city, landing, guide, blog
//    post, tool). The page reads its list through lib/page-faqs.ts.
//  - Landing pages (ICP): one JSON file per page. `npm run landing-pages:build`
//    (run by prebuild) writes app/lp/<slug>/page.tsx; components/lp/LandingPage.tsx
//    renders it.
//  - Service pages: one JSON file per /services/<slug> page. `npm run service-pages:build` (run by prebuild)
//    writes the thin page (literal metadata). The five template services (ABM, AI lead generation, GTM, personal
//    branding, ICP mapping) read their copy from the JSON; cold email, LinkedIn outreach and the self-serve tool keep
//    their copy in their components for now and only their search/share metadata is in the JSON.
//  - City pages: one JSON file per /b2b-lead-generation-<city> page. `npm run city-pages:build` (run by prebuild)
//    writes the page; components/city/CityPage.tsx renders it. Every city page uses it.
//  - Case studies (detailed): one JSON file per page that uses CaseStudyLayout. `npm run case-study-pages:build`
//    (run by prebuild) writes the page, the listing card and the sitemap entry.
//  - Long-form case studies: the other twelve case study pages, each with its own layout. One JSON file each in
//    content/case-study-long/; `npm run case-study-long:build` (run by prebuild) writes the thin page and
//    components/case-studies/long/<slug>.tsx renders the copy. Each is a singleton in the admin.
//  - Case studies: JSON files. `npm run case-studies:content` rebuilds
//    lib/case-study-library.json, then `case-studies:build` writes each page and
//    its sitemap entry (both run by prebuild).
//  - Glossary terms: one JSON file per term. `npm run glossary:build` (run by prebuild) writes each
//    term page, the A-Z index cards and the sitemap entries. All 51 terms are CMS terms; the longer-form ones use "Sections".
//  - Blog posts: .mdoc files read at build time by lib/cms-posts.ts and
//    rendered by app/resources/blogs/[slug]/page.tsx (served at /resources/blogs/<slug>).
//    All blog posts are CMS posts; there are no hand-built blog pages.
//
// Storage: local files while developing. Set NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO
// ("owner/name") plus the GitHub app variables (see docs/cms-setup.md) and the
// same admin works on the live site, saving each edit as a commit.
const githubRepo = process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO as `${string}/${string}` | undefined;

export default config({
  storage: githubRepo ? { kind: "github", repo: githubRepo } : { kind: "local" },
  collections: {
    pageSeo: collection({
      label: "Page search titles",
      path: "content/page-seo/*",
      format: "json",
      slugField: "path",
      columns: ["title"],
      schema: {
        path: fields.slug({
          name: {
            label: "Page address",
            description: "The page this applies to, e.g. /about-us (the homepage is /). Do not change it: a developer connects each address to its page once, and the build warns about pages that have no entry.",
            validation: { isRequired: true },
          },
        }),
        title: fields.text({
          label: "Search title",
          description: "The title Google shows, exactly as typed, including \" | Myntmore\". Aim for 60 characters or fewer; Google cuts longer titles.",
          validation: { isRequired: true, length: { max: 70 } },
        }),
        description: fields.text({
          label: "Search description",
          description: "The snippet under the title in Google. 120 to 155 characters works best.",
          multiline: true,
          validation: { isRequired: true, length: { max: 170 } },
        }),
      },
    }),

    homepageFaqs: collection({
      label: "Homepage FAQs",
      path: "content/faqs/homepage/*",
      format: "json",
      slugField: "question",
      schema: {
        question: fields.slug({
          name: { label: "Question", validation: { isRequired: true } },
        }),
        answer: fields.text({
          label: "Answer",
          description:
            "Answer first, 40 to 60 words. Plain text only: it is also used in the FAQPage structured data.",
          multiline: true,
          validation: { isRequired: true },
        }),
        order: fields.integer({
          label: "Order",
          description: "Lowest number shows first.",
          validation: { isRequired: true },
        }),
        links: fields.array(
          fields.object({
            label: fields.text({ label: "Link text" }),
            href: fields.text({ label: "Link path, e.g. /services" }),
          }),
          {
            label: "Links under the answer (optional)",
            itemLabel: (props) => props.fields.label.value,
          }
        ),
      },
    }),

    pageFaqs: collection({
      label: "Page FAQs",
      path: "content/faqs/pages/*",
      format: "json",
      slugField: "page",
      schema: {
        page: fields.slug({
          name: {
            label: "Page",
            description: "Which page these questions belong to. Pick the existing entry for that page; do not create a new one unless a developer has added the page.",
            validation: { isRequired: true },
          },
        }),
        items: fields.array(
          fields.object({
            question: fields.text({ label: "Question", validation: { isRequired: true } }),
            answer: fields.text({
              label: "Answer",
              description: "Answer first, 40 to 60 words, plain text. It is also used in the page's FAQPage structured data.",
              multiline: true,
              validation: { isRequired: true },
            }),
          }),
          {
            label: "Questions (drag to reorder)",
            itemLabel: (props) => props.fields.question.value,
          }
        ),
      },
    }),

    landingPages: collection({
      label: "Landing pages (ICP)",
      path: "content/landing-pages/*",
      format: "json",
      slugField: "slug",
      schema: {
        slug: fields.slug({
          name: {
            label: "Page address",
            description: "The page lives at /lp/<address>. It cannot be changed after the first save. A page is only included in the sitemap once a developer adds its line to app/sitemap.ts.",
            validation: { isRequired: true },
          },
        }),

        metaTitle: fields.text({
          label: "Search title",
          description: "Shown in Google. Up to 49 characters (the site adds \" | Myntmore\").",
          validation: { isRequired: true, length: { max: 49 } },
        }),
        metaDescription: fields.text({
          label: "Search description",
          description: "120 to 155 characters.",
          multiline: true,
          validation: { isRequired: true, length: { max: 155 } },
        }),
        keywords: fields.array(fields.text({ label: "Keyword" }), {
          label: "Keywords (one search phrase each)",
          itemLabel: (props) => props.value,
        }),
        ogTitle: fields.text({ label: "Share title (LinkedIn, WhatsApp)", validation: { isRequired: true } }),
        ogDescription: fields.text({ label: "Share description", multiline: true, validation: { isRequired: true } }),

        breadcrumbLabel: fields.text({ label: "Breadcrumb label", validation: { isRequired: true } }),
        badge: fields.text({ label: "Hero badge", description: "The small pill above the headline.", validation: { isRequired: true } }),
        badgeEffect: fields.select({
          label: "Hero badge effect",
          description: "Radar adds an animated ping ring around the badge.",
          options: [
            { label: "Plain badge", value: "" },
            { label: "Radar ping", value: "radar" },
          ],
          defaultValue: "",
        }),
        h1Line1: fields.text({ label: "Headline, line 1 (optional)", description: "Leave empty for a one-line headline." }),
        h1Before: fields.text({ label: "Headline, line 2: text before the underlined words (optional)" }),
        h1Underlined: fields.text({ label: "Headline, line 2: underlined words", validation: { isRequired: true } }),
        h1After: fields.text({ label: "Headline, line 2: text after the underlined words", validation: { isRequired: true } }),
        h1BreakAfter: fields.checkbox({ label: "Line break comes right after the underlined words (instead of before them)", defaultValue: false }),
        underlineWidth: fields.integer({ label: "Underline width (400 for long, 380 or 300 for shorter underlined words)", validation: { isRequired: true, min: 200, max: 500 }, defaultValue: 400 }),
        heroSubheading: fields.text({ label: "Hero subheading", multiline: true, validation: { isRequired: true } }),
        primaryCta: fields.text({ label: "Main button label", validation: { isRequired: true } }),
        secondaryCta: fields.text({ label: "Second button label", validation: { isRequired: true } }),
        heroNote: fields.text({ label: "Small note under the buttons", validation: { isRequired: true } }),
        floaterLayout: fields.select({
          label: "Floating emoji layout",
          description: "Where the emoji float in the hero: four icons, or one of two three-icon arrangements.",
          options: [
            { label: "Four icons", value: "four" },
            { label: "Three icons (A)", value: "three-a" },
            { label: "Three icons (B)", value: "three-b" },
          ],
          defaultValue: "four",
        }),
        heroDecoration: fields.select({
          label: "Extra hero graphic",
          description: "Optional decoration in the hero. \"Trade route\" draws a dashed route with an animated plane.",
          options: [
            { label: "None", value: "" },
            { label: "Trade route", value: "trade-route" },
          ],
          defaultValue: "",
        }),
        floatingIcons: fields.array(fields.text({ label: "Emoji" }), {
          label: "Floating emoji in the hero (4 for the four-icon layout, 3 for the others)",
          validation: { length: { min: 3, max: 4 } },
          itemLabel: (props) => props.value,
        }),

        statsCaption: fields.text({ label: "Small caption above the stats row (optional; changes the row layout)" }),
        stats: fields.array(
          fields.object({
            icon: fields.text({ label: "Emoji" }),
            prefix: fields.text({ label: "Before the number, e.g. ₹" }),
            target: fields.number({ label: "Number (counts up to this)", validation: { isRequired: true } }),
            decimals: fields.integer({ label: "Decimal places (0 or 1)", validation: { isRequired: true, min: 0, max: 1 }, defaultValue: 0 }),
            suffix: fields.text({ label: "After the number, e.g. +, %, ×, Cr+" }),
            label: fields.text({ label: "Caption", validation: { isRequired: true } }),
          }),
          {
            label: "Stats row (exactly 4)",
            validation: { length: { min: 4, max: 4 } },
            itemLabel: (props) => props.fields.label.value,
          }
        ),

        painEyebrow: fields.text({ label: "Pain section label (small text above the heading)", validation: { isRequired: true } }),
        painTitle: fields.text({ label: "Pain section heading", validation: { isRequired: true } }),
        pain: fields.array(
          fields.object({
            icon: fields.text({ label: "Emoji" }),
            heading: fields.text({ label: "Heading", validation: { isRequired: true } }),
            body: fields.text({ label: "Text", multiline: true, validation: { isRequired: true } }),
          }),
          { label: "Pain cards (exactly 3)", validation: { length: { min: 3, max: 3 } }, itemLabel: (props) => props.fields.heading.value }
        ),

        flowBadge: fields.text({ label: "Flow diagram label (small text above the title)", validation: { isRequired: true } }),
        flowTitle: fields.text({ label: "Flow diagram title (a new line splits it in two)", multiline: true, validation: { isRequired: true } }),
        flowTop: fields.array(
          fields.object({
            icon: fields.text({ label: "Emoji" }),
            title: fields.text({ label: "Step title", validation: { isRequired: true } }),
            body: fields.text({ label: "Text", multiline: true, validation: { isRequired: true } }),
          }),
          { label: "Flow steps 1 to 3 (exactly 3)", validation: { length: { min: 3, max: 3 } }, itemLabel: (props) => props.fields.title.value }
        ),
        flowParallelLabel: fields.text({ label: "Side track label", validation: { isRequired: true } }),
        flowParallel: fields.array(
          fields.object({
            icon: fields.text({ label: "Emoji" }),
            title: fields.text({ label: "Title", validation: { isRequired: true } }),
            body: fields.text({ label: "Text", multiline: true, validation: { isRequired: true } }),
          }),
          { label: "Side track items (exactly 3)", validation: { length: { min: 3, max: 3 } }, itemLabel: (props) => props.fields.title.value }
        ),
        flowBottom: fields.array(
          fields.object({
            icon: fields.text({ label: "Emoji" }),
            title: fields.text({ label: "Step title", validation: { isRequired: true } }),
            body: fields.text({ label: "Text", multiline: true, validation: { isRequired: true } }),
          }),
          { label: "Flow steps 4 to 6 (exactly 3)", validation: { length: { min: 3, max: 3 } }, itemLabel: (props) => props.fields.title.value }
        ),

        processEyebrow: fields.text({ label: "How-it-works label (small text above the heading)", validation: { isRequired: true } }),
        processTitle: fields.text({ label: "How-it-works heading", validation: { isRequired: true } }),
        process: fields.array(
          fields.object({
            title: fields.text({ label: "Title", validation: { isRequired: true } }),
            body: fields.text({ label: "Text", multiline: true, validation: { isRequired: true } }),
          }),
          { label: "How-it-works steps (exactly 4)", validation: { length: { min: 4, max: 4 } }, itemLabel: (props) => props.fields.title.value }
        ),

        trackStyle: fields.select({
          label: "Results section style",
          description: "Four counting numbers, three case-study cards with result pills, or no results section.",
          options: [
            { label: "Four counters", value: "counters" },
            { label: "Case-study cards", value: "case-cards" },
            { label: "None", value: "none" },
          ],
          defaultValue: "counters",
        }),
        caseCards: fields.array(
          fields.object({
            tag: fields.text({ label: "Label", validation: { isRequired: true } }),
            headline: fields.text({ label: "Headline", validation: { isRequired: true } }),
            body: fields.text({ label: "Text", multiline: true, validation: { isRequired: true } }),
            results: fields.array(fields.text({ label: "Result" }), { label: "Result pills", itemLabel: (props) => props.value }),
            href: fields.text({ label: "Case study link (optional), e.g. /case-studies/financial-services-uk-bookkeeping" }),
          }),
          { label: "Case-study cards (exactly 3; used when the results style is Case-study cards)", validation: { length: { max: 3 } }, itemLabel: (props) => props.fields.tag.value }
        ),
        trackEyebrow: fields.text({ label: "Track record label (small text above the heading)", description: "Leave empty when the results section style is None." }),
        trackTitle: fields.text({ label: "Track record heading", description: "Leave empty when the results section style is None." }),
        trackLinkText: fields.text({ label: "Link under the track record cards: text (optional)" }),
        trackLinkHref: fields.text({ label: "Link under the track record cards: address (optional)" }),
        track: fields.array(
          fields.object({
            icon: fields.text({ label: "Emoji" }),
            prefix: fields.text({ label: "Before the number, e.g. $" }),
            target: fields.number({ label: "Number (counts up to this)", validation: { isRequired: true } }),
            suffix: fields.text({ label: "After the number, e.g. K+, %, M+,  days" }),
            label: fields.text({ label: "Caption", validation: { isRequired: true } }),
          }),
          {
            label: "Track record numbers (exactly 4 when the results style is Four counters, otherwise empty; keep them in step with lib/entity-facts.json)",
            validation: { length: { max: 4 } },
            itemLabel: (props) => props.fields.label.value,
          }
        ),

        scenariosEyebrow: fields.text({ label: "Scenario cards label (leave all scenario fields empty to hide the section)" }),
        scenariosTitle: fields.text({ label: "Scenario cards heading" }),
        scenariosIntro: fields.text({ label: "Scenario cards intro", multiline: true }),
        scenarios: fields.array(
          fields.object({
            tag: fields.text({ label: "Label (e.g. the market)", validation: { isRequired: true } }),
            headline: fields.text({ label: "Headline", validation: { isRequired: true } }),
            body: fields.text({ label: "Text", multiline: true, validation: { isRequired: true } }),
          }),
          { label: "Scenario cards (exactly 3, or none)", validation: { length: { max: 3 } }, itemLabel: (props) => props.fields.tag.value }
        ),
        whyEyebrow: fields.text({ label: "\"Why this works\" label (leave all these fields empty to hide the section)" }),
        whyTitle: fields.text({ label: "\"Why this works\" heading" }),
        whyIntro: fields.text({ label: "\"Why this works\" intro", multiline: true }),
        whyCards: fields.array(
          fields.object({
            icon: fields.text({ label: "Emoji" }),
            title: fields.text({ label: "Title", validation: { isRequired: true } }),
            body: fields.text({ label: "Text", multiline: true, validation: { isRequired: true } }),
          }),
          { label: "\"Why this works\" cards (exactly 3, or none)", validation: { length: { max: 3 } }, itemLabel: (props) => props.fields.title.value }
        ),
        faqTitle: fields.text({ label: "FAQ heading (the questions are under Page FAQs)", validation: { isRequired: true } }),
        ctaHeading: fields.text({ label: "Closing call to action: heading", validation: { isRequired: true } }),
        ctaBody: fields.text({ label: "Closing call to action: text", multiline: true, validation: { isRequired: true } }),
        formHeading: fields.text({ label: "Form heading", validation: { isRequired: true } }),
        formBody: fields.text({ label: "Form intro text", multiline: true, validation: { isRequired: true } }),
        namePlaceholder: fields.text({ label: "Name field example", validation: { isRequired: true } }),
        designationPlaceholder: fields.text({ label: "Designation field example", validation: { isRequired: true } }),
        phonePlaceholder: fields.text({ label: "Phone field example", validation: { isRequired: true } }),
        companyLabel: fields.text({ label: "Company field label", validation: { isRequired: true } }),
        companyPlaceholder: fields.text({ label: "Company field example", validation: { isRequired: true } }),
        emailPlaceholder: fields.text({ label: "Email field example", validation: { isRequired: true } }),
        submitLabel: fields.text({ label: "Submit button label", validation: { isRequired: true } }),
        formNote: fields.text({ label: "Note under the submit button", validation: { isRequired: true } }),
      },
    }),

    servicePages: collection({
      label: "Service pages",
      path: "content/service-pages/*",
      format: "json",
      slugField: "slug",
      schema: {
        slug: fields.slug({
          name: {
            label: "Service key",
            description: "The page lives at /services/<service key>. It cannot be changed after the first save. Each service has its own hand-written layout, so do not create a new one here: a new service also needs a component and an entry in scripts/generate-service-pages.mjs.",
            validation: { isRequired: true },
          },
        }),
        metaTitle: fields.text({ label: "Search title", description: "Aim for 49 characters or fewer (the site adds \" | Myntmore\"); Google cuts long titles.", validation: { isRequired: true, length: { max: 70 } } }),
        metaDescription: fields.text({ label: "Search description", multiline: true, validation: { isRequired: true, length: { max: 160 } } }),
        keywords: fields.array(fields.text({ label: "Keyword" }), { label: "Keywords (one search phrase each)", itemLabel: (props) => props.value }),
        ogTitle: fields.text({ label: "Share title (LinkedIn, WhatsApp)", validation: { isRequired: true } }),
        ogDescription: fields.text({ label: "Share description", multiline: true, validation: { isRequired: true } }),
        schemaName: fields.text({ label: "Structured data: service name" }),
        schemaDescription: fields.text({ label: "Structured data: service description (shown to search engines)", multiline: true }),
        schemaServiceType: fields.text({ label: "Structured data: service type" }),
        howToName: fields.text({ label: "Structured data: \"how it works\" title" }),
        breadcrumbLabel: fields.text({ label: "Breadcrumb label" }),
        badge: fields.text({ label: "Hero badge" }),
        h1: fields.array(fields.text({ label: "Headline piece", multiline: true }), { label: "Headline (H1), in the pieces the page lays out (underlined word and line break positions are fixed by the layout)", itemLabel: (props) => props.value }),
        heroIntro: fields.text({ label: "Hero intro", multiline: true }),
        ctaPrimary: fields.text({ label: "Main button label" }),
        ctaSecondary: fields.text({ label: "Second button label" }),
        stats: fields.array(
          fields.object({ init: fields.text({ label: "Figure, e.g. 6.4x" }), label: fields.text({ label: "Caption" }) }),
          { label: "Stats strip (exactly 3). Where the figure animates, it counts up to the value built into the layout.", validation: { length: { max: 3 } }, itemLabel: (props) => props.fields.init.value }
        ),
        statsNote: fields.text({ label: "Note under the stats strip (only some pages show it)" }),
        benefits: fields.array(fields.text({ label: "Chip" }), { label: "Scrolling benefit chips", itemLabel: (props) => props.value }),
        problemTitle: fields.text({ label: "\"The Problem\" heading" }),
        problemPoints: fields.array(fields.text({ label: "Point", multiline: true }), { label: "\"The Problem\" points", itemLabel: (props) => props.value.slice(0, 60) }),
        solutionTitle: fields.text({ label: "\"The Myntmore Way\" heading" }),
        solutionPoints: fields.array(fields.text({ label: "Point", multiline: true }), { label: "\"The Myntmore Way\" points", itemLabel: (props) => props.value.slice(0, 60) }),
        processIntro: fields.text({ label: "\"How it works\" intro (only some pages show it)", multiline: true }),
        steps: fields.array(
          fields.object({
            n: fields.text({ label: "Number, e.g. 01" }),
            title: fields.text({ label: "Title" }),
            desc: fields.text({ label: "Text", multiline: true }),
          }),
          { label: "Steps", itemLabel: (props) => props.fields.title.value }
        ),
        deliverables: fields.array(fields.text({ label: "Item", multiline: true }), { label: "\"Every engagement includes\" list", itemLabel: (props) => props.value.slice(0, 60) }),
        whoForTitle: fields.text({ label: "\"Who it's for\" heading" }),
        whoFor: fields.array(
          fields.object({
            icon: fields.text({ label: "Emoji" }),
            title: fields.text({ label: "Title" }),
            desc: fields.text({ label: "Text", multiline: true }),
          }),
          { label: "Who it's for (cards)", itemLabel: (props) => props.fields.title.value }
        ),
        notFor: fields.array(fields.text({ label: "Point", multiline: true }), { label: "\"This isn't the right fit if\" list", itemLabel: (props) => props.value.slice(0, 60) }),
        trackIntro: fields.text({ label: "Track record: sentence before the bold part" }),
        trackStrong: fields.text({ label: "Track record: bold part" }),
        trackRest: fields.text({ label: "Track record: sentence after the bold part (keep its leading space)" }),
        trackHref: fields.text({ label: "Track record: link address, e.g. /case-studies" }),
        trackLinkText: fields.text({ label: "Track record: link text" }),
        resultsBadge: fields.text({ label: "Client results block: badge (GTM Strategy only)" }),
        resultsTitle: fields.text({ label: "Client results block: heading" }),
        resultsText: fields.text({ label: "Client results block: story", multiline: true }),
        results: fields.array(
          fields.object({ v: fields.text({ label: "Figure" }), l: fields.text({ label: "Caption" }) }),
          { label: "Client results block: figures (exactly 3)", validation: { length: { max: 3 } }, itemLabel: (props) => props.fields.v.value }
        ),
        resultsHref: fields.text({ label: "Client results block: link address" }),
        resultsLinkText: fields.text({ label: "Client results block: link text" }),
        ctaTitle: fields.array(fields.text({ label: "Headline piece" }), { label: "Closing headline: first line, then the coloured second line", itemLabel: (props) => props.value }),
        ctaIntro: fields.array(fields.text({ label: "Text piece", multiline: true }), { label: "Closing paragraph, in the pieces the page lays out (a piece in bold sits between two others)", itemLabel: (props) => props.value.slice(0, 60) }),
        ctaButton: fields.text({ label: "Closing button label" }),
        ctaNote: fields.text({ label: "Small print under the closing button" }),
        ctaChecks: fields.array(fields.text({ label: "Item" }), { label: "Three ticks under the closing button", itemLabel: (props) => props.value }),
      },
    }),
    cityPages: collection({
      label: "City pages",
      path: "content/city-pages/*",
      format: "json",
      slugField: "slug",
      schema: {
        slug: fields.slug({
          name: {
            label: "City key",
            description: "The page lives at /b2b-lead-generation-<city key>. It cannot be changed after the first save. A new city also needs a line in app/sitemap.ts and its questions under Page FAQs (city-<key>); the build warns if either is missing.",
            validation: { isRequired: true },
          },
        }),
        metaTitle: fields.text({ label: "Search title", description: "Aim for 49 characters or fewer (the site adds \" | Myntmore\"); Google cuts long titles.", validation: { isRequired: true, length: { max: 70 } } }),
        metaDescription: fields.text({ label: "Search description", multiline: true, validation: { isRequired: true, length: { max: 160 } } }),
        keywords: fields.array(fields.text({ label: "Keyword" }), { label: "Keywords (one search phrase each)", itemLabel: (props) => props.value }),
        ogTitle: fields.text({ label: "Share title (LinkedIn, WhatsApp)", validation: { isRequired: true } }),
        ogDescription: fields.text({ label: "Share description", multiline: true, validation: { isRequired: true } }),
        breadcrumbLabel: fields.text({ label: "Breadcrumb label", validation: { isRequired: true } }),
        country: fields.text({ label: "Country", description: "Only for cities outside India (for example United Arab Emirates). Leave empty for Indian cities." }),
        badge: fields.text({ label: "Hero badge", validation: { isRequired: true } }),
        emoji: fields.text({ label: "City emoji", description: "Shown in the hero badge, before the badge text." }),
        floatingIcons: fields.array(fields.text({ label: "Emoji" }), { label: "Floating hero emojis (up to 4, shown on desktop)", itemLabel: (props) => props.value }),
        hubs: fields.array(fields.text({ label: "Area" }), { label: "Business areas (the scrolling strip under the hero)", itemLabel: (props) => props.value }),
        h1: fields.text({ label: "Headline (H1)", validation: { isRequired: true } }),
        intro: fields.text({ label: "Hero intro", multiline: true, validation: { isRequired: true } }),
        primaryCta: fields.text({ label: "Main button label", validation: { isRequired: true } }),
        secondaryCta: fields.text({ label: "Second button label", validation: { isRequired: true } }),
        whyTitle: fields.text({ label: "\"Why this city\" heading", validation: { isRequired: true } }),
        why: fields.array(
          fields.object({ icon: fields.text({ label: "Emoji" }), title: fields.text({ label: "Title", validation: { isRequired: true } }), desc: fields.text({ label: "Text", multiline: true, validation: { isRequired: true } }) }),
          { label: "\"Why this city\" cards (exactly 3)", validation: { length: { min: 3, max: 3 } }, itemLabel: (props) => props.fields.title.value }
        ),
        proofTitle: fields.text({ label: "Proof heading (leave the case study list empty to hide the block)" }),
        proofIntro: fields.text({ label: "Proof intro", multiline: true }),
        proof: fields.array(
          fields.object({
            label: fields.text({ label: "Case study title", validation: { isRequired: true } }),
            href: fields.text({ label: "Address, e.g. /case-studies/saas-series-a", validation: { isRequired: true } }),
            result: fields.text({ label: "The result, in one or two sentences, as the case study states it", multiline: true, validation: { isRequired: true } }),
          }),
          { label: "Case studies from this city's industries (real ones only; do not describe a client as local unless it is)", itemLabel: (props) => props.fields.label.value }
        ),
        proofNote: fields.text({ label: "Note under the case studies (use [link text](/address) for links)", multiline: true }),
        segmentsTitle: fields.text({ label: "\"Who we generate leads for\" heading (leave the whole block empty to hide it)" }),
        segmentsIntro: fields.text({ label: "\"Who we generate leads for\" intro", multiline: true }),
        segments: fields.array(
          fields.object({ icon: fields.text({ label: "Emoji" }), title: fields.text({ label: "Title", validation: { isRequired: true } }), desc: fields.text({ label: "Text", multiline: true, validation: { isRequired: true } }) }),
          { label: "Segment cards (exactly 3, or none)", validation: { length: { max: 3 } }, itemLabel: (props) => props.fields.title.value }
        ),
        segmentsNote: fields.text({ label: "Note under the segments (use [link text](/address) for links)", multiline: true }),
        healthcareTitle: fields.text({ label: "Healthcare block heading (leave the whole block empty to hide it)" }),
        healthcareIntro: fields.text({ label: "Healthcare block intro", multiline: true }),
        healthcareBuyers: fields.array(fields.text({ label: "Buyer type" }), { label: "Healthcare buyer types", itemLabel: (props) => props.value }),
        healthcareNote: fields.text({ label: "Note under the healthcare list (use [link text](/address) for links)", multiline: true }),
        stepsTitle: fields.text({ label: "\"How it works\" heading (leave the whole block empty to hide it)" }),
        steps: fields.array(
          fields.object({
            when: fields.text({ label: "When (e.g. Week 1)", validation: { isRequired: true } }),
            title: fields.text({ label: "Title", validation: { isRequired: true } }),
            desc: fields.text({ label: "Text", multiline: true, validation: { isRequired: true } }),
          }),
          { label: "Steps", itemLabel: (props) => props.fields.title.value }
        ),
        stepsNote: fields.text({ label: "Note under the steps (use [link text](/address) for links)", multiline: true }),
        servicesTitle: fields.text({ label: "Services heading", validation: { isRequired: true } }),
        servicesIntro: fields.text({ label: "Services intro", validation: { isRequired: true } }),
        services: fields.array(
          fields.object({
            title: fields.text({ label: "Service", validation: { isRequired: true } }),
            href: fields.text({ label: "Address, e.g. /services/cold-email", validation: { isRequired: true } }),
            desc: fields.text({ label: "Text", multiline: true, validation: { isRequired: true } }),
          }),
          { label: "Services (exactly 7)", validation: { length: { min: 7, max: 7 } }, itemLabel: (props) => props.fields.title.value }
        ),
        diffTitle: fields.text({ label: "\"Why Myntmore\" heading", validation: { isRequired: true } }),
        differentiators: fields.array(fields.text({ label: "Point", multiline: true }), { label: "\"Why Myntmore\" points (exactly 4)", validation: { length: { min: 4, max: 4 } }, itemLabel: (props) => props.value.slice(0, 60) }),
        formTitle: fields.text({ label: "Form heading", validation: { isRequired: true } }),
        formSubtitle: fields.text({ label: "Form intro", multiline: true, validation: { isRequired: true } }),
      },
    }),

    caseStudyPages: collection({
      label: "Case studies (detailed)",
      path: "content/case-study-pages/*",
      format: "json",
      slugField: "slug",
      schema: {
        slug: fields.slug({
          name: {
            label: "Page address",
            description: "The case study lives at /case-studies/<address>. It cannot be changed after the first save. A new one appears in the sitemap and on the case studies listing after the next deploy.",
            validation: { isRequired: true },
          },
        }),
        title: fields.text({ label: "Title (H1)", validation: { isRequired: true } }),
        tag: fields.text({ label: "Tag (e.g. Pharma · UAE)", validation: { isRequired: true } }),
        industry: fields.select({
          label: "Industry (for the listing filters)",
          options: ["Pharma", "SaaS", "Professional Services", "eCommerce Tech", "B2B Founder", "Agencies & IT", "Financial Services", "Insurance", "Manufacturers & Exporters", "Recruitment & Staffing"].map((v) => ({ label: v, value: v })),
          defaultValue: "Pharma",
        }),
        accent: fields.text({ label: "Accent colour (hex, e.g. #ec4899)", validation: { isRequired: true } }),
        intro: fields.text({ label: "Intro paragraph", multiline: true, validation: { isRequired: true } }),
        heroStats: fields.array(
          fields.object({ value: fields.text({ label: "Number", validation: { isRequired: true } }), label: fields.text({ label: "Caption", validation: { isRequired: true } }) }),
          { label: "Headline numbers (exactly 3)", validation: { length: { min: 3, max: 3 } }, itemLabel: (props) => props.fields.label.value }
        ),
        challengeTitle: fields.text({ label: "Challenge heading", validation: { isRequired: true } }),
        challengeBody: fields.array(fields.text({ label: "Paragraph", multiline: true }), { label: "Challenge paragraphs", itemLabel: (props) => props.value.slice(0, 60) }),
        approachTitle: fields.text({ label: "Approach heading", validation: { isRequired: true } }),
        approachBody: fields.array(fields.text({ label: "Paragraph", multiline: true }), { label: "Approach paragraphs", itemLabel: (props) => props.value.slice(0, 60) }),
        metrics: fields.array(
          fields.object({ l: fields.text({ label: "What was measured", validation: { isRequired: true } }), v: fields.text({ label: "Number", validation: { isRequired: true } }) }),
          { label: "Results table (label and number per row)", itemLabel: (props) => props.fields.l.value }
        ),
        outcomeTitle: fields.text({ label: "Outcome heading", validation: { isRequired: true } }),
        outcomeBody: fields.text({ label: "Outcome paragraph", multiline: true, validation: { isRequired: true } }),
        roleBody: fields.text({ label: "What Myntmore did and what the client did", multiline: true, validation: { isRequired: true } }),
        services: fields.array(
          fields.object({ name: fields.text({ label: "Service name", validation: { isRequired: true } }), href: fields.text({ label: "Service address, e.g. /services/cold-email", validation: { isRequired: true } }) }),
          { label: "Services used", itemLabel: (props) => props.fields.name.value }
        ),
        metaTitle: fields.text({ label: "Search title", description: "Up to 49 characters (the site adds \" | Myntmore\").", validation: { isRequired: true, length: { max: 49 } } }),
        metaDescription: fields.text({ label: "Search description", multiline: true, validation: { isRequired: true, length: { max: 160 } } }),
        keywords: fields.array(fields.text({ label: "Keyword" }), { label: "Keywords (one search phrase each)", itemLabel: (props) => props.value }),
        ogTitle: fields.text({ label: "Share title (LinkedIn, WhatsApp)", validation: { isRequired: true } }),
        ogDescription: fields.text({ label: "Share description", multiline: true, validation: { isRequired: true } }),
        schemaHeadline: fields.text({ label: "Headline in structured data", validation: { isRequired: true } }),
        schemaDescription: fields.text({ label: "Description in structured data", multiline: true, validation: { isRequired: true } }),
        datePublished: fields.text({ label: "Published (ISO date and time, e.g. 2026-09-24T10:00:00+05:30)", validation: { isRequired: true } }),
        dateModified: fields.text({ label: "Last updated (ISO date and time)", validation: { isRequired: true } }),
        indexTitle: fields.text({ label: "Title on the case studies listing card", validation: { isRequired: true } }),
        excerpt: fields.text({ label: "Listing card text", multiline: true, validation: { isRequired: true } }),
        indexStats: fields.array(
          fields.object({ v: fields.text({ label: "Number", validation: { isRequired: true } }), l: fields.text({ label: "Caption", validation: { isRequired: true } }) }),
          { label: "Numbers on the listing card", itemLabel: (props) => props.fields.l.value }
        ),
        indexServices: fields.array(fields.text({ label: "Service" }), { label: "Services shown on the listing card", itemLabel: (props) => props.value }),
        indexOrder: fields.integer({ label: "Position on the listing (optional; lowest first, empty = after the others)" }),
      },
    }),

    caseStudies: collection({
      label: "Case studies",
      path: "content/case-studies/*",
      format: "json",
      slugField: "slug",
      schema: {
        slug: fields.slug({
          name: {
            label: "Page address",
            description: "Lowercase words with dashes, e.g. pharma-contract-manufacturer-pipeline. It becomes /case-studies/<address> and cannot be changed after the first save.",
            validation: { isRequired: true },
          },
        }),
        title: fields.text({
          label: "Title (H1)",
          description: "Lead with the headline number, e.g. 22 Qualified Meetings in 90 Days for a Nutraceutical Manufacturer.",
          validation: { isRequired: true, length: { max: 100 } },
        }),
        industry: fields.select({
          label: "Industry",
          description: "Decides which industry filter and landing page this appears on.",
          options: [
            "Pharma",
            "SaaS",
            "Professional Services",
            "eCommerce Tech",
            "B2B Founder",
            "Agencies & IT",
            "Financial Services",
            "Insurance",
            "Manufacturers & Exporters",
            "Recruitment & Staffing",
          ].map((v) => ({ label: v, value: v })),
          defaultValue: "Pharma",
        }),
        segment: fields.text({
          label: "Client type",
          description: "Short, e.g. Contract Manufacturer. Used in the search title: <client type> Case Study.",
          validation: { isRequired: true, length: { max: 38 } },
        }),
        metaTitle: fields.text({
          label: "Search title (optional)",
          description: "Leave empty to use \"<client type> Case Study\". The site adds \" | Myntmore\", so keep it to 49 characters.",
          validation: { length: { max: 49 } },
        }),
        metaDescription: fields.text({
          label: "Search description (optional)",
          description: "Leave empty to build it from the title and the results. If you write one, 120 to 160 characters.",
          multiline: true,
          validation: { length: { max: 160 } },
        }),
        n: fields.integer({
          label: "Order",
          description: "Lowest number shows first. Use the next free number for a new case study.",
          validation: { isRequired: true, min: 1 },
        }),
        challenge: fields.text({
          label: "Challenge",
          description: "The client's situation before Myntmore, in two or three sentences. Client names stay out (confidentiality).",
          multiline: true,
          validation: { isRequired: true },
        }),
        solution: fields.array(fields.text({ label: "Step", multiline: true }), {
          label: "What Myntmore did",
          description: "First line introduces the approach, the rest are the steps.",
          itemLabel: (props) => props.value.slice(0, 60),
        }),
        results: fields.array(fields.text({ label: "Result" }), {
          label: "Results",
          description: "Start a result with its number (22 qualified meetings...). The first figures become the headline numbers. Only real, verifiable results.",
          itemLabel: (props) => props.value.slice(0, 60),
        }),
      },
    }),

    glossaryTerms: collection({
      label: "Glossary terms",
      path: "content/glossary/*",
      format: "json",
      slugField: "slug",
      schema: {
        slug: fields.slug({
          name: {
            label: "Page address",
            description: "The term lives at /resources/glossary/<address>. It cannot be changed after the first save. A new term appears in the sitemap and on the A-Z index after the next deploy.",
            validation: { isRequired: true },
          },
        }),
        title: fields.text({ label: "Term (page title)", description: "E.g. ABM (Account-Based Marketing).", validation: { isRequired: true } }),
        indexTitle: fields.text({ label: "Title on the A-Z index (optional)", description: "Leave empty to use the term above. Sorting on the index uses this." }),
        tag: fields.text({ label: "Category", description: "E.g. GTM Strategy, Cold Email, Sales Ops.", validation: { isRequired: true } }),
        accent: fields.text({ label: "Accent colour (hex, e.g. #2563EB)", validation: { isRequired: true } }),
        tagline: fields.text({ label: "Tagline (under the term)", multiline: true, validation: { isRequired: true } }),
        excerpt: fields.text({ label: "A-Z index card text", multiline: true, validation: { isRequired: true } }),
        alsoKnownAs: fields.array(fields.text({ label: "Name" }), { label: "Also known as (shown on the page and in the structured data)", itemLabel: (props) => props.value }),
        indexAliases: fields.array(fields.text({ label: "Name" }), { label: "Synonyms for the A-Z index (\"see X\" pointers)", itemLabel: (props) => props.value }),
        definitionLead: fields.text({ label: "Bold lead-in before the definition (optional)", description: "E.g. \"The 3-Second Rule:\". Leave empty for most terms." }),
        definition: fields.text({
          label: "Definition",
          description: "The one-or-two-sentence answer shown first. Answer the question outright.",
          multiline: true,
          validation: { isRequired: true },
        }),
        body: fields.text({ label: "Supporting paragraph", description: "Required for a short term. A longer-form term can leave this empty and use the sections below instead (or use both).", multiline: true }),
        sections: fields.array(
          fields.object({
            heading: fields.text({ label: "Section heading", validation: { isRequired: true } }),
            paragraphs: fields.array(fields.text({ label: "Paragraph", description: "Wrap words in **double asterisks** for bold.", multiline: true }), { label: "Paragraphs", itemLabel: (props) => props.value.slice(0, 60) }),
            steps: fields.array(
              fields.object({
                lead: fields.text({ label: "Bold lead-in", validation: { isRequired: true } }),
                text: fields.text({ label: "Text after the lead-in", multiline: true, validation: { isRequired: true } }),
              }),
              { label: "Numbered list (optional)", itemLabel: (props) => props.fields.lead.value }
            ),
            table: fields.object(
              {
                columns: fields.array(fields.text({ label: "Column heading" }), { label: "Comparison table (optional): column headings (the first, row-label column has no heading)", itemLabel: (props) => props.value }),
                rows: fields.array(
                  fields.object({
                    label: fields.text({ label: "Row label", validation: { isRequired: true } }),
                    cells: fields.array(fields.text({ label: "Cell", multiline: true }), { label: "Cells, one per column heading, in order", itemLabel: (props) => props.value.slice(0, 40) }),
                  }),
                  { label: "Comparison table (optional): rows", itemLabel: (props) => props.fields.label.value }
                ),
              },
              { label: "Comparison table (leave empty for none)" }
            ),
          }),
          { label: "Sections (longer-form terms; shown after the supporting paragraph)", itemLabel: (props) => props.fields.heading.value }
        ),
        sourceLabel: fields.text({ label: "Link under the term: text", validation: { isRequired: true } }),
        sourceHref: fields.text({ label: "Link under the term: address, e.g. /services/account-based-marketing", validation: { isRequired: true } }),
        furtherLabel: fields.text({ label: "Second link: text (optional)" }),
        furtherHref: fields.text({ label: "Second link: address (optional)" }),
        schemaDescription: fields.text({
          label: "Longer definition for structured data",
          description: "Used in the DefinedTerm schema that search and AI engines read.",
          multiline: true,
          validation: { isRequired: true },
        }),
        metaTitleSuffix: fields.select({ label: "Search title ending", description: "Search title = term + \" | \" + this.", options: [
            { label: "B2B Glossary", value: "B2B Glossary" },
            { label: "Glossary", value: "Glossary" },
            { label: "B2B Outbound Glossary", value: "B2B Outbound Glossary" },
            { label: "Myntmore Glossary", value: "Myntmore Glossary" },
          ], defaultValue: "B2B Glossary" }),
        ogTitleSuffix: fields.select({ label: "Share title ending", options: [
            { label: "B2B Glossary", value: "B2B Glossary" },
            { label: "Glossary", value: "Glossary" },
            { label: "B2B Outbound Glossary", value: "B2B Outbound Glossary" },
            { label: "Myntmore Glossary", value: "Myntmore Glossary" },
          ], defaultValue: "Myntmore Glossary" }),
        metaTitleOverride: fields.text({ label: "Full search title (optional)", description: "Replaces \"term | ending\" when you need a different shape, e.g. \"Inbound vs. Outbound: Key Differences | Glossary\"." }),
        metaDescription: fields.text({ label: "Search description", multiline: true, validation: { isRequired: true, length: { max: 160 } } }),
        keywords: fields.array(fields.text({ label: "Keyword" }), { label: "Keywords (one search phrase each)", itemLabel: (props) => props.value }),
        faqs: fields.array(
          fields.object({
            question: fields.text({ label: "Question", validation: { isRequired: true } }),
            answer: fields.text({ label: "Answer", multiline: true, validation: { isRequired: true } }),
          }),
          { label: "FAQs (optional, become FAQPage structured data)", itemLabel: (props) => props.fields.question.value }
        ),
      },
    }),

    posts: collection({
      label: "Blog posts",
      path: "content/posts/*",
      slugField: "title",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: {
            label: "Title (H1)",
            description: "Shown as the page heading. The web address is made from it and cannot be changed after the first save.",
            validation: { isRequired: true },
          },
        }),
        published: fields.checkbox({
          label: "Published",
          description: "Leave off while drafting. Only published posts appear on the site, the blog index, the sitemap and llms-full.txt.",
          defaultValue: false,
        }),
        metaTitle: fields.text({
          label: "Search title (optional)",
          description: "Shown in Google results. Leave empty to use the title. Keep under 60 characters.",
        }),
        description: fields.text({
          label: "Search description",
          description: "One or two sentences, 120 to 155 characters. Also shown on the blog index.",
          multiline: true,
          validation: { isRequired: true, length: { min: 60, max: 220 } },
        }),
        category: fields.text({
          label: "Category (the pill above the title)",
          description: "A short label such as Cold Email, LinkedIn Outreach, Comparison, Sales Strategy.",
          validation: { isRequired: true },
        }),
        accent: fields.text({
          label: "Accent colour (optional, e.g. #EF4444)",
          description: "Colours the pill and list markers. Leave empty for the default orange.",
        }),
        readTime: fields.integer({
          label: "Read time (minutes)",
          validation: { isRequired: true, min: 1, max: 60 },
          defaultValue: 5,
        }),
        datePublished: fields.date({
          label: "Date published",
          validation: { isRequired: true },
        }),
        dateModified: fields.date({
          label: "Date last updated",
          description: "Change this when you make a real edit. It shows on the page and in the sitemap.",
        }),
        keywords: fields.array(fields.text({ label: "Keyword" }), {
          label: "Keywords (one search phrase each)",
          itemLabel: (props) => props.value,
        }),
        summary: fields.text({
          label: "Intro / answer-first summary",
          description:
            "The first paragraph under the title. For new posts: 40 to 60 words that answer the post's main question outright, with one number and one named thing. AI answer engines quote this block.",
          multiline: true,
          validation: { isRequired: true, length: { min: 60, max: 900 } },
        }),
        schemaHeadline: fields.text({
          label: "Headline in structured data (optional)",
          description: "Leave empty to use the title. Keep under 110 characters.",
        }),
        schemaDescription: fields.text({
          label: "Description in structured data (optional)",
          description: "Leave empty to use the search description.",
          multiline: true,
        }),
        ogTitle: fields.text({ label: "Share title for LinkedIn / WhatsApp (optional)", description: "Leave empty to use the search title." }),
        ogDescription: fields.text({ label: "Share description (optional)", multiline: true, description: "Leave empty to use the search description." }),
        excerpt: fields.text({
          label: "Blog index card text (optional)",
          description: "Leave empty to use the search description.",
          multiline: true,
        }),
        indexTags: fields.array(fields.text({ label: "Tag" }), {
          label: "Blog index card tags (optional, up to 3; empty uses the category)",
          validation: { length: { max: 3 } },
          itemLabel: (props) => props.value,
        }),
        indexOrder: fields.integer({
          label: "Blog index position (optional)",
          description: "Lowest first. Posts without one are listed first, newest first.",
        }),
        content: fields.document({
          label: "Body",
          formatting: true,
          dividers: true,
          links: true,
          tables: true,
          images: {
            directory: "public/blog-images",
            publicPath: "/blog-images/",
          },
        }),
        faqs: fields.array(
          fields.object({
            question: fields.text({ label: "Question", validation: { isRequired: true } }),
            answer: fields.text({
              label: "Answer",
              description: "Answer first, 40 to 60 words, plain text.",
              multiline: true,
              validation: { isRequired: true },
            }),
          }),
          {
            label: "FAQs at the end (optional, becomes FAQPage structured data)",
            itemLabel: (props) => props.fields.question.value,
          }
        ),
        relatedLinks: fields.array(
          fields.object({
            label: fields.text({ label: "Link text", validation: { isRequired: true } }),
            href: fields.text({ label: "Path, e.g. /services/cold-email-outreach", validation: { isRequired: true } }),
          }),
          {
            label: "Related reading (optional)",
            itemLabel: (props) => props.fields.label.value,
          }
        ),
        cta: fields.object(
          {
            heading: fields.text({ label: "Heading" }),
            body: fields.text({ label: "Text", multiline: true }),
            button: fields.text({ label: "Button label" }),
            href: fields.text({ label: "Button link, e.g. /tools/dm-angle-generator or /book-a-call" }),
            button2: fields.text({ label: "Second button label (optional, plain style)" }),
            href2: fields.text({ label: "Second button link (optional)" }),
          },
          { label: "Call-to-action box at the end (optional: leave the heading empty to hide it)" }
        ),
        toolCallouts: fields.array(
          fields.object({
            name: fields.text({ label: "Tool name", validation: { isRequired: true } }),
            href: fields.text({ label: "Link, e.g. /tools/linkedin-hook-grader", validation: { isRequired: true } }),
            blurb: fields.text({ label: "One-sentence description", multiline: true, validation: { isRequired: true } }),
          }),
          { label: "Free-tool callouts (optional)", itemLabel: (props) => props.fields.name.value }
        ),
      },
    }),

    careers: collection({
      label: "Careers (Job Postings)",
      path: "content/careers/*",
      format: "json",
      slugField: "slug",
      columns: ["title", "tag", "validThrough"],
      schema: {
        slug: fields.slug({
          name: {
            label: "Role slug",
            description: "The page lives at /careers/<slug>. Example: gtm-strategist, lead-gen-intern.",
            validation: { isRequired: true },
          },
        }),
        title: fields.text({
          label: "Job Title",
          description: "e.g. GTM Strategist, B2B Lead Generation Intern",
          validation: { isRequired: true },
        }),
        tag: fields.select({
          label: "Department Tag",
          options: [
            { label: "Outbound & GTM", value: "Outbound & GTM" },
            { label: "Growth Marketing", value: "Growth Marketing" },
            { label: "Sales", value: "Sales" },
            { label: "People & Ops", value: "People & Ops" },
            { label: "Content & Branding", value: "Content & Branding" },
            { label: "Systems & AI", value: "Systems & AI" },
          ],
          defaultValue: "Outbound & GTM",
        }),
        accent: fields.text({
          label: "Accent Colour (hex)",
          description: "Hex color code for tags and highlights (e.g. #3b82f6, #10b981, #F5B731, #a855f7, #ec4899, #14B8A6).",
          defaultValue: "#3b82f6",
          validation: { isRequired: true },
        }),
        badge: fields.text({
          label: "Hero Badge",
          description: "e.g. Full-Time · BKC, Mumbai or Internship · Work from Office · BKC, Mumbai",
          validation: { isRequired: true },
        }),
        cardDesc: fields.text({
          label: "Careers Hub Card Description",
          description: "Short 1-2 sentence description displayed on the /careers hub card.",
          multiline: true,
          validation: { isRequired: true },
        }),
        cardBullets: fields.array(fields.text({ label: "Highlight" }), {
          label: "Careers Hub Card Bullets (3 items)",
          itemLabel: (props) => props.value,
        }),
        applySubject: fields.text({
          label: "Application Email Subject",
          description: "Subject line prefilled in the mailto button, e.g. Application for GTM Strategist",
          validation: { isRequired: true },
        }),
        grid: fields.array(
          fields.object({
            label: fields.text({ label: "Card Label (e.g. Location, Type, Commitment, Hours, CTC, Stipend)", validation: { isRequired: true } }),
            value: fields.text({ label: "Card Value", multiline: true, validation: { isRequired: true } }),
          }),
          {
            label: "Header Info Cards (3 cards: Location, Type/Commitment/Hours, CTC/Stipend)",
            itemLabel: (props) => `${props.fields.label.value}: ${props.fields.value.value}`,
          }
        ),
        schemaDescription: fields.text({
          label: "Google for Jobs Schema Description",
          description: "Plain text summary of the role for Google for Jobs structured data.",
          multiline: true,
          validation: { isRequired: true },
        }),
        employmentType: fields.select({
          label: "Employment Type (Schema)",
          description: "Value for Google for Jobs JobPosting schema.",
          options: [
            { label: "Full-Time (FULL_TIME)", value: "FULL_TIME" },
            { label: "Internship (INTERN)", value: "INTERN" },
            { label: "Full-Time & Intern (FULL_TIME,INTERN)", value: "FULL_TIME,INTERN" },
            { label: "Part-Time (PART_TIME)", value: "PART_TIME" },
            { label: "Contractor (CONTRACTOR)", value: "CONTRACTOR" },
          ],
          defaultValue: "FULL_TIME",
        }),
        salaryMin: fields.integer({
          label: "Base Salary Min (in INR, numbers only)",
          description: "e.g. 600000 for 6 LPA, or 10000 for 10K/mo",
          validation: { isRequired: true },
        }),
        salaryMax: fields.integer({
          label: "Base Salary Max (in INR, numbers only)",
          description: "e.g. 1500000 for 15 LPA, or 20000 for 20K/mo",
          validation: { isRequired: true },
        }),
        salaryUnit: fields.select({
          label: "Salary Unit (Schema)",
          options: [
            { label: "Per Year (YEAR)", value: "YEAR" },
            { label: "Per Month (MONTH)", value: "MONTH" },
          ],
          defaultValue: "YEAR",
        }),
        datePosted: fields.text({
          label: "Date Posted (ISO timestamp)",
          description: "e.g. 2026-07-28T17:15:52+05:30",
          validation: { isRequired: true },
        }),
        validThrough: fields.text({
          label: "Valid Through (ISO timestamp)",
          description: "Rolling 6-month window for Google for Jobs, e.g. 2027-04-15T00:00:00+05:30",
          validation: { isRequired: true },
        }),
        aboutIntro: fields.text({
          label: "About the Role: Paragraphs",
          description: "Separate paragraphs with blank lines.",
          multiline: true,
          validation: { isRequired: true },
        }),
        aboutNoteText: fields.text({
          label: "About the Role: Link Note (optional, e.g. Starting your career? See internship)",
        }),
        aboutNoteHref: fields.text({
          label: "About the Role: Link URL (optional, e.g. /careers/lead-gen-intern)",
        }),
        aboutCalloutTitle: fields.text({
          label: "About Callout Box Title (optional, e.g. What makes this role different)",
        }),
        aboutCalloutText: fields.text({
          label: "About Callout Box Text (optional)",
          multiline: true,
        }),
        primaryGoal: fields.text({
          label: "Primary Goal (optional)",
          description: "Weekly measurable outcome for the role.",
          multiline: true,
        }),
        responsibilitiesTitle: fields.text({
          label: "Responsibilities Section Title",
          defaultValue: "What you'll do",
          validation: { isRequired: true },
        }),
        responsibilities: fields.array(
          fields.object({
            title: fields.text({ label: "Title / Area", validation: { isRequired: true } }),
            desc: fields.text({ label: "Description (can be bullet points, one per line)", multiline: true, validation: { isRequired: true } }),
          }),
          {
            label: "Responsibilities / What You'll Do",
            itemLabel: (props) => props.fields.title.value,
          }
        ),
        whoYouAreTitle: fields.text({
          label: "Who You Are Section Title",
          defaultValue: "Who you are",
          validation: { isRequired: true },
        }),
        whoYouAreIntro: fields.text({
          label: "Who You Are: Intro text (optional)",
          multiline: true,
        }),
        whoYouAre: fields.array(
          fields.object({
            label: fields.text({ label: "Attribute / Quality Label", validation: { isRequired: true } }),
            desc: fields.text({ label: "Description", multiline: true, validation: { isRequired: true } }),
          }),
          {
            label: "Who You Are Items",
            itemLabel: (props) => props.fields.label.value,
          }
        ),
        skills: fields.array(fields.text({ label: "Skill / Mindset" }), {
          label: "Skills & Mindset We Value (optional)",
          itemLabel: (props) => props.value,
        }),
        whatYoullLearn: fields.array(fields.text({ label: "Learning Outcome" }), {
          label: "What You'll Learn (optional)",
          itemLabel: (props) => props.value,
        }),
        whyJoin: fields.text({
          label: "Why Join Myntmore",
          multiline: true,
          validation: { isRequired: true },
        }),
        metaTitle: fields.text({
          label: "Search Title (Google snippet)",
          description: "Around 50-55 characters.",
          validation: { isRequired: true },
        }),
        metaDescription: fields.text({
          label: "Search Description",
          description: "120 to 155 characters.",
          multiline: true,
          validation: { isRequired: true },
        }),
        keywords: fields.array(fields.text({ label: "Keyword" }), {
          label: "Search Keywords",
          itemLabel: (props) => props.value,
        }),
        ogTitle: fields.text({ label: "Share Title (LinkedIn, WhatsApp)", validation: { isRequired: true } }),
        ogDescription: fields.text({ label: "Share Description", multiline: true, validation: { isRequired: true } }),
      },
    }),
  },
  // The three bespoke service pages keep their own layouts, so each has its own page-copy file
  // (the search and share metadata for all eight services is in the Service pages collection).
  singletons: {
    serviceCopyColdEmail: singleton({
      label: "Service copy: Cold email",
      path: "content/service-copy/cold-email",
      format: "json",
      schema: coldEmailCopySchema,
    }),
    serviceCopyLinkedinOutreach: singleton({
      label: "Service copy: LinkedIn outreach",
      path: "content/service-copy/linkedin-outreach",
      format: "json",
      schema: linkedinOutreachCopySchema,
    }),
    serviceCopyDoItYourself: singleton({
      label: "Service copy: Self-serve LinkedIn tool",
      path: "content/service-copy/do-it-yourself",
      format: "json",
      schema: doItYourselfCopySchema,
    }),
    // The twelve long-form case studies each have their own layout, so each has its own entry (search and share
    // text, structured-data fields and the full page copy). Their pages are written by `npm run case-study-long:build`.
    caseLongEcommerceConversionPlaybook: singleton({
      label: "Long-form case study: E-commerce conversion playbook",
      path: "content/case-study-long/ecommerce-conversion-playbook",
      format: "json",
      schema: ecommerceConversionPlaybookCaseSchema,
    }),
    caseLongPredictableB2bLeadGenEngine: singleton({
      label: "Long-form case study: Predictable B2B lead gen engine",
      path: "content/case-study-long/predictable-b2b-lead-gen-engine",
      format: "json",
      schema: predictableB2BLeadGenEngineCaseSchema,
    }),
    caseLongFounderPersonalBrandLinkedin: singleton({
      label: "Long-form case study: Founder personal brand on LinkedIn",
      path: "content/case-study-long/founder-personal-brand-linkedin",
      format: "json",
      schema: founderPersonalBrandLinkedinCaseSchema,
    }),
    caseLongProfessionalServicesLinkedin: singleton({
      label: "Long-form case study: Professional services on LinkedIn",
      path: "content/case-study-long/professional-services-linkedin",
      format: "json",
      schema: professionalServicesLinkedinCaseSchema,
    }),
    caseLongSaasSeriesA: singleton({
      label: "Long-form case study: SaaS Series A",
      path: "content/case-study-long/saas-series-a",
      format: "json",
      schema: saasSeriesACaseSchema,
    }),
    caseLongUkPharmaQualifiedMeetings: singleton({
      label: "Long-form case study: UK pharma qualified meetings",
      path: "content/case-study-long/uk-pharma-qualified-meetings",
      format: "json",
      schema: ukPharmaQualifiedMeetingsCaseSchema,
    }),
    caseLongSpecialistRecruitmentLinkedinLeads: singleton({
      label: "Long-form case study: Specialist recruitment LinkedIn leads",
      path: "content/case-study-long/specialist-recruitment-linkedin-leads",
      format: "json",
      schema: specialistRecruitmentLinkedinLeadsCaseSchema,
    }),
    caseLongMedicalTourismPlatformPipeline: singleton({
      label: "Long-form case study: Medical tourism platform pipeline",
      path: "content/case-study-long/medical-tourism-platform-pipeline",
      format: "json",
      schema: medicalTourismPlatformPipelineCaseSchema,
    }),
    caseLongHeritageJewelleryValuationPipeline: singleton({
      label: "Long-form case study: Heritage jewellery valuation pipeline",
      path: "content/case-study-long/heritage-jewellery-valuation-pipeline",
      format: "json",
      schema: heritageJewelleryValuationPipelineCaseSchema,
    }),
    caseLongLeadershipDevelopmentMessagingShift: singleton({
      label: "Long-form case study: Leadership development messaging shift",
      path: "content/case-study-long/leadership-development-messaging-shift",
      format: "json",
      schema: leadershipDevelopmentMessagingShiftCaseSchema,
    }),
    caseLongRetailStrategyDesignPipeline: singleton({
      label: "Long-form case study: Retail strategy and design pipeline",
      path: "content/case-study-long/retail-strategy-design-pipeline",
      format: "json",
      schema: retailStrategyDesignPipelineCaseSchema,
    }),
    caseLongWealthManagementPmsPipeline: singleton({
      label: "Long-form case study: Wealth management and PMS pipeline",
      path: "content/case-study-long/wealth-management-pms-pipeline",
      format: "json",
      schema: wealthManagementPmsPipelineCaseSchema,
    }),
  },
});
