/**
 * Top navigation — fixed glass bar over the ivory hero.
 * Nav: The Map · The Book · Conversations · About · Book a Clarity Call.
 */
const navLinks = [
  { href: "#map", label: "The Map" },
  { href: "#book", label: "The Book" },
  { href: "#conversations", label: "Conversations" },
  { href: "#about", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]">
      <div className="border-b border-[#3a2a1f]/10 bg-[#faf6f0]/70 backdrop-blur-xl supports-[backdrop-filter]:bg-[#faf6f0]/55">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-8 sm:py-3.5">
          <a
            href="#top"
            className="min-w-0 truncate font-display text-[0.75rem] uppercase tracking-[0.3em] text-ink transition-colors hover:text-ember-deep sm:text-[0.85rem]"
          >
            Alchemist Ways
          </a>
          <nav className="flex shrink-0 items-center gap-1 sm:gap-2" aria-label="Primary">
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
          </nav>
        </div>
      </div>
    </header>
  );
}
