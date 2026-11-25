# Myntmore CMS: prompts that turn plain text into CMS-ready pages

These prompts now live in [`docs/cms-prompts/`](cms-prompts/README.md): one prompt for **every** content type in the admin (blog posts, industry, city and industry x city pages, case studies, glossary, guides, careers, events, FAQs, Google titles, calendar pages, team cards, site settings, every main page, guide and tool page).

Each prompt is generated from the admin form itself (`npm run cms-prompts:build`), so the field names, their order, character limits, item counts and drop-down options always match what you see at myntmore.com/admin. Keywords come out comma-separated on one line.
