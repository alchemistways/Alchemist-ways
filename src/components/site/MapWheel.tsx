import { Star } from "./primitives";

export type WheelNode = {
  n: string;
  title: string;
  sub: string;
  side: "top" | "right" | "left";
};

const ANGLES = [-90, -18, 54, 126, 198];

function ArcArrows() {
  // arrowheads sit between the nodes, following the clockwise flow
  const mids = [-54, 18, 90, 162, 234];
  return (
    <>
      {mids.map((a) => {
        const rad = (a * Math.PI) / 180;
        const x = 50 + 42 * Math.cos(rad);
        const y = 50 + 42 * Math.sin(rad);
        return (
          <polygon
            key={a}
            points="0,-1.5 2.4,0 0,1.5"
            fill="currentColor"
            transform={`translate(${x} ${y}) rotate(${a + 90})`}
          />
        );
      })}
    </>
  );
}

export default function MapWheel({
  nodes,
  compact = false,
}: {
  nodes: WheelNode[];
  compact?: boolean;
}) {
  return (
    <div className="flex justify-center">
      {/* Circular diagram — shown on every screen size */}
      <div
        className={`relative aspect-square w-full max-w-[10.5rem] xs:max-w-[11.5rem] sm:max-w-[20rem] ${
          compact ? "lg:max-w-[22rem] xl:max-w-[26rem]" : "lg:max-w-[34rem]"
        }`}
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full text-ember">
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.35" />
          {[6, 9.5, 13, 16.5, 20, 23.5].map((r) => (
            <circle
              key={r}
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.18"
              opacity="0.22"
            />
          ))}
          <ArcArrows />
        </svg>

        <Star className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-ember sm:h-7 sm:w-7" />

        {nodes.map((node, i) => {
          const angle = ANGLES[i] ?? -90;
          const rad = (angle * Math.PI) / 180;
          const left = 50 + 42 * Math.cos(rad);
          const top = 50 + 42 * Math.sin(rad);
          const labelW = compact
            ? "w-[5.25rem] sm:w-40 lg:w-44"
            : "w-[5.25rem] sm:w-44 lg:w-56";
          return (
            <div
              key={node.n}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <div className="relative">
                <div
                  className={`grid place-items-center rounded-full bg-ember-soft font-serif text-ember ${
                    compact
                      ? "h-8 w-8 text-[0.8rem] sm:h-10 sm:w-10 sm:text-base lg:h-11 lg:w-11"
                      : "h-8 w-8 text-[0.8rem] sm:h-11 sm:w-11 sm:text-base lg:h-12 lg:w-12 lg:text-lg"
                  }`}
                >
                  {node.n}
                </div>
                <div
                  className={
                    node.side === "top"
                      ? `absolute bottom-full left-1/2 mb-2 -translate-x-1/2 text-center sm:mb-3 ${labelW}`
                      : node.side === "right"
                        ? `absolute left-full top-1/2 ml-1.5 -translate-y-1/2 text-left sm:ml-3 ${labelW}`
                        : `absolute right-full top-1/2 mr-1.5 -translate-y-1/2 text-right sm:mr-3 ${labelW}`
                  }
                >
                  <p
                    className={`eyebrow text-ink text-[0.5rem] leading-[1.15] sm:text-[0.7rem] ${
                      compact ? "" : "lg:text-sm"
                    }`}
                  >
                    {node.title}
                  </p>
                  {node.sub && (
                    <p
                      className={`mt-0.5 font-serif italic text-ember text-[0.6rem] leading-[1.15] sm:text-[0.95rem] sm:leading-5 ${
                        compact ? "" : "lg:text-base"
                      }`}
                    >
                      {node.sub}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
