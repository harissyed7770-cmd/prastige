import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.resolve(process.cwd(), "..", "content");

export interface Attraction {
  name: string;
  description: string;
  image_needed: boolean;
}

export interface Destination {
  slug: string;
  name: string;
  country: string;
  category: "domestic" | "international";
  tagline: string;
  hero_description: string;
  best_time_to_visit: string;
  top_attractions: Attraction[];
  activities: string[];
  sample_itinerary_days: number | null;
  content_status: string;
  source: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface Pkg {
  slug: string;
  name: string;
  destination_slug: string;
  category: "domestic" | "international";
  duration: string;
  tier: "Standard" | "Premium" | "Luxury";
  audience: string;
  summary: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  whatsapp_enquiry_prefill: string;
  /** P2: optional — the price node renders only when this exists. */
  price_from?: number;
  content_status: string;
}

export interface Contact {
  business_name: string;
  phone: string;
  phone_href: string;
  email: string;
  whatsapp_number: string;
  whatsapp_enquiry_template: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  office_hours: { days: string; hours: string }[];
  /** P2: optional — social icons render only when real URLs exist. */
  social?: Record<string, string>;
}

export interface About {
  business_name: string;
  base_city: string;
  who_we_are: string;
  mission: string;
  vision: string;
  core_values: { name: string; description: string }[];
  /** P2: optional — footer year line renders only when this exists. */
  founded_year?: number;
}

export interface Service {
  name: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  city: string;
  trip_taken: string;
  planner_name?: string;
}

function readJson<T>(...segments: string[]): T {
  const file = path.join(CONTENT_DIR, ...segments);
  return JSON.parse(fs.readFileSync(file, "utf8")) as T;
}

function listSlugs(dir: string): string[] {
  return fs
    .readdirSync(path.join(CONTENT_DIR, dir))
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""));
}

export function getDestinations(): Destination[] {
  const all = listSlugs("destinations").map((slug) =>
    readJson<Destination>("destinations", `${slug}.json`),
  );
  // Placeholder guard: the site must never ship unwritten content.
  const unfinished = all.filter((d) => d.content_status !== "researched_complete");
  if (unfinished.length > 0) {
    throw new Error(
      `Build blocked: destinations not researched_complete: ${unfinished
        .map((d) => d.slug)
        .join(", ")}`,
    );
  }
  const order = [
    "goa", "kerala", "rajasthan", "delhi", "sikkim", "kashmir",
    "france", "switzerland", "uae", "thailand", "azerbaijan",
    "singapore", "maldives", "dubai",
  ];
  return all.sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug));
}

export function getDestination(slug: string): Destination {
  const d = getDestinations().find((x) => x.slug === slug);
  if (!d) throw new Error(`Unknown destination: ${slug}`);
  return d;
}

export function getPackages(): Pkg[] {
  const order = [
    "goa-family-holiday", "kerala-backwaters-tour", "rajasthan-heritage-tour",
    "sikkim-himalayan-adventure", "dubai-luxury-tour",
    "switzerland-romantic-escape", "paris-french-riviera",
  ];
  return listSlugs("packages")
    .map((slug) => readJson<Pkg>("packages", `${slug}.json`))
    .sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug));
}

export function getPackage(slug: string): Pkg {
  const p = getPackages().find((x) => x.slug === slug);
  if (!p) throw new Error(`Unknown package: ${slug}`);
  return p;
}

export function getPackageForDestination(slug: string): Pkg | undefined {
  return getPackages().find((p) => p.destination_slug === slug);
}

export const getContact = (): Contact => readJson<Contact>("company", "contact.json");
export const getAbout = (): About => readJson<About>("company", "about.json");
export const getServices = (): Service[] =>
  readJson<{ services: Service[] }>("company", "services.json").services;

/** P2: testimonials ship hidden — section renders only with >= 3 real quotes. */
export function getTestimonials(): Testimonial[] {
  const file = path.join(CONTENT_DIR, "company", "testimonials.json");
  if (!fs.existsSync(file)) return [];
  const t = JSON.parse(fs.readFileSync(file, "utf8")) as Testimonial[];
  return t.length >= 3 ? t : [];
}

export function waUrl(text: string): string {
  const c = getContact();
  return `https://wa.me/${c.whatsapp_number}?text=${encodeURIComponent(text)}`;
}

export const waGenericUrl = (): string => waUrl(getContact().whatsapp_enquiry_template);

/** Short season label for the destination-card badge. Curated, never generated. */
const BEST_TIME_SHORT: Record<string, string> = {
  goa: "Nov–Feb",
  kerala: "Oct–Mar",
  rajasthan: "Oct–Mar",
  delhi: "Oct–Mar",
  sikkim: "Mar–May · Oct–Dec",
  kashmir: "Apr–Jun · Dec–Feb",
  france: "Apr–May · Sep–Oct",
  switzerland: "Jun–Sep",
  uae: "Dec–Mar",
  thailand: "Nov–Mar",
  azerbaijan: "Apr–Jun · Sep–Oct",
  singapore: "Year-round",
  maldives: "Nov–Apr",
  dubai: "Nov–Apr",
};

export const bestTimeShort = (slug: string): string => BEST_TIME_SHORT[slug] ?? "";
