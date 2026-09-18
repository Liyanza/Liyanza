import { FaFacebook, FaInstagram } from "react-icons/fa6";
import type { DigitalSimulationChannelResult } from "@/lib/api/types";

const PLATFORM_META: Record<string, { label: string; Icon: typeof FaFacebook; iconClassName: string }> = {
  FACEBOOK: { label: "Facebook Ads", Icon: FaFacebook, iconClassName: "text-[#1877f2]" },
  INSTAGRAM: { label: "Instagram Ads", Icon: FaInstagram, iconClassName: "text-[#e1306c]" },
};

function ChannelCard({ channel }: { channel: DigitalSimulationChannelResult }) {
  const meta = PLATFORM_META[channel.platform];
  const Icon = meta?.Icon;

  return (
    <div className="rounded-2xl border-2 border-border-light bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-dash-canvas">
            {Icon && <Icon className={`size-4.5 ${meta.iconClassName}`} aria-hidden="true" />}
          </span>
          <div>
            <p className="text-sm font-semibold text-dash-heading">{meta?.label ?? channel.platform}</p>
            <p className="text-[11px] text-dash-muted">{Math.round(channel.budgetAmount).toLocaleString("fr-FR")} FCFA</p>
          </div>
        </div>
        <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-[11.5px] font-bold text-blue-500">
          {channel.budgetPercent}%
        </span>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-1">
        {[
          { label: "Portée", value: channel.predictedReach },
          { label: "Clics", value: channel.predictedClicks },
          { label: "Conv.", value: channel.predictedConversions },
          { label: "ROI", value: `${channel.predictedRoas}x` },
        ].map((metric) => (
          <div key={metric.label} className="text-center">
            <p className="text-sm font-bold text-dash-heading">
              {typeof metric.value === "number" ? metric.value.toLocaleString("fr-FR") : metric.value}
            </p>
            <p className="text-[10px] text-dash-muted">{metric.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CanauxTab({ channels }: { channels: DigitalSimulationChannelResult[] }) {
  if (channels.length === 0) {
    return (
      <p className="rounded-xl border border-border-light bg-white p-6 text-center text-sm text-dash-muted">
        Aucun canal sélectionné pour cette simulation.
      </p>
    );
  }

  return (
    <div>
      <h3 className="mb-4 text-center text-sm font-semibold text-dash-heading">Répartition par canal</h3>
      <div className="mx-auto flex max-w-xl flex-col gap-3">
        {channels.map((channel) => (
          <ChannelCard key={channel.platform} channel={channel} />
        ))}
      </div>
    </div>
  );
}
