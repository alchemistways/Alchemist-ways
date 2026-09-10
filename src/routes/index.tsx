import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUp, Instagram, Youtube, Music2, Users } from "lucide-react";

import SiteNav, { siteLinks } from "@/components/site/SiteNav";
import MapWheel, { type WheelNode } from "@/components/site/MapWheel";
import { Diamond, Hairline, PlasterSection, RuleDiamond, Star } from "@/components/site/primitives";
import { content } from "@/i18n/content";
import { Rich, useLang } from "@/i18n/language";


import heroRoom from "@/assets/hero-room.jpg";
import bookLeft from "@/assets/book-left.png";
import portrait from "@/assets/founder-portrait.jpg";
import dunes from "@/assets/dunes-hd.jpg";
import skyTerrace from "@/assets/sky-terrace.jpg";
import pedestalExplore from "@/assets/pedestal-explore.png";
import pedestalUnderstand from "@/assets/pedestal-understand.png";
import pedestalPractice from "@/assets/pedestal-practice.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alchemist Ways — Meet Yourself, Differently" },
      {
        name: "description",
        content:
          "The Map: a different way to meet what was once invisible and automatic — from emotional reactivity to Creative Agency. By Malek Najm Ghaleb.",
      },
      { property: "og:title", content: "Alchemist Ways — Meet Yourself, Differently" },
      {
        property: "og:description",
        content:
          "A Map from emotional reactivity to Creative Agency. Explore the tool, the book, and working with Malek.",
      },
    ],
  }),
  component: Index,
});

const SIDES: WheelNode["side"][] = ["top", "right", "right", "left", "left"];

function toWheel(nodes: { n: string; title: string; sub: string }[]): WheelNode[] {
  return nodes.map((node, i) => ({ ...node, side: SIDES[i] ?? "top" }));
}

const beginImages = [pedestalExplore, pedestalUnderstand, pedestalPractice];
const beginHrefs = ["#top", "#top", siteLinks.calls.clarityCall];

function ColumnGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto hidden max-w-7xl grid-cols-1 gap-10 sm:grid sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
      {children}
    </div>
  );
}

/** Phone-only numbered list: number · rule · copy (matches the mobile deck). */
function PhoneList({
  items,
}: {
  items: { n: string; title: string; sub?: string; body: string }[];
}) {
  return (
    <ol className="mx-auto max-w-md sm:hidden">
      {items.map((item) => (
        <li
          key={item.n + item.title}
          className="grid grid-cols-[2.5rem_1px_minmax(0,1fr)] items-stretch gap-x-4 border-t border-ember/25 py-5 first:border-t-0 first:pt-0"
        >
          <span className="self-center font-serif text-2xl text-ember">{item.n}</span>
          <span aria-hidden className="bg-ember/30" />
          <span className="min-w-0">
            <span className="eyebrow text-[0.7rem] text-ink">{item.title}</span>
            {item.sub && (
              <span className="ml-2 font-serif text-base italic text-ember">{item.sub}</span>
            )}
            <span className="mt-1.5 block font-serif text-[1.05rem] leading-6 text-ink/85">
              {item.body}
            </span>
          </span>
        </li>
      ))}
    </ol>
  );
}

type BeginCard = { title: string; kicker: string; lines: string[]; cta: string };

