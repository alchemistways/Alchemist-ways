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
const NODE_R = 3.3; // node radius in viewBox units (circle ≈ 6.6% of the artwork width)

/** Double-headed, gently bowed connectors between neighbouring nodes (as in the design). */
function arrows() {
  return nodes.map((p, i) => {
    const q = nodes[(i + 1) % nodes.length]!;
    const dx = q.x - p.x;
    const dy = q.y - p.y;
    const len = Math.hypot(dx, dy);
    const ux = dx / len;
    const uy = dy / len;
    const trim = NODE_R + 0.5;
    const s = { x: p.x + ux * trim, y: p.y + uy * trim };
    const e = { x: q.x - ux * trim, y: q.y - uy * trim };
    const mx = (p.x + q.x) / 2;
    const my = (p.y + q.y) / 2;
    const ox = mx - c.x;
    const oy = my - c.y;
    const ol = Math.hypot(ox, oy);
    const k = len * 0.12;
    const cx = mx + (ox / ol) * k;
    const cy = my + (oy / ol) * k;
    return `M ${s.x.toFixed(2)} ${s.y.toFixed(2)} Q ${cx.toFixed(2)} ${cy.toFixed(2)} ${e.x.toFixed(2)} ${e.y.toFixed(2)}`;
  });
}

/** Five-stage diagram laid over the circle of people in the Map artwork. */
export function MapDiagram({ markerId = "map-arrow" }: { markerId?: string }) {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <svg
        viewBox={`0 0 ${W} ${H.toFixed(2)}`}
        className="absolute inset-0 h-full w-full text-[#e0432a]"
      >
        <defs>
          <marker
            id={markerId}
            viewBox="0 0 10 10"
            refX="7"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M1 1.5 L9 5 L1 8.5 Z" fill="currentColor" />
          </marker>
        </defs>
        {arrows().map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.13"
            markerStart={`url(#${markerId})`}
            markerEnd={`url(#${markerId})`}
          />
        ))}
        <g transform={`translate(${c.x} ${c.y}) scale(0.13)`} fill="currentColor">
          <path d="M0 -14 L2 -2 L14 0 L2 2 L0 14 L-2 2 L-14 0 L-2 -2 Z" />
          <path
            d="M0 -7 L1.2 -1.2 L7 0 L1.2 1.2 L0 7 L-1.2 1.2 L-7 0 L-1.2 -1.2 Z"
            transform="rotate(45)"
          />
        </g>
      </svg>
      {MAP_STAGES.map((s) => (
        <div
          key={s.n}
          className="absolute flex aspect-square -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-[#fcefe2]/92 text-center shadow-[0_6px_18px_rgb(120_70_20/0.18)]"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: "max(6.6cqw, 72px)" }}
        >
          <span
            className="px-1 leading-[1.15] font-semibold text-ink"
            style={{ fontSize: "max(0.66cqw, 9px)" }}
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
          <span
            className="mt-0.5 font-medium text-[#e0432a] italic"
            style={{ fontSize: "max(0.66cqw, 9px)" }}
          >
            {s.word}
          </span>
        </div>
      ))}
    </div>
  );
}
