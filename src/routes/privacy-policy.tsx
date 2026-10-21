import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { SiteFooter } from "../components/SiteFooter";
import { POLICY, POLICY_UPDATED } from "../content/privacyPolicy";

// TODO(privacy email): set the privacy contact address here once Saad provides it. Every
// [[PRIVACY_EMAIL]] marker in the policy text then becomes a mailto link; until then it shows
// the neutral note below.
const PRIVACY_EMAIL = "";
const PRIVACY_EMAIL_PENDING = "A dedicated privacy contact email will be listed here shortly.";

const URL = "https://alchemistways.com/privacy-policy/";
const TITLE = "Privacy Policy | Alchemist Ways";
const DESCRIPTION =
  "How Alchemist Ways collects, uses and protects your personal information, and your rights under PIPEDA, Quebec’s Law 25 and Canada’s Anti-Spam Legislation.";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: PrivacyPolicy,
});

/** Tiny inline renderer for **bold**, *italic*, [text](url) and the [[PRIVACY_EMAIL]] marker. */
function Inline({ text }: { text: string }) {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\(([^)]+)\)|\[\[PRIVACY_EMAIL\]\]/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1])
      out.push(
        <strong key={k++} className="font-semibold text-ink">
          {m[1]}
        </strong>,
      );
    else if (m[2]) out.push(<em key={k++}>{m[2]}</em>);
    else if (m[3])
      out.push(
        <a
          key={k++}
          href={m[4]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-rust underline decoration-1 underline-offset-2 hover:text-rust-deep"
        >
          {m[3]}
        </a>,
      );
    else
      out.push(
        PRIVACY_EMAIL ? (
          <a key={k++} href={`mailto:${PRIVACY_EMAIL}`} className="text-rust underline">
            {PRIVACY_EMAIL}
          </a>
        ) : (
          <span key={k++}>{PRIVACY_EMAIL_PENDING}</span>
        ),
      );
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

function PrivacyPolicy() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 bg-white px-4 py-2 focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to content
      </a>
      <header className="border-b border-[#efe3d3] bg-[#f3ebdf] px-6 py-5 sm:px-8">
        <div className="mx-auto flex max-w-[760px] items-center justify-between">
          <a
            href="/"
            className="font-mono text-[14px] tracking-[0.16em] text-ink uppercase no-underline"
          >
            Alchemist Ways
          </a>
          <a href="/" className="text-[14px] text-ink-soft underline-offset-4 hover:underline">
            ← Back to home
          </a>
        </div>
      </header>
      <main id="main" className="bg-white px-6 pt-12 pb-16 sm:px-8 md:pt-16 md:pb-24">
        <article className="mx-auto max-w-[760px] text-[17px] leading-[1.65] text-[#2a2c33] md:text-[18px]">
          <p className="font-serif text-[13px] tracking-[0.24em] text-[#6f6a66] uppercase">
            Alchemist Ways
          </p>
          <h1 className="mt-3 font-serif text-[40px] leading-[1.1] font-normal tracking-[-0.01em] text-ink md:text-[56px]">
            Privacy Policy
          </h1>
          <p className="mt-3 text-[14px] tracking-[0.04em] text-[#6f6a66]">{POLICY_UPDATED}</p>
          {POLICY.map((b, i) =>
            b.t === "h" ? (
              <h2
                key={i}
                className="mt-11 font-serif text-[26px] leading-[1.2] font-normal text-ink md:text-[30px]"
              >
                {b.x}
              </h2>
            ) : b.t === "p" ? (
              <p key={i} className="mt-4">
                <Inline text={b.x} />
              </p>
            ) : (
              <ul key={i} className="mt-4 list-disc space-y-2 pl-6 marker:text-rust">
                {b.items.map((it, j) => (
                  <li key={j}>
                    <Inline text={it} />
                  </li>
                ))}
              </ul>
            ),
          )}
          <p className="mt-14">
            <a href="/" className="btn-pill min-h-[48px]">
              ← Back to Alchemist Ways
            </a>
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
