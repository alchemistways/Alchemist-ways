import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { HERO_ART } from "../content/heroArt";
import { MapDiagram, MAP_STAGES } from "../components/MapDiagram";
import { LINKS, isExternal } from "../content/links";

/* Responsive image sets: the browser picks the smallest file that is sharp at the
   displayed size × device pixel ratio. `sizes` mirrors each image's CSS width. */
const HERO_SRCSET = `${hero900} 900w, ${hero1280} 1280w, ${hero1686} 1686w, ${hero2400} 2400w`;
// Phone: square crop (~181vw wide), tablet 16:10 crop (~113vw), desktop covers the hero.
const HERO_SIZES = "(max-width: 639px) 181vw, (max-width: 1023px) 113vw, max(100vw, 1084px)";
const MAP_SRCSET = `${map900} 900w, ${map1280} 1280w, ${map1672} 1672w, ${map2400} 2400w`;
// Below lg the artwork is drawn at 240% of a ≤560px frame.
const MAP_SIZES = "(min-width: 1024px) 100vw, min(1344px, 225vw)";
const AVAILABLE_SRCSET = `${available900} 900w, ${available1280} 1280w, ${available1767} 1767w`;
const AVAILABLE_SIZES = "(max-width: 639px) 155vw, 100vw";
const BEGIN_BG_SRCSET = `${beginBg900} 900w, ${beginBg} 1671w, ${beginBg2200} 2200w`;
// The Begin background is object-cover over a section much taller than it is wide on
// phones, so its drawn width is far larger than 100vw (≈3600px at 390px wide, ≈1.55×
// the viewport on tablet/desktop). Ask for the width it is actually drawn at.
const BEGIN_BG_SIZES = "(max-width: 767px) 400vw, 155vw";
// Card art = one third of the min(90vw, 1480px) grid minus two clamp(16px,1.6vw,28px) gaps,
// drawn at 102% to hide the rounded-corner bleed; phones show one card at 100vw − 40px.
const BEGIN_CARD_SIZES =
  "(min-width: 768px) calc((min(90vw, 1480px) - 3.2vw) * 0.34), calc((100vw - 40px) * 1.02)";

const ext = (href: string) =>
  isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};

import hero900 from "../assets/hero-900.webp";
import hero1280 from "../assets/hero-1280.webp";
import hero1686 from "../assets/hero-1686.webp";
import hero2400 from "../assets/hero-2400.webp";
import eclipse from "../assets/eclipse.webp";
import map900 from "../assets/map-900.webp";
import map1280 from "../assets/map-1280.webp";
import map1672 from "../assets/map-1672.webp";
import map2400 from "../assets/map-2400.webp";
import available900 from "../assets/available-900.webp";
import available1280 from "../assets/available-1280.webp";
import available1767 from "../assets/available-1767.webp";
import founder390 from "../assets/founder-390.webp";
import founder780 from "../assets/founder-780.webp";
import beginBg from "../assets/begin-bg.webp";
import beginBg900 from "../assets/begin-bg-900.webp";
import beginBg2200 from "../assets/begin-bg-2200.webp";
import beginDiscover600 from "../assets/begin-discover-600.webp";
import beginDiscover900 from "../assets/begin-discover-900.webp";
import beginDiscover1200 from "../assets/begin-discover-1200.webp";
import beginUnderstand600 from "../assets/begin-understand-600.webp";
import beginUnderstand900 from "../assets/begin-understand-900.webp";
import beginUnderstand1200 from "../assets/begin-understand-1200.webp";
import beginTransform600 from "../assets/begin-transform-600.webp";
import beginTransform900 from "../assets/begin-transform-900.webp";
import beginTransform1200 from "../assets/begin-transform-1200.webp";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 bg-white px-4 py-2 focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Triggered />
        <Adapt />
        <Automatic />
        <Visible />
        <TheMap />
        <Available />
        <Founder />
        <Begin />
      </main>
      <SiteFooter />
    </>
  );
}

/* ---------- 1. Hero ---------- */
function Tagline({ className = "" }: { className?: string }) {
  return (
    <p
      className={`text-[13px] font-semibold tracking-tight text-ink uppercase sm:text-[15px] lg:text-[clamp(13px,1.05vw,19px)] ${className}`}
    >
      <span className="whitespace-nowrap">
        From what <em className="text-rust">moves you</em>
      </span>{" "}
      <span aria-hidden="true" className="mx-1 inline-block text-rust">
        ⟶
      </span>{" "}
      <span className="whitespace-nowrap">
        to what <em className="text-rust">moves through you</em>
      </span>
    </p>
  );
}

