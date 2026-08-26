import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Youtube } from "lucide-react";
import type { ReactNode } from "react";
import malekPortrait from "@/assets/malek-portrait.jpg";
import sceneDropletJpg from "@/assets/scene-droplet.jpg";
import sceneDropletWebp from "@/assets/scene-droplet.webp";
import sceneDroplet960Jpg from "@/assets/scene-droplet-960.jpg";
import sceneDroplet960Webp from "@/assets/scene-droplet-960.webp";
import sceneDroplet1280Jpg from "@/assets/scene-droplet-1280.jpg";
import sceneDroplet1280Webp from "@/assets/scene-droplet-1280.webp";
import sceneDroplet1920Jpg from "@/assets/scene-droplet-1920.jpg";
import sceneDroplet1920Webp from "@/assets/scene-droplet-1920.webp";
import { BeginWhereYouAre } from "@/components/BeginWhereYouAre";
import { BookPlateImage } from "@/components/BookPlateImage";
import { MapScrollJourney } from "@/components/MapScrollJourney";
import { PageEntrance, Reveal } from "@/components/PageMotion";
import { SceneImage } from "@/components/SceneImage";
import { SiteHeader } from "@/components/SiteHeader";
import {
  BOOK_PRICE,
  BOOK_PURCHASE_URL,
  CLARITY_CALL_URL,
  CLARITY_SESSION_URL,
  COMMUNITY_URL,
  TOOL_PRICE,
  TOOL_PURCHASE_URL,
} from "@/lib/offers";

const SCENE_DROPLET_JPG_SRCSET = `${sceneDroplet960Jpg} 960w, ${sceneDroplet1280Jpg} 1280w, ${sceneDroplet1920Jpg} 1920w, ${sceneDropletJpg} 2752w`;
const SCENE_DROPLET_WEBP_SRCSET = `${sceneDroplet960Webp} 960w, ${sceneDroplet1280Webp} 1280w, ${sceneDroplet1920Webp} 1920w, ${sceneDropletWebp} 2752w`;

export const Route = createFileRoute("/")({
  component: LandingPage,
});

/**
 * Landing flow per the client FINAL PDF (27 pp.):
 * pp. 1–10 main scroll → anchored extensions #map-deep (11–21), #founder
 * (22–24), #clarity (25), #tool (26), #book (27). Copy is client-verbatim.
 */
