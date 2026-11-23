import events from "./events.generated.json";

// The events, edited in the Keystatic admin ("Events") as content/events/<slug>.json.
// scripts/generate-event-pages.mjs (run by prebuild) turns them into lib/events.generated.json, working out the
// ISO dates and display times, and writes each detail page under app/events/<slug>/. The /events page, the
// event pop-up, UpcomingEvents and the sitemap all read this list, so adding an event needs no code change.
//
// Note: a new event will NOT appear on the homepage. The "Come see us live" section was deliberately removed from
// app/page.tsx; UpcomingEvents still works and can be dropped back in there if that slot is ever wanted again.
export interface EventItem {
  slug: string;
  tag: string;
  title: string;
  description: string; // the short card text
  longDescription: string; // the detail page text and the Event schema
  isoDate: string;
  isoStartDateTime: string;
  isoEndDateTime: string; // full ISO 8601 datetime with timezone offset, used to determine "upcoming" status
  displayDate: string;
  longDate: string;
  time: string;
  format: string;
  accent: string;
  breadcrumbLabel: string;
  topics: string[];
  registrationUrl: string;
  recordingUrl: string;
  showPopup: boolean; // the admin's "Show the pop-up" switch
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
}

// Soonest first (the generator sorts them).
export const EVENTS: EventItem[] = events as EventItem[];

export function eventBySlug(slug: string): EventItem {
  const e = EVENTS.find((x) => x.slug === slug);
  if (!e) throw new Error(`No event "${slug}" in lib/events.generated.json; run npm run events:build`);
  return e;
}

export function isUpcoming(e: EventItem): boolean {
  return new Date(e.isoEndDateTime).getTime() >= Date.now();
}
