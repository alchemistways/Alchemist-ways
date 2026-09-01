import { Link, createFileRoute } from "@tanstack/react-router";
import malekPortrait from "@/assets/malek-portrait.jpg";
import { BookPlateImage } from "@/components/BookPlateImage";
import { CircleMarker } from "@/components/CircleMarker";
import { DropletDivider, DropletMark } from "@/components/DropletMark";
import { PageEntrance } from "@/components/PageMotion";
import { SiteHeader } from "@/components/SiteHeader";
import { Verse } from "@/components/Verse";
import { MotionReveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { en } from "@/lib/i18n/messages";
import {
  BOOK_PRICE,
  BOOK_PURCHASE_URL,
  CLARITY_CALL_URL,
  CLARITY_SESSION_URL,
  COMMUNITY_URL,
  CONVERSATIONS_URL,
} from "@/lib/offers";

export const Route = createFileRoute("/discover")({
  head: () => ({
    meta: [
      { title: en.discover.metaTitle },
      { name: "description", content: en.discover.metaDescription },
    ],
  }),
  component: DiscoverPage,
});

/**
 * /discover — the full long-form client copy that the landing page now only
 * teases: protect ways, why-protect body, meet ways + shapes, About verses,
 * plus book buying and the full Ways-to-Begin offer details.
 */
function DiscoverPage() {
  const { t } = useLocale();

  return (
    <PageEntrance>
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />

        {/* Intro */}
        <section className="relative overflow-hidden bg-background pt-32 lg:pt-40">
          <DropletMark
            filled
            className="pointer-events-none absolute -right-8 -top-10 h-72 w-auto text-ember-soft/50 sm:right-10"
          />
          <div className="aw-measure aw-measure-wide relative pb-10 sm:pb-14">
            <MotionReveal>
              <p className="aw-eyebrow">{t.discover.eyebrow}</p>
              <h1 className="aw-display mt-3">{t.discover.title}</h1>
              <Link
                to="/"
                className="group mt-5 inline-flex min-h-11 items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-ember-deep"
              >
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-200 group-hover:-translate-x-1"
                >
                  ←
                </span>
                {t.discover.back}
              </Link>
            </MotionReveal>
          </div>
        </section>

        {/* Protect — full list */}
        <section id="protect" className="aw-section scroll-mt-28 bg-secondary/40 lg:scroll-mt-32">
          <div className="aw-measure aw-measure-wide">
            <MotionReveal>
              <h2 className="aw-display">{t.protect.title}</h2>
            </MotionReveal>
            <MotionReveal>
              <p className="mt-8 font-display text-lg italic text-ink/55 sm:text-xl">
                {t.protect.perhapsBy}
              </p>
            </MotionReveal>
            <Stagger className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              {t.protect.ways.map((way, i) => (
                <StaggerItem key={way} className="flex items-center gap-3.5">
                  <CircleMarker n={i + 1} />
                  <p className="aw-line">{way}</p>
                </StaggerItem>
              ))}
            </Stagger>
            <MotionReveal>
              <p className="aw-lede mt-10">{t.protect.lede}</p>
            </MotionReveal>
          </div>
        </section>

        {/* Why protect — full body */}
        <section id="why" className="aw-section scroll-mt-28 bg-background lg:scroll-mt-32">
          <div className="aw-measure">
            <MotionReveal>
              <h2 className="aw-display">{t.whyProtect.title}</h2>
            </MotionReveal>
            <MotionReveal>
              <div className="mt-8 space-y-6">
                <p className="aw-body">{t.whyProtect.p1}</p>
                <p className="aw-body">
                  {t.whyProtect.p2Before}{" "}
                  <span className="font-display italic text-ink">{t.whyProtect.p2Quote}</span>
                </p>
                <div className="aw-rail aw-stack">
                  {t.whyProtect.rails.map((line) => (
                    <p key={line} className="aw-body !mt-0">
                      {line}
                    </p>
                  ))}
                </div>
                <p className="aw-body">{t.whyProtect.p3}</p>
              </div>
            </MotionReveal>
            <MotionReveal>
              <p className="aw-pull mt-10">{t.whyProtect.pull}</p>
            </MotionReveal>
            <MotionReveal>
              <p className="aw-body mt-10">{t.whyProtect.p4}</p>
            </MotionReveal>
          </div>
        </section>

        {/* Meet — full list + why it matters + shapes */}
        <section id="meet" className="aw-section scroll-mt-28 bg-card lg:scroll-mt-32">
          <div className="aw-measure aw-measure-wide">
            <MotionReveal>
              <h2 className="aw-display">{t.meet.title}</h2>
            </MotionReveal>
            <MotionReveal>
              <p className="mt-8 font-display text-lg italic text-ink/55 sm:text-xl">
                {t.meet.perhapsWith}
              </p>
            </MotionReveal>
            <Stagger className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              {t.meet.ways.map((way, i) => (
                <StaggerItem key={way} className="flex items-center gap-3.5">
                  <CircleMarker n={i + 1} />
                  <p className="aw-line">{way}</p>
                </StaggerItem>
              ))}
            </Stagger>
            <MotionReveal>
              <p className="aw-lede mt-10">{t.meet.lede}</p>
            </MotionReveal>

            <MotionReveal>
              <hr className="aw-rule" />
              <h2 className="aw-display">{t.meet.whyTitle}</h2>
              <p className="aw-lede">{t.meet.whyLede}</p>
            </MotionReveal>
            <Stagger className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              {t.meet.shapes.map((line, i) => (
                <StaggerItem key={line} className="flex items-center gap-3.5">
                  <CircleMarker n={i + 1} />
                  <p className="aw-line">{line}</p>
                </StaggerItem>
              ))}
            </Stagger>
            <MotionReveal>
              <p className="aw-pull mt-12">{t.meet.pull}</p>
            </MotionReveal>
          </div>
        </section>

        <DropletDivider className="bg-background pt-10 sm:pt-12" />

        {/* About — full verses */}
        <section id="about" className="aw-section scroll-mt-28 bg-background lg:scroll-mt-32">
          <div className="mx-auto grid max-w-6xl gap-8 px-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-12 sm:px-8">
            <MotionReveal>
              <div className="mx-auto w-full max-w-sm lg:sticky lg:top-40 lg:mx-0 lg:max-w-md">
                <img
                  src={malekPortrait}
                  alt={t.about.portraitAlt}
                  width={800}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover object-top"
                />
              </div>
            </MotionReveal>

            <div>
              <MotionReveal>
                <p className="aw-eyebrow">{t.about.eyebrow}</p>
              </MotionReveal>
              {t.about.verses.map((lines, i) => (
                <MotionReveal key={lines[0]}>
                  <Verse className="mt-5" display={i === t.about.displayVerseIndex} lines={lines} />
                </MotionReveal>
              ))}
              <MotionReveal>
                <p className="mt-6 font-display text-xl italic text-ink">{t.about.signoff}</p>
              </MotionReveal>
            </div>
          </div>
        </section>

        {/* Book buying */}
        <section
          id="book"
          className="scroll-mt-28 border-y border-border/40 bg-secondary/40 lg:scroll-mt-32"
        >
          <div className="mx-auto max-w-6xl px-[max(1.25rem,env(safe-area-inset-left))] py-10 pr-[max(1.25rem,env(safe-area-inset-right))] sm:px-8 sm:py-14">
            <MotionReveal>
              <div className="grid overflow-hidden border border-border/60 bg-card sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
                <div className="relative h-44 sm:h-auto sm:min-h-[16rem]">
                  <BookPlateImage alt={t.hero.bookAlt} objectPositionClassName="object-[72%_46%]" />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  <p className="aw-eyebrow">{t.begin.bookEyebrow}</p>
                  <h2 className="mt-2 font-display text-xl font-semibold uppercase tracking-[0.04em] text-ink sm:text-2xl">
                    {t.begin.bookTitle}
                  </h2>
                  <p className="mt-1 text-sm text-ink/60">{t.begin.bookSub}</p>
                  <Verse className="mt-5" lines={t.begin.bookVerse} />
                  <div className="mt-6">
                    <a href={BOOK_PURCHASE_URL} className="btn-lux btn-lux-primary">
                      {BOOK_PRICE} · {t.begin.bookCta}
                      <span aria-hidden>→</span>
                    </a>
                  </div>
                </div>
              </div>
            </MotionReveal>
          </div>
        </section>

        {/* Ways to Begin — full detail */}
        <section id="begin" className="aw-section scroll-mt-28 bg-background lg:scroll-mt-32">
          <div className="aw-measure aw-measure-wide">
            <MotionReveal>
              <h2 className="aw-display aw-display-caps">{t.begin.title}</h2>
            </MotionReveal>

            <div className="mt-8 space-y-9 sm:mt-10 sm:space-y-10">
              <MotionReveal>
                <article>
                  <p className="aw-eyebrow">{t.begin.conversationsEyebrow}</p>
                  <Verse className="mt-4" lines={t.begin.conversationsVerse} />
                  <div className="mt-6">
                    <a
                      href={CONVERSATIONS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-lux btn-lux-ghost"
                    >
                      {t.begin.conversationsCta}
                      <span aria-hidden>→</span>
                    </a>
                  </div>
                </article>
              </MotionReveal>

              <MotionReveal>
                <article id="clarity" className="scroll-mt-28 lg:scroll-mt-32">
                  <p className="aw-eyebrow">{t.begin.clarityEyebrow}</p>
                  <Verse className="mt-4" lines={t.begin.clarityVerse} />
                  <Verse className="mt-5" lines={t.begin.clarityTone} />
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <a
                      href={CLARITY_CALL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-lux btn-lux-primary"
                    >
                      {t.begin.clarityCta}
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
                        {t.begin.clarityOpt1}
                      </a>
                    </li>
                    <li>
                      <a
                        href={CLARITY_SESSION_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline-offset-4 transition-colors hover:text-ember-deep hover:underline"
                      >
                        {t.begin.clarityOpt2}
                      </a>
                    </li>
                  </ul>
                </article>
              </MotionReveal>

              <MotionReveal>
                <article id="community" className="scroll-mt-28 lg:scroll-mt-32">
                  <p className="aw-eyebrow">{t.begin.communityEyebrow}</p>
                  <Verse className="mt-4" lines={t.begin.communityVerse} />
                  <div className="mt-6">
                    <a
                      href={COMMUNITY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-lux btn-lux-ghost"
                    >
                      {t.begin.communityCta}
                      <span aria-hidden>→</span>
                    </a>
                  </div>
                </article>
              </MotionReveal>
            </div>
          </div>
        </section>

        <footer className="border-t border-border/60 bg-secondary/30 pb-[env(safe-area-inset-bottom)]">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-[max(1.25rem,env(safe-area-inset-left))] py-10 pr-[max(1.25rem,env(safe-area-inset-right))] sm:px-8 sm:py-12 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ink">
                Alchemist Ways
              </div>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">{t.final.tagline}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <Link
                to="/"
                className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-ember-deep transition-colors hover:text-ink"
              >
                {t.discover.back}
              </Link>
              <div className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} Alchemist Ways. {t.footer.rights}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </PageEntrance>
  );
}
