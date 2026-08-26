import { useEffect, useId, useState } from "react";
import {
  getStoredLocale,
  LOCALES,
  setStoredLocale,
  type Locale,
} from "@/lib/locale";

/**
 * Sticky header — Royalmount-inspired stack:
 * large centered wordmark → centered nav row → locale far right.
 * Clarity Call is the in-nav highlight (like Royalmount’s seasonal pill).
 */
const navLinks = [
  { href: "#map", label: "The Map" },
  { href: "#book", label: "The Book" },
  { href: "#practice", label: "Practice" },
  { href: "#about", label: "About" },
] as const;

/** Soft bird-wing chevron between nav labels (client liked the “little birds”). */
function BirdChevron({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 14 10"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 2.2C3.8 2.2 5.4 4.6 7 7.2C8.6 4.6 10.2 2.2 12.5 2.2"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocaleControl({
  locale,
  onChange,
  className = "",
  showComingHint = false,
}: {
  locale: Locale;
  onChange: (next: Locale) => void;
  className?: string;
  showComingHint?: boolean;
}) {
  const selected = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];
  const showComing = showComingHint && !selected.live;

  return (
    <div className={`flex flex-col items-end gap-0.5 ${className}`}>
      <div
        role="group"
        aria-label="Language"
        className="flex items-center gap-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink/70"
      >
        {LOCALES.map((opt, i) => (
          <span key={opt.code} className="contents">
            {i > 0 ? (
              <span aria-hidden className="px-1 text-ink/25">
                |
              </span>
            ) : null}
            <button
              type="button"
              aria-pressed={locale === opt.code}
              aria-label={
                opt.live
                  ? `Language: ${opt.label}`
                  : `Language: ${opt.label} (coming soon)`
              }
              onClick={() => onChange(opt.code)}
              className={`min-h-11 min-w-11 rounded-sm px-1.5 transition-colors hover:text-ember-deep sm:min-h-9 sm:min-w-0 sm:py-1 ${
                locale === opt.code ? "text-ink" : "text-ink/40"
              }`}
            >
              {opt.label}
            </button>
          </span>
        ))}
      </div>
      {showComing ? (
        <p className="text-[0.55rem] uppercase tracking-[0.14em] text-ink/40">Coming soon</p>
      ) : null}
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [locale, setLocale] = useState<Locale>("en");
  const menuId = useId();

  useEffect(() => {
    setLocale(getStoredLocale());
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function go(href: string) {
    setOpen(false);
    window.requestAnimationFrame(() => {
      const id = href.replace("#", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function chooseLocale(next: Locale) {
    setLocale(next);
    setStoredLocale(next);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]">
      <div
        className={`border-b backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled
            ? "border-[#3a2a1f]/14 bg-[#faf6f0]/95 shadow-[0_10px_28px_-22px_rgba(58,42,31,0.4)] supports-[backdrop-filter]:bg-[#faf6f0]/88"
            : "border-[#3a2a1f]/08 bg-[#faf6f0]/85 supports-[backdrop-filter]:bg-[#faf6f0]/72"
        }`}
      >
        {/* Row 1 — centered wordmark (Royalmount: brand alone, large) */}
        <div className="relative mx-auto flex max-w-7xl items-center justify-center px-[max(1rem,env(safe-area-inset-left))] pt-4 pr-[max(1rem,env(safe-area-inset-right))] sm:pt-5 sm:px-8">
          <button
            type="button"
            className="absolute left-[max(1rem,env(safe-area-inset-left))] top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-[#3a2a1f]/12 text-ink transition-colors hover:border-ember hover:text-ember-deep sm:left-8 lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close" : "Menu"}</span>
            <span aria-hidden className="relative block h-3.5 w-4">
              <span
                className={`absolute left-0 top-0 block h-px w-full bg-current transition-transform duration-200 ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[6px] block h-px w-full bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[12px] block h-px w-full bg-current transition-transform duration-200 ${
                  open ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>

          <a
            href="#top"
            onClick={() => setOpen(false)}
            className="group flex flex-col items-center py-1 text-center"
          >
            <span className="font-display text-[1.05rem] font-semibold uppercase tracking-[0.34em] text-ink transition-colors group-hover:text-ember-deep sm:text-[1.35rem] sm:tracking-[0.4em] md:text-[1.55rem] md:tracking-[0.42em]">
              Alchemist Ways
            </span>
          </a>
        </div>

        {/* Row 2 — centered nav + far-right locale (desktop) */}
        <div className="relative mx-auto hidden max-w-7xl items-center justify-center px-8 pb-4 pt-3 lg:flex">
          <nav
            className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2"
            aria-label="Primary"
          >
            {navLinks.map((link, i) => (
              <span key={link.href} className="flex items-center">
                {i > 0 ? (
                  <BirdChevron className="mx-2.5 h-2.5 w-3.5 shrink-0 text-ink/25" />
                ) : null}
                <a
                  href={link.href}
                  className="px-1 py-1 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-ink/80 transition-colors hover:text-ember-deep"
                >
                  {link.label}
                </a>
              </span>
            ))}
            <BirdChevron className="mx-2.5 h-2.5 w-3.5 shrink-0 text-ink/25" />
            <a
              href="#clarity"
              className="btn-lux btn-lux-primary btn-lux-nav ml-1 whitespace-nowrap"
            >
              Book Clarity Call
            </a>
          </nav>

          <div className="absolute right-8 top-1/2 -translate-y-1/2">
            <LocaleControl
              locale={locale}
              onChange={chooseLocale}
              showComingHint
            />
          </div>
        </div>

        {/* Mobile: breathing room under wordmark only */}
        <div className="pb-3 lg:hidden" aria-hidden />
      </div>

      {/* Mobile menu */}
      <div
        id={menuId}
        className={`lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <button
          type="button"
          aria-label="Dismiss menu"
          tabIndex={open ? 0 : -1}
          className={`fixed inset-0 z-40 bg-[#1a1814]/25 transition-opacity duration-200 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute inset-x-0 top-full z-50 border-b border-[#3a2a1f]/10 bg-[#faf6f0]/98 px-[max(1.25rem,env(safe-area-inset-left))] pb-[max(1.75rem,env(safe-area-inset-bottom))] pr-[max(1.25rem,env(safe-area-inset-right))] pt-5 shadow-[0_18px_40px_-28px_rgba(58,42,31,0.45)] backdrop-blur-xl transition-all duration-200 ${
            open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
          }`}
        >
          <nav className="mx-auto flex max-w-6xl flex-col gap-1" aria-label="Mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(link.href);
                }}
                className="min-h-12 rounded-xl px-3 py-3.5 text-center text-[0.8rem] font-medium uppercase tracking-[0.18em] text-ink/85 transition-colors hover:bg-ember-soft/60 hover:text-ember-deep"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#clarity"
              onClick={(e) => {
                e.preventDefault();
                go("#clarity");
              }}
              className="btn-lux btn-lux-primary mt-4 min-h-12 w-full"
            >
              Book Clarity Call
            </a>
            <div className="mt-6 flex justify-center border-t border-[#3a2a1f]/10 pt-5">
              <LocaleControl
                locale={locale}
                onChange={chooseLocale}
                className="items-center"
                showComingHint
              />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
