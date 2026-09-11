import Image from "next/image";

export function Logo({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const tagline = variant === "dark" ? "text-[#8fa3bd]" : "text-gray-text";
  const word = variant === "dark" ? "text-white" : "text-black";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src="/kiyanza-logo-mark.svg"
        alt="Logo KIYANZA"
        width={38}
        height={25}
        className="h-auto w-9"
        priority
      />
      <div className="flex flex-col justify-center">
        <span
          className={`text-xl font-extrabold leading-tight tracking-[-0.02em] ${word}`}
        >
          KIYANZA
        </span>
        <span className={`text-[10px] font-medium leading-tight ${tagline}`}>
          Light your future
        </span>
      </div>
    </div>
  );
}
