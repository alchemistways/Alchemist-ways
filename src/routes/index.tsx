import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { VideoBlock } from "../components/VideoBlock";
import { EclipseArt, LineIcon, WaveCircleArt, type IconName } from "../components/Art";
import { LINKS, isExternal } from "../content/links";
import { STAGES } from "../content/stages";
import { DIAGRAM, HeroDiagram } from "../components/HeroDiagram";

import heroScene900 from "../assets/hero-scene-900.webp";
import heroScene1280 from "../assets/hero-scene-1280.webp";
import heroScene1711 from "../assets/hero-scene-1711.webp";
import heroWall from "../assets/hero-wall-760.webp";
import heroBook432 from "../assets/hero-book-432.webp";
import heroBook864 from "../assets/hero-book-864.webp";
import mapGold640 from "../assets/map-gold-640.webp";
import mapGold1006 from "../assets/map-gold-1006.webp";
import mapGold1400 from "../assets/map-gold-1400.webp";
import mapBackdrop from "../assets/map-backdrop-480.webp";
import sun516 from "../assets/sun-516.webp";
import sun1032 from "../assets/sun-1032.webp";
import founder390 from "../assets/founder-390.webp";
import founder780 from "../assets/founder-780.webp";
import beginDiscover420 from "../assets/begin-discover-420.webp";
import beginDiscover636 from "../assets/begin-discover-636.webp";
import beginDiscover960 from "../assets/begin-discover-960.webp";
import beginUnderstand420 from "../assets/begin-understand-420.webp";
import beginUnderstand636 from "../assets/begin-understand-636.webp";
import beginUnderstand960 from "../assets/begin-understand-960.webp";
import beginTransform420 from "../assets/begin-transform-420.webp";
import beginTransform636 from "../assets/begin-transform-636.webp";
import beginTransform960 from "../assets/begin-transform-960.webp";

/* Responsive image sets: the browser picks the smallest file that is sharp at the
   displayed size × device pixel ratio. `sizes` mirrors each image's CSS width. */
// Hero (desktop ≥ 1024): the client scene (pale wall with window light, floor) with the
// headline, Map and book removed and the floor extended below the book (1711×1020), on an
// aspect-locked stage at full hero height (stage width = 1.6775 × hero height). Book,
// headline, Map diagram and buttons are placed on it in % of the stage.
const HERO_SCENE_SRCSET = `${heroScene900} 900w, ${heroScene1280} 1280w, ${heroScene1711} 1711w`;
// The scene always spans the full hero width (scaled about the horizon when the stage is
// narrower than the viewport), so it is max(stage width, 100vw).
const HERO_SCENE_SIZES = "max(1006px, 100vw)";
const DESKTOP = "(min-width: 1024px)";
// The book, cut out of the mockup at its native size (432 = 1×, the sharpest source; 864 = a
// sharpened Lanczos 2× for 2–3× screens), with a full mirrored floor reflection. The same
// image is used at every width: on the desktop stage (25.25% of the stage width) and on
// phones/tablets over a CSS wall + floor, so the whole book is always in view.
const HERO_BOOK_SRCSET = `${heroBook432} 432w, ${heroBook864} 864w`;
const HERO_BOOK_SIZES =
  "(min-width: 1024px) max(254px, min(25.25vw, 42.36vh)), (min-width: 768px) 260px, min(62vw, 280px)";
/** 1×1 transparent GIF: lets a <picture> skip its download where it is not shown. */
const NO_IMAGE = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
const BOOK_ALT =
  "The book Meet Yourself, Differently. by Malek Najm Ghaleb, subtitled Turn emotional reactivity into creative agency, standing in soft window light.";

// The Map: golden sand disc with the meditating figure (labels baked in), cut out of its white
// background (1006 px native; 1400 = Lanczos 2× for 2× desktop screens).
const MAP_GOLD_SRCSET = `${mapGold640} 640w, ${mapGold1006} 1006w, ${mapGold1400} 1400w`;
// Desktop: 40% of the band; below lg: the full column (≤ 560px).
const MAP_GOLD_SIZES = "(min-width: 1024px) 40vw, min(100vw - 40px, 560px)";
// Card art = one third of the min(91vw, 1520px) grid minus two 1.6vw gaps; phones one card.
const BEGIN_CARD_SIZES =
  "(min-width: 768px) calc((min(91vw, 1520px) - 3.2vw) / 3), min(100vw - 40px, 560px)";

const ext = (href: string) =>
  isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};

export const Route = createFileRoute("/")({
  // Start the hero art download with the HTML, matching the <picture> sources exactly.
  head: () => ({
    links: [
      {
        rel: "preload",
        as: "image",
        imageSrcSet: HERO_SCENE_SRCSET,
        imageSizes: HERO_SCENE_SIZES,
        media: DESKTOP,
        fetchPriority: "high",
      },
      {
        rel: "preload",
        as: "image",
        imageSrcSet: HERO_BOOK_SRCSET,
        imageSizes: HERO_BOOK_SIZES,
        fetchPriority: "high",
      },
    ],
  }),
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
        <VideoBlock />
        <Reactivity />
        <Adaptation />
        <Automaticity />
        <Opening />
        <TheMap />
        <Available />
        <Founder />
        <Begin />
      </main>
      <SiteFooter />
    </>
  );
}

/* ---------- shared bits ---------- */

