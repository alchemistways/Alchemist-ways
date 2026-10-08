/**
 * Vector artwork for the META5 design. Everything here is inline SVG, so it stays sharp at
 * any size and device-pixel-ratio and costs no image requests. The page is prerendered, so
 * the seeded "random" corona rays are computed once at build time and are identical on
 * every load.
 */

/* Deterministic PRNG (mulberry32) so builds are reproducible. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const f1 = (n: number) => Math.round(n * 10) / 10;

/** Radial rays (as one path per opacity band) from radius r0 outwards. */
function rays(seed: number, count: number, r0: number, minLen: number, maxLen: number) {
  const rand = rng(seed);
  const bands = ["", "", ""];
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2 + (rand() - 0.5) * 0.05;
    const long = rand() < 0.1;
    const len = long
      ? maxLen * (0.7 + rand() * 0.3)
      : minLen + rand() ** 1.6 * (maxLen - minLen) * 0.6;
    const s = r0 - 4;
    const e = r0 + len;
    const c = Math.cos(a);
    const sn = Math.sin(a);
    bands[i % 3] += `M${f1(c * s)} ${f1(sn * s)}L${f1(c * e)} ${f1(sn * e)}`;
  }
  return bands;
}

/* ---------------------------------------------------------------- Eclipse */
// TODO(client-asset): vector stand-in for the META5 corona eclipse (no separate file supplied).
export function EclipseArt({ className = "" }: { className?: string }) {
  const r = rays(11, 260, 118, 18, 170);
  return (
    <svg viewBox="-300 -300 600 600" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="ecl-halo" cx="0" cy="0" r="300" gradientUnits="userSpaceOnUse">
          <stop offset="0.38" stopColor="#ffb14a" stopOpacity="1" />
          <stop offset="0.43" stopColor="#ff9b34" stopOpacity="0.7" />
          <stop offset="0.52" stopColor="#ffa44c" stopOpacity="0.32" />
          <stop offset="0.68" stopColor="#ffbb78" stopOpacity="0.1" />
          <stop offset="1" stopColor="#ffd2a0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ecl-fade" cx="0" cy="0" r="300" gradientUnits="userSpaceOnUse">
          <stop offset="0.38" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0.45" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="ecl-mask" maskUnits="userSpaceOnUse" x="-300" y="-300" width="600" height="600">
          <rect x="-300" y="-300" width="600" height="600" fill="url(#ecl-fade)" />
        </mask>
        <radialGradient id="ecl-disk" cx="0" cy="0" r="120" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#040202" />
          <stop offset="0.86" stopColor="#0a0403" />
          <stop offset="1" stopColor="#2c1205" />
        </radialGradient>
        <filter id="ecl-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
        <filter id="ecl-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
      <circle r="300" fill="url(#ecl-halo)" />
      <g mask="url(#ecl-mask)">
        <g filter="url(#ecl-soft)" stroke="#ffc06a" strokeLinecap="round" fill="none">
          <path d={r[0]} strokeWidth="2.2" strokeOpacity="0.42" />
          <path d={r[1]} strokeWidth="1.4" strokeOpacity="0.36" />
          <path d={r[2]} strokeWidth="0.9" strokeOpacity="0.6" />
        </g>
      </g>
      <circle
        r="126"
        fill="none"
        stroke="#ffb54d"
        strokeWidth="16"
        strokeOpacity="0.9"
        filter="url(#ecl-glow)"
      />
      <circle r="121.6" fill="none" stroke="#fff3cf" strokeWidth="2.6" />
      <circle r="120" fill="url(#ecl-disk)" />
    </svg>
  );
}

