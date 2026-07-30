import Image from "next/image";
import Link from "next/link";
import { getContact, waGenericUrl } from "@/lib/content";
import { WhatsAppIcon } from "./icons";
import { MobileMenu } from "./MobileMenu";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/domestic", label: "Domestic" },
  { href: "/international", label: "International" },
  { href: "/packages", label: "Packages" },
  { href: "/customize-trip", label: "Customize Trip" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const contact = getContact();
  const wa = waGenericUrl();

  return (
    <header className="sticky top-0 z-40 border-b border-paper-200 bg-paper-50/[0.92] backdrop-blur">
      <div className="mx-auto flex h-[60px] max-w-[1200px] items-center justify-between px-4 lg:h-[72px] lg:px-12">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo/prestige-icon.png"
            alt=""
            width={97}
            height={81}
            className="h-10 w-auto lg:h-12"
            priority
          />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-semibold text-primary-700 lg:text-xl">
              {contact.business_name}
            </span>
            <span className="hidden text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-600 lg:block">
              Where Great Journey Begins
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-semibold text-ink-900 underline-offset-[6px] transition-colors duration-150 hover:text-primary-600 hover:underline hover:decoration-2"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-600 text-paper-0 transition-colors duration-150 hover:bg-primary-700"
          >
            <WhatsAppIcon size={22} />
          </a>
          <MobileMenu links={NAV_LINKS} />
        </div>
      </div>
    </header>
  );
}
