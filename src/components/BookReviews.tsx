import { useEffect, useId, useState } from "react";
import { BOOK_REVIEWS } from "@/data/book-reviews";
import { REVIEW_FORM_ACTION } from "@/lib/offers";

const ROTATE_MS = 3500;

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Curated rotating reviews + Share a review form.
 * Form submissions go to moderation (mailto / Kit) — never auto-publish to the carousel.
 */
export function BookReviews() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const review = BOOK_REVIEWS[index] ?? BOOK_REVIEWS[0];

  useEffect(() => {
    if (BOOK_REVIEWS.length < 2 || paused || prefersReducedMotion()) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % BOOK_REVIEWS.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section
      id="reviews"
      aria-label="Book reviews"
      className="scroll-mt-28 border-y border-border/50 bg-secondary/35"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="mx-auto max-w-3xl px-[max(1.25rem,env(safe-area-inset-left))] py-12 pr-[max(1.25rem,env(safe-area-inset-right))] sm:px-8 sm:py-16">
        <p className="text-center text-[0.65rem] uppercase tracking-[0.28em] text-ember-deep">
          From readers
        </p>

        <figure className="mt-6 text-center" aria-live="polite">
          <blockquote
            key={review.id}
            className="animate-fade-up font-display text-xl font-semibold leading-snug text-ink sm:text-2xl md:text-[1.65rem]"
          >
            <p>&ldquo;{review.quote}&rdquo;</p>
          </blockquote>
          <figcaption className="mt-5 text-sm tracking-[0.04em] text-ink/60 sm:text-base">
            — {review.attribution}
          </figcaption>
        </figure>

        {BOOK_REVIEWS.length > 1 && (
          <div
            className="mt-8 flex items-center justify-center gap-1.5"
            role="tablist"
            aria-label="Review quotes"
          >
            {BOOK_REVIEWS.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show review ${i + 1}`}
                onClick={() => setIndex(i)}
                className="flex h-11 w-11 items-center justify-center"
              >
                <span
                  className={`block h-2 rounded-full transition-all duration-300 ${
                    i === index ? "w-6 bg-ember" : "w-2 bg-border"
                  }`}
                />
              </button>
            ))}
          </div>
        )}

        <div className="mt-10 flex flex-col items-center gap-3">
          {!formOpen ? (
            <button
              type="button"
              onClick={() => setFormOpen(true)}
              className="btn-lux btn-lux-sand w-full sm:w-auto"
            >
              Share a review
            </button>
          ) : (
            <ShareReviewForm onCancel={() => setFormOpen(false)} />
          )}
          <p className="max-w-sm text-center text-xs leading-relaxed text-ink/55">
            Featured quotes are curated. Your submission is reviewed before it appears here.
          </p>
        </div>
      </div>
    </section>
  );
}

function ShareReviewForm({ onCancel }: { onCancel: () => void }) {
  const formId = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [quote, setQuote] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = quote.trim();
    if (!trimmed) return;

    setStatus("loading");
    try {
      const body = [
        name.trim() ? `Name: ${name.trim()}` : null,
        email.trim() ? `Email: ${email.trim()}` : null,
        "",
        trimmed,
        "",
        "(Submitted via Share a review — moderate before featuring.)",
      ]
        .filter((line) => line !== null)
        .join("\n");

      if (REVIEW_FORM_ACTION.startsWith("mailto:")) {
        const url = new URL(REVIEW_FORM_ACTION);
        url.searchParams.set("body", body);
        window.location.href = url.toString();
        setStatus("success");
        return;
      }

      const form = new FormData();
      form.append("email_address", email.trim() || "review@placeholder.local");
      form.append("first_name", name.trim() || "Reader");
      form.append("review_quote", trimmed);
      const res = await fetch(REVIEW_FORM_ACTION, {
        method: "POST",
        body: form,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Review form responded ${res.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="animate-fade-up w-full max-w-md rounded-2xl border border-ember/35 bg-ember-soft/40 px-5 py-6 text-center sm:px-6"
        role="status"
      >
        <p className="font-display text-lg font-semibold leading-snug text-ink sm:text-xl">
          Thank you. We&apos;ll review your words before featuring them.
        </p>
        <button
          type="button"
          onClick={onCancel}
          className="btn-lux btn-lux-ghost mt-5 min-h-11 w-full sm:w-auto"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-2xl border border-border/70 bg-card/80 px-5 py-6 sm:px-6"
      noValidate={false}
    >
      <p className="font-display text-lg font-semibold text-ink">Share a review</p>
      <p className="mt-1.5 text-sm leading-relaxed text-ink/65">
        Tell us how the book landed. We read every note and only feature what we approve.
      </p>

      <div className="mt-5 space-y-3">
        <div>
          <label htmlFor={`${formId}-name`} className="sr-only">
            Name or initials
          </label>
          <input
            id={`${formId}-name`}
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name or initials (optional)"
            autoComplete="name"
            maxLength={80}
            className="min-h-11 w-full rounded-full border border-border bg-background px-5 py-3 text-base text-ink placeholder:text-muted-foreground focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/25"
          />
        </div>
        <div>
          <label htmlFor={`${formId}-email`} className="sr-only">
            Email
          </label>
          <input
            id={`${formId}-email`}
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder="Email (optional, for follow-up)"
            autoComplete="email"
            maxLength={255}
            className="min-h-11 w-full rounded-full border border-border bg-background px-5 py-3 text-base text-ink placeholder:text-muted-foreground focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/25"
          />
        </div>
        <div>
          <label htmlFor={`${formId}-quote`} className="sr-only">
            Your review
          </label>
          <textarea
            id={`${formId}-quote`}
            name="review"
            value={quote}
            onChange={(e) => {
              setQuote(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder="Your review"
            required
            rows={4}
            maxLength={800}
            className="w-full resize-y rounded-2xl border border-border bg-background px-5 py-3.5 text-base text-ink placeholder:text-muted-foreground focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/25"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="btn-lux btn-lux-ghost min-h-11 w-full sm:w-auto"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={status === "loading" || !quote.trim()}
          className="btn-lux btn-lux-primary min-h-11 w-full disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
        >
          {status === "loading" ? "Sending…" : "Submit for review"}
        </button>
      </div>

      {status === "error" && (
        <p className="mt-3 text-center text-xs text-destructive" role="alert">
          Something went quiet on our end. Please try again.
        </p>
      )}
    </form>
  );
}
