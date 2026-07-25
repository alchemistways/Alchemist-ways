import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Youtube } from "lucide-react";
import malekPortrait from "@/assets/malek-portrait.jpg";
import sceneDropletJpg from "@/assets/scene-droplet.jpg";
import sceneDropletWebp from "@/assets/scene-droplet.webp";
import sceneGalleryJpg from "@/assets/scene-gallery.jpg";
import sceneGalleryWebp from "@/assets/scene-gallery.webp";
import { BeginCarousel } from "@/components/BeginCarousel";
import { BookPlateImage } from "@/components/BookPlateImage";
import { MapScrollJourney } from "@/components/MapScrollJourney";
import { PageEntrance, Reveal } from "@/components/PageMotion";
import { SceneImage } from "@/components/SceneImage";
import { SiteHeader } from "@/components/SiteHeader";
import { WaitlistForm } from "@/components/WaitlistForm";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <PageEntrance>
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />

        {/* Hero — Higgsfield book on the right; copy sits in the open left wall */}
        <section id="top" className="relative overflow-hidden bg-[#d4c4b0] md:min-h-[100svh]">
          <div className="relative h-[min(52svh,440px)] w-full md:absolute md:inset-0 md:h-full">
            <BookPlateImage
              priority
              alt="Meet Yourself, Differently. Alchemist Ways hardcover"
            />
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
              <h1 className="mt-4 flex flex-col items-start gap-1 font-display text-[2.15rem] font-semibold uppercase leading-[0.98] tracking-[-0.04em] text-ink sm:text-5xl md:mt-5 md:text-[2.75rem] lg:text-[3.25rem]">
                <span>Meet Yourself,</span>
                <span
                  className="origin-center font-semibold text-ember-deep"
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

        {/* Opening + recognition — densified Chapters 1–2 */}
        <section className="mx-auto max-w-2xl px-5 py-12 sm:px-8 sm:py-16">
          <Reveal>
            <div className="space-y-6">
              <div className="space-y-2 font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl md:text-[2.15rem]">
                <p>What if nothing within you is against you…</p>
                <p>And everything within you is communicating with you?</p>
              </div>

              <p className="text-base leading-relaxed text-ink/80 sm:text-lg">
                What if every emotion, every reaction, every recurring pattern has been trying to
                tell you something? If that&apos;s true… have I learned how to listen?
              </p>

              <div className="h-px w-10 bg-ember/40" aria-hidden />

              <div className="space-y-2">
                <p className="font-display text-xl font-semibold leading-snug text-ink sm:text-2xl">
                  Everything begins with meeting yourself differently.
                </p>
                <p className="text-base leading-relaxed text-ink/75 sm:text-lg">
                  Learning how to listen is where that relationship begins.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="border-y border-border/60 bg-secondary/40">
          <div className="mx-auto max-w-xl px-5 py-12 sm:px-8 sm:py-16">
            <Reveal>
              <div className="space-y-6">
                <div className="border-l-2 border-ember/45 pl-4 sm:pl-5">
                  <p className="font-display text-xl font-semibold leading-snug text-ink sm:text-2xl">
                    The conversation ended three days ago. You&apos;re still running it.
                  </p>
                </div>

                <div className="space-y-3 text-base leading-relaxed text-ink/80 sm:text-[1.05rem]">
                  <p>You said yes. You meant something different.</p>
                  <p>You understand yourself clearly. Nothing has changed.</p>
                  <p>You promised yourself it wouldn&apos;t happen again. It did.</p>
                  <p>You keep reacting in ways you don&apos;t fully understand.</p>
                </div>

                <p className="font-display text-lg font-semibold leading-snug text-ink sm:text-xl">
                  These aren&apos;t failures. They&apos;re intelligent ways you learned to protect
                  yourself.
                </p>

                <div className="space-y-3 text-base leading-relaxed text-ink/80 sm:text-[1.05rem]">
                  <p>
                    The patterns you&apos;ve been fighting — the overthinking, the people-pleasing,
                    the reactive anger, the endless self-monitoring — didn&apos;t appear randomly.
                    They formed where those responses served a purpose: stay safe, preserve
                    connection, anticipate conflict, manage what your environment couldn&apos;t hold.
                  </p>
                  <p className="font-display text-lg text-ink sm:text-xl">
                    At one time, they made perfect sense. The difficulty is that they remained long
                    after they were needed.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Emotional Reactivity + Triggers */}
        <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-semibold uppercase tracking-[0.06em] text-ink sm:text-3xl md:text-4xl">
                Emotional Reactivity
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink/80 sm:text-lg">
                Emotional Reactivity doesn&apos;t always look dramatic. Sometimes it becomes
                obvious. Sometimes it becomes invisible. Sometimes it simply becomes the way
                we&apos;ve learned to survive. It may express itself through…
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-8 sm:grid-cols-3 sm:gap-6 lg:gap-8">
            {reactivityModes.map((mode, i) => (
              <Reveal key={mode.title} delay={i * 60}>
                <div className="border-t border-ember/30 pt-4">
                  <h3 className="font-display text-lg font-semibold text-ink sm:text-xl">
                    {mode.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/75 whitespace-pre-line sm:text-[0.95rem]">
                    {mode.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={160}>
            <div className="mt-8 max-w-lg space-y-1 font-display text-lg font-semibold leading-snug text-ink sm:text-xl">
              <p>Different expressions. The same invitation.</p>
              <p className="text-base font-normal text-ink/70 sm:text-lg">
                To understand what your protective system has been carrying.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-12 max-w-xl border-t border-border/60 pt-8 sm:mt-14 sm:pt-10">
              <h2 className="font-display text-2xl font-semibold uppercase leading-tight tracking-[0.04em] text-ink sm:text-3xl md:text-4xl">
                Your Triggers Are the Doorway.
              </h2>
              <div className="mt-5 space-y-3 text-base leading-relaxed text-ink/80 sm:text-lg">
                <p>
                  A trigger is rarely only about what is happening now. It often reveals what the
                  past taught you to expect, protect, suppress, or become.
                </p>
                <p className="font-display text-lg text-ink sm:text-xl">
                  The invitation isn&apos;t to eliminate the reaction. It&apos;s to understand what
                  it has been carrying.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* The book is the map — triggers → map → agency */}
        <section className="bg-gradient-to-b from-secondary/35 via-secondary/20 to-background">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
            <Reveal>
              <SceneImage
                jpg={sceneGalleryJpg}
                webp={sceneGalleryWebp}
                alt="Meet Yourself, Differently. — hardcover standing in a gallery interior"
                width={2752}
                height={1536}
                blend
                blendFromClassName="from-background"
                imgClassName="aspect-[16/10] w-full object-cover object-[52%_42%] sm:aspect-[16/9]"
              />
            </Reveal>
            <Reveal delay={80}>
              <div className="max-w-md">
                <p className="text-[0.65rem] uppercase tracking-[0.28em] text-ember-deep">
                  The book is the map
                </p>
                <h2 className="mt-3 font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">
                  Your triggers are the doorway.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-ink/80 sm:text-lg">
                  A Map from Emotional Reactivity to Creative Agency — five movements for learning
                  the language of your own experience.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a href="#waitlist" className="btn-lux btn-lux-primary w-full sm:w-auto">
                    Join the Waitlist
                  </a>
                  <a href="#map" className="btn-lux btn-lux-sand w-full sm:w-auto">
                    Explore the Map
                    <span aria-hidden>↓</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* The Map — continues the doorway → book → walk beat */}
        <div id="map" className="scroll-mt-24">
          <MapScrollJourney />
        </div>

        {/* About Malek */}
        <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-14 sm:px-8 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-12">
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
                <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                  About Malek
                </h2>
              </Reveal>

              <div className="mt-5 space-y-4 text-base leading-relaxed text-ink/80 sm:mt-6 sm:space-y-5 sm:text-lg">
                <Reveal delay={40}>
                  <p>
                    For years, I thought I was searching for freedom. Validation. Creativity. Love.
                    Yet beneath all those desires was something quieter — something I couldn&apos;t
                    yet see. I was searching for inner safety.
                  </p>
                </Reveal>
                <Reveal delay={80}>
                  <p>
                    Not physical safety. The kind that allows someone to express themselves honestly,
                    to create without constantly second-guessing, to speak without silently holding
                    back, to live instead of performing.
                  </p>
                </Reveal>
                <Reveal delay={120}>
                  <p>
                    At the time, I couldn&apos;t see beyond my conditioning. Despite my strengths,
                    ambitions, and creativity, much of my life felt shaped by fear, self-doubt,
                    shame, anxiety, and emotional reactivity.
                  </p>
                </Reveal>
                <Reveal delay={160}>
                  <p>
                    Eventually, life slowed me down enough to ask a different question. Not,
                    &ldquo;How do I fix myself?&rdquo; But… &ldquo;What is this experience trying to
                    communicate?&rdquo;
                  </p>
                </Reveal>
                <Reveal delay={200}>
                  <p>
                    The Map emerged slowly — through observation, practice, discomfort, radical
                    honesty, and the privilege of walking beside others doing the same.
                  </p>
                </Reveal>
                <Reveal delay={240}>
                  <p className="pt-1 font-display text-xl italic text-ink">— Malek Najm Ghaleb</p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Invitation — droplet detail fills the quiet beat */}
        <section className="relative overflow-hidden border-y border-border/60 bg-[#ebe3d6]">
          <div className="absolute inset-0" aria-hidden>
            <SceneImage
              jpg={sceneDropletJpg}
              webp={sceneDropletWebp}
              alt=""
              width={2752}
              height={1536}
              className="absolute inset-0 h-full w-full"
              imgClassName="h-full w-full object-cover object-[50%_58%] opacity-[0.92]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#ebe3d6]/92 via-[#ebe3d6]/72 to-[#ebe3d6]/35 sm:via-[#ebe3d6]/55 sm:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#ebe3d6]/50 via-transparent to-[#ebe3d6]/40" />
          </div>
          <div className="relative mx-auto flex min-h-[min(52svh,28rem)] max-w-6xl items-center px-5 py-16 sm:px-8 sm:py-20 lg:min-h-[min(48svh,30rem)]">
            <Reveal>
              <div className="max-w-md">
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-ember-deep">
                  An Invitation
                </div>
                <div className="mt-6 space-y-2 font-display text-2xl font-semibold leading-snug text-ink sm:space-y-2.5 sm:text-3xl">
                  <p>Remain curious.</p>
                  <p>Explore the Map.</p>
                  <p>Test it against your own experience.</p>
                </div>
                <p className="mt-6 max-w-md text-base leading-relaxed text-ink/80 sm:mt-7 sm:text-lg">
                  Alchemist Ways is an invitation, not to become someone else, but to discover a
                  different relationship with yourself.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Ways to Begin */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <Reveal>
              <div className="text-center">
                <h2 className="font-display text-2xl font-semibold leading-tight text-ink sm:text-4xl md:text-5xl">
                  There Are Several Ways to Begin
                </h2>
              </div>
            </Reveal>
          </div>

          {/* The Book — full-bleed environment; copy left, book visible on right */}
          <Reveal className="mt-10 sm:mt-12">
            <div id="book" className="relative scroll-mt-28 overflow-hidden bg-[#d4c4b0]">
              <div className="relative h-[min(46svh,400px)] w-full md:absolute md:inset-0 md:h-full">
                <BookPlateImage
                  alt="Meet Yourself, Differently. Hardcover standing in a sand corridor"
                  objectPositionClassName="object-[78%_50%] sm:object-[72%_50%] md:object-[68%_48%] lg:object-[62%_45%]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent md:hidden"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 hidden w-[min(52%,36rem)] bg-gradient-to-r from-[#cfc0ab]/80 via-[#cfc0ab]/35 to-transparent md:block"
                />
              </div>

              <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col bg-background px-5 pb-12 pt-5 md:min-h-[min(68svh,36rem)] md:bg-transparent md:px-8 md:pb-16 md:pt-14 lg:px-12">
                <div className="flex w-full flex-1 flex-col justify-center gap-0 md:max-w-[min(100%,24rem)] lg:max-w-[26rem]">
                  <div className="text-sm font-semibold uppercase tracking-[0.22em] text-ember-deep md:text-[#3a2a1f]/75">
                    The Book
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-semibold uppercase leading-tight text-ink sm:text-3xl md:text-4xl md:text-[#2a1f16]">
                    Meet Yourself, Differently.
                  </h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.14em] text-ink/60 sm:text-sm md:text-[#3a2a1f]/65">
                    A Map from Emotional Reactivity to Creative Agency.
                  </p>
                  <p className="mt-5 text-base leading-relaxed text-ink/80 sm:mt-5 sm:text-lg md:text-[#3a2a1f]/85">
                    Meet Yourself, Differently is an invitation to discover a new relationship with
                    yourself. Through the lens of Emotional Reactivity, Awareness, Integration,
                    Sovereignty, and Creative Agency, it offers a practical map for understanding
                    what your experience has been trying to communicate, and how that understanding
                    can naturally become greater clarity, freedom, and authentic self-expression.
                  </p>
                  <p className="mt-4 text-base text-ink/75 sm:text-lg md:text-[#3a2a1f]/75">
                    Begin here if you&apos;d like to explore the work quietly, at your own pace.
                  </p>
                  <a href="#waitlist" className="btn-lux btn-lux-primary mt-6 inline-flex w-full justify-center sm:w-fit">
                    Explore the Book
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Second angle — gallery standing-book, soft-merged */}
          <Reveal delay={60} className="mx-auto mt-8 max-w-6xl px-5 sm:mt-10 sm:px-8">
            <div className="grid items-end gap-6 md:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] md:gap-10">
              <SceneImage
                jpg={sceneGalleryJpg}
                webp={sceneGalleryWebp}
                alt="Meet Yourself, Differently. hardcover standing in a gallery interior"
                width={2752}
                height={1536}
                blend
                blendFromClassName="from-background"
                imgClassName="aspect-[21/9] w-full object-cover object-[52%_40%] sm:aspect-[2.4/1]"
              />
              <p className="max-w-xs text-sm leading-relaxed text-ink/70 sm:text-base md:pb-3">
                Meet Yourself, Differently. — A Map from Emotional Reactivity to Creative Agency.
              </p>
            </div>
          </Reveal>

          <div className="mx-auto mt-12 max-w-5xl px-5 sm:mt-16 sm:px-8">
            <Reveal delay={80}>
              <BeginCarousel />
            </Reveal>
          </div>
        </section>

        {/* Final + Waitlist */}
        <section
          id="waitlist"
          className="relative scroll-mt-28 overflow-hidden border-t border-border/60 bg-secondary/40"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background: "radial-gradient(ellipse at 50% 0%, var(--ember-soft), transparent 60%)",
            }}
          />
          <div className="relative mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
            <Reveal>
              <div className="text-center">
                <div className="space-y-1 font-display text-xl leading-snug text-ink sm:space-y-1.5 sm:text-3xl">
                  <p>Start where you are.</p>
                  <p>Bring your curiosity.</p>
                  <p>The rest will unfold naturally.</p>
                  <p className="pt-1 text-lg text-ink/75 sm:text-2xl">
                    Keep what is true. Leave what isn&apos;t.
                  </p>
                </div>
                <div className="mx-auto mt-8 h-px w-10 bg-ember/40 sm:mt-10" aria-hidden />
                <h2 className="mt-6 font-display text-2xl font-semibold leading-tight text-ink sm:mt-8 sm:text-4xl">
                  Continue the exploration.
                </h2>
                <p className="mx-auto mt-3 max-w-md text-[0.95rem] text-ink/75 sm:text-base">
                  Receive reflections, conversations, and updates from Alchemist Ways.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120} className="mt-8">
              <WaitlistForm />
            </Reveal>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-secondary/30 pb-[env(safe-area-inset-bottom)]">
          <Reveal>
            <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-5 py-10 sm:px-8 sm:py-12 md:flex-row md:items-center md:justify-between">
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
                    href="https://www.youtube.com/@alchemistwaysofficial"
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