/* -------------------------------------------------------------------- Sun */
// TODO(client-asset): vector stand-in for the META5 sun (no separate file supplied).
export function SunArt({ className = "" }: { className?: string }) {
  const r = rays(23, 280, 132, 16, 150);
  return (
    <svg viewBox="-300 -300 600 600" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="sun-halo" cx="0" cy="0" r="300" gradientUnits="userSpaceOnUse">
          <stop offset="0.43" stopColor="#ffcf55" stopOpacity="1" />
          <stop offset="0.48" stopColor="#ffa834" stopOpacity="0.72" />
          <stop offset="0.57" stopColor="#ffab4a" stopOpacity="0.34" />
          <stop offset="0.7" stopColor="#ffc07a" stopOpacity="0.1" />
          <stop offset="1" stopColor="#ffd8a8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sun-fade" cx="0" cy="0" r="300" gradientUnits="userSpaceOnUse">
          <stop offset="0.44" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.66" stopColor="#fff" stopOpacity="0.45" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="sun-mask" maskUnits="userSpaceOnUse" x="-300" y="-300" width="600" height="600">
          <rect x="-300" y="-300" width="600" height="600" fill="url(#sun-fade)" />
        </mask>
        <radialGradient id="sun-disk" cx="0" cy="0" r="135" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fffef4" />
          <stop offset="0.2" stopColor="#fff2a2" />
          <stop offset="0.5" stopColor="#ffc531" />
          <stop offset="0.82" stopColor="#f59a0c" />
          <stop offset="0.95" stopColor="#f8b23c" />
          <stop offset="1" stopColor="#ffe08a" />
        </radialGradient>
        <radialGradient id="sun-core" cx="0" cy="0" r="135" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.28" stopColor="#fffbe6" stopOpacity="0.75" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <filter id="sun-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
        <filter id="sun-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        {/* Granulation: fractal noise turned into thin orange-brown veins inside the disk. */}
        <filter
          id="sun-tex"
          x="-10%"
          y="-10%"
          width="120%"
          height="120%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence type="turbulence" baseFrequency="0.055" numOctaves="3" seed="4" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.93  0 0 0 0 0.5  0 0 0 0 0.04  -3.4 0 0 0 1.2"
          />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
        <clipPath id="sun-clip">
          <circle r="135" />
        </clipPath>
      </defs>
      <circle r="300" fill="url(#sun-halo)" />
      <g mask="url(#sun-mask)">
        <g filter="url(#sun-soft)" stroke="#ffdf8a" strokeLinecap="round" fill="none">
          <path d={r[0]} strokeWidth="2.2" strokeOpacity="0.5" />
          <path d={r[1]} strokeWidth="1.4" strokeOpacity="0.42" />
          <path d={r[2]} strokeWidth="0.9" strokeOpacity="0.7" />
        </g>
      </g>
      <circle r="140" fill="none" stroke="#ffd36e" strokeWidth="16" filter="url(#sun-glow)" />
      <circle r="135" fill="url(#sun-disk)" />
      <g clipPath="url(#sun-clip)">
        <circle r="135" fill="#fff" filter="url(#sun-tex)" opacity="0.55" />
        <circle r="135" fill="url(#sun-core)" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------ Wave circle */
// TODO(client-asset): vector stand-in for the META5 "Opening" waveform circle.
function wavePath() {
  const rand = rng(5);
  const [p0, p1, p2, p3] = [0, 1, 2, 3].map(() => rand() * Math.PI * 2) as [
    number,
    number,
    number,
    number,
  ];
  const pts: string[] = [];
  const R = 100;
  for (let d = 0; d <= 360; d += 0.75) {
    // d in screen degrees (0 = right, 90 = bottom). Jagged from ~110° to ~250°, gentle bumps to ~300°.
    let amp = 0;
    if (d > 104 && d < 256) amp = Math.sin(((d - 104) / 152) * Math.PI) ** 0.6 * 44;
    let bump = 0;
    if (d >= 236 && d <= 312) bump = Math.abs(Math.sin(((d - 236) / 76) * Math.PI * 3)) * 11;
    const jag =
      Math.abs(Math.sin((d * Math.PI) / 6.4 + p0)) ** 2.2 * 0.85 +
      Math.abs(Math.sin((d * Math.PI) / 3.7 + p1)) ** 3 * 0.45 +
      0.25 * Math.sin((d * Math.PI) / 2.3 + p2);
    const slow = Math.sin((d * Math.PI) / 9 + p3);
    const r = R + amp * (jag - 0.15) + bump * (0.6 + 0.4 * slow) * (d > 240 ? 1 : 0);
    const a = (d * Math.PI) / 180;
    pts.push(`${f1(Math.cos(a) * r)} ${f1(Math.sin(a) * r)}`);
  }
  return `M${pts.join("L")}Z`;
}

export function WaveCircleArt({ className = "" }: { className?: string }) {
  const d = wavePath();
  return (
    <svg viewBox="-160 -160 320 320" className={className} aria-hidden="true" focusable="false">
      <defs>
        <filter id="wave-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.2" />
        </filter>
        <radialGradient id="wave-dot" cx="0" cy="0" r="10" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#a63a05" />
          <stop offset="0.55" stopColor="#e9780f" />
          <stop offset="0.85" stopColor="#ffc35a" />
          <stop offset="1" stopColor="#ffb040" />
        </radialGradient>
      </defs>
      <g fill="none" strokeLinejoin="round">
        <path
          d={d}
          stroke="#ff9a2e"
          strokeWidth="7"
          strokeOpacity="0.55"
          filter="url(#wave-glow)"
        />
        <path d={d} stroke="#f59220" strokeWidth="3.4" />
        <path d={d} stroke="#6b2203" strokeWidth="1.1" />
      </g>
      <circle r="15" fill="#ffad42" opacity="0.7" filter="url(#wave-glow)" />
      <circle r="10" fill="url(#wave-dot)" />
    </svg>
  );
}

/* --------------------------------------------------------------- Play icon */
export function PlayIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 70" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="play-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f7d27a" />
          <stop offset="1" stopColor="#d9a03c" />
        </linearGradient>
        <linearGradient id="play-left" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#b8791f" />
          <stop offset="1" stopColor="#e3ac4a" />
        </linearGradient>
        <linearGradient id="play-bottom" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#7a4410" />
          <stop offset="1" stopColor="#b97a24" />
        </linearGradient>
      </defs>
      <path d="M2 2 L58 35 L20 35 Z" fill="url(#play-top)" />
      <path d="M2 2 L20 35 L2 68 Z" fill="url(#play-left)" />
      <path d="M2 68 L20 35 L58 35 Z" fill="url(#play-bottom)" />
    </svg>
  );
}

