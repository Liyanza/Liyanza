import { CountUp } from "@/components/motion/CountUp";
import { getMessages } from "@/i18n/server";
import { fill } from "@/i18n/format";

interface ChannelStat {
  name: string;
  roas: string;
  progress: number;
}

const channels: ChannelStat[] = [
  { name: "Facebook", roas: "ROAS 3.2×", progress: 65 },
  { name: "Instagram", roas: "ROAS 4.1×", progress: 82 },
  { name: "WhatsApp", roas: "ROAS 4.8×", progress: 96 },
];

/** Pictogramme et ton de chaque activité (textes : home.mockups.monitoring). */
const activityStyles = [
  { icon: "▲", tone: "alert" },
  { icon: "✓", tone: "success" },
  { icon: "✦", tone: "info" },
] as const;

export async function ChannelMonitoringMockup() {
  const t = (await getMessages("home")).mockups.monitoring;
  const activities = t.activities.map((a, i) => ({ ...a, ...activityStyles[i] }));

  return (
    <div className="w-full max-w-[500px] overflow-hidden rounded-[5px] border border-white bg-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.1)]">
      <div className="border-b border-zinc-200 px-5 py-4">
        <p className="text-xs font-bold text-zinc-900">{t.title}</p>
      </div>

      <div className="space-y-4 p-5">
        {channels.map((channel) => (
          <div key={channel.name} data-live="item">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold text-zinc-900">{channel.name}</p>
              <p className="text-[9px] font-bold text-blue-500">
                <CountUp value={channel.roas} />
              </p>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-zinc-200">
              <div
                data-live="fill"
                className="h-full rounded-full bg-blue-500"
                style={{ width: `${channel.progress}%` }}
              />
            </div>
            <p className="mt-0.5 text-[8px] text-gray-text">
              <CountUp value={fill(t.percent, { value: channel.progress })} /> {t.ofGoal}
            </p>
          </div>
        ))}

        <div className="space-y-2 border-t border-zinc-100 pt-4">
          {activities.map((activity) => (
            <div
              key={activity.text}
              data-live="item"
              className={`flex items-center gap-2.5 rounded-[5px] border p-2.5 ${
                activity.tone === "alert"
                  ? "border-orange-500/20 bg-orange-500/[0.04]"
                  : "border-zinc-200 bg-white"
              }`}
            >
              <span
                className={`shrink-0 text-xs ${
                  activity.tone === "alert"
                    ? "text-orange-500"
                    : activity.tone === "info"
                      ? "text-orange-500"
                      : "text-zinc-600"
                }`}
                aria-hidden="true"
              >
                {activity.icon}
              </span>
              <p className="flex-1 text-[9px] font-medium text-zinc-900">{activity.text}</p>
              <p className="shrink-0 text-[8px] text-gray-text">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
