import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CONVERSATIONS_URL = "https://www.youtube.com/@alchemistwaysofficial";
const CLARITY_FREE_URL = "https://calendly.com/alchemistways/conversation";
const CLARITY_PAID_URL = "https://calendly.com/alchemistways/clarity-session";
const COMMUNITY_URL = "https://www.skool.com/alchemist-ways-1974/about";

const SLIDES = [
  {
    id: "conversations",
    label: "Conversations",
    body: "Watch the philosophy come alive through reflections, teachings, and real conversations.",
    cta: {
      href: CONVERSATIONS_URL,
      text: "Watch Conversations",
      variant: "sand" as const,
    },
  },
  {
    id: "clarity-call",
    label: "A Clarity Call",
    body: "An honest conversation about where you are, what patterns keep repeating, and whether this work feels like the right next step.",
    aside:
      "No pressure. No performance. Just curiosity, generous listening, care, and thoughtful inquiry.",
    ctas: [
      {
        href: CLARITY_FREE_URL,
        text: "Clarity Conversation (Free · 30 min)",
        variant: "primary" as const,
      },
      {
        href: CLARITY_PAID_URL,
        text: "Clarity Session (Paid · 90 min)",
        variant: "sand" as const,
      },
    ],
  },
  {
    id: "community",
    label: "The Community",
    body: "Walk alongside others learning to meet their inner lives with greater awareness, honesty, and choice.",
    cta: {
      href: COMMUNITY_URL,
      text: "Explore the Community",
      variant: "sand" as const,
    },
  },
] as const;

const HASH_TO_INDEX: Record<string, number> = {
  conversations: 0,
  "clarity-call": 1,
  community: 2,
};

/**
 * Ways to Begin — Conversations / Clarity Call / Community.
 * Snap carousel on mobile; equal grid on wide desktop.
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
      const el = document.getElementById(raw);
      el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    goToHash();
    window.addEventListener("hashchange", goToHash);
    return () => window.removeEventListener("hashchange", goToHash);
  }, [emblaApi]);

  return (
    <div className="relative">
      {/* Desktop ≥1024: equal cards in a row */}
      <div className="hidden gap-8 lg:grid lg:grid-cols-3">
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
                className="min-w-0 shrink-0 grow-0 basis-[85%] sm:basis-[70%]"
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
            className="grid h-11 w-11 place-items-center rounded-full border border-border text-ink transition-colors hover:border-ember hover:text-ember-deep disabled:pointer-events-none disabled:opacity-35"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="Carousel slides">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={selected === i}
                aria-label={`Go to ${slide.label}`}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  selected === i ? "w-7 bg-ember" : "w-2.5 bg-border hover:bg-ember/40"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            aria-label="Next way to begin"
            className="grid h-11 w-11 place-items-center rounded-full border border-border text-ink transition-colors hover:border-ember hover:text-ember-deep disabled:pointer-events-none disabled:opacity-35"
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
  return (
    <article
      id={slide.id}
      className="flex h-full min-h-[16rem] scroll-mt-28 flex-col border-t border-border/60 pt-6 sm:pt-8"
    >
      <div className="text-[0.65rem] uppercase tracking-[0.28em] text-ember-deep">
        {slide.label}
      </div>
      <p className="mt-4 flex-1 text-base leading-relaxed text-ink/80 sm:mt-5 sm:text-lg">
        {slide.body}
      </p>
      {"aside" in slide && slide.aside ? (
        <p className="mt-4 text-sm leading-relaxed text-ink/70 sm:text-base">{slide.aside}</p>
      ) : null}

      {"ctas" in slide && slide.ctas ? (
        <div className="mt-6 flex flex-col gap-3 sm:mt-8">
          {slide.ctas.map((cta) => (
            <a
              key={cta.href}
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-lux inline-flex w-full justify-center text-center sm:w-auto ${
                cta.variant === "primary" ? "btn-lux-primary" : "btn-lux-sand"
              }`}
            >
              {cta.text}
            </a>
          ))}
        </div>
      ) : "cta" in slide && slide.cta ? (
        <a
          href={slide.cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-lux btn-lux-sand mt-6 inline-flex w-full justify-center sm:mt-8 sm:w-fit"
        >
          {slide.cta.text}
          <span aria-hidden>→</span>
        </a>
      ) : null}
    </article>
  );
}
