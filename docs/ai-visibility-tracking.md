# AI visibility tracking

No API reports whether ChatGPT, Perplexity, Claude or Gemini mention Myntmore, so this is a monthly manual check. It takes about two hours. Results go in [`ai-visibility-tracker.csv`](./ai-visibility-tracker.csv) (one row per engine and prompt, copy the block for each new month).

The prompts come from [`ai-visibility-prompts.csv`](./ai-visibility-prompts.csv): 16 are asked every month (the ones in the tracker), and 47 more are asked once a quarter (a quarter of them each month works too). Each prompt names the page that should be cited, so a miss points straight at the page to strengthen. The list, and the city and ICP keyword lists it sits beside, are explained in [`keyword-research-2026-11.md`](./keyword-research-2026-11.md) and regenerated with `npm run keywords:build`.

## How to run it

1. Open each engine in a fresh session, signed out or in a clean profile, so earlier chats do not colour the answer.
2. Ask each prompt in the sheet exactly as written. Do not rephrase.
3. For every answer, fill one row:
   - **myntmore_mentioned**: yes or no.
   - **how it is described**: the words used about Myntmore, if mentioned.
   - **competitors_named**: who else appears. This is the gap map.
   - **sources_cited** and **myntmore_pages_cited**: the URLs the engine shows (Perplexity and Gemini show them; ChatGPT does when browsing).
   - **facts_the_answer_gets_wrong**: anything false about Myntmore (founder, location, services, numbers, pricing).
   - **likely_page_or_gap**: which page seems to have fed the answer, or which page is missing.
4. Decide one action per gap and record it in **action_taken**.

The entity prompts (`What is Myntmore?`, `Who is Tejas Jhaveri?`, `Myntmore reviews`) catch wrong facts and reputation, not missing mentions.

## Turning results into work

| What you see | What to do |
|---|---|
| Myntmore never appears for a commercial prompt | Check the service page for that intent has a direct answer block and a case study; look at which competitors' pages are cited and what they contain that ours does not. |
| A wrong fact appears | Find where the wrong version could come from (an old page, an inconsistent number), fix it at the source, and check `public/llms.txt`'s "Do not infer" list covers it. Use `npm run audit:entity` to find conflicting numbers. |
| Myntmore is mentioned but a competitor's page is cited | The engine found their page more citable. Add the missing definition, comparison or data to ours. |
| A page of ours is cited | Keep it current: update the page, and its date, when anything on it changes. |
| Pricing or cost prompts | We do not publish pricing. Expect no direct answer; do not add numbers to fix it. |

## Related

- Recurring tasks and where this fits: [`seo-aeo-geo-cadence.md`](./seo-aeo-geo-cadence.md)
- What AI systems are told about the site: `public/llms.txt` (curated) and `public/llms-full.txt` (generated on build)
- Off-site work that decides most of this (reviews, directories, podcasts, interviews): `myntmore-ai-visibility-checklist.md`
