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
  /** Soft edge fades so dark floors / hard crops melt into the page. */
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

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {picture}
      {/* Warm the dull black floor before page color takes over — kept light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[32%] bg-gradient-to-t from-[rgba(58,42,32,0.18)] via-[rgba(180,140,110,0.06)] to-transparent"
      />
      {/* Soft merge: bottom floor + side edges into page color */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t ${blendFromClassName} via-transparent to-transparent opacity-70`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 right-0 w-[18%] bg-gradient-to-l ${blendFromClassName} via-transparent to-transparent opacity-45`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 left-0 w-[8%] bg-gradient-to-r ${blendFromClassName} via-transparent to-transparent opacity-30`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-[10%] bg-gradient-to-b ${blendFromClassName} via-transparent to-transparent opacity-25`}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0_-20px_36px_-10px_rgba(250,246,240,0.55)]"
      />
    </div>
  );
}
