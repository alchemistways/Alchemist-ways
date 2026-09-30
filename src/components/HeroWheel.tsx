const C = 200;
const rad = (d: number) => (d * Math.PI) / 180;
const pt = (r: number, deg: number): [number, number] => [
  C + r * Math.cos(rad(deg)),
  C + r * Math.sin(rad(deg)),
];
const f = (n: number) => n.toFixed(2);

/** Arc used as a text baseline. Clockwise arcs keep letter tops outward (upper half);
 *  counter-clockwise arcs keep the lower labels upright. */
function arc(r: number, deg: number, span: number, cw: boolean) {
  const [x1, y1] = pt(r, cw ? deg - span : deg + span);
  const [x2, y2] = pt(r, cw ? deg + span : deg - span);
  return `M ${f(x1)} ${f(y1)} A ${r} ${r} 0 0 ${cw ? 1 : 0} ${f(x2)} ${f(y2)}`;
}

const STAGES = [
  { n: "01", label: "REACTIVITY", word: "Automatic" },
  { n: "02", label: "AWARENESS", word: "Visible" },
  { n: "03", label: "INTEGRATION", word: "Met" },
  { n: "04", label: "SOVEREIGNTY", word: "Choosable" },
  { n: "05", label: "CREATIVE AGENCY", word: "Available" },
];

export function HeroWheel({ className = "" }: { className?: string }) {
  const R_LABEL = 150;
  const R_WORD = 116;
  const R_RING = 88;
  return (
    <svg viewBox="20 20 360 360" className={className} role="img" aria-labelledby="wheel-title">
      <title id="wheel-title">
        The Map: 01 Reactivity (automatic), 02 Awareness (visible), 03 Integration (met), 04
        Sovereignty (choosable), 05 Creative Agency (available).
      </title>
      <defs>
        <marker
          id="wheel-arrow"
          viewBox="0 0 10 10"
          refX="6"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto"
        >
          <path d="M1 1 L7 5 L1 9" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </marker>
        {STAGES.map((s, i) => {
          const deg = -90 + 72 * i;
          const cw = i !== 2 && i !== 3;
          return (
            <g key={s.n}>
              <path id={`wl-${i}`} d={arc(cw ? R_LABEL : R_LABEL + 17, deg, 70, cw)} />
              <path id={`ww-${i}`} d={arc(cw ? R_WORD : R_WORD + 10, deg, 50, cw)} />
            </g>
          );
        })}
      </defs>

      <g className="text-rust" stroke="currentColor" fill="none" strokeWidth="1.3">
        {STAGES.map((_, i) => {
          const a = -90 + 72 * i + 14;
          const b = -90 + 72 * (i + 1) - 14;
          const [x1, y1] = pt(R_RING, a);
          const [x2, y2] = pt(R_RING, b);
          const [xm, ym] = pt(R_RING, (a + b) / 2);
          return (
            <g key={i}>
              <path
                d={`M ${f(x1)} ${f(y1)} A ${R_RING} ${R_RING} 0 0 1 ${f(xm)} ${f(ym)}`}
                markerEnd="url(#wheel-arrow)"
              />
              <path d={`M ${f(xm)} ${f(ym)} A ${R_RING} ${R_RING} 0 0 1 ${f(x2)} ${f(y2)}`} />
            </g>
          );
        })}
      </g>

      <path
        className="fill-rust"
        d="M200 188 C201.2 197 203 198.8 212 200 C203 201.2 201.2 203 200 212 C198.8 203 197 201.2 188 200 C197 198.8 198.8 197 200 188 Z"
      />

      {STAGES.map((s, i) => {
        const [x, y] = pt(R_RING, -90 + 72 * i);
        return (
          <g key={s.n}>
            <text
              x={f(x)}
              y={f(y)}
              dy="0.36em"
              textAnchor="middle"
              className="fill-rust"
              fontSize="15"
              fontWeight="400"
            >
              {s.n}
            </text>
            <text className="fill-rust" fontSize="13" fontStyle="italic" fontWeight="400">
              <textPath href={`#ww-${i}`} startOffset="50%" textAnchor="middle">
                {s.word}
              </textPath>
            </text>
            <text className="fill-ink" fontSize="21" fontWeight="600" letterSpacing="1.2">
              <textPath href={`#wl-${i}`} startOffset="50%" textAnchor="middle">
                {s.label}
              </textPath>
            </text>
          </g>
        );
      })}
    </svg>
  );
}
