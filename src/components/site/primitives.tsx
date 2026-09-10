import type { ReactNode } from "react";
import beige from "@/assets/dunes-hd.jpg";

export function PlasterSection({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden bg-sand ${className}`}
      style={{
        backgroundImage: `url(${beige})`,
        backgroundSize: "cover",
        backgroundPosition: "left top",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[oklch(0.93_0.014_75)]/55" />
      <div className="relative">{children}</div>
    </section>
  );
}

export function Diamond({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block h-[7px] w-[7px] rotate-45 bg-ember ${className}`}
    />
  );
}

export function RuleDiamond({ className = "" }: { className?: string }) {
  return (
    <div className={`rule-diamond ${className}`}>
      <Diamond />
    </div>
  );
}

export function Hairline({ className = "" }: { className?: string }) {
  return <div className={`hairline ${className}`} />;
}

export function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <path
        d="M50 0 C54 38 62 46 100 50 C62 54 54 62 50 100 C46 62 38 54 0 50 C38 46 46 38 50 0Z"
        fill="currentColor"
      />
    </svg>
  );
}
