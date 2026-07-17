import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Instagram, Twitter, Youtube } from "lucide-react";
import heroCorridor from "@/assets/hero-corridor-4k.jpg";
import heroCorridorSm from "@/assets/hero-corridor.jpg";
import { MapScrollJourney } from "@/components/MapScrollJourney";
import { PageEntrance, Reveal } from "@/components/PageMotion";
import { SiteHeader } from "@/components/SiteHeader";
import { WaitlistForm } from "@/components/WaitlistForm";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const BASE_COUNT = 1247;
const BOOKING_URL = "#waitlist"; // replace with real booking link when ready

function LandingPage() {
  const [count, setCount] = useState(BASE_COUNT);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem("aw_waitlist") ?? "[]");
      const local = Array.isArray(raw) ? raw : [];
      // Unique emails only — matches WaitlistForm dedupe
      const unique = new Set(
        local
          .map((e: { email?: string }) =>
            typeof e?.email === "string" ? e.email.toLowerCase() : "",
          )
          .filter(Boolean),
      );
      setCount(BASE_COUNT + unique.size);
    } catch {
      /* ignore */
    }
  }, [joined]);

  return (
    <PageEntrance>
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader bookingHref={BOOKING_URL} />

        {/* Hero — mobile stacks book + copy; desktop: copy left wall, book clear on right */}
        <section id="top" className="relative overflow-hidden bg-[#c9baa9] md:min-h-[100svh]">
          <div className="relative h-[min(46svh,380px)] w-full md:absolute md:inset-0 md:h-full">
            <picture>
              <source media="(min-width: 768px)" srcSet={heroCorridor} />
              <img
                src={heroCorridorSm}
                alt="Alchemist Ways silver hardcover with yin-yang droplet, standing in a sand-toned corridor"
                width={3840}
                height={2560}
                fetchPriority="high"
                decoding="async"
                sizes="100vw"
                className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-[62%_48%] md:object-[78%_50%] lg:object-[80%_48%] xl:object-[76%_46%]"
              />
            </picture>
            {/* Soft fade into copy panel — phones only */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#ebe3d6] to-transparent md:hidden"
            />
            {/* Keep left wall legible without darkening the book */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 hidden w-[min(52%,36rem)] bg-gradient-to-r from-[#c9baa9]/55 via-[#c9baa9]/20 to-transparent md:block"
            />
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col bg-[#ebe3d6] px-5 pb-12 pt-2 md:min-h-[100svh] md:bg-transparent md:px-8 md:pb-20 md:pt-28 lg:px-10 lg:pb-24">
            {/* Desktop: narrow left column so copy never meets the book */}
            <div className="hero-stagger flex w-full flex-1 flex-col justify-center md:max-w-[min(100%,22rem)] lg:max-w-[24rem] xl:max-w-[26rem]">
              <p className="text-[0.6rem] uppercase tracking-[0.28em] text-gold-deep md:text-[0.65rem] md:text-[#3a2a1f]/75">
                A map. A practice. A return.
              </p>
              <h1 className="mt-3 text-balance font-display text-[1.85rem] uppercase leading-[1.1] tracking-[0.02em] text-ink sm:text-4xl md:mt-4 md:text-[2.35rem] md:leading-[1.12] lg:text-[2.75rem] xl:text-[3.15rem]">
                From
                <br />
                emotional
                <br />
                reactivity
                <br />
                to <span className="text-gold-deep">creative agency.</span>
              </h1>
              <p className="mt-4 max-w-sm text-balance font-display text-[0.95rem] leading-relaxed text-ink/80 sm:text-base md:mt-5 md:text-[1.05rem] md:text-[#3a2a1f]/80">
                A book for sensitive creators who are ready to stop abandoning themselves and start
                creating from who they truly are.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:mt-8 md:flex-row md:items-center md:flex-wrap">
                <a href="#waitlist" className="btn-lux btn-lux-primary w-full md:w-auto">
                  Join the waitlist
                  <span aria-hidden>→</span>
                </a>
                <a href="#book-inside" className="btn-lux btn-lux-sand w-full md:w-auto">
                  Get the book
                </a>
              </div>

              <div className="mt-6 flex items-start gap-3 text-xs text-ink/70 sm:mt-7 md:items-center md:text-[#3a2a1f]/70">
                <div className="flex shrink-0 -space-x-2">
                  {["#c9a575", "#e0c9a2", "#a9846b", "#d4b896"].map((c) => (
                    <span
                      key={c}
                      className="h-6 w-6 rounded-full border border-[#c9baa9]/80"
                      style={{ background: c }}
                    />
                  ))}
                </div>
                <span>
                  <strong className="font-medium text-ink">{count.toLocaleString()}</strong>{" "}
                  {joined
                    ? "curious minds — you're one of them"
                    : "Join readers transforming their inner world and their life."}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Five practices — aligned with client map of lived outcomes */}
        <section className="border-y border-border/60 bg-secondary/50">
          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
            <Reveal>
              <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-2 snap-x snap-mandatory scrollbar-none md:mx-0 md:grid md:grid-cols-5 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
                {practices.map((p) => (
                  <div
                    key={p.title}
                    className="w-[min(72vw,16rem)] shrink-0 snap-start text-left md:w-auto md:text-left"
                  >
                    <div
                      className="mb-3 flex h-10 w-10 items-center justify-center text-gold-deep md:mb-4"
                      aria-hidden
                    >
                      {p.icon}
                    </div>
                    <h3 className="text-[0.65rem] uppercase tracking-[0.2em] text-ink md:text-[0.7rem]">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/70">{p.line}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* The Map — sticky scroll through each circle */}
        <MapScrollJourney />

        {/* Doorway + what's inside */}
        <section id="book-inside" className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:items-start">
              <div>
                <div className="h-px w-10 bg-gold-deep" aria-hidden />
                <h2 className="mt-6 font-display text-3xl leading-tight text-ink sm:text-4xl md:text-5xl">
                  Your triggers are the doorway.
                </h2>
                <p className="mt-5 text-[0.7rem] uppercase leading-relaxed tracking-[0.18em] text-gold-deep sm:text-xs">
                  Every emotional reaction contains creative energy waiting to be reclaimed.
                </p>
                <p className="mt-10 font-display text-2xl italic text-ink/70">Malek</p>
              </div>
              <div className="rounded-[1.25rem] border border-border/70 bg-card px-6 py-7 sm:px-8 sm:py-8">
                <div className="text-[0.65rem] uppercase tracking-[0.28em] text-gold-deep">
                  What you&apos;ll find inside
                </div>
                <ul className="mt-6 space-y-4">
                  {insideItems.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[0.95rem] leading-relaxed text-ink/80"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-deep"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Founder */}
        <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <div className="text-[0.65rem] uppercase tracking-[0.28em] text-gold-deep">
              Why this exists
            </div>
            <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">
              Alchemist Ways did not begin as a framework.
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/80">
              <p>
                It began with a question I could no longer avoid:{" "}
                <em className="font-display text-ink">What if there is nothing wrong with me?</em>
              </p>
              <p>
                For years, I had learned to manage myself. To perform competence. To suppress what
                felt too large. To become useful before learning how to fully become myself.
              </p>
              <p>
                Eventually, life slowed me down enough to ask a different question. Not{" "}
                <em>how do I fix myself?</em> — but{" "}
                <em>what is this experience trying to show me?</em>
              </p>
              <p>
                The map emerged slowly — five movements from reactivity to creative agency — through
                observation, practice, failure, discomfort, radical honesty, and the privilege of
                walking beside others doing the same.
              </p>
              <p className="font-display italic text-muted-foreground">
                I offer it as a map you can test for yourself.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-soft font-display text-gold-deep">
                M
              </div>
              <div>
                <div className="font-display text-lg text-ink">Malek Najm Ghaleb</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Founder, Alchemist Ways
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Waitlist */}
        <section
          id="waitlist"
          className="relative overflow-hidden border-y border-border/60 bg-secondary/40"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background: "radial-gradient(ellipse at 50% 0%, var(--gold-soft), transparent 60%)",
            }}
          />
          <div className="relative mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
            <Reveal>
              <div className="text-center">
                <div className="text-[0.65rem] uppercase tracking-[0.28em] text-gold-deep">
                  Join the waitlist
                </div>
                <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl md:text-5xl">
                  Begin your journey.
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-balance text-ink/75">
                  Join the waitlist for the book. We&apos;ll send the opening chapter when it&apos;s
                  ready — quietly, not often.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120} className="mt-10">
              <WaitlistForm onJoined={() => setJoined(true)} />
            </Reveal>

            {!joined && (
              <Reveal delay={200}>
                <p className="mt-6 text-center text-xs text-muted-foreground">
                  <strong className="font-medium text-ink">{count.toLocaleString()}</strong> people
                  already on the list.
                </p>
              </Reveal>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <div className="text-[0.65rem] uppercase tracking-[0.28em] text-gold-deep">
              Questions
            </div>
            <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">
              A few things worth knowing.
            </h2>
          </Reveal>

          <div className="mt-10 divide-y divide-border">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 40}>
                <FaqItem q={f.q} a={f.a} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/60 bg-secondary/30">
          <Reveal>
            <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-display text-[0.7rem] uppercase tracking-[0.3em] text-ink">
                  A · W&nbsp;&nbsp;Alchemist Ways
                </div>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  Some things can only be seen at the speed of attention.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <a
                    href="https://x.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X (formerly Twitter)"
                    className="grid h-10 w-10 place-items-center rounded-full border border-border text-ink hover:border-gold hover:text-gold-deep hover:-translate-y-0.5"
                  >
                    <Twitter size={18} />
                  </a>
                  <a
                    href="https://instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="grid h-10 w-10 place-items-center rounded-full border border-border text-ink hover:border-gold hover:text-gold-deep hover:-translate-y-0.5"
                  >
                    <Instagram size={18} />
                  </a>
                  <a
                    href="https://youtube.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="grid h-10 w-10 place-items-center rounded-full border border-border text-ink hover:border-gold hover:text-gold-deep hover:-translate-y-0.5"
                  >
                    <Youtube size={18} />
                  </a>
                </div>
                <div className="text-xs text-muted-foreground">
                  © {new Date().getFullYear()} Alchemist Ways. All rights reserved.
                </div>
              </div>
            </div>
          </Reveal>
        </footer>
      </div>
    </PageEntrance>
  );
}

const practices = [
  {
    title: "Understand the Root",
    line: "See the patterns beneath your reactions.",
    icon: (
      <svg
        viewBox="0 0 40 40"
        className="h-9 w-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <circle cx="20" cy="20" r="12" />
        <circle cx="20" cy="20" r="3" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Integrate the Shadow",
    line: "Welcome what was rejected. Reclaim your energy.",
    icon: (
      <svg
        viewBox="0 0 40 40"
        className="h-9 w-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <path d="M20 8c6 0 10 4 10 9s-4 8-8 9c3-1 5-4 5-7 0-5-4-9-10-9-4 0-7 2-8 5 2-4 6-7 11-7z" />
      </svg>
    ),
  },
  {
    title: "Build Inner Sovereignty",
    line: "Create from choice, not compulsion.",
    icon: (
      <svg
        viewBox="0 0 40 40"
        className="h-9 w-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <path d="M20 9 L31 29 H9 Z" />
      </svg>
    ),
  },
  {
    title: "Act from Alignment",
    line: "Your life becomes a true expression of you.",
    icon: (
      <svg
        viewBox="0 0 40 40"
        className="h-9 w-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <circle cx="20" cy="20" r="4" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const r = (deg * Math.PI) / 180;
          return (
            <line
              key={deg}
              x1={20 + Math.cos(r) * 7}
              y1={20 + Math.sin(r) * 7}
              x2={20 + Math.cos(r) * 14}
              y2={20 + Math.sin(r) * 14}
            />
          );
        })}
      </svg>
    ),
  },
  {
    title: "Create with Freedom",
    line: "Your creativity becomes your contribution.",
    icon: (
      <svg
        viewBox="0 0 40 40"
        className="h-9 w-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <path d="M12 20c0-3 2.5-5 5-5s5 2 6 5c1 3 3.5 5 6 5s5-2 5-5-2.5-5-5-5-5 2-6 5c-1 3-3.5 5-6 5s-5-2-5-5z" />
      </svg>
    ),
  },
];

