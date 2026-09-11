import { ReactNode } from "react";

export function ProcessStepCard({
  icon,
  number,
  numberColor,
  title,
  description,
}: {
  icon: ReactNode;
  number: string;
  numberColor: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-border-light bg-white p-4 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.07)]">
      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-lg bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.1)]">
          {icon}
        </div>
        <span className={`text-xs font-bold ${numberColor}`}>{number}</span>
      </div>
      <h3 className="mt-3 text-sm font-bold text-black">{title}</h3>
      <p className="mt-1 text-xs leading-[1.6] text-gray-text">
        {description}
      </p>
    </div>
  );
}
