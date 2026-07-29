import type { Metadata } from "next";
import { DestinationListing } from "@/components/DestinationListing";

export const metadata: Metadata = {
  title: "Domestic destinations",
  description:
    "Six Indian destinations planned deeply from Bengaluru — Goa, Kerala, Rajasthan, Delhi, Sikkim and Kashmir — with researched itineraries and honest best-time advice.",
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
