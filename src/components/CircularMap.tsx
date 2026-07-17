import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

export const movements = [
  {
    key: "reactivity",
    label: "Reactivity",
    question: "Life happens. You react automatically.",
    body: "An event occurs. A meaning forms. Emotion rises. Before you realize what has happened, an old pattern has taken over — and life feels as though it is happening to you.",
  },
  {
    key: "awareness",
    label: "Awareness",
    question: "You see the pattern. The choice appears.",
    body: "A space opens between the experience and your automatic response. You stop being only inside the reaction and begin witnessing it — and with that seeing, choice becomes possible.",
  },
  {
    key: "integration",
    label: "Integration",
    question: "You welcome what was rejected.",
    body: "What was once suppressed, judged, or pushed away is met with understanding. What felt like an obstacle begins revealing its intelligence — and your energy starts to return.",
  },
  {
    key: "sovereignty",
    label: "Sovereignty",
    question: "You choose your response. You take your power back.",
    body: "You can pause. Feel. Discern. Choose. Sovereignty is remaining in relationship with yourself while deciding how you want to respond — from choice, not compulsion.",
  },
  {
    key: "agency",
    label: "Creative Agency",
    question: "Your energy is available. You create.",
    body: "The energy once consumed by protection becomes available for participation. You begin creating from authenticity rather than fear — your life becomes a true expression of you.",
  },
] as const;

export const MOVEMENT_COUNT = movements.length;

