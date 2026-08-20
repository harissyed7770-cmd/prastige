import type { MetadataRoute } from "next";
import { getDestinations, getPackages } from "@/lib/content";

// Override with NEXT_PUBLIC_SITE_URL if submitting the .vercel.app URL
// before prestigeholidays4u.com's DNS finishes propagating.
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://prestigeholidays4u.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const destinations = getDestinations();
  const packages = getPackages();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/domestic`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/international`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/packages`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/customize-trip`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const destinationRoutes: MetadataRoute.Sitemap = destinations.map((d) => ({
    url: `${BASE_URL}/destinations/${d.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const packageRoutes: MetadataRoute.Sitemap = packages.map((p) => ({
    url: `${BASE_URL}/packages/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...destinationRoutes, ...packageRoutes];
}
