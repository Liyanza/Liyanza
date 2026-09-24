"use client";

import { Hourglass } from "lucide-react";
import { useT } from "@/i18n/client";
import { fill } from "@/i18n/format";

// Onglets "Alertes"/"Analyses"/"Recommandation"/"Annulées" : présents dans la
// barre d'onglets de la maquette Figma (avec leur badge de comptage) mais
// aucun contenu détaillé n'y est designé (contrairement à Vue d'ensemble /
// Diffusions / Planning / Rapports) — plutôt que d'inventer un écran sans
// spécification, même traitement honnête que "Bientôt disponible" déjà
// utilisé pour Radio/Affichage (StepType) et les canaux non intégrés
// (StepChannels).
export function ComingSoonTab({ label }: { label: string }) {
  const t = useT("dashInsights").monitoring.comingSoon;
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-16 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-dash-pill-bg">
        <Hourglass className="size-5 text-dash-muted" aria-hidden="true" />
      </span>
      <p className="text-sm font-semibold text-dash-heading">{fill(t.title, { label })}</p>
      <p className="max-w-sm text-xs text-dash-muted">
        {t.text}
      </p>
    </div>
  );
}
