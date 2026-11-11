// Every permanent redirect, kept in one list because headers() below also needs it.
const REDIRECTS = [
  // Legacy paths kept only for old backlinks/bookmarks. `permanent: true`
  // makes Next.js emit a real 308 here -- these used to be handled by
  // next/navigation's redirect() in each page.tsx, which always issues a
  // 307 (temporary) regardless of intent, telling search engines and
  // caches these moves aren't permanent when they are.
  { source: "/founder-meeting", destination: "/book-a-call", permanent: true },
  { source: "/about", destination: "/about-us", permanent: true },
  { source: "/contact", destination: "/contact-us", permanent: true },
  { source: "/personal-branding", destination: "/services/personal-branding", permanent: true },
  // Renamed from the opaque "GIAtech-stack" slug and moved under guides.
  // It was in the sitemap, so Google may already hold the old URL.
  { source: "/GIAtech-stack", destination: "/resources/guides/ai-tech-stack-jewellery", permanent: true },
  // Renamed 2026-09-07 and never redirected -- these were shared directly
  // with JBCN/NMIMS students (talks, QR codes), so the dead links were
  // driving real visitor 404s, not just crawler noise. Point straight at
  // the final destination rather than chaining through the intermediate
  // slug each was briefly renamed to.
  { source: "/jbcn-ai-quickstart", destination: "/resources/guides/education-guide", permanent: true },
  { source: "/ai-takeaways", destination: "/resources/guides/education-guide", permanent: true },
  { source: "/nmims-toolkit", destination: "/resources/guides/careers-and-job-guide", permanent: true },
  // Retired full-time role (removed 2026-07-28), still 404ing in Search
  // Console. Points at the careers hub rather than the similarly named
  // intern listing, which is a different seniority and salary band.
  { source: "/careers/content-strategist", destination: "/careers", permanent: true },
  // Retired full-time role (removed 2026-09-24), no longer listed on /careers.
  { source: "/careers/senior-sales-head", destination: "/careers", permanent: true },

  // Legacy WordPress URLs from the previous site, still being crawled and
  // reported as 404s. Only the ones with a genuine present-day equivalent
  // are mapped here. The discontinued service lines (/cro, /sem,
  // /app-development, /web-development, /custom-erp-development,
  // /photography-videography, /academy) are deliberately left to 404:
  // Myntmore no longer sells any of them, and pointing them at /services
  // would be an irrelevant redirect that Google treats as a soft 404.
  // Folded into the older, same-topic post (published 2026-10-17, merged the same day).
  { source: "/blog/multi-threading-b2b-outbound", destination: "/resources/blogs/multi-threading-b2b-buying-committee", permanent: true },
  // The first CMS post was published under its auto-generated long address, then renamed
  // (2026-10-29). Both forms of the old address go straight to the final one in one hop.
  { source: "/blog/the-offer-problem-why-great-copy-can-t-save-a-weak-offer", destination: "/resources/blogs/outbound-offer-problem", permanent: true },
  { source: "/resources/blogs/the-offer-problem-why-great-copy-can-t-save-a-weak-offer", destination: "/resources/blogs/outbound-offer-problem", permanent: true },

  // Every blog post lives at /resources/blogs/<slug> (moved 2026-10-28 from /blog/<slug>).
  // The specific redirect above must stay first so a retired slug goes straight to its
  // final address in one hop. The singular /resources/blog/... is a common mistyping.
  { source: "/blog", destination: "/resources/blogs", permanent: true },
  { source: "/blog/:slug*", destination: "/resources/blogs/:slug*", permanent: true },
  { source: "/resources/blog", destination: "/resources/blogs", permanent: true },
  { source: "/resources/blog/:slug*", destination: "/resources/blogs/:slug*", permanent: true },
  { source: "/home", destination: "/", permanent: true },
  { source: "/webinar", destination: "/events", permanent: true },
  { source: "/branding", destination: "/services/personal-branding", permanent: true },
  { source: "/website-newsletter", destination: "/newsletter-subscribe", permanent: true },
  { source: "/discover-our-most-popular-services", destination: "/services", permanent: true },
  { source: "/other-services", destination: "/services", permanent: true },

  // Private pricing pages moved from descriptive region slugs to a
  // code-based URL so neither the URL nor the page itself names a
  // region. Redirected in case either old link was already sent to a
  // prospect.
  { source: "/international-pricing", destination: "/plans/mars", permanent: true },
  { source: "/indian-pricing", destination: "/plans/earth", permanent: true },
  // Renamed 2026-09-30 from the first-round codes (alpha/beta) to
  // mars/earth -- redirected in case either was already sent out.
  { source: "/plans/alpha", destination: "/plans/mars", permanent: true },
  { source: "/plans/beta", destination: "/plans/earth", permanent: true },
  // The cold emailing package pages (the overview and the private Mars and
  // Earth versions) were removed when they were folded into the public cold
  // email service page. The URLs had already been sent to prospects, so they
  // now land on that page.
  { source: "/cold-emailing-package", destination: "/services/cold-email", permanent: true },
  { source: "/cold-emailing-package-mars", destination: "/services/cold-email", permanent: true },
  { source: "/cold-emailing-package-earth", destination: "/services/cold-email", permanent: true },

  // Every guide lives at /resources/guides/<slug>. The Instagram bio-link
  // pages and the four root-level guides moved there 2026-10-12; 301 (not
  // Next's default 308) as requested, and old Instagram bio links and
  // QR codes keep working through the wildcard.
  { source: "/instagram-resources", destination: "/resources/guides", statusCode: 301 },
  { source: "/instagram-resources/:slug", destination: "/resources/guides/:slug", statusCode: 301 },
  { source: "/dos-and-donts-of-outreach", destination: "/resources/guides/dos-and-donts-of-outreach", statusCode: 301 },
  { source: "/how-to-choose-an-outbound-agency", destination: "/resources/guides/how-to-choose-an-outbound-agency", statusCode: 301 },
  { source: "/careers-and-job-guide", destination: "/resources/guides/careers-and-job-guide", statusCode: 301 },
  { source: "/education-guide", destination: "/resources/guides/education-guide", statusCode: 301 },
  { source: "/resource/guides/job-applications-sales-funnel", destination: "/resources/guides/job-applications-sales-funnel", permanent: true },

  // Private cold emailing overview renamed to carry a planet code (the
  // USD page is mars, a rupee clone sits at -earth). Redirected in case
  // the original link was already sent to a prospect.
];

