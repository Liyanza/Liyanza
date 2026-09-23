import type { ReactNode } from "react";
import { CountUp } from "@/components/motion/CountUp";
import { intro } from "@/lib/motion/tokens";

/**
 * White stat card floating over hero illustrations (landing hero, auth
 * panel). Pass the display classes (`flex`, `hidden sm:flex`…) and position
 * through `className`. `index` is the card's landing order in the HeroIntro
 * sequence, so its figure starts rolling up exactly when it lands.
 */
export function FloatingStat({
  label,
  value,
  valueClassName = "text-zinc-950",
  className = "",
  index = 0,
  children,
}: {
  label: string;
  value?: string;
  valueClassName?: string;
  className?: string;
  index?: number;
  children?: ReactNode;
}) {
  const countDelayMs = (intro.statsAt + index * intro.statStagger) * 1000;

  return (
    <div
      data-intro="stat"
      className={`absolute flex-col whitespace-nowrap rounded-xl border-[3px] border-border-light bg-white px-3 py-2 shadow-lg ${className}`}
    >
      <p className="text-[10px] leading-[15px] text-gray-text-light">{label}</p>
      {children ?? (
        <p className={`text-sm font-bold leading-5 ${valueClassName}`}>
          {value && <CountUp value={value} delayMs={countDelayMs} />}
        </p>
      )}
    </div>
  );
}

export function StatLine({ children }: { children: ReactNode }) {
  return <p className="text-[11px] font-semibold leading-[16.5px] text-black">{children}</p>;
}
