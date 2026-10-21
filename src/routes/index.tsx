import { createFileRoute } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";

import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { VideoBlock } from "../components/VideoBlock";
import { DIAGRAM, HeroDiagram } from "../components/HeroDiagram";
import { EclipseArt, LineIcon, WaveCircleArt, type IconName } from "../components/Art";
import { EXTERNAL, LINKS, SOCIAL, isExternal } from "../content/links";
import { STAGES } from "../content/stages";
import {
  STORY_CLOSING,
  STORY_INTRO,
  STORY_PARAGRAPHS,
  STORY_SUBTITLE,
  STORY_TITLE,
} from "../content/founderStory";

import logoAsset from "../assets/logo.webp";
import heroScene900 from "../assets/hero-scene-900.webp";
import heroScene1280 from "../assets/hero-scene-1280.webp";
import heroScene1711 from "../assets/hero-scene-1711.webp";
import heroRoomM560 from "../assets/hero-room-m-560.webp";
import heroRoomM800 from "../assets/hero-room-m-800.webp";
import heroBook432 from "../assets/hero-book-432.webp";
import heroBook864 from "../assets/hero-book-864.webp";
import mapSand1024 from "../assets/map-sand-1024.webp";
import mapSand1366 from "../assets/map-sand-1366.webp";
import mapSandM600 from "../assets/map-sand-m-600.webp";
import mapSandM853 from "../assets/map-sand-m-853.webp";
import sun516 from "../assets/sun-516.webp";
import sun1032 from "../assets/sun-1032.webp";
import founder390 from "../assets/founder-390.webp";
import founder780 from "../assets/founder-780.webp";
import ctaBook480 from "../assets/cta-book-480.webp";
import ctaBook720 from "../assets/cta-book-720.webp";
import ctaBook960 from "../assets/cta-book-960.webp";
import ctaBook1214 from "../assets/cta-book-1214.webp";
import ctaMalek480 from "../assets/cta-malek-480.webp";
import ctaMalek720 from "../assets/cta-malek-720.webp";
import ctaMalek960 from "../assets/cta-malek-960.webp";
import ctaMalek1280 from "../assets/cta-malek-1280.webp";
import ctaCommunity480 from "../assets/cta-community-480.webp";
import ctaCommunity720 from "../assets/cta-community-720.webp";
import ctaCommunity960 from "../assets/cta-community-960.webp";
import ctaCommunity1254 from "../assets/cta-community-1254.webp";

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

// The Map (Meta 7, symmetric): the client’s sand artwork with the ring, its five stage labels
// and the dark card panels baked in; headline, eyebrow, buttons and card text were removed from
// it and are live HTML placed in % of the (aspect-locked) section. Desktop art 1366 px native,
// phone/tablet art 853 px native (the client’s mobile concept).
const MAP_SAND_SRCSET = `${mapSand1024} 1024w, ${mapSand1366} 1366w`;
const MAP_SAND_M_SRCSET = `${mapSandM600} 600w, ${mapSandM853} 853w`;
// Card art = one third of the min(92vw, 1440px) grid minus two 1.4vw gaps; phones one card.
const BEGIN_CARD_SIZES =
  "(min-width: 768px) calc((min(92vw, 1440px) - 2.8vw) / 3), min(100vw - 40px, 560px)";

const ext = (href: string) =>
  isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};

/** JSON-LD structured data: only facts the page itself states (no prices, ratings or dates). */
const SITE = "https://alchemistways.com/";
const abs = (asset: string) => SITE + asset.replace(/^(\.?\/)+/, "");
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}#organization`,
      name: "Alchemist Ways",
      url: SITE,
      logo: abs(logoAsset),
      founder: { "@id": `${SITE}#malek` },
      sameAs: Object.values(SOCIAL),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}#website`,
      name: "Alchemist Ways",
      url: SITE,
      inLanguage: "en",
      publisher: { "@id": `${SITE}#organization` },
    },
    {
      "@type": "Person",
      "@id": `${SITE}#malek`,
      name: "Malek Najm Ghaleb",
      jobTitle: "Founder, Alchemist Ways",
      image: abs(founder780),
      worksFor: { "@id": `${SITE}#organization` },
      url: SITE,
    },
    {
      "@type": "Book",
      "@id": `${SITE}#book`,
      name: "Meet Yourself, Differently.",
      alternativeHeadline: "Turn emotional reactivity into creative agency",
      author: { "@id": `${SITE}#malek` },
      publisher: { "@id": `${SITE}#organization` },
      image: abs(heroBook864),
      url: EXTERNAL.book,
      inLanguage: "en",
      about: "The Map: Reactivity → Awareness → Integration → Sovereignty → Creative Agency.",
    },
  ],
};

