import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "../components/SiteHeader";
import { HeroWheel } from "../components/HeroWheel";
import { MapDiagram, MAP_STAGES } from "../components/MapDiagram";
import { LINKS } from "../content/links";

import hero from "../assets/hero.webp";
import hero900 from "../assets/hero-900.webp";
import eclipse from "../assets/eclipse.webp";
import mapArt from "../assets/map.webp";
import mapArt900 from "../assets/map-900.webp";
import available from "../assets/available.webp";
import available900 from "../assets/available-900.webp";
import founder from "../assets/founder.webp";
import dunes from "../assets/begin-dunes.webp";
import dunes900 from "../assets/begin-dunes-900.webp";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 bg-white px-4 py-2 focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Triggered />
        <Adapt />
        <Automatic />
        <Visible />
        <TheMap />
        <Available />
        <Founder />
        <Begin />
      </main>
      <footer className="relative bg-white py-16 text-center md:py-24">
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
          aria-hidden="true"
        />
        <p className="font-display text-base tracking-[0.32em] text-ink uppercase md:text-lg">
          Welcome to Alchemist Ways
        </p>
      </footer>
    </>
  );
}

/* ---------- 1. Hero ---------- */
function Tagline({ className = "" }: { className?: string }) {
  return (
    <p
      className={`text-[13px] font-semibold tracking-tight text-ink uppercase sm:text-[15px] lg:text-[clamp(13px,1.05vw,19px)] ${className}`}
    >
      <span className="whitespace-nowrap">
        From what <em className="text-rust">moves you</em>
      </span>{" "}
      <span aria-hidden="true" className="mx-1 inline-block text-rust">
        ⟶
      </span>{" "}
      <span className="whitespace-nowrap">
        to what <em className="text-rust">moves through you</em>
      </span>
    </p>
  );
}

function HeroButtons() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
      <a
        href={LINKS.getTheBook}
        className="btn-pill min-w-[150px] lg:min-w-[clamp(150px,12vw,220px)]"
      >
        Get the book
      </a>
      <a
        href={LINKS.exploreTheMap}
        className="btn-solid min-w-[150px] lg:min-w-[clamp(150px,12vw,220px)]"
      >
        Explore the map
      </a>
    </div>
  );
}

function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative bg-[#f1e6d6] lg:h-[max(600px,55.68vw)] lg:overflow-hidden"
    >
      <h1 id="hero-title" className="sr-only">
        Alchemist Ways. Meet Yourself, Differently. A map from emotional reactivity to creative
        agency.
      </h1>
      <div className="relative lg:static">
        <picture>
          <source media="(max-width: 900px)" srcSet={hero900} />
          <img
            src={hero}
            alt="The book Meet Yourself, Differently. A Map from Emotional Reactivity to Creative Agency, by Malek Najm Ghaleb, standing on a sunlit surface."
            width={1686}
            height={933}
            fetchPriority="high"
            className="block aspect-square w-full object-cover object-[22%_62%] sm:aspect-[16/10] sm:object-[20%_60%] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full lg:object-[left_center]"
          />
        </picture>
        <div
          className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-b from-transparent to-[#f1e6d6] lg:hidden"
          aria-hidden="true"
        />
      </div>

      <div className="relative flex flex-col items-center gap-8 px-5 pt-8 pb-14 text-center lg:absolute lg:inset-0 lg:block lg:p-0">
        <HeroWheel className="w-full max-w-[330px] sm:max-w-[380px] lg:absolute lg:top-[48%] lg:left-[67.5%] lg:w-[25%] lg:max-w-none lg:-translate-x-1/2 lg:-translate-y-1/2" />
        <div className="lg:absolute lg:top-[83.8%] lg:left-[67.5%] lg:-translate-x-1/2 lg:-translate-y-1/2">
          <HeroButtons />
        </div>
        <Tagline className="lg:absolute lg:top-[93%] lg:left-[67.5%] lg:w-max lg:-translate-x-1/2 lg:-translate-y-1/2" />
      </div>
    </section>
  );
}