function HeroButtons() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
      <a
        href={LINKS.getTheBook}
        {...ext(LINKS.getTheBook)}
        className="btn-pill min-w-[150px] lg:min-w-[clamp(150px,12vw,220px)]"
      >
        Get the book
      </a>
      <a
        href={LINKS.exploreTheMap}
        {...ext(LINKS.exploreTheMap)}
        className="btn-solid min-w-[150px] lg:min-w-[clamp(150px,12vw,220px)]"
      >
        Explore the map
      </a>
    </div>
  );
}

function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative bg-[#f1e6d6] lg:h-[max(600px,min(55.68vw,100svh))] lg:overflow-hidden"
    >
      <h1 id="hero-title" className="sr-only">
        Alchemist Ways. Meet Yourself, Differently. A map from emotional reactivity to creative
        agency.
      </h1>
      <div className="relative lg:static">
        {/* Desktop backdrop: the same file (already loaded), covering the section and anchored
            at the floor line (76.7% down) so it continues the wall and floor to the right of the
            main image when the viewport is wider than the artwork at full height. */}
        <img
          src={hero1686}
          srcSet={HERO_SRCSET}
          sizes={HERO_SIZES}
          alt=""
          aria-hidden="true"
          width={1686}
          height={933}
          decoding="async"
          className="absolute inset-0 hidden h-full w-full object-cover object-[left_76.7%] lg:block"
        />
        <img
          src={hero1686}
          srcSet={HERO_SRCSET}
          sizes={HERO_SIZES}
          alt="The book Meet Yourself, Differently. A Map from Emotional Reactivity to Creative Agency, by Malek Najm Ghaleb, standing on a sunlit surface."
          width={1686}
          height={933}
          fetchPriority="high"
          decoding="async"
          className="relative block aspect-square w-full object-cover object-[22%_62%] sm:aspect-[16/10] sm:object-[20%_60%] lg:absolute lg:top-0 lg:left-0 lg:aspect-[1686/933] lg:h-full lg:w-auto lg:max-w-none lg:[mask-image:linear-gradient(to_right,#000_80%,transparent)]"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-b from-transparent to-[#f1e6d6] lg:hidden"
          aria-hidden="true"
        />
      </div>

      <div className="relative flex flex-col items-center gap-7 px-5 pt-6 pb-12 text-center lg:absolute lg:inset-0 lg:block lg:p-0">
        {/* Hero art slot: see src/content/heroArt.ts */}
        <div
          data-slot="hero-art"
          className={`${HERO_ART.ready ? "block w-full max-w-[340px]" : "hidden"} aspect-square lg:absolute lg:top-[46%] lg:left-[67.5%] lg:block lg:w-[25%] lg:max-w-none lg:-translate-x-1/2 lg:-translate-y-1/2`}
        >
          <img
            src={HERO_ART.src}
            alt={HERO_ART.alt}
            width={800}
            height={800}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="lg:absolute lg:top-[83.8%] lg:left-[67.5%] lg:w-max lg:-translate-x-1/2 lg:-translate-y-1/2">
          <HeroButtons />
        </div>
        <Tagline className="lg:absolute lg:top-[93%] lg:left-[67.5%] lg:w-max lg:-translate-x-1/2 lg:-translate-y-1/2" />
      </div>
    </section>
  );
}

/* ---------- 2. Something happens ---------- */
function Eclipse({ children, size = "md" }: { children: React.ReactNode; size?: "md" | "lg" }) {
  const dims =
    size === "lg"
      ? "w-[140px] sm:w-[160px] md:w-[clamp(140px,14.2vw,220px)]"
      : "w-[116px] sm:w-[160px] md:w-[clamp(160px,16.5vw,270px)]";
  return (
    <div className={`relative aspect-square ${dims}`}>
      <img
        src={eclipse}
        alt=""
        width={440}
        height={440}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-3 text-center text-white">
        {children}
      </div>
    </div>
  );
}

