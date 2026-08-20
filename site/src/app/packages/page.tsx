import type { Metadata } from "next";
import { CTABand } from "@/components/CTABand";
import { FadeIn } from "@/components/FadeIn";
import { PackageCard } from "@/components/PackageCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getPackages } from "@/lib/content";

const TITLE = "Tour Packages from Bengaluru — Full Day-by-Day Itineraries";
const DESCRIPTION =
  "Seven tour packages with full day-by-day itineraries — Goa, Kerala, Rajasthan and Sikkim in India; Dubai, Switzerland and France abroad. Read the plan before you enquire.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "tour packages from Bengaluru",
    "tour packages from Bangalore",
    "family holiday packages India",
    "honeymoon tour packages",
    "customized tour packages",
  ],
  alternates: { canonical: "/packages" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/packages" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function PackagesPage() {
  const packages = getPackages();
  const domestic = packages.filter((p) => p.category === "domestic");
  const international = packages.filter((p) => p.category === "international");

  return (
    <>
      <section className="bg-paper-100">
        <div className="mx-auto max-w-[1200px] px-4 py-16 lg:px-12">
          <h1 className="font-display text-3xl font-semibold text-primary-700 lg:text-[2.5rem]">
            Tour packages
          </h1>
          <p className="mt-3 max-w-[68ch] text-lg text-ink-600">
            Seven trips with the full day-by-day plan published up front — read the
            itinerary first, then enquire. Every package adjusts to your dates and
            budget.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-16 lg:px-12">
        <SectionHeading title="Domestic packages" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {domestic.map((p, i) => (
            <FadeIn key={p.slug} delay={(i % 3) * 40}>
              <PackageCard pkg={p} />
            </FadeIn>
          ))}
        </div>

        <div className="mt-24">
          <SectionHeading title="International packages" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {international.map((p, i) => (
              <FadeIn key={p.slug} delay={(i % 3) * 40}>
                <PackageCard pkg={p} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Don't see your trip?"
        lede="We build custom itineraries from scratch — tell us what you have in mind."
      />
    </>
  );
}
