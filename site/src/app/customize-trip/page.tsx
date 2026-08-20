import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Phone, WhatsAppIcon } from "@/components/icons";
import { getContact, waGenericUrl } from "@/lib/content";

const TITLE = "Customize Your Trip — Build a Holiday from Scratch";
const DESCRIPTION =
  "Build a holiday from scratch — tell us your destination, dates, budget and hotel preference, and Prestige Holidays 4U plans the itinerary around you.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "customized holiday package Bangalore",
    "custom tour itinerary India",
    "personalized travel planning Bengaluru",
    "tailor-made holiday package",
  ],
  alternates: { canonical: "/customize-trip" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/customize-trip" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const STEPS = [
  {
    step: "1",
    title: "Tell us the shape of it",
    text: "Destination, dates, budget, who's coming — the form below takes two minutes.",
  },
  {
    step: "2",
    title: "We plan, you adjust",
    text: "A day-by-day itinerary lands on your WhatsApp — swap days, hotels, pace until it fits.",
  },
  {
    step: "3",
    title: "Book and go",
    text: "Once it's right, we handle the bookings — and stay reachable throughout the trip.",
  },
];

export default function CustomizeTripPage() {
  const c = getContact();

  return (
    <>
      <section className="bg-paper-100">
        <div className="mx-auto max-w-[1200px] px-4 py-16 lg:px-12">
          <h1 className="font-display text-3xl font-semibold text-primary-700 lg:text-[2.5rem]">
            Built from scratch, just for you
          </h1>
          <p className="mt-3 max-w-[68ch] text-lg text-ink-600">
            No template fits everyone. Tell us what you have in mind and we&rsquo;ll
            plan a trip around your dates, budget and pace — not the other way
            around.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1200px] gap-12 px-4 py-16 lg:grid-cols-[2fr_1fr] lg:px-12">
        <section aria-label="Customize your trip form">
          <h2 className="mb-6 font-display text-2xl font-semibold text-ink-900">
            Your trip, your terms
          </h2>
          <EnquiryForm variant="customize" whatsappNumber={c.whatsapp_number} email={c.email} />
        </section>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          {STEPS.map((s) => (
            <div key={s.step} className="rounded-xl bg-paper-0 p-6 shadow-card">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 font-display text-lg font-semibold text-paper-0">
                {s.step}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink-900">{s.title}</h3>
              <p className="mt-1 text-sm text-ink-600">{s.text}</p>
            </div>
          ))}

          <div className="rounded-xl bg-primary-100 p-6">
            <h3 className="font-display text-lg font-semibold text-primary-700">
              Prefer to just talk?
            </h3>
            <div className="mt-3 space-y-2">
              <a
                href={waGenericUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-semibold text-primary-700 hover:text-primary-600"
              >
                <WhatsAppIcon size={18} /> Chat on WhatsApp
              </a>
              <a
                href={c.phone_href}
                className="flex items-center gap-2 font-semibold text-primary-700 hover:text-primary-600"
              >
                <Phone size={18} /> {c.phone}
              </a>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
