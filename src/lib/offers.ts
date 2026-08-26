/**
 * Offer destinations — PDF FINAL flow (Clarity Call + Tool / Book / Practice).
 * Payment placeholders anchor to the on-page extensions until the client
 * supplies real checkout links — ask before inventing URLs.
 */

/** $14 Meet What’s Here — placeholder until the real payment link ships. */
export const TOOL_PURCHASE_URL = "#tool";

/** $28 Meet Yourself, Differently. — placeholder until the real payment link ships. */
export const BOOK_PURCHASE_URL = "#book";

/** Free 30-minute Clarity Call (live Calendly). */
export const CLARITY_CALL_URL = "https://calendly.com/alchemistways/conversation";

/** Paid 90-minute Clarity Session (live Calendly). */
export const CLARITY_SESSION_URL = "https://calendly.com/alchemistways/clarity-session";

/** The World of Alchemist Ways — Skool community. */
export const COMMUNITY_URL = "https://www.skool.com/alchemist-ways-1974/about";

export const TOOL_PRICE = "$14";
export const BOOK_PRICE = "$28";

/**
 * Moderated book-review intake (BookReviews is currently unrendered but kept).
 * Prefer a Kit form `https://app.kit.com/forms/…/subscriptions` when the client creates one.
 * `mailto:` opens the visitor’s mail client with a prefilled draft — never auto-publishes.
 */
export const REVIEW_FORM_ACTION = "mailto:?subject=Book%20review%20%E2%80%94%20Alchemist%20Ways";
