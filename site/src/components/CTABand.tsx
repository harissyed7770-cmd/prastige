import { Button } from "./Button";

export function CTABand({
  title = "Ready to plan your trip?",
  lede = "Tell us your dates, budget and travel style — we'll build the itinerary around you.",
}: {
  title?: string;
  lede?: string;
}) {
  return (
    <section className="bg-primary-700">
      <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-6 px-4 py-16 md:flex-row md:items-center md:justify-between lg:px-12">
        <div>
          <h2 className="font-display text-2xl font-semibold text-paper-0 md:text-[2rem]">
            {title}
          </h2>
          <p className="mt-2 max-w-[52ch] text-primary-100">{lede}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Button href="/customize-trip">Customize your trip</Button>
          <Button href="/packages" variant="onDark">
            Browse packages
          </Button>
        </div>
      </div>
    </section>
  );
}
