"use client";

import {
  BarChart3,
  CalendarClock,
  Lightbulb,
  MapPin,
  Megaphone,
  Palette,
  Radio,
  Users,
  Wallet,
} from "lucide-react";
import type { CampaignRecommendation } from "@/lib/api/types";
import { useT } from "@/i18n/client";

const PRIORITY_CLASS: Record<string, string> = {
  high: "bg-red-600/10 text-red-600",
  medium: "bg-orange-500/10 text-orange-500",
  low: "bg-slate-100 text-slate-500",
};

const PRIORITY_BAR: Record<string, string> = {
  high: "bg-red-500",
  medium: "bg-orange-400",
  low: "bg-slate-300",
};

const CATEGORY_ICON: Record<string, typeof Wallet> = {
  budget: Wallet,
  audience: Users,
  creative: Palette,
  channel: Megaphone,
  timing: CalendarClock,
  field: MapPin,
  radio: Radio,
  measurement: BarChart3,
};

/**
 * Une recommandation de campagne : l'action (titre), son explication, sa
 * priorité et sa catégorie. Les recommandations enregistrées avant l'IA
 * n'ont ni titre ni catégorie : seul le texte s'affiche alors.
 */
export function RecommendationCard({
  recommendation,
  compact = false,
}: {
  recommendation: CampaignRecommendation;
  compact?: boolean;
}) {
  const ti = useT("dashInsights");
  const t = ti.recommendations;
  const priority = recommendation.priority.toLowerCase();
  const priorityLabel = ti.priorities[priority as keyof typeof ti.priorities] ?? recommendation.priority;
  const category = recommendation.category ?? "";
  const categoryLabel = t.categories[category as keyof typeof t.categories];
  const Icon = CATEGORY_ICON[category] ?? Lightbulb;

  return (
    <article
      className={`relative overflow-hidden rounded-2xl border border-border bg-white ${compact ? "p-3.5 pl-4" : "p-5 pl-6"}`}
    >
      <span
        className={`absolute inset-y-0 left-0 w-1 ${PRIORITY_BAR[priority] ?? "bg-slate-300"}`}
        aria-hidden="true"
      />
      <div className="flex items-start gap-3">
        <span
          className={`flex shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 ${compact ? "size-7" : "size-9"}`}
        >
          <Icon className={compact ? "size-3.5" : "size-4"} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${PRIORITY_CLASS[priority] ?? PRIORITY_CLASS.low}`}>
              {priorityLabel}
            </span>
            {categoryLabel && (
              <span className="rounded-full bg-dash-pill-bg px-2 py-0.5 text-[10px] font-semibold text-dash-body">
                {categoryLabel}
              </span>
            )}
          </div>
          {recommendation.title && (
            <h3 className={`mt-1.5 font-semibold text-dash-heading ${compact ? "text-xs" : "text-sm"}`}>
              {recommendation.title}
            </h3>
          )}
          <p
            className={`mt-1 leading-relaxed text-dash-body ${compact ? "line-clamp-3 text-[11px]" : "text-sm"}`}
          >
            {recommendation.content}
          </p>
        </div>
      </div>
    </article>
  );
}
