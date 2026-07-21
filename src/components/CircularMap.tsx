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
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
  scrollProgress?: number;
  scrollDriven?: boolean;
  compactMobile?: boolean;
};

/**
 * The Map — open terracotta ring with numbered nodes.
 * Labels live in the detail panel (sticky scroll) or a compact legend (static).
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
  const radius = 38;

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
    if (scrollDriven) return;
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches) {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
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

  const arcProgress = scrollDriven
    ? Math.min(1, Math.max(0, scrollProgress))
    : active / Math.max(1, movements.length - 1);
  const pathUnits = scrollDriven
    ? Math.min(movements.length, Math.max(0, scrollProgress * movements.length))
    : active;

  return (
    <div
      className={
        scrollDriven
          ? compactMobile
            ? "grid h-full min-h-0 min-w-0 grid-rows-[auto_minmax(0,1fr)] gap-4"
            : "grid h-full min-h-0 min-w-0 grid-cols-1 items-center gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-12 lg:gap-16"
          : "grid min-w-0 items-start gap-12 lg:grid-cols-2 lg:items-center lg:gap-16"
      }
    >
      <div className="flex min-h-0 min-w-0 flex-col items-center justify-center self-stretch px-2 sm:px-4">
        <div
          className={`relative aspect-square shrink-0 ${
            compactMobile
              ? "w-[min(92%,280px)]"
              : scrollDriven
                ? "w-[min(100%,min(32rem,62vh))]"
                : "w-[min(100%,32rem)]"
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
              strokeWidth="0.22"
              className="text-ember/25"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
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
                  opacity={0.3 + lit * 0.7}
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
                  aria-label={m.label}
                  aria-describedby={isHovered || isActive ? tipId : undefined}
                  onClick={() => select(i)}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  onKeyDown={(e) => onKeyRing(e, i)}
                  className={`relative flex items-center justify-center rounded-full border bg-card font-display outline-none transition-[transform,background-color,border-color,box-shadow,color] duration-300 ${
                    compactMobile
                      ? "h-10 w-10 text-sm"
                      : "h-12 w-12 text-base sm:h-14 sm:w-14 sm:text-lg"
                  } ${
                    isActive
                      ? "scale-110 border-ember bg-ember text-primary-foreground shadow-[0_8px_20px_-12px_rgba(156,71,34,0.45)]"
                      : isCrossed
                        ? "border-ember/80 bg-ember-soft text-ember-deep"
                        : isHovered
                          ? "scale-105 border-ember bg-card text-ember-deep"
                          : "border-ember/40 text-ember hover:border-ember"
                  } focus-visible:ring-2 focus-visible:ring-ember/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
                >
                  {i + 1}
                  {isActive && (
                    <span
                      className="pointer-events-none absolute -inset-1.5 rounded-full border border-ember/35 motion-safe:animate-map-pulse"
                      aria-hidden
                    />
                  )}
                </button>
              </div>
            );
          })}

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
            <span className="text-[0.65rem] uppercase tracking-[0.36em] text-ember sm:text-sm sm:tracking-[0.4em]">
              The Map
            </span>
            <span className="mt-1.5 text-[0.55rem] uppercase tracking-[0.28em] text-ink/70 sm:text-[0.65rem]">
              Alchemist Ways
            </span>
          </div>

          <div
            id={tipId}
            role="status"
            className={`pointer-events-none absolute inset-x-3 bottom-0 z-10 mx-auto max-w-[14rem] rounded-xl border border-border/50 bg-card/95 px-3 py-2.5 text-center backdrop-blur-sm transition-all duration-300 md:hidden ${
              hovered !== null ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
            }`}
          >
            <p className="font-display text-sm text-ink">{preview.label}</p>
            <p className="mt-0.5 text-[0.7rem] leading-snug text-muted-foreground">
              {preview.short}
            </p>
          </div>
        </div>

        {/* Compact legend — static / reduced-motion only (no drifting outer labels) */}
        {!scrollDriven && (
          <ol className="mt-8 flex w-full max-w-md flex-wrap items-center justify-center gap-x-4 gap-y-2 px-2">
            {movements.map((m, i) => (
              <li key={m.key}>
                <button
                  type="button"
                  onClick={() => select(i)}
                  className={`text-[0.6rem] uppercase tracking-[0.18em] transition-colors ${
                    i === active ? "text-ember-deep" : "text-ink/55 hover:text-ember-deep"
                  }`}
                >
                  <span className="tabular-nums text-ember/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="ml-1.5">{m.label}</span>
                </button>
              </li>
            ))}
          </ol>
        )}
      </div>

      <div
        ref={detailRef}
        className={`mx-auto w-full min-w-0 max-w-md md:max-w-none ${
          scrollDriven ? "min-h-0 self-center" : ""
        }`}
      >
        <div
          className={`relative overflow-hidden border-y border-border/50 bg-transparent ${
            compactMobile ? "px-1 py-4" : "px-1 py-5 sm:px-2 sm:py-6"
          } ${scrollDriven ? "max-h-[min(42vh,22rem)] overflow-y-auto overscroll-contain sm:max-h-[min(48vh,26rem)]" : ""}`}
        >
          <div
            key={panelKey}
            className={scrollDriven ? undefined : "motion-safe:animate-map-panel"}
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-display text-sm tabular-nums tracking-[0.12em] text-ember-deep sm:text-base">
                {String(active + 1).padStart(2, "0")}
              </span>
              <span className="text-[0.6rem] tabular-nums text-muted-foreground">
                {active + 1} / {movements.length}
              </span>
            </div>

            <h3
              className={`mt-3 font-display uppercase leading-tight tracking-[0.06em] text-ink ${
                compactMobile ? "text-xl" : "text-2xl sm:text-3xl"
              }`}
            >
              {current.label}
            </h3>
            <p className="mt-3 font-display text-base italic leading-snug text-muted-foreground sm:text-lg">
              {current.short}
            </p>
            <p
              className={`mt-4 leading-relaxed text-ink/80 ${
                compactMobile ? "text-sm" : "text-[0.95rem] sm:text-base"
              }`}
            >
              {current.body}
            </p>
          </div>

          <div className="mt-6 flex items-center gap-2" aria-hidden>
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

          {scrollDriven ? (
            <p className="mt-4 hidden text-center text-[0.7rem] text-muted-foreground sm:block">
              Keep scrolling to cross the next circle
              {active >= movements.length - 1 ? " — then continue down the page" : ""}
            </p>
          ) : (
            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => select((active - 1 + movements.length) % movements.length)}
                className="rounded-full border border-border px-4 py-2 text-xs text-ink transition-colors hover:border-ember hover:text-ember-deep"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => select((active + 1) % movements.length)}
                className="rounded-full bg-ember px-4 py-2 text-xs text-primary-foreground transition-opacity hover:opacity-90"
              >
                Next movement
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
