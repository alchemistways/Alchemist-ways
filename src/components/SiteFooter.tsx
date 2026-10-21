import { SocialIcons } from "./SocialIcons";

export function SiteFooter() {
  return (
    <footer className="relative bg-white pt-14 pb-10 text-center md:pt-[clamp(56px,5vw,96px)] md:pb-14">
      <p className="font-mono text-[15px] tracking-[0.16em] text-ink uppercase md:text-[clamp(15px,1.1vw,20px)]">
        Alchemist Ways
      </p>
      <SocialIcons className="mt-6 md:mt-8" />
      <p className="mt-6 text-[13px] tracking-[0.04em] text-[#6f6a66] md:mt-8 md:text-[clamp(13px,0.9vw,16px)]">
        {/* Not linked for now (Saad will edit the policy page first). */}
        <span>Privacy Policy</span>
      </p>
    </footer>
  );
}
