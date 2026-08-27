import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Youtube } from "lucide-react";
import malekPortrait from "@/assets/malek-portrait.jpg";
import { BookPlateImage } from "@/components/BookPlateImage";
import { MapScrollJourney } from "@/components/MapScrollJourney";
import { PageEntrance, Reveal } from "@/components/PageMotion";
import { SiteHeader } from "@/components/SiteHeader";
import {
  BOOK_PRICE,
  BOOK_PURCHASE_URL,
  CLARITY_CALL_URL,
  CLARITY_SESSION_URL,
  COMMUNITY_URL,
  CONVERSATIONS_URL,
} from "@/lib/offers";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

/**
 * Landing flow per the client FINAL PDF (27 pp.):
 * Hero → protect / why / meet / why-it-matters → Map bridge → Map →
 * About → Invitation → Ways to Begin → closer.
 * Hero→Map copy is FINAL-verbatim; post-Map offers keep Conversations (YouTube).
 * Anchors: #map, #about, #book, #clarity, #community.
 */
function LandingPage() {
  return (
    <PageEntrance>
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />

        {/* Hero — FINAL p.1 */}
        <section id="top" className="relative overflow-hidden bg-[#d4c4b0] md:min-h-[100svh]">
          <div className="relative h-[min(54svh,460px)] w-full sm:h-[min(56svh,520px)] md:absolute md:inset-0 md:h-full">
            <BookPlateImage priority alt="Meet Yourself, Differently. Alchemist Ways hardcover" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent md:hidden"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 hidden w-[min(58%,40rem)] bg-[linear-gradient(to_right,rgb(212_196_176/0.55)_0%,rgb(212_196_176/0.28)_38%,rgb(212_196_176/0.10)_68%,transparent_100%)] md:block"
            />
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col bg-background px-[max(1.25rem,env(safe-area-inset-left))] pb-14 pr-[max(1.25rem,env(safe-area-inset-right))] pt-5 md:min-h-[100svh] md:bg-transparent md:px-8 md:pb-24 md:pt-28 lg:px-12">
            <div className="hero-stagger flex w-full min-w-0 flex-1 flex-col justify-center md:max-w-[min(100%,24rem)] lg:max-w-[26rem]">
              <h1 className="flex flex-col items-start gap-1 font-display text-[clamp(1.85rem,8vw,2.15rem)] font-semibold uppercase leading-[0.98] tracking-[-0.04em] text-ink sm:text-5xl md:text-[2.75rem] lg:text-[3.25rem]">
                <span>Meet Yourself,</span>
                <span
                  className="origin-center font-semibold text-ember-deep"
                  style={{ transform: "rotate(180deg)" }}
                >
                  Differently.
                </span>
              </h1>
              <p className="mt-6 max-w-sm text-[1.02rem] leading-relaxed text-ink/80 sm:text-lg md:text-[#3a2a1f]/85">
                A map
                <br />
                from emotional reactivity
                <br />
                to creative agency
              </p>

              <div className="mt-9 flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
                <a href="#map" className="btn-lux btn-lux-primary w-full sm:w-auto">
                  Explore the Map
                  <span aria-hidden>↓</span>
                </a>
                <a href="#book" className="btn-lux btn-lux-ghost w-full sm:w-auto">
                  Get the Book
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL p.1 — How did you learn to protect yourself? */}
        <section className="aw-section">
          <div className="aw-measure">
            <Reveal>
              <h2 className="aw-display">How did you learn to protect yourself?</h2>
            </Reveal>
            <Reveal>
              <p className="mt-8 font-display text-lg italic text-ink/55 sm:text-xl">Perhaps by…</p>
            </Reveal>
            <div className="aw-stack aw-stack-loose mt-6">
              {protectWays.map((way) => (
                <Reveal key={way}>
                  <p className="aw-line">{way}</p>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <hr className="aw-rule" />
              <p className="aw-lede mt-0">
                Without even knowing it, these ways of protecting yourself may once have helped you
                navigate the environment in which they developed.
              </p>
            </Reveal>
          </div>
        </section>

        {/* FINAL p.2 — Why did I learn to do that? */}
        <section className="border-y border-border/40 bg-secondary/30">
          <div className="aw-measure aw-section">
            <Reveal>
              <h2 className="aw-display">Why did I learn to do that?</h2>
            </Reveal>
            <div className="mt-8 space-y-6">
              <Reveal>
                <p className="aw-body">
                  The ways you learned to protect yourself were shaped by what your system learned
                  was safest.
                </p>
              </Reveal>
              <Reveal>
                <p className="aw-body">
                  Growing up, your mind and body were continually learning:{" "}
                  <span className="font-display italic text-ink">
                    “Given the world I’m experiencing, what is the safest way to be?”
                  </span>
                </p>
              </Reveal>
              <Reveal>
                <div className="aw-rail aw-stack">
                  <p className="aw-body !mt-0">Maybe staying quiet kept connection.</p>
                  <p className="aw-body !mt-0">Maybe perfection brought approval.</p>
                  <p className="aw-body !mt-0">Maybe people-pleasing kept the peace.</p>
                  <p className="aw-body !mt-0">Maybe independence protected vulnerability.</p>
                  <p className="aw-body !mt-0">
                    Maybe shutting down made overwhelming feelings more manageable.
                  </p>
                </div>
              </Reveal>
              <Reveal>
                <p className="aw-body">
                  These responses weren’t random. They helped you navigate the world you were in.
                </p>
              </Reveal>
              <Reveal>
                <p className="aw-pull">
                  The problem is not that protection exists. It’s that ways of protecting yourself
                  can become automatic—and continue shaping how you meet life even when the
                  circumstances around you have changed.
                </p>
              </Reveal>
              <Reveal>
                <p className="aw-body">
                  What once helped you adapt to the world as a child may no longer be how you want
                  to meet yourself—and life—as an adult.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FINAL p.3 — Meet yourself + why it matters */}
        <section className="aw-section">
          <div className="aw-measure">
            <Reveal>
              <h2 className="aw-display">And how did you learn to meet yourself?</h2>
            </Reveal>
            <Reveal>
              <p className="mt-8 font-display text-lg italic text-ink/55 sm:text-xl">Perhaps with…</p>
            </Reveal>
            <div className="aw-stack aw-stack-loose mt-6">
              {meetWays.map((way) => (
                <Reveal key={way}>
                  <p className="aw-line">{way}</p>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <p className="aw-lede">
                These patterns didn’t only shape how you met the world. They shaped how you learned
                to meet yourself.
              </p>
            </Reveal>

            <Reveal>
              <hr className="aw-rule" />
              <h2 className="aw-display">Why does the way I meet myself matter?</h2>
            </Reveal>
            <Reveal>
              <p className="aw-lede">
                Because the relationship you have with yourself shapes how you meet everything else.
              </p>
            </Reveal>
            <div className="aw-stack aw-stack-loose mt-8">
              {meetShapes.map((line) => (
                <Reveal key={line}>
                  <p className="aw-line">{line}</p>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <p className="aw-pull mt-10">What protects you also shapes what becomes possible.</p>
            </Reveal>
          </div>
        </section>

        {/* FINAL p.4 — Map bridge */}
        <section className="aw-section pb-8 sm:pb-10">
          <div className="aw-measure">
            <Reveal>
              <div className="aw-rail">
                <h2 className="aw-display">What if you could meet yourself differently?</h2>
              </div>
            </Reveal>
          </div>
        </section>

        <div id="map" className="scroll-mt-28 lg:scroll-mt-32">
          <MapScrollJourney />
        </div>

        {/* S8 — About Malek */}
        <section
          id="about"
          className="scroll-mt-28 lg:scroll-mt-32 aw-section border-t border-border/40"
        >
          <div className="mx-auto grid max-w-6xl gap-8 px-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-12 sm:px-8">
            <Reveal>
              <div className="mx-auto w-full max-w-sm lg:mx-0 lg:max-w-md">
                <img
                  src={malekPortrait}
                  alt="Malek Najm Ghaleb"
                  width={800}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover object-top"
                />
              </div>
            </Reveal>

            <div>
              <Reveal>
                <p className="aw-eyebrow">About Malek</p>
              </Reveal>
            <Reveal>
                <Verse
                  className="mt-5"
                  lines={[
                    "For years,",
                    "I thought I was searching",
                    "for freedom.",
                    "Validation.",
                    "Creativity.",
                    "Love.",
                  ]}
                />
                <Verse
                  className="mt-5"
                  lines={[
                    "Yet beneath all those desires",
                    "was something quieter.",
                    "Something",
                    "I couldn’t yet see.",
                  ]}
                />
                <Verse
                  className="mt-5"
                  display
                  lines={["I was searching", "for inner safety."]}
                />
                <Verse
                  className="mt-5"
                  lines={[
                    "Not physical safety.",
                    "The kind of inner safety",
                    "that allows someone",
                    "to express themselves honestly.",
                    "To create art",
                    "without constantly second-guessing themselves.",
                    "To speak",
                    "without silently holding back.",
                    "To live",
                    "instead of performing.",
                  ]}
                />
                <Verse
                  className="mt-5"
                  lines={[
                    "At the time,",
                    "I couldn’t see beyond",
                    "my conditioning.",
                    "I only knew",
                    "that despite my strengths,",
                    "my ambitions,",
                    "and my creativity,",
                    "much of my life felt shaped by fear,",
                    "self-doubt,",
                    "shame,",
                    "anxiety,",
                    "and emotional reactivity.",
                  ]}
                />
                <Verse
                  className="mt-5"
                  lines={[
                    "Eventually,",
                    "life slowed me down enough",
                    "to ask",
                    "a different question.",
                    "Not,",
                    "“How do I fix myself?”",
                    "But…",
                    "“What is this experience trying to communicate?”",
                  ]}
                />
                <Verse
                  className="mt-5"
                  lines={[
                    "The Map emerged slowly.",
                    "Through observation.",
                    "Practice.",
                    "Discomfort.",
                    "Radical honesty.",
                    "And through the privilege",
                    "of walking beside others",
                    "doing the same.",
                  ]}
                />
                <p className="mt-8 font-display text-xl italic text-ink">— Malek Najm Ghaleb</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* S9 — Invitation */}
        <section className="border-y border-border/40 bg-secondary/25">
          <div className="aw-measure aw-section">
            <Reveal>
              <p className="aw-eyebrow">An Invitation</p>
              <Verse
                className="mt-5"
                display
                lines={[
                  "Remain curious.",
                  "Explore the Map.",
                  "Test it",
                  "against your own experience.",
                  "Keep what is true.",
                  "Leave what isn’t.",
                ]}
              />
              <Verse
                className="mt-8"
                lines={[
                  "Alchemist Ways is an invitation—",
                  "not to become someone else—",
                  "but to discover",
                  "a different relationship",
                  "with yourself.",
                ]}
              />
            </Reveal>
          </div>
        </section>

        {/* S10 — Ways to Begin */}
        <section className="aw-section">
          <div className="aw-measure aw-measure-wide">
            <Reveal>
              <h2 className="aw-display aw-display-caps">
                There Are Several Ways to Begin
              </h2>
            </Reveal>

            <div className="mt-10 space-y-12 sm:mt-12 sm:space-y-14">
              {/* Book */}
              <Reveal>
                <article id="book" className="scroll-mt-28 lg:scroll-mt-32">
                  <p className="aw-eyebrow">The Book</p>
                  <h3 className="mt-2 font-display text-xl font-semibold uppercase tracking-[0.04em] text-ink sm:text-2xl">
                    Meet Yourself, Differently.
                  </h3>
                  <p className="mt-1 text-sm text-ink/60">
                    A Map from Emotional Reactivity to Creative Agency.
                  </p>
                  <Verse
                    className="mt-5"
                    lines={[
                      "Begin here",
                      "if you’d like to explore the work",
                      "quietly,",
                      "at your own pace.",
                    ]}
                  />
                  <div className="mt-6">
                    <a href={BOOK_PURCHASE_URL} className="btn-lux btn-lux-primary">
                      {BOOK_PRICE} · Explore the Book
                      <span aria-hidden>→</span>
                    </a>
                  </div>
                </article>
              </Reveal>

              {/* Conversations */}
              <Reveal>
                <article>
                  <p className="aw-eyebrow">Conversations</p>
                  <Verse
                    className="mt-4"
                    lines={[
                      "Watch the philosophy",
                      "come alive",
                      "through reflections,",
                      "teachings,",
                      "and real conversations.",
                    ]}
                  />
                  <div className="mt-6">
                    <a
                      href={CONVERSATIONS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-lux btn-lux-ghost"
                    >
                      Watch Conversations
                      <span aria-hidden>→</span>
                    </a>
                  </div>
                </article>
              </Reveal>

              {/* Clarity Call */}
              <Reveal>
                <article id="clarity" className="scroll-mt-28 lg:scroll-mt-32">
                  <p className="aw-eyebrow">A Clarity Call</p>
                  <Verse
                    className="mt-4"
                    lines={[
                      "An honest conversation",
                      "about where you are,",
                      "what patterns",
                      "keep repeating,",
                      "and whether this work",
                      "feels like",
                      "the right next step.",
                    ]}
                  />
                  <Verse
                    className="mt-5"
                    lines={[
                      "No pressure.",
                      "No performance.",
                      "Just curiosity, generous listening, care,",
                      "and thoughtful inquiry.",
                    ]}
                  />
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href={CLARITY_CALL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-lux btn-lux-primary"
                  >
                    Book a Clarity Call
                    <span aria-hidden>→</span>
                  </a>
                </div>
                  <ul className="mt-5 space-y-2 text-sm text-ink/70">
                    <li>
                <a
                  href={CLARITY_CALL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                        className="underline-offset-4 transition-colors hover:text-ember-deep hover:underline"
                >
                        Option 1. Clarity Conversation (Free · 30 min)
                </a>
                    </li>
                    <li>
                <a
                  href={CLARITY_SESSION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                        className="underline-offset-4 transition-colors hover:text-ember-deep hover:underline"
                >
                        Option 2. Clarity Session (Paid · 90 min)
                </a>
                    </li>
                  </ul>
                </article>
            </Reveal>

              {/* Community */}
            <Reveal>
                <article id="community" className="scroll-mt-28 lg:scroll-mt-32">
                  <p className="aw-eyebrow">The Community</p>
                  <Verse
                    className="mt-4"
                    lines={[
                      "Walk alongside others",
                      "learning to meet",
                      "their inner lives",
                      "with greater awareness,",
                      "honesty,",
                      "and choice.",
                    ]}
                  />
                  <div className="mt-6">
                    <a
                      href={COMMUNITY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-lux btn-lux-ghost"
                    >
                      Explore the Community
                  <span aria-hidden>→</span>
                </a>
              </div>
                </article>
            </Reveal>
            </div>
          </div>
        </section>

        {/* Final */}
        <section className="border-t border-border/40 bg-secondary/30">
          <div className="aw-measure aw-section text-left">
            <Reveal>
              <Verse
                display
                lines={[
                  "Start where you are.",
                  "Bring your curiosity.",
                  "The rest",
                  "will unfold naturally.",
                  "Keep what is true.",
                  "Leave what isn’t.",
                ]}
              />
              <div className="mt-10">
                <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ink">
                  Alchemist Ways
                </p>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  A practical map from Emotional Reactivity to Creative Agency.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <footer className="border-t border-border/60 bg-secondary/30 pb-[env(safe-area-inset-bottom)]">
          <Reveal>
            <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-[max(1.25rem,env(safe-area-inset-left))] py-10 pr-[max(1.25rem,env(safe-area-inset-right))] sm:px-8 sm:py-12 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ink">
                  Alchemist Ways
                </div>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  A practical map from Emotional Reactivity to Creative Agency.
                </p>
              </div>
              <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/alchemistways"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="grid h-11 w-11 place-items-center rounded-full border border-border text-ink transition-colors hover:border-ember hover:text-ember-deep"
                  >
                    <Instagram size={18} />
                  </a>
                  <a
                    href={CONVERSATIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="grid h-11 w-11 place-items-center rounded-full border border-border text-ink transition-colors hover:border-ember hover:text-ember-deep"
                  >
                    <Youtube size={18} />
                  </a>
                  <a
                    href="https://www.tiktok.com/@alchemistways"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="grid h-11 w-11 place-items-center rounded-full border border-border text-ink transition-colors hover:border-ember hover:text-ember-deep"
                  >
                    <TikTokIcon />
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

/* ————— FINAL PDF list copy (client-verbatim) ————— */

const protectWays = [
  "Staying quiet.",
  "Being perfect.",
  "Being defensive.",
  "Avoiding vulnerability.",
  "People-pleasing.",
  "Controlling.",
  "Hiding.",
  "Withdrawing.",
  "Being independent.",
  "Shutting down.",
] as const;

const meetWays = [
  "Self-doubt.",
  "Self-judgment.",
  "Shame.",
  "Comparison.",
  "Holding back parts of yourself.",
  "Self-abandonment.",
  "Never quite feeling enough.",
] as const;

const meetShapes = [
  "Your emotions.",
  "Your thoughts.",
  "Your body.",
  "Your relationships.",
  "Your work.",
  "Your creativity.",
  "Your life.",
] as const;

function Verse({
  lines,
  display = false,
  className = "",
}: {
  lines: readonly string[];
  display?: boolean;
  className?: string;
}) {
  return (
    <div className={`aw-verse ${display ? "aw-verse-display" : ""} ${className}`.trim()}>
      {lines.map((line, i) => (
        <p key={`${i}-${line}`}>{line}</p>
      ))}
    </div>
  );
}

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.16 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.77a8.2 8.2 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1.01-.15z" />
    </svg>
  );
}