type Movement = (typeof movements)[number];

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
 * Interactive journey map — cream/ink/gold only.
 * Supports click/hover and optional scroll-driven activation.
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
  const radius = 40;

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

  // Path fill only — ring stays still; gold line advances along the circle
  const arcProgress = scrollDriven
    ? Math.min(1, Math.max(0, scrollProgress))
    : active / Math.max(1, movements.length - 1);
  // How far through the five segments (0 → 5); used for chord lighting
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
          <div
            className="pointer-events-none absolute inset-[4%] rounded-full border border-ink/10"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-[12%] rounded-full border border-dashed border-gold/35"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-[22%] rounded-full border border-ink/[0.06]"
            aria-hidden
          />

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
              strokeWidth="0.35"
              className="text-ink/10"
            />
            {/* Gold path advances with scroll — no ring rotation */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinecap="round"
              className="text-gold-deep"
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
              const a = nodePosition(i, movements.length, radius);
              const b = nodePosition((i + 1) % movements.length, movements.length, radius);
              const filled = Math.min(1, Math.max(0, pathUnits - i));
              return (
                <line
                  key={i}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="currentColor"
                  strokeWidth={filled > 0 ? 0.55 + filled * 0.25 : 0.25}
                  strokeOpacity={filled > 0 ? 0.35 + filled * 0.65 : 0.15}
                  className="text-gold-deep"
                  strokeLinecap="round"
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
                  className={`group relative flex items-center justify-center rounded-full border font-medium outline-none transition-[transform,background-color,border-color,box-shadow,color] duration-300 ${
                    compactMobile
                      ? "h-9 w-9 text-[0.6rem] sm:h-12 sm:w-12 sm:text-xs"
                      : "h-11 w-11 text-[0.65rem] sm:h-14 sm:w-14 sm:text-xs"
                  } ${
                    isActive
                      ? "scale-110 border-gold-deep bg-ink text-primary-foreground shadow-[0_12px_28px_-12px_rgba(31,27,23,0.55)]"
                      : isCrossed
                        ? "scale-100 border-gold-deep/80 bg-gold-soft text-ink shadow-[0_8px_20px_-14px_rgba(169,132,107,0.55)]"
                        : isHovered
                          ? "scale-105 border-gold bg-card text-ink shadow-[0_10px_24px_-14px_rgba(169,132,107,0.65)]"
                          : "border-border/80 bg-card/90 text-ink hover:border-gold/70"
                  } focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
                >
                  {String(i + 1).padStart(2, "0")}
                  {isActive && (
                    <span
                      className="pointer-events-none absolute -inset-1 rounded-full border border-gold/40 motion-safe:animate-map-pulse"
                      aria-hidden
                    />
                  )}
                </button>

                <span
                  className={`pointer-events-none absolute left-1/2 top-[calc(100%+0.35rem)] hidden -translate-x-1/2 whitespace-nowrap font-display text-[0.65rem] transition-opacity duration-200 lg:block ${
                    scrollDriven ? "lg:hidden" : ""
                  } ${
                    isActive || isHovered || isCrossed
                      ? "opacity-100 text-ink"
                      : "opacity-50 text-muted-foreground"
                  }`}
                >
                  {m.label}
                </span>
              </div>
            );
          })}

          {/* Center */}
          <div
            className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center ${
              compactMobile ? "px-6 sm:px-10" : "px-10"
            }`}
          >
            <span className="text-[0.55rem] uppercase tracking-[0.28em] text-muted-foreground sm:text-[0.65rem]">
              The Map
            </span>
            <span
              className={`mt-1.5 max-w-[11rem] font-display leading-snug text-ink sm:mt-2 ${
                compactMobile ? "text-sm sm:text-lg" : "text-base sm:text-lg"
              }`}
            >
              {scrollDriven ? (
                <>
                  Movement {String(active + 1).padStart(2, "0")}
                  <br />
                  of {String(movements.length).padStart(2, "0")}
                </>
              ) : (
                <>
                  Five movements.
                  <br />
                  One return.
                </>
              )}
            </span>
            <span className={`h-px w-8 bg-gold/80 ${compactMobile ? "mt-2 sm:mt-4" : "mt-4"}`} />
          </div>

          <div
            id={tipId}
            role="status"
            className={`pointer-events-none absolute inset-x-4 bottom-[-0.25rem] z-10 mx-auto max-w-xs rounded-2xl border border-border/70 bg-card/95 px-4 py-3 text-center shadow-[0_16px_40px_-24px_rgba(31,27,23,0.35)] backdrop-blur-sm transition-all duration-300 lg:hidden ${
              compactMobile ? "hidden sm:block" : ""
            } ${hovered !== null ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}
          >
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gold-deep">Preview</p>
            <p className="mt-1 font-display text-sm text-ink">{preview.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{preview.question}</p>
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
          className={`relative overflow-hidden rounded-[1.25rem] border border-border/70 bg-card shadow-[0_24px_60px_-36px_rgba(31,27,23,0.28)] sm:rounded-[1.5rem] ${
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
              <span className="text-[0.6rem] uppercase tracking-[0.28em] text-gold-deep sm:text-[0.65rem]">
                Movement {String(active + 1).padStart(2, "0")}
              </span>
              <span className="text-[0.6rem] text-muted-foreground sm:text-[0.65rem]">
                {active + 1} / {movements.length}
              </span>
            </div>

            <h3
              className={`font-display leading-tight text-ink ${
                compactMobile ? "mt-2 text-xl sm:mt-3 sm:text-3xl" : "mt-3 text-2xl sm:text-3xl"
              }`}
            >
              {current.label}
            </h3>
            <p
              className={`font-display italic leading-snug text-muted-foreground ${
                compactMobile ? "mt-2 text-base sm:mt-3 sm:text-lg" : "mt-3 text-lg"
              }`}
            >
              {current.question}
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
          </div>

          <div
            className={`flex items-center gap-2 ${compactMobile ? "mt-5 sm:mt-8" : "mt-8"}`}
            aria-hidden
          >
            {movements.map((m, i) => (
              <button
                key={m.key}
                type="button"
                onClick={() => select(i)}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  i === active ? "bg-ink" : i < active ? "bg-gold/80" : "bg-border hover:bg-gold/40"
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
                  className="rounded-full border border-border px-4 py-2 text-xs text-ink transition-colors hover:border-gold hover:text-gold-deep"
                >
                  Previous
                </button>
                <p className="hidden text-center text-[0.7rem] text-muted-foreground sm:block">
                  Hover a step to preview · click to open
                </p>
                <button
                  type="button"
                  onClick={() => select((active + 1) % movements.length)}
                  className="rounded-full bg-ink px-4 py-2 text-xs text-primary-foreground transition-opacity hover:opacity-90"
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
            {(movements[hovered ?? active] as Movement).label}
            <span className="text-muted-foreground"> — click to stay here</span>
          </p>
        </div>
      </div>
    </div>
  );
}
