import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

/** Stage copy verbatim from the client REVISED PDF (Map section). */
export const movements = [
  {
    key: "reactivity",
    label: "Reactivity",
    short: "Happening to you",
    body: "Life begins to feel as though it is happening to you. An event occurs. A meaning forms. Emotion rises. The body reacts. An old pattern takes over.\n\nReactivity isn’t the problem. It’s communication that hasn’t yet been understood.",
    explore: "Explore Reactivity",
  },
  {
    key: "awareness",
    label: "Awareness",
    short: "Seeing is not meeting",
    body: "Seeing is not the same as meeting. You can recognize a pattern and still remain caught inside it.\n\nAwareness begins the conversation.",
    explore: "Explore Awareness",
  },
  {
    key: "integration",
    label: "Integration",
    short: "Protection becomes conversation",
    body: "What you’ve been fighting may be trying to protect you. It rarely changes until it’s understood.\n\nIntegration begins when protection becomes conversation.",
    explore: "Explore Integration",
  },
  {
    key: "sovereignty",
    label: "Sovereignty",
    short: "Choose from somewhere deeper",
    body: "Freedom isn’t the absence of old patterns. It’s discovering that you can choose from somewhere deeper.",
    explore: "Explore Sovereignty",
  },
  {
    key: "agency",
    label: "Creative Agency",
    short: "Available for creation",
    body: "As your relationship with yourself changes, energy once devoted to protection becomes available for creation.\n\nCreative Agency is what becomes possible when survival is no longer consuming your attention.",
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
  /* Single viewBox coordinate system — ring, arrows, and nodes share this radius */
  const ringR = 36;
  const nodeR = 5.4;

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
  const circumference = 2 * Math.PI * ringR;

  return (
    <div
      className={
        scrollDriven
          ? compactMobile
            ? "grid h-full min-h-0 w-full min-w-0 grid-rows-[minmax(0,auto)_minmax(0,1fr)] gap-2 sm:gap-4"
            : "grid h-full min-h-0 w-full min-w-0 grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16"
          : "grid min-w-0 items-start gap-10 sm:gap-12 lg:grid-cols-2 lg:items-center lg:gap-16"
      }
    >
      <div
        className={`flex min-h-0 min-w-0 flex-col items-center justify-center ${
          compactMobile
            ? "overflow-hidden px-0 py-1"
            : scrollDriven
              ? "overflow-hidden px-2 py-2 sm:px-4 sm:py-3"
              : "px-1 sm:px-2 lg:self-center"
        }`}
      >
        <div
          className={`relative mx-auto aspect-square shrink-0 ${
            compactMobile
              ? "w-[min(62vw,13.5rem)] sm:w-[min(48vw,16rem)]"
              : scrollDriven
                ? "w-[min(100%,min(22rem,38svh))]"
                : "w-[min(100%,32rem)]"
          }`}
          role="listbox"
          aria-label="Alchemist Ways map movements"
          aria-activedescendant={`map-node-${movements[active].key}`}
        >
          {/* One SVG: track, progress, arrows, nodes, hub — same cx/cy/r */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            overflow="visible"
            aria-hidden
          >
            <circle
              cx="50"
              cy="50"
              r={ringR}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.35"
              className="text-ember/30"
            />
            <circle
              cx="50"
              cy="50"
              r={ringR}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.9"
              strokeLinecap="round"
              className="text-ember"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: circumference * (1 - arcProgress),
                transition: scrollDriven
                  ? "none"
                  : "stroke-dashoffset 400ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              transform="rotate(-90 50 50)"
            />

            {movements.map((_, i) => {
              const midAngle = ((i + 0.5) / movements.length) * 2 * Math.PI - Math.PI / 2;
              const mx = 50 + ringR * Math.cos(midAngle);
              const my = 50 + ringR * Math.sin(midAngle);
              const tangentDeg = (midAngle * 180) / Math.PI + 90;
              const lit = Math.min(1, Math.max(0, pathUnits - i));
              return (
                <path
                  key={`arrow-${i}`}
                  d="M -1.5 -1.35 L 1.35 0 L -1.5 1.35"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.55"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-ember"
                  opacity={0.28 + lit * 0.72}
                  transform={`translate(${mx} ${my}) rotate(${tangentDeg})`}
                />
              );
            })}

            {movements.map((m, i) => {
              const { x, y } = nodePosition(i, movements.length, ringR);
              const isActive = i === active;
              const isHovered = hovered === i;
              const isCrossed = i < active;
              const fill = isActive
                ? "var(--ember, #c05a2e)"
                : isCrossed
                  ? "var(--ember-soft, #f3e4d8)"
                  : "var(--card, #fffcf7)";
              const stroke = isActive || isCrossed || isHovered ? "#c05a2e" : "rgba(192,90,46,0.45)";
              const labelFill = isActive ? "#fffcf7" : "#c05a2e";
              return (
                <g key={`node-${m.key}`}>
                  {isActive ? (
                    <circle
                      cx={x}
                      cy={y}
                      r={nodeR + 1.1}
                      fill="none"
                      stroke="rgba(192,90,46,0.28)"
                      strokeWidth="0.45"
                    />
                  ) : null}
                  <circle
                    cx={x}
                    cy={y}
                    r={nodeR}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={isActive ? 0.55 : 0.4}
                  />
                  <text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="font-display"
                    fill={labelFill}
                    style={{ fontSize: "4.2px", fontWeight: 600 }}
                  >
                    {i + 1}
                  </text>
                </g>
              );
            })}

            <text
              x="50"
              y="47.2"
              textAnchor="middle"
              dominantBaseline="middle"
              className="uppercase"
              fill="#c05a2e"
              style={{
                fontSize: compactMobile ? "2.4px" : "2.8px",
                letterSpacing: "0.32em",
                fontWeight: 600,
              }}
            >
              The Map
            </text>
            <text
              x="50"
              y="52.6"
              textAnchor="middle"
              dominantBaseline="middle"
              className="uppercase"
              fill="rgba(26,24,20,0.62)"
              style={{
                fontSize: compactMobile ? "2px" : "2.3px",
                letterSpacing: "0.26em",
                fontWeight: 500,
              }}
            >
              Alchemist Ways
            </text>
          </svg>

          {/* Invisible hit targets — same % coords as SVG nodes */}
          {movements.map((m, i) => {
            const { x, y } = nodePosition(i, movements.length, ringR);
            const isActive = i === active;
            const isHovered = hovered === i;
            return (
              <button
                key={m.key}
                id={`map-node-${m.key}`}
                type="button"
                role="option"
                aria-selected={isActive}
                aria-label={m.label}
                aria-describedby={!compactMobile && (isHovered || isActive) ? tipId : undefined}
                onClick={() => select(i)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                onKeyDown={(e) => onKeyRing(e, i)}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: `${nodeR * 2.4}%`,
                  height: `${nodeR * 2.4}%`,
                }}
              />
            );
          })}

          {!compactMobile && (
            <div
              id={tipId}
              role="status"
              className={`pointer-events-none absolute inset-x-3 bottom-0 z-30 mx-auto max-w-[14rem] rounded-xl border border-border/50 bg-card/95 px-3 py-2.5 text-center backdrop-blur-sm transition-all duration-300 md:hidden ${
                hovered !== null ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
              }`}
            >
              <p className="font-display text-sm text-ink">{preview.label}</p>
              <p className="mt-0.5 text-[0.7rem] leading-snug text-muted-foreground">
                {preview.short}
              </p>
            </div>
          )}
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
        className={`mx-auto flex w-full min-w-0 max-w-md flex-col justify-center md:max-w-none ${
          scrollDriven
            ? compactMobile
              ? "min-h-0"
              : "min-h-0 self-center lg:max-w-lg"
            : ""
        }`}
      >
        <div
          className={`relative overflow-hidden border-y border-border/50 bg-transparent ${
            compactMobile
              ? "h-full min-h-0 overflow-y-auto overscroll-contain px-0 py-2"
              : "px-1 py-5 sm:px-2 sm:py-6"
          } ${
            scrollDriven && !compactMobile
              ? "max-h-[min(42vh,22rem)] overflow-y-auto overscroll-contain sm:max-h-[min(48vh,26rem)]"
              : ""
          }`}
        >
          <div
            key={panelKey}
            className={`text-left ${scrollDriven ? undefined : "motion-safe:animate-map-panel"}`}
          >
            <div className="flex items-baseline gap-3">
              <span className="font-display text-sm font-semibold tabular-nums tracking-[0.12em] text-ember-deep sm:text-base">
                {String(active + 1).padStart(2, "0")}
              </span>
              <span className="text-[0.6rem] tabular-nums text-muted-foreground">
                {active + 1} / {movements.length}
              </span>
            </div>

            <h3
              className={`mt-2 font-display font-semibold uppercase leading-tight tracking-[0.06em] text-ink ${
                compactMobile ? "text-base sm:text-xl" : "mt-3 text-2xl sm:text-3xl"
              }`}
            >
              {current.label}
            </h3>
            <p
              className={`mt-2 font-display italic leading-snug text-muted-foreground ${
                compactMobile ? "text-[0.9rem] sm:text-base" : "mt-3 text-base sm:text-lg"
              }`}
            >
              {current.short}
            </p>
            <p
              className={`mt-2.5 whitespace-pre-line leading-relaxed text-ink/80 ${
                compactMobile
                  ? "text-[0.875rem] sm:text-[0.95rem]"
                  : "mt-4 text-[0.95rem] sm:text-base"
              }`}
            >
              {current.body}
            </p>
          </div>

          {/* Progress dots + prev/next stay in the static / reduced-motion map only.
              Scroll-driven sticky chapter uses the single ScrollCue under the map. */}
          {!scrollDriven && (
            <>
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

              <div className="mt-6 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => select((active - 1 + movements.length) % movements.length)}
                  className="min-h-11 rounded-full border border-border px-4 py-2.5 text-xs text-ink transition-colors hover:border-ember hover:text-ember-deep"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => select((active + 1) % movements.length)}
                  className="min-h-11 rounded-full bg-ember px-4 py-2.5 text-xs text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Next movement
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
