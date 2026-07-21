import { useState } from "react";

const KIT_FORM_ACTION = "https://app.kit.com/forms/9699624/subscriptions";

/**
 * Kit (ConvertKit) email form, styled natively — no Kit JS/CSS embed.
 * POSTs the single `email_address` field to the hosted Kit form endpoint.
 */
export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const body = new FormData();
      body.append("email_address", email);
      const res = await fetch(KIT_FORM_ACTION, {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Kit responded ${res.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="animate-fade-up rounded-2xl border border-ember/40 bg-ember-soft/50 px-6 py-6 text-center sm:px-8 sm:py-8"
        role="status"
      >
        <p className="font-display text-xl leading-snug text-ink sm:text-2xl">
          Success! Now check your email to confirm your subscription.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-xl">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          name="email_address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="Your email"
          aria-label="Your email"
          required
          autoComplete="email"
          maxLength={255}
          className="w-full flex-1 rounded-full border border-border bg-card px-5 py-3.5 text-base text-ink placeholder:text-muted-foreground focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/25 sm:py-3 sm:text-sm"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-lux btn-lux-primary w-full whitespace-nowrap disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
        >
          {status === "loading" ? "One moment…" : "Begin Here"}
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
