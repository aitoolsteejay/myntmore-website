# Self-hosted fonts

`Inter-latin-variable.woff2` is the Latin subset of Inter (variable, weights
100-900) as published by Google Fonts, licensed under the SIL Open Font
License 1.1 (https://openfontlicense.org). It is loaded in `app/layout.tsx`
through `next/font/local` so `next build` never needs network access to a
font host.

To refresh it: request
`https://fonts.googleapis.com/css2?family=Inter:wght@100..900` with a modern
browser User-Agent, copy the `src: url(...)` of the `/* latin */` block, and
replace the file. Only the Latin subset is shipped, matching the previous
`subsets: ["latin"]` setting.

`PlusJakartaSans-latin-variable.woff2` is the Latin subset of Plus Jakarta Sans
(variable, weights 200-800), SIL Open Font License 1.1, taken from the
`@fontsource-variable/plus-jakarta-sans` npm package. Loaded by `jakarta.ts` for
the Prospect Research tool.
