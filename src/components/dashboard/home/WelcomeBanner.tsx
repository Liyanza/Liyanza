"use client";

import { Plus, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useT } from "@/i18n/client";

export function WelcomeBanner() {
  const { user } = useAuth();
  const t = useT("dash").home;
  const firstName = user?.firstName ?? user?.email?.split("@")[0] ?? "";

  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-extrabold text-black">
          {t.hello}{firstName ? `, ${firstName}` : ""}
        </h1>
        <p className="mt-1 text-sm text-gray-text">{t.subtitle}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-orange-500">
          <TrendingUp className="size-3.5" aria-hidden="true" />
          {t.trend}
        </span>
      </div>
      <Button variant="cta" size="md" icon={<Plus className="size-4" aria-hidden="true" />} iconPosition="left">
        {t.newCampaign}
      </Button>
    </div>
  );
}
