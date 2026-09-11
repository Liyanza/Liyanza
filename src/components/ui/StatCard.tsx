import { ReactNode } from "react";

export function StatCard({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`absolute w-max rounded-xl border border-border-light bg-white px-3 py-2 shadow-[0_6px_15px_-4px_rgba(0,0,0,0.15)] ${className}`}
    >
      <p className="text-[10px] text-gray-text-light">{label}</p>
      <div className="mt-0.5 text-xs font-semibold text-black">{children}</div>
    </div>
  );
}
