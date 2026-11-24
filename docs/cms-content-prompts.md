# Myntmore CMS: prompts that turn plain text into CMS-ready pages

How to use this (no technical knowledge needed):

1. Open any AI chat (Claude is best). 
2. Paste the **Shared rules** block below first. Do this once per chat.
3. Find the page type you want in the list, paste its prompt, and put your rough text where it says `[PASTE YOUR TEXT HERE]`.
4. The AI answers with a **filled form**: every line is "Field name: value", in the same order and with the same names as the admin form at myntmore.com/admin (top to bottom: the page's own content first, then Design options, Google and social sharing, and the page address at the very end).
5. Open the admin, choose the page type, click "Add new" (or open the existing page), and copy each value into the box with the same name. Save.
6. If the admin shows a red message under a field, paste that message back into the chat and ask the AI to fix it.

Ask the AI to keep its answer as plain text. Do not let it add extra commentary.

---

## Shared rules (paste this first, once per chat)

```
You are the content editor for myntmore.com, a B2B outbound lead-generation agency (cold email, LinkedIn outreach, account-based marketing, GTM strategy). I will give you rough text. You will rebuild it as a filled-in CMS form.

OUTPUT FORMAT
- Output one line per field as "Field name: value", using EXACTLY the field names I give you, in the same order.
- For lists, number the items (1., 2., 3.) and, where an item has parts, write each part on its own indented line with its label.
- If a field is optional and the text gives nothing for it, write "(leave empty)". If a required field has no source text, write "NEEDS INPUT: <what is missing>" instead of inventing it.
- No introduction, no closing remarks. After the form, add a short "Check before saving" list of anything I should verify.

HARD RULES (the site refuses to save if these are broken)
1. Never use the long dash character (—). Use a comma, a full stop, or a normal hyphen (-) instead.
2. Slugs/page addresses: lowercase letters, numbers and hyphens only. No spaces, no capitals, no slashes at the start. Example: cold-email-for-saas.
3. Search title (Google title): maximum 49 characters INCLUDING spaces. The site adds " | Myntmore" itself, so do not write "Myntmore" at the end. Count the characters and show the count in brackets, e.g. (44).
4. Search description (Google description): maximum 160 characters including spaces (155 for landing pages, 220 for blog posts with a minimum of 60). Show the count in brackets. Make it a plain-English sentence that ends with a reason to click.
5. Keywords: lowercase search phrases a buyer would actually type (3 to 6 words each), separated by commas, all on ONE line (for example: b2b lead generation, cold email agency, how to book sales meetings). Mix: 1 main phrase, 3 to 5 close variants, 2 to 3 question-style phrases. No single words. No duplicates.
6. Share title / share description (LinkedIn and WhatsApp preview): the title can be a little longer and punchier than the Google title (up to about 65 characters). The description is one or two sentences.
7. Internal links must be real paths starting with / (for example /services/cold-email-outreach, /book-a-call, /case-studies). If you are not sure a page exists, write "NEEDS INPUT: confirm this link exists" instead of guessing.
8. NEVER invent facts, clients, numbers, percentages, testimonials or case studies. Use only what is in my text. If a number is missing, write "NEEDS INPUT".
9. Respect the exact item counts ("exactly 3", "exactly 4"). If my text has more, keep the best ones and tell me what you dropped; if it has fewer, mark the gaps as NEEDS INPUT.
10. Tone: plain, direct, specific, for senior B2B buyers. Short sentences. No hype words like "revolutionary", "game-changing", "unlock", "supercharge".
11. Colours are hex codes like #EA580C. Use Myntmore's orange/gold family unless I say otherwise. Never green, blue, teal or purple.

If you understand, reply only with: "Ready. Which page type?"
```

---

## 0. Not sure which page type to use? (router prompt)

```
Here is some rough text. Tell me which Myntmore CMS page type it belongs to, from this list, and why in one sentence. If it could be more than one, rank them.

Page types: Blog post, Landing page (one per customer industry/ICP), City page, Industry x City page, Case study (short), Case study (detailed), Glossary term, Career/job posting, Event, Page FAQs, Homepage FAQs, Page search titles (Google title/description for an existing page), or "edit an existing main page" (Homepage, About, Services, Contact, Book a call).

Then list what is MISSING from my text to build that page. Do not write the page yet.

[PASTE YOUR TEXT HERE]
```

---

## 1. Blog post (`Blog posts`, can add new)

Give: a draft article or notes.

```
Turn the text below into a Myntmore BLOG POST for the CMS. Follow the shared rules.

Use exactly these fields, in this order:

Title (H1): the page title and the page address. Write it as a normal sentence-case headline (max about 70 characters). This also becomes the web address, so after it add "Page address will be: <the title as lowercase-hyphen words>".
Category (the pill above the title): one of the categories already used on the site if I name them, otherwise a 1 to 3 word category.
Intro / answer-first summary: 60 to 900 characters. It must answer the title's question directly in the first sentence, so a search engine or AI assistant can quote it.
Body: the full article in Markdown. Use ## for section headings (no # heading, the title is already the H1), short paragraphs, bullet lists where useful, and **bold** for key terms. Where a glossary term exists, link it like [cold reply](/resources/glossary/cold-reply). Do not repeat the intro.
Published: Yes or No (use No unless I say it is ready).
Read time (minutes): estimate from word count (about 200 words per minute), a whole number.
FAQs at the end (optional): 3 to 5 questions that real buyers ask, each with a 40 to 80 word answer.
  1. Question: ...
     Answer: ...
Related reading (optional): 3 to 5 links.
  1. Link text: ...
     Path: /...
Call-to-action box at the end (leave Heading empty to hide it):
  Heading: ...
  Text: ...
  Button label: ...
  Button link: /...
  Second button label (optional): ...
  Second button link (optional): ...
Free-tool callouts (optional): only if a Myntmore free tool genuinely fits.
  1. Tool name: ...
     Link: /tools/...
     One-sentence description: ...
Search description: 60 to 220 characters, includes the main keyword, ends with a reason to read (count).
Blog index card text (optional): one or two sentences for the blog listing card.
Blog index card tags (optional, up to 3): short tags.
Blog index position (optional): leave empty unless I give one.
Accent colour (optional): a hex code or "(leave empty)".
Search title (optional): max 49 characters, should contain the main keyword (count).
Date published: YYYY-MM-DD (use today's date if I did not give one).
Date last updated: YYYY-MM-DD or "(leave empty)".
Keywords: 6 to 10 lowercase phrases, separated by commas on ONE line.
Headline in structured data (optional): same as Title unless it is too long.
Description in structured data (optional): one sentence.
Share title for LinkedIn / WhatsApp (optional): punchy, up to about 65 characters.
Share description (optional): one or two sentences.

TEXT:
[PASTE YOUR TEXT HERE]
```

---

## 2. Landing page for an industry / audience (`Landing pages (ICP)`, can add new)

Give: a description of the audience, their pain points, and what Myntmore does for them.

```
Turn the text below into a Myntmore LANDING PAGE (one audience, e.g. "Cold email for SaaS founders"). Follow the shared rules. This page type is strict about counts. Use exactly these fields in this order:

Hero badge: short label above the headline (max 6 words).
Headline, line 1 (optional):
Headline, line 2: text before the underlined words (optional):
Headline, line 2: underlined words: the 2 to 4 words that carry the promise.
Headline, line 2: text after the underlined words:
Hero subheading: 1 to 2 sentences.
Main button label: e.g. "Book a strategy call".
Second button label: e.g. "See how it works".
Small note under the buttons: e.g. "Free 30-minute call. No obligation."
Small caption above the stats row (optional):
Stats row (exactly 4): each has a big number and a caption.
  1. Number: ...  Caption: ...
Pain section label: small text above the heading.
Pain section heading:
Pain cards (exactly 3): each has Emoji, Title, Text.
Flow diagram label:
Flow diagram title: one line (a new line splits it in two).
Flow steps 1 to 3 (exactly 3): each with a title and a one-line text.
Side track label:
Side track items (exactly 3):
Flow steps 4 to 6 (exactly 3):
How-it-works label:
How-it-works heading:
How-it-works steps (exactly 4): each with a title and text.
Results section style: Four counters / Case-study cards / None.
Case-study cards (exactly 3, only if the style is "Case-study cards"; REAL case studies only, otherwise leave empty).
Track record label / Track record heading (only if used):
Link under the track record cards: text and address (optional):
Track record numbers (exactly 4, only if the style is "Four counters": number + caption; otherwise leave empty).
Scenario cards (optional, exactly 3 or none): label, heading, intro, then 3 cards. If I gave no scenarios, write "(leave all scenario fields empty)".
"Why this works" (optional, exactly 3 or none): label, heading, intro, then 3 cards. Same rule.
FAQ heading:
Closing call to action: heading:
Closing call to action: text:
Form heading:
Form intro text:
Name field example: e.g. "Priya Sharma"
Designation field example: e.g. "Founder"
Phone field example:
Company field label:
Company field example:
Email field example:
Submit button label:
Note under the submit button:
Hero badge effect: Plain badge OR Radar ping (use Plain badge if unsure).
Line break comes right after the underlined words: Yes or No (No if unsure).
Underline width: 400 if the underlined words are long, 380 or 300 if short.
Floating emoji layout: Four icons / Three icons (A) / Three icons (B). Default: Four icons.
Extra hero graphic: None (default) or Trade route.
Floating emoji in the hero: 4 emojis (if Four icons) or 3 emojis (otherwise).
Search title: max 49 (count).
Search description: max 155 (count).
Keywords: 6 to 10 phrases, separated by commas on ONE line.
Share title (LinkedIn, WhatsApp):
Share description:
Breadcrumb label: 1 to 3 words.
Page address: lowercase-hyphen slug (this is the name of the file and the link: /lp/<slug>).

THEN, as a separate block called PAGE FAQS (these go in the "Page FAQs" type, with the Page field set to lp-<page address>): 5 to 8 questions and answers, 40 to 80 words each.

THEN a block called PAGE SEARCH TITLE (goes in "Page search titles"): Page address: /lp/<slug>, Search title (max 70), Search description (max 170).

TEXT:
[PASTE YOUR TEXT HERE]
```

---

## 3. City page (`City pages`, can add new)

Give: the city, why businesses there buy outbound, and local angles.

```
Turn the text below into a Myntmore CITY PAGE ("B2B lead generation in <city>"). Follow the shared rules. Use exactly these fields in this order:

Country: e.g. India.
Hero badge: e.g. "B2B Lead Generation · Pune".
Business areas (the scrolling strip under the hero): 6 to 10 local business areas or industry clusters.
Headline (H1):
Hero intro: 2 to 3 sentences.
Main button label:
Second button label:
"Why this city" heading:
"Why this city" cards (exactly 3): Emoji, Title, Text.
Proof heading (leave empty to hide the case-study block):
Proof intro:
Case studies from this city's industries (REAL ones only): each has Case study title, Address (like /case-studies/<slug>), and The result in 1 to 2 sentences as the case study itself states it. If I did not give real ones: "(leave empty)".
Note under the case studies (can use [link text](/address)):
"Who we generate leads for" heading (leave the whole block empty to hide it):
"Who we generate leads for" intro:
Segment cards (exactly 3, or none): Emoji, Title, Text.
Note under the segments:
Healthcare block heading (optional, leave whole block empty to hide):
Healthcare block intro:
Healthcare buyer types:
Note under the healthcare list:
"How it works" heading (optional):
Steps: each with When (e.g. Week 1), Title, Text.
Note under the steps:
Services heading:
Services intro:
Services (exactly 7): each with Service name, Address (like /services/cold-email-outreach), Text.
"Why Myntmore" heading:
"Why Myntmore" points (exactly 4):
Form heading:
Form intro:
City emoji:
Floating hero emojis (up to 4):
Search title: max 49 (count). Pattern: "B2B Lead Generation in <City>" plus a short qualifier if there is room.
Search description: max 160 (count).
Keywords: 6 to 10 phrases, separated by commas on ONE line, always including "<city> b2b lead generation", "lead generation agency <city>", "cold email agency <city>".
Share title (LinkedIn, WhatsApp):
Share description:
Breadcrumb label: the city name.
City key: lowercase slug, e.g. pune.

THEN the block PAGE FAQS (Page field = city-<city key>): 5 to 8 local questions and answers.
THEN the block PAGE SEARCH TITLE: Page address /<city page path>, Search title (max 70), Search description (max 170).

TEXT:
[PASTE YOUR TEXT HERE]
```

---

## 4. Industry x City page (`Industry x City pages`, can add new)

Give: the industry, the city, who buys, local signals.

```
Turn the text below into a Myntmore INDUSTRY x CITY PAGE (e.g. "Pharma lead generation in Hyderabad"). Follow the shared rules. The parent city page must already exist. Use exactly these fields in this order:

City display name: e.g. Hyderabad.
Industry display name: how it reads in a sentence, e.g. Pharma.
Hero badge: e.g. "Pharma · Hyderabad".
Local industry hubs (marquee strip): 6 to 10 real local clusters or areas.
Headline (H1):
Hero intro: 2 to 3 sentences, may use [text](/path) links.
Primary CTA label:
Secondary CTA label:
Market reality heading:
Market reality cards (exactly 3): Emoji, Title, Text.
Buyers & signals heading:
Buyers intro:
Target decision-makers & signals (4 to 6): each has Buyer role / title, and Buying signal & outreach angle.
Sub-segments heading:
Sub-segments intro:
Sub-segments (exactly 3): Emoji, Title, Text.
Note under segments:
Proof heading:
Proof intro:
Verified case studies (REAL only, at least 2): each has Case study title, Address (/case-studies/<slug>), Verified result from the case study.
Honesty disclaimer under proof: one sentence saying results are from similar industries/markets and not specific to this city, unless true.
8-week rollout heading:
Rollout steps (exactly 4): When (e.g. Weeks 1 to 2), Title, Text.
Note under steps:
Services heading:
Services intro:
Services (exactly 6): Service name, Address, Text.
Why Myntmore heading:
Why Myntmore points (exactly 4):
FAQs (at least 4): Question and Answer each.
Form heading:
Form subtitle:
Hero emoji:
Floating hero emojis (4):
Search title: max 49 (count).
Search description: max 160 (count).
Keywords: 6 to 10 phrases, separated by commas on ONE line.
Share title (LinkedIn, WhatsApp):
Share description:
Page slug (industry-city): lowercase, e.g. pharma-hyderabad.
Parent city page: the city key, e.g. hyderabad (it must already exist, otherwise write NEEDS INPUT).
Industry: choose from the admin's drop-down (e.g. BFSI, Pharma, Chemical Manufacturing, Automotive & Auto Parts Manufacturing). If mine is not obviously in the list, write NEEDS INPUT.
Optional vertical LP link: e.g. /lp/pharma, only if that landing page exists.
Optional vertical LP button label:

THEN the block PAGE SEARCH TITLE: Page address and a Search title (max 70) and Search description (max 170).

TEXT:
[PASTE YOUR TEXT HERE]
```

---

## 5. Case study, short (`Case studies`, can add new)

Give: what the client faced, what you did, what happened.

```
Turn the text below into a SHORT CASE STUDY. Use ONLY facts and numbers in my text. Follow the shared rules. Fields, in order:

Title (H1): max 100 characters. Lead with the result if there is a number.
Industry: choose ONE of: Pharma, SaaS, Professional Services, eCommerce Tech, B2B Founder, Agencies & IT, Financial Services, Insurance.
Client type: max 38 characters, anonymised, e.g. "Series A SaaS, USA".
Challenge: 2 to 4 sentences.
What Myntmore did: 3 to 6 bullet items, each one short and concrete.
Results: 3 to 5 bullet items, each starting with the number.
Search title (optional): max 49 (count).
Search description (optional): max 160 (count). Must include a real number from the results.
Page address: lowercase-hyphen slug, e.g. saas-series-a-pipeline.
Order: leave empty unless I give one.

Check before saving: confirm the client has approved naming (or that it is anonymised), and that every number is real.

TEXT:
[PASTE YOUR TEXT HERE]
```

---

## 6. Case study, detailed (`Case studies (detailed)`, can add new)

```
Turn the text below into a DETAILED CASE STUDY page. Use ONLY facts and numbers in my text. Follow the shared rules. Fields, in order:

Title (H1):
Tag: e.g. "Pharma · UAE".
Intro paragraph:
Headline numbers (exactly 3): Number + Caption each.
Challenge heading:
Challenge paragraphs: 2 to 4.
Approach heading:
Approach paragraphs: 2 to 4.
Results table: rows of "What was measured" and "Number".
Outcome heading:
Outcome paragraph:
What Myntmore did and what the client did: one paragraph.
Services used: each Service name + Service address (e.g. /services/cold-email-outreach).
Industry (for the listing filters): Pharma, SaaS, Professional Services, eCommerce Tech, B2B Founder, Agencies & IT, Financial Services or Insurance.
Title on the case studies listing card:
Listing card text: 1 to 2 sentences.
Numbers on the listing card: 2 to 3 (Number + Caption).
Services shown on the listing card: 1 to 3 names.
Position on the listing (optional):
Accent colour: hex.
Search title: max 49 (count).
Search description: max 160 (count).
Keywords: 6 to 10 phrases, separated by commas on ONE line.
Share title (LinkedIn, WhatsApp):
Share description:
Headline in structured data:
Description in structured data:
Published: ISO date and time, e.g. 2026-11-23T10:00:00+05:30.
Last updated: same format.
Page address: slug.

TEXT:
[PASTE YOUR TEXT HERE]
```

---

## 7. Glossary term (`Glossary terms`, can add new)

```
Turn the text below into a Myntmore GLOSSARY TERM. Write for a busy B2B reader who asked "what is <term>?". Follow the shared rules. Fields, in order:

Term (page title): e.g. "Cold Reply".
Title on the A-Z index (optional): only if it should differ.
Category: e.g. Outbound, Email, LinkedIn, Sales.
Tagline (under the term): one sentence.
A-Z index card text: one sentence.
Also known as: other names for it.
Bold lead-in before the definition (optional): e.g. "A cold reply is".
Definition: 40 to 70 words that stand alone as the answer.
Supporting paragraph: 2 to 4 sentences of context.
Sections (only for longer terms): each with Section heading, Paragraphs, optional Numbered list (Bold lead-in + Text), optional Comparison table (column headings, rows with a row label and one cell per column).
Link under the term: text. Required.
Link under the term: address (e.g. /services/cold-email-outreach). Required.
Second link: text (optional).
Second link: address (optional).
FAQs (optional): 2 to 4 questions and answers.
Accent colour: hex.
Synonyms for the A-Z index: words that should point to this term.
Longer definition for structured data: 2 to 3 sentences.
Search title ending: choose B2B Glossary, Glossary, B2B Outbound Glossary or Myntmore Glossary.
Share title ending: same choices.
Full search title (optional): leave empty unless the default is too long.
Search description: max 160 (count).
Keywords: 4 to 8 phrases, separated by commas on ONE line starting with "what is <term>" and "<term> meaning".
Page address: slug of the term, e.g. cold-reply.

TEXT:
[PASTE YOUR TEXT HERE]
```

---

## 7b. Guide (`New guides`, can add new)

Guides written here use one standard layout: header and intro, then sections (paragraphs, numbered steps, copy-paste boxes, tables), FAQs, related links and a closing call to action. The 19 older guides keep their own layouts and are edited separately.

```
Turn the text below into a Myntmore GUIDE for the CMS. Follow the shared rules. Fields, in order:

Title (H1): max 110 characters.
Tag (the pill above the title): 1 to 3 words, e.g. Cold Email.
Read time (minutes): whole number, about 200 words per minute.
Card text on the guides page: 1 to 2 sentences, max 220 characters.
Intro / answer-first summary: 60 to 700 characters. First sentence states what the guide covers and the main takeaway.
Sections (the body, in order; at least 1). For each section:
  Heading:
  Paragraphs: short paragraphs. **bold** for key terms, [link text](/page-address) for internal links.
  Numbered list (optional): each item has a Bold lead-in and Text after it.
  Copy-paste boxes (optional): Label (e.g. "Copy into Claude") and the exact Text readers can copy, such as a prompt or template. Keep the text exactly as written.
  Table (optional): column headings, then rows with a row label and one cell per column.
FAQs (optional): 3 to 5 questions, 40 to 80 word answers.
Related reading (optional): link text and address (starting with /).
Call-to-action box (all four parts or none): Heading, Text, Button label, Button address (e.g. /book-a-call).
Accent colour: hex, orange or gold family.
Search title: max 49 (count).
Search description: max 160 (count).
Keywords: 6 to 10 phrases, separated by commas on ONE line.
Share title (optional):
Share description (optional):
Date published: YYYY-MM-DD.
Date last updated (optional): YYYY-MM-DD.
Guide address: lowercase-hyphen slug (page will be /resources/guides/<address>). Must not match an existing guide.

THEN the block PAGE SEARCH TITLE is NOT needed for this type (the search title above is used).

TEXT:
[PASTE YOUR TEXT HERE]
```

---

## 8. Career / job posting (`Careers`, can add new)

```
Turn the text below into a Myntmore CAREERS posting. Follow the shared rules. Fields, in order:

Accepting applications (role is live): Yes (use No only to close a role; closing hides the page, the careers card and the sitemap entry, and it can be switched back on later).
Job Title:
Department Tag: choose one of: Outbound & GTM, Growth Marketing, Sales, People & Ops, Content & Branding, Systems & AI.
Hero Badge:
Careers Hub Card Description: one sentence.
Careers Hub Card Bullets: exactly 3 short bullets.
About the Role: Paragraphs:
About the Role: Link Note (optional):
About the Role: Link URL (optional):
About Callout Box Title (optional):
About Callout Box Text (optional):
Primary Goal (optional):
Responsibilities Section Title:
Responsibilities / What You'll Do: each item is Title + Description.
Who You Are Section Title:
Who You Are: Intro text (optional):
Who You Are Items: Label + Description.
Skills & Mindset We Value (optional):
What You'll Learn (optional):
Why Join Myntmore:
Accent Colour (hex):
Header Info Cards: exactly 3 (Label + Value), e.g. Location, Type, CTC or Stipend.
Google for Jobs Schema Description: 2 to 4 sentences describing the job.
Employment Type: Full-Time, Internship, Full-Time Intern (a full-time role held by an intern), Part-Time or Contractor.
Base Salary Min (INR, numbers only):
Base Salary Max (INR, numbers only):
Salary Unit: Per Year or Per Month.
Date Posted: ISO timestamp, e.g. 2026-11-23T09:00:00+05:30.
Valid Through: ISO timestamp, a few months ahead.
Search Title: max 49 (count).
Search Description: max 160 (count).
Search Keywords: 5 to 8 phrases, separated by commas on ONE line like "lead generation intern india".
Share Title:
Share Description:
Role slug: e.g. lead-gen-intern.
Application Email Subject: e.g. "Application: Lead Generation Intern".

Check before saving: salary figures must be real, and the dates must be right, because Google shows them.

TEXT:
[PASTE YOUR TEXT HERE]
```

---

## 9. Event or webinar (`Events`, can add new)

```
Turn the text below into a Myntmore EVENT page. Follow the shared rules. Fields, in order:

Title (shown on the page and the event card):
Tag: e.g. Live Webinar.
Format: e.g. "Online · Live Webinar".
Date: YYYY-MM-DD.
Start time, India time (24-hour, HH:MM):
End time, India time (24-hour, HH:MM): must be later than the start.
Short description: max 200 characters.
Full description:
"What we'll cover" topics: 3 to 6 bullets.
Registration link: full https:// link. Required if the pop-up is on.
Recording link (optional):
Show the pop-up on the site: Yes or No.
Accent colour (hex):
Short name for the breadcrumb:
Search title: max 49 (count).
Search description: max 160 (count).
Keywords (optional): 4 to 8 phrases, separated by commas on ONE line.
Share title (optional):
Share description (optional):
Event address: slug, e.g. predictable-pipeline-webinar.

TEXT:
[PASTE YOUR TEXT HERE]
```

---

## 10. FAQs (`Page FAQs`, `Homepage FAQs`)

**Page FAQs** (one entry per page, questions are a reorderable list):

```
Turn the text below into PAGE FAQS for one page. Follow the shared rules. Output:

Page: the FAQ key. It is usually the page's address in the admin's existing list (for landing pages "lp-<slug>", for city pages "city-<slug>", for market pages "market-<slug>"). If I did not tell you the page, write NEEDS INPUT.
Questions (in the order they should appear):
  1. Question: written the way a buyer would type it into Google.
     Answer: 40 to 80 words. Start with the direct answer. No marketing fluff.
  (6 to 10 items)

TEXT:
[PASTE YOUR TEXT HERE]
```

**Homepage FAQs** (each question is its own entry):

```
Turn the text below into HOMEPAGE FAQS. Each question is a separate entry. Follow the shared rules. For each:
Question:
Answer: 40 to 80 words.
Order: a number (1 is shown first).
Links under the answer (optional): Link text and Link path (e.g. /services).

TEXT:
[PASTE YOUR TEXT HERE]
```

---

## 11. Google titles and descriptions for pages (`Page search titles`, can add new)

This is the quickest high-impact edit. Each page has just three fields.

```
For each page below, write the Google title and description. Follow the shared rules. For each page output:

Page address: the path, starting with / (e.g. /services/cold-email-outreach).
Search title: max 70 characters here (this type includes the brand), main keyword first (count).
Search description: max 170 characters, includes the main keyword and a reason to click (count).

PAGES AND WHAT EACH IS ABOUT:
[PASTE A LIST: page address, then one line about the page]
```

---

## 12. Editing an existing main page (Homepage, About, Services, Contact, Book a call, service pages, guides, tools)

These pages already exist, so the job is to swap text without breaking the layout. The forms use grouped or numbered labels, so the safest method is to show the AI the current text first.

```
I want to update the text of an existing Myntmore page in the CMS. Follow the shared rules.

STEP 1. I will paste the page's CURRENT fields from the admin (copy each box's label and text). 
STEP 2. I will then paste my NEW basic text.
STEP 3. You output ONLY the fields that should change, as "Field label (exactly as in the admin): new text". Keep every unchanged field out of your answer. Keep the same length as the original wherever the layout has a fixed number of items (cards, steps, stats). Never change links, colours or addresses unless I ask. Show the old text and the new text side by side for each changed field so I can check.

CURRENT FIELDS:
[PASTE CURRENT FIELDS HERE]

NEW TEXT:
[PASTE YOUR NEW TEXT HERE]
```

---

## Tips for the person using the CMS

- Do one page at a time. Save after each page.
- The slug (page address) cannot be changed after the page is created without a developer, so decide it carefully. It should be the main keyword in lowercase with hyphens.
- A new page does not appear in the menu or footer by itself. After saving, ask a developer to link it, or it will only be reachable by its address.
- Never publish a case study or testimonial that the client has not approved. If a number is not real, the page must not use it.
- Search Console: after a new page goes live, open Google Search Console, paste its address into the top bar, and click "Request indexing".
