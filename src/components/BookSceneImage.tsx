import scene960 from "@/assets/cards/book-scene-card-960.jpg";
import scene1280 from "@/assets/cards/book-scene-card-1280.jpg";
import scene1920 from "@/assets/cards/book-scene-card-1920.jpg";

const SRCSET = `${scene960} 960w, ${scene1280} 1280w, ${scene1920} 1920w`;

/** Book-on-terrazzo scene for the offer card — centered crop, responsive JPEG ladder. */
export function BookSceneImage({
  alt,
  priority = false,
}: {
  alt: string;
  priority?: boolean;
}) {
  return (
    <img
      src={scene1280}
      srcSet={SRCSET}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px"
      alt={alt}
      width={2752}
      height={1536}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      loading={priority ? "eager" : "lazy"}
      className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-[center_54%]"
    />
  );
}
