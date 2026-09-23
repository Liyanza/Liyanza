import type { ReactNode } from "react";

/** Grey placeholder block with a light shimmer (see .skeleton in globals.css). */
export function Skeleton({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`skeleton rounded-md bg-dash-track/70 ${className}`} />;
}

/**
 * With a `label`, wraps skeletons in a polite live region so screen readers
 * still hear the loading message sighted users now see as placeholders.
 * Without one it is purely decorative — give a label to exactly one
 * skeleton per loading area, so the message is announced once.
 */
export function LoadingState({
  label,
  className = "",
  children,
}: {
  label?: string;
  className?: string;
  children: ReactNode;
}) {
  if (!label) {
    return (
      <div aria-hidden="true" className={className}>
        {children}
      </div>
    );
  }
  return (
    <div role="status" aria-live="polite" className={className}>
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
}

/** Placeholder for a list or table: `rows` lines with an avatar-like dot. */
export function SkeletonRows({ rows = 4, label }: { rows?: number; label?: string }) {
  return (
    <LoadingState label={label} className="flex flex-col gap-4 px-5 py-6">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="size-8 shrink-0 rounded-full" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-3 w-2/5" />
            <Skeleton className="h-2.5 w-3/5" />
          </div>
        </div>
      ))}
    </LoadingState>
  );
}

/** Placeholder for a content panel: a title line and a few text lines. */
export function SkeletonPanel({ lines = 3, label }: { lines?: number; label?: string }) {
  return (
    <LoadingState label={label} className="flex flex-col gap-3 rounded-[5px] border border-border bg-white p-5">
      <Skeleton className="h-4 w-1/3" />
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton key={i} className={`h-3 ${i === lines - 1 ? "w-2/3" : "w-full"}`} />
      ))}
    </LoadingState>
  );
}

/**
 * Placeholder for a row of KPI cards. Defaults match CampaignKpiRow (5 cards);
 * pass the real grid classes elsewhere so nothing shifts when data arrives.
 */
export function SkeletonKpis({
  count = 5,
  label,
  className = "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5",
}: {
  count?: number;
  label?: string;
  className?: string;
}) {
  return (
    <LoadingState label={label} className={className}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="flex flex-col gap-3 rounded-[5px] border border-border bg-white p-5">
          <div className="flex items-start justify-between">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="size-9 rounded-full" />
          </div>
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      ))}
    </LoadingState>
  );
}
