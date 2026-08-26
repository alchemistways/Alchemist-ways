import type { ReactNode } from "react";

/**
 * Motion wrappers are passthroughs — landing copy paints immediately.
 * (Scroll fades made phone scroll feel gimmicky; Royalmount-style = text is just there.)
 */

export function PageEntrance({ children }: { children: ReactNode }) {
  return <div className="min-h-screen">{children}</div>;
}

export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  /** Kept for call-site compat; ignored (no staggered fade). */
  delay?: number;
}) {
  if (className) {
    return <div className={className}>{children}</div>;
  }
  return <>{children}</>;
}
