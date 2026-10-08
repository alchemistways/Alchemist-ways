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
  /** Skool community (free). */
  community: "https://www.skool.com/alchemist-ways-1974/about",
  /** Calendly: free conversation / clarity call. */
  conversation: "https://calendly.com/alchemistways/conversation",
  /** Calendly: paid clarity session (one-on-one work with Malek). */
  claritySession: "https://calendly.com/alchemistways/clarity-session",
} as const;

export const LINKS = {
  /** Header "Begin" button. */
  begin: "#begin",
  /** Hero "Get the book": no purchase URL supplied yet, so it opens the book card. */
  getTheBook: "#understand",
  /** Hero "Explore the map". */
  exploreTheMap: "#map",
  /** Map section "Explore the map": the complete Map lives in the book. */
  exploreTheMapSection: "#understand",
  /** Opening "Go deeper with the book": same destination as the hero "Get the book". */
  goDeeperWithBook: "#understand",
  /** Map section "The Community Field": the existing Skool community link. */
  communityField: EXTERNAL.community,
  /** Founder "Read the founder story": no standalone story page yet; books a conversation with Malek. */
  founderStory: EXTERNAL.conversation,
  /** Begin card 01 "Discover the tool": the tool is offered through the free community. */
  discoverTool: EXTERNAL.community,
  /** Begin card 02 "Explore the book": no purchase URL supplied yet; joins the community. */
  exploreBook: EXTERNAL.community,
  /** Begin card 03 "Work with Malek": paid clarity session. */
  workWithMalek: EXTERNAL.claritySession,
} as const;

export const isExternal = (href: string) => href.startsWith("http");
