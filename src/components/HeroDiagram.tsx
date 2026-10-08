/**
 * The Map diagram beside the book in the hero, redrawn as vector from the META5 design
 * (sharp at any DPR). Labels are live SVG text set in Newsreader.
 */
export const STAGES = [
  { n: "01", label: "Reactivity", word: "Automatic" },
  { n: "02", label: "Awareness", word: "Visible" },
  { n: "03", label: "Integration", word: "Met" },
  { n: "04", label: "Sovereignty", word: "Choosable" },
  { n: "05", label: "Creative Agency", word: "Available" },
] as const;

const R = 95; // ring radius (node centres)
const NODE = 19; // node circle radius
const ANG: [number, ...number[]] = [-90, -18, 54, 126, 198]; // screen degrees, clockwise from 3 o’clock
// Label anchor positions (centre of the label block), from the META5 layout.
const LABELS: [number, number, boolean][] = [
  [0, -137, false],
  [168, -44, true],
  [150, 68, true],
  [-138, 68, true],
  [-170, -44, true],
];

const rad = (d: number) => (d * Math.PI) / 180;
const pt = (d: number, r = R) => [Math.cos(rad(d)) * r, Math.sin(rad(d)) * r] as const;
const r1 = (n: number) => Math.round(n * 10) / 10;

function arc(from: number, to: number) {
  const gap = 15.5;
  const a = pt(from + gap);
  const b = pt(to - gap);
  return `M${r1(a[0])} ${r1(a[1])}A${R} ${R} 0 0 1 ${r1(b[0])} ${r1(b[1])}`;
}

function star(long: number, short: number) {
  const p: string[] = [];
  for (let i = 0; i < 16; i++) {
    const a = rad(-90 + i * 22.5);
    const r = i % 4 === 0 ? long : i % 2 === 0 ? short : 3.2;
    p.push(`${r1(Math.cos(a) * r)} ${r1(Math.sin(a) * r)}`);
  }
  return `M${p.join("L")}Z`;
}

export function HeroDiagram({
  className = "",
  idPrefix = "hd",
}: {
  className?: string;
  idPrefix?: string;
}) {
  const arrow = `${idPrefix}-arrow`;
  const glow = `${idPrefix}-glow`;
  const titleId = `${idPrefix}-title`;
  return (
    <svg viewBox="-245 -165 490 300" className={className} role="img" aria-labelledby={titleId}>
      <title id={titleId}>
        The Map: 01 Reactivity (automatic), 02 Awareness (visible), 03 Integration (met), 04
        Sovereignty (choosable), 05 Creative Agency (available).
      </title>
      <defs>
        <marker
          id={arrow}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 1 L10 5 L0 9 L2.6 5 Z" fill="#e0421c" />
        </marker>
        <filter id={glow} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* centre: faint rings, four dots and the compass star */}
      <g fill="none" stroke="#e7a88e" strokeOpacity="0.55" strokeWidth="0.9">
        <circle r="56" />
        <circle r="40" strokeOpacity="0.35" />
      </g>
      <g fill="#e0421c">
        <circle cx="0" cy="-48" r="1.8" />
        <circle cx="0" cy="48" r="1.8" />
        <circle cx="-56" cy="0" r="1.8" />
        <circle cx="56" cy="0" r="1.8" />
      </g>
      <path d={star(32, 15)} fill="#e8481e" />
      <path d={star(32, 15)} fill="none" stroke="#b9300f" strokeWidth="0.6" strokeOpacity="0.6" />

      {/* ring arcs with arrowheads, clockwise 01 → 05 → 01 */}
      <g fill="none" stroke="#e0421c" strokeWidth="1.6" strokeLinecap="round">
        {ANG.map((a, i) => (
          <path
            key={a}
            d={arc(a, i === 4 ? ANG[0] + 360 : (ANG[i + 1] ?? 0))}
            markerEnd={`url(#${arrow})`}
          />
        ))}
      </g>

      {/* numbered nodes */}
      {STAGES.map((s, i) => {
        const [x, y] = pt(ANG[i] ?? 0);
        return (
          <g key={s.n} transform={`translate(${r1(x)} ${r1(y)})`}>
            <circle r={NODE + 5} fill="#fff" opacity="0.55" filter={`url(#${glow})`} />
            <circle r={NODE} fill="#f9d6cb" stroke="#fff" strokeOpacity="0.85" strokeWidth="1.2" />
            <text
              y="6"
              textAnchor="middle"
              fontFamily="Newsreader, Georgia, serif"
              fontStyle="italic"
              fontWeight="500"
              fontSize="18"
              fill="#df3d17"
            >
              {s.n}
            </text>
          </g>
        );
      })}

      {/* labels */}
      {STAGES.map((s, i) => {
        const [x, y, rule] = LABELS[i] ?? [0, 0, false];
        return (
          <g key={s.label} transform={`translate(${x} ${y})`} textAnchor="middle">
            <text
              fontFamily="Newsreader, Georgia, serif"
              fontWeight="500"
              fontSize="15.5"
              letterSpacing="0.6"
              fill="#25211d"
            >
              {s.label.toUpperCase()}
            </text>
            <text
              y="19"
              fontFamily="Newsreader, Georgia, serif"
              fontStyle="italic"
              fontWeight="500"
              fontSize="14.5"
              fill="#d8361a"
            >
              {s.word}
            </text>
            {rule && <path d="M-15 35.5H15" stroke="#d8361a" strokeWidth="1" />}
          </g>
        );
      })}
    </svg>
  );
}
