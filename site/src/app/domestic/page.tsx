import type { Metadata } from "next";
import { DestinationListing } from "@/components/DestinationListing";

const TITLE = "Domestic Tour Packages from Bengaluru — Goa, Kerala, Rajasthan & More";
const DESCRIPTION =
  "Six Indian destinations planned deeply from Bengaluru — Goa, Kerala, Rajasthan, Delhi, Sikkim and Kashmir — with researched itineraries and honest best-time advice.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "domestic tour packages from Bengaluru",
    "domestic tour packages from Bangalore",
    "India holiday packages",
    "Goa Kerala Rajasthan tour package",
    "best domestic travel destinations India",
  ],
  alternates: { canonical: "/domestic" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/domestic" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function DomesticPage() {
  return (
    <DestinationListing
      category="domestic"
      title="Domestic destinations"
      intro="Six corners of India, each researched and planned deeply — from Goa's twin coastlines to Kashmir's houseboat mornings. Every page tells you when to go and what's genuinely worth your days."
    />
  );
}
