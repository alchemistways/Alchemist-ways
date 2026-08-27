/**
 * Locale preference + Canadian French (fr-CA) catalogs.
 * EN and FR are both live; FR serves fr-CA copy.
 */

import { catalogs, type Messages } from "@/lib/i18n/messages";

export type Locale = "en" | "fr";

export type LocaleOption = {
  code: Locale;
  label: string;
  /** BCP 47 tag for <html lang>. */
  htmlLang: string;
  live: boolean;
};

export const LOCALES: readonly LocaleOption[] = [
  { code: "en", label: "EN", htmlLang: "en", live: true },
  { code: "fr", label: "FR", htmlLang: "fr-CA", live: true },
] as const;

const STORAGE_KEY = "alchemist-ways-locale";

function isLocale(value: string | null): value is Locale {
  return value === "en" || value === "fr";
}

export function getStoredLocale(): Locale {
  if (typeof window === "undefined") return "en";
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return isLocale(raw) ? raw : "en";
  } catch {
    return "en";
  }
}

export function setStoredLocale(locale: Locale): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* private mode / quota — preference is best-effort */
  }
}

export function getMessages(locale: Locale): Messages {
  return catalogs[locale];
}

export function getHtmlLang(locale: Locale): string {
  return LOCALES.find((l) => l.code === locale)?.htmlLang ?? "en";
}

export function applyDocumentLocale(locale: Locale): void {
  if (typeof document === "undefined") return;
  document.documentElement.lang = getHtmlLang(locale);
  const m = getMessages(locale);
  if (document.title !== m.meta.title) document.title = m.meta.title;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", m.meta.description);
}
