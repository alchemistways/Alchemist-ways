import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { VideoBlock } from "../components/VideoBlock";
import { EclipseArt, LineIcon, SunArt, WaveCircleArt, type IconName } from "../components/Art";
import { LINKS, isExternal } from "../content/links";
import { STAGES } from "../content/stages";

import heroMap900 from "../assets/hero-map-900.webp";
import heroMap1280 from "../assets/hero-map-1280.webp";
import heroMap1677 from "../assets/hero-map-1677.webp";
import heroBookPhone510 from "../assets/hero-book-phone-510.webp";
import heroBookPhone1020 from "../assets/hero-book-phone-1020.webp";
import heroDrawingPhone540 from "../assets/hero-drawing-phone-540.webp";
import heroDrawingPhone1080 from "../assets/hero-drawing-phone-1080.webp";
import heroBackdrop from "../assets/hero-backdrop-480.webp";
import mapRing720 from "../assets/map-ring-720.webp";
import mapRing1080 from "../assets/map-ring-1080.webp";
import mapRing1440 from "../assets/map-ring-1440.webp";
import mapBackdrop from "../assets/map-backdrop-480.webp";
import founder390 from "../assets/founder-390.webp";
import founder780 from "../assets/founder-780.webp";
import beginDiscover600 from "../assets/begin-discover-600.webp";
import beginDiscover900 from "../assets/begin-discover-900.webp";
import beginDiscover1200 from "../assets/begin-discover-1200.webp";
import beginUnderstand600 from "../assets/begin-understand-600.webp";
import beginUnderstand900 from "../assets/begin-understand-900.webp";
import beginUnderstand1200 from "../assets/begin-understand-1200.webp";
import beginTransform600 from "../assets/begin-transform-600.webp";
import beginTransform900 from "../assets/begin-transform-900.webp";
import beginTransform1200 from "../assets/begin-transform-1200.webp";

/* Responsive image sets: the browser picks the smallest file that is sharp at the
   displayed size × device pixel ratio. `sizes` mirrors each image's CSS width. */
// Hero art = the book + hand-drawn Map on the peach wall (1677×938 source, no upscales).
// Desktop: the whole picture on a stage at full hero height (≥ 1073px wide, ≤ 100vw / 178.8vh).
// Tablet (768–1023): a book + drawing crop drawn at 147% of the width, top/bottom faded into the
// section colour. Phones: art-directed to a crop of the book with a separate crop of the drawing
// under it; both carry feathered alpha edges so they dissolve into the section colour (no boxes).
const HERO_SRCSET = `${heroMap900} 900w, ${heroMap1280} 1280w, ${heroMap1677} 1677w`;
const HERO_SIZES = "(max-width: 1023px) 147vw, max(1073px, min(100vw, 178.8vh))";
const HERO_MEDIA = "(min-width: 768px)";
// Phones/tablets sit on #f4d3b5, the wall tone of the artwork around the book.
const HERO_BOOK_SRCSET = `${heroBookPhone510} 510w, ${heroBookPhone1020} 1020w`;
const HERO_BOOK_SIZES = "min(100vw, 460px)";
// Drawing crop: 540 = native pixels (wall lighting evened to the section colour, alpha-feathered
// outside the lettering); 1080 = a light Lanczos 2× (crisper hand-lettering on 2-3× phones).
const HERO_DRAWING_SRCSET = `${heroDrawingPhone540} 540w, ${heroDrawingPhone1080} 1080w`;
const HERO_DRAWING_SIZES = "min(100vw, 470px)";
/** 1×1 transparent GIF: lets a <picture> skip its download where it is not shown. */
const NO_IMAGE = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
const HERO_ALT =
  "The book Meet Yourself, Differently. by Malek Najm Ghaleb, subtitled Turn emotional reactivity into creative agency, standing on a sunlit surface beside a hand-drawn circular map of five movements: " +
  STAGES.map((s) => `${s.n} ${s.label}, ${s.word}`).join("; ") +
  ".";

const MAP_RING_SRCSET = `${mapRing720} 720w, ${mapRing1080} 1080w, ${mapRing1440} 1440w`;
// Desktop: 46.9% of the band; below lg: the full column (≤ 560px).
const MAP_RING_SIZES = "(min-width: 1024px) 46.9vw, min(100vw - 40px, 560px)";
// Card art = one third of the min(91vw, 1520px) grid minus two 1.6vw gaps, drawn at 102% to
// hide the rounded-corner bleed; phones show one card at 100vw − 40px.
const BEGIN_CARD_SIZES =
  "(min-width: 768px) calc((min(91vw, 1520px) - 3.2vw) * 0.34), calc((100vw - 40px) * 1.02)";

