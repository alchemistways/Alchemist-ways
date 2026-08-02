/**
 * Product offer destinations.
 * Waitlist remains the primary email CTA elsewhere; these are book / map paths.
 * Swap placeholders when Gumroad / map download ship — ask before inventing URLs.
 */

/** Until Gumroad ships, book purchase falls back to the waitlist. */
export const BOOK_PURCHASE_URL = "#waitlist";

/** Until a map download product exists, explore scrolls to the map section. */
export const MAP_DOWNLOAD_URL = "#map";

/**
 * Moderated book-review intake.
 * Prefer a Kit form `https://app.kit.com/forms/…/subscriptions` when the client creates one.
 * `mailto:` opens the visitor’s mail client with a prefilled draft — never auto-publishes.
 */
export const REVIEW_FORM_ACTION =
  "mailto:?subject=Book%20review%20%E2%80%94%20Alchemist%20Ways";

export const OFFER_CTAS = {
  exploreMap: {
    href: MAP_DOWNLOAD_URL,
    label: "Explore the Map",
  },
  getBook: {
    href: BOOK_PURCHASE_URL,
    label: "Get the Book",
  },
} as const;
