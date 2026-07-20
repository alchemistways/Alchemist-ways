import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

export const movements = [
  {
    key: "reactivity",
    label: "Reactivity",
    short: "Automatic survival patterns run your life.",
    body: "Life begins to feel as though it is happening to you. An event occurs. A meaning forms. Emotion rises. The body reacts. An old pattern takes over. Reactivity isn’t the problem. It’s communication that hasn’t yet been understood.",
    explore: "Explore Reactivity",
  },
  {
    key: "awareness",
    label: "Awareness",
    short: "You see the patterns that were once invisible.",
    body: "Seeing is not the same as meeting. You can recognize a pattern and still remain caught inside it. Awareness begins the conversation.",
    explore: "Explore Awareness",
  },
  {
    key: "integration",
    label: "Integration",
    short: "You meet and accept what was once rejected.",
    body: "What you’ve been fighting may be trying to protect you. It rarely changes until it’s understood. Integration begins when protection becomes conversation.",
    explore: "Explore Integration",
  },
  {
    key: "sovereignty",
    label: "Sovereignty",
    short: "You act from your values, not from protection.",
    body: "Freedom isn’t the absence of old patterns. It’s discovering that you can choose from somewhere deeper.",
    explore: "Explore Sovereignty",
  },
  {
    key: "agency",
    label: "Creative Agency",
    short: "Your energy is free to create and express what is uniquely yours.",
    body: "As your relationship with yourself changes, energy once devoted to protection becomes available for creation. Creative Agency is what becomes possible when survival is no longer consuming your attention.",
    explore: "Explore Creative Agency",
  },
] as const;

export const MOVEMENT_COUNT = movements.length;

function nodePosition(index: number, total: number, radius: number) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  return {
    x: 50 + radius * Math.cos(angle),
    y: 50 + radius * Math.sin(angle),
    angle,
  };
}

type Props = {
  /** Controlled active movement (0-based). */
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
  /** 0–1 scroll progress through the sticky journey. */
  scrollProgress?: number;
  /** When true, copy leans into “keep scrolling”. */
  scrollDriven?: boolean;
  /** Tighter ring + panel so sticky map fits phone viewports. */
  compactMobile?: boolean;
};

/**
 * The Map — terracotta numbered circles on warm ivory, after the client's
 * MAP artwork. Supports click/hover and optional scroll-driven activation.
 */
