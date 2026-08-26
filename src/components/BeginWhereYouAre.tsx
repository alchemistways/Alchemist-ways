import { Reveal } from "@/components/PageMotion";
import { BOOK_PRICE, BOOK_PURCHASE_URL, TOOL_PRICE, TOOL_PURCHASE_URL } from "@/lib/offers";

/**
 * Begin Where You Are — Experience / Understand / Practice (PDF FINAL p. 9).
 * Tool + Book CTAs smooth-scroll to their in-page extensions until payment
 * links ship; Practice scrolls to the Work With Me / Clarity extension.
 */
const OPTIONS = [
  {
    id: "experience",
    eyebrow: "Experience",
    title: "Meet What’s Here.",
    subtitle: "A 10-minute Emotional Awareness Tool",
    body: "Take one reaction, feeling, or pattern and begin seeing the invisible architecture beneath it.",
    cta: { href: TOOL_PURCHASE_URL, label: `${TOOL_PRICE} · Explore the Tool` },
  },
  {
    id: "understand",
    eyebrow: "Understand",
    title: "Meet Yourself, Differently.",
    subtitle: "The book / complete Map.",
    body: "Go deeper into the hidden architecture beneath your patterns — and the process from reactivity to Creative Agency.",
    cta: { href: BOOK_PURCHASE_URL, label: `${BOOK_PRICE} · Explore the Book` },
  },
  {
    id: "practice-option",
    eyebrow: "Practice",
    title: "Work With Malek.",
    subtitle: null,
    body: "Workshops, group experiences, and one-on-one work for bringing the map into lived experience.",
    cta: { href: "#clarity", label: "Explore Working Together" },
  },
] as const;

export function BeginWhereYouAre() {
  return (
    <div>
      <Reveal>
        <div className="text-center">
          <h2 className="aw-display">Begin Where You Are</h2>
          <p className="aw-lede mx-auto mt-4">
            There is no single place you have to begin.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:mt-12 md:grid-cols-3 md:gap-6">
        {OPTIONS.map((option, i) => (
          <Reveal key={option.id} delay={i * 70}>
            <article className="flex h-full min-h-[19rem] flex-col rounded-2xl border border-border/70 bg-card/60 px-5 py-6 sm:min-h-[21rem] sm:px-6 sm:py-7">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-ember-deep">
                {option.eyebrow}
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold uppercase leading-snug tracking-[0.03em] text-ink sm:text-xl">
                {option.title}
              </h3>
              {option.subtitle ? (
                <p className="mt-2 text-sm italic leading-snug text-ink/65 sm:text-[0.95rem]">
                  {option.subtitle}
                </p>
              ) : null}
              <p className="mt-3 flex-1 text-base leading-relaxed text-ink/75 sm:mt-4">
                {option.body}
              </p>
              <div className="mt-7 flex w-full flex-col justify-end">
                <a
                  href={option.cta.href}
                  className="btn-lux btn-lux-sand inline-flex h-11 min-h-11 w-full items-center justify-center gap-1.5 px-4 text-center text-[0.68rem] tracking-[0.04em] sm:text-[0.7rem]"
                >
                  {option.cta.label}
                  <span aria-hidden>→</span>
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
