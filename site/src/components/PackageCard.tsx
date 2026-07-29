import Link from "next/link";
import { waUrl, type Pkg } from "@/lib/content";
import { destinationHero } from "@/lib/images";
import { Button } from "./Button";
import { Check, WhatsAppIcon } from "./icons";
import { SmartImage } from "./SmartImage";

const TIER_STYLES: Record<Pkg["tier"], string> = {
  Standard: "bg-paper-100 text-ink-600",
  Premium: "bg-primary-100 text-primary-700",
  Luxury: "bg-accent-100 text-accent-700",
};

export function PackageCard({ pkg }: { pkg: Pkg }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-paper-0 shadow-card transition-shadow duration-150 hover:shadow-raised">
      <div className="relative aspect-video overflow-hidden">
        <SmartImage
          image={destinationHero(pkg.destination_slug)}
          label={pkg.name}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-sm font-semibold ${TIER_STYLES[pkg.tier]}`}
        >
          {pkg.tier}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-[1.375rem] font-semibold leading-snug text-ink-900">
          {pkg.name}
        </h3>
        <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-ink-600">
          {pkg.duration}
          <span className="rounded-full bg-paper-100 px-2.5 py-0.5 font-semibold">
            {pkg.audience}
          </span>
        </p>
        <ul className="mt-4 space-y-2">
          {pkg.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-ink-900">
              <Check size={16} className="mt-0.5 shrink-0 text-primary-600" />
              <span className="line-clamp-1">{h}</span>
            </li>
          ))}
        </ul>
        {/* P2 slot: price renders only when a real price_from exists in JSON. */}
        {pkg.price_from && (
          <p className="mt-4 font-bold text-ink-900">
            From ₹{pkg.price_from.toLocaleString("en-IN")} per person
          </p>
        )}
        <div className="mt-auto flex flex-col gap-3 pt-6">
          <Button href={waUrl(pkg.whatsapp_enquiry_prefill)} external>
            <WhatsAppIcon size={20} /> Enquire on WhatsApp
          </Button>
          <Link
            href={`/packages/${pkg.slug}`}
            className="text-center font-semibold text-primary-600 transition-colors duration-150 hover:text-primary-700"
          >
            View itinerary
          </Link>
        </div>
      </div>
    </div>
  );
}
