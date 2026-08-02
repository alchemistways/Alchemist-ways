import plate960 from "@/assets/book-plate-960.jpg";
import plate1280 from "@/assets/book-plate-1280.jpg";
import plate1920 from "@/assets/book-plate-1920.jpg";
import plate2560 from "@/assets/book-plate-2560.jpg";
import plate2752 from "@/assets/book-plate-2752.jpg";
import plate960Webp from "@/assets/book-plate-960.webp";
import plate1280Webp from "@/assets/book-plate-1280.webp";
import plate1920Webp from "@/assets/book-plate-1920.webp";
import plate2560Webp from "@/assets/book-plate-2560.webp";
import plate2752Webp from "@/assets/book-plate-2752.webp";

const JPG_SRCSET = `${plate960} 960w, ${plate1280} 1280w, ${plate1920} 1920w, ${plate2560} 2560w, ${plate2752} 2752w`;
const WEBP_SRCSET = `${plate960Webp} 960w, ${plate1280Webp} 1280w, ${plate1920Webp} 1920w, ${plate2560Webp} 2560w, ${plate2752Webp} 2752w`;

/** Full-bleed book-in-corridor plate — responsive JPEG + WebP from native 2K master (2752). */
export function BookPlateImage({
  alt,
  priority = false,
  /** Bias toward the book so cover type stays in the sharp zone under object-cover. */
  objectPositionClassName = "object-[80%_46%] sm:object-[74%_46%] md:object-[70%_48%] lg:object-[64%_46%]",
}: {
  alt: string;
  priority?: boolean;
  objectPositionClassName?: string;
}) {
  return (
    <picture>
      <source type="image/webp" srcSet={WEBP_SRCSET} sizes="100vw" />
      <source type="image/jpeg" srcSet={JPG_SRCSET} sizes="100vw" />
      <img
        src={plate1920}
        alt={alt}
        width={2752}
        height={1536}
        sizes="100vw"
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
        loading={priority ? "eager" : "lazy"}
        className={`pointer-events-none absolute inset-0 h-full w-full select-none object-cover ${objectPositionClassName}`}
      />
    </picture>
  );
}
