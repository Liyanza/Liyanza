import { CountUp } from "@/components/motion/CountUp";
import { ArrowRight, CheckCircle2, Target } from "lucide-react";
import { FaFacebook, FaWhatsapp } from "react-icons/fa6";
import { getMessages } from "@/i18n/server";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div data-live="item">
      <p className="text-xs font-semibold text-gray-text">{label}</p>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

export async function CampaignFormMockup() {
  const t = (await getMessages("features")).mockups.form;

  return (
    <div className="w-full max-w-[420px] overflow-hidden rounded-2xl border border-border-light bg-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.1)]">
      <div className="bg-gradient-to-r from-blue-500 to-[#3b82f6] px-5 py-3">
        <p className="text-sm font-bold text-white">{t.title}</p>
      </div>

      <div className="space-y-4 p-5">
        <Field label={t.objective}>
          <div className="flex items-center justify-between rounded-xl border border-green-accent bg-[#e8f5e9] px-3.5 py-2.5">
            <span className="flex items-center gap-2 text-sm font-semibold text-green-accent-dark">
              <Target className="size-3.5 text-red-500" aria-hidden="true" />
              {t.objectiveValue}
            </span>
            <CheckCircle2 data-live="badge" className="size-4 text-green-accent" aria-hidden="true" />
          </div>
        </Field>

        <Field label={t.budget}>
          <div className="flex items-center justify-between rounded-xl border border-border bg-slate-50 px-3.5 py-2.5">
            <CountUp value={t.budgetValue} className="text-sm font-bold text-navy" />
            <span className="text-xs text-gray-text-light">{t.perCampaign}</span>
          </div>
        </Field>

        <Field label={t.audience}>
          <div className="rounded-xl border border-border bg-slate-50 px-3.5 py-2.5">
            <span className="text-sm font-medium text-black">
              {t.audienceValue}
            </span>
          </div>
        </Field>

        <Field label={t.channels}>
          <div className="flex gap-2">
            <span className="flex items-center gap-1.5 rounded-full border-2 border-[#1877f2] px-3 py-1.5 text-xs font-semibold text-[#1877f2]">
              <FaFacebook aria-hidden="true" />
              Facebook Ads
            </span>
            <span className="flex items-center gap-1.5 rounded-full border-2 border-[#25d366] px-3 py-1.5 text-xs font-semibold text-[#25d366]">
              <FaWhatsapp aria-hidden="true" />
              WhatsApp Ads
            </span>
          </div>
        </Field>

        <Field label={t.period}>
          <div className="flex items-center justify-between rounded-xl border border-border bg-slate-50 px-3.5 py-2.5">
            <span className="text-xs text-[#4a5565]">
              {t.periodValue}
            </span>
            <span className="text-xs font-semibold text-green-accent">
              {t.periodDays}
            </span>
          </div>
        </Field>

        <button
          type="button"
          data-live="item"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-green-600 py-3 text-sm font-bold text-white"
        >
          {t.continue}
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
