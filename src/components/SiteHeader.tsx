/**
 * Top navigation — fixed glass bar; blends over sand hero.
 */
export function SiteHeader({ bookingHref = "#waitlist" }: { bookingHref?: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]">
      <div className="border-b border-[#3a2a1f]/10 bg-[#c9baa9]/45 backdrop-blur-xl supports-[backdrop-filter]:bg-[#c9baa9]/30">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-8 sm:py-3.5">
          <a
            href="#top"
            className="group flex min-w-0 items-center gap-2 transition-opacity hover:opacity-80"
          >
            <span className="font-display text-base tracking-[0.18em] text-[#3a2a1f] transition-colors group-hover:text-gold-deep sm:text-lg sm:tracking-[0.2em]">
              A · W
            </span>
            <span className="hidden truncate text-[0.7rem] uppercase tracking-[0.28em] text-[#3a2a1f]/70 sm:inline">
              Alchemist Ways
            </span>
          </a>
          <nav className="flex shrink-0 items-center gap-1.5 sm:gap-3" aria-label="Primary">
            <a
              href="#book-inside"
              className="btn-lux btn-lux-sand btn-lux-nav nav-link-lux hidden sm:inline-flex"
            >
              Get the book
            </a>
            <a
              href={bookingHref}
              className="btn-lux btn-lux-sand btn-lux-nav nav-link-lux hidden md:inline-flex"
            >
              Book a Call
            </a>
            <a href="#waitlist" className="btn-lux btn-lux-primary btn-lux-nav whitespace-nowrap">
              <span className="sm:hidden">Waitlist</span>
              <span className="hidden sm:inline">Join the waitlist</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
