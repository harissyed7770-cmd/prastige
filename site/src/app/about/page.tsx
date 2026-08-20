import type { Metadata } from "next";
import { CTABand } from "@/components/CTABand";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { getAbout, getServices } from "@/lib/content";

const TITLE = "About Us — Bengaluru's Person-to-Person Travel Agency";
const DESCRIPTION =
  "Prestige Holidays 4U is a Bengaluru-based travel agency planning domestic and international holidays person-to-person — honest itineraries, WhatsApp-first support.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "best travel agency in Bengaluru",
    "best travel agency in Bangalore",
    "trusted travel agency Bangalore",
    "travel agency HBR Layout Bengaluru",
  ],
  alternates: { canonical: "/about" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/about" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function AboutPage() {
  const about = getAbout();
  const services = getServices();

  return (
    <>
      <section className="bg-paper-100">
        <div className="mx-auto max-w-[1200px] px-4 py-16 lg:px-12">
          <h1 className="font-display text-3xl font-semibold text-primary-700 lg:text-[2.5rem]">
            The people behind the plans
          </h1>
          <p className="mt-3 max-w-[68ch] text-lg text-ink-600">
            A small Bengaluru agency, deliberately — every trip planned by someone
            you can call back.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-16 lg:px-12">
        <SectionHeading eyebrow="Who we are" title={about.business_name} />
        <p className="max-w-[68ch] text-lg leading-relaxed text-ink-600">{about.who_we_are}</p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-primary-100 p-8">
            <h3 className="font-display text-[1.375rem] font-semibold text-primary-700">
              Our mission
            </h3>
            <p className="mt-3 text-primary-700">{about.mission}</p>
          </div>
          <div className="rounded-xl bg-accent-100 p-8">
            <h3 className="font-display text-[1.375rem] font-semibold text-accent-700">
              Our vision
            </h3>
            <p className="mt-3 text-accent-700">{about.vision}</p>
          </div>
        </div>

        {/* P2 slot: stats strip renders only with real owner-supplied figures. */}
      </section>

      <section className="bg-paper-100">
        <div className="mx-auto max-w-[1200px] px-4 py-24 lg:px-12">
          <SectionHeading eyebrow="How we work" title="What we hold ourselves to" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {about.core_values.map((v, i) => (
              <FadeIn key={v.name} delay={(i % 4) * 40}>
                <div className="h-full rounded-xl bg-paper-0 p-6 shadow-card">
                  <h3 className="font-display text-lg font-semibold text-ink-900">{v.name}</h3>
                  <p className="mt-2 text-sm text-ink-600">{v.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-24 lg:px-12">
        <SectionHeading
          eyebrow="What we do"
          title="Services"
          lede="Everything runs through one number — the planning, the booking, and the support while you travel."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <FadeIn key={s.name} delay={(i % 3) * 40}>
              <div className="h-full rounded-xl bg-paper-0 p-6 shadow-card">
                <h3 className="font-display text-[1.375rem] font-semibold text-ink-900">
                  {s.name}
                </h3>
                <p className="mt-2 text-ink-600">{s.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <CTABand title="Ready to start your journey?" />
    </>
  );
}
