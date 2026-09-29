import type { DigitalSimulationRecord, DigitalSimulationScenario } from "@/lib/api/types";

/**
 * La simulation vue à travers un scénario choisi : ses chiffres, sa
 * répartition et sa courbe remplacent ceux du scénario recommandé. L'analyse
 * IA ne porte que sur le recommandé : elle n'est pas reprise ailleurs.
 */
export function scenarioView(
  simulation: DigitalSimulationRecord,
  scenario: DigitalSimulationScenario | undefined
): DigitalSimulationRecord {
  if (!scenario || scenario.isRecommended) return simulation;
  return {
    ...simulation,
    predictedReach: scenario.predictedReach,
    predictedRoas: scenario.predictedRoas,
    predictedCtr: scenario.predictedCtr ?? simulation.predictedCtr,
    predictedEngagementRate: scenario.predictedEngagementRate ?? simulation.predictedEngagementRate,
    avgCpc: scenario.avgCpc ?? simulation.avgCpc,
    costPerAcquisition: scenario.costPerAcquisition ?? simulation.costPerAcquisition,
    conversionRate: scenario.conversionRate ?? simulation.conversionRate,
    channelBreakdown: scenario.channelBreakdown ?? simulation.channelBreakdown,
    weeklySeries: scenario.weeklySeries ?? simulation.weeklySeries,
    narrativeSummary: scenario.description ?? null,
    aiAnalysis: null,
  };
}

/** Un scénario a-t-il son propre détail (simulations récentes) ? */
export const hasDetail = (scenario: DigitalSimulationScenario) => Boolean(scenario.channelBreakdown);