/** Left-aligned narrative column: centred on phones/tablets, starts at ⅓ of the page on desktop. */
function Column({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`mx-auto w-full max-w-[600px] px-6 sm:px-8 lg:mr-0 lg:ml-[33.2%] lg:max-w-[min(62%,980px)] lg:px-0 ${className}`}
    >
      {children}
    </div>
  );
}

function Eyebrow({ n, children }: { n: string; children: ReactNode }) {
  return (
    <p className="eyebrow">
      <b>{n}</b>
      <i aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

/** Heavy grotesk headline size used by the chapter titles. */
const H2 =
  "font-extrabold leading-[0.98] tracking-[-0.035em] text-ink text-[clamp(31px,8.2vw,46px)] lg:text-[clamp(40px,3.75vw,76px)]";
const BODY = "text-[17px] leading-[1.35] lg:text-[clamp(17px,1.44vw,27px)]";
const EM_L = "em-serif text-[28px] leading-[1.08] lg:text-[clamp(28px,2.75vw,54px)]";

/* ---------- 1. Hero ---------- */
/** Solid “Explore the map” first (left / top when stacked), outlined “Get the book” second. */
function HeroButtons() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 lg:flex-nowrap lg:gap-[1.1cqi]">
      <a
        href={LINKS.getTheBook}
        {...ext(LINKS.getTheBook)}
        className="btn-solid min-w-[150px] lg:min-h-[max(40px,2.7cqi)] lg:min-w-[14.3cqi] lg:px-[1.6cqi] lg:text-[max(11px,0.82cqi)]"
      >
        Get the book
      </a>
      <a
        href={LINKS.exploreTheMap}
        {...ext(LINKS.exploreTheMap)}
        className="btn-pill min-w-[150px] lg:min-h-[max(40px,2.7cqi)] lg:min-w-[14.6cqi] lg:px-[1.6cqi] lg:text-[max(11px,0.82cqi)]"
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
      className="relative isolate overflow-hidden bg-[linear-gradient(#f8eeeb,#fbf5f3_40%,#f7efec)] lg:h-[max(600px,min(59.6vw,100svh))] lg:bg-[#efe4e0]"
    >
      {/* Stage. Phones/tablets: a centred column (headline, book, diagram, buttons) on a CSS
          wall + floor. Desktop: the whole scene at full hero height (never cropped vertically),
          with headline, diagram and buttons placed on it in % of the stage width (cqi). */}
      <div className="relative flex flex-col items-center px-5 pt-[96px] pb-12 [container-type:inline-size] sm:pt-[108px] md:px-8 lg:absolute lg:inset-y-0 lg:left-1/2 lg:block lg:aspect-[1711/1020] lg:h-full lg:-translate-x-1/2 lg:p-0">
        {/* Scene: the stage’s own width when it fills the viewport; on short/wide screens it is
            scaled up to the viewport width about its horizon line (74.5% down), so the wall
            light runs edge to edge (no blurred side bands) and the book stays on the floor. */}
        <picture>
          <source media={DESKTOP} srcSet={HERO_SCENE_SRCSET} sizes={HERO_SCENE_SIZES} />
          <img
            src={NO_IMAGE}
            alt=""
            aria-hidden="true"
            width={1711}
            height={1020}
            fetchPriority="high"
            decoding="async"
            className="hidden lg:absolute lg:left-1/2 lg:block lg:h-auto lg:w-[max(100cqi,100vw)] lg:max-w-none lg:-translate-x-1/2 lg:top-[calc((100cqi-max(100cqi,100vw))*0.44418)]"
          />
        </picture>
        <h1
          id="hero-title"
          className="relative z-10 text-center font-serif text-[34px] leading-[1.06] font-medium tracking-[-0.015em] text-[#24211f] sm:text-[46px] lg:absolute lg:inset-x-0 lg:top-[12.07%] lg:text-[3.95cqi] lg:leading-[1.02]"
        >
          What moves you
          <br />
          <em className="font-medium text-red">
            doesn’t have to <br className="sm:hidden" />
            choose for you.
          </em>
        </h1>
        <div className="relative mt-6 flex w-full flex-col items-center md:mt-10 md:flex-row md:items-center md:justify-center md:gap-[4vw] lg:static lg:mt-0 lg:block">
          {/* Book. Phones/tablets: in the column; its wrapper carries the wall (everything above
              the horizon, 35.2% up from the image bottom, is wall; below it the section floor).
              Desktop: placed on the stage where it stands in the scene. */}
          <div className="relative w-[min(62vw,280px)] shrink-0 md:w-[260px] lg:absolute lg:top-[29.02%] lg:left-[18.469%] lg:w-[25.248%]">
            <div
              aria-hidden="true"
              className="absolute bottom-[35.2%] left-1/2 -z-10 h-[760px] w-[200vw] -translate-x-1/2 bg-[#f6ebe8] bg-cover bg-[position:50%_100%] [mask-image:linear-gradient(to_top,transparent,#000_10px)] lg:hidden"
              style={{ backgroundImage: `url(${heroWall})` }}
            />
            <img
              data-book
              src={heroBook432}
              srcSet={HERO_BOOK_SRCSET}
              sizes={HERO_BOOK_SIZES}
              alt={BOOK_ALT}
              width={432}
              height={716}
              fetchPriority="high"
              decoding="async"
              className="block h-auto w-full"
            />
          </div>
          <HeroDiagram
            variant="compact"
            className="mt-6 block h-auto w-full max-w-[400px] md:mt-0 md:w-[420px] md:max-w-[52vw] lg:hidden"
          />
          {/* Desktop: ring centre at 66.5% / 57.2% of the stage, i.e. level with the middle of
              the book’s cover (as in the mockup); the buttons are centred under it. One SVG unit
              = 1/1024 of the stage width, the mockup’s scale. */}
          <HeroDiagram
            variant="wide"
            className="hidden lg:absolute lg:top-[57.2%] lg:left-[66.5%] lg:block lg:h-auto"
            style={{
              width: `${((DIAGRAM.wide.halfW * 2) / 1024) * 100}%`,
              // shift up by the ring centre’s share of the height, so the ring (not the label box) is anchored
              translate: `-50% -${(-DIAGRAM.wide.top / (DIAGRAM.wide.bottom - DIAGRAM.wide.top)) * 100}%`,
            }}
          />
        </div>
        <div className="relative z-10 mt-8 lg:absolute lg:top-[84%] lg:left-[66.5%] lg:mt-0 lg:w-max lg:-translate-x-1/2 lg:-translate-y-1/2">
          <HeroButtons />
        </div>
      </div>
    </section>
  );
}