export const Route = createFileRoute("/")({
  // Start the hero art download with the HTML, matching the <picture> sources exactly.
  head: () => ({
    meta: [{ property: "og:url", content: SITE }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(STRUCTURED_DATA) }],
    links: [
      { rel: "canonical", href: SITE },
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
        <StayConnected />
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
const HERO_BTN_LG = "lg:min-h-[max(40px,2.7cqi)] lg:px-[1.6cqi] lg:text-[max(11px,0.82cqi)]";

function HeroButtons() {
  return (
    <>
      {/* Phones/tablets (client’s mobile concept): full-width stacked pills with arrows, the
          solid Explore the map first. */}
      <div className="mx-auto flex w-full max-w-[400px] flex-col gap-3 lg:hidden">
        <a
          href={LINKS.getTheBook}
          {...ext(LINKS.getTheBook)}
          className="btn-pill min-h-[52px] w-full text-[14px] tracking-[0.16em]"
        >
          Get the book <span aria-hidden="true">→</span>
        </a>
        <a
          href={LINKS.exploreTheMap}
          {...ext(LINKS.exploreTheMap)}
          className="btn-solid min-h-[52px] w-full text-[14px] tracking-[0.16em]"
        >
          Explore the map <span aria-hidden="true">→</span>
        </a>
      </div>
      {/* Desktop: Get the book (outlined) left, Explore the map (solid) right, same colours as phones. */}
      <div className="hidden items-center justify-center lg:flex lg:flex-nowrap lg:gap-[1.1cqi]">
        <a
          href={LINKS.getTheBook}
          {...ext(LINKS.getTheBook)}
          className={`btn-pill lg:min-w-[14.3cqi] ${HERO_BTN_LG}`}
        >
          Get the book
        </a>
        <a
          href={LINKS.exploreTheMap}
          {...ext(LINKS.exploreTheMap)}
          className={`btn-solid lg:min-w-[14.6cqi] ${HERO_BTN_LG}`}
        >
          Explore the map
        </a>
      </div>
    </>
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
          className="relative z-10 text-center font-serif text-[34px] leading-[1.06] font-medium tracking-[-0.015em] text-[#24211f] max-sm:text-[min(7.4vw,34px)] sm:text-[46px] lg:absolute lg:inset-x-0 lg:top-[12.07%] lg:text-[3.95cqi] lg:leading-[1.02]"
        >
          What moves you
          <br />
          <em className="font-medium text-red">doesn’t have to choose for you.</em>
        </h1>
        <div className="relative mt-6 flex w-full flex-col items-center md:mt-10 md:flex-row md:items-center md:justify-center md:gap-[4vw] lg:static lg:mt-0 lg:block">
          {/* Book. Phones/tablets: in the column; its wrapper carries the wall (everything above
              the horizon, 35.2% up from the image bottom, is wall; below it the section floor).
              Desktop: placed on the stage where it stands in the scene. */}
          <div className="relative w-[min(62vw,280px)] shrink-0 md:w-[260px] lg:absolute lg:top-[29.02%] lg:left-[18.469%] lg:w-[25.248%]">
            {/* Phones/tablets: the same room as the desktop scene (wall with the window light,
                floor), its horizon on the book’s; it fades into the section above and below. */}
            <picture>
              <source
                media="(min-width: 768px)"
                srcSet={`${heroScene1280} 1280w, ${heroScene1711} 1711w`}
                sizes="1711px"
              />
              <img
                src={heroRoomM800}
                srcSet={`${heroRoomM560} 560w, ${heroRoomM800} 800w`}
                sizes="1150px"
                alt=""
                aria-hidden="true"
                width={800}
                height={1020}
                decoding="async"
                className="absolute bottom-[calc(35.2%-374px)] left-1/2 -z-10 h-[1466px] w-[1150px] max-w-none -translate-x-1/2 [mask-image:linear-gradient(#000_calc(100%-190px),transparent)] md:bottom-[calc(35.2%-260px)] md:[mask-image:linear-gradient(transparent,#000_220px,#000_calc(100%-190px),transparent)] md:h-[1020px] md:w-[1711px] lg:hidden"
              />
            </picture>
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
          {/* The Map as vector (the clean ring from THE NEW HERO_14): phones/tablets get the
              compact variant (larger labels), centred above / beside the book with no fade;
              desktop gets the wide variant with its ring centre (the star) at 66.5% / 57.2% of
              the stage, level with the middle of the book cover, buttons centred under it. */}
          <HeroDiagram
            variant="compact"
            className="order-first mx-auto mb-6 block h-auto w-full max-w-[400px] md:order-none md:mx-0 md:mb-0 md:w-[420px] md:max-w-[52vw] lg:hidden"
          />
          <HeroDiagram
            variant="wide"
            className="hidden lg:absolute lg:top-[57.2%] lg:left-[66.5%] lg:block lg:h-auto"
            style={{
              width: `${((DIAGRAM.wide.halfW * 2) / 1024) * 100}%`,
              translate: `-50% -${(-DIAGRAM.wide.top / (DIAGRAM.wide.bottom - DIAGRAM.wide.top)) * 100}%`,
            }}
          />
        </div>
        <div className="relative z-10 mt-6 w-full lg:absolute lg:top-[84%] lg:left-[66.5%] lg:mt-0 lg:w-max lg:-translate-x-1/2 lg:-translate-y-1/2">
          <HeroButtons />
        </div>
        <p
          className="relative z-10 mt-7 text-center text-[11px] font-medium tracking-[0.3em] text-[#2a2522] uppercase lg:hidden"
          aria-hidden="true"
        >
          Scroll
          <span className="mx-auto mt-2 block h-7 w-px bg-[#2a2522]" />
        </p>
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
      className="relative my-8 h-[min(92vw,420px)] [--disk-r:18.4vw] [--disk-x:50%] sm:h-[400px] sm:[--disk-r:88px] lg:my-[1.5vw] lg:h-[31vw] lg:[--disk-r:8.2vw] lg:[--disk-x:50%]"
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
        {/* Desktop: centred on the page axis like the eclipse (the column starts at 33.2%). */}
        <WaveCircleArt className="relative mx-auto mt-8 block h-auto w-[min(72%,300px)] lg:left-[16.8vw] lg:mx-0 lg:mt-[2.4vw] lg:w-[22vw] lg:max-w-[440px] lg:-translate-x-1/2" />
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
          className="inline-flex min-h-[48px] min-w-[230px] items-center justify-center rounded-md bg-[#e5441c] px-7 text-[14px] font-medium tracking-[0.16em] text-white uppercase shadow-[0_4px_14px_rgb(229_68_28/0.3)] transition-colors hover:bg-[#c9360f] lg:min-h-[clamp(48px,3.1vw,60px)] lg:min-w-[clamp(230px,18.5vw,360px)] lg:text-[clamp(14px,1.05vw,20px)]"
        >
          Explore the book
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

const MAP_ALT =
  "The Map: a person meditating in a spiral of desert sand, ringed by five stages moving clockwise: 01 Reactivity (automatic), 02 Awareness (visible), 03 Integration (met), 04 Sovereignty (choosable) and 05 Creative Agency (available).";

function TheMap() {
  return (
    <section
      id="map"
      aria-labelledby="map-title"
      className="relative scroll-mt-4 overflow-hidden bg-[#e9b77a] text-[#24140a] [container-type:inline-size]"
    >
      <picture>
        <source media={DESKTOP} srcSet={MAP_SAND_SRCSET} sizes="100vw" />
        <img
          src={mapSandM853}
          srcSet={MAP_SAND_M_SRCSET}
          sizes="100vw"
          alt={MAP_ALT}
          width={853}
          height={1747}
          loading="lazy"
          decoding="async"
          className="block aspect-[853/1747] h-auto w-full lg:aspect-[1366/1151]"
        />
      </picture>

      {/* Phones/tablets follow the client’s mobile concept (853 × 1747); desktop the symmetric
          Meta 7 layout (1366 × 1151). Every position is a % of the art, so text stays on it. */}
      <div className="absolute inset-0 text-center">
        <p className="absolute inset-x-0 top-[2%] text-[2.4cqi] font-medium tracking-[0.28em] uppercase lg:top-[3.3%] lg:text-[0.95cqi]">
          The Map
        </p>
        <h2
          id="map-title"
          className="absolute inset-x-[8%] top-[5.2%] font-serif text-[8.6cqi] leading-[1.02] font-semibold tracking-[-0.015em] text-balance lg:inset-x-0 lg:top-[8%] lg:text-[3.55cqi]"
        >
          The map is not a path you follow.
        </h2>
        <p className="absolute inset-x-0 top-[14.2%] text-[3.7cqi] font-light text-[#3a2414] lg:top-[13.9%] lg:text-[1.85cqi]">
          It is a movement you begin to recognize.
        </p>

        <div className="absolute inset-x-[17.1%] top-[54.26%] flex flex-col gap-[0.94cqi] lg:inset-x-auto lg:top-[57.9%] lg:left-[74.8%] lg:w-[22.6%] lg:gap-[1.1cqi]">
          <a
            href={LINKS.exploreTheMapSection}
            {...ext(LINKS.exploreTheMapSection)}
            className="order-1 flex h-[8.9cqi] items-center justify-center gap-[0.6em] rounded-full bg-[#c2421f] text-[3.3cqi] font-medium tracking-[0.12em] text-white uppercase shadow-[0_2px_10px_rgb(90_30_5/0.25)] transition-colors hover:bg-[#a83515] lg:order-2 lg:h-[3.65cqi] lg:rounded-[6px] lg:bg-[#fbf3e8] lg:text-[0.9cqi] lg:text-[#24140a] lg:hover:bg-white"
          >
            Explore the map <span aria-hidden="true">→</span>
          </a>
          <a
            href={LINKS.communityField}
            {...ext(LINKS.communityField)}
            className="order-2 flex h-[8.7cqi] items-center justify-center gap-[0.6em] rounded-full border border-[#c2421f] bg-[#fbf1e4] text-[3.1cqi] font-medium tracking-[0.12em] text-[#24140a] uppercase transition-colors hover:bg-white lg:order-1 lg:h-[3.4cqi] lg:rounded-[6px] lg:border-0 lg:bg-[#b83c1c] lg:text-[0.9cqi] lg:text-white lg:shadow-[0_2px_10px_rgb(90_30_5/0.3)] lg:hover:bg-[#9e3013]"
          >
            The community field <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Stage cards. Desktop: white text inside the five dark panels of the artwork.
            Phones/tablets: the client’s list (number · stage · line). */}
        <ol className="absolute inset-x-[12%] top-[65.4%] lg:inset-x-0 lg:top-[78.45%] lg:h-[17.98%]">
          {STAGES.map((st, i) => (
            <li
              key={st.n}
              className="grid h-[10.55cqi] grid-cols-[9.5cqi_0.95fr_1px_1.2fr] items-center gap-x-[3.2cqi] border-b border-[#9b5a2d]/25 text-left last:border-b-0 lg:absolute lg:top-0 lg:flex lg:h-full lg:w-[18.3%] lg:flex-col lg:items-center lg:justify-start lg:gap-0 lg:border-0 lg:pt-[1.45cqi] lg:text-center lg:text-white"
              style={{ "--i": i } as CSSProperties}
              data-stage
            >
              <span className="font-serif text-[5.2cqi] leading-none text-[#b8401f] lg:text-[2.05cqi] lg:text-white">
                {st.n}
              </span>
              <span className="font-serif leading-tight">
                <span className="block text-[2.45cqi] font-semibold tracking-[0.03em] whitespace-nowrap uppercase lg:mt-[0.75cqi] lg:text-[0.98cqi]">
                  {st.label}
                </span>
                <span className="block text-[2.75cqi] text-[#b8401f] italic lg:mt-[0.15cqi] lg:text-[1cqi] lg:text-[#f7e2c4]">
                  {st.word}
                </span>
              </span>
              <span
                className="h-[6cqi] w-px bg-[#c2421f]/70 lg:mt-[0.85cqi] lg:mb-[0.95cqi] lg:h-px lg:w-[2.2cqi] lg:bg-[#e8b85a]"
                aria-hidden="true"
              />
              <span className="text-[2.85cqi] leading-snug whitespace-nowrap text-[#3a2414] lg:text-[0.98cqi] lg:text-white">
                {MAP_LINES[i]?.[0]}
                <br />
                <b className="font-normal lg:font-bold">{MAP_LINES[i]?.[1]}</b>
              </span>
            </li>
          ))}
        </ol>

        <p
          className="absolute inset-x-0 top-[93.7%] text-[2.2cqi] tracking-[0.25em] uppercase lg:hidden"
          aria-hidden="true"
        >
          Scroll
          <span className="mx-auto mt-[2cqi] block h-[6cqi] w-px bg-[#24140a]" />
        </p>
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
    e: "Express yourself unapologetically. Begin creating your life’s work.",
  },
];

function Available() {
  return (
    <section
      aria-labelledby="available-title"
      className="overflow-hidden bg-white px-5 pt-16 pb-12 sm:px-8 lg:px-0 lg:pt-[4vw] lg:pb-[4vw]"
    >
      {/* Meta 7: the sun sits centred above the heading. Client sun (516 native; 1032 = sharpened Lanczos 2×). White background keyed to
            alpha with an opaque disc, so it sits on the section with no box or halo edge. */}
      <img
        src={sun516}
        srcSet={`${sun516} 516w, ${sun1032} 1032w`}
        sizes="(min-width: 1024px) min(24vw, 480px), min(60vw, 300px)"
        alt=""
        aria-hidden="true"
        width={516}
        height={516}
        loading="lazy"
        decoding="async"
        className="mx-auto -mb-2 block h-auto w-[min(66%,300px)] lg:-mb-[0.6vw] lg:w-[24vw] lg:max-w-[480px]"
      />
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
      <div className="mx-auto mt-10 max-w-[600px] lg:mt-[3vw] lg:w-fit lg:max-w-[min(70vw,1200px)]">
        <ul className="space-y-8 lg:space-y-[2.4vw]">
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
/** Inline expand for the extended founder story (the page ships without a JS framework). */
const STORY_SCRIPT = `(()=>{const b=document.querySelector("[data-story-toggle]"),m=document.getElementById("founder-story-more");if(!b||!m)return;const l=b.querySelector("[data-story-label]"),a=b.querySelector("[data-story-arrow]");b.addEventListener("click",()=>{const v=b.getAttribute("aria-expanded")!=="true";b.setAttribute("aria-expanded",String(v));m.setAttribute("aria-hidden",String(!v));m.classList.toggle("is-open",v);l.textContent=v?"SHOW LESS":"READ MY STORY";a.style.transform=v?"rotate(-90deg)":"";if(!v)b.scrollIntoView({block:"nearest"})})})();`;

/** Intro lines that keep the story’s existing emphasis (red italic / bold). */
const STORY_EMPHASIS: Record<string, "red" | "bold"> = {
  "I was searching for inner safety.": "red",
  "What is this anger trying to communicate?": "red",
  "The Map emerged from that process.": "bold",
};

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
        {STORY_INTRO.map((t, i) =>
          STORY_EMPHASIS[t] === "red" ? (
            <p key={i} className="text-[1.22em] font-semibold text-red italic">
              {t}
            </p>
          ) : STORY_EMPHASIS[t] === "bold" ? (
            <p key={i} className="text-[1.22em] font-bold text-ink">
              {t}
            </p>
          ) : (
            <p key={i}>{t}</p>
          ),
        )}
        <div className="pt-2 lg:pt-[0.6vw]">
          <p className="font-bold text-red">Malek Najm Ghaleb</p>
          <p className="text-[0.75em] tracking-[0.08em] text-ink-soft">Founder, Alchemist Ways</p>
        </div>
        <div className="pt-3 lg:pt-[1.2vw]">
          <button
            type="button"
            data-story-toggle
            aria-expanded="false"
            aria-controls="founder-story-more"
            className="btn-outline min-h-[52px] cursor-pointer gap-3 rounded-md border-[#e2401f] bg-transparent text-[#e2401f] lg:min-h-[clamp(52px,4vw,76px)] lg:px-[1.6vw] lg:text-[clamp(13px,1.08vw,20px)]"
          >
            <span data-story-label>READ MY STORY</span>
            <span
              aria-hidden="true"
              data-story-arrow
              className="text-[1.3em] transition-transform duration-300"
            >
              →
            </span>
          </button>
        </div>
        <div id="founder-story-more" data-story-more className="story-more" aria-hidden="true">
          <div className="min-h-0 overflow-hidden">
            <div className="space-y-3 pt-8 lg:space-y-[1vw] lg:pt-[2.8vw]">
              <h3 className="text-[1.22em] font-bold tracking-[0.04em] text-ink">{STORY_TITLE}</h3>
              <p className="text-[1.1em] font-semibold text-red italic">{STORY_SUBTITLE}</p>
              <div className="space-y-3 pt-3 lg:space-y-[1vw] lg:pt-[1vw]">
                {STORY_PARAGRAPHS.map((t, i) => (
                  <p key={i}>{t}</p>
                ))}
              </div>
              <p className="pt-3 text-[1.22em] font-semibold text-red italic lg:pt-[1vw]">
                {STORY_CLOSING}
              </p>
              <div className="pt-2 lg:pt-[0.6vw]">
                <p className="font-bold text-red">Malek Najm Ghaleb</p>
                <p className="text-[0.75em] tracking-[0.08em] text-ink-soft">
                  Founder, Alchemist Ways
                </p>
              </div>
            </div>
          </div>
        </div>
        <script dangerouslySetInnerHTML={{ __html: STORY_SCRIPT }} />
      </div>
    </section>
  );
}

/* ---------- 9. Begin where you are ---------- */
// Card art: the client's card photos at their full composition (636×546 native from the
// reference sheet, plus a Lanczos 960 for 2× desktop screens), never zoomed in.
// Begin cards (Meta 7): client photos cropped to the 1.06 : 1 card frame from the full-res
// sources (book centred; Malek’s face centred; the Map circle centred), up to 1214–1280 px wide
// so they stay sharp on 2× desktops and 3× phones. Nothing is upscaled past its source.
const PATHS = [
  {
    n: "01",
    id: "understand",
    tag: "Self-guided book",
    t: "The complete Map.",
    lead: "What if the patterns protecting you are also the ones limiting your freedom?",
    d: "Discover a map for recognizing what’s been choosing for you — and learning to meet yourself differently.",
    checks: [
      "Recognize the patterns beneath your reactions.",
      "Develop the freedom to respond to life more consciously.",
    ],
    price: null,
    cta: "Explore the book",
    href: LINKS.exploreBook,
    solid: false,
    img: ctaBook720,
    srcSet: `${ctaBook480} 480w, ${ctaBook720} 720w, ${ctaBook960} 960w, ${ctaBook1214} 1214w`,
    alt: "The book Meet Yourself, Differently. by Malek Najm Ghaleb standing in soft window light.",
  },
  {
    n: "02",
    id: "transform",
    tag: "Personal guidance",
    t: "Work with Malek.",
    lead: "You don’t have to navigate everything within yourself alone.",
    d: "Through personalized and creative guidance, explore what’s keeping you stuck, understand the patterns getting in your way, and develop the freedom to create what truly matters to you.",
    checks: [
      "Discover what’s beneath your fears, reactions, and self-doubt.",
      "Cultivate inner sovereignty, authentic expression, and the courage to bring your vision to life.",
    ],
    price: null,
    cta: "Work with Malek",
    href: LINKS.workWithMalek,
    solid: false,
    img: ctaMalek720,
    srcSet: `${ctaMalek480} 480w, ${ctaMalek720} 720w, ${ctaMalek960} 960w, ${ctaMalek1280} 1280w`,
    alt: "Black-and-white portrait of Malek Najm Ghaleb, smiling, in front of a large ink artwork.",
  },
  {
    n: "03",
    id: "practice",
    tag: "Community membership",
    t: "Practice and create together.",
    lead: "Transformation deepens when we bring it into how we live, relate, and create.",
    d: "Join a community of conscious creators bringing the Map to life through shared practice, authentic connection, and creative expression.",
    checks: [
      "Practice awareness, integration, and conscious choice in everyday life.",
      "Build meaningful connections and create alongside others who are learning to meet themselves differently.",
    ],
    price: "$44 / month · 7 days free",
    cta: "Start 7 days free",
    href: LINKS.startFreeTrial,
    solid: true,
    img: ctaCommunity720,
    srcSet: `${ctaCommunity480} 480w, ${ctaCommunity720} 720w, ${ctaCommunity960} 960w, ${ctaCommunity1254} 1254w`,
    alt: "Aerial view of people seated in a circle on sand around The Map drawn with its five stages.",
  },
];

function Check() {
  return (
    <svg viewBox="0 0 20 20" className="mt-[0.12em] size-[1.15em] shrink-0" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="#1d2433" />
      <path
        d="M5.8 10.3l2.7 2.7 5.7-5.9"
        fill="none"
        stroke="#fff"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Begin() {
  return (
    <section
      id="begin"
      aria-labelledby="begin-title"
      className="scroll-mt-4 bg-white px-5 pt-14 pb-14 text-center sm:px-8 lg:px-0 lg:pt-[4.6vw] lg:pb-[7vw]"
    >
      <h2
        id="begin-title"
        className="text-[40px] leading-[1.02] font-extrabold tracking-[-0.045em] text-balance sm:text-[60px] lg:text-[clamp(60px,5.55vw,108px)]"
      >
        <span className="gold-bright">Begin</span> Where You Are.
      </h2>
      <p className="mt-2 font-serif text-[22px] leading-snug text-[#1b1a1f] sm:text-[28px] lg:mt-[0.5vw] lg:text-[clamp(28px,2.3vw,44px)]">
        <em>Three ways</em> to begin meeting yourself,{" "}
        <em className="text-[#c4442a]">Differently.</em>
      </p>
      {/* Three equal cards. From md the cards share one row grid (subgrid), so the photos,
          labels, titles, both paragraphs, checks and buttons line up across all three and the buttons sit
          on one line at the bottom. */}
      <ul className="mx-auto mt-9 grid max-w-[560px] gap-6 md:max-w-[min(92vw,1440px)] md:grid-cols-3 md:grid-rows-[auto_auto_auto_auto_auto_1fr_auto] md:gap-x-[1.4vw] md:gap-y-0 lg:mt-[2.6vw]">
        {PATHS.map((p) => (
          <li
            key={p.n}
            id={p.id}
            className="flex scroll-mt-6 flex-col overflow-hidden rounded-[10px] border border-[#f0e2cf] bg-[#fcf8f2] text-left md:row-span-7 md:grid md:grid-rows-subgrid md:gap-0"
          >
            <img
              src={p.img}
              srcSet={p.srcSet}
              sizes={BEGIN_CARD_SIZES}
              alt={p.alt}
              width={1060}
              height={1000}
              loading="lazy"
              decoding="async"
              className="block aspect-[1060/1000] h-auto w-full object-cover"
            />
            <p className="px-[24px] pt-[22px] text-[12px] font-medium tracking-[0.12em] text-[#c4442a] uppercase md:px-[2vw] md:pt-[1.6vw] md:text-[max(10px,0.95vw)]">
              {p.n} <span aria-hidden="true">·</span> {p.tag}
            </p>
            <h3 className="px-[24px] pt-[12px] font-serif text-[30px] leading-[1.08] font-normal tracking-[-0.01em] text-[#16181f] md:px-[2vw] md:pt-[1vw] md:text-[max(20px,2.55vw)]">
              {p.t}
            </h3>
            <p className="px-[24px] pt-[12px] text-[16.5px] leading-[1.42] font-medium text-[#2a2c33] md:px-[2vw] md:pt-[1vw] md:text-[max(12.5px,1.33vw)]">
              {p.lead}
            </p>
            <p className="px-[24px] pt-[10px] text-[16px] leading-[1.45] text-[#5a5d68] md:px-[2vw] md:pt-[0.8vw] md:text-[max(12px,1.28vw)]">
              {p.d}
            </p>
            <ul className="space-y-[10px] px-[24px] pt-[18px] text-[15px] leading-[1.4] text-[#2a2c33] md:space-y-[0.8vw] md:px-[2vw] md:pt-[1.4vw] md:text-[max(12px,1.14vw)]">
              {p.checks.map((c) => (
                <li key={c} className="flex gap-[0.75em]">
                  <Check />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col justify-end px-[24px] pt-[22px] pb-[24px] md:px-[2vw] md:pt-[1.4vw] md:pb-[2vw]">
              {p.price && (
                <p className="mb-[12px] text-center text-[12px] font-semibold tracking-[0.08em] text-[#1d2433] uppercase md:mb-[0.9vw] md:text-[max(10px,0.85vw)]">
                  {p.price}
                </p>
              )}
              <a
                href={p.href}
                {...ext(p.href)}
                className={`flex min-h-[50px] w-full items-center justify-center gap-3 rounded-full border-[1.5px] px-4 text-[14px] font-medium tracking-[0.08em] whitespace-nowrap uppercase transition-colors md:min-h-[max(40px,3.2vw)] md:text-[max(11px,0.98vw)] ${
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
      {/* Closing statement: client-specified type (Poppins / Playfair Display), desktop sizes
          22 / 66 / 26 px, scaled down together on phones (see .closing-* in styles.css). */}
      <div className="mt-14 lg:mt-[4vw]">
        <p className="closing-eyebrow">What once kept choosing for you</p>
        <p className="closing-statement mt-1">No longer has to.</p>
        <p className="closing-question mt-1 lg:mt-[0.3vw]">
          What will you choose for yourself now?
        </p>
      </div>
    </section>
  );
}

/* ---------- 11. Stay connected (newsletter) ---------- */
// Posts to the client's Kit form "Alchemist Ways — Main Email List" (LINKS.newsletter):
// email → email_address, name → fields[first_name]. The Kit form has no phone field, so the
// phone number is not sent. Kit may answer "quarantined" (its bot check); the visitor then gets
// a link to finish on Kit. Any network error falls back to a link to the Kit form page.
const NEWSLETTER_SCRIPT = `(()=>{const f=document.querySelector("[data-newsletter]");if(!f)return;const s=f.querySelector("[data-newsletter-status]"),btn=f.querySelector("button[type=submit]"),say=(t,href)=>{s.hidden=false;s.textContent=t;if(href){const a=document.createElement("a");a.href=href;a.target="_blank";a.rel="noopener noreferrer";a.className="underline";a.textContent=" Continue on Kit →";s.append(a)}};f.addEventListener("submit",async e=>{e.preventDefault();if(!f.reportValidity())return;const d=new FormData(f),b=new URLSearchParams();b.set("email_address",String(d.get("email")||"").trim());const n=String(d.get("name")||"").trim();if(n)b.set("fields[first_name]",n);btn.disabled=true;try{const r=await fetch(f.action,{method:"POST",headers:{Accept:"application/json"},body:b}),j=await r.json().catch(()=>({}));if(j.status==="success"){f.querySelectorAll("input").forEach(i=>i.value="");say("Success! Now check your email to confirm your subscription.")}else if(j.status==="quarantined"&&j.url){say("Almost there. Please confirm you are human to finish subscribing.",j.url)}else{say("Something went wrong. Please try again, or sign up here:",f.dataset.fallback)}}catch(_){say("Something went wrong. Please try again, or sign up here:",f.dataset.fallback)}finally{btn.disabled=false}})})();`;

function StayConnected() {
  return (
    <section
      id="stay-connected"
      aria-labelledby="stay-title"
      className="stay-bg relative overflow-hidden px-6 py-16 sm:px-8 lg:px-[7vw] lg:py-[6.4vw]"
    >
      <div className="relative z-10">
        <p className="font-serif text-[13px] tracking-[0.24em] text-ink uppercase lg:text-[clamp(13px,0.95vw,18px)]">
          Stay connected
        </p>
        <h2
          id="stay-title"
          className="mt-5 font-serif text-[36px] leading-[1.12] font-normal tracking-[-0.01em] text-ink lg:mt-[1.6vw] lg:text-[clamp(40px,3.4vw,66px)]"
        >
          A little more awareness.
          <br />A little more freedom.
        </h2>
        <p className="mt-5 max-w-[640px] text-[16px] leading-[1.55] text-[#5d5650] lg:mt-[1.3vw] lg:max-w-[46vw] lg:text-[clamp(16px,1.3vw,25px)]">
          Receive reflections, insights and invitations from Alchemist Ways —
          <br className="hidden lg:inline" /> to help you meet yourself more consciously and choose
          differently.
        </p>
        <form
          data-newsletter
          action={LINKS.newsletterAction}
          method="post"
          data-fallback={LINKS.newsletter}
          className="mt-8 grid gap-3 text-[15px] lg:mt-[2.6vw] lg:grid-cols-[1fr_1fr_1fr_1fr] lg:gap-[1.1vw] lg:text-[clamp(15px,1.05vw,20px)]"
        >
          <label className="relative block">
            <span className="sr-only">Your name</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pointer-events-none absolute top-1/2 left-4 h-[1.15em] w-[1.15em] -translate-y-1/2 text-ink-soft lg:left-[1.1vw]"
            >
              <>
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
              </>
            </svg>
            <input
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your name"

              className="nl-input"
            />
          </label>
          <label className="relative block">
            <span className="sr-only">Phone number (optional)</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pointer-events-none absolute top-1/2 left-4 h-[1.15em] w-[1.15em] -translate-y-1/2 text-ink-soft lg:left-[1.1vw]"
            >
              <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2Z" />
            </svg>
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="Phone number (optional)"

              className="nl-input"
            />
          </label>
          <label className="relative block">
            <span className="sr-only">Email address</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pointer-events-none absolute top-1/2 left-4 h-[1.15em] w-[1.15em] -translate-y-1/2 text-ink-soft lg:left-[1.1vw]"
            >
              <>
                <rect x="3" y="5" width="18" height="14" rx="1.5" />
                <path d="m3.5 6 8.5 7 8.5-7" />
              </>
            </svg>
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email address"
              required
              className="nl-input"
            />
          </label>
          <button type="submit" className="btn-stay">
            Stay connected <span aria-hidden="true">→</span>
          </button>
          <p
            data-newsletter-status
            role="status"
            hidden
            className="text-[14px] text-rust lg:col-span-4"
          />
        </form>
        <p className="mt-5 text-[13px] text-[#5d5650] lg:mt-[1.6vw] lg:text-[clamp(13px,0.95vw,18px)]">
          Thoughtful reflections. No noise. Unsubscribe anytime.
        </p>
        <p className="mt-1.5 text-[12px] text-[#7a736c] lg:mt-[0.4vw] lg:text-[clamp(12px,0.85vw,16px)]">
          By subscribing you agree to our{" "}
          {/* Not linked for now (Saad will edit the policy page first). */}
          <span className="underline decoration-1 underline-offset-2">Privacy Policy</span>.
        </p>
      </div>
      <script dangerouslySetInnerHTML={{ __html: NEWSLETTER_SCRIPT }} />
    </section>
  );
}
