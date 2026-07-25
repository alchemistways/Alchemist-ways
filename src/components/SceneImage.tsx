/** Responsive JPEG + WebP still for mid-page book scenes. */
export function SceneImage({
  jpg,
  webp,
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
      <source type="image/webp" srcSet={webp} />
      <img
        src={jpg}
        alt={alt}
        width={width}
        height={height}
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
      {/* Warm the dull black floor before page color takes over */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-[rgba(58,42,32,0.35)] via-[rgba(180,140,110,0.12)] to-transparent"
      />
      {/* Soft merge: bottom floor + side edges into page color */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t ${blendFromClassName} via-transparent to-transparent opacity-95`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 right-0 w-[32%] bg-gradient-to-l ${blendFromClassName} via-transparent to-transparent opacity-75`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 left-0 w-[14%] bg-gradient-to-r ${blendFromClassName} via-transparent to-transparent opacity-55`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b ${blendFromClassName} via-transparent to-transparent opacity-40`}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0_-36px_56px_-8px_rgba(250,246,240,0.9)]"
      />
    </div>
  );
}
