# Myntmore - Developer Handoff

> Built with Claude Code by Tejas. This document covers everything a developer needs to continue working on the site - design principles, component breakdown, animation specs, colour system, and deployment process.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + inline styles |
| Fonts | Inter (body) + Caveat (handwritten annotations) via `next/font/google` |
| Deployment | Vercel |
| Repo | GitHub - `aitoolsteejay/myntmore-website` (master branch) |

**Run locally:**
```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build check
```

**Deploy:**
```bash
vercel --prod     # requires Vercel CLI + auth
```

---

## Design Principles

1. **Light & warm, not dark.** Background is `#F8F6F2` (warm off-white). Never pure white pages.
2. **Gold is the brand accent.** Primary accent colour is `#F5B731`. Used for CTAs, underlines, highlights, dots, and borders.
3. **Subtle gradients only.** Blobs and background gradients should be barely-there (opacity 0.07–0.18). No vivid/loud backgrounds.
4. **Typography is heavy.** Section headings use `font-black` (900). Body uses regular weight. The contrast between black headings and light body creates visual rhythm.
5. **Cards are white on warm.** All cards use `background: #ffffff` with a `1px solid #E8E2D9` border. No coloured card backgrounds except very faint accent tints.
6. **Animations serve clarity.** Every animation has a purpose - scroll-triggered reveals, live number tickers, draw-in underlines. Nothing is decorative noise.
7. **Mobile-first typography.** Headings scale: `text-3xl` mobile → `text-5xl` desktop. Never let headings overflow on small screens.

---

## Colour System

```
Brand gold:        #F5B731   (fills, borders, dots, underlines; text only on dark)
Gold hover/dark:   #D97706
Gold as text:      #A14A08   (GOLD_TEXT in lib/colors.ts, on light surfaces)
Gold border:       rgba(245,183,49,0.35)
Gold bg tint:      #FEF9EC

Page background:   #F8F6F2
White card:        #ffffff
Card border:       #E8E2D9
Section dividers:  #E8E2D9

Text primary:      #0a0a0a
Text secondary:    #52525B
Text muted:        #6B6B6B / #71675E
Text disabled:     #B8B0A7   (disabled controls only; 2:1, not for readable text)
```

**Gold is for fills, not text on light backgrounds.** Gold `#F5B731` and `#D97706` work for fills, borders, dots, underlines and for text on dark sections, but as text on the light page they read at 1.7:1 and 3.0:1 (WCAG AA needs 4.5:1). Gold-coloured text on a light surface uses `GOLD_TEXT` (`#A14A08`) from `lib/colors.ts`, and any accent colour that drives text goes through `textTone(accent)`, which turns gold into `#A14A08` and leaves every other colour alone.

**Accent colours (service cards / chips only):**
```
Blue:    #3B82F6    Purple:  #7C3AED / #A855F7
Green:   #22C55E    Orange:  #FF6B35
Teal:    #14B8A6    Pink:    #EC4899
```

---

## Button Classes (globals.css)

Three reusable button classes - all defined in `app/globals.css`:

| Class | Description |
|---|---|
| `.btn-dark` | Primary CTA - white→cream gradient, gold border, warms to amber on hover with shimmer sweep |
| `.btn-mint` | Same as btn-dark (kept for legacy) |
| `.btn-ghost` | Transparent with gold border, fills cream→amber on hover |

**Usage:**
```tsx
<a href="..." className="btn-dark px-8 py-4 text-base font-bold inline-flex items-center gap-2">
  Book a Call
</a>
```

---

## Component Map

All components live in `app/components/`. Page assembly is in `app/page.tsx`.

| Component | Section | Key Notes |
|---|---|---|
| `Navbar.tsx` | Fixed top nav | Mobile drawer, scrolled state changes bg. Height: `h-16 sm:h-24` |
| `Hero.tsx` | Hero | Blob parallax (4 blobs), animated underline, number ticker, cycling phrase, handwritten annotations (desktop only) |
| `LogoStrip.tsx` | Logo marquee | CSS marquee, infinite scroll |
| `Services.tsx` | Services | 3-col card grid, scroll-triggered wavy underline SVG, stat strip with live ticker |
| `BenefitsMarquee.tsx` | Benefits | 3 rows of chips, alternating left/right marquee, 2-palette chip system (gold + purple) |
| `WhoWeHelp.tsx` | Personas | Auto-cycling tabs (1.8s), progress bar on active tab, content fade transition, pauses on hover |
| `SystemFlow.tsx` | How it works | 2-row flow diagram (desktop), vertical stacked list (mobile), traveling dot animations on arrows, sequential card highlight loop |
| `Promise.tsx` | Promise | Typewriter effect cycling through phrases, scattered gold dot decorations |
| `Results.tsx` | Results | Scroll-triggered number ticker, case study cards |
| `HowItWorks.tsx` | Process | 4-step grid with connector lines |
| `Industries.tsx` | Industries | Pill cloud with `bubble-float` animation, hover colour reveal |
| `Testimonials.tsx` | Testimonials | Two auto-scrolling rows (opposite directions), barely-there pastel card backgrounds |
| `CTABanner.tsx` | CTA | 3 animated blobs (JS parallax), large headline |
| `FAQ.tsx` | FAQ | Accordion, CSS `max-height` transition |
| `Footer.tsx` | Footer | 4-col grid, single breathing glow blob, canvas dust motes particle system |

