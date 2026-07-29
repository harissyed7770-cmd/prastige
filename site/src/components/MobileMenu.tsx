"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Close, Menu } from "./icons";

export function MobileMenu({ links }: { links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex h-11 w-11 items-center justify-center rounded-lg text-ink-900"
      >
        {open ? <Close size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <div className="fixed inset-0 top-[60px] z-50 overflow-y-auto bg-paper-50">
          <nav aria-label="Mobile" className="flex flex-col gap-1 p-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 font-display text-xl font-semibold text-ink-900 hover:bg-paper-100 hover:text-primary-600"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
