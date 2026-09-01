/**
 * Circular numbered marker echoing the CircularMap node language:
 * thin ember circle, card fill, font-display numeral.
 */
export function CircleMarker({ n, className = "" }: { n: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ember/45 bg-card font-display text-[0.8rem] font-semibold text-ember ${className}`.trim()}
    >
      {n}
    </span>
  );
}
