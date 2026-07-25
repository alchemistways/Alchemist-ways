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
}: {
  jpg: string;
  webp: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}) {
  return (
    <picture className={className}>
      <source type="image/webp" srcSet={webp} />
      <img
        src={jpg}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={imgClassName}
      />
    </picture>
  );
}
