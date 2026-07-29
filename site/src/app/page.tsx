import Link from "next/link";
import { Button } from "@/components/Button";
import { CTABand } from "@/components/CTABand";
import { DestinationCard } from "@/components/DestinationCard";
import { FadeIn } from "@/components/FadeIn";
import { ImageSlot } from "@/components/ImageSlot";
import { PackageCard } from "@/components/PackageCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Testimonials } from "@/components/Testimonials";
import { getAbout, getDestinations, getPackages } from "@/lib/content";

const FEATURED_SLUGS = ["kerala", "rajasthan", "kashmir", "maldives", "switzerland", "dubai"];
const TEASER_PACKAGES = ["goa-family-holiday", "rajasthan-heritage-tour", "dubai-luxury-tour"];

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Tell us on WhatsApp",
    text: "Your dates, budget, departure city and travel style — one message starts it.",
  },
  {
    step: "2",
    title: "Get a real itinerary",
    text: "A day-by-day plan built by a person who knows the route — adjusted until it fits.",
  },
  {
    step: "3",
    title: "Travel with support",
    text: "The number you booked with is the number that answers while you're away.",
  },
];

export default function Home() {
  const destinations = getDestinations();
  const packages = getPackages();
  const about = getAbout();
  const featured = FEATURED_SLUGS.map((s) => destinations.find((d) => d.slug === s)!);
  const teasers = TEASER_PACKAGES.map((s) => packages.find((p) => p.slug === s)!);

  return (
    <>
      <section className="relative flex min-h-[420px] items-end lg:h-[72vh]">
        <div className="absolute inset-0">
          <ImageSlot label="Hero — awaiting real photography" dark />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-scrim to-transparent" />
        <div className="relative mx-auto w-full max-w-[1200px] px-4 pb-16 pt-32 lg:px-12">
          <FadeIn>
            <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-paper-0">
              Bengaluru's person-to-person travel planners
            </p>
          </FadeIn>
          <FadeIn delay={40}>
            <h1 className="mt-2 max-w-[16ch] font-display text-4xl font-semibold leading-[1.1] text-paper-0 lg:text-[3.5rem]">
              Where great journeys begin
            </h1>
          </FadeIn>
          <FadeIn delay={80}>
            <p className="mt-4 max-w-[60ch] text-lg text-paper-0">
              Fourteen destinations, planned deeply — from Kerala's backwaters to the
              Swiss Alps — by people you can call back.
            </p>
          </FadeIn>
          <FadeIn delay={80}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/packages">Explore packages</Button>
              <Button href="/customize-trip" variant="onDark">
                Customize a trip
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-16 lg:px-12">
        <p className="mx-auto max-w-[68ch] text-center text-lg text-ink-600">
          {about.who_we_are.split(". ").slice(0, 2).join(". ")}.
        </p>
        {/* P2 slot: stats strip stays absent until real figures exist. */}
      </section>

      <section className="mx-auto max-w-[1200px] px-4 pb-24 lg:px-12">
        <SectionHeading
          eyebrow="Where to next"
          title="Destinations we plan deeply"
          lede="Six favourites to start with — every one researched, written and planned by us."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((d, i) => (
            <FadeIn key={d.slug} delay={(i % 3) * 40}>
              <DestinationCard destination={d} />
            </FadeIn>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-6">
          <Link href="/domestic" className="font-semibold text-primary-600 hover:text-primary-700">
            All domestic destinations →
          </Link>
          <Link
            href="/international"
            className="font-semibold text-primary-600 hover:text-primary-700"
          >
            All international destinations →
          </Link>
        </div>
      </section>

      <section className="bg-paper-100">
        <div className="mx-auto max-w-[1200px] px-4 py-24 lg:px-12">
          <SectionHeading
            eyebrow="Ready-made"
            title="Tour packages"
            lede="Day-by-day itineraries you can read before you enquire — then adjust to fit."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teasers.map((p, i) => (
              <FadeIn key={p.slug} delay={(i % 3) * 40}>
                <PackageCard pkg={p} />
              </FadeIn>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/packages" className="font-semibold text-primary-600 hover:text-primary-700">
              View all 7 packages →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-24 lg:px-12">
        <SectionHeading eyebrow="How it works" title="Three steps, no forms-first runaround" center />
        <div className="grid gap-6 md:grid-cols-3">
          {HOW_IT_WORKS.map((s, i) => (
            <FadeIn key={s.step} delay={i * 40}>
              <div className="rounded-xl bg-paper-0 p-6 shadow-card">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 font-display text-lg font-semibold text-paper-0">
                  {s.step}
                </span>
                <h3 className="mt-4 font-display text-[1.375rem] font-semibold text-ink-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-ink-600">{s.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <Testimonials />

      <CTABand />
    </>
  );
}
