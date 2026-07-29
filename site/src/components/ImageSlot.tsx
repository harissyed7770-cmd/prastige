import { Compass } from "./icons";

/**
 * Stand-in image area until real/licensed photography lands (P2).
 * Deliberately reads as an awaiting-photo slot — a flat tonal surface with
 * the destination name — never fake photography.
 */
export function ImageSlot({
  label,
  className = "",
  dark = false,
}: {
  label: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label={`Photo slot: ${label}`}
      className={`flex h-full w-full flex-col items-center justify-center gap-2 ${
        dark ? "bg-primary-700" : "bg-primary-100"
      } ${className}`}
    >
      <Compass size={28} className={dark ? "text-primary-300" : "text-primary-600"} />
      <span
        className={`px-4 text-center text-sm font-semibold ${
          dark ? "text-primary-100" : "text-primary-700"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
