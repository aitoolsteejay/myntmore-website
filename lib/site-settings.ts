import defaultSettings from "@/content/site-settings/settings.json";

export interface SiteSettings {
  navbarCtaLabel: string;
  navbarCtaHref: string;
  announcementEnabled: boolean;
  announcementText: string;
  announcementHref: string;
  companyEmail: string;
  officeAddressLine1: string;
  officeAddressLine2: string;
  officeCity: string;
  officeMapsUrl: string;
  copyrightNotice: string;
}

export function getSiteSettings(): SiteSettings {
  return {
    navbarCtaLabel: defaultSettings.navbarCtaLabel || "Book a call",
    navbarCtaHref: defaultSettings.navbarCtaHref || "/book-a-call",
    announcementEnabled: Boolean(defaultSettings.announcementEnabled),
    announcementText: defaultSettings.announcementText || "",
    announcementHref: defaultSettings.announcementHref || "",
    companyEmail: defaultSettings.companyEmail || "growth@myntmore.com",
    officeAddressLine1: defaultSettings.officeAddressLine1 || "WeWork Enam Sambhav BKC",
    officeAddressLine2: defaultSettings.officeAddressLine2 || "C - 20, G Block Rd, G Block BKC, Bandra Kurla Complex, Bandra East",
    officeCity: defaultSettings.officeCity || "Mumbai, Maharashtra 400051",
    officeMapsUrl: defaultSettings.officeMapsUrl || "https://www.google.com/maps/search/?api=1&query=WeWork%20Enam%20Sambhav%2C%20C%20-%2020%2C%20G%20Block%20Rd%2C%20G%20Block%20BKC%2C%20Bandra%20Kurla%20Complex%2C%20Bandra%20East%2C%20Mumbai%2C%20Maharashtra%20400051",
    copyrightNotice: defaultSettings.copyrightNotice || "© 2026 Myntmore. Built in Mumbai.",
  };
}
