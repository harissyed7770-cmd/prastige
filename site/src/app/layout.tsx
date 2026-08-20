import type { Metadata } from "next";
import { Fraunces, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { waGenericUrl } from "@/lib/content";
import { organizationJsonLd, SITE_URL } from "@/lib/seo";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["600"],
});

const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const DEFAULT_TITLE = "Prestige Holidays 4U — Bengaluru's Travel Agency for Domestic & International Tours";
const DEFAULT_DESCRIPTION =
  "Bengaluru-based travel agency planning domestic and international tour packages — Goa, Kerala, Rajasthan, Sikkim, Kashmir, Dubai, Switzerland, Thailand, Singapore, Maldives, Azerbaijan and France. Person-to-person planning on WhatsApp, built around your dates and budget.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Prestige Holidays 4U",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "travel agency in Bengaluru",
    "best travel agency Bangalore",
    "tour packages from Bangalore",
    "Bengaluru to Goa package",
    "domestic tour packages India",
    "international tour packages from India",
    "customized holiday packages",
    "honeymoon packages from Bangalore",
  ],
  authors: [{ name: "Prestige Holidays 4U" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Prestige Holidays 4U",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "Prestige Holidays 4U" }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/og/default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${nunito.variable} h-full antialiased`}>
      <head>
        <JsonLd data={organizationJsonLd()} />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-paper-0 focus:px-4 focus:py-2 focus:text-primary-700"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFab href={waGenericUrl()} />
      </body>
    </html>
  );
}
