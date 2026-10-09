import { STAGES } from "../content/stages";

/**
 * The Map diagram beside the book in the hero (thin red circle, arrows, grey italic numbers,
 * compass star, small-caps labels with red italic words), drawn as vector so it stays sharp at
 * every size and DPR. Two geometries share one drawing:
 * - "wide"   mirrors the client mockup proportions (desktop, on the aspect-locked stage);
 * - "compact" enlarges the labels relative to the ring so they stay legible on phones/tablets.
 */
type Label = { x: number; y: number; anchor: "start" | "middle" | "end"; lines: string[] };
type Geometry = {
  viewBox: string;
  R: number;
  num: number;
  label: number;
  word: number;
  gap: number;
  step: number;
  star: number;
  labels: Label[];
};

const ANG = [-90, -18, 54, 126, 198] as const; // screen degrees, clockwise from 3 o’clock

const WIDE: Geometry = {
  viewBox: "-195 -140 390 240",
  R: 83,
  num: 19,
  label: 10.8,
  word: 11.8,
  gap: 12,
  step: 13,
  star: 13,
  labels: [
    { x: 0, y: -117, anchor: "middle", lines: ["Reactivity"] },
    { x: 136, y: -30, anchor: "middle", lines: ["Awareness"] },
    { x: 112, y: 73, anchor: "middle", lines: ["Integration"] },
    { x: -110, y: 74, anchor: "middle", lines: ["Sovereignty"] },
    { x: -139, y: -30, anchor: "middle", lines: ["Creative Agency"] },
  ],
};

const COMPACT: Geometry = {
  viewBox: "-170 -122 340 216",
  R: 70,
  num: 17,
  label: 12,
  word: 13,
  gap: 13,
  step: 15,
  star: 12,
  labels: [
    { x: 0, y: -104, anchor: "middle", lines: ["Reactivity"] },
    { x: 84, y: -26, anchor: "start", lines: ["Awareness"] },
    { x: 54, y: 70, anchor: "start", lines: ["Integration"] },
    { x: -54, y: 70, anchor: "end", lines: ["Sovereignty"] },
    { x: -84, y: -40, anchor: "end", lines: ["Creative", "Agency"] },
  ],
};

const rad = (d: number) => (d * Math.PI) / 180;
const r1 = (n: number) => Math.round(n * 100) / 100;
const pt = (d: number, r: number) => [r1(Math.cos(rad(d)) * r), r1(Math.sin(rad(d)) * r)] as const;

function star(long: number) {
  const short = long * 0.42;
  const inner = long * 0.15;
  const p: string[] = [];
  for (let i = 0; i < 16; i++) {
    const a = rad(-90 + i * 22.5);
    const r = i % 4 === 0 ? long : i % 2 === 0 ? short : inner;
    p.push(`${r1(Math.cos(a) * r)} ${r1(Math.sin(a) * r)}`);
  }
  return `M${p.join("L")}Z`;
}

export function HeroDiagram({
  variant = "wide",
  className = "",
}: {
  variant?: "wide" | "compact";
  className?: string;
}) {
  const g = variant === "wide" ? WIDE : COMPACT;
  const { R } = g;
  const arcs = ANG.map((a, i) => {
    const b = (i === 4 ? ANG[0] + 360 : ANG[i + 1]) as number;
    const [x0, y0] = pt(a + g.gap, R);
    const [x1, y1] = pt(b - g.gap, R);
    // arrowhead at the middle of the arc, pointing clockwise
    const m = (a + b) / 2;
    const [mx, my] = pt(m, R);
    return {
      d: `M${x0} ${y0}A${R} ${R} 0 0 1 ${x1} ${y1}`,
      arrow: { x: mx, y: my, rot: r1(m + 90) },
    };
  });
  return (
    <svg
      viewBox={g.viewBox}
      className={className}
      role="img"
      aria-label={`The Map: ${STAGES.map((s) => `${Number(s.n)} ${s.label}, ${s.word.toLowerCase()}`).join("; ")}.`}
    >
      <g fill="none" stroke="#d6452a" strokeWidth="1.05" strokeLinecap="round">
        {arcs.map((a) => (
          <path key={a.d} d={a.d} />
        ))}
      </g>
      <g fill="#d6452a">
        {arcs.map((a) => (
          <path
            key={`a${a.d}`}
            d="M3.6 0L-2.6 -3L-1.2 0L-2.6 3Z"
            transform={`translate(${a.arrow.x} ${a.arrow.y}) rotate(${a.arrow.rot})`}
          />
        ))}
        <path d={star(g.star)} />
      </g>
      <g
        fill="#9a9592"
        fontFamily="Figtree, ui-sans-serif, system-ui, sans-serif"
        fontStyle="italic"
        fontWeight="600"
        fontSize={g.num}
        textAnchor="middle"
      >
        {STAGES.map((s, i) => {
          const [x, y] = pt(ANG[i] ?? 0, R);
          return (
            <text key={s.n} x={x} y={r1(y + g.num * 0.36)}>
              {Number(s.n)}
            </text>
          );
        })}
      </g>
      <g fontFamily="Newsreader, ui-serif, Georgia, serif">
        {STAGES.map((s, i) => {
          const l = g.labels[i];
          if (!l) return null;
          return (
            <g key={s.label} textAnchor={l.anchor}>
              {l.lines.map((line, j) => (
                <text
                  key={line}
                  x={l.x}
                  y={l.y + j * g.label * 1.15}
                  fontSize={g.label}
                  fontWeight="600"
                  letterSpacing={g.label * 0.04}
                  fill="#26221f"
                >
                  {line.toUpperCase()}
                </text>
              ))}
              <text
                x={l.x}
                y={r1(l.y + (l.lines.length - 1) * g.label * 1.15 + g.word * 1.22)}
                fontSize={g.word}
                fontStyle="italic"
                fontWeight="500"
                fill="#cf3a1d"
              >
                {s.word}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