/* ---------- 2. 01 Reactivity ---------- */
const STREAM_WORDS = [
  "Defend",
  "Avoid",
  "Adapt",
  "Please",
  "Perform",
  "Prove",
  "Withdraw",
  "Overthink",
] as const;

function WordStreamList({ copy }: { copy: number }) {
  return (
    <ul className="word-stream-list" aria-hidden="true">
      {STREAM_WORDS.map((w) => (
        <li key={`${copy}-${w}`}>
          {w}
          <span className="word-stream-dot">·</span>
        </li>
      ))}
    </ul>
  );
}

function StreamTrack({ white = false }: { white?: boolean }) {
  return (
    <div className={`word-stream-viewport ${white ? "is-white" : ""}`} aria-hidden="true">
      <div className="word-stream-track">
        <WordStreamList copy={1} />
        <WordStreamList copy={2} />
        <WordStreamList copy={3} />
        <WordStreamList copy={4} />
      </div>
    </div>
  );
}

/** Eclipse with the slow word stream passing through it (words turn white over the disk). */
function EclipseStream() {
  return (
    <div
      className="relative my-8 h-[min(92vw,420px)] [--disk-r:18.4vw] [--disk-x:50%] sm:h-[400px] sm:[--disk-r:88px] lg:my-[1.5vw] lg:h-[31vw] lg:[--disk-r:8.2vw] lg:[--disk-x:21vw]"
      role="img"
      aria-label={`Protection moves: ${STREAM_WORDS.join(", ").toLowerCase()}.`}
    >
      <EclipseArt className="absolute top-1/2 left-[var(--disk-x)] h-auto w-[calc(var(--disk-r)*5)] max-w-none -translate-x-1/2 -translate-y-1/2" />
      <StreamTrack />
      <StreamTrack white />
    </div>
  );
}

function Reactivity() {
  return (
    <section
      aria-labelledby="reactivity-title"
      className="bg-white pt-14 pb-10 lg:pt-[4.6vw] lg:pb-[3vw]"
    >
      <Column>
        <Eyebrow n="01">Reactivity</Eyebrow>
        <h2 id="reactivity-title" className={`mt-4 lg:mt-[1.2vw] ${H2}`}>
          Something happens
          <br />
          outside you.
        </h2>
        <p className="em-serif mt-1 text-[27px] leading-tight lg:text-[clamp(27px,2.75vw,54px)]">
          Something in you is triggered.
        </p>
        <div className={`mt-5 lg:mt-[1.6vw] ${BODY}`}>
          <p>
            Something <b className="font-semibold tracking-[0.16em]">Activates</b>
          </p>
          <p>Something contracts.</p>
          <p>Something becomes obscured.</p>
        </div>
        <p className="mt-8 text-[20px] font-extrabold tracking-[-0.01em] uppercase lg:mt-[3vw] lg:text-[clamp(20px,1.75vw,34px)]">
          Protection moves.
        </p>
      </Column>
      <EclipseStream />
      <Column>
        <p className="text-[19px] font-semibold tracking-[0.01em] text-ink-soft uppercase lg:text-[clamp(19px,1.7vw,32px)]">
          What is hidden.
        </p>
        <p className="mt-2 text-[28px] leading-[1.15] font-extrabold tracking-[-0.03em] lg:mt-[0.6vw] lg:text-[clamp(28px,2.75vw,54px)]">
          can look and feel like
          <br />
          <em className="em-serif text-[1.1em]">who you are.</em>
        </p>
        <p className="mt-4 text-[13px] leading-relaxed tracking-[0.2em] uppercase lg:mt-[0.8vw] lg:text-[clamp(13px,1.02vw,19px)]">
          To protect what once <span className="text-red">didn’t feel safe to be.</span>
        </p>
      </Column>
    </section>
  );
}

