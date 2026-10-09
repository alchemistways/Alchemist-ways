import type { CSSProperties } from "react";

import { STAGES } from "../content/stages";

/**
 * The Map diagram beside the book in the hero (thin red circle, mid-arc arrows, grey italic
 * numbers on the ring, compass star, small-caps labels with red italic words), drawn as vector
 * so it stays sharp at every size and DPR.
 *
 * Everything is derived from the ring geometry, so it stays aligned and symmetric: the five
 * stations sit at equal 72° steps, the numbers are centred on them, the arcs leave the same gap
 * either side of every number with the arrowhead at the exact middle, and every label block sits
 * the same distance out from its number along the same radius. The viewBox is symmetric about
 * the ring centre, so the circle is the visual centre of the element.
 *
 * "wide" follows the mockup proportions (desktop stage); "compact" enlarges the labels relative
 * to the ring (and breaks “Creative Agency” over two lines) so they stay legible on phones.
 */
type Geometry = {
  R: number; // ring radius (number centres)
  num: number; // number font size
  label: number; // small-caps label size
  word: number; // italic word size
  gap: number; // distance from the number’s edge to its label block
  arcGap: number; // degrees of ring left open either side of each number
  star: number; // compass star radius
  halfW: number; // half viewBox width (symmetric about the centre)
  top: number;
  bottom: number;
  split: boolean; // “Creative Agency” on two lines
};

export const DIAGRAM = {
  wide: {
    R: 83,
    num: 19,
    label: 10.8,
    word: 11.8,
    gap: 9,
    arcGap: 11,
    star: 13,
    halfW: 216,
    top: -132,
    bottom: 104,
    split: false,
  },
  compact: {
    R: 66,
    num: 17,
    label: 12,
    word: 13,
    gap: 8,
    arcGap: 13,
    star: 11,
    halfW: 166,
    top: -116,
    bottom: 92,
    split: true,
  },
} satisfies Record<string, Geometry>;

const ANG = [-90, -18, 54, 126, 198] as const; // screen degrees, clockwise from 3 o’clock
const RED = "#d6452a";

const rad = (d: number) => (d * Math.PI) / 180;
const r2 = (n: number) => Math.round(n * 100) / 100;
const pt = (d: number, r: number) => [r2(Math.cos(rad(d)) * r), r2(Math.sin(rad(d)) * r)] as const;

function star(long: number) {
  const short = long * 0.42;
  const inner = long * 0.15;
  const p: string[] = [];
  for (let i = 0; i < 16; i++) {
    const a = rad(-90 + i * 22.5);
    const r = i % 4 === 0 ? long : i % 2 === 0 ? short : inner;
    p.push(`${r2(Math.cos(a) * r)} ${r2(Math.sin(a) * r)}`);
  }
  return `M${p.join("L")}Z`;
}

export function HeroDiagram({
  variant = "wide",
  className = "",
  style,
}: {
  variant?: keyof typeof DIAGRAM;
  className?: string;
  style?: CSSProperties;
}) {
  const g: Geometry = DIAGRAM[variant];
  const { R } = g;
  const reach = R + g.num * 0.5 + g.gap; // label distance from the centre, same for all five
  const lineH = g.label * 1.2;
  return (
    <svg
      viewBox={`${-g.halfW} ${g.top} ${g.halfW * 2} ${g.bottom - g.top}`}
      className={className}
      style={style}
      role="img"
      aria-label={`The Map: ${STAGES.map((s) => `${Number(s.n)} ${s.label}, ${s.word.toLowerCase()}`).join("; ")}.`}
    >
      <g fill="none" stroke={RED} strokeWidth="1.1" strokeLinecap="round">
        {ANG.map((a) => {
          const [x0, y0] = pt(a + g.arcGap, R);
          const [x1, y1] = pt(a + 72 - g.arcGap, R);
          return <path key={a} d={`M${x0} ${y0}A${R} ${R} 0 0 1 ${x1} ${y1}`} />;
        })}
      </g>
      <g fill={RED}>
        {ANG.map((a) => {
          const m = a + 36; // exact middle of the arc
          const [x, y] = pt(m, R);
          return (
            <path
              key={a}
              d="M3.4 0L-2.6 -2.9L-1.3 0L-2.6 2.9Z"
              transform={`translate(${x} ${y}) rotate(${m + 90})`}
            />
          );
        })}
        <path d={star(g.star)} />
      </g>
      <g
        fill="#9a9592"
        fontFamily="Figtree, ui-sans-serif, system-ui, sans-serif"
        fontStyle="italic"
        fontWeight="600"
        fontSize={g.num}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {STAGES.map((s, i) => {
          const [x, y] = pt(ANG[i] ?? 0, R);
          return (
            <text key={s.n} x={x} y={y}>
              {Number(s.n)}
            </text>
          );
        })}
      </g>
      <g fontFamily="Newsreader, ui-serif, Georgia, serif" dominantBaseline="central">
        {STAGES.map((s, i) => {
          const a = ANG[i] ?? 0;
          const lines =
            g.split && s.label.includes(" ")
              ? s.label.toUpperCase().split(" ")
              : [s.label.toUpperCase()];
          const rows = lines.length + 1; // label line(s) + italic word
          const blockH = (rows - 1) * lineH;
          const c = Math.cos(rad(a));
          const top = a === -90;
          const anchor = top ? "middle" : c > 0 ? "start" : "end";
          // Block centre: on the label radius; the top label sits with its bottom row there.
          const [ax, ay0] = pt(a, reach);
          const ay = top ? ay0 - blockH / 2 - lineH * 0.35 : ay0;
          const y0 = ay - blockH / 2;
          return (
            <g key={s.label} textAnchor={anchor}>
              {lines.map((line, j) => (
                <text
                  key={line}
                  x={ax}
                  y={r2(y0 + j * lineH)}
                  fontSize={g.label}
                  fontWeight="600"
                  letterSpacing={r2(g.label * 0.04)}
                  fill="#26221f"
                >
                  {line}
                </text>
              ))}
              <text
                x={ax}
                y={r2(y0 + lines.length * lineH)}
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
