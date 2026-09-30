import { useEffect, useState } from "react";

import logo from "../assets/logo.webp";
import { EXTERNAL, LINKS } from "../content/links";
import { SocialIcons } from "./SocialIcons";

const NAV = [
  { href: "#main", label: "Home" },
  { href: "#map", label: "The Map" },
  { href: "#founder", label: "Founder Story" },
  { href: "#begin", label: "Begin Where You Are" },
  { href: EXTERNAL.community, label: "Community" },
  { href: EXTERNAL.conversation, label: "Book a Conversation" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto grid grid-cols-[48px_1fr_auto] items-center gap-3 px-4 pt-4 sm:grid-cols-[1fr_auto_1fr] sm:px-8 lg:px-[5%] lg:pt-[clamp(20px,3vw,48px)]">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label="Open menu"
          className="-ml-2 flex h-12 w-12 items-center justify-center justify-self-start text-rust"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 lg:h-[clamp(24px,1.9vw,36px)] lg:w-[clamp(24px,1.9vw,36px)]"
            aria-hidden="true"
          >
            <path
              d="M3 6.5h18M3 12h18M3 17.5h18"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <a href="#main" className="min-w-0 justify-self-center" aria-label="Alchemist Ways, home">
          <img
            src={logo}
            alt="Alchemist Ways"
            width={695}
            height={60}
            className="block h-auto w-[min(100%,170px)] sm:w-[220px] lg:w-[clamp(220px,17vw,330px)]"
          />
        </a>
        <a
          href={LINKS.begin}
          className="btn-solid justify-self-end px-5 sm:px-8 lg:min-h-[clamp(44px,2.9vw,56px)] lg:min-w-[clamp(110px,6.5vw,150px)] lg:text-[clamp(13px,0.85vw,16px)]"
        >
          Begin
        </a>
      </div>

      {open && (
        <div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-50 flex flex-col bg-cream/97 px-6 pt-4 pb-10 backdrop-blur"
        >
          <div className="flex items-center justify-between">
            <img
              src={logo}
              alt=""
              width={695}
              height={60}
              className="h-auto w-[170px] sm:w-[220px]"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-12 w-12 items-center justify-center text-rust"
              autoFocus
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                <path
                  d="M5 5l14 14M19 5L5 19"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <nav aria-label="Primary" className="flex flex-1 items-center justify-center">
            <ul className="space-y-5 text-center">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setOpen(false)}
                    {...(n.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="text-2xl font-medium tracking-[0.08em] text-ink uppercase hover:text-rust md:text-3xl"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <SocialIcons />
        </div>
      )}
    </header>
  );
}
