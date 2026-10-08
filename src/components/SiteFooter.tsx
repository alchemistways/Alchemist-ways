import { SocialIcons } from "./SocialIcons";

export function SiteFooter() {
  return (
    <footer className="relative bg-white pt-14 pb-10 text-center md:pt-[clamp(56px,5vw,96px)] md:pb-14">
      <p className="font-mono text-[15px] tracking-[0.16em] text-ink uppercase md:text-[clamp(15px,1.1vw,20px)]">
        Alchemist Ways
      </p>
      <SocialIcons className="mt-6 md:mt-8" />
    </footer>
  );
}
