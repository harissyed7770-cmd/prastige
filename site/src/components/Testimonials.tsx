import { getTestimonials } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";

/**
 * P2 rule: renders nothing unless >= 3 real testimonials exist in
 * /content/company/testimonials.json. No dummy quotes, no placeholders.
 */
export function Testimonials() {
  const testimonials = getTestimonials();
  if (testimonials.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1200px] px-4 py-24 lg:px-12">
      <SectionHeading eyebrow="Travellers' words" title="What our guests say" center />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={t.name + t.trip_taken} className="rounded-xl bg-paper-0 p-6 shadow-card">
            <span aria-hidden className="font-display text-[40px] leading-none text-primary-300">
              &ldquo;
            </span>
            <blockquote className="mt-2 text-ink-900">{t.quote}</blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 font-semibold text-primary-700">
                {t.name
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <span>
                <span className="block font-semibold text-ink-900">
                  {t.name} <span className="font-normal text-ink-600">· {t.city}</span>
                </span>
                <span className="block text-sm text-ink-600">
                  {t.trip_taken}
                  {t.planner_name && ` — planned by ${t.planner_name}`}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
