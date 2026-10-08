import type { RapportConformiteItem } from "@/lib/api/types";

/** Au-delà de cet écart (en minutes), une diffusion est considérée en retard. */
export const LATE_THRESHOLD_MINUTES = 15;
/** Écart toléré pour une diffusion « ponctuelle ». */
export const ON_TIME_MINUTES = 5;

export interface Bucket {
  key: string;
  broadcasted: number;
  missed: number;
  /** Diffusées / (diffusées + manquées), null si rien n'est encore jouable. */
  rate: number | null;
}

function rate(broadcasted: number, missed: number) {
  return broadcasted + missed > 0 ? broadcasted / (broadcasted + missed) : null;
}

/** Regroupe les diffusions jouées (diffusées ou manquées) par clé. */
export function groupBy(items: RapportConformiteItem[], keyOf: (date: Date) => string, order?: string[]): Bucket[] {
  const map = new Map<string, { broadcasted: number; missed: number }>();
  for (const key of order ?? []) map.set(key, { broadcasted: 0, missed: 0 });
  for (const item of items) {
    if (item.status !== "BROADCASTED" && item.status !== "MISSED") continue;
    const key = keyOf(new Date(item.scheduledAt));
    const bucket = map.get(key) ?? { broadcasted: 0, missed: 0 };
    if (item.status === "BROADCASTED") bucket.broadcasted += 1;
    else bucket.missed += 1;
    map.set(key, bucket);
  }
  const keys = order ?? [...map.keys()].sort();
  return keys.map((key) => {
    const b = map.get(key) ?? { broadcasted: 0, missed: 0 };
    return { key, ...b, rate: rate(b.broadcasted, b.missed) };
  });
}

/** Lundi de la semaine (AAAA-MM-JJ, heure locale). */
export function weekStart(date: Date): string {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export interface Punctuality {
  /** Diffusions constatées avec un écart connu. */
  measured: number;
  /** Part des diffusions à ± ON_TIME_MINUTES. */
  onTimeRate: number | null;
  /** Écart moyen en valeur absolue, en minutes. */
  averageGap: number | null;
  late: RapportConformiteItem[];
}

export function punctuality(items: RapportConformiteItem[]): Punctuality {
  const measured = items.filter((i) => i.status === "BROADCASTED" && i.ecartMinutes !== null);
  if (measured.length === 0) return { measured: 0, onTimeRate: null, averageGap: null, late: [] };
  const gaps = measured.map((i) => Math.abs(i.ecartMinutes as number));
  return {
    measured: measured.length,
    onTimeRate: gaps.filter((g) => g <= ON_TIME_MINUTES).length / measured.length,
    averageGap: gaps.reduce((a, b) => a + b, 0) / measured.length,
    late: measured.filter((i) => Math.abs(i.ecartMinutes as number) > LATE_THRESHOLD_MINUTES),
  };
}
