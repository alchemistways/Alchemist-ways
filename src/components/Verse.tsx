/** Short poetic line stack — shared by the landing page and /discover. */
export function Verse({
  lines,
  display = false,
  className = "",
}: {
  lines: readonly string[];
  display?: boolean;
  className?: string;
}) {
  return (
    <div className={`aw-verse ${display ? "aw-verse-display" : ""} ${className}`.trim()}>
      {lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
  );
}
