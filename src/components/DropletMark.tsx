/**
 * Minimal droplet mark echoing the book-cover graphic.
 * Used as a quiet section divider and as a faint background watermark.
 */
export function DropletMark({
  className = "",
  filled = false,
}: {
  className?: string;
  filled?: boolean;
}) {
  return (
    <svg viewBox="0 0 24 32" className={className} aria-hidden focusable="false">
      <path
        d="M12 1.5 C12 1.5 3 13.5 3 20.5 C3 25.75 7.03 30 12 30 C16.97 30 21 25.75 21 20.5 C21 13.5 12 1.5 12 1.5 Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={filled ? 0 : 1.4}
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Centered hairline divider with the droplet at its heart. */
export function DropletDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`.trim()} aria-hidden>
      <span className="h-px w-12 bg-gradient-to-l from-ember/40 to-transparent sm:w-16" />
      <DropletMark className="h-5 w-auto text-ember/60" />
      <span className="h-px w-12 bg-gradient-to-r from-ember/40 to-transparent sm:w-16" />
    </div>
  );
}
