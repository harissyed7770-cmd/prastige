import { CTABand } from "./CTABand";
import { DestinationCard } from "./DestinationCard";
import { FadeIn } from "./FadeIn";
import { PackageCard } from "./PackageCard";
import { SectionHeading } from "./SectionHeading";
import { getDestinations, getPackages } from "@/lib/content";

export function DestinationListing({
  category,
  title,
  intro,
}: {
  category: "domestic" | "international";
  title: string;
  intro: string;
}) {
  const destinations = getDestinations().filter((d) => d.category === category);
  const packages = getPackages().filter((p) => p.category === category);

  return (
    <>
      <section className="bg-paper-100">
        <div className="mx-auto max-w-[1200px] px-4 py-16 lg:px-12">
          <h1 className="font-display text-3xl font-semibold text-primary-700 lg:text-[2.5rem]">
            {title}
          </h1>
          <p className="mt-3 max-w-[68ch] text-lg text-ink-600">{intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-16 lg:px-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d, i) => (
            <FadeIn key={d.slug} delay={(i % 3) * 40}>
              <DestinationCard destination={d} />
            </FadeIn>
          ))}
        </div>
      </section>

      {packages.length > 0 && (
        <section className="bg-paper-100">
          <div className="mx-auto max-w-[1200px] px-4 py-24 lg:px-12">
            <SectionHeading
              eyebrow="Ready-made"
              title={`${category === "domestic" ? "Domestic" : "International"} packages`}
              lede="Day-by-day itineraries you can read before you enquire."
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {packages.map((p, i) => (
                <FadeIn key={p.slug} delay={(i % 3) * 40}>
                  <PackageCard pkg={p} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand />
    </>
  );
}
