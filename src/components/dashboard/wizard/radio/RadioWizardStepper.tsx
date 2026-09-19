import { ProgressBar } from "@/components/dashboard/ui/ProgressBar";

// 4 écrans avant confirmation (station, spot, fréquence, récapitulatif) —
// voir RADIO_STEP dans CampaignWizard.tsx. La maquette Figma montre "1/3"
// sur son tout premier frame puis "X/4" partout ailleurs (incohérence de la
// maquette elle-même) : 4 retenu comme total, cohérent avec le nombre réel
// d'écrans construits.
const RADIO_WIZARD_TOTAL_STEPS = 4;

// Stepper dédié au flux Radio — visuel distinct du WizardStepper "Digital"
// (barre de progression fine + badge circulaire flottant "X/Y"), fidèle à la
// maquette Figma (frames Campagnes.CreationRadio) plutôt qu'un réemploi du
// composant Digital qui a un tout autre agencement (pastille "Étape X/Y" +
// "Brouillon sauvegardé" + "Progression %"). Couleurs et rayons repris des
// tokens existants (orange-500, green-accent-dark, dash-track).
export function RadioWizardStepper({ stepIndex }: { stepIndex: number }) {
  const total = RADIO_WIZARD_TOTAL_STEPS;
  const progress = Math.round(((stepIndex + 1) / total) * 100);

  return (
    <div className="relative pb-4">
      <div className="absolute right-0 top-0">
        <span className="flex size-14 items-center justify-center rounded-full bg-orange-500/10 text-sm font-bold text-orange-500">
          {stepIndex + 1}/{total}
        </span>
      </div>
      <div className="max-w-[390px]">
        <ProgressBar value={progress} barClassName="bg-green-accent-dark" trackClassName="bg-border-light" height="h-1" />
      </div>
    </div>
  );
}
