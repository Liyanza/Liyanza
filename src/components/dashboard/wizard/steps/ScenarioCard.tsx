import type { ScenarioResult } from "@/data/dashboard";
import { ProgressBar } from "@/components/dashboard/ui/ProgressBar";

const metrics = [
  { key: "reach" as const, label: "Portée" },
  { key: "clicks" as const, label: "Clics" },
  { key: "conversions" as const, label: "Conv." },
  { key: "roi" as const, label: "ROI" },
];

export function ScenarioCard({ scenario, highlighted = false }: { scenario: ScenarioResult; highlighted?: boolean }) {
  return (
    <div
      className={`rounded-2xl p-3.5 ${
        highlighted ? "border-2 border-[#5489de] bg-white shadow-[0_2px_6px_rgba(41,107,214,0.07)]" : "bg-white shadow-[0_2px_6px_rgba(0,0,0,0.07)]"
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-900">{scenario.label}</p>
        {scenario.tag ? (
          <span className="rounded-full bg-blue-500 px-2.5 py-0.5 text-[10px] font-bold text-white">{scenario.tag}</span>
        ) : (
          <span className="text-[11px] font-medium text-gray-text-light">Score {scenario.score}/100</span>
        )}
      </div>

      {highlighted ? (
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#d4e1f7]">
              <span className="text-base">★</span>
            </span>
            <div>
              <p className="text-[15px] font-bold text-gray-900">{scenario.label}</p>
              <p className="text-xs text-gray-text-light">{scenario.description}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-text-light">Score global</p>
            <p className="text-2xl font-black text-gray-900">
              {scenario.score}
              <span className="text-sm font-semibold text-gray-text-light">/100</span>
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-2">
          <ProgressBar value={scenario.score} barClassName="bg-blue-500" trackClassName="bg-slate-200" height="h-1.5" />
        </div>
      )}

      <div className="mt-3 grid grid-cols-4 gap-1">
        {metrics.map((metric) => (
          <div key={metric.key} className="text-center">
            <p className="text-[13px] font-bold text-gray-900">{scenario[metric.key]}</p>
            <p className="text-[9.5px] text-gray-text-light">{metric.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
