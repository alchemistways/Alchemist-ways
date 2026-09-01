import type { ReactNode } from "react";

import { BookSceneImage } from "@/components/BookSceneImage";

export function BookOfferCard({
  imageAlt,
  eyebrow,
  title,
  subtitle,
  children,
  actions,
}: {
  imageAlt: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  children?: ReactNode;
  actions: ReactNode;
}) {
  return (
    <article className="grid overflow-hidden bg-card sm:grid-cols-2 sm:rounded-sm sm:shadow-[0_10px_40px_rgba(38,32,25,0.05)] sm:ring-1 sm:ring-border/35">
      <div className="relative aspect-[5/4] bg-[#ebe5dc] sm:aspect-auto sm:min-h-[17rem] lg:min-h-[19rem]">
        <BookSceneImage alt={imageAlt} />
      </div>
      <div className="flex flex-col justify-center border-t border-border/25 px-6 py-8 sm:border-t-0 sm:border-l sm:px-9 sm:py-9 lg:px-11 lg:py-10">
        <p className="aw-eyebrow">{eyebrow}</p>
        <h2 className="mt-2 font-display text-xl font-semibold uppercase tracking-[0.04em] text-ink sm:text-2xl">
          {title}
        </h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/60">{subtitle}</p>
        {children}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">{actions}</div>
      </div>
    </article>
  );
}
