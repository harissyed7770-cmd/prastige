"use client";

import { useEffect, useState } from "react";

/**
 * Home hero background. Respects prefers-reduced-motion: reduce by never
 * mounting the <video> element at all in that case — falls back to the
 * static poster frame from the same source clip. Muted + loop + playsinline
 * so autoplay works cross-browser; never autoplays with sound.
 */
export function HeroVideo() {
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Render the poster on first paint (SSR-safe) and while we determine the
  // motion preference, so there's never a flash of an unwanted video.
  if (reducedMotion !== false) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/video/hero-poster.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }

  return (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      poster="/video/hero-poster.jpg"
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
    >
      <source src="/video/hero.mp4" type="video/mp4" />
    </video>
  );
}
