import { ReactNode } from "react";

export function KpiCard({
  label,
  value,
  icon,
  iconBg,
  footer,
  className = "",
}: {
  label: string;
  value: string;
  icon: ReactNode;
  iconBg: string;
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col rounded-[5px] border border-border bg-white px-5 pt-5 ${className}`}>
      <div className="flex items-start justify-between pb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3px] text-gray-text">{label}</p>
        <div className={`flex size-9 shrink-0 items-center justify-center rounded-full ${iconBg}`}>{icon}</div>
      </div>
      <p className="pb-2 text-[28px] font-extrabold tracking-[-0.84px] text-gray-900">{value}</p>
      {footer && <div className="flex items-center gap-1.5 pb-3">{footer}</div>}
    </div>
  );
}

export function DeltaTag({
  children,
  tone = "positive",
}: {
  children: ReactNode;
  tone?: "positive" | "negative" | "neutral";
}) {
  const styles = {
    positive: "bg-green-accent-dark/10 text-green-accent-dark",
    negative: "bg-red-600/10 text-red-600",
    neutral: "bg-green-accent-dark/10 text-green-accent-dark",
  } as const;

  return (
    <span className={`rounded px-1.5 py-0.5 text-[11px] font-bold ${styles[tone]}`}>{children}</span>
  );
}
