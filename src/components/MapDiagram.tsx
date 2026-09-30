// Node positions are percentages of the Map artwork (1672 × 941), traced from the design.
const W = 100;
const H = (941 / 1672) * 100;
const CENTER = { x: 61.4, y: 43.5 };

export const MAP_STAGES = [
  {
    n: "01",
    label: "REACTIVITY",
    word: "Automatic",
    x: 61.4,
    y: 28,
    text: "The pattern is happening before you can see it.",
  },
  {
    n: "02",
    label: "AWARENESS",
    word: "Visible",
    x: 71,
    y: 40,
    text: "What was automatic becomes something you can observe.",
  },
  {
    n: "03",
    label: "INTEGRATION",
    word: "Met",
    x: 67.2,
    y: 56.5,
    text: "What became visible can be met differently.",
  },
  {
    n: "04",
    label: "SOVEREIGNTY",
    word: "Choosable",
    x: 55,
    y: 56.5,
    text: "What once chose for you no longer has to choose for you.",
  },
  {
    n: "05",
    label: "CREATIVE AGENCY",
    word: "Available",
    x: 51.8,
    y: 40,
    text: "What becomes available when protection no longer has to lead.",
  },
];

const toUnits = (x: number, y: number) => ({ x: (x / 100) * W, y: (y / 100) * H });
const c = toUnits(CENTER.x, CENTER.y);
const nodes = MAP_STAGES.map((s) => {
  const p = toUnits(s.x, s.y);
  return { ...p, a: Math.atan2(p.y - c.y, p.x - c.x) };
});
const R = nodes.reduce((sum, p) => sum + Math.hypot(p.x - c.x, p.y - c.y), 0) / nodes.length;
const GAP = 0.5; // radians trimmed either side of each node

function arrows() {
  return nodes.map((p, i) => {
    const q = nodes[(i + 1) % nodes.length]!;
    const a1 = p.a + GAP;
    let a2 = q.a - GAP;
    if (a2 < a1) a2 += Math.PI * 2;
    const s = { x: c.x + R * Math.cos(a1), y: c.y + R * Math.sin(a1) };
    const e = { x: c.x + R * Math.cos(a2), y: c.y + R * Math.sin(a2) };
    return `M ${s.x.toFixed(2)} ${s.y.toFixed(2)} A ${R.toFixed(2)} ${R.toFixed(2)} 0 0 1 ${e.x.toFixed(2)} ${e.y.toFixed(2)}`;
  });
}

/** Five-stage diagram laid over the circle of people in the Map artwork. */
export function MapDiagram() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <svg
        viewBox={`0 0 ${W} ${H.toFixed(2)}`}
        className="absolute inset-0 h-full w-full text-rust"
      >
        <defs>
          <marker
            id="map-arrow"
            viewBox="0 0 10 10"
            refX="7"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M1 1 L8 5 L1 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </marker>
        </defs>
        {arrows().map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.14"
            markerEnd="url(#map-arrow)"
          />
        ))}
        <path
          transform={`translate(${c.x} ${c.y}) scale(0.11)`}
          fill="currentColor"
          d="M0 -12 C1.2 -3 3 -1.2 12 0 C3 1.2 1.2 3 0 12 C-1.2 3 -3 1.2 -12 0 C-3 -1.2 -1.2 -3 0 -12 Z"
        />
      </svg>
      {MAP_STAGES.map((s) => (
        <div
          key={s.n}
          className="absolute flex aspect-square -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-[#fbf3e6]/95 text-center shadow-[0_6px_18px_rgb(120_70_20/0.18)]"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: "max(6.6cqw, 70px)" }}
        >
          <span
            className="px-1 leading-[1.15] font-semibold text-ink"
            style={{ fontSize: "max(0.7cqw, 9px)" }}
          >
            {s.label === "CREATIVE AGENCY" ? (
              <>
                CREATIVE
                <br />
                AGENCY
              </>
            ) : (
              s.label
            )}
          </span>
          <span className="mt-0.5 text-rust italic" style={{ fontSize: "max(0.66cqw, 9px)" }}>
            {s.word}
          </span>
        </div>
      ))}
    </div>
  );
}
