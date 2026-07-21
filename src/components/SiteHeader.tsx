import { useEffect, useId, useState } from "react";

/**
 * Top navigation — fixed glass bar over the ivory hero.
 * Nav: The Map · The Book · Conversations · About · Book a Clarity Call.
 * Mobile: menu panel so every section stays reachable.
 */
const navLinks = [
  { href: "#map", label: "The Map" },
  { href: "#book", label: "The Book" },
  { href: "#conversations", label: "Conversations" },
  { href: "#about", label: "About" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

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
    // Allow menu close paint before smooth scroll to hash
    window.requestAnimationFrame(() => {
      const id = href.replace("#", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]">
      <div className="border-b border-[#3a2a1f]/10 bg-[#faf6f0]/70 backdrop-blur-xl supports-[backdrop-filter]:bg-[#faf6f0]/55">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-8 sm:py-3.5">
          <a
            href="#top"
            onClick={() => setOpen(false)}
            className="min-w-0 truncate font-display text-[0.75rem] uppercase tracking-[0.3em] text-ink transition-colors hover:text-ember-deep sm:text-[0.85rem]"
          >
            Alchemist Ways
          </a>

          <nav className="flex shrink-0 items-center gap-1.5 sm:gap-2" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link-lux hidden rounded-full px-3 py-2 text-[0.75rem] text-ink/80 transition-colors hover:text-ember-deep md:inline-flex"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#clarity-call"
              className="btn-lux btn-lux-primary btn-lux-nav whitespace-nowrap"
            >
              <span className="sm:hidden">Clarity Call</span>
              <span className="hidden sm:inline">Book a Clarity Call</span>
            </a>

            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border border-[#3a2a1f]/15 text-ink transition-colors hover:border-ember hover:text-ember-deep md:hidden"
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
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id={menuId}
        className={`md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
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
          className={`absolute inset-x-0 top-full z-50 border-b border-[#3a2a1f]/10 bg-[#faf6f0]/97 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_18px_40px_-28px_rgba(58,42,31,0.45)] backdrop-blur-xl transition-all duration-200 ${
            open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
          }`}
        >
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 py-2" aria-label="Mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(link.href);
                }}
                className="rounded-xl px-3 py-3.5 text-[0.95rem] text-ink/90 transition-colors hover:bg-ember-soft/60 hover:text-ember-deep"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#clarity-call"
              onClick={(e) => {
                e.preventDefault();
                go("#clarity-call");
              }}
              className="btn-lux btn-lux-primary mt-2 w-full"
            >
              Book a Clarity Call
            </a>
            <a
              href="#waitlist"
              onClick={(e) => {
                e.preventDefault();
                go("#waitlist");
              }}
              className="btn-lux btn-lux-ghost mt-2 w-full"
            >
              Begin Here
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
