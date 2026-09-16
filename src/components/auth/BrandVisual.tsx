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
      className={`absolute flex flex-col gap-1 whitespace-nowrap rounded-xl border border-zinc-100 bg-white px-3 py-2 shadow-[0_4px_16px_-2px_rgba(13,31,60,0.25)] ${className}`}
    >
      <p className="text-[10px] text-gray-text-light">{label}</p>
      {children ?? <p className={`text-sm font-bold ${valueClassName}`}>{value}</p>}
    </div>
  );
}

export function BrandVisual() {
  return (
    <div className="relative mx-auto mt-10 w-[85%]">
      <Image
        src="/auth-photo.png"
        alt="Une professionnelle du marketing souriante et détendue, avec son ordinateur portable"
        width={1028}
        height={1026}
        className="relative h-auto w-full object-contain"
      />

      <FloatingStat
        label="ROI"
        value="320%"
        valueClassName="text-orange-500"
        className="left-[10%] top-[18%]"
      />
      <FloatingStat label="Répartition du budget" className="left-[68%] top-[25%]">
        <p className="text-[11px] font-semibold text-zinc-950">WhatsApp 60%</p>
        <p className="text-[11px] font-semibold text-zinc-950">Facebook 40%</p>
      </FloatingStat>
      <FloatingStat
        label="Conversions"
        value="+28%"
        valueClassName="text-green-accent"
        className="left-[80%] top-[60%]"
      />
      <FloatingStat
        label="Meilleure audience"
        value="25 – 45 ans"
        className="left-[2%] top-[53%]"
      />
    </div>
  );
}
