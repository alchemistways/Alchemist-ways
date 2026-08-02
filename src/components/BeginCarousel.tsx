import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SELF_DISCOVERY_URL = "https://www.youtube.com/@alchemistwaysofficial";
const CLARITY_FREE_URL = "https://calendly.com/alchemistways/conversation";
const CLARITY_PAID_URL = "https://calendly.com/alchemistways/clarity-session";
const COMMUNITY_URL = "https://www.skool.com/alchemist-ways-1974/about";

const SLIDES = [
  {
    id: "self-discovery",
    marker: "01",
    label: "Self-Discovery Program",
    body: "Watch the philosophy come alive through reflections, teachings, and real conversations — a guided path into meeting yourself differently.",
    cta: {
      href: SELF_DISCOVERY_URL,
      text: "Explore the Program",
      variant: "sand" as const,
    },
  },
  {
    id: "clarity-call",
    marker: "02",
    label: "A Clarity Call",
    body: "An honest conversation about where you are, what patterns keep repeating, and whether this work feels like the right next step.",
    ctas: [
      {
        href: CLARITY_FREE_URL,
        text: "Clarity Conversation · Free 30 min",
        variant: "primary" as const,
      },
      {
        href: CLARITY_PAID_URL,
        text: "Clarity Session · Paid 90 min",
        variant: "sand" as const,
      },
    ],
  },
  {
    id: "community",
    marker: "03",
    label: "The Community",
    body: "Walk alongside others learning to meet their inner lives with greater awareness, honesty, and choice.",
    cta: {
      href: COMMUNITY_URL,
      text: "Explore the Community",
      variant: "sand" as const,
    },
  },
] as const;

/** Legacy hash aliases still resolve to the renamed first panel. */
const HASH_TO_INDEX: Record<string, number> = {
  "self-discovery": 0,
  conversations: 0,
  "clarity-call": 1,
  community: 2,
};

/**
 * Ways to Begin — Self-Discovery Program / Clarity Call / Community.
 * Soft panels, equal CTA rails; Embla on mobile keeps the same language.
 */
export function BeginCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    skipSnaps: false,
  });
  const [selected, setSelected] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const sync = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    sync();
    emblaApi.on("select", sync);
    emblaApi.on("reInit", sync);
    return () => {
      emblaApi.off("select", sync);
      emblaApi.off("reInit", sync);
    };
  }, [emblaApi, sync]);

  useEffect(() => {
    function goToHash() {
      const raw = window.location.hash.replace(/^#/, "");
      const index = HASH_TO_INDEX[raw];
      if (typeof index !== "number") return;
      if (emblaApi) {
        emblaApi.scrollTo(index);
      } else {
        setSelected(index);
      }
      const el = document.getElementById(raw) ?? document.getElementById(SLIDES[index].id);
      el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    goToHash();
    window.addEventListener("hashchange", goToHash);
    return () => window.removeEventListener("hashchange", goToHash);
  }, [emblaApi]);

  return (
    <div className="relative">
      {/* Desktop ≥1024: equal panels in a row */}
      <div className="hidden items-stretch gap-5 lg:grid lg:grid-cols-3 lg:gap-6">
        {SLIDES.map((slide) => (
          <BeginCard key={slide.id} slide={slide} />
        ))}
      </div>

      {/* Mobile / tablet: snap carousel */}
      <div className="lg:hidden">
        <div
          className="overflow-hidden"
          ref={emblaRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Ways to begin"
        >
          <div className="flex gap-4">
            {SLIDES.map((slide, i) => (
              <div
                key={slide.id}
                className="min-w-0 shrink-0 grow-0 basis-[min(100%,20.5rem)] sm:basis-[70%] md:basis-[48%]"
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${SLIDES.length}`}
              >
                <BeginCard slide={slide} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 px-0.5">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            aria-label="Previous way to begin"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border text-ink transition-colors hover:border-ember hover:text-ember-deep disabled:pointer-events-none disabled:opacity-35"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-1" role="tablist" aria-label="Carousel slides">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={selected === i}
                aria-label={`Go to ${slide.label}`}
                onClick={() => emblaApi?.scrollTo(i)}
                className="flex h-11 w-11 items-center justify-center"
              >
                <span
                  className={`block h-2.5 rounded-full transition-all duration-300 ${
                    selected === i ? "w-7 bg-ember" : "w-2.5 bg-border"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            aria-label="Next way to begin"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border text-ink transition-colors hover:border-ember hover:text-ember-deep disabled:pointer-events-none disabled:opacity-35"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

type Slide = (typeof SLIDES)[number];

function BeginCard({ slide }: { slide: Slide }) {
  const hasDual = "ctas" in slide && slide.ctas;

  return (
    <article
      id={slide.id}
      className="flex h-full min-h-[20rem] scroll-mt-28 flex-col rounded-2xl border border-border/70 bg-card/60 px-5 py-6 sm:min-h-[22rem] sm:px-6 sm:py-7"
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-display text-xs font-semibold tabular-nums tracking-[0.18em] text-ember/70">
          {slide.marker}
        </span>
      </div>
      <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink sm:text-xl">
        {slide.label}
      </h3>
      <p className="mt-3 flex-1 text-base leading-relaxed text-ink/75 sm:mt-4 sm:text-[1.02rem]">
        {slide.body}
      </p>

      {/* Fixed CTA rail — two button slots so columns stay even */}
      <div className="mt-8 flex min-h-[6.25rem] w-full flex-col justify-end gap-2.5">
        {hasDual ? (
          slide.ctas.map((cta) => (
            <a
              key={cta.href}
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-lux inline-flex h-11 min-h-11 w-full items-center justify-center px-4 text-center text-[0.68rem] tracking-[0.04em] sm:text-[0.7rem] ${
                cta.variant === "primary" ? "btn-lux-primary" : "btn-lux-sand"
              }`}
            >
              {cta.text}
            </a>
          ))
        ) : "cta" in slide && slide.cta ? (
          <a
            href={slide.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lux btn-lux-sand inline-flex h-11 min-h-11 w-full items-center justify-center gap-1.5 px-4 text-center text-[0.68rem] tracking-[0.04em] sm:text-[0.7rem]"
          >
            {slide.cta.text}
            <span aria-hidden>→</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}
