import { SocialIcons } from "./SocialIcons";

export function SiteFooter() {
  return (
    <footer className="relative bg-white pt-16 pb-10 text-center md:pt-28 md:pb-14">
      <p className="font-display text-lg font-semibold tracking-[0.3em] text-ink uppercase md:text-[clamp(20px,1.75vw,30px)]">
        Welcome to Alchemist Ways
      </p>
      <SocialIcons className="mt-10 md:mt-16" />
    </footer>
  );
}
