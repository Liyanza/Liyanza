import { ReactNode } from "react";

export function InfoCard({
  icon,
  iconBg,
  title,
  titleColor = "text-black",
  description,
}: {
  icon: ReactNode;
  iconBg: string;
  title: string;
  titleColor?: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border-light bg-white p-4">
      <div
        className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${iconBg}`}
      >
        {icon}
      </div>
      <div>
        <h3 className={`text-sm font-bold ${titleColor}`}>{title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-gray-text">
          {description}
        </p>
      </div>
    </div>
  );
}
