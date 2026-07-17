import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  firstName: z.string().trim().max(80).optional().or(z.literal("")),
  email: z.string().trim().email("Please enter a valid email").max(255),
});

type Props = {
  onJoined?: () => void;
  compact?: boolean;
};

const STORAGE_KEY = "aw_waitlist";

function readWaitlist(): Array<{
  firstName?: string;
  email: string;
  at: string;
}> {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

export function WaitlistForm({ onJoined, compact = false }: Props) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse({ firstName, email });
    if (!parsed.success) {
      setStatus("error");
      setMessage(parsed.error.issues[0]?.message ?? "Please check your details");
      return;
    }
    setStatus("loading");
    setMessage("");
    // Local-only capture for now. When a backend is connected (Cloud/Mailchimp/Kit),
    // this is where we POST the submission.
    try {
      const existing = readWaitlist();
      const normalized = parsed.data.email.toLowerCase();
      const already = existing.some(
        (entry) => typeof entry?.email === "string" && entry.email.toLowerCase() === normalized,
      );
      if (!already) {
        existing.push({ ...parsed.data, at: new Date().toISOString() });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
      }
      await new Promise((r) => setTimeout(r, 600));
      setStatus("success");
      onJoined?.();
    } catch {
      setStatus("error");
      setMessage("Something went quiet on our end. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="animate-fade-up rounded-2xl border border-gold/40 bg-gold-soft/40 p-6 sm:p-8">
        <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.28em] text-gold-deep">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold-deep" />
          You're on the list
        </div>
        <h3 className="mt-3 font-display text-2xl leading-tight text-ink sm:text-3xl">
          {firstName ? `Thank you, ${firstName}.` : "Thank you for joining."}
        </h3>
        <p className="mt-3 leading-relaxed text-ink/80">
          We'll be in touch quietly, not often. When the book is ready, you'll be the first to know.
          In the meantime — stay curious.
        </p>
        <p className="mt-4 font-display italic text-muted-foreground">
          Keep what is true. Leave what isn't.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div
        className={
          compact ? "flex flex-col gap-3 sm:flex-row" : "grid gap-3 sm:grid-cols-[1fr_1.4fr]"
        }
      >
        <input
          type="text"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="First name (optional)"
          className="w-full rounded-full border border-border bg-card px-5 py-3.5 text-base text-ink placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 sm:py-3 sm:text-sm"
          autoComplete="given-name"
          maxLength={80}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="you@example.com"
          required
          className="w-full rounded-full border border-border bg-card px-5 py-3.5 text-base text-ink placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 sm:py-3 sm:text-sm"
          autoComplete="email"
          maxLength={255}
        />
      </div>
      <div className="flex flex-col-reverse items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          Quiet updates. No noise. Unsubscribe anytime.
        </p>
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-lux btn-lux-primary w-full disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
        >
          {status === "loading" ? "Joining…" : "Join the waitlist"}
        </button>
      </div>
      {status === "error" && (
        <p className="text-xs text-destructive" role="alert">
          {message}
        </p>
      )}
    </form>
  );
}
