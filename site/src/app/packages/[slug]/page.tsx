import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Calendar, Check, WhatsAppIcon } from "@/components/icons";
import { SectionHeading } from "@/components/SectionHeading";
import { SmartImage } from "@/components/SmartImage";
import { getContact, getDestination, getPackage, getPackages, waUrl } from "@/lib/content";
import { destinationHero } from "@/lib/images";

const TIER_STYLES = {
  Standard: "bg-paper-100 text-ink-600",
  Premium: "bg-primary-100 text-primary-700",
  Luxury: "bg-accent-100 text-accent-700",
} as const;

export function generateStaticParams() {
  return getPackages().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const p = getPackage((await params).slug);
  return { title: `${p.name} — ${p.duration}`, description: p.summary };
}

export default async function PackagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  const dest = getDestination(pkg.destination_slug);
  const wa = waUrl(pkg.whatsapp_enquiry_prefill);
  const contact = getContact();

  return (
    <>
      <section className="relative flex min-h-[420px] items-end lg:h-[56vh]">
        <div className="absolute inset-0">
          <SmartImage
            image={destinationHero(dest.slug)}
            label={`${dest.name} — awaiting real photography`}
            sizes="100vw"
            priority
            dark
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-scrim to-transparent" />
        <div className="relative mx-auto w-full max-w-[1200px] px-4 pb-12 pt-32 lg:px-12">
          <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-paper-0">
            {pkg.category === "domestic" ? "Domestic" : "International"} package
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-[1.15] text-paper-0 lg:text-[2.5rem]">
            {pkg.name}
          </h1>
          <p className="mt-3 flex flex-wrap items-center gap-2 text-paper-0">
            {pkg.duration}
            <span className={`rounded-full px-3 py-1 text-sm font-semibold ${TIER_STYLES[pkg.tier]}`}>
              {pkg.tier}
            </span>
            <span className="rounded-full bg-paper-0/[0.92] px-3 py-1 text-sm font-semibold text-ink-600">
              {pkg.audience}
            </span>
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-4 py-16 lg:px-12">
        <p className="max-w-[68ch] text-lg text-ink-600">{pkg.summary}</p>

        {/* P2 slot: price renders only when a real price_from exists in JSON. */}
        {pkg.price_from && (
          <p className="mt-6 text-xl font-bold text-ink-900">
            From ₹{pkg.price_from.toLocaleString("en-IN")} per person
          </p>
        )}

        <section className="mt-12">
          <SectionHeading eyebrow="Why this trip" title="Highlights" />
          <div className="grid gap-4 sm:grid-cols-2">
            {pkg.highlights.map((h) => (
              <div key={h} className="flex items-start gap-3 rounded-xl bg-primary-100 p-5">
                <Check size={20} className="mt-0.5 shrink-0 text-primary-700" />
                <p className="font-semibold text-primary-700">{h}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <SectionHeading eyebrow="The plan" title="Day-by-day itinerary" />
          <ol className="space-y-0">
            {pkg.itinerary.map((day, i) => (
              <li key={day.day} className="relative flex gap-5 pb-10">
                {i < pkg.itinerary.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-5 top-10 h-full w-px -translate-x-1/2 bg-paper-200"
                  />
                )}
                <span className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-600 font-display font-semibold text-paper-0">
                  {day.day}
                </span>
                <div>
                  <h3 className="font-display text-[1.375rem] font-semibold text-ink-900">
                    Day {day.day} — {day.title}
                  </h3>
                  <p className="mt-1 max-w-[68ch] text-ink-600">{day.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* P2: inclusions/exclusions render only when the owner supplies them. */}
        {(pkg.inclusions.length > 0 || pkg.exclusions.length > 0) && (
          <section className="mt-8 grid gap-6 sm:grid-cols-2">
            {pkg.inclusions.length > 0 && (
              <div className="rounded-xl bg-success-100 p-6">
                <h3 className="font-display text-[1.375rem] font-semibold text-success-600">
                  Inclusions
                </h3>
                <ul className="mt-3 space-y-2 text-success-600">
                  {pkg.inclusions.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            )}
            {pkg.exclusions.length > 0 && (
              <div className="rounded-xl bg-warning-100 p-6">
                <h3 className="font-display text-[1.375rem] font-semibold text-warning-700">
                  Exclusions
                </h3>
                <ul className="mt-3 space-y-2 text-warning-700">
                  {pkg.exclusions.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        <section className="mt-16 rounded-xl bg-paper-100 p-8">
          <SectionHeading
            eyebrow="Know before you go"
            title={`About ${dest.name}`}
          />
          <div className="flex gap-3 rounded-xl bg-primary-100 p-5">
            <Calendar size={22} className="mt-0.5 shrink-0 text-primary-700" />
            <p className="text-primary-700">{dest.best_time_to_visit}</p>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {dest.top_attractions.slice(0, 3).map((a) => (
              <li key={a.name} className="rounded-xl bg-paper-0 p-5 shadow-card">
                <p className="font-display font-semibold text-ink-900">{a.name}</p>
                <p className="mt-1 line-clamp-3 text-sm text-ink-600">{a.description}</p>
              </li>
            ))}
          </ul>
          <Link
            href={`/destinations/${dest.slug}`}
            className="mt-6 inline-block font-semibold text-primary-600 hover:text-primary-700"
          >
            Everything about {dest.name} →
          </Link>
        </section>
      </div>

      <section className="bg-primary-700">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-6 px-4 py-16 md:flex-row md:items-center md:justify-between lg:px-12">
          <div>
            <h2 className="font-display text-2xl font-semibold text-paper-0 md:text-[2rem]">
              Make this trip yours
            </h2>
            <p className="mt-2 max-w-[52ch] text-primary-100">
              Dates, hotel tier, pace — everything adjusts. One message starts it.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-4">
            <Button href={wa} external>
              <WhatsAppIcon size={20} /> Enquire on WhatsApp
            </Button>
            <a
              href={contact.phone_href}
              className="font-semibold text-paper-0 underline-offset-4 hover:underline"
            >
              {contact.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
