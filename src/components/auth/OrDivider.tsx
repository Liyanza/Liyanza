"use client";

import { useT } from "@/i18n/client";

export function OrDivider() {
  const t = useT("auth");

  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 bg-[#e4e4e7]" />
      <span className="text-xs font-medium text-[#a1a1aa]">{t.common.or}</span>
      <span className="h-px flex-1 bg-[#e4e4e7]" />
    </div>
  );
}
