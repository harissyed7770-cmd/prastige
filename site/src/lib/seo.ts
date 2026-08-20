import type { Destination, Pkg } from "./content";
import { getContact, getDestinations } from "./content";

export const SITE_URL = "https://prestigeholidays4u.com";
export const SITE_NAME = "Prestige Holidays 4U";

// HBR Layout, Bengaluru — area-level coordinates (not rooftop-precise),
// sourced 2026-07-31 for LocalBusiness geo markup.
export const BUSINESS_GEO = { lat: 13.019144, lng: 77.646454 };

const DAY_URIS: Record<string, string> = {
  Monday: "https://schema.org/Monday",
  Tuesday: "https://schema.org/Tuesday",
  Wednesday: "https://schema.org/Wednesday",
  Thursday: "https://schema.org/Thursday",
  Friday: "https://schema.org/Friday",
  Saturday: "https://schema.org/Saturday",
  Sunday: "https://schema.org/Sunday",
};
const DAY_ORDER = Object.keys(DAY_URIS);

function expandDayRange(range: string): string[] {
  const parts = range.split("-").map((s) => s.trim());
  if (parts.length === 1) return [parts[0]];
  const [start, end] = parts;
  const startIdx = DAY_ORDER.indexOf(start);
  const endIdx = DAY_ORDER.indexOf(end);
  if (startIdx === -1 || endIdx === -1) return [];
  const out: string[] = [];
  for (let i = startIdx; i <= endIdx; i++) out.push(DAY_ORDER[i]);
  return out;
}

function to24h(time: string): string {
  const m = time.trim().match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!m) return time;
  let h = parseInt(m[1], 10);
  const min = m[2];
  const period = m[3].toUpperCase();
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${min}`;
}

/** Sitewide TravelAgency/LocalBusiness structured data — rendered once in the root layout. */
export function organizationJsonLd() {
  const c = getContact();
  const destinations = getDestinations();
  const countries = Array.from(new Set(destinations.map((d) => d.country)));

  const openingHoursSpecification = c.office_hours.map((h) => {
    const [openRaw, closeRaw] = h.hours.split("-").map((s) => s.trim());
    return {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: expandDayRange(h.days).map((d) => DAY_URIS[d]),
      opens: to24h(openRaw),
      closes: to24h(closeRaw),
    };
  });

  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${SITE_URL}/#organization`,
    name: c.business_name,
    url: SITE_URL,
    logo: `${SITE_URL}/logo/prestige-logo.png`,
    image: `${SITE_URL}/og/default.png`,
    telephone: c.phone,
    email: c.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${c.address.line1}, ${c.address.line2}`,
      addressLocality: c.address.city,
      addressRegion: c.address.state,
      postalCode: c.address.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS_GEO.lat,
      longitude: BUSINESS_GEO.lng,
    },
    openingHoursSpecification,
    areaServed: countries.map((name) => ({ "@type": "Country", name })),
    sameAs: c.social ? Object.values(c.social) : undefined,
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

/** TouristDestination schema with each researched attraction as TouristAttraction. */
export function destinationJsonLd(d: Destination) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: d.name,
    description: d.hero_description,
    url: `${SITE_URL}/destinations/${d.slug}`,
    touristType: d.category === "domestic" ? "Domestic travellers" : "International travellers",
    includesAttraction: d.top_attractions.map((a) => ({
      "@type": "TouristAttraction",
      name: a.name,
      description: a.description,
    })),
  };
}

/** TouristTrip schema for a package. No price/Offer — none is on file, and we never fabricate one. */
export function tripJsonLd(p: Pkg, destinationName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: p.name,
    description: p.summary,
    url: `${SITE_URL}/packages/${p.slug}`,
    touristType: p.audience,
    itinerary: {
      "@type": "ItemList",
      itemListElement: p.itinerary.map((day) => ({
        "@type": "ListItem",
        position: day.day,
        name: day.title,
        description: day.description,
      })),
    },
    provider: { "@id": `${SITE_URL}/#organization` },
    about: destinationName,
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
