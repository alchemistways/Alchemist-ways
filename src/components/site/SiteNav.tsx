import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

import { content } from "@/i18n/content";
import { setLang, useLang } from "@/i18n/language";
import BrandWordmark from "./BrandWordmark";

function LangToggle({ className = "" }: { className?: string }) {
  const lang = useLang();
  return (
    <div className={`eyebrow flex items-center gap-2 text-[0.6rem] ${className}`}>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={lang === "en" ? "text-ember" : "text-ink/60 transition-colors hover:text-ember"}
      >
        EN
      </button>
      <span aria-hidden className="text-ink/35">
        |
      </span>
      <button
        type="button"
        onClick={() => setLang("fr")}
        className={lang === "fr" ? "text-ember" : "text-ink/60 transition-colors hover:text-ember"}
      >
        FR
      </button>
    </div>
  );
}

const SOCIAL = {
  instagram: "https://www.instagram.com/alchemistways",
  youtube: "https://www.youtube.com/@alchemistwaysofficial",
  tiktok: "https://www.tiktok.com/@alchemistways",
  skool: "https://www.skool.com/alchemist-ways-1974/about",
};

const CALLS = {
  clarityCall: "https://calendly.com/alchemistways/conversation",
  claritySession: "https://calendly.com/alchemistways/clarity-session",
};

export const siteLinks = {
  social: SOCIAL,
  calls: CALLS,
};

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const lang = useLang();
  const t = content[lang].nav;

  const links = [
    { label: t.map, caret: true, href: "#the-map" },
    { label: t.book, caret: true, href: "#begin" },
    { label: t.podcast, caret: false, href: "#begin" },
    { label: t.about, caret: false, href: "#founder" },
  ];

  return (
    <header className="relative z-30 px-5 pt-6 sm:px-8 lg:px-12">
      {/* Mobile header */}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between lg:hidden">
        <button
          type="button"
          aria-label={open ? t.close : t.menu}
          onClick={() => setOpen((v) => !v)}
          className="shrink-0 text-ember"
        >
          <Menu className="h-6 w-6" strokeWidth={1.5} />
        </button>

        <a
          href="#top"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center leading-none"
        >
          <BrandWordmark className="h-6 xs:h-7 sm:h-7" />
        </a>

        <div className="flex shrink-0 flex-col items-center gap-1.5">
          <a
            href={SOCIAL.skool}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow flex items-center gap-1 rounded-full bg-ember px-4 py-2 text-[0.62rem] text-cream xs:px-5 xs:text-[0.68rem]"
          >
            {t.begin}
            <ChevronDown className="h-3 w-3" strokeWidth={1.5} />
          </a>
          <LangToggle />
        </div>
      </div>

      {/* Desktop header */}
        <div className="mx-auto hidden max-w-7xl lg:block">
        <div className="flex justify-center">
          <a href="#top" className="inline-block text-center leading-none">
            <BrandWordmark className="h-8" />
          </a>
        </div>

        <nav className="mt-6 flex items-center justify-center gap-8 xl:gap-12">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="eyebrow flex items-center gap-1.5 text-[0.72rem] text-ink/85 transition-colors hover:text-ember"
            >
              {l.label}
              {l.caret && <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.5} />}
            </a>
          ))}
          <a
            href={SOCIAL.skool}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow flex items-center gap-1.5 rounded-full bg-ember px-7 py-3 text-[0.72rem] text-cream transition-opacity hover:opacity-90"
          >
            {t.begin}
            <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.5} />
          </a>
        </nav>
      </div>


      {open && (
        <div className="fixed inset-0 z-50 bg-cream px-6 py-6 lg:hidden">
          <div className="flex items-center justify-between">
            <BrandWordmark className="h-5" />
            <button type="button" aria-label={t.close} onClick={() => setOpen(false)}>
              <X className="h-6 w-6 text-ink" />
            </button>
          </div>
          <nav className="mt-12 flex flex-col gap-7">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="eyebrow text-sm text-ink"
              >
                {l.label}
              </a>
            ))}
            <a
              href={SOCIAL.skool}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="eyebrow mt-2 rounded-full bg-ember px-7 py-3 text-center text-xs text-cream"
            >
              {t.begin}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
