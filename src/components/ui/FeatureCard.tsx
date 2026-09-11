import { ReactNode } from "react";

export function FeatureCard({
  icon,
  iconBg,
  number,
  numberColor,
  title,
  description,
  children,
}: {
  icon: ReactNode;
  iconBg: string;
  number: string;
  numberColor: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border-light bg-white p-5 shadow-[0_2px_12px_-2px_rgba(0,200,83,0.07)]">
      <div className="flex items-center justify-between">
        <div
          className={`flex size-10 items-center justify-center rounded-full ${iconBg}`}
        >
          {icon}
        </div>
        <span className={`text-xs font-bold ${numberColor}`}>{number}</span>
      </div>
      <h3 className="mt-4 text-sm font-bold text-black">{title}</h3>
      <p className="mt-1.5 text-xs leading-[1.6] text-gray-text">
        {description}
      </p>
      <div className="mt-4 flex-1">{children}</div>
    </div>
  );
}

export function SocialIconCircle({ children }: { children: ReactNode }) {
  return (
    <span className="flex size-6 items-center justify-center rounded-full bg-border-light text-sm">
      {children}
    </span>
  );
}
