import { ReactNode } from "react";
import Image from "next/image";

function FloatingStat({
  label,
  value,
  valueClassName = "text-zinc-950",
  className = "",
  children,
}: {
  label: string;
  value?: string;
  valueClassName?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`absolute flex flex-col whitespace-nowrap rounded-xl border-[3px] border-border-light bg-white px-3 py-2 shadow-lg ${className}`}
    >
      <p className="text-[10px] leading-[15px] text-gray-text-light">{label}</p>
      {children ?? <p className={`text-sm font-bold leading-5 ${valueClassName}`}>{value}</p>}
    </div>
  );
}

function StatLine({ children }: { children: ReactNode }) {
  return <p className="text-[11px] font-semibold leading-[16.5px] text-black">{children}</p>;
}

export function BrandVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[514px]">
      <Image
        src="/auth-photo.png"
        alt="Une professionnelle du marketing souriante, assise en tailleur avec son ordinateur portable"
        width={1024}
        height={1024}
        className="relative h-auto w-full object-contain"
      />

      <FloatingStat
        label="ROI"
        value="320%"
        valueClassName="text-orange-500"
        className="left-[9.7%] top-[18.3%]"
      />
      <FloatingStat label="Répartition du budget" className="left-[72.6%] top-[25.3%]">
        <StatLine>WhatsApp 60%</StatLine>
        <StatLine>Facebook 40%</StatLine>
      </FloatingStat>
      <FloatingStat
        label="Conversions"
        value="+28%"
        valueClassName="text-green-accent"
        className="left-[85.4%] top-[59.8%]"
      />
      <FloatingStat label="Meilleure audience" className="left-[2.3%] top-[53.4%]">
        <StatLine>25 – 45 ans</StatLine>
      </FloatingStat>
    </div>
  );
}
