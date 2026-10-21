/**
 * Every outbound link and button destination on the site.
 * Anchors (#…) point to sections of this page.
 */
export const SOCIAL = {
  instagram: "https://www.instagram.com/alchemistways",
  youtube: "https://www.youtube.com/@alchemistwaysofficial",
  tiktok: "https://www.tiktok.com/@alchemistways",
} as const;

export const EXTERNAL = {
  /** Skool community. */
  community: "https://www.skool.com/alchemist-ways-1974/about",
  /** Calendly: free conversation / clarity call. */
  conversation: "https://calendly.com/alchemistways/conversation",
  /** Calendly: paid clarity session (one-on-one work with Malek). */
  claritySession: "https://calendly.com/alchemistways/clarity-session",
  /** Kit form "Alchemist Ways — Main Email List" (hosted page). */
  newsletter: "https://alchemist-ways.kit.com/5cd10cab4e",
  /** That Kit form's subscribe endpoint (form 9699624). */
  newsletterAction: "https://app.kit.com/forms/9699624/subscriptions",
  /** Payhip: buy the book Meet Yourself, Differently. */
  book: "https://payhip.com/b/1PTaC",
} as const;

export const LINKS = {
  /** Header "Begin" button. */
  begin: "#begin",
  /** Hero "Get the book": the Payhip store. */
  getTheBook: EXTERNAL.book,
  /** Hero "Explore the map". */
  exploreTheMap: "#map",
  /** Map section "Explore the map": the complete Map lives in the book. */
  exploreTheMapSection: "#understand",
  /** Opening "Explore the book": the Payhip store. */
  goDeeperWithBook: EXTERNAL.book,
  /** Map section "The Community Field": the existing Skool community link. */
  communityField: EXTERNAL.community,
  /** Founder "Read the founder story": no standalone story page yet; books a conversation with Malek. */
  founderStory: EXTERNAL.conversation,
  /** Begin card 01 "Explore the book": the Payhip store. */
  exploreBook: EXTERNAL.book,
  /** Begin card 02 "Work with Malek": paid clarity session. */
  workWithMalek: EXTERNAL.claritySession,
  /** Begin card 03 "Start 7 days free": the Skool community (7-day trial, then $44/month). */
  startFreeTrial: EXTERNAL.community,
  /** Stay Connected form: posts to the Kit form; its hosted page is the fallback. */
  newsletter: EXTERNAL.newsletter,
  newsletterAction: EXTERNAL.newsletterAction,
} as const;

export const isExternal = (href: string) => href.startsWith("http");
