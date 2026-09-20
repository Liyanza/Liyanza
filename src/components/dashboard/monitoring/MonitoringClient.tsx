"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { TopBar } from "@/components/dashboard/layout/TopBar";
import { MonitoringTabs } from "./MonitoringTabs";
import { OverviewTab } from "./OverviewTab";
import { DiffusionsTab } from "./DiffusionsTab";
import { PlanningTab } from "./PlanningTab";
import { RapportsTab } from "./RapportsTab";
import { ComingSoonTab } from "./ComingSoonTab";
import { apiListCampagnes, ApiError } from "@/lib/api/client";
import type { CampagneRecord } from "@/lib/api/types";

const TAB_LABELS: Record<string, string> = {
  alertes: "Alertes",
  analyses: "Analyses",
  recommandation: "Recommandation",
  annulees: "Annulées",
};

// Le pipeline Canaux/Diffusions (AdvertisingChannel/Broadcast) qui alimente
// ce module n'existe que pour les campagnes RADIO/POSTER, jamais DIGITAL —
// voir CampagnesService.validateCampaignComplete côté backend. Seul RADIO
// est réellement produit par l'assistant de création à ce stade (Affichage
// reste désactivé, voir StepType).
export function MonitoringClient() {
  const [campaigns, setCampaigns] = useState<CampagneRecord[]>([]);
  const [campaignsLoading, setCampaignsLoading] = useState(true);
  const [campaignsError, setCampaignsError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    apiListCampagnes({ type: "RADIO", limit: 100 }).then(
      (result) => {
        setCampaigns(result.items);
        if (result.items.length > 0) setSelectedId(result.items[0].id);
        setCampaignsLoading(false);
      },
      (error: unknown) => {
        setCampaignsError(error instanceof ApiError ? error.message : "Impossible de charger vos campagnes radio.");
        setCampaignsLoading(false);
      }
    );
  }, []);

  return (
    <>
      <TopBar title="Monitoring" searchPlaceholder="Rechercher une diffusions..." />
      <main className="flex-1 overflow-y-auto bg-dash-canvas">
        <div className="mx-auto flex max-w-[1295px] flex-col gap-5 px-8 py-6">
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3px] text-dash-muted">
              Campagne radio
            </span>
            <span className="relative max-w-[420px]">
              <select
                value={selectedId}
                onChange={(event) => setSelectedId(event.target.value)}
                disabled={campaignsLoading || campaigns.length === 0}
                className="w-full appearance-none rounded-full border border-border bg-white px-5 py-3 text-sm font-medium text-dash-heading outline-none disabled:opacity-50"
              >
                {campaignsLoading ? (
                  <option value="">Chargement des campagnes...</option>
                ) : campaigns.length === 0 ? (
                  <option value="">Aucune campagne radio</option>
                ) : (
                  campaigns.map((campaign) => (
                    <option key={campaign.id} value={campaign.id}>
                      {campaign.name}
                    </option>
                  ))
                )}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-dash-muted" aria-hidden="true" />
            </span>
          </label>

          {campaignsError && (
            <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">{campaignsError}</p>
          )}

          {!campaignsLoading && !campaignsError && campaigns.length === 0 ? (
            <p className="rounded-xl border border-border-light bg-white p-10 text-center text-sm text-dash-muted">
              Aucune campagne radio pour le moment. Créez-en une depuis Campagnes pour suivre sa diffusion ici.
            </p>
          ) : (
            selectedId && (
              <>
                <MonitoringTabs active={activeTab} onChange={setActiveTab} />

                {activeTab === "overview" && <OverviewTab key={selectedId} campaignId={selectedId} />}
                {activeTab === "diffusions" && <DiffusionsTab key={selectedId} campaignId={selectedId} />}
                {activeTab === "planning" && <PlanningTab key={selectedId} campaignId={selectedId} />}
                {activeTab === "rapports" && <RapportsTab key={selectedId} campaignId={selectedId} />}
                {activeTab in TAB_LABELS && <ComingSoonTab label={TAB_LABELS[activeTab]} />}
              </>
            )
          )}
        </div>
      </main>
    </>
  );
}
