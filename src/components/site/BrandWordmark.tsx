import logo from "@/assets/alchemist-ways-logo.webp";

export default function BrandWordmark({ className = "" }: { className?: string }) {
  return (
    <div className={`w-fit max-w-full ${className}`}>
      <img
        src={logo}
        alt="Alchemist Ways"
        width={1434}
        height={99}
        className="block h-full w-auto max-w-full object-contain"
      />
    </div>
  );
}