/* ---------- 3. 02 Adaptation ---------- */
function Adaptation() {
  return (
    <section aria-labelledby="adaptation-title" className="bg-white py-12 lg:py-[3.4vw]">
      <Column>
        <Eyebrow n="02">Adaptation</Eyebrow>
        <h2
          id="adaptation-title"
          className="mt-4 text-[44px] leading-[0.98] font-extrabold tracking-[-0.035em] lg:mt-[1.4vw] lg:text-[clamp(44px,4.55vw,90px)]"
        >
          You learned
          <br />
          to <em className="em-serif">adapt.</em>
        </h2>
        <div className={`mt-6 lg:mt-[1.8vw] ${BODY}`}>
          <p>These ways of protecting weren’t random.</p>
          <p className="em-serif text-[1.12em]">As a child, you had needs.</p>
          <p>For connection. For safety. For belonging.</p>
          <p>Beneath those needs was a question.</p>
        </div>
        <p className="mt-7 text-[22px] leading-[1.1] font-extrabold tracking-[-0.02em] lg:mt-[2.4vw] lg:text-[clamp(22px,2.05vw,40px)]">
          Given the world I’m experiencing,
          <br />
          <em className="em-serif text-[1.13em]">what is the safest way to be?</em>
        </p>
        <p className="mt-7 text-[22px] leading-[1.1] tracking-[-0.01em] lg:mt-[2.4vw] lg:text-[clamp(22px,2.05vw,40px)]">
          What helped you adapt
          <br />
          <em className="em-serif text-[1.4em] font-bold">can become automatic.</em>
        </p>
      </Column>
    </section>
  );
}

/* ---------- 4. 03 Automaticity ---------- */
function Automaticity() {
  return (
    <section aria-labelledby="automaticity-title" className="bg-white py-12 lg:py-[3.4vw]">
      <Column>
        <Eyebrow n="03">Automaticity</Eyebrow>
        <h2 id="automaticity-title" className={`mt-4 lg:mt-[2vw] ${H2}`}>
          What became automatic
          <br />
          can begin <em className="em-serif text-[1.08em] font-bold">moving you.</em>
        </h2>
        <p className={`mt-6 font-light lg:mt-[2vw] ${BODY} lg:text-[clamp(16px,1.32vw,25px)]`}>
          In relationships. In work. In creativity.
          <br />
          With money. In expression. In health.
        </p>
        <div className="mt-8 text-[18px] leading-[1.3] lg:mt-[3.4vw] lg:text-[clamp(18px,1.55vw,30px)]">
          <p>What you move toward.</p>
          <p>What you move away from.</p>
          <p className="mt-1 text-[0.84em] font-bold tracking-[0.24em] italic">
            What you perceive as possible for you.
          </p>
        </div>
        <p className={`mt-10 lg:mt-[4.2vw] ${BODY}`}>
          And when a pattern has been moving you
          <br />
          for long enough,
        </p>
        <p className="em-serif mt-1 text-[28px] leading-tight font-bold lg:text-[clamp(28px,2.45vw,48px)]">
          it can feel like who you are.
        </p>
        <p className="mt-6 text-[19px] leading-[1.3] font-medium tracking-[0.2em] lg:mt-[2vw] lg:text-[clamp(19px,2vw,38px)]">
          until you <b className="font-extrabold">BEGIN</b> to see
          <br />
          what’s been choosing for you.
        </p>
      </Column>
    </section>
  );
}

