import { CountUp } from "@/components/motion/CountUp";
import { getMessages } from "@/i18n/server";

export async function ReportMockup() {
  const t = (await getMessages("features")).mockups.report;
  const stats = t.stats;

  return (
    <div className="w-full max-w-[384px] overflow-hidden rounded-2xl border border-border-light bg-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between border-b border-border-light px-5 py-4">
        <div>
          <p className="text-sm font-bold text-navy">{t.title}</p>
          <p className="text-[10px] text-gray-text-light">
            {t.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            data-live="badge"
            className="rounded-full bg-blue-500 px-2.5 py-1 text-xs font-bold text-white"
          >
            +24%
          </span>
          <span className="rounded-full border-2 border-green-accent px-2.5 py-1 text-xs font-medium text-green-accent">
            PDF ↓
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-3 gap-2">
          {stats.map((stat) => (
            <div
              key={stat.label}
              data-live="item"
              className="rounded-xl border border-border-light bg-white p-2.5 text-center shadow-[0_2px_12px_-2px_rgba(0,0,0,0.07)]"
            >
              <p className="text-sm font-bold text-navy">
                <CountUp value={stat.value} />
              </p>
              <p className="mt-0.5 text-[8px] leading-tight text-gray-text-light">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl bg-slate-50 p-3">
          <svg
            viewBox="0 0 313 48"
            className="h-12 w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon
              data-live="area"
              points="0,48 0,38 60,30 120,32 189,14 250,20 313,4 313,48"
              fill="#296bd6"
              opacity="0.15"
            />
            <polyline
              data-live="draw"
              points="0,38 60,30 120,32 189,14 250,20 313,4"
              fill="none"
              stroke="#296bd6"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            className="flex-1 rounded-full border-2 border-green-accent py-2.5 text-xs font-semibold text-green-accent"
          >
            {t.export}
          </button>
          <button
            type="button"
            className="flex-1 rounded-full bg-green-accent py-2.5 text-xs font-semibold text-white"
          >
            {t.share}
          </button>
        </div>
      </div>
    </div>
  );
}
