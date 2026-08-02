/**
 * Curated book reviews only — edit this list to feature approved quotes.
 * Submissions from the Share a review form are never auto-appended here.
 */
export type BookReview = {
  id: string;
  quote: string;
  attribution: string;
};

export const BOOK_REVIEWS: BookReview[] = [
  {
    id: "seed-1",
    quote:
      "It didn’t ask me to become someone else. It helped me hear what my reactions had been trying to say.",
    attribution: "Early reader",
  },
  {
    id: "seed-2",
    quote:
      "A practical map — clear enough to walk, spacious enough to breathe. I keep returning to the five movements.",
    attribution: "Clarity Call guest",
  },
  {
    id: "seed-3",
    quote:
      "Finally language for patterns I’d only felt. Emotional reactivity stopped looking like failure and started looking like information.",
    attribution: "Community member",
  },
  {
    id: "seed-4",
    quote:
      "Quiet, precise, and kind. I read a chapter, closed the book, and noticed my next trigger differently.",
    attribution: "Waitlist reader",
  },
];