export function CircularMap({
  activeIndex,
  onActiveChange,
  scrollProgress = 0,
  scrollDriven = false,
  compactMobile = false,
}: Props = {}) {
  const [internalActive, setInternalActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [panelKey, setPanelKey] = useState(0);
  const tipId = useId();
  const detailRef = useRef<HTMLDivElement>(null);
  // Compact rings keep nodes wide apart; large rings pull them in so the
  // bigger labelled circles stay inside the container bounds.
  const radius = compactMobile ? 40 : 34;

  const controlled = typeof activeIndex === "number";
  const active = controlled ? activeIndex : internalActive;
  const current = movements[active];
  const previewIndex = hovered ?? active;
  const preview = movements[previewIndex];

  useEffect(() => {
    setPanelKey((k) => k + 1);
  }, [active]);

  function select(index: number) {
    if (!controlled) setInternalActive(index);
    onActiveChange?.(index);
    // Don't fight sticky scroll-driven journey with scrollIntoView
    if (scrollDriven) return;
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches) {
      detailRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }

  function onKeyRing(e: KeyboardEvent, index: number) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      select((index + 1) % movements.length);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      select((index - 1 + movements.length) % movements.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      select(0);
    } else if (e.key === "End") {
      e.preventDefault();
      select(movements.length - 1);
    }
  }

  // Path fill only — ring stays still; ember line advances along the circle
  const arcProgress = scrollDriven
    ? Math.min(1, Math.max(0, scrollProgress))
    : active / Math.max(1, movements.length - 1);
  // How far through the five segments (0 → 5); used for arrow lighting
  const pathUnits = scrollDriven
    ? Math.min(movements.length, Math.max(0, scrollProgress * movements.length))
    : active;

  return (
    <div
      className={
        scrollDriven
          ? compactMobile
            ? "grid h-full min-h-0 min-w-0 grid-rows-[auto_minmax(0,1fr)] gap-3 sm:gap-5"
            : "grid h-full min-h-0 min-w-0 grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-8 lg:gap-12"
          : "grid min-w-0 items-start gap-12 lg:grid-cols-2 lg:items-center lg:gap-16"
      }
    >
      {/* Ring — largest square that fits; padding keeps nodes/labels inside bounds */}
      <div className="flex min-h-0 min-w-0 items-center justify-center self-stretch">
        <div
          className={`relative aspect-square shrink-0 ${
            compactMobile
              ? "w-[min(100%,220px)] sm:w-[min(100%,280px)]"
              : scrollDriven
                ? "w-[min(100%,min(22rem,42vh))] md:w-[min(100%,min(26rem,48vh))] lg:w-[min(100%,min(28rem,52vh))]"
                : "w-[min(100%,28rem)]"
          }`}
          role="listbox"
          aria-label="Alchemist Ways map movements"
          aria-activedescendant={`map-node-${movements[active].key}`}
        >
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            aria-hidden
          >
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.3"
              className="text-ember/25"
            />
            {/* Ember path advances with scroll — no ring rotation */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.9"
              strokeLinecap="round"
              className="text-ember"
              style={{
                strokeDasharray: 2 * Math.PI * radius,
                strokeDashoffset: 2 * Math.PI * radius * (1 - arcProgress),
                transition: scrollDriven
                  ? "none"
                  : "stroke-dashoffset 400ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              transform="rotate(-90 50 50)"
            />
            {/* Arrowheads midway between circles, following the ring clockwise */}
            {movements.map((_, i) => {
              const midAngle = ((i + 0.5) / movements.length) * 2 * Math.PI - Math.PI / 2;
              const mx = 50 + radius * Math.cos(midAngle);
              const my = 50 + radius * Math.sin(midAngle);
              const tangentDeg = (midAngle * 180) / Math.PI + 90;
              const lit = Math.min(1, Math.max(0, pathUnits - i));
              return (
                <path
                  key={i}
                  d="M -1.6 -1.5 L 1.4 0 L -1.6 1.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.55"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-ember"
                  opacity={0.35 + lit * 0.65}
                  transform={`translate(${mx} ${my}) rotate(${tangentDeg})`}
                />
              );
            })}
          </svg>

          {movements.map((m, i) => {
            const { x, y } = nodePosition(i, movements.length, radius);
            const isActive = i === active;
            const isHovered = hovered === i;
            const isCrossed = i < active;
            return (
              <div
                key={m.key}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <button
                  id={`map-node-${m.key}`}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  aria-describedby={isHovered || isActive ? tipId : undefined}
                  onClick={() => select(i)}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  onKeyDown={(e) => onKeyRing(e, i)}
                  className={`group relative flex flex-col items-center justify-center rounded-full border bg-card/95 text-center outline-none transition-[transform,background-color,border-color,box-shadow] duration-300 ${
                    compactMobile
                      ? "h-9 w-9 sm:h-12 sm:w-12"
                      : "h-20 w-20 px-1.5 sm:h-24 sm:w-24 sm:px-2 lg:h-28 lg:w-28 lg:px-2.5"
                  } ${
                    isActive
                      ? "scale-105 border-ember bg-ember-soft/70 shadow-[0_14px_32px_-16px_rgba(156,71,34,0.55)]"
                      : isCrossed
                        ? "border-ember/70 shadow-[0_8px_20px_-14px_rgba(156,71,34,0.4)]"
                        : isHovered
                          ? "scale-[1.03] border-ember/80 shadow-[0_10px_24px_-14px_rgba(156,71,34,0.45)]"
                          : "border-ember/35 hover:border-ember/70"
                  } focus-visible:ring-2 focus-visible:ring-ember/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
                >
                  <span
                    className={`font-display leading-none text-ember ${
                      compactMobile ? "text-[0.7rem] sm:text-sm" : "text-lg sm:text-xl lg:text-2xl"
                    }`}
                  >
                    {i + 1}
                  </span>
                  {!compactMobile && (
                    <>
                      <span className="mt-1 text-[0.42rem] uppercase leading-tight tracking-[0.18em] text-ink sm:text-[0.5rem] lg:text-[0.55rem]">
                        {m.label}
                      </span>
                      <span className="mt-1 hidden text-[0.5rem] leading-snug text-ink/65 sm:block lg:text-[0.55rem]">
                        {m.short}
                      </span>
                    </>
                  )}
                  {isActive && (
                    <span
                      className="pointer-events-none absolute -inset-1 rounded-full border border-ember/40 motion-safe:animate-map-pulse"
                      aria-hidden
                    />
                  )}
                </button>
              </div>
            );
          })}

          {/* Center — after the client's MAP artwork */}
          <div
            className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center ${
              compactMobile ? "px-6 sm:px-10" : "px-10"
            }`}
          >
            <span
              className={`uppercase text-ember ${
                compactMobile
                  ? "text-[0.65rem] tracking-[0.32em] sm:text-sm sm:tracking-[0.4em]"
                  : "text-sm tracking-[0.4em] sm:text-base"
              }`}
            >
              The Map
            </span>
            <span
              className={`mt-1.5 uppercase text-ink ${
                compactMobile
                  ? "text-[0.5rem] tracking-[0.26em] sm:text-[0.6rem] sm:tracking-[0.3em]"
                  : "text-[0.6rem] tracking-[0.3em] sm:text-xs"
              }`}
            >
              Alchemist Ways
            </span>
          </div>

          <div
            id={tipId}
            role="status"
            className={`pointer-events-none absolute inset-x-4 bottom-[-0.25rem] z-10 mx-auto max-w-xs rounded-2xl border border-border/70 bg-card/95 px-4 py-3 text-center shadow-[0_16px_40px_-24px_rgba(38,32,25,0.35)] backdrop-blur-sm transition-all duration-300 lg:hidden ${
              compactMobile ? "hidden sm:block" : ""
            } ${hovered !== null ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}
          >
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-ember-deep">Preview</p>
            <p className="mt-1 font-display text-sm text-ink">{preview.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{preview.short}</p>
          </div>
        </div>
      </div>

      {/* Detail panel */}
      <div
        ref={detailRef}
        className={`mx-auto w-full min-w-0 max-w-md md:max-w-none ${
          scrollDriven ? "min-h-0 self-center" : ""
        }`}
      >
        <div
          className={`relative overflow-hidden rounded-[1.25rem] border border-border/70 bg-card shadow-[0_24px_60px_-36px_rgba(38,32,25,0.28)] sm:rounded-[1.5rem] ${
            compactMobile
              ? "px-4 py-4 sm:px-7 sm:py-7"
              : scrollDriven
                ? "px-5 py-5 sm:px-7 sm:py-7"
                : "px-6 py-7 sm:px-8 sm:py-9"
          }`}
        >
          <div
            key={panelKey}
            className={scrollDriven ? undefined : "motion-safe:animate-map-panel"}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-[0.6rem] uppercase tracking-[0.28em] text-ember-deep sm:text-[0.65rem]">
                Movement {String(active + 1).padStart(2, "0")}
              </span>
              <span className="text-[0.6rem] text-muted-foreground sm:text-[0.65rem]">
                {active + 1} / {movements.length}
              </span>
            </div>

            <h3
              className={`font-display uppercase leading-tight tracking-[0.08em] text-ink ${
                compactMobile ? "mt-2 text-lg sm:mt-3 sm:text-2xl" : "mt-3 text-xl sm:text-2xl"
              }`}
            >
              {current.label}
            </h3>
            <p
              className={`font-display italic leading-snug text-muted-foreground ${
                compactMobile ? "mt-2 text-sm sm:mt-3 sm:text-base" : "mt-3 text-base"
              }`}
            >
              {current.short}
            </p>
            <p
              className={`leading-relaxed text-ink/80 ${
                compactMobile
                  ? "mt-3 line-clamp-4 text-sm sm:mt-5 sm:line-clamp-none sm:text-[0.95rem]"
                  : "mt-5 text-[0.95rem]"
              }`}
            >
              {current.body}
            </p>
            <p
              className={`text-[0.8rem] text-ember-deep ${compactMobile ? "mt-2 sm:mt-4" : "mt-4"}`}
            >
              <span aria-hidden>→ </span>
              {current.explore}
            </p>
          </div>

          <div
            className={`flex items-center gap-2 ${compactMobile ? "mt-4 sm:mt-7" : "mt-7"}`}
            aria-hidden
          >
            {movements.map((m, i) => (
              <button
                key={m.key}
                type="button"
                onClick={() => select(i)}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  i === active
                    ? "bg-ember"
                    : i < active
                      ? "bg-ember/50"
                      : "bg-border hover:bg-ember/30"
                }`}
                aria-label={`Go to ${m.label}`}
              />
            ))}
          </div>

          <div
            className={`flex items-center justify-between gap-3 ${
              compactMobile ? "mt-3 sm:mt-6" : "mt-6"
            }`}
          >
            {scrollDriven ? (
              <p className="hidden w-full text-center text-[0.7rem] text-muted-foreground sm:block">
                Keep scrolling to cross the next circle
                {active >= movements.length - 1 ? " — then continue down the page" : ""}
              </p>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => select((active - 1 + movements.length) % movements.length)}
                  className="rounded-full border border-border px-4 py-2 text-xs text-ink transition-colors hover:border-ember hover:text-ember-deep"
                >
                  Previous
                </button>
                <p className="hidden text-center text-[0.7rem] text-muted-foreground sm:block">
                  Hover a circle to preview · click to open
                </p>
                <button
                  type="button"
                  onClick={() => select((active + 1) % movements.length)}
                  className="rounded-full bg-ember px-4 py-2 text-xs text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Next movement
                </button>
              </>
            )}
          </div>
        </div>

        <div
          className={`mt-4 hidden rounded-xl border border-dashed border-border/80 bg-secondary/40 px-4 py-3 transition-opacity duration-300 lg:block ${
            hovered !== null && hovered !== active ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={hovered === null || hovered === active}
        >
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
            Looking at
          </p>
          <p className="mt-1 font-display text-sm text-ink">
            {movements[hovered ?? active].label}
            <span className="text-muted-foreground"> — click to stay here</span>
          </p>
        </div>
      </div>
    </div>
  );
}
