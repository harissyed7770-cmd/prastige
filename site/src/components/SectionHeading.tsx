export function SectionHeading({
  eyebrow,
  title,
  lede,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-8 ${center ? "text-center" : ""}`}>
      {eyebrow && (
        <p className="mb-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-accent-700">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-2xl font-semibold text-ink-900 md:text-[2rem] md:leading-tight">
        {title}
      </h2>
      {lede && <p className="mt-4 max-w-[68ch] text-ink-600 md:text-lg">{lede}</p>}
    </div>
  );
}
