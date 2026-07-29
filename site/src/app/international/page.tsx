import type { Metadata } from "next";
import { DestinationListing } from "@/components/DestinationListing";

export const metadata: Metadata = {
  title: "International destinations",
  description:
    "Eight international destinations planned from Bengaluru — Dubai, Maldives, Thailand, Singapore, Azerbaijan, UAE, Switzerland and France — with visa-aware itineraries.",
};

export default function InternationalPage() {
  return (
    <DestinationListing
      category="international"
      title="International destinations"
      intro="Eight destinations picked for how well they work from India — short-haul favourites like Dubai, Thailand and the Maldives alongside the European classics. Visa realities researched, not glossed over."
    />
  );
}
