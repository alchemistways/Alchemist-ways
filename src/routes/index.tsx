import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube } from "lucide-react";
import bookCover from "@/assets/book-meet.jpg";
import heroMeet from "@/assets/hero-meet-4k.jpg";
import heroMeetSm from "@/assets/hero-meet.jpg";
import malekPortrait from "@/assets/malek-portrait.jpg";
import { MapScrollJourney } from "@/components/MapScrollJourney";
import { PageEntrance, Reveal } from "@/components/PageMotion";
import { SiteHeader } from "@/components/SiteHeader";
import { WaitlistForm } from "@/components/WaitlistForm";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const CONVERSATIONS_URL = "https://www.youtube.com/@alchemistwaysofficial";
const CLARITY_FREE_URL = "https://calendly.com/alchemistways/conversation";
const CLARITY_PAID_URL = "https://calendly.com/alchemistways/clarity-session";
const COMMUNITY_URL = "https://www.skool.com/alchemist-ways-1974/about";

function LandingPage() {
  return (
    <PageEntrance>
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />

        {/* Hero — Higgsfield book on the right; copy sits in the open left wall */}
        <section id="top" className="relative overflow-hidden bg-[#d4c4b0] md:min-h-[100svh]">
          <div className="relative h-[min(48svh,400px)] w-full md:absolute md:inset-0 md:h-full">
            <picture>
              <source media="(min-width: 768px)" srcSet={heroMeet} />
              <img
                src={heroMeetSm}
                alt="Meet Yourself, Differently — Alchemist Ways hardcover"
                width={3840}
                height={2140}
                fetchPriority="high"
                decoding="async"
                sizes="100vw"
                className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-[72%_48%] md:object-[68%_50%] lg:object-[62%_48%]"
              />
            </picture>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent md:hidden"
            />
            {/* Soft left wash so copy stays legible without covering the book */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 hidden w-[min(48%,34rem)] bg-gradient-to-r from-[#cfc0ab]/75 via-[#cfc0ab]/25 to-transparent md:block"
            />
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col bg-background px-5 pb-14 pt-5 md:min-h-[100svh] md:bg-transparent md:px-8 md:pb-24 md:pt-28 lg:px-12">
            <div className="hero-stagger flex w-full flex-1 flex-col justify-center md:max-w-[min(100%,24rem)] lg:max-w-[26rem]">
              <p className="text-[0.65rem] uppercase tracking-[0.32em] text-ember-deep md:text-[#3a2a1f]/70">
                Alchemist Ways
              </p>
              <h1 className="mt-4 flex flex-col items-start gap-1 font-display text-[2.1rem] uppercase leading-[1.05] tracking-[0.03em] text-ink sm:text-5xl md:mt-5 md:text-[2.65rem] lg:text-[3.1rem]">
                <span>Meet Yourself,</span>
                <span
                  className="origin-center text-ember-deep"
                  style={{ transform: "rotate(180deg)" }}
                >
                  Differently.
                </span>
              </h1>
              <p className="mt-6 max-w-sm text-balance text-[1.02rem] leading-relaxed text-ink/80 sm:text-lg md:text-[#3a2a1f]/85">
                A practical map for discovering a different relationship with yourself.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href="#map" className="btn-lux btn-lux-primary w-full sm:w-auto">
                  Explore The Map
                  <span aria-hidden>↓</span>
                </a>
                <a href="#book" className="btn-lux btn-lux-sand w-full sm:w-auto">
                  Get the Book
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section One */}
        <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <div className="space-y-8 text-center">
              <p className="font-display text-2xl leading-snug text-ink sm:text-3xl md:text-4xl">
                What if nothing within you is against you…
              </p>
              <p className="font-display text-2xl leading-snug text-ink sm:text-3xl md:text-4xl">
                And everything within you is communicating with you?
              </p>
              <div className="mx-auto h-px w-10 bg-ember/40" aria-hidden />
              <div className="space-y-4 text-lg leading-relaxed text-ink/80 sm:text-xl">
                <p>What if every emotion…</p>
                <p>every reaction…</p>
                <p>every recurring pattern…</p>
                <p>has been trying to tell you something?</p>
              </div>
              <p className="font-display text-xl italic text-ink/70 sm:text-2xl">
                If that&apos;s true…
                <br />
                have I learned how to listen?
              </p>
            </div>
          </Reveal>
        </section>

        {/* Section Two */}
        <section className="border-y border-border/60 bg-secondary/40">
          <div className="mx-auto max-w-2xl px-5 py-20 sm:px-8 sm:py-28">
            <Reveal>
              <div className="space-y-10 text-center">
                <div className="space-y-3">
                  <p className="font-display text-2xl leading-snug text-ink sm:text-3xl">
                    The conversation ended three days ago.
                  </p>
                  <p className="font-display text-2xl leading-snug text-ink sm:text-3xl">
                    You&apos;re still running it.
                  </p>
                </div>
                <div className="mx-auto h-px w-8 bg-ember/35" aria-hidden />
                <div className="space-y-8 text-lg leading-relaxed text-ink/80">
                  <p>
                    You said yes.
                    <br />
                    You meant something different.
                  </p>
                  <p>
                    You understand yourself clearly.
                    <br />
                    Nothing has changed.
                  </p>
                  <p>
                    You promised yourself it wouldn&apos;t happen again.
                    <br />
                    It did.
                  </p>
                  <p>You keep reacting in ways you don&apos;t fully understand.</p>
                </div>
                <div className="mx-auto h-px w-8 bg-ember/35" aria-hidden />
                <div className="space-y-3 font-display text-xl leading-snug text-ink sm:text-2xl">
                  <p>These aren&apos;t failures.</p>
                  <p>They&apos;re intelligent ways you learned to protect yourself.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Section Three */}
        <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <div className="space-y-6 text-lg leading-relaxed text-ink/80 sm:text-xl">
              <p>The patterns you&apos;ve been fighting—</p>
              <ul className="space-y-1 pl-1">
                <li>the overthinking,</li>
                <li>the people-pleasing,</li>
                <li>the reactive anger,</li>
                <li>the endless self-monitoring—</li>
              </ul>
              <p>didn&apos;t appear randomly.</p>
              <p>They formed in conditions where those responses served a purpose.</p>
              <div className="space-y-1 pt-2">
                <p>They helped you stay safe.</p>
                <p>Preserve connection.</p>
                <p>Anticipate conflict.</p>
                <p>Manage what your environment couldn&apos;t hold.</p>
              </div>
              <p className="pt-2 font-display text-xl text-ink sm:text-2xl">
                At one time,
                <br />
                they made perfect sense.
              </p>
              <p>
                The difficulty is that they remained
                <br />
                long after they were needed.
              </p>
            </div>
          </Reveal>
        </section>

        {/* Section Four */}
        <section className="border-y border-border/60 bg-secondary/30">
          <div className="mx-auto max-w-2xl px-5 py-20 text-center sm:px-8 sm:py-28">
            <Reveal>
              <div className="space-y-6">
                <p className="font-display text-2xl leading-snug text-ink sm:text-3xl md:text-4xl">
                  Everything begins…
                  <br />
                  with meeting yourself differently.
                </p>
                <p className="text-lg leading-relaxed text-ink/75 sm:text-xl">
                  Learning how to listen
                  <br />
                  is where that relationship begins.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Emotional Reactivity triptych */}
        <section className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <div className="text-center">
              <h2 className="font-display text-3xl uppercase tracking-[0.06em] text-ink sm:text-4xl md:text-5xl">
                Emotional Reactivity
              </h2>
              <div className="mx-auto mt-8 max-w-2xl space-y-4 text-lg leading-relaxed text-ink/80">
                <p>Emotional Reactivity doesn&apos;t always look dramatic.</p>
                <p>Sometimes it becomes obvious.</p>
                <p>Sometimes it becomes invisible.</p>
                <p>Sometimes it simply becomes the way we&apos;ve learned to survive.</p>
                <p className="pt-2 text-ink/70">It may express itself through…</p>
              </div>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {reactivityModes.map((mode, i) => (
              <Reveal key={mode.title} delay={i * 80}>
                <div className="text-center sm:text-left">
                  <h3 className="font-display text-xl text-ink sm:text-2xl">{mode.title}</h3>
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-ink/75 whitespace-pre-line">
                    {mode.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mx-auto mt-14 max-w-xl space-y-2 text-center font-display text-xl leading-snug text-ink sm:text-2xl">
              <p>Different expressions.</p>
              <p>The same invitation.</p>
              <p className="pt-2 text-lg text-ink/70 sm:text-xl">
                To understand what your protective system has been carrying.
              </p>
            </div>
          </Reveal>
        </section>

        {/* Triggers */}
        <section className="border-y border-border/60 bg-secondary/40">
          <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-28">
            <Reveal>
              <h2 className="font-display text-3xl uppercase leading-tight tracking-[0.04em] text-ink sm:text-4xl md:text-5xl">
                Your Triggers Are the Doorway.
              </h2>
              <div className="mx-auto mt-10 max-w-xl space-y-5 text-lg leading-relaxed text-ink/80">
                <p>A trigger is rarely only about what is happening now.</p>
                <p>
                  It often reveals
                  <br />
                  what the past taught you to expect.
                  <br />
                  To protect.
                  <br />
                  To suppress.
                  <br />
                  To become.
                </p>
                <p className="pt-2 font-display text-xl text-ink sm:text-2xl">
                  The invitation isn&apos;t to eliminate the reaction.
                  <br />
                  It&apos;s to understand
                  <br />
                  what it has been carrying.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* The Map */}
        <div id="map">
          <MapScrollJourney />
        </div>

        {/* About Malek */}
        <section id="about" className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
              <div className="mx-auto w-full max-w-sm lg:mx-0">
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
              <div>
                <div className="text-[0.65rem] uppercase tracking-[0.28em] text-ember-deep">
                  About Malek
                </div>
                <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/80">
                  <p>
                    For years,
                    <br />
                    I thought I was searching
                    <br />
                    for freedom.
                    <br />
                    Validation.
                    <br />
                    Creativity.
                    <br />
                    Love.
                  </p>
                  <p>
                    Yet beneath all those desires
                    <br />
                    was something quieter.
                    <br />
                    Something
                    <br />I couldn&apos;t yet see.
                  </p>
                  <p>
                    I was searching
                    <br />
                    for inner safety.
                  </p>
                  <p>
                    Not physical safety.
                    <br />
                    The kind of inner safety
                    <br />
                    that allows someone
                    <br />
                    to express themselves honestly.
                    <br />
                    To create art
                    <br />
                    without constantly second-guessing themselves.
                    <br />
                    To speak
                    <br />
                    without silently holding back.
                    <br />
                    To live
                    <br />
                    instead of performing.
                  </p>
                  <p>
                    At the time,
                    <br />
                    I couldn&apos;t see beyond
                    <br />
                    my conditioning.
                    <br />
                    I only knew
                    <br />
                    that despite my strengths,
                    <br />
                    my ambitions,
                    <br />
                    and my creativity,
                    <br />
                    much of my life felt shaped by fear,
                    <br />
                    self-doubt,
                    <br />
                    shame,
                    <br />
                    anxiety,
                    <br />
                    and emotional reactivity.
                  </p>
                  <p>
                    Eventually,
                    <br />
                    life slowed me down enough
                    <br />
                    to ask
                    <br />a different question.
                  </p>
                  <p>
                    Not,
                    <br />
                    &ldquo;How do I fix myself?&rdquo;
                    <br />
                    But…
                    <br />
                    &ldquo;What is this experience trying to communicate?&rdquo;
                  </p>
                  <p>
                    The Map emerged slowly.
                    <br />
                    Through observation.
                    <br />
                    Practice.
                    <br />
                    Discomfort.
                    <br />
                    Radical honesty.
                    <br />
                    And through the privilege
                    <br />
                    of walking beside others
                    <br />
                    doing the same.
                  </p>
                  <p className="pt-4 font-display text-xl italic text-ink">— Malek Najm Ghaleb</p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Invitation */}
        <section className="border-y border-border/60 bg-secondary/40">
          <div className="mx-auto max-w-2xl px-5 py-20 text-center sm:px-8 sm:py-28">
            <Reveal>
              <div className="text-[0.65rem] uppercase tracking-[0.28em] text-ember-deep">
                An Invitation
              </div>
              <div className="mt-8 space-y-4 font-display text-2xl leading-snug text-ink sm:text-3xl">
                <p>Remain curious.</p>
                <p>Explore the Map.</p>
                <p>
                  Test it
                  <br />
                  against your own experience.
                </p>
                <p>Keep what is true.</p>
                <p>Leave what isn&apos;t.</p>
              </div>
              <p className="mx-auto mt-10 max-w-md text-lg leading-relaxed text-ink/75">
                Alchemist Ways is an invitation—
                <br />
                not to become someone else—
                <br />
                but to discover
                <br />
                a different relationship
                <br />
                with yourself.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Ways to Begin */}
        <section id="book" className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <div className="text-center">
              <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl md:text-5xl">
                There Are Several Ways to Begin
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 space-y-16">
            {/* The Book */}
            <Reveal>
              <div className="grid gap-10 md:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] md:items-center md:gap-14">
                <img
                  src={bookCover}
                  alt="Meet Yourself, Differently — book cover"
                  width={800}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                  className="mx-auto w-full max-w-[16rem] object-contain md:max-w-none"
                />
                <div>
                  <div className="text-[0.65rem] uppercase tracking-[0.28em] text-ember-deep">
                    The Book
                  </div>
                  <h3 className="mt-3 font-display text-2xl uppercase leading-tight text-ink sm:text-3xl">
                    Meet Yourself, Differently.
                  </h3>
                  <p className="mt-2 text-sm uppercase tracking-[0.14em] text-ink/60">
                    A Map from Emotional Reactivity to Creative Agency.
                  </p>
                  <p className="mt-6 leading-relaxed text-ink/80">
                    Meet Yourself, Differently is an invitation to discover a new relationship with
                    yourself. Through the lens of Emotional Reactivity, Awareness, Integration,
                    Sovereignty, and Creative Agency, it offers a practical map for understanding
                    what your experience has been trying to communicate—and how that understanding
                    can naturally become greater clarity, freedom, and authentic self-expression.
                  </p>
                  <p className="mt-4 text-ink/75">
                    Begin here if you&apos;d like to explore the work quietly, at your own pace.
                  </p>
                  <a href="#waitlist" className="btn-lux btn-lux-primary mt-6 inline-flex">
                    Explore the Book
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Conversations */}
            <Reveal>
              <div id="conversations" className="scroll-mt-24 border-t border-border/60 pt-14">
                <div className="text-[0.65rem] uppercase tracking-[0.28em] text-ember-deep">
                  Conversations
                </div>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/80">
                  Watch the philosophy come alive through reflections, teachings, and real
                  conversations.
                </p>
                <a
                  href={CONVERSATIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-lux btn-lux-sand mt-6 inline-flex"
                >
                  Watch Conversations
                  <span aria-hidden>→</span>
                </a>
              </div>
            </Reveal>

            {/* Clarity Call */}
            <Reveal>
              <div id="clarity-call" className="scroll-mt-24 border-t border-border/60 pt-14">
                <div className="text-[0.65rem] uppercase tracking-[0.28em] text-ember-deep">
                  A Clarity Call
                </div>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/80">
                  An honest conversation about where you are, what patterns keep repeating, and
                  whether this work feels like the right next step.
                </p>
                <p className="mt-4 max-w-xl leading-relaxed text-ink/70">
                  No pressure. No performance. Just curiosity, generous listening, care, and
                  thoughtful inquiry.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={CLARITY_FREE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-lux btn-lux-primary inline-flex"
                  >
                    Clarity Conversation (Free · 30 min)
                  </a>
                  <a
                    href={CLARITY_PAID_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-lux btn-lux-sand inline-flex"
                  >
                    Clarity Session (Paid · 90 min)
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Community */}
            <Reveal>
              <div className="border-t border-border/60 pt-14">
                <div className="text-[0.65rem] uppercase tracking-[0.28em] text-ember-deep">
                  The Community
                </div>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/80">
                  Walk alongside others learning to meet their inner lives with greater awareness,
                  honesty, and choice.
                </p>
                <a
                  href={COMMUNITY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-lux btn-lux-sand mt-6 inline-flex"
                >
                  Explore the Community
                  <span aria-hidden>→</span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Final + Waitlist */}
        <section
          id="waitlist"
          className="relative overflow-hidden border-y border-border/60 bg-secondary/40"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background: "radial-gradient(ellipse at 50% 0%, var(--ember-soft), transparent 60%)",
            }}
          />
          <div className="relative mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
            <Reveal>
              <div className="text-center">
                <div className="space-y-3 font-display text-2xl leading-snug text-ink sm:text-3xl">
                  <p>Start where you are.</p>
                  <p>Bring your curiosity.</p>
                  <p>
                    The rest
                    <br />
                    will unfold naturally.
                  </p>
                </div>
                <p className="mt-8 text-ink/70">
                  Keep what is true.
                  <br />
                  Leave what isn&apos;t.
                </p>
                <div className="mx-auto mt-12 h-px w-10 bg-ember/40" aria-hidden />
                <h2 className="mt-12 font-display text-3xl leading-tight text-ink sm:text-4xl">
                  Continue the exploration.
                </h2>
                <p className="mx-auto mt-4 max-w-md text-ink/75">
                  Receive reflections, conversations, and updates from Alchemist Ways.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120} className="mt-10">
              <WaitlistForm />
            </Reveal>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/60 bg-secondary/30">
          <Reveal>
            <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-display text-[0.7rem] uppercase tracking-[0.3em] text-ink">
                  Alchemist Ways
                </div>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  A practical map from Emotional Reactivity to Creative Agency.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/alchemistways"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="grid h-10 w-10 place-items-center rounded-full border border-border text-ink transition-colors hover:border-ember hover:text-ember-deep"
                  >
                    <Instagram size={18} />
                  </a>
                  <a
                    href="https://www.youtube.com/@alchemistwaysofficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="grid h-10 w-10 place-items-center rounded-full border border-border text-ink transition-colors hover:border-ember hover:text-ember-deep"
                  >
                    <Youtube size={18} />
                  </a>
                  <a
                    href="https://www.tiktok.com/@alchemistways"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="grid h-10 w-10 place-items-center rounded-full border border-border text-ink transition-colors hover:border-ember hover:text-ember-deep"
                  >
                    <TikTokIcon />
                  </a>
                  <a
                    href="https://x.com/alchemistways"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X (formerly Twitter)"
                    className="grid h-10 w-10 place-items-center rounded-full border border-border text-ink transition-colors hover:border-ember hover:text-ember-deep"
                  >
                    <Twitter size={18} />
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

const reactivityModes = [
  {
    title: "Acting Out",
    body: "When energy moves outward\nbefore awareness has a chance to respond.",
  },
  {
    title: "Shutting Down",
    body: "When the nervous system withdraws\nfrom experience.",
  },
  {
    title: "Suppressing",
    body: "When thoughts,\nemotions,\nneeds,\nor impulses\nare continually pushed aside\nto preserve safety,\nconnection,\nor control.",
  },
];

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.16 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.77a8.2 8.2 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1.01-.15z" />
    </svg>
  );
}
