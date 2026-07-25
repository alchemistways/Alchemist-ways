import { useEffect, useRef, useState } from "react";
import { CircularMap, MOVEMENT_COUNT } from "@/components/CircularMap";

/** Desktop: roomier per chapter. Phone/tablet compact: shorter track. */
function stepVh(compact: boolean) {
  return compact ? 82 : 100;
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Sticky scroll chapter: map stays pinned while scroll walks each circle.
 * Continues the doorway → book → walk narrative (no hard visual break).
 */
export function MapScrollJourney() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [scrollDriven, setScrollDriven] = useState(true);
  /** Stack map + panel through tablet; side-by-side only at lg+. */
  const [compactViewport, setCompactViewport] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const sync = () => setCompactViewport(mq.matches);
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
  }, [scrollDriven, compactViewport]);

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
      <section className="bg-gradient-to-b from-secondary/25 via-background to-background">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <MapIntro />
          <div className="mt-10 sm:mt-14">
            <CircularMap />
          </div>
        </div>
      </section>
    );
  }

  const trackHeight = MOVEMENT_COUNT * stepVh(compactViewport);

  return (
    <section className="bg-gradient-to-b from-secondary/25 via-background to-background">
      <div ref={trackRef} className="relative" style={{ height: `${trackHeight}vh` }}>
        <div className="sticky top-0 z-10 flex h-[100svh] max-h-[100dvh] flex-col overflow-hidden pt-[calc(3.75rem+env(safe-area-inset-top,0px))] sm:pt-[calc(4.25rem+env(safe-area-inset-top,0px))]">
          <div className="mx-auto flex h-full w-full min-w-0 max-w-6xl flex-col px-[max(1rem,env(safe-area-inset-left))] py-2 pr-[max(1rem,env(safe-area-inset-right))] sm:px-8 sm:py-5 lg:py-8">
            <MapIntro scrollHint compact />

            <div className="mt-1.5 flex min-h-0 min-w-0 flex-1 items-stretch sm:mt-4 sm:items-center sm:pb-2 lg:mt-6">
              <CircularMap
                activeIndex={active}
                onActiveChange={scrollToStep}
                scrollProgress={progress}
                scrollDriven
                compactMobile={compactViewport}
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
}: {
  scrollHint?: boolean;
  compact?: boolean;
}) {
  return (
    <div className="mx-auto w-full max-w-2xl shrink-0 text-left">
      <div className="text-sm font-semibold uppercase tracking-[0.22em] text-ember-deep sm:text-base">
        The Map
      </div>
      <h2
        className={`font-display font-semibold leading-tight text-ink ${
          compact
            ? "mt-1 text-lg sm:mt-2 sm:text-3xl md:text-[2.2rem]"
            : "mt-3 text-3xl sm:text-4xl md:text-5xl"
        }`}
      >
        Walk what the book maps
      </h2>
      {scrollHint ? (
        <p className="mt-1.5 max-w-xl text-[0.75rem] leading-relaxed text-ink/70 sm:mt-2 sm:text-sm">
          Five movements from Emotional Reactivity to Creative Agency.{" "}
          <span className="text-ink/50">Click a step · 1–{MOVEMENT_COUNT}</span>
        </p>
      ) : (
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/75 sm:text-lg">
          The book names the path. The Map is how you walk it — five movements for learning the
          language of your own experience. Meet yourself, differently.
        </p>
      )}
    </div>
  );
}

function ScrollCue({ progress, active }: { progress: number; active: number }) {
  const done = active >= MOVEMENT_COUNT - 1 && progress > 0.92;
  return (
    <div className="mt-1.5 flex w-full shrink-0 flex-col items-start gap-1.5 border-t border-border/35 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:mt-5 sm:gap-3 sm:pt-5">
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
            className={`h-1.5 rounded-full transition-colors duration-300 sm:h-1 ${
              i < active ? "bg-ember/60" : i === active ? "bg-ember" : "bg-border"
            }`}
          />
        ))}
      </div>
      <p className="text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground sm:text-[0.65rem]">
        {done ? "Continue scrolling ↓" : "Scroll to walk the map ↓"}
      </p>
    </div>
  );
}
