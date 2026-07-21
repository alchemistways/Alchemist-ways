import plate960 from "@/assets/book-plate-960.jpg";
import plate1280 from "@/assets/book-plate-1280.jpg";
import plate1920 from "@/assets/book-plate-1920.jpg";
import plate2560 from "@/assets/book-plate-2560.jpg";
import plate4096 from "@/assets/book-plate-4096.jpg";
import plate960Webp from "@/assets/book-plate-960.webp";
import plate1280Webp from "@/assets/book-plate-1280.webp";
import plate1920Webp from "@/assets/book-plate-1920.webp";
import plate2560Webp from "@/assets/book-plate-2560.webp";
import plate4096Webp from "@/assets/book-plate-4096.webp";

const JPG_SRCSET = `${plate960} 960w, ${plate1280} 1280w, ${plate1920} 1920w, ${plate2560} 2560w, ${plate4096} 4096w`;
const WEBP_SRCSET = `${plate960Webp} 960w, ${plate1280Webp} 1280w, ${plate1920Webp} 1920w, ${plate2560Webp} 2560w, ${plate4096Webp} 4096w`;

/** Full-bleed book-in-corridor plate — responsive JPEG + WebP for phone → 4K. */
export function BookPlateImage({
  alt,
  priority = false,
  objectPositionClassName = "object-[78%_48%] sm:object-[72%_48%] md:object-[68%_50%] lg:object-[62%_48%]",
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
        width={4096}
        height={2286}
        sizes="100vw"
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
        loading={priority ? "eager" : "lazy"}
        className={`pointer-events-none absolute inset-0 h-full w-full select-none object-cover ${objectPositionClassName}`}
      />
    </picture>
  );
}
