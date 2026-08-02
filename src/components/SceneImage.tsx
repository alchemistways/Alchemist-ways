/** Responsive JPEG + WebP still for mid-page book scenes. */
export function SceneImage({
  jpg,
  webp,
  jpgSrcSet,
  webpSrcSet,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1100px",
  alt,
  width,
  height,
  className = "",
  imgClassName = "h-full w-full object-cover",
  priority = false,
  /** Soft edge fades so hard crops melt into the page — no visible square. */
  blend = false,
  blendFromClassName = "from-background",
}: {
  jpg: string;
  webp: string;
  jpgSrcSet?: string;
  webpSrcSet?: string;
  sizes?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  blend?: boolean;
  blendFromClassName?: string;
}) {
  const picture = (
    <picture className={blend ? "block h-full w-full" : className}>
      <source type="image/webp" srcSet={webpSrcSet ?? webp} sizes={jpgSrcSet || webpSrcSet ? sizes : undefined} />
      <source
        type="image/jpeg"
        srcSet={jpgSrcSet ?? jpg}
        sizes={jpgSrcSet || webpSrcSet ? sizes : undefined}
      />
      <img
        src={jpg}
        alt={alt}
        width={width}
        height={height}
        sizes={jpgSrcSet || webpSrcSet ? sizes : undefined}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={`max-w-full ${imgClassName}`}
      />
    </picture>
  );

  if (!blend) return picture;

  /* Four-edge dissolve → cream shows through; corners never read as a hard rect */
  const edgeMask =
    "linear-gradient(to right, transparent 0%, #000 14%, #000 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 16%, #000 84%, transparent 100%)";

  return (
    <div className={`relative ${className}`}>
      <div
        className="relative overflow-hidden"
        style={{
          WebkitMaskImage: edgeMask,
          WebkitMaskComposite: "source-in",
          maskImage: edgeMask,
          maskComposite: "intersect",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      >
        {picture}
        {/* Warm floor tint under the book, still inside the mask */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[36%] bg-gradient-to-t from-[rgba(58,42,32,0.2)] via-[rgba(180,140,110,0.08)] to-transparent"
        />
      </div>
      {/* Extra page-color wash outside the mask for a longer fade */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t ${blendFromClassName} to-transparent opacity-80`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 right-0 w-[22%] bg-gradient-to-l ${blendFromClassName} to-transparent opacity-65`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 left-0 w-[14%] bg-gradient-to-r ${blendFromClassName} to-transparent opacity-55`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-[16%] bg-gradient-to-b ${blendFromClassName} to-transparent opacity-50`}
      />
    </div>
  );
}
