import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Youtube } from "lucide-react";
import malekPortrait from "@/assets/malek-portrait.jpg";
import { BookPlateImage } from "@/components/BookPlateImage";
import { MapScrollJourney } from "@/components/MapScrollJourney";
import { PageEntrance, Reveal } from "@/components/PageMotion";
import { SiteHeader } from "@/components/SiteHeader";
import { useLocale } from "@/lib/i18n/LocaleProvider";
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
 * Copy via EN / fr-CA catalogs (`useLocale`).
 */
function LandingPage() {
  const { t } = useLocale();

  return (
    <PageEntrance>
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />

        {/* Hero — FINAL p.1 */}
        <section id="top" className="relative overflow-hidden bg-[#d4c4b0] md:min-h-[100svh]">
          <div className="relative h-[min(54svh,460px)] w-full sm:h-[min(56svh,520px)] md:absolute md:inset-0 md:h-full">
            <BookPlateImage priority alt={t.hero.bookAlt} />
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
                <span>{t.hero.line1}</span>
                <span
                  className="origin-center font-semibold text-ember-deep"
                  style={{ transform: "rotate(180deg)" }}
                >
                  {t.hero.line2}
                </span>
              </h1>
              <p className="mt-6 max-w-sm text-[1.02rem] leading-relaxed text-ink/80 sm:text-lg md:text-[#3a2a1f]/85">
                {t.hero.subline.map((line, i) => (
                  <span key={line}>
                    {i > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </p>

              <div className="mt-9 flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
                <a href="#map" className="btn-lux btn-lux-primary w-full sm:w-auto">
                  {t.hero.exploreMap}
                  <span aria-hidden>↓</span>
                </a>
                <a href="#book" className="btn-lux btn-lux-ghost w-full sm:w-auto">
                  {t.hero.getBook}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="aw-section">
          <div className="aw-measure">
            <Reveal>
              <h2 className="aw-display">{t.protect.title}</h2>
            </Reveal>
            <Reveal>
              <p className="mt-8 font-display text-lg italic text-ink/55 sm:text-xl">
                {t.protect.perhapsBy}
              </p>
            </Reveal>
            <div className="aw-stack aw-stack-loose mt-6">
              {t.protect.ways.map((way) => (
                <Reveal key={way}>
                  <p className="aw-line">{way}</p>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <hr className="aw-rule" />
              <p className="aw-lede mt-0">{t.protect.lede}</p>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-border/40 bg-secondary/30">
          <div className="aw-measure aw-section">
            <Reveal>
              <h2 className="aw-display">{t.whyProtect.title}</h2>
            </Reveal>
            <div className="mt-8 space-y-6">
              <Reveal>
                <p className="aw-body">{t.whyProtect.p1}</p>
              </Reveal>
              <Reveal>
                <p className="aw-body">
                  {t.whyProtect.p2Before}{" "}
                  <span className="font-display italic text-ink">{t.whyProtect.p2Quote}</span>
                </p>
              </Reveal>
              <Reveal>
                <div className="aw-rail aw-stack">
                  {t.whyProtect.rails.map((line) => (
                    <p key={line} className="aw-body !mt-0">
                      {line}
                    </p>
                  ))}
                </div>
              </Reveal>
              <Reveal>
                <p className="aw-body">{t.whyProtect.p3}</p>
              </Reveal>
              <Reveal>
                <p className="aw-pull">{t.whyProtect.pull}</p>
              </Reveal>
              <Reveal>
                <p className="aw-body">{t.whyProtect.p4}</p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="aw-section">
          <div className="aw-measure">
            <Reveal>
              <h2 className="aw-display">{t.meet.title}</h2>
            </Reveal>
            <Reveal>
              <p className="mt-8 font-display text-lg italic text-ink/55 sm:text-xl">
                {t.meet.perhapsWith}
              </p>
            </Reveal>
            <div className="aw-stack aw-stack-loose mt-6">
              {t.meet.ways.map((way) => (
                <Reveal key={way}>
                  <p className="aw-line">{way}</p>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <p className="aw-lede">{t.meet.lede}</p>
            </Reveal>

            <Reveal>
              <hr className="aw-rule" />
              <h2 className="aw-display">{t.meet.whyTitle}</h2>
            </Reveal>
            <Reveal>
              <p className="aw-lede">{t.meet.whyLede}</p>
            </Reveal>
            <div className="aw-stack aw-stack-loose mt-8">
              {t.meet.shapes.map((line) => (
                <Reveal key={line}>
                  <p className="aw-line">{line}</p>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <p className="aw-pull mt-10">{t.meet.pull}</p>
            </Reveal>
          </div>
        </section>

        <section className="aw-section pb-8 sm:pb-10">
          <div className="aw-measure">
            <Reveal>
              <div className="aw-rail">
                <h2 className="aw-display">{t.mapBridge.title}</h2>
              </div>
            </Reveal>
          </div>
        </section>

        <div id="map" className="scroll-mt-28 lg:scroll-mt-32">
          <MapScrollJourney />
        </div>

        <section
          id="about"
          className="scroll-mt-28 lg:scroll-mt-32 aw-section border-t border-border/40"
        >
          <div className="mx-auto grid max-w-6xl gap-8 px-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-12 sm:px-8">
            <Reveal>
              <div className="mx-auto w-full max-w-sm lg:mx-0 lg:max-w-md">
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
            </Reveal>

            <div>
              <Reveal>
                <p className="aw-eyebrow">{t.about.eyebrow}</p>
              </Reveal>
              <Reveal>
                {t.about.verses.map((lines, i) => (
                  <Verse
                    key={lines[0]}
                    className="mt-5"
                    display={i === t.about.displayVerseIndex}
                    lines={lines}
                  />
                ))}
                <p className="mt-8 font-display text-xl italic text-ink">{t.about.signoff}</p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="border-y border-border/40 bg-secondary/25">
          <div className="aw-measure aw-section">
            <Reveal>
              <p className="aw-eyebrow">{t.invitation.eyebrow}</p>
              <Verse className="mt-5" display lines={t.invitation.lines} />
              <Verse className="mt-8" lines={t.invitation.closer} />
            </Reveal>
          </div>
        </section>

        <section className="aw-section">
          <div className="aw-measure aw-measure-wide">
            <Reveal>
              <h2 className="aw-display aw-display-caps">{t.begin.title}</h2>
            </Reveal>

            <div className="mt-10 space-y-12 sm:mt-12 sm:space-y-14">
              <Reveal>
                <article id="book" className="scroll-mt-28 lg:scroll-mt-32">
                  <p className="aw-eyebrow">{t.begin.bookEyebrow}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold uppercase tracking-[0.04em] text-ink sm:text-2xl">
                    {t.begin.bookTitle}
                  </h3>
                  <p className="mt-1 text-sm text-ink/60">{t.begin.bookSub}</p>
                  <Verse className="mt-5" lines={t.begin.bookVerse} />
                  <div className="mt-6">
                    <a href={BOOK_PURCHASE_URL} className="btn-lux btn-lux-primary">
                      {BOOK_PRICE} · {t.begin.bookCta}
                      <span aria-hidden>→</span>
                    </a>
                  </div>
                </article>
              </Reveal>

              <Reveal>
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
              </Reveal>

              <Reveal>
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
              </Reveal>

              <Reveal>
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
              </Reveal>
            </div>
          </div>
        </section>

        <section className="border-t border-border/40 bg-secondary/30">
          <div className="aw-measure aw-section text-left">
            <Reveal>
              <Verse display lines={t.final.lines} />
              <div className="mt-10">
                <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ink">
                  Alchemist Ways
                </p>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">{t.final.tagline}</p>
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
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">{t.final.tagline}</p>
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
                  © {new Date().getFullYear()} Alchemist Ways. {t.footer.rights}
                </div>
              </div>
            </div>
          </Reveal>
        </footer>
      </div>
    </PageEntrance>
  );
}

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
      {lines.map((line) => (
        <p key={line}>{line}</p>
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