const ext = (href: string) =>
  isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};

export const Route = createFileRoute("/")({
  // Start the hero art download with the HTML, matching the <picture> sources exactly.
  head: () => ({
    links: [
      {
        rel: "preload",
        as: "image",
        imageSrcSet: HERO_SRCSET,
        imageSizes: HERO_SIZES,
        media: HERO_MEDIA,
        fetchPriority: "high",
      },
      {
        rel: "preload",
        as: "image",
        imageSrcSet: HERO_BOOK_SRCSET,
        imageSizes: HERO_BOOK_SIZES,
        media: "(max-width: 767px)",
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
function HeroButtons() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 lg:flex-nowrap lg:gap-[1.1cqi]">
      <a
        href={LINKS.getTheBook}
        {...ext(LINKS.getTheBook)}
        className="btn-pill min-w-[150px] lg:min-h-[max(40px,2.7cqi)] lg:min-w-[14.3cqi] lg:px-[1.6cqi] lg:text-[max(11px,0.82cqi)]"
      >
        Get the book
      </a>
      <a
        href={LINKS.exploreTheMap}
        {...ext(LINKS.exploreTheMap)}
        className="btn-solid min-w-[150px] lg:min-h-[max(40px,2.7cqi)] lg:min-w-[14.6cqi] lg:px-[1.6cqi] lg:text-[max(11px,0.82cqi)]"
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
      className="relative overflow-hidden bg-[#f4d3b5] lg:bg-[linear-gradient(#f2d6bb,#efd3b6_70%,#f6e0c9)] lg:h-[max(600px,min(55.9vw,100svh))]"
    >
      {/* Desktop only: soft wall-and-floor backdrop (the art without book or drawing, blurred,
          inlined) so short or very wide viewports continue the scene beyond the stage. */}
      <img
        src={heroBackdrop}
        alt=""
        aria-hidden="true"
        width={480}
        height={268}
        className="absolute inset-0 hidden h-full w-full object-cover object-[center_78.6%] lg:block"
      />
      {/* Stage = the whole artwork at full hero height (never cropped); the headline and
          buttons are positioned on it so they keep their place around the book and drawing. */}
      <div className="relative flex flex-col items-center pt-[92px] pb-12 [container-type:inline-size] sm:pt-[104px] lg:absolute lg:inset-y-0 lg:left-1/2 lg:block lg:aspect-[1677/938] lg:h-full lg:-translate-x-1/2 lg:p-0">
        {/* Phones: the book crop's own alpha fades its wall/floor into the section colour; its
            transparent top tucks under the headline. Tablet: top/bottom mask on the crop.
            Desktop keeps the full uncropped stage (the opaque mask only preserves its rendering). */}
        <div className="relative order-2 mt-[calc(min(100vw,460px)*-0.14)] aspect-[510/790] w-full max-w-[460px] md:mt-6 md:aspect-[1140/690] md:max-w-none md:overflow-hidden md:[mask-image:linear-gradient(transparent,#000_14%,#000_84%,transparent)] lg:absolute lg:inset-0 lg:mt-0 lg:aspect-auto lg:overflow-visible lg:[mask-image:linear-gradient(#000,#000)]">
          <picture>
            <source media={HERO_MEDIA} srcSet={HERO_SRCSET} sizes={HERO_SIZES} />
            <img
              src={heroBookPhone1020}
              srcSet={HERO_BOOK_SRCSET}
              sizes={HERO_BOOK_SIZES}
              alt={HERO_ALT}
              width={510}
              height={790}
              fetchPriority="high"
              decoding="async"
              className="block h-full w-full object-cover md:absolute md:top-[-30.4%] md:left-[-26.3%] md:h-auto md:w-[147.1%] md:max-w-none lg:inset-0 lg:h-full lg:w-full"
            />
          </picture>
        </div>
        <h1
          id="hero-title"
          className="relative z-10 order-1 px-5 text-center font-serif text-[34px] leading-[1.06] font-semibold tracking-[-0.02em] text-[#252421] sm:text-[46px] lg:absolute lg:inset-x-0 lg:top-[11.2%] lg:px-0 lg:text-[3.7cqi] lg:leading-[1.03]"
        >
          What moves you
          <br />
          <em className="font-semibold text-red">
            doesn’t have to <br className="sm:hidden" />
            choose for you.
          </em>
        </h1>
        {/* Phones: the drawing again at its native resolution so the labels stay legible
            (described by the hero image alt; tablets and desktop show it inside that image).
            Its feathered top overlaps the fading floor reflection of the book above. */}
        <picture className="relative order-3 mt-[calc(min(100vw,470px)*-0.2)] block w-[min(100%,470px)] md:hidden">
          <source media={HERO_MEDIA} srcSet={NO_IMAGE} />
          <img
            src={heroDrawingPhone540}
            srcSet={HERO_DRAWING_SRCSET}
            sizes={HERO_DRAWING_SIZES}
            alt=""
            width={540}
            height={540}
            decoding="async"
            className="block h-auto w-full"
          />
        </picture>
        <div className="relative z-10 order-4 mt-6 px-5 md:mt-4 lg:absolute lg:top-[84%] lg:left-[68.6%] lg:mt-0 lg:w-max lg:-translate-x-1/2 lg:-translate-y-1/2 lg:px-0">
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

        <div className="relative mx-auto mt-10 aspect-square w-full max-w-[560px] lg:absolute lg:top-[-0.4%] lg:left-[40.5%] lg:mt-0 lg:w-[46.9%] lg:max-w-none">
          <img
            src={mapRing1440}
            srcSet={MAP_RING_SRCSET}
            sizes={MAP_RING_SIZES}
            alt="The Map as a circle drawn in the sand around a person meditating, seen from above: 01 Reactivity (automatic), 02 Awareness (visible), 03 Integration (met), 04 Sovereignty (choosable), 05 Creative Agency (available)."
            width={1440}
            height={1440}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover [mask-image:radial-gradient(closest-side,#000_84%,rgb(0_0_0/0.6)_93%,transparent_100%)]"
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
        <SunArt className="mx-auto h-auto w-[min(86%,380px)] lg:w-[34vw] lg:max-w-[640px]" />
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
      <ul className="mx-auto mt-10 grid max-w-[560px] gap-6 md:max-w-[min(91vw,1520px)] md:grid-cols-3 md:gap-[1.6vw] lg:mt-[3vw]">
        {PATHS.map((p) => (
          <li
            key={p.n}
            id={p.t.toLowerCase()}
            className="flex scroll-mt-6 flex-col overflow-hidden rounded-[14px] border border-[#f3cfae] bg-[linear-gradient(180deg,#fdf7f1,#faefe3)] text-left"
          >
            <div className="relative aspect-[300/312] w-full overflow-hidden bg-[#1a120c]">
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
                className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-black/60 via-black/25 to-transparent"
                aria-hidden="true"
              />
              <span className="absolute top-3 left-4 text-[22px] font-light text-white/90 lg:top-[1vw] lg:left-[1.2vw] lg:text-[clamp(18px,1.75vw,33px)]">
                {p.n}
              </span>
              <div className="absolute inset-x-0 bottom-0 px-4 pb-4 text-center text-white lg:pb-[1.6vw]">
                <h3 className="text-[22px] font-normal tracking-[0.2em] uppercase lg:text-[clamp(18px,1.8vw,34px)]">
                  {p.t}
                </h3>
                <p className="mt-1 font-serif text-[12px] tracking-[0.14em] uppercase italic lg:text-[clamp(11px,1.08vw,20px)]">
                  {p.s}
                </p>
              </div>
            </div>
            <div className="flex flex-1 flex-col px-6 pt-5 pb-6 lg:px-[1.5vw] lg:pt-[1.2vw] lg:pb-[2vw]">
              <p className="text-[19px] leading-snug lg:text-[clamp(17px,1.72vw,33px)]">{p.lead}</p>
              <p className="mt-3 text-[15px] leading-snug text-[#7d736b] lg:mt-[1.1vw] lg:text-[clamp(13px,1.2vw,23px)]">
                {p.d}
              </p>
              <div className="mt-auto pt-6 text-center lg:pt-[3.6vw]">
                <a
                  href={p.href}
                  {...ext(p.href)}
                  className="inline-flex min-h-[48px] w-[86%] items-center justify-center gap-3 rounded-full border-[1.5px] border-ink/80 bg-white/40 text-[13px] font-semibold tracking-[0.02em] whitespace-nowrap text-ink uppercase transition-colors hover:bg-white lg:min-h-[clamp(44px,3.9vw,74px)] lg:text-[clamp(11px,1.08vw,20px)]"
                >
                  {p.cta} <span aria-hidden="true">→</span>
                </a>
              </div>
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
