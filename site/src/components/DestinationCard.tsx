import Link from "next/link";
import { bestTimeShort, type Destination } from "@/lib/content";
import { destinationHero } from "@/lib/images";
import { ArrowRight, Calendar } from "./icons";
import { SmartImage } from "./SmartImage";

export function DestinationCard({ destination }: { destination: Destination }) {
  const d = destination;
  return (
    <Link
      href={`/destinations/${d.slug}`}
      className="group block overflow-hidden rounded-xl bg-paper-0 shadow-card transition-shadow duration-150 hover:shadow-raised"
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <div className="relative h-full w-full transition-transform duration-300 ease-out group-hover:scale-[1.04]">
          <SmartImage
            image={destinationHero(d.slug)}
            label={d.name}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-paper-0/[0.92] px-3 py-1 text-sm font-semibold text-primary-700">
          <Calendar size={16} /> {bestTimeShort(d.slug)}
        </span>
      </div>
      <div className="p-6">
        <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-600">
          {d.category === "domestic" ? "Domestic" : "International"} · {d.country}
        </p>
        <h3 className="mt-1 font-display text-[1.375rem] font-semibold leading-snug text-ink-900">
          {d.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-ink-600">{d.tagline}</p>
        <span className="mt-4 inline-flex items-center gap-2 font-semibold text-primary-600">
          Explore {d.name}
          <ArrowRight size={18} className="transition-transform duration-150 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