function LandingPage() {
  return (
    <PageEntrance>
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />

        {/* Hero — PDF p. 1: subline + Explore the Map only */}
        <section id="top" className="relative overflow-hidden bg-[#d4c4b0] md:min-h-[100svh]">
          <div className="relative h-[min(54svh,460px)] w-full sm:h-[min(56svh,520px)] md:absolute md:inset-0 md:h-full">
            <BookPlateImage priority alt="Meet Yourself, Differently. Alchemist Ways hardcover" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent md:hidden"
            />
            {/* Soft left wash — longer, lower-contrast, matches plate bg to avoid banding */}
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
              </div>
            </div>
          </div>
        </section>

        {/* PDF p. 1 — How did you learn to protect yourself? */}
        <section className="aw-section">
          <div className="aw-measure">
            <Reveal>
              <h2 className="aw-display">How did you learn to protect yourself?</h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-8 font-display text-lg italic text-ink/55 sm:text-xl">Perhaps by…</p>
            </Reveal>
            <div className="aw-stack aw-stack-loose mt-6">
              {protectWays.map((way, i) => (
                <Reveal key={way} delay={i * 40}>
                  <p className="aw-line">{way}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={120}>
              <hr className="aw-rule" />
              <p className="aw-lede mt-0">
                Without even knowing it, these ways of protecting yourself may once have helped you
                navigate the environment in which they developed.
              </p>
            </Reveal>
          </div>
        </section>

        {/* PDF p. 2 — Why did I learn to do that? */}
        <section className="border-y border-border/40 bg-secondary/30">
          <div className="aw-measure aw-section">
            <Reveal>
              <h2 className="aw-display">Why did I learn to do that?</h2>
            </Reveal>
            <div className="mt-8 space-y-6">
              <Reveal delay={40}>
                <p className="aw-body">
                  The ways you learned to protect yourself were shaped by what your system learned
                  was safest.
                </p>
              </Reveal>
              <Reveal delay={80}>
                <p className="aw-body">
                  Growing up, your mind and body were continually learning:{" "}
                  <span className="font-display italic text-ink">
                    “Given the world I’m experiencing, what is the safest way to be?”
                  </span>
                </p>
              </Reveal>
              <Reveal delay={120}>
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
              <Reveal delay={160}>
                <p className="aw-body">
                  These responses weren’t random. They helped you navigate the world you were in.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p className="aw-pull">
                  The problem is not that protection exists. It’s that ways of protecting yourself
                  can become automatic—and continue shaping how you meet life even when the
                  circumstances around you have changed.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <p className="aw-body">
                  What once helped you adapt to the world as a child may no longer be how you want
                  to meet yourself—and life—as an adult.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* PDF p. 3 — How did you learn to meet yourself? + Why it matters */}
        <section className="aw-section">
          <div className="aw-measure">
            <Reveal>
              <h2 className="aw-display">And how did you learn to meet yourself?</h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-8 font-display text-lg italic text-ink/55 sm:text-xl">Perhaps with…</p>
            </Reveal>
            <div className="aw-stack aw-stack-loose mt-6">
              {meetWays.map((way, i) => (
                <Reveal key={way} delay={i * 40}>
                  <p className="aw-line">{way}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={120}>
              <p className="aw-lede">
                These patterns didn’t only shape how you met the world. They shaped how you learned
                to meet yourself.
              </p>
            </Reveal>

            <Reveal delay={160}>
              <hr className="aw-rule" />
              <h2 className="aw-display">Why does the way I meet myself matter?</h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="aw-lede">
                Because the relationship you have with yourself shapes how you meet everything else.
              </p>
            </Reveal>
            <div className="aw-stack aw-stack-loose mt-8">
              {[
                "Your emotions.",
                "Your thoughts.",
                "Your body.",
                "Your relationships.",
                "Your work.",
                "Your creativity.",
                "Your life.",
              ].map((line, i) => (
                <Reveal key={line} delay={220 + i * 35}>
                  <p className="aw-line">{line}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={280}>
              <p className="aw-pull mt-10">What protects you also shapes what becomes possible.</p>
            </Reveal>
          </div>
        </section>

        {/* Emotional Reactivity — airy 3-col (site reference / Royalmount text rhythm) */}
        <section className="border-y border-border/40 bg-secondary/25">
          <div className="aw-measure aw-measure-wide aw-section">
            <Reveal>
              <h2 className="aw-display aw-display-caps">Emotional Reactivity.</h2>
            </Reveal>
            <Reveal delay={60}>
              <p className="aw-lede max-w-2xl">
                Emotional Reactivity doesn’t always look dramatic. Sometimes it becomes obvious.
                Sometimes it becomes invisible. Sometimes it simply becomes the way we’ve learned to
                survive. It may express itself through…
              </p>
            </Reveal>
            <div className="aw-cols mt-12 sm:mt-14">
              {reactivityModes.map((mode, i) => (
                <Reveal key={mode.title} delay={80 + i * 70}>
                  <div className="aw-col-rule">
                    <h3 className="aw-col-title">{mode.title}</h3>
                    <p className="aw-body !mt-0 text-[0.98rem]">{mode.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={200}>
              <hr className="aw-rule" />
              <p className="aw-pull">Different expressions. The same invitation.</p>
              <p className="aw-body mt-3">
                To understand what your protective system has been carrying.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Bridge into The Map */}
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

        <section className="aw-section pt-8 sm:pt-10">
          <div className="aw-measure text-left">
            <Reveal>
              <p className="aw-pull">
                Alchemist Ways is an invitation to meet yourself, differently.
              </p>
              <div className="mt-8">
                <a href="#map-deep" className="btn-lux btn-lux-primary">
                  Explore the Map
                  <span aria-hidden>→</span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* PDF p. 5 — What the Map reveals */}
        <section className="border-y border-border/40 bg-secondary/30">
          <div className="aw-measure aw-section">
            <Reveal>
              <p className="aw-eyebrow">The Map</p>
              <h2 className="aw-display mt-3">What the Map reveals</h2>
            </Reveal>
            <div className="mt-10 space-y-8">
              {mapReveals.map((pair, i) => (
                <Reveal key={pair.from} delay={i * 55}>
                  <div className="aw-rail">
                    <p className="aw-body !mt-0">{pair.from}</p>
                    <p className="aw-pull mt-2">{pair.to}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PDF p. 6 — What becomes possible? The Fruits */}
        <section className="aw-section">
          <div className="aw-measure">
            <Reveal>
              <p className="aw-eyebrow">The Fruits</p>
              <h2 className="aw-display mt-3">What becomes possible?</h2>
            </Reveal>
            <div className="mt-10 space-y-6">
              {fruits.map((fruit, i) => (
                <Reveal key={fruit} delay={i * 35}>
                  <p className="aw-body">{fruit}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={160}>
              <hr className="aw-rule" />
              <p className="aw-pull">
                You participate more consciously in the life that is yours to create.
              </p>
            </Reveal>
          </div>
        </section>

        {/* PDF p. 7 — Creative Agency (huge breathing room) */}
        <section className="relative overflow-hidden border-y border-border/40 bg-[#ebe3d6]">
          <div className="absolute inset-0" aria-hidden>
            <SceneImage
              jpg={sceneDropletJpg}
              webp={sceneDropletWebp}
              jpgSrcSet={SCENE_DROPLET_JPG_SRCSET}
              webpSrcSet={SCENE_DROPLET_WEBP_SRCSET}
              sizes="100vw"
              alt=""
              width={2752}
              height={1536}
              className="absolute inset-0 h-full w-full"
              imgClassName="h-full w-full object-cover object-[50%_58%] opacity-[0.92]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#ebe3d6]/92 via-[#ebe3d6]/72 to-[#ebe3d6]/35 sm:via-[#ebe3d6]/55 sm:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#ebe3d6]/50 via-transparent to-[#ebe3d6]/40" />
          </div>
          <div className="relative mx-auto flex min-h-[min(70svh,36rem)] max-w-6xl items-center px-5 py-24 sm:px-8 sm:py-32">
            <Reveal>
              <div className="max-w-md">
                <p className="aw-eyebrow">Return</p>
                <h2 className="aw-display aw-display-caps mt-3">Creative Agency</h2>
                <p className="aw-body mt-10">
                  Creative Agency is the return of your capacity to consciously participate in your
                  life.
                </p>
                <p className="aw-body mt-8">
                  It is what becomes possible when protection no longer has to lead.
                </p>
                <p className="aw-pull mt-10">
                  The experience of that return can feel like coming home.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* PDF p. 8 — Founder story teaser */}
        <section id="about" className="mx-auto max-w-6xl scroll-mt-28 lg:scroll-mt-32 px-5 py-14 sm:px-8 sm:py-20">
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
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-ember-deep">
                  Founder Story
                </p>
                <h2 className="mt-3 font-display text-2xl font-semibold uppercase leading-tight tracking-[0.05em] text-ink sm:text-3xl">
                  Why Alchemist Ways exists
                </h2>
              </Reveal>

              <div className="mt-5 space-y-4 text-base leading-relaxed text-ink/80 sm:mt-6 sm:space-y-5 sm:text-lg">
                <Reveal delay={40}>
                  <p>
                    For years, I thought I was searching for freedom. Validation. Creativity. Love.
                    But beneath all of those desires was something quieter I couldn’t yet see.
                  </p>
                </Reveal>
                <Reveal delay={80}>
                  <p className="font-display text-lg font-semibold text-ink sm:text-xl">
                    I was searching for inner safety.
                  </p>
                </Reveal>
                <Reveal delay={120}>
                  <p>
                    Much of my life had become organized around looking outside myself—for approval,
                    direction, permission, and confirmation that who I was and what I wanted could
                    be trusted.
                  </p>
                </Reveal>
                <Reveal delay={160}>
                  <p>
                    Eventually, the anger I had spent years experiencing became something I stopped
                    trying to escape and began trying to understand. I started asking a different
                    question:{" "}
                    <span className="font-display italic text-ink">
                      What is this anger trying to communicate?
                    </span>
                  </p>
                </Reveal>
                <Reveal delay={200}>
                  <p>
                    Following that question led me beneath the anger—to fear, hurt, protection, old
                    conclusions about myself, and eventually to parts of myself I had left behind as
                    a kid.
                  </p>
                </Reveal>
                <Reveal delay={240}>
                  <p>
                    The Map emerged from that process. Alchemist Ways grew from learning to meet
                    those parts differently—and from discovering what becomes possible when
                    protection no longer has to decide what happens next.
                  </p>
                </Reveal>
                <Reveal delay={280}>
                  <div>
                    <p className="pt-1 font-display text-xl italic text-ink">Malek Najm Ghaleb</p>
                    <p className="mt-1 text-sm text-ink/60">Founder, Alchemist Ways</p>
                  </div>
                </Reveal>
                <Reveal delay={320}>
                  <a href="#founder" className="btn-lux btn-lux-sand mt-2 inline-flex">
                    Read the Founder Story
                    <span aria-hidden>→</span>
                  </a>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* PDF p. 9 — Begin Where You Are */}
        <section
          id="practice"
          className="scroll-mt-28 lg:scroll-mt-32 border-t border-border/60 bg-secondary/25 py-14 sm:py-20"
        >
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <BeginWhereYouAre />
          </div>
        </section>

        {/* PDF p. 10 — The World of Alchemist Ways */}
        <section className="relative overflow-hidden border-t border-border/60 bg-secondary/40">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background: "radial-gradient(ellipse at 50% 0%, var(--ember-soft), transparent 60%)",
            }}
          />
          <div className="relative mx-auto max-w-3xl px-[max(1.25rem,env(safe-area-inset-left))] py-16 pr-[max(1.25rem,env(safe-area-inset-right))] text-center sm:px-8 sm:py-24">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold uppercase leading-tight tracking-[0.05em] text-ink sm:text-4xl">
                The World of Alchemist Ways
              </h2>
              <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink/75 sm:text-lg">
                A place to keep living the practice.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <div className="mt-8 space-y-1.5 font-display text-xl leading-snug text-ink sm:text-2xl">
                <p>Conversations.</p>
                <p>Practices.</p>
                <p>Gatherings.</p>
                <p>Creativity.</p>
                <p>Community.</p>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div className="mx-auto mt-10 max-w-md space-y-1 text-base leading-relaxed text-ink/80 sm:text-lg">
                <p>You don’t have to become someone else.</p>
                <p>You can learn to meet what is already here, differently.</p>
              </div>
              <div className="mt-9 flex justify-center">
                <a
                  href={COMMUNITY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-lux btn-lux-primary"
                >
                  Welcome to Alchemist Ways
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ————— Extensions (after the main scroll) ————— */}

        {/* PDF pp. 11–21 — Explore the Map deep-dive */}
        <section id="map-deep" className="scroll-mt-28 lg:scroll-mt-32 border-t border-border/60">
          <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-ember-deep">
                Explore the Map
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold uppercase leading-tight tracking-[0.05em] text-ink sm:text-3xl md:text-4xl">
                From Reactivity to Creative Agency
              </h2>
            </Reveal>
            <div className="mt-7 space-y-4 text-base leading-relaxed text-ink/80 sm:text-lg">
              <Reveal delay={40}>
                <p>What looks like emotional reactivity may have begun as protection.</p>
              </Reveal>
              <Reveal delay={80}>
                <p>
                  The map is not about becoming someone better. It is a way of seeing what may
                  already be happening beneath your reactions—and what becomes possible as your
                  relationship to them changes.
                </p>
              </Reveal>
              <Reveal delay={120}>
                <p className="font-display italic text-ink">
                  Take your time. Notice where you recognize yourself.
                </p>
              </Reveal>
            </div>

            <DeepStage
              index={1}
              label="Reactivity"
              word="Automatic"
              tagline="The pattern is happening before you can see it."
            >
              <Prose>
                <p>Something happens.</p>
                <Lines items={["A look.", "A comment.", "A silence.", "A change in tone."]} />
                <p>
                  A feeling of being rejected, misunderstood, criticized, controlled, ignored, or
                  exposed.
                </p>
                <p>And something in you responds.</p>
                <Lines
                  items={[
                    "Maybe you become defensive.",
                    "You withdraw.",
                    "You overexplain.",
                    "You please.",
                    "You attack.",
                    "You shut down.",
                    "You try to fix everything.",
                    "You replay the interaction long after it has ended.",
                  ]}
                />
                <p>
                  From the inside, it can feel as though the situation caused the reaction. But
                  beneath the reaction, something else may already be happening.
                </p>
                <p>The event has been given meaning.</p>
                <Voice
                  items={[
                    "I’m not safe.",
                    "I’m not enough.",
                    "I did something wrong.",
                    "They’re going to leave.",
                    "I need to fix this.",
                    "I shouldn’t have said that.",
                    "I need their approval.",
                    "It isn’t safe to be fully seen.",
                  ]}
                />
                <p>
                  And beneath that meaning may be something older still: a fear, a need, a
                  protective strategy, a conclusion about yourself, a way of surviving that once
                  made complete sense.
                </p>
                <Lead>What looks like reactivity may have begun as protection.</Lead>
                <p>
                  The problem is not that protection exists. The problem is that it may be choosing
                  before you know a choice is being made.
                </p>
              </Prose>
              <Movement>
                <p>You don’t have to stop the reaction. Begin by noticing it.</p>
                <VoiceLine>What is happening in me right now?</VoiceLine>
                <p>
                  That question creates the first opening. The pattern that was completely automatic
                  becomes something you can begin to see.
                </p>
                <p>And that is the threshold of Awareness.</p>
              </Movement>
            </DeepStage>

            <DeepStage
              index={2}
              label="Awareness"
              word="Visible"
              tagline="What was automatic becomes something you can observe."
            >
              <Prose>
                <p>At first, you may notice the pattern afterward.</p>
                <VoiceLine>I did it again.</VoiceLine>
                <p>Then perhaps while it is happening.</p>
                <VoiceLine>I’m doing it right now.</VoiceLine>
                <p>Eventually, sometimes, you notice it as it begins.</p>
                <VoiceLine>Something in me is starting to close.</VoiceLine>
                <p>
                  That difference can seem small. It isn’t. Because now there is you—and there is
                  the experience you are having.
                </p>
                <p>You can begin to see the architecture.</p>
                <Voice
                  items={[
                    "What happened?",
                    "What did I make it mean?",
                    "What am I feeling?",
                    "What do I want to do?",
                    "What am I afraid might happen?",
                    "What is this response trying to protect?",
                  ]}
                />
                <p>
                  You begin noticing that different situations can activate the same underlying
                  pattern.
                </p>
                <Lines
                  items={[
                    "Different people.",
                    "Different relationships.",
                    "Different circumstances.",
                  ]}
                />
                <p>
                  The surface changes. The architecture underneath can remain remarkably familiar.
                </p>
                <p>And something else becomes possible:</p>
                <Lines
                  items={[
                    "You can feel anger without being only anger.",
                    "You can notice fear without immediately obeying fear.",
                    "You can experience the desire for approval and recognize that the desire is present.",
                  ]}
                />
                <Lead>
                  You haven’t necessarily changed the pattern yet. You’ve changed your relationship
                  to seeing it.
                </Lead>
              </Prose>
              <Movement>
                <p>Awareness is powerful. But seeing isn’t the same as meeting.</p>
                <p>Eventually another question appears:</p>
                <VoiceLine>
                  Can I stay with what I’m seeing without immediately trying to escape it, fix it,
                  explain it, or make it disappear?
                </VoiceLine>
                <p>That is the threshold of Integration.</p>
              </Movement>
            </DeepStage>

            <DeepStage
              index={3}
              label="Integration"
              word="Met"
              tagline="What became visible can be met differently."
            >
              <Prose>
                <p>
                  This is where the map becomes intimate. Because underneath a reaction there is
                  often something the reaction has been trying to protect you from having to
                  experience.
                </p>
                <Lines
                  items={[
                    "Fear.",
                    "Shame.",
                    "Grief.",
                    "Rejection.",
                    "Helplessness.",
                    "Need.",
                    "Vulnerability.",
                    "The possibility of being fully seen.",
                  ]}
                />
                <p>
                  And sometimes what has been protected isn’t only pain. Parts of your aliveness may
                  have learned to disappear with it.
                </p>
                <Lines
                  items={[
                    "Your sensitivity.",
                    "Your playfulness.",
                    "Your desire.",
                    "Your tenderness.",
                    "Your anger.",
                    "Your imagination.",
                    "Your creativity.",
                    "Your spontaneity.",
                    "Your particular way of seeing.",
                  ]}
                />
                <p>
                  These parts may not have disappeared. They may simply have become less available
                  when being fully yourself stopped feeling safe.
                </p>
                <Lead>
                  Integration is not forcing them back. It is creating a different relationship with
                  what is already here.
                </Lead>
                <p>
                  Instead of: <em>How do I get rid of this?</em> the question becomes:{" "}
                  <em>What is this protecting?</em>
                </p>
                <p>
                  Instead of: <em>Why am I like this?</em> perhaps:{" "}
                  <em>When did this response begin making sense?</em>
                </p>
                <p>
                  Instead of fighting the frightened part: <em>Can I stay with it?</em>
                </p>
                <p>
                  Instead of judging the protection:{" "}
                  <em>Can I understand what it has been trying to do for me?</em>
                </p>
                <p>
                  Something begins changing when what has spent years being avoided is finally met
                  without another demand to become different.
                </p>
                <Lead>
                  Not necessarily because the feeling disappears. But because you stop disappearing
                  when the feeling arrives.
                </Lead>
              </Prose>
              <Movement>
                <p>
                  As your capacity to remain with your experience grows, the old pattern may still
                  appear. Fear may still appear. The desire to hide may still appear.
                </p>
                <p>But they no longer have to determine what happens next.</p>
                <p>A new question becomes possible:</p>
                <VoiceLine>Given everything I feel, what do I choose?</VoiceLine>
                <p>That is the threshold of Sovereignty.</p>
              </Movement>
            </DeepStage>

            <DeepStage
              index={4}
              label="Sovereignty"
              word="Choosable"
              tagline="What once chose for you can now be experienced without automatically determining your response."
            >
              <Prose>
                <p>Sovereignty does not mean becoming unaffected.</p>
                <Lines
                  items={[
                    "You can still care what people think.",
                    "You can still feel afraid of rejection.",
                    "You can still experience the vulnerability of being seen.",
                    "You can still want approval.",
                    "You can still feel the old impulse to hide, please, control, defend, withdraw, or perform.",
                  ]}
                />
                <Lead>
                  The difference is that you no longer have to organize your life around avoiding
                  those feelings.
                </Lead>
                <p>
                  There is more space between: <em>I feel afraid</em> and{" "}
                  <em>therefore I must hide.</em>
                </p>
                <p>
                  Between: <em>They may disapprove</em> and{" "}
                  <em>therefore I must abandon what is true for me.</em>
                </p>
                <p>
                  Between: <em>Being seen feels vulnerable</em> and{" "}
                  <em>therefore I will remain unseen.</em>
                </p>
                <p>
                  This is where choice becomes real. Not choice after fear disappears. Choice while
                  fear is still in the room.
                </p>
                <Lines
                  items={[
                    "You can speak what is true and feel vulnerable.",
                    "Set a boundary and feel guilty.",
                    "Create something and not know how it will be received.",
                    "Love someone without abandoning yourself to preserve the connection.",
                    "Let yourself be seen without first guaranteeing that what is seen will be approved of.",
                  ]}
                />
                <Lead>This is not fearlessness. It is a different relationship with fear.</Lead>
              </Prose>
              <Movement>
                <p>
                  And every time protection no longer has to make the decision for you, something
                  becomes available.
                </p>
                <Lines items={["Energy.", "Attention.", "Curiosity.", "Expression.", "Life."]} />
                <p>
                  The question gradually changes from: <em>How do I keep myself safe?</em> to:{" "}
                  <em>What do I want to participate in?</em>
                </p>
                <p>That is the threshold of Creative Agency.</p>
              </Movement>
            </DeepStage>

            <DeepStage
              index={5}
              label="Creative Agency"
              word="Available"
              tagline="Energy once organized around protection becomes increasingly available for conscious participation in your life."
            >
              <Prose>
                <Lines
                  items={[
                    "Creative Agency is not about becoming an artist.",
                    "It is not productivity.",
                    "It is not relentless self-expression.",
                    "It is not finally becoming fearless.",
                  ]}
                />
                <Lead>
                  It is the return of your capacity to consciously participate in your life.
                </Lead>
                <p>
                  The energy that once went toward: monitoring, hiding, pleasing, proving,
                  performing, controlling, bracing, perfecting, and managing how you are perceived
                  can become increasingly available for something else.
                </p>
                <Lines
                  items={[
                    "Relationship.",
                    "Work.",
                    "Love.",
                    "Play.",
                    "Curiosity.",
                    "Creation.",
                    "Contribution.",
                    "Expression.",
                    "The things that matter to you.",
                  ]}
                />
                <p>And perhaps you begin rediscovering qualities that once seemed lost.</p>
                <Lines
                  items={[
                    "Humor.",
                    "Sensitivity.",
                    "Imagination.",
                    "Tenderness.",
                    "Desire.",
                    "Discernment.",
                    "Spontaneity.",
                    "Creativity.",
                    "Your particular way of seeing.",
                  ]}
                />
                <p>
                  Not because you manufactured a better self. Because less of you has to remain
                  organized around protection.
                </p>
                <Lines
                  items={[
                    "You may still feel the vulnerability of being seen. And create anyway.",
                    "You may still fear rejection. And tell the truth anyway.",
                    "You may still feel uncertainty. And participate anyway.",
                    "You may still encounter old patterns. And return more gently when you do.",
                  ]}
                />
                <Lead>
                  Creative Agency is not the end of being human. It is becoming increasingly
                  available to your life while being fully human.
                </Lead>
                <p>And the experience of that return can feel like coming home.</p>
                <p>
                  You don’t have to become someone else. You can learn to meet what is already here,
                  differently.
                </p>
              </Prose>
            </DeepStage>

            <Reveal>
              <div className="mt-14 border-t border-border/60 pt-10 text-center sm:mt-16">
                <p className="font-display text-xl font-semibold uppercase tracking-[0.05em] text-ink sm:text-2xl">
                  Want to explore your own map?
                </p>
                <div className="mt-6 flex justify-center">
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
              </div>
            </Reveal>
          </div>
        </section>

        {/* PDF pp. 22–24 — Founder story (full) */}
        <section id="founder" className="scroll-mt-28 lg:scroll-mt-32 border-t border-border/60 bg-secondary/25">
          <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-ember-deep">
                Founder Story
              </p>
            </Reveal>
            <div className="mt-7 space-y-5 text-base leading-relaxed text-ink/80 sm:text-lg">
              <Reveal>
                <p>
                  For years, I thought I was searching for freedom. Validation. Creativity. Love.
                </p>
              </Reveal>
              <Reveal>
                <p>
                  But beneath all of those desires was something quieter. Something I couldn’t yet
                  see.
                </p>
              </Reveal>
              <Reveal>
                <p className="font-display text-lg font-semibold text-ink sm:text-xl">
                  I was searching for inner safety.
                </p>
              </Reveal>
              <Reveal>
                <p>
                  Not physical safety. The kind of inner safety that allows you to express yourself
                  honestly without constantly looking outside yourself for permission. To create
                  without second-guessing everything. To speak without silently holding yourself
                  back. To remain open and grounded in yourself even when the world around you is
                  uncertain. To live rather than perform.
                </p>
              </Reveal>
              <Reveal>
                <p>
                  I didn’t understand then that much of what I was searching for had roots much
                  earlier in my life.
                </p>
              </Reveal>
              <Reveal>
                <p>
                  When I was young, I lost connection with a younger part of myself. I learned to
                  look outward. For approval. For direction. For permission. For some confirmation
                  that who I was and what I wanted could be trusted.
                </p>
              </Reveal>
              <Reveal>
                <p>
                  For years, that pattern shaped more of my life than I understood. Despite my
                  ambition and creativity, I repeatedly held myself back from the things I loved. I
                  gave away my authority. I doubted myself. I became trapped in perfectionism. I
                  shaped myself around what I thought others expected of me.
                </p>
              </Reveal>
              <Reveal>
                <p>
                  And underneath much of it was fear. Self-doubt. Shame. Anxiety. And eventually,
                  anger. A deep anger I lived with for a long time without understanding what it was
                  trying to tell me.
                </p>
              </Reveal>
              <Reveal>
                <p>Eventually, life slowed me down enough to stop running from it.</p>
              </Reveal>
              <Reveal>
                <p>
                  And instead of asking, <em>How do I fix myself?</em> I began asking something
                  different: <em>What is this anger trying to communicate?</em>
                </p>
              </Reveal>
              <Reveal>
                <p className="font-display text-lg font-semibold text-ink sm:text-xl">
                  That question changed the direction of my life.
                </p>
              </Reveal>
              <Reveal>
                <p>
                  As I began following the anger rather than fighting it, I discovered what was
                  underneath it. Fear. Hurt. Sadness. Protection. Old conclusions about myself. Ways
                  of surviving that had once made sense.
                </p>
              </Reveal>
              <Reveal>
                <p>
                  And eventually, I found something else there too: the younger part of myself I had
                  left behind.
                </p>
              </Reveal>
              <Reveal>
                <p>
                  The work became less about overcoming who I had been and more about learning how
                  to meet all of myself differently. To listen rather than abandon. To understand
                  rather than judge. To remain when the impulse was to escape. And gradually, to
                  choose without fear having to choose for me.
                </p>
              </Reveal>
              <Reveal>
                <p>
                  The Map emerged from that process. Through observation. Practice. Discomfort.
                  Radical honesty. Through reconnecting with parts of myself I had spent years
                  trying to outrun. And through the privilege of walking beside others exploring
                  their own inner architecture.
                </p>
              </Reveal>
              <Reveal>
                <p className="font-display text-lg font-semibold text-ink sm:text-xl">
                  I did not arrive at the other side of the Map. I live it.
                </p>
              </Reveal>
              <Reveal>
                <p>
                  Old patterns still appear. Fear still appears. Protection still appears. But they
                  no longer have to decide what happens next.
                </p>
              </Reveal>
              <Reveal>
                <p>
                  And increasingly, the energy I once spent hiding, doubting, perfecting, pleasing,
                  and looking outside myself for permission has become available for something else:
                  creating. loving. choosing. expressing. participating. living.
                </p>
              </Reveal>
              <Reveal>
                <p>
                  Alchemist Ways grew from that return. Not as a method for becoming someone better.
                  But as an invitation to discover what may become possible when you stop abandoning
                  what is already here—and begin to meet yourself, differently.
                </p>
              </Reveal>
              <Reveal>
                <div className="pt-2">
                  <p className="font-display text-xl italic text-ink">Malek Najm Ghaleb</p>
                  <p className="mt-1 text-sm text-ink/60">Founder, Alchemist Ways</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* PDF p. 25 — Work With Me / Clarity Call */}
        <section id="clarity" className="scroll-mt-28 lg:scroll-mt-32 border-t border-border/60">
          <div className="mx-auto max-w-2xl px-5 py-16 text-center sm:px-8 sm:py-24">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold uppercase leading-tight tracking-[0.05em] text-ink sm:text-3xl md:text-4xl">
                Work With Me
              </h2>
            </Reveal>
            <div className="mx-auto mt-7 max-w-xl space-y-4 text-base leading-relaxed text-ink/80 sm:text-lg">
              <Reveal delay={40}>
                <p>
                  You don’t need to know exactly where you are in the Map. You don’t need to have
                  everything figured out before we speak.
                </p>
              </Reveal>
              <Reveal delay={80}>
                <p>
                  A Clarity Call is a conversation to explore what may be shaping your current
                  patterns, where you recognize yourself in the Map, and what your next step might
                  be.
                </p>
              </Reveal>
              <Reveal delay={120}>
                <p>If working together feels like the right fit, we can explore that too.</p>
              </Reveal>
              <Reveal delay={160}>
                <p className="font-display italic text-ink">
                  If you’d like to explore yours together, here I am.
                </p>
              </Reveal>
            </div>
            <Reveal delay={200}>
              <div className="mt-9 flex flex-col items-center gap-3">
                <a
                  href={CLARITY_CALL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-lux btn-lux-primary w-full sm:w-auto"
                >
                  Book a Clarity Call
                  <span aria-hidden>→</span>
                </a>
                <a
                  href={CLARITY_SESSION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink/60 underline-offset-4 transition-colors hover:text-ember-deep hover:underline"
                >
                  Clarity Session · Paid 90 min
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* PDF p. 26 — Meet What’s Here (Tool) */}
        <section id="tool" className="scroll-mt-28 lg:scroll-mt-32 border-t border-border/60 bg-secondary/25">
          <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-ember-deep">
                {TOOL_PRICE} · The Tool
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold uppercase leading-tight tracking-[0.05em] text-ink sm:text-3xl md:text-4xl">
                Meet What’s Here.
              </h2>
              <p className="mt-3 font-display text-lg italic text-ink/70 sm:text-xl">
                A 10-minute Emotional Awareness Tool
              </p>
            </Reveal>
            <div className="mt-7 space-y-5 text-base leading-relaxed text-ink/80 sm:text-lg">
              <Reveal delay={40}>
                <p>
                  Meet What’s Here helps you slow down one reaction, feeling, or pattern, see more
                  of what may be happening beneath it, and create a little more space between what
                  you feel and what you choose.
                </p>
              </Reveal>
              <Reveal delay={80}>
                <p className="font-display font-semibold text-ink">Bring one thing with you:</p>
                <div className="mt-3 space-y-1.5 border-l-2 border-ember/45 pl-4 sm:pl-5">
                  <p>A reaction you had.</p>
                  <p>Something you’re afraid of.</p>
                  <p>A conversation you’re avoiding.</p>
                  <p>Something you keep procrastinating on.</p>
                  <p>A feeling you keep suppressing.</p>
                  <p>A pattern you keep repeating.</p>
                  <p>Or simply something you can’t quite explain.</p>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <p>
                  You’ll be guided through a simple process of noticing what is happening, following
                  what may be beneath it, meeting what you find with curiosity, and seeing what
                  becomes possible when the experience no longer has to remain entirely automatic.
                </p>
              </Reveal>
              <Reveal delay={160}>
                <p className="font-display text-lg font-semibold uppercase tracking-[0.14em] text-ember-deep sm:text-xl">
                  Notice → Follow → Meet → Choose
                </p>
              </Reveal>
              <Reveal delay={200}>
                <div className="space-y-1">
                  <p>You don’t need to fix yourself.</p>
                  <p>You don’t need to know what you’ll find.</p>
                </div>
                <div className="mt-4 space-y-1 font-display text-lg font-semibold text-ink sm:text-xl">
                  <p>Bring one thing.</p>
                  <p>Look more closely.</p>
                  <p>Meet what you find.</p>
                </div>
              </Reveal>
            </div>
            <Reveal delay={240}>
              <div className="mt-10">
                <a href={TOOL_PURCHASE_URL} className="btn-lux btn-lux-primary w-full sm:w-auto">
                  {TOOL_PRICE} · Begin
                  <span aria-hidden>→</span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* PDF p. 27 — The Book */}
        <section id="book" className="relative scroll-mt-28 lg:scroll-mt-32 overflow-hidden bg-[#d4c4b0]">
          <div className="relative h-[min(54svh,460px)] w-full md:absolute md:inset-0 md:h-full">
            <BookPlateImage
              alt="Meet Yourself, Differently. Hardcover standing in a sand corridor"
              objectPositionClassName="object-[80%_48%] sm:object-[74%_48%] md:object-[70%_46%] lg:object-[64%_44%]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent md:hidden"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 hidden w-[min(58%,40rem)] bg-[linear-gradient(to_right,rgb(212_196_176/0.50)_0%,rgb(212_196_176/0.26)_38%,rgb(212_196_176/0.10)_68%,transparent_100%)] md:block"
            />
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col bg-background px-[max(1.25rem,env(safe-area-inset-left))] pb-12 pr-[max(1.25rem,env(safe-area-inset-right))] pt-5 md:min-h-[min(80svh,42rem)] md:bg-transparent md:px-8 md:pb-16 md:pt-14 lg:px-12">
            <div className="flex w-full min-w-0 flex-1 flex-col justify-center gap-0 md:max-w-[min(100%,26rem)] lg:max-w-[28rem]">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-ember-deep md:text-[#3a2a1f]/75">
                {BOOK_PRICE} · The Book
              </div>
              <h2 className="mt-3 font-display text-2xl font-semibold uppercase leading-tight text-ink sm:text-3xl md:text-4xl md:text-[#2a1f16]">
                Meet Yourself, Differently.
              </h2>
              <p className="mt-2 text-xs uppercase tracking-[0.14em] text-ink/60 sm:text-sm md:text-[#3a2a1f]/65">
                A Map from Emotional Reactivity to Creative Agency
              </p>
              <p className="mt-5 text-base leading-relaxed text-ink/80 sm:text-lg md:text-[#3a2a1f]/85">
                Much of what shapes our inner experience happens before we know it is happening.
                Meet Yourself, Differently explores the hidden architecture beneath our patterns—and
                what becomes possible as our relationship to them changes.
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink/80 sm:text-lg md:text-[#3a2a1f]/85">
                At its center is a five-part map:
              </p>
              <p className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ember-deep sm:text-xs">
                Reactivity → Awareness → Integration → Sovereignty → Creative Agency
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink/80 sm:text-lg md:text-[#3a2a1f]/85">
                A movement from what happens automatically, to what can become visible, met,
                choosable, and increasingly available for conscious participation in life.
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink/75 sm:text-lg md:text-[#3a2a1f]/75">
                This is not a map for becoming someone better. It is an invitation to see what may
                already be happening within you—and learn to meet yourself, differently.
              </p>
              <div className="mt-7 flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={BOOK_PURCHASE_URL}
                  className="btn-lux btn-lux-primary w-full justify-center sm:w-auto"
                >
                  {BOOK_PRICE} · Explore the Book
                  <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/60 bg-secondary/30 pb-[env(safe-area-inset-bottom)]">
          <Reveal>
            <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-[max(1.25rem,env(safe-area-inset-left))] py-10 pr-[max(1.25rem,env(safe-area-inset-right))] sm:px-8 sm:py-12 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ink">
                  Alchemist Ways
                </div>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  A map from emotional reactivity to creative agency.
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

/* ————— PDF list copy (client-verbatim) ————— */

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
];

const meetWays = [
  "Self-doubt.",
  "Self-judgment.",
  "Shame.",
  "Comparison.",
  "Holding back parts of yourself.",
  "Self-abandonment.",
  "Never quite feeling enough.",
];

const reactivityModes = [
  {
    title: "Acting Out",
    body: "When energy moves outward before awareness has a chance to respond.",
  },
  {
    title: "Shutting Down",
    body: "When the nervous system withdraws from experience.",
  },
  {
    title: "Suppressing",
    body: "When thoughts, emotions, needs, or impulses are continually pushed aside to preserve safety, connection, or control.",
  },
] as const;

const mapReveals = [
  {
    from: "Energy once organized around fear",
    to: "becomes available for courage.",
  },
  {
    from: "Energy once organized around suppression",
    to: "becomes available for aliveness.",
  },
  {
    from: "Energy once organized around pleasing and performing",
    to: "becomes available for authentic expression.",
  },
  {
    from: "Energy once organized around control",
    to: "becomes available for openness and trust.",
  },
  {
    from: "Energy once organized around protection",
    to: "becomes increasingly available for conscious participation in life.",
  },
];

const fruits = [
  "You remain grounded in yourself, even when life moves around you.",
  "You feel deeply without being carried away by everything you feel.",
  "You trust yourself enough to move without needing everyone else’s permission.",
  "You speak what is true, set boundaries, and allow yourself to be seen—even when being seen still feels vulnerable.",
  "You love more openly without abandoning yourself to stay connected.",
  "You create with less perfectionism and less fear of how it will be received.",
  "You rediscover parts of yourself that may have gone quiet when being fully yourself stopped feeling safe—your playfulness, sensitivity, desire, imagination, tenderness, creativity, and particular way of seeing.",
  "You bring more of yourself to the relationships, work, people, and possibilities that matter.",
  "You recover more gently when old patterns return.",
];

/* ————— Map deep-dive layout helpers ————— */

function DeepStage({
  index,
  label,
  word,
  tagline,
  children,
}: {
  index: number;
  label: string;
  word: string;
  tagline: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-14 border-t border-border/60 pt-10 sm:mt-16 sm:pt-12">
      <Reveal>
        <div className="flex items-baseline gap-3">
          <span className="font-display text-sm font-semibold tabular-nums tracking-[0.12em] text-ember-deep sm:text-base">
            {String(index).padStart(2, "0")}
          </span>
          <h3 className="font-display text-2xl font-semibold uppercase leading-tight tracking-[0.05em] text-ink sm:text-3xl">
            {label}
          </h3>
        </div>
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.28em] text-ember">{word}</p>
        <p className="mt-3 font-display text-lg italic leading-snug text-ink/75 sm:text-xl">
          {tagline}
        </p>
      </Reveal>
      {children}
    </div>
  );
}

function Prose({ children }: { children: ReactNode }) {
  return (
    <Reveal delay={60}>
      <div className="mt-6 space-y-4 text-base leading-relaxed text-ink/80 sm:text-lg">
        {children}
      </div>
    </Reveal>
  );
}

function Lines({ items }: { items: readonly string[] }) {
  return (
    <div className="space-y-1 border-l-2 border-ember/35 pl-4 sm:pl-5">
      {items.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </div>
  );
}

function Voice({ items }: { items: readonly string[] }) {
  return (
    <div className="space-y-1 font-display italic text-ink">
      {items.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </div>
  );
}

function VoiceLine({ children }: { children: ReactNode }) {
  return <p className="font-display italic text-ink">{children}</p>;
}

function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="font-display text-lg font-semibold leading-snug text-ink sm:text-xl">
      {children}
    </p>
  );
}

function Movement({ children }: { children: ReactNode }) {
  return (
    <Reveal delay={80}>
      <div className="mt-8 rounded-2xl border border-ember/25 bg-ember-soft/40 px-5 py-6 sm:px-6 sm:py-7">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ember-deep">
          The Movement
        </p>
        <div className="mt-4 space-y-3 text-base leading-relaxed text-ink/85 sm:text-lg">
          {children}
        </div>
      </div>
    </Reveal>
  );
}

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.16 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.77a8.2 8.2 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1.01-.15z" />
    </svg>
  );
}
