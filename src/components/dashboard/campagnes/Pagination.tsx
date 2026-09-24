"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useT } from "@/i18n/client";
import { fill } from "@/i18n/format";

export function Pagination({
  page,
  pageCount,
  total,
  pageSize,
  onChange,
}: {
  page: number;
  pageCount: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
}) {
  const t = useT("dashCampaigns").pagination;
  if (total === 0) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-full bg-dash-pill-bg/50 px-4 py-3">
      <p className="text-xs font-semibold text-dash-muted">
        {fill(t.summary, { start, end, total })}
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
          aria-label={t.previous}
          className="flex size-[38px] items-center justify-center rounded-full bg-[#e4ede7] text-dash-body disabled:opacity-40"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
        </button>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            aria-current={n === page ? "page" : undefined}
            onClick={() => onChange(n)}
            className={`flex size-[38px] items-center justify-center rounded-full text-xs font-semibold ${
              n === page ? "bg-green-accent-dark text-white" : "bg-[#e4ede7] text-black"
            }`}
          >
            {n}
          </button>
        ))}
        <button
          type="button"
          disabled={page === pageCount}
          onClick={() => onChange(page + 1)}
          aria-label={t.next}
          className="flex size-[38px] items-center justify-center rounded-full bg-[#e4ede7] text-dash-body disabled:opacity-40"
        >
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