/* --------------------------------------------------------------- Line icons */
const ICON_PATHS = {
  presence: (
    <>
      <path d="M4 11.5C7.6 6.6 11.6 4.5 16 4.5s8.4 2.1 12 7c-3.6 4.9-7.6 7-12 7s-8.4-2.1-12-7Z" />
      <circle cx="16" cy="11.5" r="3.6" />
      <path d="M5 21.5c2.2-1.6 4.4-1.6 6.6 0s4.4 1.6 6.6 0 4.4-1.6 6.6 0 2.2 1.6 3.2.8" />
      <path d="M5 25.5c2.2-1.6 4.4-1.6 6.6 0s4.4 1.6 6.6 0 4.4-1.6 6.6 0 2.2 1.6 3.2.8" />
      <path d="M5 29.3c2.2-1.6 4.4-1.6 6.6 0s4.4 1.6 6.6 0 4.4-1.6 6.6 0 2.2 1.6 3.2.8" />
    </>
  ),
  receiving: (
    <>
      <path d="M8.6 29.5v-4.6C6 22.4 4.4 18.8 4 14.2c-.1-1.5 1.9-1.9 2.3-.4l1.1 4.4" />
      <path d="M7.4 18.2 6.6 9.6c-.1-1.5 2-1.8 2.2-.2l.9 7" />
      <path d="M9.7 16.4 9.5 7.3c0-1.5 2.1-1.5 2.2 0l.3 8.6" />
      <path d="M12 15.9l.3-6c.1-1.4 2-1.2 2 .2v8.7c0 2.3-.8 4.2-2 5.9v4.8" />
      <g transform="matrix(-1 0 0 1 32 0)">
        <path d="M8.6 29.5v-4.6C6 22.4 4.4 18.8 4 14.2c-.1-1.5 1.9-1.9 2.3-.4l1.1 4.4" />
        <path d="M7.4 18.2 6.6 9.6c-.1-1.5 2-1.8 2.2-.2l.9 7" />
        <path d="M9.7 16.4 9.5 7.3c0-1.5 2.1-1.5 2.2 0l.3 8.6" />
        <path d="M12 15.9l.3-6c.1-1.4 2-1.2 2 .2v8.7c0 2.3-.8 4.2-2 5.9v4.8" />
      </g>
    </>
  ),
  authenticity: (
    <>
      <path d="M16 27c-3.6-3.2-4.6-7.4-3.2-11.6C13.6 13 14.6 11 16 9c1.4 2 2.4 4 3.2 6.4 1.4 4.2.4 8.4-3.2 11.6Z" />
      <path d="M16 27c-4.8.2-8.7-1.4-10.5-5-.9-1.8-1.3-3.6-1.4-5.6 3.9.3 7.3 1.9 9.4 4.6" />
      <path d="M16 27c4.8.2 8.7-1.4 10.5-5 .9-1.8 1.3-3.6 1.4-5.6-3.9.3-7.3 1.9-9.4 4.6" />
    </>
  ),
  relational: (
    <>
      <circle cx="11.6" cy="16" r="7.6" />
      <circle cx="20.4" cy="16" r="7.6" />
    </>
  ),
  creative: (
    <path d="M16 16c-2.6-3.2-5.2-5.4-8.4-5.4a5.4 5.4 0 0 0 0 10.8c3.2 0 5.8-2.2 8.4-5.4s5.2-5.4 8.4-5.4a5.4 5.4 0 0 1 0 10.8c-3.2 0-5.8-2.2-8.4-5.4Z" />
  ),
} as const;

export type IconName = keyof typeof ICON_PATHS;

export function LineIcon({ name, className = "" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}
