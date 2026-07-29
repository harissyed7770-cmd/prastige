import Link from "next/link";
import { getAbout, getContact, waGenericUrl } from "@/lib/content";
import { NAV_LINKS } from "./Header";
import { Mail, MapPin, Phone, WhatsAppIcon } from "./icons";

const FOOTER_DESTINATIONS = [
  { href: "/destinations/goa", label: "Goa" },
  { href: "/destinations/kerala", label: "Kerala" },
  { href: "/destinations/maldives", label: "Maldives" },
  { href: "/destinations/dubai", label: "Dubai" },
  { href: "/destinations/switzerland", label: "Switzerland" },
  { href: "/destinations/thailand", label: "Thailand" },
];

export function Footer() {
  const contact = getContact();
  const about = getAbout();
  const year = new Date().getFullYear();
  const addr = contact.address;

  return (
    <footer id="site-footer" className="bg-primary-700 text-paper-0">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-16 md:grid-cols-2 lg:grid-cols-[4fr_3fr_3fr_4fr] lg:px-12">
        <div>
          <p className="font-display text-xl font-semibold">{contact.business_name}</p>
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary-100">
            Where Great Journey Begins
          </p>
          <p className="mt-4 max-w-[38ch] text-sm text-primary-100">
            Domestic and international holidays planned person-to-person from
            Bengaluru — built around your dates, budget and pace.
          </p>
          {/* P2 slot: renders only when a real founding year exists. */}
          {about.founded_year && (
            <p className="mt-4 text-sm text-primary-100">
              Planning holidays from Bengaluru since {about.founded_year}.
            </p>
          )}
        </div>

        <nav aria-label="Footer quick links">
          <p className="mb-3 font-semibold">Quick links</p>
          <ul className="space-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-primary-100 transition-colors duration-150 hover:text-paper-0"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer destinations">
          <p className="mb-3 font-semibold">Destinations</p>
          <ul className="space-y-2">
            {FOOTER_DESTINATIONS.map((d) => (
              <li key={d.href}>
                <Link
                  href={d.href}
                  className="text-sm text-primary-100 transition-colors duration-150 hover:text-paper-0"
                >
                  {d.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-3 font-semibold">Contact</p>
          <ul className="space-y-3 text-sm text-primary-100">
            <li className="flex gap-2">
              <MapPin size={18} className="mt-0.5 shrink-0" />
              <span>
                {addr.line1}, {addr.line2}, {addr.city}, {addr.state} – {addr.pincode}
              </span>
            </li>
            <li>
              <a href={contact.phone_href} className="flex items-center gap-2 hover:text-paper-0">
                <Phone size={18} className="shrink-0" /> {contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-paper-0">
                <Mail size={18} className="shrink-0" /> {contact.email}
              </a>
            </li>
            <li>
              <a
                href={waGenericUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-paper-0"
              >
                <WhatsAppIcon size={18} className="shrink-0" /> Chat on WhatsApp
              </a>
            </li>
            <li className="pt-1">
              {contact.office_hours.map((h) => (
                <span key={h.days} className="block">
                  {h.days}: {h.hours}
                </span>
              ))}
            </li>
          </ul>
          {/* P2 slot: membership badges (IATA/TAAI/TAFI) ship empty until confirmed. */}
        </div>
      </div>
      <div className="border-t border-primary-600">
        <p className="mx-auto max-w-[1200px] px-4 py-5 text-sm text-primary-100 lg:px-12">
          © {year} {contact.business_name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
