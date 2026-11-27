import localFont from "next/font/local";

// Self-hosted Plus Jakarta Sans (SIL OFL), Latin subset, variable 200-800, from @fontsource-variable.
// Used by the Prospect Research tool. Its own module for the reason given in ./caveat.ts.
export const jakarta = localFont({
  src: "./PlusJakartaSans-latin-variable.woff2",
  variable: "--font-jakarta",
  display: "swap",
  weight: "200 800",
});
