import { useEffect, useRef, useState } from "react";
import { CircularMap, MOVEMENT_COUNT } from "@/components/CircularMap";

/** Desktop: roomier per chapter. Mobile: shorter track. */
function stepVh(isMobile: boolean) {
  return isMobile ? 82 : 110;
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Sticky scroll chapter: map stays pinned while scroll walks each circle.
 * Layout is deliberately spacious — slim intro, roomy ring, panel beside it.
 */
export function MapScrollJourney() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [scrollDriven, setScrollDriven] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setScrollDriven(false);
      return;
    }

    const track = trackRef.current;
    if (!track) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      const view = window.innerHeight;
      const scrollable = Math.max(1, track.offsetHeight - view);
      const raw = Math.min(1, Math.max(0, -rect.top / scrollable));

      setProgress(raw);
      setActive(Math.min(MOVEMENT_COUNT - 1, Math.floor(raw * MOVEMENT_COUNT + 0.001)));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [scrollDriven, isMobile]);

  function scrollToStep(index: number) {
    const track = trackRef.current;
    if (!track) {
      setActive(index);
      return;
    }
    const scrollable = Math.max(1, track.offsetHeight - window.innerHeight);
    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const targetY = trackTop + ((index + 0.5) / MOVEMENT_COUNT) * scrollable;
    window.scrollTo({
      top: targetY,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }

  if (!scrollDriven) {
    return (
      <section className="border-y border-border/60 bg-gradient-to-b from-secondary/30 to-background">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <MapIntro />
          <div className="mt-12 sm:mt-16">
            <CircularMap />
          </div>
        </div>
      </section>
    );
  }

  const trackHeight = MOVEMENT_COUNT * stepVh(isMobile);

  return (
    <section className="border-y border-border/60 bg-gradient-to-b from-secondary/30 to-background">
      <div ref={trackRef} className="relative" style={{ height: `${trackHeight}vh` }}>
        <div className="sticky top-0 z-10 flex h-[100dvh] max-h-[100svh] flex-col overflow-hidden pt-[calc(3.5rem+env(safe-area-inset-top,0px))] sm:pt-[calc(4.25rem+env(safe-area-inset-top,0px))]">
          <div className="mx-auto flex h-full w-full min-w-0 max-w-6xl flex-col px-4 py-3 sm:px-8 sm:py-7 lg:py-9">
            <MapIntro scrollHint compact active={active} />

            <div className="mt-3 flex min-h-0 min-w-0 flex-1 items-stretch sm:mt-8 sm:items-center sm:pb-3">
              <CircularMap
                activeIndex={active}
                onActiveChange={scrollToStep}
                scrollProgress={progress}
                scrollDriven
                compactMobile={isMobile}
              />
            </div>

            <ScrollCue progress={progress} active={active} />
          </div>
        </div>
      </div>
    </section>
  );
}

function MapIntro({
  scrollHint = false,
  compact = false,
  active = 0,
}: {
  scrollHint?: boolean;
  compact?: boolean;
  active?: number;
}) {
  return (
    <div className={`mx-auto shrink-0 text-center ${compact ? "max-w-2xl" : "max-w-2xl"}`}>
      <div className="text-[0.6rem] uppercase tracking-[0.32em] text-ember-deep sm:text-[0.65rem]">
        The Map
      </div>
      <h2
        className={`font-display leading-tight text-ink ${
          compact
            ? "mt-1 text-lg sm:mt-2 sm:text-3xl md:text-[2.35rem]"
            : "mt-3 text-3xl sm:text-4xl md:text-5xl"
        }`}
      >
        From Emotional Reactivity to Creative Agency
      </h2>
      {scrollHint ? (
        <p className="mt-1.5 text-[0.65rem] leading-relaxed text-ink/65 sm:mt-2 sm:text-sm">
          Five movements. One relationship.{" "}
          <span className="text-ink/50">
            · {active + 1} of {MOVEMENT_COUNT}
          </span>
        </p>
      ) : (
        <p className="mx-auto mt-5 max-w-xl text-ink/75">
          The Map isn&apos;t something to master. It&apos;s a way of learning the language of your
          own experience. Five movements. One relationship. Meet yourself, differently.
        </p>
      )}
    </div>
  );
}

function ScrollCue({ progress, active }: { progress: number; active: number }) {
  const done = active >= MOVEMENT_COUNT - 1 && progress > 0.92;
  return (
    <div className="mt-3 flex w-full shrink-0 flex-col items-center gap-2 border-t border-border/40 pt-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:mt-8 sm:gap-3.5 sm:pt-6 sm:pb-safe">
      <div
        className="grid w-full max-w-[13.5rem] grid-cols-5 gap-2"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={MOVEMENT_COUNT}
        aria-valuenow={active + 1}
        aria-label={`Map movement ${active + 1} of ${MOVEMENT_COUNT}`}
      >
        {Array.from({ length: MOVEMENT_COUNT }).map((_, i) => (
          <span
            key={i}
            className={`h-1 rounded-full transition-colors duration-300 ${
              i < active ? "bg-ember/60" : i === active ? "bg-ember" : "bg-border"
            }`}
          />
        ))}
      </div>
      <p className="text-center text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground sm:text-[0.65rem]">
        {done ? "Continue scrolling ↓" : "Scroll to walk the map ↓"}
      </p>
    </div>
  );
}