/** Phone-only swipeable panels for "Begin where you are". */
function BeginCarousel({ cards }: { cards: readonly BeginCard[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(cards.length - 1, index));
    track.scrollTo({ left: clamped * track.clientWidth * 0.78, behavior: "smooth" });
  };

  return (
    <div className="relative mt-12 md:hidden">
      <div
        ref={trackRef}
        onScroll={(e) => {
          const el = e.currentTarget;
          setActive(Math.round(el.scrollLeft / (el.clientWidth * 0.78)));
        }}
        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[11%] pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((c, i) => {
          const href = beginHrefs[i] ?? "#top";
          return (
            <div key={c.title} className="w-[78%] shrink-0 snap-center text-center">
              <img
                src={beginImages[i]}
                alt=""
                aria-hidden
                loading="lazy"
                width={816}
                height={816}
                className="mx-auto h-44 w-44 object-contain"
              />
              <h3 className="mt-2 font-serif text-3xl tracking-wide text-ink">{c.title}</h3>
              <p className="eyebrow mt-3 text-[0.72rem] leading-5 text-ember">{c.kicker}</p>
              <Hairline className="mt-4" />
              {c.lines.map((line) => (
                <p key={line} className="mt-4 font-serif text-[1.05rem] leading-7 text-ink/85">
                  {line}
                </p>
              ))}
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="eyebrow mt-6 inline-flex items-center justify-center gap-2 border border-ember px-6 py-3 text-[0.68rem] text-ember"
              >
                {c.cta} <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </a>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        aria-label="Previous"
        onClick={() => scrollTo(active - 1)}
        className="absolute left-0 top-[13rem] grid h-11 w-11 place-items-center rounded-full bg-cream/85 text-ink shadow-sm"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={() => scrollTo(active + 1)}
        className="absolute right-0 top-[13rem] grid h-11 w-11 place-items-center rounded-full bg-cream/85 text-ink shadow-sm"
      >
        <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
      </button>

      <div className="mt-6 flex items-center justify-center gap-2">
        {cards.map((c, i) => (
          <span
            key={c.title}
            className={`h-1.5 w-1.5 rounded-full ${i === active ? "bg-ember" : "bg-ink/25"}`}
          />
        ))}
      </div>
    </div>
  );
}

function Index() {
  const lang = useLang();
  const t = content[lang];

  return (
    <main id="top" className="bg-cream">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-sand pb-16 lg:pb-24"
        style={{
          backgroundImage: `url(${heroRoom})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
      >
        <SiteNav />
        <div className="mx-auto max-w-7xl px-5 pt-8 sm:px-8 lg:pt-10">
          <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-end lg:gap-x-14">
            {/* Heading */}
            <div className="order-1 text-center lg:order-none lg:col-start-2 lg:row-start-1 lg:self-start lg:pt-4">
              <h1 className="font-serif text-4xl tracking-wide text-ink sm:text-5xl lg:text-6xl">
                {t.hero.title}
              </h1>
              <RuleDiamond className="mt-4" />
              <p className="mx-auto mt-4 max-w-md font-serif text-base text-ink sm:text-xl">
                <Rich text={t.hero.tagline} />
              </p>
            </div>

            {/* Map wheel */}
            <div className="order-2 mt-10 lg:order-none lg:col-start-2 lg:row-start-2 lg:mt-8">
              <MapWheel nodes={toWheel(t.mapNodes)} compact />
            </div>

            {/* Book */}
            <div className="order-3 mt-10 flex justify-center lg:order-none lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0 lg:justify-end">
              <img
                src={bookLeft}
                width={1466}
                height={2306}
                alt={t.hero.bookAlt}
                className="w-40 select-none xs:w-48 sm:w-56 md:w-64 lg:w-full lg:max-w-[26rem]"
                style={{ filter: "drop-shadow(0 30px 40px rgba(63, 48, 34, 0.22))" }}
              />
            </div>

            {/* CTAs */}
            <div className="order-4 mt-8 flex items-center justify-center gap-3 lg:order-none lg:col-start-2 lg:row-start-3 lg:pb-6">
              <a
                href="#begin"
                className="eyebrow inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-cream px-4 py-3.5 text-[0.6rem] text-ink shadow-sm transition-colors hover:text-ember sm:flex-none sm:gap-3 sm:px-8 sm:py-4 sm:text-[0.72rem]"
              >
                <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={1.5} /> {t.hero.ctaBook}
              </a>
              <a
                href="#the-map"
                className="eyebrow inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-cream px-4 py-3.5 text-[0.6rem] text-ink shadow-sm transition-colors hover:text-ember sm:flex-none sm:gap-3 sm:px-8 sm:py-4 sm:text-[0.72rem]"
              >
                <ArrowUp className="h-4 w-4 shrink-0" strokeWidth={1.5} /> {t.hero.ctaMap}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Protection strategies ────────────────────────── */}
      <PlasterSection className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <p className="eyebrow mx-auto max-w-2xl text-center text-[0.72rem] leading-6 text-ember sm:text-sm">
          {t.protection.eyebrow}
        </p>
        <Hairline className="mt-6" />
        <h2 className="mx-auto mt-6 max-w-3xl text-center font-serif text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
          <Rich text={t.protection.heading} />
        </h2>
        <Hairline className="mt-6" />

        <div className="relative mt-14 lg:mt-20">
          {/* peek arrows (phone only) */}
          <ArrowLeft
            aria-hidden
            className="pointer-events-none absolute left-2 top-[3.4rem] z-10 h-5 w-5 text-ember sm:hidden"
            strokeWidth={1.5}
          />
          <ArrowRight
            aria-hidden
            className="pointer-events-none absolute right-2 top-[3.4rem] z-10 h-5 w-5 text-ember sm:hidden"
            strokeWidth={1.5}
          />
          <div className="-mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-[18%] pb-6 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-10 sm:snap-none sm:overflow-visible sm:px-0 sm:pb-0 lg:mx-auto lg:max-w-7xl lg:grid-cols-5 lg:gap-0 [&::-webkit-scrollbar]:hidden">
            {t.protection.items.map((p, i) => (
              <div
                key={p.name}
                className={`w-[64%] shrink-0 snap-center px-2 text-center sm:w-auto sm:shrink lg:px-6 ${i > 0 ? "lg:border-l lg:border-ember/25" : ""}`}
              >
                <div className="mx-auto grid aspect-square w-full max-w-[13rem] place-items-center rounded-full border border-ember/60 sm:h-28 sm:w-28">
                  <div>
                    <p className="eyebrow text-base text-ember sm:text-[0.72rem]">{p.name}</p>
                    <Diamond className="mt-2 h-1.5 w-1.5 rotate-0 rounded-full" />
                  </div>
                </div>
                <Hairline className="mt-7" />
                <p className="mt-6 font-serif text-lg text-ink">{p.line}</p>
                <Hairline className="mt-6" />
                <p className="mt-6 whitespace-pre-line font-serif text-[1.05rem] leading-7 text-ink/85">
                  {p.words}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-16 whitespace-pre-line text-center font-serif text-xl text-ink sm:text-2xl">
          {t.protection.closing}
        </p>
        <Hairline className="mt-6" />
        <p className="eyebrow mx-auto mt-6 max-w-xl text-center text-[0.72rem] leading-6 text-ember sm:text-sm">
          {t.protection.closingEyebrow}
        </p>
      </PlasterSection>

      {/* ── These responses weren't random ───────────────── */}
      <PlasterSection className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-serif text-xl text-ink sm:text-2xl">{t.childhood.lead}</p>
          <p className="mt-6 font-serif text-lg leading-relaxed text-ink/85 sm:text-xl">
            {t.childhood.line2}
          </p>
          <p className="mt-6 font-serif text-lg text-ink/85 sm:text-xl">{t.childhood.line3}</p>
          <h2 className="mt-8 font-serif text-2xl leading-snug text-ink sm:text-4xl">
            <Rich text={t.childhood.question} />
          </h2>

          <Star className="mx-auto mt-12 h-6 w-6 text-ember" />

          <ul className="mt-12 space-y-5 font-serif text-lg leading-relaxed text-ink sm:text-xl">
            {t.childhood.maybes.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>

          <Hairline className="mt-14" />
          <p className="eyebrow mx-auto mt-8 max-w-2xl text-[0.72rem] leading-6 text-ember sm:text-sm">
            {t.childhood.closing}
          </p>
        </div>
      </PlasterSection>

      {/* ── It just feels like you ───────────────────────── */}
      <PlasterSection className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <ul className="space-y-8 font-serif text-lg leading-relaxed text-ink sm:text-xl">
            {t.automatic.pairs.map(([a, b]) => (
              <li key={a}>
                <span className="block text-ink">{a}</span>
                <span className="block text-ink/75">{b}</span>
              </li>
            ))}
          </ul>

          <Star className="mx-auto mt-14 h-6 w-6 text-ember" />

          <p className="mt-12 whitespace-pre-line font-serif text-lg leading-relaxed text-ink sm:text-xl">
            {t.automatic.pattern}
          </p>
          <h2 className="mt-8 whitespace-pre-line font-serif text-3xl leading-tight text-ink sm:text-5xl">
            {t.automatic.heading}
          </h2>
          <Hairline className="mt-8" />
          <p className="mt-8 whitespace-pre-line font-serif text-lg italic leading-relaxed text-ink/85 sm:text-xl">
            {t.automatic.closing}
          </p>
        </div>
      </PlasterSection>

      {/* ── The Map (stages) ─────────────────────────────── */}
      <PlasterSection id="the-map" className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <h2 className="text-center font-serif text-4xl tracking-wide text-ink sm:text-5xl lg:text-6xl">
          {t.map.title}
        </h2>
        <RuleDiamond className="mt-4" />
        <p className="mx-auto mt-4 max-w-lg text-center font-serif text-lg text-ink sm:text-xl">
          <Rich text={t.map.tagline} />
        </p>

        <div className="mt-14">
          <MapWheel nodes={toWheel(t.stageNodes)} />
        </div>

        <div className="mx-auto mt-16 h-px max-w-7xl bg-ember/40" />

        <div className="mt-12">
          <PhoneList items={t.map.stages} />
          <ColumnGrid>
            {t.map.stages.map((s, i) => (
              <div
                key={s.n}
                className={`px-2 text-center lg:px-6 ${i > 0 ? "lg:border-l lg:border-ember/25" : ""}`}
              >
                <p className="font-serif text-2xl text-ember">{s.n}</p>
                <p className="eyebrow mt-2 text-[0.72rem] text-ink">{s.title}</p>
                <p className="font-serif text-lg italic text-ember">{s.sub}</p>
                <Hairline className="mt-3" />
                <p className="mt-5 font-serif text-[1.05rem] leading-7 text-ink/85">{s.body}</p>
              </div>
            ))}
          </ColumnGrid>
        </div>

        <div className="mt-14 text-center">
          <a
            href="#begin"
            className="eyebrow inline-flex items-center gap-3 border border-ember px-8 py-4 text-[0.72rem] text-ember transition-colors hover:bg-ember hover:text-cream"
          >
            {t.map.cta} <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </a>
        </div>
      </PlasterSection>

      {/* ── What becomes available ───────────────────────── */}
      <PlasterSection className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <h2 className="text-center font-serif text-3xl tracking-wide text-ink sm:text-4xl lg:text-5xl">
          <Rich text={t.available.heading} />
        </h2>
        <RuleDiamond className="mt-4" />

        <div className="mt-14">
          <MapWheel nodes={toWheel(t.availableNodes)} />
        </div>

        <div className="mx-auto mt-16 h-px max-w-7xl bg-ember/40" />

        <p className="eyebrow mt-10 text-center text-[0.72rem] text-ember sm:text-sm">
          {t.available.capacityEyebrow}
        </p>

        <div className="mt-10">
          <PhoneList
            items={t.available.capacities.map((c, i) => ({
              n: `0${i + 1}`,
              title: c.title,
              body: c.body,
            }))}
          />
          <ColumnGrid>
            {t.available.capacities.map((c, i) => (
              <div
                key={c.title}
                className={`px-2 text-center lg:px-6 ${i > 0 ? "lg:border-l lg:border-ember/25" : ""}`}
              >
                <p className="eyebrow text-[0.8rem] leading-6 text-ember">{c.title}</p>
                <Hairline className="mt-3" />
                <p className="eyebrow mt-4 text-[0.65rem] text-ink/80">{c.meta}</p>
                <p className="mt-5 font-serif text-[1.05rem] leading-7 text-ink/85">{c.body}</p>
              </div>
            ))}
          </ColumnGrid>
        </div>

        <Hairline className="mt-14" />
        <p className="eyebrow mt-8 text-center text-lg text-ember sm:text-2xl">
          {t.available.closing}
        </p>
      </PlasterSection>

      {/* ── Founder story ────────────────────────────────── */}
      <section id="founder" className="grid grid-cols-1 bg-cream lg:grid-cols-2">
        <div className="order-2 px-5 py-16 sm:px-10 lg:order-1 lg:px-16 lg:py-24">
          <p className="eyebrow text-[0.72rem] text-ember">{t.founder.eyebrow}</p>
          <Hairline className="ml-0 mt-4" />
          <h2 className="mt-6 font-serif text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
            {t.founder.heading}
          </h2>
          <div className="mt-8 space-y-6 font-serif text-lg leading-relaxed text-ink/85">
            {t.founder.paragraphs.map((p) => (
              <p
                key={p.text}
                className={
                  p.accent
                    ? "whitespace-pre-line font-serif text-xl italic text-ember sm:text-2xl"
                    : p.strong
                      ? "whitespace-pre-line font-serif text-2xl text-ink"
                      : "whitespace-pre-line"
                }
              >
                {p.text}
              </p>
            ))}
          </div>

          <div className="mt-10 h-px w-12 bg-ember/60" />
          <p className="mt-6 font-serif text-xl text-ember">{t.founder.name}</p>
          <p className="font-serif text-lg italic text-ink/80">{t.founder.role}</p>

          <a
            href="#founder"
            className="eyebrow mt-8 inline-flex items-center gap-3 border border-ember px-7 py-4 text-[0.72rem] text-ember transition-colors hover:bg-ember hover:text-cream"
          >
            {t.founder.cta} <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </a>
        </div>

        <div className="order-3 lg:order-2">
          <img
            src={portrait}
            alt={t.founder.portraitAlt}
            loading="lazy"
            width={1481}
            height={1920}
            className="h-96 w-full object-cover object-[50%_20%] sm:h-[480px] lg:h-full"
          />
        </div>
      </section>

      {/* ── Dunes band ───────────────────────────────────── */}
      <section className="relative">
        <img
          src={dunes}
          alt={t.dunes.alt}
          loading="lazy"
          width={1920}
          height={832}
          className="h-[60vw] max-h-[560px] min-h-[280px] w-full object-cover object-[50%_60%]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-start px-5 pt-10 text-center sm:pt-14 lg:pt-16">
          <p className="eyebrow text-[0.6rem] text-ember sm:text-xs">{t.dunes.eyebrow}</p>
          <h2 className="mt-5 font-serif text-2xl leading-tight tracking-wide text-ink sm:text-4xl lg:text-6xl">
            {t.dunes.line1}
          </h2>
          <h2 className="mt-2 font-serif text-2xl italic leading-tight tracking-wide text-ember sm:text-4xl lg:text-6xl">
            {t.dunes.line2}
          </h2>
        </div>
      </section>

      {/* ── Creative agency ──────────────────────────────── */}
      <PlasterSection className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="eyebrow text-sm text-ember sm:text-base">{t.creative.heading}</h2>
          <RuleDiamond className="mt-5" />
          <p className="mt-8 font-serif text-xl leading-relaxed text-ink sm:text-3xl">
            <Rich text={t.creative.lead} />
          </p>
          <Hairline className="mt-10" />
          <p className="mt-10 whitespace-pre-line font-serif text-lg leading-relaxed text-ink/85 sm:text-xl">
            {t.creative.body}
          </p>
          <p className="mt-10 font-serif text-xl text-ink sm:text-2xl">
            <Rich text={t.creative.closing} />
          </p>
        </div>
      </PlasterSection>

      {/* ── Begin where you are ──────────────────────────── */}


      <section id="begin" className="relative overflow-hidden">
        <img
          src={skyTerrace}
          alt=""
          aria-hidden
          loading="lazy"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-cream/25" />

        <div className="relative px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <h2 className="text-center font-serif text-3xl tracking-wide text-ink sm:text-4xl lg:text-5xl">
            {t.begin.heading}
          </h2>
          <p className="mt-4 text-center font-serif text-lg text-ink sm:text-xl">
            <Rich text={t.begin.tagline} />
          </p>

          <BeginCarousel cards={t.begin.cards} />

          <div className="mx-auto mt-14 hidden max-w-6xl grid-cols-1 gap-10 md:grid md:grid-cols-3 md:gap-0">
            {t.begin.cards.map((c, i) => {
              const href = beginHrefs[i] ?? "#top";
              return (
                <div
                  key={c.title}
                  className={`flex h-full flex-col items-center px-2 text-center md:px-6 ${
                    i > 0 ? "md:border-l md:border-ember/30" : ""
                  }`}
                >
                  <img
                    src={beginImages[i]}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    width={816}
                    height={816}
                    className="h-40 w-40 object-contain sm:h-48 sm:w-48"
                  />
                  <div className="mt-6 flex h-full w-full flex-col bg-cream/70 px-4 py-8 backdrop-blur-sm">
                    <h3 className="eyebrow text-base text-ink sm:text-lg">{c.title}</h3>
                    <p className="eyebrow mt-3 text-[0.72rem] leading-5 text-ember">{c.kicker}</p>
                    <Hairline className="mt-4" />
                    {c.lines.map((line) => (
                      <p key={line} className="mt-5 font-serif text-[1.05rem] leading-7 text-ink/85">
                        {line}
                      </p>
                    ))}
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="eyebrow mt-auto flex w-full items-center justify-center gap-2 border border-ember px-6 py-3 text-center text-[0.68rem] text-ember transition-colors hover:bg-ember hover:text-cream"
                    >
                      {c.cta} <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <Diamond className="mx-auto mt-14 block h-2.5 w-2.5" />
          <p className="mx-auto mt-8 max-w-2xl text-center font-serif text-lg italic leading-relaxed text-ink sm:text-2xl">
            <Rich text={t.begin.closing} />
          </p>
          <RuleDiamond className="mt-10" />
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="bg-cream px-5 py-14 text-center sm:px-8">
        <p className="eyebrow text-base text-ember sm:text-lg">Alchemist Ways</p>

        <nav className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {[
            { label: t.nav.map, href: "#the-map" },
            { label: t.nav.book, href: "#begin" },
            { label: t.nav.podcast, href: "#begin" },
            { label: t.nav.about, href: "#founder" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="eyebrow text-[0.7rem] text-ink/75 transition-colors hover:text-ember"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={siteLinks.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ember/40 text-ink/80 transition-colors hover:border-ember hover:text-ember"
          >
            <Instagram className="h-4 w-4" strokeWidth={1.5} />
          </a>
          <a
            href={siteLinks.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ember/40 text-ink/80 transition-colors hover:border-ember hover:text-ember"
          >
            <Youtube className="h-4 w-4" strokeWidth={1.5} />
          </a>
          <a
            href={siteLinks.social.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ember/40 text-ink/80 transition-colors hover:border-ember hover:text-ember"
          >
            <Music2 className="h-4 w-4" strokeWidth={1.5} />
          </a>
          <a
            href={siteLinks.social.skool}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Skool"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ember/40 text-ink/80 transition-colors hover:border-ember hover:text-ember"
          >
            <Users className="h-4 w-4" strokeWidth={1.5} />
          </a>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <a
            href={siteLinks.calls.clarityCall}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow text-[0.7rem] text-ink/75 transition-colors hover:text-ember"
          >
            {t.footer.call}
          </a>
          <a
            href={siteLinks.calls.claritySession}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow text-[0.7rem] text-ink/75 transition-colors hover:text-ember"
          >
            {t.footer.session}
          </a>
        </div>

        <p className="mt-8 font-serif text-sm text-ink/60">
          © {new Date().getFullYear()} {t.footer.rights}
        </p>
      </footer>
    </main>
  );
}
