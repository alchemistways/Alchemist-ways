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

const MENU_SCRIPT = `(()=>{const m=document.getElementById("site-menu"),o=document.querySelector("[data-menu-open]");if(!m||!o)return;const set=v=>{m.hidden=!v;o.setAttribute("aria-expanded",String(v));document.body.style.overflow=v?"hidden":"";(v?m.querySelector("[data-menu-close]"):o).focus({preventScroll:true})};o.addEventListener("click",()=>set(true));m.addEventListener("click",e=>{if(e.target.closest("[data-menu-close],a"))set(false)});document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!m.hidden)set(false)})})();`;

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto grid grid-cols-[52px_1fr_52px] items-center gap-3 px-4 pt-4 sm:grid-cols-[1fr_auto_1fr] sm:px-8 lg:px-[3.2%] lg:pt-[clamp(18px,2.7vw,52px)]">
        <button
          type="button"
          data-menu-open
          aria-expanded="false"
          aria-controls="site-menu"
          aria-label="Open menu"
          className="flex h-[52px] w-[52px] items-center justify-center justify-self-start rounded-full bg-[#0b0b0d] text-white shadow-[0_6px_16px_rgb(0_0_0/0.18)] transition-transform hover:scale-105 lg:h-[clamp(52px,5.9vw,100px)] lg:w-[clamp(52px,5.9vw,100px)]"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-[22px] w-[22px] lg:h-[clamp(22px,2.1vw,36px)] lg:w-[clamp(22px,2.1vw,36px)]"
            aria-hidden="true"
          >
            <path
              d="M3 6.5h18M3 12h18M3 17.5h18"
              stroke="currentColor"
              strokeWidth="1.6"
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
            className="block h-auto w-[min(100%,170px)] sm:w-[210px] lg:w-[clamp(210px,15.5vw,320px)] lg:-translate-y-[clamp(4px,1vw,20px)]"
          />
        </a>
        <a
          href={LINKS.begin}
          className="flex h-[52px] w-[52px] items-center justify-center justify-self-end rounded-full text-[11px] font-medium tracking-[0.08em] text-[#e2491b] uppercase shadow-[0_0_18px_rgb(255_196_70/0.55)] transition-transform [background:radial-gradient(circle_at_42%_36%,#fff3b0_0%,#ffd75a_42%,#f9b92a_78%,#f2a01c_100%)] hover:scale-105 lg:h-[clamp(52px,5.6vw,96px)] lg:w-[clamp(52px,5.6vw,96px)] lg:text-[clamp(11px,1vw,19px)]"
        >
          Begin
        </a>
      </div>

      <div
        id="site-menu"
        hidden
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
            data-menu-close
            aria-label="Close menu"
            className="flex h-12 w-12 items-center justify-center text-rust"
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
      {/* The page ships without a JS framework; this is the only script it needs. */}
      <script dangerouslySetInnerHTML={{ __html: MENU_SCRIPT }} />
    </header>
  );
}
