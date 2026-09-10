import { useEffect, useSyncExternalStore } from "react";
import type { ReactNode } from "react";

export type Lang = "en" | "fr";

const KEY = "aw-lang";
let current: Lang = "en";
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot(): Lang {
  return current;
}

function getServerSnapshot(): Lang {
  return "en";
}

export function setLang(lang: Lang) {
  if (current === lang) return;
  current = lang;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(KEY, lang);
    } catch {
      /* ignore */
    }
  }
  emit();
}

if (typeof window !== "undefined") {
  try {
    const stored = window.localStorage.getItem(KEY);
    if (stored === "fr" || stored === "en") {
      current = stored;
    }
  } catch {
    /* ignore */
  }
}

export function useLang(): Lang {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  useEffect(() => {
    document.documentElement.lang = lang === "fr" ? "fr-CA" : "en";
  }, [lang]);
  return lang;
}

/**
 * Renders copy where *starred* fragments become ember-accented emphasis and
 * newlines become line breaks.
 */
export function Rich({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  text.split("\n").forEach((line, li) => {
    if (li > 0) nodes.push(<br key={`br-${li}`} />);
    line.split("*").forEach((part, i) => {
      if (!part) return;
      nodes.push(
        i % 2 === 1 ? (
          <em key={`${li}-${i}`} className="text-ember">
            {part}
          </em>
        ) : (
          <span key={`${li}-${i}`}>{part}</span>
        ),
      );
    });
  });
  return <>{nodes}</>;
}