function Underline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`absolute left-0 h-[0.45em] w-full text-accent ${className}`}
    >
      <path
        d="M2 8 C 50 3, 120 2, 198 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Triggered() {
  return (
    <section aria-labelledby="triggered-title" className="bg-white px-5 py-16 text-center md:py-12">
      <h2 id="triggered-title" className="mx-auto max-w-4xl">
        <span className="tracked block text-[15px] font-normal tracking-[0.3em] sm:text-lg md:text-[clamp(19px,1.89vw,32px)]">
          Something happens
        </span>
        <span className="-my-1 block text-[46px] leading-[1.02] font-bold tracking-[-0.045em] sm:text-6xl md:text-[clamp(69px,6.38vw,106px)]">
          Outside You.
        </span>
        <span className="tracked mt-1 block text-[15px] font-normal tracking-[0.3em] sm:text-lg md:text-[clamp(19px,1.89vw,32px)]">
          Something in you is
        </span>
        <span className="block text-[46px] leading-[1.1] font-bold tracking-[-0.03em] text-accent italic sm:text-6xl md:text-[clamp(69px,6.38vw,106px)]">
          Triggered.
        </span>
      </h2>
      <p className="mt-3 text-base md:text-[clamp(17px,1.52vw,24px)]">Something contracts.</p>
      <p className="mt-8 text-2xl font-semibold tracking-[0.04em] text-accent uppercase md:text-[clamp(28px,2.59vw,44px)]">
        Protection moves.
      </p>
      <p className="mx-auto mt-2 max-w-[22em] text-base leading-snug md:text-[clamp(17px,1.65vw,27px)]">
        And sometimes, what happens next doesn’t look like protection.
      </p>
      <ul
        className="mt-10 flex justify-center gap-1.5 sm:gap-8 md:mt-7 md:gap-[clamp(26px,2.64vw,48px)]"
        aria-label="Ways protection moves"
      >
        {["Explode", "Implode", "Shut down"].map((w) => (
          <li key={w}>
            <Eclipse>
              <span className="text-[13px] font-semibold uppercase sm:text-base md:text-[clamp(16px,1.46vw,24px)]">
                {w}
              </span>
            </Eclipse>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-[26px] leading-tight font-medium tracking-[-0.02em] sm:text-4xl md:mt-7 md:text-[clamp(39px,3.3vw,57px)]">
        It can look and feel like who <em className="text-accent">you</em> are.
      </p>
      <p className="tracked mt-6 text-[13px] leading-loose tracking-[0.24em] sm:text-base md:text-[clamp(17px,1.65vw,28px)]">
        To protect what once{" "}
        <span className="text-accent">
          didn’t{" "}
          <span className="relative inline-block whitespace-nowrap">
            feel safe to be.
            <Underline className="-bottom-[0.45em]" />
          </span>
        </span>
      </p>
    </section>
  );
}

/* ---------- 3. You learned to adapt ---------- */
const ADAPTATIONS = [
  { t: "Suppress", s: "Hold it in.", d: "Hold back what wants to be expressed." },
  { t: "Control", s: "Manage it.", d: "Try to manage what feels uncertain." },
  { t: "Defend", s: "Push back.", d: "Protect against what feels threatening." },
  { t: "Avoid", s: "Move away.", d: "Move away from what feels difficult to meet." },
  { t: "Adapt", s: "Change for it.", d: "Change yourself to preserve safety or belonging." },
];

const STREAM_WORDS = [
  "SUPPRESS",
  "CONTROL",
  "DEFEND",
  "HIDE",
  "ADAPT",
  "PLEASE",
  "PERFORM",
  "PROVE",
  "PERFECT",
  "ANTICIPATE",
  "WITHDRAW",
  "OVERTHINK",
  "DISCONNECT",
  "ESCAPE",
] as const;

function WordStreamList({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul className="word-stream-list" aria-hidden={duplicate || undefined}>
      {STREAM_WORDS.map((w, i) => (
        <li key={`${duplicate ? "d" : "a"}-${w}`}>
          {i > 0 && (
            <span aria-hidden="true" className="word-stream-dot">
              ·
            </span>
          )}
          {w}
        </li>
      ))}
    </ul>
  );
}

function WordStream() {
  return (
    <div
      className="word-stream"
      role="region"
      aria-label="I have to: suppress, control, defend, hide, adapt, please, perform, prove, perfect, anticipate, withdraw, overthink, disconnect, escape"
    >
      <p className="word-stream-prefix">
        I have to<span aria-hidden="true">…</span>
      </p>
      <div className="word-stream-viewport">
        <div className="word-stream-track">
          <WordStreamList />
          <WordStreamList duplicate />
        </div>
      </div>
    </div>
  );
}

function Adapt() {
  const body = "text-[15px] leading-snug md:text-[clamp(16px,1.59vw,27px)]";
  return (
    <section
      aria-labelledby="adapt-title"
      className="bg-white px-5 pt-4 pb-16 text-center md:pb-16"
    >
      <h2
        id="adapt-title"
        className="text-[42px] leading-[1.02] font-bold tracking-[-0.01em] uppercase sm:text-6xl md:text-[clamp(69px,5.72vw,97px)]"
      >
        You learned
        <br />
        to <em className="text-accent">adapt.</em>
      </h2>
      <div className={`mx-auto mt-5 max-w-[26em] ${body}`}>
        <p className="text-lg leading-snug md:text-[clamp(19px,1.89vw,32px)]">
          These ways of protecting
          <br />
          weren’t random.
        </p>
        <p className="mt-1 text-lg font-medium text-accent italic md:text-[clamp(19px,1.89vw,32px)]">
          As a child, you had needs.
        </p>
        <p className="mt-1">
          For connection. For safety. For belonging.
          <br className="hidden sm:inline" /> And in learning how to meet those needs,
          <br className="hidden sm:inline" /> they answered a question:
        </p>
      </div>
      <p className="mt-6 text-[22px] leading-tight font-medium sm:text-3xl md:text-[clamp(32px,2.86vw,48px)]">
        Given the world I’m experiencing,
        <br />
        <em className="font-semibold text-accent">what is the safest way to be?</em>
      </p>
      <WordStream />
      <ul className="mx-auto mt-10 grid max-w-[1400px] grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 md:grid-cols-5 md:gap-x-[clamp(9px,1.83vw,39px)]">
        {ADAPTATIONS.map((a, i) => (
          <li
            key={a.t}
            className={`flex flex-col items-center ${i === 4 ? "col-span-2 sm:col-span-1" : ""}`}
          >
            <Eclipse size="lg">
              <span className="text-[15px] font-semibold uppercase md:text-[clamp(15px,1.59vw,27px)]">
                {a.t}
              </span>
              <span className="text-[13px] text-gold italic md:text-[clamp(13px,1.34vw,23px)]">
                {a.s}
              </span>
            </Eclipse>
            <p className={`mt-4 max-w-[11em] font-medium ${body}`}>{a.d}</p>
          </li>
        ))}
      </ul>
      <p className="mt-12 text-base md:text-[clamp(17px,1.65vw,27px)]">What helped you adapt</p>
      <p className="tracked mt-1 text-xl tracking-[0.2em] text-accent md:text-[clamp(24px,2.32vw,39px)]">
        Can become automatic.
      </p>
    </section>
  );
}

/* ---------- 4. What became automatic ---------- */
function Automatic() {
  return (
    <section aria-labelledby="automatic-title" className="bg-white px-5 py-16 text-center md:py-12">
      <h2
        id="automatic-title"
        className="text-[26px] leading-tight font-semibold uppercase sm:text-4xl md:text-[clamp(39px,3.41vw,59px)]"
      >
        What became automatic
        <br />
        <span className="font-normal text-accent">
          can keep{" "}
          <span className="relative inline-block">
            choosing for you.
            <Underline className="-bottom-[0.3em]" />
          </span>
        </span>
      </h2>
      <ul
        className="mx-auto mt-12 flex max-w-[1400px] flex-wrap justify-center gap-x-4 gap-y-3 text-[min(1.25rem,calc((100vw-72px)/17.4))] font-semibold tracking-[0.02em] whitespace-nowrap uppercase sm:gap-x-12 sm:text-[min(1.875rem,4.5vw)] md:mt-8 md:gap-x-[clamp(52px,6.05vw,106px)] md:gap-y-6 md:text-[clamp(35px,3.3vw,57px)]"
        aria-label="Areas of life"
      >
        {["Relationships", "Work", "Creativity"].map((w) => (
          <li key={w}>{w}</li>
        ))}
        <li className="basis-full" aria-hidden="true" />
        {["Money", "Expression", "Health"].map((w) => (
          <li key={w}>{w}</li>
        ))}
      </ul>
      <div className="mt-12 text-base leading-snug md:mt-8 md:text-[clamp(17px,1.59vw,27px)]">
        <p>What you move toward.</p>
        <p>What you move away from.</p>
        <p className="text-lg font-semibold md:text-[clamp(19px,1.95vw,34px)]">
          What you allow yourself
        </p>
        <p className="text-lg font-semibold text-accent italic md:text-[clamp(19px,1.95vw,34px)]">
          to become.
        </p>
        <p className="mt-6">
          And when a pattern has been choosing
          <br />
          for you long enough,
        </p>
        <p className="mt-2 text-2xl leading-tight font-semibold text-accent uppercase md:text-[clamp(28px,2.59vw,44px)]">
          It can feel
          <br />
          like who you are.
        </p>
        <p className="mt-8 text-xl text-accent italic md:text-[clamp(22px,2.2vw,37px)]">But…</p>
      </div>
    </section>
  );
}

/* ---------- 5. What becomes visible ---------- */
function Visible() {
  return (
    <section
      aria-labelledby="visible-title"
      className="bg-white px-5 pt-10 pb-20 text-center md:pb-20"
    >
      <p className="text-lg leading-snug font-light text-accent italic md:text-[clamp(22px,2.32vw,39px)]">
        what feels like who you are
        <br />
        could become visible as a pattern.
      </p>
      <h2
        id="visible-title"
        className="mt-6 text-[32px] leading-[1.08] font-semibold uppercase sm:text-5xl md:text-[clamp(56px,4.95vw,84px)]"
      >
        What becomes visible
        <br />
        can be met.
      </h2>
      <svg
        viewBox="-12 -12 24 24"
        className="mx-auto my-4 h-7 w-7 fill-accent md:h-10 md:w-10"
        aria-hidden="true"
      >
        <path d="M0 -12 C1.2 -3 3 -1.2 12 0 C3 1.2 1.2 3 0 12 C-1.2 3 -3 1.2 -12 0 C-3 -1.2 -1.2 -3 0 -12 Z" />
      </svg>
      <p className="text-2xl leading-tight font-medium text-accent uppercase sm:text-4xl md:text-[clamp(41px,3.63vw,62px)]">
        What can be met
        <br />
        becomes more choosable.
      </p>
      <p className="mt-8 text-base leading-snug md:text-[clamp(18px,1.95vw,33px)]">
        As your capacity to stay with what is here grows,
        <br className="hidden sm:inline" />{" "}
        <em className="text-accent">protection no longer has to lead.</em>
      </p>
    </section>
  );
}

/* ---------- 6. The Map ---------- */
function MapIntro({ titleId }: { titleId: string }) {
  return (
    <div>
      <p className="inline-block text-xs font-medium tracking-[0.18em] text-white uppercase md:text-[clamp(12px,1.09vw,18px)]">
        The Map
        <span className="mt-1 block h-[5px] w-full bg-white" aria-hidden="true" />
      </p>
      <h2
        id={titleId}
        className="mt-6 text-[26px] leading-[1.18] font-semibold uppercase lg:mt-[clamp(20px,2.53vw,46px)] lg:text-[clamp(24px,2.53vw,46px)]"
      >
        See what’s been
        <br />
        choosing for you.
        <br />
        <span className="text-rust">
          Free what wants to
          <br />
          move through you.
        </span>
      </h2>
      <p className="mt-5 text-base leading-snug lg:mt-[clamp(16px,2.3vw,41px)] lg:text-[clamp(14px,1.49vw,26px)]">
        A Map for meeting
        <br />
        what has been <em className="text-rust">moving you,</em> differently.
      </p>
      <a
        href={LINKS.exploreTheMapSection}
        {...ext(LINKS.exploreTheMapSection)}
        className="btn-outline mt-6 border-rust text-ink lg:mt-[clamp(16px,2.3vw,41px)] lg:text-[clamp(11px,0.98vw,17px)]"
      >
        Explore the map <span aria-hidden="true">⟶</span>
      </a>
    </div>
  );
}

function MapSteps({ overlay }: { overlay: boolean }) {
  return (
    <ol
      className={
        overlay
          ? "grid grid-cols-5 border-t border-white/60"
          : "mx-auto grid max-w-[640px] gap-px overflow-hidden rounded-lg bg-rust/20 sm:grid-cols-2"
      }
    >
      {MAP_STAGES.map((s, i) => (
        <li
          key={s.n}
          className={
            overlay
              ? "relative px-[1vw] pt-[1.2vw] text-center"
              : `bg-[#f6ead7] px-5 py-5 text-center ${i === 4 ? "sm:col-span-2" : ""}`
          }
        >
          {overlay && i > 0 && (
            <span
              className="absolute top-[1.4vw] bottom-[1.4vw] left-0 w-px bg-white/60"
              aria-hidden="true"
            >
              <span className="absolute top-1/2 left-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-rust" />
            </span>
          )}
          <span className="block text-xl font-normal lg:text-[clamp(18px,1.68vw,29px)]">{s.n}</span>
          <span className="block text-sm font-medium tracking-[0.02em] uppercase lg:text-[clamp(11px,1.06vw,18px)]">
            {s.label}
          </span>
          <span className="block text-sm text-rust italic lg:text-[clamp(11px,1.01vw,17px)]">
            {s.word}
          </span>
          <span className="mx-auto mt-2 block max-w-[16em] text-sm leading-snug lg:text-[clamp(11px,1.01vw,17px)]">
            {s.text}
          </span>
        </li>
      ))}
    </ol>
  );
}

function MapArt({ variant }: { variant: "sm" | "lg" }) {
  return (
    <>
      <img
        src={map1672}
        srcSet={MAP_SRCSET}
        sizes={MAP_SIZES}
        alt="Seen from above, a circle of people sit together on golden desert sand."
        width={1672}
        height={941}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full"
      />
      <MapDiagram markerId={`map-arrow-${variant}`} />
    </>
  );
}

function TheMap() {
  return (
    <section id="map" aria-labelledby="map-title" className="scroll-mt-4 bg-[#e9d3ae] text-ink">
      {/* Phone & tablet: text, artwork crop, then stages */}
      <div className="px-5 pt-14 pb-14 lg:hidden">
        <div className="mx-auto max-w-[640px]">
          <MapIntro titleId="map-title-sm" />
        </div>
        <div className="relative mx-auto mt-10 aspect-square max-w-[560px] overflow-hidden rounded-lg">
          {/* Artwork sized so MapDiagram CENTER (61.4%, 43.5%) lands at the square’s center. */}
          <div
            className="absolute aspect-[1672/941] w-[240%] [container-type:inline-size]"
            style={{ left: "50%", top: "50%", transform: "translate(-61.4%, -43.5%)" }}
          >
            <MapArt variant="sm" />
          </div>
        </div>
        <div className="mt-10">
          <MapSteps overlay={false} />
        </div>
      </div>
      {/* Desktop: full-bleed artwork with overlaid text, matching the design */}
      <div className="relative hidden aspect-[1672/941] w-full [container-type:inline-size] lg:block">
        <MapArt variant="lg" />
        <div
          className="absolute inset-y-0 left-0 w-[48%] bg-gradient-to-r from-[#f7ead3]/75 via-[#f7ead3]/35 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#f7ead3]/60 to-transparent"
          aria-hidden="true"
        />
        <div className="absolute top-[13.5%] left-[4.6%] w-[34%]">
          <MapIntro titleId="map-title" />
        </div>
        <div className="absolute inset-x-[2.5%] top-[72.5%] bottom-[3%]">
          <MapSteps overlay />
        </div>
      </div>
    </section>
  );
}

/* ---------- 7. What becomes available ---------- */
const CAPACITIES = [
  {
    t: ["Presence"],
    d: "Stay with yourself and your experience, even when life moves around you.",
  },
  {
    t: ["Receiving"],
    d: "Expand your capacity to receive and hold more—including greater wealth.",
  },
  { t: ["Authenticity"], d: "Express what is true without needing to hide yourself." },
  { t: ["Relational", "security"], d: "Remain yourself while being close to another." },
  {
    t: ["Creative", "freedom"],
    d: "Create what brings you alive without needing external approval.",
  },
];

function Available() {
  return (
    <section
      aria-labelledby="available-title"
      className="relative overflow-hidden bg-white text-center"
    >
      <div className="relative z-10 px-5 pt-16 md:pt-20">
        <h2 id="available-title">
          <span className="tracked block text-lg tracking-[0.3em] sm:text-2xl md:text-[clamp(28px,2.53vw,44px)]">
            What becomes
          </span>
          <span className="block text-[54px] leading-[1] font-bold text-rust uppercase sm:text-7xl md:text-[clamp(82px,7.7vw,132px)]">
            Available?
          </span>
        </h2>
        <p className="mt-8 font-display text-lg tracking-[0.3em] uppercase md:mt-9 md:text-[clamp(19px,1.83vw,32px)]">
          Greater capacity for
        </p>
        <ul className="mx-auto mt-8 grid max-w-[1400px] divide-y divide-[#d9a668] sm:grid-cols-2 sm:divide-y-0 md:grid-cols-5 md:divide-x">
          {CAPACITIES.map((c, i) => (
            <li
              key={c.t.join(" ")}
              className={`@container px-4 py-5 md:px-2 md:py-1 lg:px-[clamp(9px,1.2vw,20px)] ${i === 4 ? "sm:col-span-2 md:col-span-1" : ""}`}
            >
              <h3 className="text-[min(1.125rem,11cqi)] leading-tight font-semibold tracking-[0.12em] uppercase md:text-[min(clamp(16px,1.83vw,32px),11cqi)]">
                {c.t.map((l, j) => (
                  <span key={j} className="md:block">
                    {l}
                    {j < c.t.length - 1 ? " " : ""}
                  </span>
                ))}
              </h3>
              <p className="mx-auto mt-2 max-w-[17em] text-[15px] leading-snug md:mt-3 md:text-[clamp(14px,1.4vw,23px)]">
                {c.d}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative -mt-[18%] min-h-[300px] sm:-mt-[14%] md:-mt-[33%]">
        <img
          src={available1767}
          srcSet={AVAILABLE_SRCSET}
          sizes={AVAILABLE_SIZES}
          alt="A person sits alone on a dune ridge, facing the sun rising over desert mountains."
          width={1767}
          height={890}
          loading="lazy"
          decoding="async"
          className="block h-full min-h-[300px] w-full object-cover object-[50%_75%] saturate-[0.8] sepia-[0.12]"
        />
        <div
          className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/45 to-transparent"
          aria-hidden="true"
        />
        <p className="absolute inset-x-0 bottom-[7%] text-lg leading-snug font-medium tracking-[0.12em] text-white uppercase drop-shadow sm:text-2xl md:text-[clamp(26px,2.53vw,44px)]">
          More of you
          <br />
          <span className="font-semibold text-gold">Becomes available.</span>
        </p>
      </div>
    </section>
  );
}

/* ---------- 8. Founder ---------- */
function Founder() {
  return (
    <section
      id="founder"
      aria-labelledby="founder-title"
      className="scroll-mt-4 bg-white px-5 py-16 text-center md:py-16"
    >
      <img
        src={founder390}
        srcSet={`${founder390} 390w, ${founder780} 780w`}
        sizes="(min-width: 768px) clamp(238px, 20.9vw, 363px), 200px"
        alt="Portrait of Malek Najm Ghaleb, founder of Alchemist Ways, smiling in front of a stone wall."
        width={390}
        height={390}
        loading="lazy"
        decoding="async"
        className="mx-auto h-[200px] w-[200px] rounded-full object-cover shadow-[0_10px_30px_rgb(0_0_0/0.12)] md:h-[clamp(238px,20.9vw,363px)] md:w-[clamp(238px,20.9vw,363px)]"
      />
      <p className="mt-12 text-xs font-medium tracking-[0.18em] uppercase md:mt-10 md:text-[clamp(13px,1.16vw,20px)]">
        Founder story
      </p>
      <h2
        id="founder-title"
        className="mt-5 text-[28px] leading-tight font-semibold uppercase md:text-[clamp(32px,2.64vw,46px)]"
      >
        Why Alchemist Ways
        <br />
        <span className="text-accent">exists</span>
      </h2>
      <div className="mx-auto mt-6 max-w-[34em] space-y-2 text-[15px] leading-snug md:text-[clamp(16px,1.46vw,24px)]">
        <p>
          For years, I thought I was searching for freedom.
          <br />
          Validation. Creativity. Love.
        </p>
        <p>
          But beneath all of those desires was something quieter
          <br className="hidden sm:inline" /> I couldn’t yet see.
        </p>
        <p className="text-accent italic">I was searching for inner safety.</p>
        <p>
          Much of my life had become organized around looking outside myself—for approval,
          direction, permission, and confirmation that who I was and what I wanted could be trusted.
        </p>
        <p>
          Eventually, I stopped trying to escape my anger
          <br className="hidden sm:inline" /> and began trying to understand it.
        </p>
        <p className="text-accent italic">What is this anger trying to communicate?</p>
        <p>
          Following that question led me beneath the anger—
          <br className="hidden sm:inline" />
          to fear, hurt, protection, old conclusions about myself,
          <br className="hidden sm:inline" /> and parts of myself I had left behind.
        </p>
        <p className="pt-1">
          <strong className="font-semibold">The Map emerged from that process.</strong>
          <br />
          Alchemist Ways grew from learning to meet those parts differently.
        </p>
      </div>
      <p className="mt-10 text-[15px] font-semibold text-accent md:text-[clamp(16px,1.4vw,23px)]">
        Malek Najm Ghaleb
      </p>
      <p className="text-sm italic md:text-[clamp(15px,1.28vw,21px)]">Founder, Alchemist Ways</p>
      <a
        href={LINKS.founderStory}
        {...ext(LINKS.founderStory)}
        className="btn-outline mt-6 min-w-[min(100%,340px)] text-accent"
      >
        Read the founder story <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}

/* ---------- 9. Begin where you are ---------- */
const PATHS = [
  {
    n: "01",
    t: "Discover",
    s: "Meet what’s here.",
    lead: "A 10-minute Emotional Awareness Tool.",
    d: "Take one reaction, feeling, or pattern and begin seeing the invisible architecture beneath it.",
    cta: "Discover the tool",
    href: LINKS.discoverTool,
    img: beginDiscover900,
    srcSet: `${beginDiscover600} 600w, ${beginDiscover900} 900w, ${beginDiscover1200} 1200w`,
    alt: "A person sits in meditation before a circular opening looking out over a golden coastal sunset.",
  },
  {
    n: "02",
    t: "Understand",
    s: "Explore the book / map.",
    lead: "The complete Map, in book form.",
    d: "Go deeper into the hidden architecture beneath your patterns—and the movement from reactivity to Creative Agency.",
    cta: "Explore the book",
    href: LINKS.exploreBook,
    img: beginUnderstand900,
    srcSet: `${beginUnderstand600} 600w, ${beginUnderstand900} 900w, ${beginUnderstand1200} 1200w`,
    alt: "An open book on desert sand showing The Map diagram from reactivity to creative agency.",
  },
  {
    n: "03",
    t: "Transform",
    s: "Bring it into life.",
    lead: "One-on-one work with Malek.",
    d: "Bring the Map into lived experience—see what moves you, meet it differently, and create more room for choice.",
    cta: "Work with Malek",
    href: LINKS.workWithMalek,
    img: beginTransform900,
    srcSet: `${beginTransform600} 600w, ${beginTransform900} 900w, ${beginTransform1200} 1200w`,
    alt: "Two people sit facing each other on desert sand inside a glowing circular ring.",
  },
];

function StarDivider() {
  return (
    <div
      className="mx-auto flex w-[min(80%,360px)] items-center gap-3 text-rust"
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-rust/70" />
      <svg viewBox="-12 -12 24 24" className="h-6 w-6 fill-current">
        <path d="M0 -12 C1.2 -3 3 -1.2 12 0 C3 1.2 1.2 3 0 12 C-1.2 3 -3 1.2 -12 0 C-3 -1.2 -1.2 -3 0 -12 Z" />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-rust/70" />
    </div>
  );
}

function Begin() {
  return (
    <section
      id="begin"
      aria-labelledby="begin-title"
      className="relative scroll-mt-4 overflow-hidden px-5 py-14 text-center md:py-[clamp(52px,4.95vw,88px)]"
    >
      <img
        src={beginBg}
        srcSet={BEGIN_BG_SRCSET}
        sizes={BEGIN_BG_SIZES}
        alt=""
        width={1671}
        height={1040}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div
        className="absolute inset-0 [background:radial-gradient(ellipse_45%_30%_at_50%_20%,rgb(255_243_228/0.55),transparent),radial-gradient(ellipse_32%_22%_at_50%_90%,rgb(255_246_236/0.95),rgb(255_240_225/0.4)_60%,transparent)]"
        aria-hidden="true"
      />
      <div className="relative">
        <StarDivider />
        <h2
          id="begin-title"
          className="mt-5 text-[40px] leading-[1.05] font-semibold tracking-[-0.045em] sm:text-6xl md:text-[clamp(65px,5.94vw,101px)]"
        >
          <span className="text-rust-deep">Begin</span> Where You Are.
        </h2>
        <p className="tracked mt-3 text-[13px] leading-relaxed tracking-[0.24em] sm:text-lg md:text-[clamp(16px,1.6vw,28px)]">
          Three ways to begin meeting yourself,{" "}
          <em className="font-medium tracking-normal text-rust normal-case">Differently.</em>
        </p>
        <ul className="mx-auto mt-10 grid max-w-[1320px] gap-6 md:mt-10 md:max-w-[min(100%,90vw,1480px)] md:grid-cols-3 md:gap-[clamp(16px,1.6vw,28px)]">
          {PATHS.map((p) => (
            <li
              key={p.n}
              id={p.t.toLowerCase()}
              className="scroll-mt-6 flex flex-col overflow-hidden rounded-2xl border border-rust/25 bg-[#fbf7f1]/95 text-left shadow-[0_12px_30px_rgb(90_55_20/0.16)] backdrop-blur-sm"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-[#1a120c]">
                <img
                  src={p.img}
                  srcSet={p.srcSet}
                  sizes={BEGIN_CARD_SIZES}
                  alt={p.alt}
                  width={900}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 block h-[102%] w-[102%] max-w-none -translate-x-[1%] -translate-y-[1%] object-cover object-center"
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/70 via-black/35 to-transparent"
                  aria-hidden="true"
                />
                <span className="absolute top-3 left-3 text-lg font-light tracking-wide text-white/90 md:text-[clamp(16px,1.3vw,22px)]">
                  {p.n}
                </span>
                <div className="absolute inset-x-0 bottom-0 px-4 pt-8 pb-4 text-center text-white">
                  <h3 className="text-xl font-semibold tracking-[0.14em] uppercase md:text-[clamp(18px,1.5vw,26px)]">
                    {p.t}
                  </h3>
                  <p className="mt-1 text-[11px] font-medium tracking-[0.16em] uppercase italic md:text-[clamp(11px,0.95vw,15px)]">
                    {p.s}
                  </p>
                </div>
              </div>
              <div className="flex flex-1 flex-col px-5 pt-5 pb-5 md:px-[clamp(18px,1.4vw,28px)] md:pt-6 md:pb-6">
                <p className="text-center text-base leading-snug font-semibold md:text-[clamp(15px,1.2vw,20px)]">
                  {p.lead}
                </p>
                <p className="mt-3 text-center text-sm leading-snug text-ink/75 md:text-[clamp(13px,1.0vw,17px)]">
                  {p.d}
                </p>
                <div className="mt-auto pt-5">
                  <a
                    href={p.href}
                    {...ext(p.href)}
                    className="btn-pill w-full border-ink/80 bg-[#fbf7f1] text-xs font-semibold whitespace-nowrap md:gap-1.5 md:px-[clamp(8px,1.2vw,28px)] md:text-[clamp(10.5px,0.85vw,14px)] md:tracking-[clamp(0.01em,0.04vw,0.04em)]"
                  >
                    {p.cta} <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <StarDivider />
        </div>
        <p className="mt-5 text-lg leading-snug font-medium tracking-[0.14em] uppercase sm:text-2xl md:text-[clamp(26px,2.42vw,42px)]">
          What becomes possible
          <br />
          when <span className="text-rust">more of you</span>
          <br />
          <span className="font-normal">is available to move through?</span>
        </p>
      </div>
    </section>
  );
}