// The canonical Link header (see headers() below) is also sent on redirect responses, because Next.js
// matches header rules on the request path before redirecting. Without this override an old address
// such as /blog/<slug> answered with a 308 to /resources/blogs/<slug> plus a header naming the OLD
// address as canonical, and Google kept the old address (Search Console: "Duplicate, Google chose
// different canonical than user"). A later rule for the same key wins, so each redirect source gets a
// header naming its destination instead.
const SITE = "https://www.myntmore.com";
const redirectCanonicalHeaders = REDIRECTS.map((r) => ({
  source: r.source,
  headers: [{ key: "Link", value: `<${r.destination === "/" ? SITE : SITE + r.destination}>; rel="canonical"` }],
}));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // /resources/blogs re-renders itself hourly (it refetches the Medium feed), and on Vercel that
    // runs in a serverless function. The blog cards are read from content/posts/*.mdoc at render
    // time, so those files must ship with the function: without this the regenerated page has no
    // post cards. (Pages that are only built once at deploy time need no such entry.)
    outputFileTracingIncludes: {
      "/resources/blogs": ["./content/posts/**/*"],
    },
  },
  images: {
    // AVIF first (smaller than WebP in most cases), WebP as fallback for
    // browsers that don't support AVIF yet. next/image serves whichever the
    // requesting browser's Accept header supports.
    formats: ["image/avif", "image/webp"],
  },
  // A second canonical signal, in the response headers as well as the page's <link rel="canonical">.
  // Search Console has shown Google picking another site's homepage as the canonical for some of our
  // URLs with no declared canonical on record, so the header repeats what the HTML tag already says.
  // The value is the request's own path, which matches the self-canonical every page declares.
  // Not applied to files (anything with a dot), /_next, /api, /fonts, or the dm-angle-generator
  // pages, which are served from another app that declares its own canonical.
  async headers() {
    return [
      { source: "/", headers: [{ key: "Link", value: '<https://www.myntmore.com>; rel="canonical"' }] },
      {
        source: "/:path((?!_next|api|fonts|tools/dm-angle-generator)[^.]+)",
        headers: [{ key: "Link", value: '<https://www.myntmore.com/:path>; rel="canonical"' }],
      },
      ...redirectCanonicalHeaders,
    ];
  },
  async rewrites() {
    return [
      {
        source: "/tools/dm-angle-generator",
        destination: "https://mynt-more-angles.lovable.app",
      },
      {
        source: "/tools/dm-angle-generator/:path*",
        destination: "https://mynt-more-angles.lovable.app/:path*",
      },
    ];
  },
  async redirects() {
    return REDIRECTS;
  },
};

module.exports = nextConfig;
