import logo from "@/assets/alchemist-ways-logo.png";

export default function BrandWordmark({ className = "" }: { className?: string }) {
  return (
    <div className={`w-fit ${className}`}>
      <img
        src={logo}
        alt="Alchemist Ways"
        width={1434}
        height={99}
        className="block h-full w-auto object-contain"
      />
    </div>
  );
}

