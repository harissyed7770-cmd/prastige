import Image from "next/image";
import type { ImageEntry } from "@/lib/images";
import { ImageSlot } from "./ImageSlot";

/**
 * Renders a real, licensed photo when one exists in the manifest; otherwise
 * the honest photo-slot placeholder. Parent must be positioned (relative/
 * absolute) — the Image uses fill.
 */
export function SmartImage({
  image,
  label,
  sizes,
  priority = false,
  dark = false,
}: {
  image?: ImageEntry;
  label: string;
  sizes: string;
  priority?: boolean;
  dark?: boolean;
}) {
  if (!image) return <ImageSlot label={label} dark={dark} />;
  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover"
    />
  );
}
