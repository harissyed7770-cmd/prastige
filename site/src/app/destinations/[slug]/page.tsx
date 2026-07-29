import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { CTABand } from "@/components/CTABand";
import { DestinationCard } from "@/components/DestinationCard";
import { FadeIn } from "@/components/FadeIn";
import { Calendar, Check, WhatsAppIcon } from "@/components/icons";
import { ImageSlot } from "@/components/ImageSlot";
import { PackageCard } from "@/components/PackageCard";
import { SectionHeading } from "@/components/SectionHeading";
import {
  getDestination,
  getDestinations,
  getPackageForDestination,
  waUrl,
} from "@/lib/content";

export function generateStaticParams() {
  return getDestinations().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const d = getDestination((await params).slug);
  return { title: `${d.name} — ${d.tagline}`, description: d.hero_description };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = getDestination(slug);
  const pkg = getPackageForDestination(slug);
  const related = getDestinations()
    .filter((x) => x.category === d.category && x.slug !== slug)
    .slice(0, 3);
  const waDestUrl = waUrl(
    `Hello, I would like to enquire about a trip to ${d.name}.\n\nTravel Dates:\nNumber of Adults:\nNumber of Children:\nBudget Range:\nDeparture City:\nHotel Preference (3★ / 4★ / 5★):\nAdditional Requirements:`,
  );

  return (
    <>
      <section className="relative flex min-h-[420px] items-end lg:h-[56vh]">
        <div className="absolute inset-0">
          <ImageSlot label={`${d.name} — awaiting real photography`} dark />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-scrim to-transparent" />
        <div className="relative mx-auto w-full max-w-[1200px] px-4 pb-12 pt-32 lg:px-12">
          <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-paper-0">
            {d.category === "domestic" ? "Domestic" : "International"} · {d.country}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-[1.15] text-paper-0 lg:text-[2.5rem]">
            {d.name}
          </h1>
          <p className="mt-2 max-w-[60ch] text-lg text-paper-0">{d.tagline}</p>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-4 py-16 lg:px-12">
        <p className="max-w-[68ch] text-lg text-ink-600">{d.hero_description}</p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="flex gap-3 rounded-xl bg-primary-100 p-6">
              <Calendar size={24} className="mt-0.5 shrink-0 text-primary-700" />
              <div>
                <h2 className="font-display text-[1.375rem] font-semibold text-primary-700">
                  Best time to visit
                </h2>
                <p className="mt-1 text-primary-700">{d.best_time_to_visit}</p>
              </div>
            </div>

            <section className="mt-16">
              <SectionHeading eyebrow="Worth your days" title={`Top attractions in ${d.name}`} />
              <div className="grid gap-8 sm:grid-cols-2">
                {d.top_attractions.map((a, i) => (
                  <FadeIn key={a.name} delay={(i % 2) * 40}>
                    <article>
                      <div className="aspect-[4/3] overflow-hidden rounded-xl">
                        <ImageSlot label={a.name} />
                      </div>
                      <h3 className="mt-4 font-display text-[1.375rem] font-semibold text-ink-900">
                        {a.name}
                      </h3>
                      <p className="mt-2 text-ink-600">{a.description}</p>
                    </article>
                  </FadeIn>
                ))}
              </div>
            </section>

            <section className="mt-16">
              <SectionHeading eyebrow="Do it properly" title="Activities & experiences" />
              <ul className="grid gap-3 sm:grid-cols-2">
                {d.activities.map((a) => (
                  <li key={a} className="flex items-start gap-2">
                    <Check size={18} className="mt-1 shrink-0 text-primary-600" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="font-display text-[1.375rem] font-semibold text-ink-900">
              Plan your {d.name} trip
            </h2>
            {pkg ? (
              <div className="mt-4">
                <PackageCard pkg={pkg} />
              </div>
            ) : (
              <div className="mt-4 rounded-xl bg-paper-0 p-6 shadow-card">
                <p className="text-ink-600">
                  No fixed package for {d.name} yet — which means we build it entirely
                  around you. Tell us your dates and budget and we&rsquo;ll plan it from
                  scratch.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Button href={waDestUrl} external>
                    <WhatsAppIcon size={20} /> Enquire on WhatsApp
                  </Button>
                  <Button href="/customize-trip" variant="secondary">
                    Customize a trip
                  </Button>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      <section className="bg-paper-100">
        <div className="mx-auto max-w-[1200px] px-4 py-24 lg:px-12">
          <SectionHeading
            eyebrow="Keep exploring"
            title={`More ${d.category === "domestic" ? "domestic" : "international"} destinations`}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <DestinationCard key={r.slug} destination={r} />
            ))}
          </div>
          <div className="mt-8">
            <Link
              href={d.category === "domestic" ? "/domestic" : "/international"}
              className="font-semibold text-primary-600 hover:text-primary-700"
            >
              View all →
            </Link>
          </div>
        </div>
      </section>

      <CTABand
        title={`Ready for ${d.name}?`}
        lede="Tell us your dates and budget — we'll build the itinerary around you."
      />
    </>
  );
}
