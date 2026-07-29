/**
 * Real-photography manifest. A destination or attraction appears here ONLY
 * once a properly licensed image has been sourced, visually verified, and
 * logged in /assets/images/<slug>/SOURCES.md. Anything absent falls back to
 * the honest photo-slot placeholder — never a loosely related substitute.
 */
export interface ImageEntry {
  src: string;
  alt: string;
}

interface DestinationImages {
  hero?: ImageEntry;
  attractions: Record<string, ImageEntry>;
}

const DESTINATION_IMAGES: Record<string, DestinationImages> = {
  goa: {
    hero: {
      src: "/images/goa/hero.jpg",
      alt: "Palm-fringed North Goa coastline seen from a hilltop, with beachgoers on the sand, rocky outcrops in the surf and the Arabian Sea fading to a hazy horizon",
    },
    attractions: {
      "Basilica of Bom Jesus": {
        src: "/images/goa/basilica-of-bom-jesus.jpg",
        alt: "The red laterite facade of the Basilica of Bom Jesus in Old Goa rising behind a huge rain tree, with visitors resting on the lawn in front",
      },
      "Dudhsagar Falls": {
        src: "/images/goa/dudhsagar-falls.jpg",
        alt: "White cascades of Dudhsagar Falls pouring down dark rock into a still green plunge pool, a sunlit boulder in the foreground",
      },
      "Fontainhas, Panaji": {
        src: "/images/goa/fontainhas.jpg",
        alt: "A narrow paved lane in Fontainhas, Panaji, lined by heritage houses with a bright blue shuttered shopfront and a scooter parked mid-lane",
      },
      "Fort Aguada": {
        src: "/images/goa/fort-aguada.jpg",
        alt: "The white four-storey lighthouse of Fort Aguada standing over the fort's laterite ramparts, with the river mouth and sea behind",
      },
      "Baga & Calangute beach belt": {
        src: "/images/goa/baga-calangute.jpg",
        alt: "Three parasailers being towed above water-sports boats in the surf off Baga Beach in the late-afternoon haze",
      },
      "Anjuna Flea Market": {
        src: "/images/goa/anjuna-flea-market.jpg",
        alt: "Rows of jewellery and handicraft stalls under Anjuna Flea Market's woven-palm canopy, dappled sunlight falling on browsing shoppers",
      },
    },
  },
};

export function destinationHero(slug: string): ImageEntry | undefined {
  return DESTINATION_IMAGES[slug]?.hero;
}

export function attractionImage(slug: string, attractionName: string): ImageEntry | undefined {
  return DESTINATION_IMAGES[slug]?.attractions[attractionName];
}
