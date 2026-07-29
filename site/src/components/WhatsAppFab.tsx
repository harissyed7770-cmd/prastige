"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "./icons";

/** Sticky WhatsApp button. `href` is page-specific (package prefill) or generic. */
export function WhatsAppFab({ href }: { href: string }) {
  const [shown, setShown] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    if (isMobile) setShown(true);
    const onScroll = () => setShown(isMobile || window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const footer = document.getElementById("site-footer");
    let io: IntersectionObserver | undefined;
    if (footer) {
      io = new IntersectionObserver(([e]) => setNearFooter(e.isIntersecting));
      io.observe(footer);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`fixed bottom-4 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-accent-600 text-paper-0 shadow-raised transition-all duration-300 hover:bg-accent-700 lg:bottom-6 lg:right-6 ${
        shown && !nearFooter ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
