import { Download, Radio, BarChart3, Sparkles, Target, Users, Headphones, Activity, ShieldCheck } from "lucide-react";
import { campaignReport, reportRecommendations } from "@/data/monitoring";

export function RapportsTab() {
  const report = campaignReport;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-dash-heading">Rapport de campagne</h2>
          <p className="mt-0.5 text-sm text-dash-muted">Résumé complet de la campagne avec les résultats et recommandations.</p>
        </div>
        <button type="button" className="flex items-center gap-2 rounded-full bg-green-accent px-4 py-2.5 text-sm font-semibold text-white">
          <Download className="size-4" aria-hidden="true" />
          Télécharger le rapport PDF
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-5">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-full bg-green-accent-dark/10">
              <Radio className="size-4 text-green-accent-dark" aria-hidden="true" />
            </span>
            <h3 className="text-sm font-semibold text-dash-heading">{report.campaignName}</h3>
          </div>
          <dl className="flex flex-col gap-2.5 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-dash-muted">Objectif :</dt>
              <dd className="flex items-center gap-1.5 font-semibold text-dash-heading">
                <span className="size-1.5 rounded-full bg-green-accent-dark" /> {report.objective}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-dash-muted">Radio :</dt>
              <dd className="font-semibold text-dash-heading">{report.radio}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-dash-muted">Zone :</dt>
              <dd className="font-semibold text-dash-heading">{report.zone}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-dash-muted">Période :</dt>
              <dd className="font-semibold text-dash-heading">{report.period}</dd>
            </div>
          </dl>
          <div className="mt-2 flex items-center gap-1.5 border-t border-border-light pt-3 text-xs font-medium text-green-accent-dark">
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            Données certifiées conformes
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-5">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-1.5 text-sm font-semibold text-orange-600">
              <BarChart3 className="size-4" aria-hidden="true" />
              Résultats estimés
            </h3>
            <span className="text-[11px] text-dash-muted">Période en cours</span>
          </div>
          <dl className="flex flex-col gap-2.5 text-sm">
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1.5 text-dash-muted"><Users className="size-3.5" aria-hidden="true" /> Portée estimée</dt>
              <dd className="font-bold text-dash-heading">{report.reachEstimate}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1.5 text-dash-muted"><Target className="size-3.5" aria-hidden="true" /> Conversions estimées</dt>
              <dd className="font-bold text-dash-heading">{report.conversionsEstimate}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1.5 text-dash-muted"><Activity className="size-3.5" aria-hidden="true" /> ROI estimé</dt>
              <dd className="font-bold text-green-accent-dark">{report.roiEstimate}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-dash-muted">Coût par conversion</dt>
              <dd className="font-bold text-dash-heading">{report.costPerConversion}</dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-5">
          <h3 className="flex items-center gap-1.5 text-sm font-semibold text-dash-heading">
            <Sparkles className="size-4 text-blue-500" aria-hidden="true" />
            Recommandations IA
            <span className="ml-auto text-[11px] font-normal text-dash-muted">3 actions suggérées</span>
          </h3>
          <div className="flex flex-col gap-2">
            {reportRecommendations.map((rec) => (
              <div
                key={rec.id}
                className={`rounded-xl p-3 text-xs ${rec.tone === "positive" ? "bg-green-accent-dark/5" : "bg-orange-500/5"}`}
              >
                <p className={rec.tone === "positive" ? "text-dash-heading" : "font-semibold text-orange-600"}>{rec.title}</p>
                <p className={`mt-0.5 font-semibold ${rec.tone === "positive" ? "text-green-accent-dark" : "text-orange-600 underline"}`}>
                  {rec.highlight}
                </p>
              </div>
            ))}
          </div>
          <button type="button" className="mt-1 text-left text-xs font-semibold text-green-accent-dark">
            Voir toutes les recommandations →
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-[0.3px] text-dash-muted">Détails du rapport</h3>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {[
            { label: "Objectif", value: report.objective, Icon: Target },
            { label: "Audience", value: report.audience, Icon: Users },
            { label: "Canaux", value: report.channels, Icon: Radio },
            { label: "Contenus", value: report.content, Icon: Headphones },
            { label: "Diffusions", value: report.diffusionsRatio, Icon: Activity },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-border-light bg-white p-4">
              <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.3px] text-dash-muted">
                <item.Icon className="size-3.5" aria-hidden="true" />
                {item.label}
              </p>
              <p className="mt-1.5 text-sm font-bold text-dash-heading">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-dash-canvas p-4 text-xs text-dash-muted">
        <span>
          Ce rapport est généré automatiquement par KIYANZA et se base sur les données de diffusion, les estimations
          d&apos;audience et l&apos;analyse des performances.
        </span>
        <span>Généré le {report.generatedAt}</span>
      </div>
    </div>
  );
}
