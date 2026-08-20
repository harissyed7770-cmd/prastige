import type { Metadata } from "next";
import { DestinationListing } from "@/components/DestinationListing";

const TITLE = "International Tour Packages from Bengaluru — Dubai, Maldives, Thailand & More";
const DESCRIPTION =
  "Eight international destinations planned from Bengaluru — Dubai, Maldives, Thailand, Singapore, Azerbaijan, UAE, Switzerland and France — with visa-aware itineraries.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "international tour packages from Bengaluru",
    "international tour packages from Bangalore",
    "Dubai package from Bangalore",
    "Maldives package from India",
    "Europe tour package from Bengaluru",
    "honeymoon packages abroad from Bangalore",
  ],
  alternates: { canonical: "/international" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/international" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
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
