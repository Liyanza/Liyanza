import { ReactNode } from "react";

export function Badge({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-green-accent px-2 py-0.5 text-[10px] font-bold text-white ${className}`}
    >
      {children}
    </span>
  );
}

type EyebrowVariant = "pill" | "plain" | "line";
type EyebrowTone = "green" | "orange";

export function SectionEyebrow({
  children,
  variant = "plain",
  tone = "green",
  className = "",
}: {
  children: ReactNode;
  variant?: EyebrowVariant;
  tone?: EyebrowTone;
  className?: string;
}) {
  const textClasses =
    "text-xs font-bold uppercase tracking-[0.1em]";

  if (variant === "pill") {
    if (tone === "orange") {
      return (
        <span
          className={`inline-flex items-center rounded-full bg-orange-500/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase leading-[15px] tracking-[0.1em] text-orange-500 ${className}`}
        >
          {children}
        </span>
      );
    }
    return (
      <span
        className={`inline-flex items-center rounded-full bg-[#e8f5e9] px-4 py-1.5 ${textClasses} text-green-accent-dark ${className}`}
      >
        {children}
      </span>
    );
  }

  if (variant === "line") {
    return (
      <span className={`inline-flex items-center gap-2 ${className}`}>
        <span className="h-px w-6 bg-green-accent" aria-hidden="true" />
        <span className={`${textClasses} text-green-accent`}>{children}</span>
      </span>
    );
  }

  return <span className={`${textClasses} ${className}`}>{children}</span>;
}
