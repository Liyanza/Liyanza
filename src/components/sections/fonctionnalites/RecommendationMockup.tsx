import { CountUp } from "@/components/motion/CountUp";
import { getMessages } from "@/i18n/server";

/** Couleur et animation de chaque indicateur (textes : features.mockups.recommendation). */
const statStyles = [
  { color: "text-green-accent", count: true },
  { color: "text-blue-500", count: true },
  { color: "text-orange-accent", count: false },
];

export async function RecommendationMockup() {
  const t = (await getMessages("features")).mockups.recommendation;
  const stats = t.stats.map((s, i) => ({ ...s, ...statStyles[i] }));

  return (
    <div className="w-full max-w-[384px] overflow-hidden rounded-2xl border border-border-light bg-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-3 border border-[#b2dfdb] bg-gradient-to-r from-[#e8f5e9] to-[#e0f7fa] px-5 py-4">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-500 text-base text-white">
          ✦
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.05em] text-blue-500">
            {t.title}
          </p>
          <p className="text-[10px] text-gray-text-light">
            {t.meta}
          </p>
        </div>
        <span
          data-live="badge"
          className="shrink-0 rounded-full border-2 border-blue-500 px-2 py-1 text-[10px] font-bold text-white bg-blue-500"
        >
          {t.badge}
        </span>
      </div>

      <div className="p-5">
        <p className="text-sm font-semibold leading-snug text-black">
          {t.headline}
        </p>
        <p className="mt-3 text-xs leading-relaxed text-gray-text">
          {t.detail}
        </p>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {stats.map((stat) => (
            <div
              key={stat.label}
              data-live="item"
              className="rounded-xl border border-border-light bg-white p-2.5 text-center shadow-[0_2px_12px_-2px_rgba(0,0,0,0.07)]"
            >
              <p className={`text-base font-extrabold ${stat.color}`}>
                {stat.count ? <CountUp value={stat.value} /> : stat.value}
              </p>
              <p className="mt-1 text-[9px] leading-tight text-gray-text-light">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <button
          type="button"
          data-live="item"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-accent to-green-accent-dark py-3 text-sm font-bold text-white shadow-[0_4px_12px_-2px_rgba(0,200,83,0.3)]"
        >
          {t.apply}
        </button>
        <a
          href="#"
          className="mt-3 block text-center text-xs font-semibold text-gray-text"
        >
          {t.details}
        </a>
      </div>
    </div>
  );
}
