import { Link } from "@tanstack/react-router";
import { useLocale } from "@/lib/i18n/LocaleProvider";

/**
 * Styled "Discover more" link — replaces the old ReadMore disclosures on the
 * landing page and deep-links into a section of /discover.
 */
export function DiscoverLink({ hash, className = "" }: { hash?: string; className?: string }) {
  const { t } = useLocale();
  return (
    <Link
      to="/discover"
      hash={hash}
      className={`group inline-flex min-h-11 items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-ember-deep transition-colors hover:text-ink ${className}`.trim()}
    >
      {t.discover.linkLabel}
      <span
        aria-hidden
        className="inline-block transition-transform duration-200 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
