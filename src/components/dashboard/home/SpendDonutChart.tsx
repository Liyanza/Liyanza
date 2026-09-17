import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { spendBreakdown, spendTotal } from "@/data/dashboard";

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const channelIcons = {
  "Facebook Ads": { Icon: FaFacebook, bg: "bg-[#1877f2]" },
  "Instagram Ads": { Icon: FaInstagram, bg: "bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af]" },
  "WhatsApp Ads": { Icon: FaWhatsapp, bg: "bg-[#25d366]" },
} as const;

function withOffsets() {
  let cumulative = 0;
  return spendBreakdown.map((slice) => {
    const dash = (slice.share / 100) * CIRCUMFERENCE;
    const offset = cumulative;
    cumulative += dash;
    return { ...slice, dash, offset };
  });
}

export function SpendDonutChart() {
  const slices = withOffsets();

  return (
    <div className="flex h-full flex-col rounded-[5px] border border-border bg-white p-5">
      <h2 className="text-sm font-bold text-black">Répartition des dépenses</h2>
      <p className="mt-0.5 text-[11px] text-gray-text">Où va votre budget ce mois-ci.</p>

      <div className="mt-6 flex items-center gap-5">
        <div className="relative size-28 shrink-0">
          <svg viewBox="0 0 100 100" className="size-28 -rotate-90">
            {slices.map((slice) => (
              <circle
                key={slice.label}
                cx="50"
                cy="50"
                r={RADIUS}
                fill="none"
                stroke={slice.color}
                strokeWidth="14"
                strokeDasharray={`${slice.dash} ${CIRCUMFERENCE - slice.dash}`}
                strokeDashoffset={-slice.offset}
              />
            ))}
          </svg>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="text-[13px] font-bold leading-tight text-black">{spendTotal.amount}</p>
            <p className="text-[9px] font-medium text-gray-text-light">{spendTotal.currency}</p>
          </div>
        </div>
        <div className="flex-1 space-y-3">
          {spendBreakdown.map((slice) => {
            const meta = channelIcons[slice.label as keyof typeof channelIcons];
            return (
              <div key={slice.label} className="flex items-center gap-2.5">
                <span className={`flex size-6 shrink-0 items-center justify-center rounded-full text-white ${meta.bg}`}>
                  <meta.Icon className="size-3" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-black">{slice.label}</p>
                  <p className="text-[10px] text-gray-text-light">{slice.amount}</p>
                </div>
                <span className="shrink-0 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-500">
                  {slice.share}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex h-1.5 overflow-hidden rounded-full">
        {spendBreakdown.map((slice) => (
          <span key={slice.label} className="h-full" style={{ width: `${slice.share}%`, backgroundColor: slice.color }} />
        ))}
      </div>
    </div>
  );
}
