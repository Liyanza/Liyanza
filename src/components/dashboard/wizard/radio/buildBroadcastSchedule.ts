import type { RadioFrequencyData } from "./StepRadioFrequency";
import type { CreateScheduleBroadcastPayload } from "@/lib/api/types";
import type { RadioDayId } from "@/data/radioStations";

// Miroir de `ArrayMaxSize(500)` sur `CreateScheduleDto` (Liyanza-backend,
// src/modules/canaux/dto/create-schedule.dto.ts) — un plan trop chargé
// (fréquence élevée × période longue × beaucoup de créneaux) est tronqué
// plutôt que de faire échouer toute la création avec un 400 opaque.
export const MAX_BROADCASTS = 500;

const JS_DAY_TO_RADIO_DAY: RadioDayId[] = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function parseSlotStartTime(slot: string): { hours: number; minutes: number } | null {
  const match = /^(\d{1,2})h(\d{2})/.exec(slot.trim());
  if (!match) return null;
  return { hours: Number(match[1]), minutes: Number(match[2]) };
}

export interface BuildScheduleResult {
  broadcasts: CreateScheduleBroadcastPayload[];
  truncated: boolean;
}

/**
 * Traduit la règle récurrente du wizard (fréquence/jours/créneaux/période)
 * en diffusions concrètes attendues par `POST /campagnes/:id/planning` — ce
 * dernier n'accepte qu'une liste explicite, pas une règle récurrente.
 */
export function buildBroadcastSchedule(
  frequency: RadioFrequencyData,
  durationSec: number | null,
  channelId: string
): BuildScheduleResult {
  const duration = Math.max(1, Math.min(86_400, Math.round(durationSec ?? 30)));
  const daySet = new Set<RadioDayId>(frequency.days);
  const slotTimes = frequency.timeSlots
    .map(parseSlotStartTime)
    .filter((t): t is { hours: number; minutes: number } => t !== null);

  const start = new Date(`${frequency.startDate}T00:00:00`);
  const end = new Date(`${frequency.endDate}T23:59:59`);

  const broadcasts: CreateScheduleBroadcastPayload[] = [];
  let truncated = false;

  for (
    let cursor = new Date(start);
    cursor <= end && !truncated;
    cursor.setDate(cursor.getDate() + 1)
  ) {
    const dayId = JS_DAY_TO_RADIO_DAY[cursor.getDay()];
    if (!daySet.has(dayId)) continue;

    for (const slot of slotTimes) {
      if (broadcasts.length >= MAX_BROADCASTS) {
        truncated = true;
        break;
      }
      const scheduledAt = new Date(cursor);
      scheduledAt.setHours(slot.hours, slot.minutes, 0, 0);
      broadcasts.push({
        mediaType: "RADIO",
        scheduledAt: scheduledAt.toISOString(),
        duration,
        channelId,
      });
    }
  }

  return { broadcasts, truncated };
}