/* ---------- 5. 04 Opening ---------- */
function Opening() {
  return (
    <section
      aria-labelledby="opening-title"
      className="bg-white pt-12 pb-16 lg:pt-[3.4vw] lg:pb-[5vw]"
    >
      <Column>
        <Eyebrow n="04">Opening</Eyebrow>
        <p className="mt-4 text-[17px] leading-[1.25] font-light lg:mt-[1.6vw] lg:text-[clamp(17px,1.32vw,25px)]">
          what feels like who you are
          <br />
          can become visible as a pattern.
        </p>
        <h2
          id="opening-title"
          className="mt-5 text-[32px] leading-[1] font-extrabold tracking-[-0.035em] lg:mt-[1.8vw] lg:text-[clamp(36px,3.6vw,72px)]"
        >
          What becomes visible
          <br />
          <em className="em-serif text-[1.12em]">can be met.</em>
        </h2>
        <p className="mt-6 font-serif text-[30px] leading-[1.02] font-bold tracking-[-0.02em] italic lg:mt-[2.2vw] lg:text-[clamp(30px,3.05vw,60px)]">
          What can be met
          <br />
          <span className="text-red">can be related to differently.</span>
        </p>
        <WaveCircleArt className="mt-8 ml-[2%] h-auto w-[min(72%,300px)] lg:mt-[2.4vw] lg:w-[22vw] lg:max-w-[440px]" />
        <div className="mt-6 lg:mt-[2.2vw]">
          <p className="text-[19px] leading-[1.6] font-semibold lg:text-[clamp(19px,1.75vw,34px)]">
            What moves within you
            <br />
            doesn’t have to stop.
          </p>
          <p className="mt-3 text-[19px] italic lg:mt-[1.4vw] lg:text-[clamp(19px,1.75vw,34px)]">
            Your relationship to it can change.
          </p>
        </div>
        <p className={`mt-12 lg:mt-[5.6vw] ${BODY}`}>
          As your capacity to stay with what is here grows,
          <br />
          <em className="em-serif font-normal text-[1.08em]">
            enough internal space begins to develop.
          </em>
        </p>
        <p className="mt-8 font-serif text-[28px] leading-[1.05] font-bold tracking-[-0.02em] italic lg:mt-[3.4vw] lg:text-[clamp(28px,2.85vw,56px)]">
          What has been moving you
          <br />
          <span className="text-red">no longer has to choose for you.</span>
        </p>
      </Column>
      <div className="mt-12 text-center lg:mt-[5.4vw]">
        <a
          href={LINKS.goDeeperWithBook}
          {...ext(LINKS.goDeeperWithBook)}
          className="inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-black/10 bg-white px-5 text-[15px] font-bold tracking-[-0.01em] text-red uppercase shadow-[0_6px_16px_rgb(0_0_0/0.22)] transition-shadow hover:shadow-[0_8px_22px_rgb(0_0_0/0.28)] lg:min-h-[clamp(48px,3.4vw,64px)] lg:px-[1.3vw] lg:text-[clamp(15px,1.2vw,23px)]"
        >
          Go deeper with the book <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}

/* ---------- 6. The Map ---------- */
const MAP_LINES = [
  ["A pattern", "moves you."],
  ["What was automatic", "can be seen."],
  ["You can", "relate to it differently."],
  ["It no longer has to", "choose the response."],
  ["What was constrained can", "move through you."],
] as const;

function TheMap() {
  return (
    <section
      id="map"
      aria-labelledby="map-title"
      className="relative scroll-mt-4 overflow-hidden bg-[#8a5528] text-white [container-type:inline-size] lg:aspect-[1671/1095]"
    >
      {/* Soft, blurred sand from the same artwork fills the band; it is tiny because it is blurred. */}
      <img
        src={mapBackdrop}
        alt=""
        aria-hidden="true"
        width={480}
        height={480}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full scale-110 object-cover object-[50%_40%] blur-[6px]"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgb(70_35_10/0.45),rgb(70_35_10/0.15)_40%,rgb(70_35_10/0.35))] lg:bg-[linear-gradient(90deg,rgb(60_28_8/0.62),rgb(60_28_8/0.32)_32%,rgb(60_28_8/0.05)_55%,rgb(60_28_8/0.12))]"
        aria-hidden="true"
      />

      <div className="relative px-5 pt-14 pb-14 sm:px-8 lg:static lg:p-0">
        <div className="mx-auto max-w-[600px] lg:absolute lg:top-[14.2%] lg:left-[4.1%] lg:mx-0 lg:w-[36%] lg:max-w-none">
          <p className="inline-block text-[13px] tracking-[0.3em] uppercase lg:text-[1.08cqi]">
            The Map
            <span
              className="mt-3 block h-[2px] w-[2.4em] bg-white lg:mt-[1.3cqi]"
              aria-hidden="true"
            />
          </p>
          <h2
            id="map-title"
            className="mt-6 font-serif text-[36px] leading-[1.06] font-semibold tracking-[-0.01em] lg:mt-[1.9cqi] lg:text-[3.42cqi]"
          >
            The map is <span className="text-gold-light">not</span>
            <br />a path <span className="text-gold-light">you follow.</span>
          </h2>
          <p className="mt-2 text-[22px] leading-[1.15] font-light lg:mt-[0.5cqi] lg:text-[2.25cqi]">
            It is a movement you
            <br />
            begin to recognize.
          </p>
          <div className="mt-8 flex max-w-[360px] flex-col gap-3 lg:mt-[3.1cqi] lg:w-[22.5cqi] lg:max-w-none lg:gap-[0.75cqi]">
            <a
              href={LINKS.exploreTheMapSection}
              {...ext(LINKS.exploreTheMapSection)}
              className="btn-light lg:min-h-[3.4cqi] lg:text-[0.95cqi]"
            >
              Explore the map <span aria-hidden="true">→</span>
            </a>
            <a
              href={LINKS.communityField}
              {...ext(LINKS.communityField)}
              className="btn-fire lg:min-h-[3.4cqi] lg:text-[0.95cqi]"
            >
              The community field <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* The golden Map disc (stage labels are part of the artwork), cut out of its white
            background so its glow sits directly on the section. Desktop: right of the copy and
            fully above the cards. */}
        <div className="relative mx-auto mt-10 aspect-square w-full max-w-[560px] lg:absolute lg:top-[2.6cqi] lg:left-[48%] lg:mt-0 lg:w-[40cqi] lg:max-w-none">
          <img
            src={mapGold1006}
            srcSet={MAP_GOLD_SRCSET}
            sizes={MAP_GOLD_SIZES}
            alt="The Map: a golden circle of sand seen from above around a person meditating, with arrows moving clockwise through 01 Reactivity (automatic), 02 Awareness (visible), 03 Integration (met), 04 Sovereignty (choosable) and 05 Creative Agency (available)."
            width={1006}
            height={1006}
            loading="lazy"
            decoding="async"
            className="h-full w-full"
          />
        </div>

        <ol className="mx-auto mt-10 grid max-w-[600px] grid-cols-2 gap-3 lg:absolute lg:inset-x-[3.9%] lg:top-[68.4%] lg:mt-0 lg:max-w-none lg:grid-cols-5 lg:gap-[1.05cqi]">
          {STAGES.map((s, i) => (
            <li
              key={s.n}
              className={`glass-card px-3 py-5 text-center sm:px-4 lg:px-[0.8cqi] lg:pt-[1.1cqi] lg:pb-[1.2cqi] ${i === 4 ? "col-span-2 lg:col-span-1" : ""}`}
            >
              <span className="block font-serif text-[22px] leading-none font-medium lg:text-[2.05cqi]">
                {s.n}
              </span>
              <span className="mt-2 block font-serif text-[15px] font-semibold tracking-[0.05em] uppercase lg:mt-[0.75cqi] lg:text-[1.25cqi]">
                {s.label}
              </span>
              <span className="block font-serif text-[15px] text-[#fbe9d2] italic lg:text-[1.25cqi]">
                {s.word}
              </span>
              <span
                className="mx-auto my-3 block h-px w-8 bg-white/80 lg:my-[1.1cqi] lg:w-[3cqi]"
                aria-hidden="true"
              />
              <span className="block text-[15px] leading-snug lg:text-[1.16cqi]">
                {MAP_LINES[i]?.[0]}
                <br />
                <b className="font-bold">{MAP_LINES[i]?.[1]}</b>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- 7. What becomes available ---------- */
const CAPACITIES: { icon: IconName; t: ReactNode; label: string; d: string; e: string }[] = [
  {
    icon: "presence",
    label: "Presence / Self-awareness",
    t: (
      <>
        Presence <span className="text-red">/</span> Self-awareness
      </>
    ),
    d: "Stay grounded in yourself when life moves you.",
    e: "See what’s happening within you as it happens.",
  },
  {
    icon: "receiving",
    label: "Receiving",
    t: "Receiving",
    d: "Hold more success, love, support and opportunity.",
    e: "Stop contracting around what you asked for.",
  },
  {
    icon: "authenticity",
    label: "Authenticity",
    t: "Authenticity",
    d: "Express what is true without abandoning yourself.",
    e: "Be fully seen without performing.",
  },
  {
    icon: "relational",
    label: "Relational security",
    t: "Relational security",
    d: "Connect deeply without losing yourself.",
    e: "Create intimacy without self-abandonment.",
  },
  {
    icon: "creative",
    label: "Creative freedom",
    t: "Creative freedom",
    d: "Create without waiting for permission, approval or certainty.",
    e: "Build work that brings you joy. Create a life that feels like yours.",
  },
];

function Available() {
  return (
    <section
      aria-labelledby="available-title"
      className="overflow-hidden bg-white px-5 pt-16 pb-12 sm:px-8 lg:px-0 lg:pt-[4vw] lg:pb-[4vw]"
    >
      <h2 id="available-title" className="text-center">
        <span className="block text-[17px] tracking-[0.3em] uppercase lg:text-[clamp(17px,1.95vw,38px)]">
          What becomes
        </span>
        <span className="gold-metal -my-[0.06em] block text-[clamp(52px,15vw,72px)] leading-[1] font-black tracking-[-0.045em] uppercase lg:text-[clamp(72px,7.3vw,142px)]">
          Available?
        </span>
      </h2>
      <p className="text-center text-[15px] tracking-[0.3em] uppercase lg:text-[clamp(15px,1.6vw,31px)]">
        More capacity to
      </p>
      <div className="mx-auto mt-10 max-w-[600px] lg:mt-[3.4vw] lg:grid lg:max-w-none lg:grid-cols-[33%_1fr] lg:items-center">
        {/* Client sun (516 native; 1032 = sharpened Lanczos 2×). White background keyed to
            alpha with an opaque disc, so it sits on the section with no box or halo edge. */}
        <img
          src={sun516}
          srcSet={`${sun516} 516w, ${sun1032} 1032w`}
          sizes="(min-width: 1024px) min(34vw, 640px), min(86vw, 380px)"
          alt=""
          aria-hidden="true"
          width={516}
          height={516}
          loading="lazy"
          decoding="async"
          className="mx-auto block h-auto w-[min(86%,380px)] lg:w-[34vw] lg:max-w-[640px]"
        />
        <ul className="mt-6 space-y-8 lg:mt-0 lg:space-y-[2.7vw]">
          {CAPACITIES.map((c) => (
            <li
              key={c.label}
              className="grid grid-cols-[48px_1fr] items-start gap-4 lg:grid-cols-[clamp(48px,5vw,96px)_1fr] lg:gap-[3vw]"
            >
              <LineIcon name={c.icon} className="mt-0.5 h-auto w-full text-ink lg:mt-[0.2vw]" />
              <div>
                <h3 className="text-[19px] leading-tight font-extrabold tracking-[-0.01em] text-navy uppercase lg:text-[clamp(19px,1.95vw,37px)]">
                  {c.t}
                </h3>
                <p className="mt-1 text-[15px] leading-snug text-navy lg:mt-[0.3vw] lg:text-[clamp(15px,1.45vw,28px)]">
                  {c.d}
                </p>
                <p className="text-[15px] leading-snug font-semibold text-[#e5160c] lg:text-[clamp(15px,1.45vw,28px)]">
                  {c.e}
                </p>
              </div>
            </li>
          ))}
        </ul>
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
      className="scroll-mt-4 bg-white px-6 pt-14 pb-14 sm:px-8 lg:px-0 lg:pt-[3.6vw] lg:pb-[3.6vw]"
    >
      <img
        src={founder390}
        srcSet={`${founder390} 390w, ${founder780} 780w`}
        sizes="(min-width: 1024px) clamp(238px, 22vw, 380px), 200px"
        alt="Portrait of Malek Najm Ghaleb, founder of Alchemist Ways, smiling in front of a stone wall."
        width={390}
        height={390}
        loading="lazy"
        decoding="async"
        className="mx-auto h-[200px] w-[200px] rounded-full object-cover lg:h-[clamp(238px,22vw,380px)] lg:w-[clamp(238px,22vw,380px)]"
      />
      <h2 id="founder-title" className="mt-8 text-center lg:mt-[2.4vw]">
        <span className="inline-block rounded-md bg-[#efe8e2] px-3 py-1 font-mono text-[13px] font-normal tracking-[0.42em] uppercase lg:px-[0.9vw] lg:text-[clamp(13px,1.12vw,21px)]">
          Founder story
        </span>
      </h2>
      <div className="mx-auto mt-8 max-w-[600px] space-y-3 text-[16px] leading-[1.42] text-[#1d2340] lg:mt-[3.6vw] lg:mr-0 lg:ml-[28.6%] lg:max-w-[56%] lg:space-y-[1vw] lg:text-[clamp(16px,1.42vw,27px)]">
        <p>
          For years, I thought I was searching for freedom.
          <br />
          Validation. Creativity. Love.
        </p>
        <p>
          But beneath all of those desires was something quieter
          <br className="hidden sm:inline" /> I couldn’t yet see.
        </p>
        <p className="text-[1.22em] font-semibold text-red italic">
          I was searching for inner safety.
        </p>
        <p>
          Much of my life had become organized around looking
          <br className="hidden sm:inline" /> outside myself — for approval, direction, permission,
          and
          <br className="hidden sm:inline" /> confirmation that who I was and what I wanted could be
          trusted.
        </p>
        <p>
          Eventually, I stopped trying to escape my anger
          <br className="hidden sm:inline" /> and began trying to understand it.
        </p>
        <p className="text-[1.22em] font-semibold text-red italic">
          What is this anger trying to communicate?
        </p>
        <p>
          Following that question led me beneath the anger —
          <br className="hidden sm:inline" /> to fear, hurt, protection, old conclusions about
          myself,
          <br className="hidden sm:inline" /> and parts of myself I had left behind.
        </p>
        <p>
          <strong className="block text-[1.22em] font-bold text-ink">
            The Map emerged from that process.
          </strong>
          Alchemist Ways grew from learning to meet those parts differently.
        </p>
        <div className="pt-2 lg:pt-[0.6vw]">
          <p className="font-bold text-red">Malek Najm Ghaleb</p>
          <p className="text-[0.75em] tracking-[0.08em] text-ink-soft">Founder, Alchemist Ways</p>
        </div>
        <div className="pt-3 lg:pt-[1.2vw]">
          <a
            href={LINKS.founderStory}
            {...ext(LINKS.founderStory)}
            className="btn-outline min-h-[52px] gap-3 rounded-md border-[#e2401f] text-[#e2401f] lg:min-h-[clamp(52px,4vw,76px)] lg:px-[1.6vw] lg:text-[clamp(13px,1.08vw,20px)]"
          >
            Read the founder story{" "}
            <span aria-hidden="true" className="text-[1.3em]">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- 9. Begin where you are ---------- */
// Card art: the client's card photos at their full composition (636×546 native from the
// reference sheet, plus a Lanczos 960 for 2× desktop screens), never zoomed in.
// Card images stay in their slots (1: figure at the circular window, 2: book on sand,
// 3: two people in the sand spiral); only the copy and buttons follow the client’s layout.
const PATHS = [
  {
    n: "01",
    id: "understand",
    t: "Understand",
    s: "Explore the book / map.",
    tag: "Self-guided book",
    lead: "The complete Map, in book form.",
    d: "Explore the patterns that move you and the process of relating to them differently.",
    cta: "Explore the book",
    href: LINKS.exploreBook,
    solid: false,
    img: beginUnderstand636,
    srcSet: `${beginUnderstand420} 420w, ${beginUnderstand636} 636w, ${beginUnderstand960} 960w`,
    alt: "An open book on desert sand showing The Map diagram from reactivity to creative agency.",
  },
  {
    n: "02",
    id: "transform",
    t: "Transform",
    s: "Bring it into life.",
    tag: "Personal guidance",
    lead: "One-on-one work with Malek.",
    d: "Bring the Map into lived experience, relationships, decisions, and creative expression.",
    cta: "Work with Malek",
    href: LINKS.workWithMalek,
    solid: false,
    img: beginTransform636,
    srcSet: `${beginTransform420} 420w, ${beginTransform636} 636w, ${beginTransform960} 960w`,
    alt: "Two people sit facing each other on golden sand inside a glowing spiral ring.",
  },
  {
    n: "03",
    id: "practice",
    t: "Practice",
    s: "In community.",
    tag: "Free trial — $44 / month",
    lead: "Monthly subscription.",
    d: "Join our Skool community to practice with others, access guided sessions, live calls, community discussions, and ongoing resources. Begin with 7 days free.",
    cta: "Start 7 days free",
    href: LINKS.startFreeTrial,
    solid: true,
    img: beginDiscover636,
    srcSet: `${beginDiscover420} 420w, ${beginDiscover636} 636w, ${beginDiscover960} 960w`,
    alt: "A person sits in meditation before a circular opening looking out over a golden coastal sunset.",
  },
];

function Begin() {
  return (
    <section
      id="begin"
      aria-labelledby="begin-title"
      className="scroll-mt-4 bg-white px-5 pt-14 pb-6 text-center sm:px-8 lg:px-0 lg:pt-[4.6vw] lg:pb-[1vw]"
    >
      <h2
        id="begin-title"
        className="text-[40px] leading-[1.02] font-extrabold tracking-[-0.045em] text-balance sm:text-[60px] lg:text-[clamp(60px,5.55vw,108px)]"
      >
        <span className="gold-bright">Begin</span> Where You Are.
      </h2>
      <p className="mt-3 text-[13px] leading-relaxed tracking-[0.2em] uppercase sm:text-base lg:mt-[0.5vw] lg:text-[clamp(16px,1.6vw,31px)]">
        Three ways to begin meeting yourself,{" "}
        <em className="em-serif text-[1.25em] font-medium tracking-normal normal-case">
          Differently.
        </em>
      </p>
      {/* Three equal cards. From md the cards share one row grid (subgrid), so the photos,
          labels, titles, copy and buttons line up across all three and the buttons sit on
          one line at the bottom. */}
      <ul className="mx-auto mt-10 grid max-w-[560px] gap-6 md:max-w-[min(91vw,1520px)] md:grid-cols-3 md:grid-rows-[auto_auto_auto_1fr_auto] md:gap-x-[1.6vw] md:gap-y-0 lg:mt-[3vw]">
        {PATHS.map((p) => (
          <li
            key={p.n}
            id={p.id}
            className="flex scroll-mt-6 flex-col overflow-hidden rounded-[12px] border border-[#ecd8bf] bg-[#fcf7ef] text-left md:row-span-5 md:grid md:grid-rows-subgrid md:gap-0"
          >
            <div className="relative aspect-[636/546] w-full overflow-hidden bg-[#2a1d12]">
              <img
                src={p.img}
                srcSet={p.srcSet}
                sizes={BEGIN_CARD_SIZES}
                alt={p.alt}
                width={636}
                height={546}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 block h-full w-full object-cover"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-black/45 via-black/18 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 px-[24px] pb-[16px] text-white md:px-[2.4vw] md:pb-[1.5vw]">
                <span className="block text-[17px] leading-none font-light tracking-[0.04em] text-white/90 md:text-[max(12px,1.15vw)]">
                  {p.n}
                </span>
                <span
                  className="mt-[8px] block h-px w-[22px] bg-white/80 md:mt-[0.7vw] md:w-[2vw]"
                  aria-hidden="true"
                />
                <h3 className="mt-[12px] text-[25px] leading-none font-medium tracking-[0.16em] uppercase md:mt-[1.1vw] md:text-[max(15px,1.78vw)]">
                  {p.t}
                </h3>
                <p className="mt-[8px] font-serif text-[15px] leading-none font-medium tracking-[0.12em] uppercase italic md:mt-[0.75vw] md:text-[max(11px,1.12vw)]">
                  {p.s}
                </p>
              </div>
            </div>
            <p className="px-[24px] pt-[20px] text-[12px] font-semibold tracking-[0.12em] text-[#c4512a] uppercase md:px-[2.4vw] md:pt-[1.7vw] md:text-[max(10px,0.92vw)]">
              {p.tag}
            </p>
            <p className="px-[24px] pt-[8px] text-[20px] leading-[1.22] font-semibold tracking-[-0.01em] text-[#1b1a1f] md:px-[2.4vw] md:pt-[0.6vw] md:text-[max(14px,1.5vw)]">
              {p.lead}
            </p>
            <p className="px-[24px] pt-[10px] text-[16px] leading-[1.38] text-[#3f3b37] md:px-[2.4vw] md:pt-[0.8vw] md:text-[max(12px,1.22vw)]">
              {p.d}
            </p>
            <div className="px-[24px] pt-[22px] pb-[24px] md:px-[2.4vw] md:pt-[1.9vw] md:pb-[2.2vw]">
              <a
                href={p.href}
                {...ext(p.href)}
                className={`flex min-h-[50px] w-full items-center justify-center gap-3 rounded-full border-[1.5px] px-4 text-[14px] font-bold tracking-[0.06em] whitespace-nowrap uppercase transition-colors md:min-h-[max(40px,3.4vw)] md:text-[max(11px,1.08vw)] ${
                  p.solid
                    ? "border-[#a9502c] bg-[#a9502c] text-white hover:border-[#8f4223] hover:bg-[#8f4223]"
                    : "border-[#26221f] bg-transparent text-[#1f1c1a] hover:bg-white"
                }`}
              >
                {p.cta} <span aria-hidden="true">→</span>
              </a>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-12 lg:mt-[3vw]">
        <p className="text-[15px] tracking-[0.1em] uppercase lg:text-[clamp(15px,1.55vw,30px)]">
          What once kept choosing for you
        </p>
        <p className="text-[28px] leading-tight font-extrabold tracking-[-0.01em] text-[#d03a25] uppercase lg:text-[clamp(28px,2.75vw,54px)]">
          No longer has to.
        </p>
        <p className="mt-1 font-serif text-[18px] italic lg:mt-[0.4vw] lg:text-[clamp(18px,1.55vw,30px)]">
          What will you choose for yourself now?
        </p>
      </div>
    </section>
  );
}
