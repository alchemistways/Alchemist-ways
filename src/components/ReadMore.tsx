import { type ReactNode, useId, useState } from "react";
import { useLocale } from "@/lib/i18n/LocaleProvider";

/**
 * Accessible disclosure for long client copy: shows children only when
 * expanded, keeping the default page scannable. Uses the grid-rows trick
 * for a smooth height transition (disabled under prefers-reduced-motion
 * via the motion-safe variant).
 */
export function ReadMore({
  children,
  className = "",
  labelMore,
  labelLess,
}: {
  children: ReactNode;
  className?: string;
  labelMore?: string;
  labelLess?: string;
}) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const contentId = useId();

  const more = labelMore ?? t.common.readMore;
  const less = labelLess ?? t.common.readLess;

  return (
    <div className={className}>
      <div
        id={contentId}
        className={`grid motion-safe:transition-[grid-template-rows] motion-safe:duration-300 ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden" aria-hidden={!open} {...(open ? {} : { inert: true })}>
          {children}
        </div>
      </div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((v) => !v)}
        className={`group inline-flex min-h-11 items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-ember-deep transition-colors hover:text-ink ${
          open ? "mt-4" : "mt-2"
        }`}
      >
        {open ? less : more}
        <span
          aria-hidden
          className={`inline-block transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          ↓
        </span>
      </button>
    </div>
  );
}