---

## Animation System

### CSS Keyframes (globals.css)

```css
marquee-left / marquee-right   /* Testimonial + Benefits rows */
bubble-float                   /* Industries pills, Promise dots */
tab-progress                   /* WhoWeHelp progress bar (scaleX 1→0) */
handwrite-float-r / -l         /* Hero annotations floating */
wf-flow-right / wf-flow-down   /* SystemFlow traveling dots */
wf-shimmer                     /* SystemFlow card shimmer sweep */
ctaGradient                    /* (legacy, unused) */
```

### JavaScript Animations (requestAnimationFrame)

| Animation | File | Technique |
|---|---|---|
| Blob parallax | Hero, CTABanner, SystemFlow, Footer | `sin/cos` movement on rAF loop |
| Handwrite draw-in | Hero | `strokeDashoffset` from length→0, `clip-path: inset(0 X% 0 0)` for text |
| Hero underline draw-in | Hero | `strokeDashoffset`, fires 500ms after mount |
| Services underline | Services | `strokeDashoffset`, `IntersectionObserver` threshold 0.4 |
| Number tickers | Hero, Services, Results | Eased counter (ease-out cubic `1 - (1-t)³`), `IntersectionObserver` |
| Cycling phrase | Hero | Fade + translateY out/in, 3.2s interval |
| WhoWeHelp content | WhoWeHelp | Opacity + translateY fade on tab switch |
| SystemFlow cards | SystemFlow | Sequential `opacity + translateY` reveals, then border highlight loop |
| Footer dust motes | Footer | Canvas API, 28 motes with slow upward drift |

### IntersectionObserver usage
- `threshold: 0.4` - Services underline, Services stat ticker
- `threshold: 0.2` - Results ticker
- `threshold: 0.12` - SystemFlow card reveal sequence

---

## Fonts

Loaded in `app/layout.tsx`:
```tsx
import { Inter, Caveat } from "next/font/google";

const inter  = Inter({ subsets: ["latin"], variable: "--font-inter", ... });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat", weight: ["400","600","700"] });

// Applied: <html className={`${inter.variable} ${caveat.variable}`}>
```

**Caveat** is used only for the two handwritten annotations in the Hero (`fontFamily: "var(--font-caveat)"`).

---

## Mobile Responsiveness

All sections are mobile-optimised. Key breakpoints used: `sm` (640px), `lg` (1024px).

**Critical mobile decisions:**
- **SystemFlow**: Desktop shows 2-row grid with arrows. Mobile shows vertical stacked cards (`block lg:hidden` / `hidden lg:block`).
- **Navbar**: `h-16 sm:h-24`, logo `h-12 sm:h-20`.
- **Hero**: `text-4xl sm:text-6xl lg:text-7xl xl:text-8xl` - scales progressively.
- **Handwritten annotations**: `hidden lg:flex` - desktop only.
- **Stats row (Hero)**: Stacks vertically on mobile with `border-b sm:border-b-0 sm:border-r`.
- **Results grid**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`.
- **WhoWeHelp tabs**: `grid-cols-2 lg:grid-cols-4`.

---

## Content / Copy Notes

- **Calendly links**: All CTAs link to `https://calendly.com` - replace with the real Calendly URL when ready.
- **Email**: `growth@myntmore.com`
- **Logos**: `/public/logo.png` - the Myntmore logo file.
- **Testimonials**: Anonymised fictional client names (Sarah K., James R., etc.) - replace with real ones when available.
- **Case studies (Results section)**: Anonymised - "Series B SaaS Fintech", "B2B Professional Services".
- **Stats**: 130+ B2B companies, $120M+ pipeline, 12K+ meetings booked, campaigns live within 18 days (first qualified conversations in weeks 3–4). `lib/entity-facts.json` is the source of truth; `npm run audit:entity` checks the pages against it.

---

## Known Limitations / TODO

- [ ] Replace all `https://calendly.com` links with the real booking URL
- [ ] Add real client logos to LogoStrip (currently text-only pills)
- [ ] Replace fictional testimonials with real ones
- [ ] Add OG image / meta tags for social sharing (`app/layout.tsx`)
- [ ] Add Google Analytics or Posthog tracking
- [ ] Privacy policy and terms pages (linked in footer but `href="#"`)
- [ ] Consider adding a contact form instead of / alongside email link

---

## Deployment

**Vercel project:** `myntmoreclaude` under `aitoolsteejays-projects`  
**Production URL:** https://myntmoreclaude.vercel.app  
**GitHub:** https://github.com/aitoolsteejay/myntmore-website (master branch auto-deploys via Vercel)

Pushing to `master` does **not** auto-deploy - manual `vercel --prod` is used currently. Consider enabling Vercel's GitHub integration for auto-deploys on push.
