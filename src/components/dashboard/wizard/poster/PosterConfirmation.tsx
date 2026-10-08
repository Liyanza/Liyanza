"use client";

import { useRouter } from "@/i18n/navigation";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { useT } from "@/i18n/client";
import { fill } from "@/i18n/format";

export function PosterConfirmation({
  campaignId,
  campaignName,
  created,
  requested,
}: {
  campaignId: string;
  campaignName: string;
  created: number;
  requested: number;
}) {
  const router = useRouter();
  const t = useT("dashWizard").poster.confirmation;

  return (
    <div className="mx-auto flex max-w-[620px] flex-col items-center px-5 pb-6 pt-8 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-green-accent-dark/10">
        <CheckCircle2 className="size-8 text-green-accent-dark" aria-hidden="true" />
      </span>
      <h2 className="mt-4 text-2xl font-bold text-dash-heading">{t.title}</h2>
      <p className="mt-1.5 text-sm text-dash-muted">{fill(t.text, { name: campaignName, count: created })}</p>

      {created < requested && (
        <div className="mt-4 flex w-full items-start gap-2 rounded-xl bg-orange-500/5 p-3.5 text-left text-xs text-orange-600">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>{fill(t.partial, { missing: requested - created })}</span>
        </div>
      )}

      <div className="mt-5 w-full rounded-2xl border border-border bg-white p-4 text-left text-xs leading-relaxed text-dash-body">
        {t.next}
      </div>

      <button
        type="button"
        onClick={() => router.push(`/dashboard/terrain?campagne=${campaignId}`)}
        className="mt-6 w-full rounded-full bg-green-accent px-6 py-3.5 text-sm font-semibold text-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]"
      >
        {t.field}
      </button>
      <button
        type="button"
        onClick={() => router.push("/dashboard/campagnes")}
        className="mt-3 w-full rounded-full bg-dash-pill-bg px-6 py-3.5 text-sm font-semibold text-dash-heading"
      >
        {t.campaigns}
      </button>
    </div>
  );
}
