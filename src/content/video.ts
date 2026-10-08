/**
 * VIDEO BLOCK (the cream box with the gold play button under the hero).
 *
 * This is the only place to configure it. While `url` is empty the block is a clearly
 * labelled placeholder: the play button is decorative and not focusable, so nothing on the
 * page leads anywhere broken.
 *
 * To go live, set:
 *   url    - a direct video file (".mp4" / ".webm", plays inline with native controls), or
 *            a YouTube / Vimeo / other page URL (the box becomes a link that opens it in a
 *            new tab).
 *   poster - optional still image shown before playback (import it from src/assets).
 *   title  - what the video is, used for the accessible name.
 * then run `bun run build:pages`.
 */
// TODO(client-asset): video file/URL and poster image not supplied yet.
export const VIDEO: {
  url: string;
  poster?: string | undefined;
  title: string;
  placeholderNote: string;
} = {
  url: "",
  poster: undefined,
  title: "Alchemist Ways: an introduction",
  /** Visible note while there is no video. Set to "" to show only the play icon. */
  placeholderNote: "Video coming soon",
};

export const isVideoFile = (url: string) => /\.(mp4|webm|mov)(\?|#|$)/i.test(url);
