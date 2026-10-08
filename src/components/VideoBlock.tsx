import { VIDEO, isVideoFile } from "../content/video";
import { PlayIcon } from "./Art";

const BOX =
  "relative mx-auto flex aspect-[656/285] w-full max-w-[1100px] items-center justify-center overflow-hidden rounded-[10px] border border-[#f3b98a] bg-[#fdfbf8]";

export function VideoBlock() {
  const { url, poster, title, placeholderNote } = VIDEO;
  return (
    <section
      aria-label="Video"
      className="bg-white px-5 pt-12 pb-6 md:px-0 md:pt-[clamp(48px,5vw,96px)]"
    >
      <div className="mx-auto w-full md:w-[64%]">
        {!url ? (
          <div className={BOX} data-placeholder="video">
            <PlayIcon className="h-[clamp(44px,4.6vw,80px)] w-auto drop-shadow-[0_6px_10px_rgb(120_70_10/0.25)]" />
            {placeholderNote && (
              <p className="absolute inset-x-0 bottom-[9%] text-center text-[11px] font-medium tracking-[0.28em] text-ink/45 uppercase md:text-[clamp(11px,0.8vw,14px)]">
                {placeholderNote}
              </p>
            )}
          </div>
        ) : isVideoFile(url) ? (
          <video
            className={`${BOX} object-cover`}
            src={url}
            poster={poster}
            controls
            preload="none"
            playsInline
            aria-label={title}
          />
        ) : (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${BOX} group`}
            aria-label={`Play video: ${title} (opens in a new tab)`}
          >
            {poster && (
              <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
            )}
            <PlayIcon className="relative h-[clamp(44px,4.6vw,80px)] w-auto drop-shadow-[0_6px_10px_rgb(120_70_10/0.25)] transition-transform group-hover:scale-110" />
          </a>
        )}
      </div>
    </section>
  );
}
