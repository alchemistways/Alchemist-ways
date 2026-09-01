import type { ReactNode } from "react";

/**
 * Layout wrappers kept for call-site structure — no scroll fade or stagger.
 * Copy paints immediately on phone and desktop.
 */

export function MotionReveal({
  children,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
}) {
  if (as === "section") {
    return <section className={className}>{children}</section>;
  }
  return <div className={className}>{children}</div>;
}

export function Stagger({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