/* ---------- 2. Something happens ---------- */
function Eclipse({ children, size = "md" }: { children: React.ReactNode; size?: "md" | "lg" }) {
  const dims =
    size === "lg"
      ? "w-[128px] sm:w-[150px] md:w-[clamp(130px,12vw,190px)]"
      : "w-[108px] sm:w-[150px] md:w-[clamp(150px,13vw,200px)]";
  return (
    <div className={`relative aspect-square ${dims}`}>
      <img
        src={eclipse}
        alt=""
        width={395}
        height={395}
        loading="lazy"
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-3 text-center text-white">
        {children}
      </div>
    </div>
  );
}

function Underline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`absolute left-0 h-[0.45em] w-full text-accent ${className}`}
    >
      <path
        d="M2 8 C 50 3, 120 2, 198 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Triggered() {
  return (
    <section aria-labelledby="triggered-title" className="bg-white px-5 py-16 text-center md:py-24">
      <h2 id="triggered-title" className="mx-auto max-w-4xl">
        <span className="tracked block text-[15px] font-normal tracking-[0.3em] sm:text-lg md:text-[clamp(18px,1.55vw,26px)]">
          Something happens
        </span>
        <span className="block text-[46px] leading-[1.05] font-semibold tracking-[-0.03em] sm:text-6xl md:text-[clamp(64px,5.8vw,96px)]">
          Outside You.
        </span>
        <span className="tracked mt-1 block text-[15px] font-normal tracking-[0.3em] sm:text-lg md:text-[clamp(18px,1.55vw,26px)]">
          Something in you is
        </span>
        <span className="block text-[46px] leading-[1.1] font-bold tracking-[-0.03em] text-accent italic sm:text-6xl md:text-[clamp(64px,5.8vw,96px)]">
          Triggered.
        </span>
      </h2>
      <p className="mt-3 text-base md:text-[clamp(16px,1.25vw,20px)]">Something contracts.</p>
      <p className="mt-8 text-2xl font-semibold tracking-[0.04em] text-accent uppercase md:text-[clamp(26px,2.35vw,40px)]">
        Protection moves.
      </p>
      <p className="mx-auto mt-2 max-w-[22em] text-base leading-snug md:text-[clamp(16px,1.35vw,22px)]">
        And sometimes, what happens next doesn’t look like protection.
      </p>
      <ul
        className="mt-10 flex justify-center gap-1.5 sm:gap-8 md:mt-12 md:gap-[clamp(24px,2.4vw,44px)]"
        aria-label="Ways protection moves"
      >
        {["Explode", "Implode", "Shut down"].map((w) => (
          <li key={w}>
            <Eclipse>
              <span className="text-[13px] font-semibold uppercase sm:text-base md:text-[clamp(15px,1.2vw,20px)]">
                {w}
              </span>
            </Eclipse>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-[26px] leading-tight font-medium tracking-[-0.02em] sm:text-4xl md:mt-12 md:text-[clamp(36px,3vw,52px)]">
        It can look and feel like who <em className="text-accent">you</em> are.
      </p>
      <p className="tracked mt-6 text-[13px] leading-loose tracking-[0.24em] sm:text-base md:text-[clamp(16px,1.35vw,23px)]">
        To protect what once{" "}
        <span className="text-accent">
          didn’t{" "}
          <span className="relative inline-block whitespace-nowrap">
            feel safe to be.
            <Underline className="-bottom-[0.45em]" />
          </span>
        </span>
      </p>
    </section>
  );
}

/* ---------- 3. You learned to adapt ---------- */
const ADAPTATIONS = [
  { t: "Suppress", s: "Hold it in.", d: "Hold back what wants to be expressed." },
  { t: "Control", s: "Manage it.", d: "Try to manage what feels uncertain." },
  { t: "Defend", s: "Push back.", d: "Protect against what feels threatening." },
  { t: "Avoid", s: "Move away.", d: "Move away from what feels difficult to meet." },
  { t: "Adapt", s: "Change for it.", d: "Change yourself to preserve safety or belonging." },
];

function Adapt() {
  const body = "text-[15px] leading-snug md:text-[clamp(15px,1.3vw,22px)]";
  return (
    <section
      aria-labelledby="adapt-title"
      className="bg-white px-5 pt-4 pb-16 text-center md:pb-24"
    >
      <h2
        id="adapt-title"
        className="text-[42px] leading-[1.02] font-bold tracking-[-0.01em] uppercase sm:text-6xl md:text-[clamp(64px,5.2vw,88px)]"
      >
        You learned
        <br />
        to <em className="text-accent">adapt.</em>
      </h2>
      <div className={`mx-auto mt-5 max-w-[26em] ${body}`}>
        <p className="text-lg leading-snug md:text-[clamp(18px,1.55vw,26px)]">
          These ways of protecting
          <br />
          weren’t random.
        </p>
        <p className="mt-1 text-lg font-medium text-accent italic md:text-[clamp(18px,1.55vw,26px)]">
          As a child, you had needs.
        </p>
        <p className="mt-1">
          For connection. For safety. For belonging.
          <br className="hidden sm:inline" /> And in learning how to meet those needs,
          <br className="hidden sm:inline" /> they answered a question:
        </p>
      </div>
      <p className="mt-6 text-[22px] leading-tight font-medium sm:text-3xl md:text-[clamp(30px,2.6vw,44px)]">
        Given the world I’m experiencing,
        <br />
        <em className="font-semibold text-accent">what is the safest way to be?</em>
      </p>
      <ul className="mx-auto mt-10 grid max-w-[1400px] grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 md:grid-cols-5 md:gap-x-[clamp(8px,1.5vw,32px)]">
        {ADAPTATIONS.map((a, i) => (
          <li
            key={a.t}
            className={`flex flex-col items-center ${i === 4 ? "col-span-2 sm:col-span-1" : ""}`}
          >
            <Eclipse size="lg">
              <span className="text-[15px] font-semibold uppercase md:text-[clamp(14px,1.3vw,22px)]">
                {a.t}
              </span>
              <span className="text-[13px] text-gold italic md:text-[clamp(12px,1.1vw,19px)]">
                {a.s}
              </span>
            </Eclipse>
            <p className={`mt-4 max-w-[11em] font-medium ${body}`}>{a.d}</p>
          </li>
        ))}
      </ul>
      <p className="mt-12 text-base md:text-[clamp(16px,1.35vw,22px)]">What helped you adapt</p>
      <p className="tracked mt-1 text-xl tracking-[0.2em] text-accent md:text-[clamp(22px,1.9vw,32px)]">
        Can become automatic.
      </p>
    </section>
  );
}

/* ---------- 4. What became automatic ---------- */
function Automatic() {
  return (
    <section aria-labelledby="automatic-title" className="bg-white px-5 py-16 text-center md:py-24">
      <h2
        id="automatic-title"
        className="text-[26px] leading-tight font-semibold uppercase sm:text-4xl md:text-[clamp(36px,3.1vw,54px)]"
      >
        What became automatic
        <br />
        <span className="font-normal text-accent">
          can keep{" "}
          <span className="relative inline-block">
            choosing for you.
            <Underline className="-bottom-[0.3em]" />
          </span>
        </span>
      </h2>
      <ul
        className="mx-auto mt-12 flex max-w-[1100px] flex-wrap justify-center gap-x-8 gap-y-3 text-xl font-semibold tracking-[0.02em] uppercase sm:gap-x-12 sm:text-3xl md:mt-16 md:gap-x-[clamp(48px,5.5vw,96px)] md:gap-y-6 md:text-[clamp(32px,3vw,52px)]"
        aria-label="Areas of life"
      >
        {["Relationships", "Work", "Creativity"].map((w) => (
          <li key={w}>{w}</li>
        ))}
        <li className="basis-full" aria-hidden="true" />
        {["Money", "Expression", "Health"].map((w) => (
          <li key={w}>{w}</li>
        ))}
      </ul>
      <div className="mt-12 text-base leading-snug md:mt-16 md:text-[clamp(16px,1.3vw,22px)]">
        <p>What you move toward.</p>
        <p>What you move away from.</p>
        <p className="text-lg font-semibold md:text-[clamp(18px,1.6vw,28px)]">
          What you allow yourself
        </p>
        <p className="text-lg font-semibold text-accent italic md:text-[clamp(18px,1.6vw,28px)]">
          to become.
        </p>
        <p className="mt-6">
          And when a pattern has been choosing
          <br />
          for you long enough,
        </p>
        <p className="mt-2 text-2xl leading-tight font-semibold text-accent uppercase md:text-[clamp(26px,2.35vw,40px)]">
          It can feel
          <br />
          like who you are.
        </p>
        <p className="mt-8 text-xl text-accent italic md:text-[clamp(20px,1.8vw,30px)]">But…</p>
      </div>
    </section>
  );
}

/* ---------- 5. What becomes visible ---------- */
function Visible() {
  return (
    <section
      aria-labelledby="visible-title"
      className="bg-white px-5 pt-10 pb-20 text-center md:pb-28"
    >
      <p className="text-lg leading-snug font-light text-accent italic md:text-[clamp(20px,1.9vw,32px)]">
        what feels like who you are
        <br />
        could become visible as a pattern.
      </p>
      <h2
        id="visible-title"
        className="mt-6 text-[32px] leading-[1.08] font-semibold uppercase sm:text-5xl md:text-[clamp(52px,4.5vw,76px)]"
      >
        What becomes visible
        <br />
        can be met.
      </h2>
      <svg
        viewBox="-12 -12 24 24"
        className="mx-auto my-4 h-7 w-7 fill-accent md:h-10 md:w-10"
        aria-hidden="true"
      >
        <path d="M0 -12 C1.2 -3 3 -1.2 12 0 C3 1.2 1.2 3 0 12 C-1.2 3 -3 1.2 -12 0 C-3 -1.2 -1.2 -3 0 -12 Z" />
      </svg>
      <p className="text-2xl leading-tight font-medium text-accent uppercase sm:text-4xl md:text-[clamp(38px,3.3vw,56px)]">
        What can be met
        <br />
        becomes more choosable.
      </p>
      <p className="mt-8 text-base leading-snug md:text-[clamp(17px,1.6vw,27px)]">
        As your capacity to stay with what is here grows,
        <br className="hidden sm:inline" />{" "}
        <em className="text-accent">protection no longer has to lead.</em>
      </p>
    </section>
  );
}

/* ---------- 6. The Map ---------- */
function MapIntro() {
  return (
    <div>
      <p className="inline-block text-xs font-medium tracking-[0.18em] text-white uppercase md:text-[clamp(12px,0.95vw,16px)]">
        The Map
        <span className="mt-1 block h-[5px] w-full bg-white" aria-hidden="true" />
      </p>
      <h2
        id="map-title"
        className="mt-6 text-[26px] leading-[1.18] font-semibold uppercase lg:mt-[clamp(20px,2.2vw,40px)] lg:text-[clamp(24px,2.2vw,40px)]"
      >
        See what’s been
        <br />
        choosing for you.
        <br />
        <span className="text-rust">
          Free what wants to
          <br />
          move through you.
        </span>
      </h2>
      <p className="mt-5 text-base leading-snug lg:mt-[clamp(16px,2vw,36px)] lg:text-[clamp(14px,1.3vw,23px)]">
        A Map for meeting
        <br />
        what has been <em className="text-rust">moving you,</em> differently.
      </p>
      <a
        href={LINKS.exploreTheMapSection}
        className="btn-outline mt-6 border-rust text-ink lg:mt-[clamp(16px,2vw,36px)] lg:text-[clamp(11px,0.85vw,15px)]"
      >
        Explore the map <span aria-hidden="true">⟶</span>
      </a>
    </div>
  );
}

function MapSteps({ overlay }: { overlay: boolean }) {
  return (
    <ol
      className={
        overlay
          ? "grid grid-cols-5 border-t border-white/60"
          : "mx-auto grid max-w-[640px] gap-px overflow-hidden rounded-lg bg-rust/20 sm:grid-cols-2"
      }
    >
      {MAP_STAGES.map((s, i) => (
        <li
          key={s.n}
          className={
            overlay
              ? "relative px-[1vw] pt-[1.2vw] text-center"
              : `bg-[#f6ead7] px-5 py-5 text-center ${i === 4 ? "sm:col-span-2" : ""}`
          }
        >
          {overlay && i > 0 && (
            <span
              className="absolute top-[1.4vw] bottom-[1.4vw] left-0 w-px bg-white/60"
              aria-hidden="true"
            >
              <span className="absolute top-1/2 left-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-rust" />
            </span>
          )}
          <span className="block text-xl font-normal lg:text-[clamp(18px,1.5vw,26px)]">{s.n}</span>
          <span className="block text-sm font-medium tracking-[0.02em] uppercase lg:text-[clamp(11px,0.95vw,16px)]">
            {s.label}
          </span>
          <span className="block text-sm text-rust italic lg:text-[clamp(11px,0.9vw,15px)]">
            {s.word}
          </span>
          <span className="mx-auto mt-2 block max-w-[16em] text-sm leading-snug lg:text-[clamp(11px,0.9vw,15px)]">
            {s.text}
          </span>
        </li>
      ))}
    </ol>
  );
}

function MapArt() {
  return (
    <>
      <picture>
        <source media="(max-width: 700px)" srcSet={mapArt900} />
        <img
          src={mapArt}
          alt="Seen from above, a circle of people sit together on golden desert sand."
          width={1672}
          height={941}
          loading="lazy"
          className="absolute inset-0 h-full w-full"
        />
      </picture>
      <MapDiagram />
    </>
  );
}

function TheMap() {
  return (
    <section id="map" aria-labelledby="map-title" className="scroll-mt-4 bg-[#e9d3ae] text-ink">
      {/* Phone & tablet: text, artwork crop, then stages */}
      <div className="px-5 pt-14 pb-14 lg:hidden">
        <div className="mx-auto max-w-[640px]">
          <MapIntro />
        </div>
        <div className="relative mx-auto mt-10 aspect-[1/0.86] max-w-[640px] overflow-hidden rounded-lg">
          <div className="absolute top-1/2 left-[-76%] aspect-[1672/941] w-[200%] -translate-y-[40%] [container-type:inline-size]">
            <MapArt />
          </div>
        </div>
        <div className="mt-10">
          <MapSteps overlay={false} />
        </div>
      </div>
      {/* Desktop: full-bleed artwork with overlaid text, matching the design */}
      <div className="relative hidden aspect-[1672/941] w-full [container-type:inline-size] lg:block">
        <MapArt />
        <div
          className="absolute inset-y-0 left-0 w-[48%] bg-gradient-to-r from-[#f7ead3]/75 via-[#f7ead3]/35 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#f7ead3]/60 to-transparent"
          aria-hidden="true"
        />
        <div className="absolute top-[13.5%] left-[4.6%] w-[34%]">
          <MapIntro />
        </div>
        <div className="absolute inset-x-[2.5%] top-[72.5%] bottom-[3%]">
          <MapSteps overlay />
        </div>
      </div>
    </section>
  );
}

/* ---------- 7. What becomes available ---------- */
const CAPACITIES = [
  {
    t: ["Presence"],
    d: "Stay with yourself and your experience, even when life moves around you.",
  },
  {
    t: ["Receiving"],
    d: "Expand your capacity to receive and hold more—including greater wealth.",
  },
  { t: ["Authenticity"], d: "Express what is true without needing to hide yourself." },
  { t: ["Relational", "security"], d: "Remain yourself while being close to another." },
  {
    t: ["Creative", "freedom"],
    d: "Create what brings you alive without needing external approval.",
  },
];

function Available() {
  return (
    <section
      aria-labelledby="available-title"
      className="relative overflow-hidden bg-white text-center"
    >
      <div className="relative z-10 px-5 pt-16 md:pt-20">
        <h2 id="available-title">
          <span className="tracked block text-lg tracking-[0.3em] sm:text-2xl md:text-[clamp(26px,2.3vw,40px)]">
            What becomes
          </span>
          <span className="block text-[54px] leading-[1] font-bold text-rust uppercase sm:text-7xl md:text-[clamp(76px,7vw,120px)]">
            Available?
          </span>
        </h2>
        <p className="mt-8 font-display text-lg tracking-[0.3em] uppercase md:mt-12 md:text-[clamp(18px,1.5vw,26px)]">
          Greater capacity for
        </p>
        <ul className="mx-auto mt-8 grid max-w-[1400px] divide-y divide-[#d9a668] sm:grid-cols-2 sm:divide-y-0 md:grid-cols-5 md:divide-x">
          {CAPACITIES.map((c, i) => (
            <li
              key={c.t.join(" ")}
              className={`px-4 py-5 md:px-[clamp(8px,1.6vw,32px)] md:py-1 ${i === 4 ? "sm:col-span-2 md:col-span-1" : ""}`}
            >
              <h3 className="text-lg leading-tight font-semibold tracking-[0.12em] uppercase md:text-[clamp(15px,1.5vw,26px)]">
                {c.t.map((l, j) => (
                  <span key={j} className="md:block">
                    {l}
                    {j < c.t.length - 1 ? " " : ""}
                  </span>
                ))}
              </h3>
              <p className="mx-auto mt-2 max-w-[17em] text-[15px] leading-snug md:mt-3 md:text-[clamp(13px,1.15vw,19px)]">
                {c.d}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative -mt-[18%] min-h-[300px] sm:-mt-[14%] md:-mt-[24%]">
        <picture>
          <source media="(max-width: 900px)" srcSet={available900} />
          <img
            src={available}
            alt="A person sits alone on a dune ridge, facing the sun rising over desert mountains."
            width={1767}
            height={890}
            loading="lazy"
            className="block h-full min-h-[300px] w-full object-cover object-[50%_75%] saturate-[0.8] sepia-[0.12]"
          />
        </picture>
        <div
          className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/45 to-transparent"
          aria-hidden="true"
        />
        <p className="absolute inset-x-0 bottom-[7%] text-lg leading-snug font-medium tracking-[0.12em] text-white uppercase drop-shadow sm:text-2xl md:text-[clamp(24px,2.3vw,40px)]">
          More of you
          <br />
          <span className="font-semibold text-gold">Becomes available.</span>
        </p>
      </div>
    </section>
  );
}

/* ---------- 8. Founder ---------- */
function Founder() {
  return (
    <section
      id="founder"
      aria-labelledby="founder-title"
      className="scroll-mt-4 bg-white px-5 py-16 text-center md:py-24"
    >
      <img
        src={founder}
        alt="Portrait of Malek Najm Ghaleb, founder of Alchemist Ways, smiling in front of a stone wall."
        width={640}
        height={640}
        loading="lazy"
        className="mx-auto h-[200px] w-[200px] rounded-full object-cover shadow-[0_10px_30px_rgb(0_0_0/0.12)] md:h-[clamp(220px,19vw,330px)] md:w-[clamp(220px,19vw,330px)]"
      />
      <p className="mt-12 text-xs font-medium tracking-[0.18em] uppercase md:mt-16 md:text-[clamp(12px,0.95vw,16px)]">
        Founder story
      </p>
      <h2
        id="founder-title"
        className="mt-5 text-[28px] leading-tight font-semibold uppercase md:text-[clamp(30px,2.4vw,42px)]"
      >
        Why Alchemist Ways
        <br />
        <span className="text-accent">exists</span>
      </h2>
      <div className="mx-auto mt-6 max-w-[34em] space-y-2 text-[15px] leading-snug md:text-[clamp(15px,1.2vw,20px)]">
        <p>
          For years, I thought I was searching for freedom.
          <br />
          Validation. Creativity. Love.
        </p>
        <p>
          But beneath all of those desires was something quieter
          <br className="hidden sm:inline" /> I couldn’t yet see.
        </p>
        <p className="text-accent italic">I was searching for inner safety.</p>
        <p>
          Much of my life had become organized around looking outside myself—for approval,
          direction, permission, and confirmation that who I was and what I wanted could be trusted.
        </p>
        <p>
          Eventually, I stopped trying to escape my anger
          <br className="hidden sm:inline" /> and began trying to understand it.
        </p>
        <p className="text-accent italic">What is this anger trying to communicate?</p>
        <p>
          Following that question led me beneath the anger—
          <br className="hidden sm:inline" />
          to fear, hurt, protection, old conclusions about myself,
          <br className="hidden sm:inline" /> and parts of myself I had left behind.
        </p>
        <p className="pt-1">
          <strong className="font-semibold">The Map emerged from that process.</strong>
          <br />
          Alchemist Ways grew from learning to meet those parts differently.
        </p>
      </div>
      <p className="mt-10 text-[15px] font-semibold text-accent md:text-[clamp(15px,1.15vw,19px)]">
        Malek Najm Ghaleb
      </p>
      <p className="text-sm italic md:text-[clamp(14px,1.05vw,17px)]">Founder, Alchemist Ways</p>
      <a href={LINKS.founderStory} className="btn-outline mt-6 min-w-[min(100%,340px)] text-accent">
        Read the founder story <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}

/* ---------- 9. Begin where you are ---------- */
const PATHS = [
  {
    n: "01",
    t: "Discover",
    s: "Meet what’s here.",
    lead: "A 10-minute Emotional Awareness Tool.",
    d: "Take one reaction, feeling, or pattern and begin seeing the invisible architecture beneath it.",
    cta: "Discover the tool",
    href: LINKS.discoverTool,
  },
  {
    n: "02",
    t: "Understand",
    s: "Explore the map.",
    lead: "The complete Map, in book form.",
    d: "Go deeper into the hidden architecture beneath your patterns—and the movement from reactivity to Creative Agency.",
    cta: "Explore the book",
    href: LINKS.exploreBook,
  },
  {
    n: "03",
    t: "Transform",
    s: "Bring it into life.",
    lead: "One-on-one work with Malek.",
    d: "Bring the Map into lived experience—and work directly with what is ready to become visible, met, and more choosable.",
    cta: "Work with Malek",
    href: LINKS.workWithMalek,
  },
];

function StarDivider() {
  return (
    <div
      className="mx-auto flex w-[min(80%,360px)] items-center gap-3 text-rust"
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-rust/70" />
      <svg viewBox="-12 -12 24 24" className="h-6 w-6 fill-current">
        <path d="M0 -12 C1.2 -3 3 -1.2 12 0 C3 1.2 1.2 3 0 12 C-1.2 3 -3 1.2 -12 0 C-3 -1.2 -1.2 -3 0 -12 Z" />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-rust/70" />
    </div>
  );
}

function Begin() {
  return (
    <section
      id="begin"
      aria-labelledby="begin-title"
      className="relative scroll-mt-4 overflow-hidden px-5 py-14 text-center md:py-[clamp(48px,4.5vw,80px)]"
    >
      <picture>
        <source media="(max-width: 900px)" srcSet={dunes900} />
        <img
          src={dunes}
          alt=""
          width={1920}
          height={832}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
        />
      </picture>
      <div
        className="absolute inset-0 [background:radial-gradient(ellipse_60%_45%_at_50%_22%,rgb(255_246_230/0.7),transparent),radial-gradient(ellipse_55%_30%_at_50%_92%,rgb(255_244_225/0.8),transparent)]"
        aria-hidden="true"
      />
      <div className="relative">
        <StarDivider />
        <h2
          id="begin-title"
          className="mt-5 text-[40px] leading-[1.05] font-semibold tracking-[-0.03em] sm:text-6xl md:text-[clamp(60px,5.4vw,92px)]"
        >
          <span className="text-rust">Begin</span> Where You Are.
        </h2>
        <p className="tracked mt-3 text-[13px] leading-relaxed tracking-[0.24em] sm:text-lg md:text-[clamp(17px,1.5vw,26px)]">
          Three ways to meet yourself, <em className="font-medium text-rust">differently.</em>
        </p>
        <ul className="mx-auto mt-10 grid max-w-[1320px] gap-5 md:grid-cols-3 md:gap-[clamp(16px,1.6vw,28px)]">
          {PATHS.map((p) => (
            <li
              key={p.n}
              className="flex flex-col rounded-2xl bg-[#fbf7f1]/90 p-6 text-left shadow-[0_12px_30px_rgb(90_55_20/0.18)] backdrop-blur-sm lg:p-[clamp(24px,2vw,36px)]"
            >
              <span className="text-2xl font-light text-ink/80 md:text-[clamp(22px,1.7vw,30px)]">
                {p.n}
              </span>
              <h3 className="mt-1 text-2xl font-semibold tracking-[0.06em] uppercase md:text-[clamp(22px,1.8vw,32px)]">
                {p.t}
              </h3>
              <p className="mt-1 text-xs font-medium tracking-[0.22em] text-rust uppercase md:text-[clamp(11px,0.95vw,16px)]">
                {p.s}
              </p>
              <p className="mt-4 text-lg leading-snug font-medium md:text-[clamp(16px,1.3vw,22px)]">
                {p.lead}
              </p>
              <p className="mt-3 text-sm leading-snug text-ink/70 md:text-[clamp(13px,0.95vw,16px)]">
                {p.d}
              </p>
              <div className="mt-auto pt-6">
                <a
                  href={p.href}
                  className="btn-pill w-full border-ink/70 bg-transparent text-xs md:text-[clamp(11px,0.85vw,14px)]"
                >
                  {p.cta} <span aria-hidden="true">→</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <StarDivider />
        </div>
        <p className="mt-5 text-lg leading-snug font-medium tracking-[0.14em] uppercase sm:text-2xl md:text-[clamp(24px,2.2vw,38px)]">
          What becomes possible
          <br />
          when <span className="text-rust">more of you</span>
          <br />
          <span className="font-normal">is available to move through?</span>
        </p>
      </div>
    </section>
  );
}