const insideItems = [
  "A practical map to transform emotional reactivity",
  "Step-by-step tools for lasting integration",
  "Reflections and inquiries that create real shifts",
  "A new relationship with yourself, others, and life",
];

const faqs = [
  {
    q: "What is the waitlist for?",
    a: "The waitlist is for the Alchemist Ways book — a map from emotional reactivity to creative agency. Joining means you'll be among the first to receive it, along with early reflections from the work.",
  },
  {
    q: "What happens after I sign up?",
    a: "You'll receive a short welcome note. When the book is ready, you'll be the first to know. In between, we may share the occasional reflection — never more than once or twice a month.",
  },
  {
    q: "How often will I hear from you?",
    a: "Quietly. Not often. We'd rather write less and say something worth reading than fill your inbox.",
  },
  {
    q: "Is this therapy or coaching?",
    a: "No. Alchemist Ways is a philosophy and a map — offered as territory you can explore. It complements rather than replaces professional support.",
  },
  {
    q: "Can I unsubscribe anytime?",
    a: "Of course. Every email includes a one-click unsubscribe. Keep what is true, leave what isn't.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-${q.slice(0, 24).replace(/\W+/g, "-").toLowerCase()}`;
  return (
    <div className="py-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group flex w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span className="font-display text-lg text-ink transition-colors group-hover:text-gold-deep sm:text-xl">
          {q}
        </span>
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border text-gold-deep transition-all duration-300 ease-out group-hover:border-gold ${
            open ? "rotate-45 bg-gold-soft" : ""
          }`}
          aria-hidden
        >
          +
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl leading-relaxed text-ink/75">{a}</p>
        </div>
      </div>
    </div>
  );
}
