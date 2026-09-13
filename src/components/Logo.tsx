import Image from "next/image";

export function Logo({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const word = variant === "dark" ? "text-white" : "text-black";

  return (
    <div className={`relative aspect-[165/55.67] h-16 ${className}`}>
      <Image
        src="/kiyanza-logo-mark.svg"
        alt="Logo KIYANZA"
        width={85}
        height={56}
        className="absolute left-0 top-0 h-full w-auto"
        priority
      />
      <span
        className={`absolute left-[45.5%] top-[37.7%] whitespace-nowrap text-2xl font-extrabold leading-none tracking-[-0.02em] ${word}`}
      >
        KIYANZA
      </span>
      <span className="absolute left-[52%] top-[77.5%] whitespace-nowrap text-[9px] font-medium leading-none text-green-accent">
        Light your future
      </span>
    </div>
  );
}
