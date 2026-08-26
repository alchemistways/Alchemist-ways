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
 * Landing flow per the client REVISED PDF (18 pp.):
 * Hero → sections 1–10 → final closer. Copy is client-verbatim poetic stacks.
 * Anchors kept for CTAs: #map, #about, #book, #clarity, #community.
 */
function LandingPage() {
  return (
    <PageEntrance>
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />

        {/* Hero — REVISED p.1 */}
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
                A practical map for discovering a different relationship with yourself.
              </p>

              <div className="mt-9 flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
                <a href="#map" className="btn-lux btn-lux-primary w-full sm:w-auto">
                  Explore The Map
                  <span aria-hidden>↓</span>
                </a>
                <a href="#book" className="btn-lux btn-lux-ghost w-full sm:w-auto">
                  Get the Book
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* S1 */}
        <section className="aw-section">
          <div className="aw-measure">
            <Reveal>
              <Verse
                display
                lines={[
                  "What if nothing within you is against you…",
                  "And everything within you is communicating with you?",
                ]}
              />
            </Reveal>
            <Reveal>
              <hr className="aw-rule aw-rule-tight" />
              <Verse
                lines={[
                  "What if every emotion…",
                  "every reaction…",
                  "every recurring pattern…",
                  "has been trying to tell you something?",
                ]}
              />
              <Verse className="mt-6" lines={["If that’s true…", "have I learned how to listen?"]} />
            </Reveal>
          </div>
        </section>

        {/* S2 */}
        <section className="border-y border-border/40 bg-secondary/30">
          <div className="aw-measure aw-section">
            <Reveal>
              <div className="space-y-8">
                <Verse
                  display
                  lines={["The conversation ended three days ago.", "You’re still running it."]}
                />
                <Verse display lines={["You said yes.", "You meant something different."]} />
                <Verse display lines={["You understand yourself clearly.", "Nothing has changed."]} />
                <Verse
                  display
                  lines={["You promised yourself it wouldn’t happen again.", "It did."]}
                />
                <Verse display lines={["You keep reacting in ways you don’t fully understand."]} />
              </div>
            </Reveal>
            <Reveal>
              <hr className="aw-rule aw-rule-tight" />
              <Verse
                display
                lines={[
                  "These aren’t failures.",
                  "They’re intelligent ways you learned to protect yourself.",
                ]}
              />
            </Reveal>
          </div>
        </section>

        {/* S3 */}
        <section className="aw-section">
          <div className="aw-measure">
            <Reveal>
              <Verse
                display
                lines={[
                  "The patterns you’ve been fighting—",
                  "the overthinking,",
                  "the people-pleasing,",
                  "the reactive anger,",
                  "the endless self-monitoring—",
                  "didn’t appear randomly.",
                ]}
              />
            </Reveal>
            <Reveal>
              <Verse
                className="mt-8"
                lines={[
                  "They formed in conditions where those responses served a purpose.",
                  "They helped you stay safe.",
                  "Preserve connection.",
                  "Anticipate conflict.",
                  "Manage what your environment couldn’t hold.",
                ]}
              />
              <Verse
                className="mt-6"
                lines={["At one time,", "they made perfect sense."]}
              />
              <Verse
                className="mt-6"
                lines={[
                  "The difficulty is that they remained",
                  "long after they were needed.",
                ]}
              />
            </Reveal>
          </div>
        </section>

        {/* S4 */}
        <section className="border-y border-border/40 bg-secondary/25">
          <div className="aw-measure aw-section">
            <Reveal>
              <Verse
                display
                lines={[
                  "Everything begins…",
                  "with meeting yourself differently.",
                ]}
              />
              <Verse
                className="mt-6"
                lines={["Learning how to listen", "is where that relationship begins."]}
              />
            </Reveal>
          </div>
        </section>

        {/* S5 — Emotional Reactivity */}
        <section className="aw-section">
          <div className="aw-measure aw-measure-wide">
            <Reveal>
              <h2 className="aw-display aw-display-caps">Emotional Reactivity</h2>
              <Verse
                className="mt-6 max-w-2xl"
                lines={[
                  "Emotional Reactivity doesn’t always look dramatic.",
                  "Sometimes it becomes obvious.",
                  "Sometimes it becomes invisible.",
                  "Sometimes it simply becomes the way we’ve learned to survive.",
                  "It may express itself through…",
                ]}
              />
            </Reveal>
            <div className="aw-cols mt-10 sm:mt-12">
              {reactivityModes.map((mode) => (
                <Reveal key={mode.title}>
                  <div className="aw-col-rule">
                    <h3 className="aw-col-title">{mode.title}</h3>
                    <Verse className="mt-3" lines={mode.lines} />
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <hr className="aw-rule aw-rule-tight" />
              <Verse
                display
                lines={["Different expressions.", "The same invitation."]}
              />
              <Verse
                className="mt-3"
                lines={["To understand what your protective system has been carrying."]}
              />
            </Reveal>
          </div>
        </section>

        {/* S6 */}
        <section className="border-y border-border/40 bg-secondary/30">
          <div className="aw-measure aw-section">
            <Reveal>
              <h2 className="aw-display aw-display-caps">
                Your Triggers Are the Doorway.
              </h2>
              <Verse
                className="mt-6"
                lines={[
                  "A trigger is rarely only about what is happening now.",
                  "It often reveals",
                  "what the past taught you to expect.",
                  "To protect.",
                  "To suppress.",
                  "To become.",
                ]}
              />
              <Verse
                className="mt-6"
                lines={[
                  "The invitation isn’t to eliminate the reaction.",
                  "It’s to understand",
                  "what it has been carrying.",
                ]}
              />
            </Reveal>
          </div>
        </section>

        {/* S7 — The Map */}
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

/* ————— REVISED PDF poetic helpers ————— */

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

const reactivityModes = [
  {
    title: "Acting Out",
    lines: [
      "When energy moves outward",
      "before awareness has a chance to respond.",
    ],
  },
  {
    title: "Shutting Down",
    lines: ["When the nervous system withdraws", "from experience."],
  },
  {
    title: "Suppressing",
    lines: [
      "When thoughts,",
      "emotions,",
      "needs,",
      "or impulses",
      "are continually pushed aside",
      "to preserve safety,",
      "connection,",
      "or control.",
    ],
  },
] as const;

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.16 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.77a8.2 8.2 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1.01-.15z" />
    </svg>
  );
}
