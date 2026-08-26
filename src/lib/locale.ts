/**
 * Locale preference — EN is live; FR (and future locales) store a preference
 * until client-supplied copy ships. Do not invent translated page copy here.
 */

export type Locale = "en" | "fr";

export type LocaleOption = {
  code: Locale;
  label: string;
  /** When false, selecting stores preference only (light “coming” UI). */
  live: boolean;
};

export const LOCALES: readonly LocaleOption[] = [
  { code: "en", label: "EN", live: true },
  { code: "fr", label: "FR", live: false },
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
