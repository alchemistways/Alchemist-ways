import { useEffect, useRef, useState } from "react";
import { CircularMap, MOVEMENT_COUNT } from "@/components/CircularMap";
import { useLocale } from "@/lib/i18n/LocaleProvider";

/** Desktop sticky chapters only — room for a full viewport pin. */
function stepVh() {
  return 100;
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Desktop (lg+): sticky scroll chapter — map stays pinned while scroll walks each circle.
 * Phone/tablet: normal landing section — tap nodes, keep scrolling the page.
 */
export function MapScrollJourney() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  /** Sticky journey only on large screens without reduced motion. */
  const [scrollDriven, setScrollDriven] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => {
      setScrollDriven(mq.matches && !prefersReducedMotion());
    };
    sync();
    mq.addEventListener("change", sync);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    motion.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!scrollDriven) return;

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
  }, [scrollDriven]);

  function scrollToStep(index: number) {
    const track = trackRef.current;
    if (!track || !scrollDriven) {
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
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
          <MapIntro />
          <div className="mt-8 sm:mt-10">
            <CircularMap />
          </div>
        </div>
      </section>
    );
  }

  const trackHeight = MOVEMENT_COUNT * stepVh();

  return (
    <section className="bg-gradient-to-b from-secondary/25 via-background to-background">
      <div ref={trackRef} className="relative" style={{ height: `${trackHeight}vh` }}>
        <div className="sticky top-0 z-10 flex h-[100svh] max-h-[100dvh] flex-col overflow-hidden pt-[calc(7.25rem+env(safe-area-inset-top,0px))]">
          <div className="mx-auto flex h-full w-full min-w-0 max-w-6xl flex-col px-8 py-5 pr-8">
            <div className="relative z-20 shrink-0 bg-gradient-to-b from-secondary/25 from-60% to-transparent pb-3">
              <MapIntro scrollHint compact />
            </div>

            <div className="relative z-0 mt-3 flex min-h-0 min-w-0 flex-1 items-center justify-center overflow-hidden">
              <CircularMap
                activeIndex={active}
                onActiveChange={scrollToStep}
                scrollProgress={progress}
                scrollDriven
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
  const { t } = useLocale();
  return (
    <div className="mx-auto w-full max-w-2xl shrink-0 text-left">
      <p className="aw-eyebrow text-[0.65rem] sm:text-[0.7rem]">{t.map.eyebrow}</p>
      <h2
        className={`font-display font-semibold leading-[1.12] tracking-[-0.02em] text-ink ${
          compact
            ? "mt-1.5 text-xl sm:mt-2 sm:text-3xl md:text-[2.15rem]"
            : "mt-3 text-3xl sm:text-4xl md:text-5xl"
        }`}
      >
        {t.map.title}
      </h2>
      {scrollHint ? (
        <p className="mt-2 max-w-xl text-[0.8rem] leading-relaxed text-ink/65 sm:mt-2.5 sm:text-[0.9rem]">
          {t.map.scrollHint}{" "}
          <span className="text-ink/45">{t.map.clickStep(MOVEMENT_COUNT)}</span>
        </p>
      ) : (
        <p className="aw-lede mt-4">{t.map.lede}</p>
      )}
      <div className="mt-3 h-px w-full max-w-xl bg-border/50 sm:mt-4" aria-hidden />
    </div>
  );
}

function ScrollCue({ progress, active }: { progress: number; active: number }) {
  const { t } = useLocale();
  const done = active >= MOVEMENT_COUNT - 1 && progress > 0.92;
  return (
    <div className="mt-5 flex w-full shrink-0 flex-col items-start gap-3 border-t border-border/35 pt-5 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div
        className="grid w-full max-w-[13.5rem] grid-cols-5 gap-2"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={MOVEMENT_COUNT}
        aria-valuenow={active + 1}
        aria-label={t.a11y.mapProgress(active + 1, MOVEMENT_COUNT)}
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
      <p className="aw-hud">{done ? t.map.continue : t.map.walk}</p>
    </div>
  );
}
