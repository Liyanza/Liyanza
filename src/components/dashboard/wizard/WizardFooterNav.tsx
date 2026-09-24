"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useT } from "@/i18n/client";

export function WizardFooterNav({
  onBack,
  onNext,
  nextLabel,
  nextDisabled = false,
  showBack = true,
}: {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  showBack?: boolean;
}) {
  const common = useT("dash").common;
  const t = useT("dashWizard");
  return (
    <div className="flex items-center justify-between py-6">
      {showBack ? (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 rounded-full bg-white px-6 py-3 text-sm font-medium text-dash-heading shadow-[0_1px_1px_rgba(0,0,0,0.05)]"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          {common.back}
        </button>
      ) : (
        <span />
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className="flex items-center gap-2 rounded-full bg-green-accent px-8 py-3 text-sm font-semibold text-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
      >
        {nextLabel ?? t.continue}
        <ArrowRight className="size-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}
