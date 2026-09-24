// Catalogue de stations radio — DONNÉES DE DÉMONSTRATION (maquette Figma
// "MARKETED-OSC-2026", frames Campagnes.CreationRadio). Aucune API backend
// n'existe pour un catalogue de stations radio (le Prisma `CampaignType`
// connaît `RADIO` mais il n'y a pas de module `radio-campaigns` côté
// Liyanza-backend, contrairement à `digital-campaigns`) — cohérent avec la
// permission explicite d'utiliser des données de démo pour ce qui n'a pas
// d'équivalent réel, voir StepRadioStation.
export interface RadioStation {
  id: string;
  name: string;
  /** Clé du libellé dans dashWizard.radio.coverage / zones. */
  coverage: "national" | "douala" | "yaounde";
  // Pas de logos réels disponibles (les images de la maquette sont des
  // assets Figma propres au fichier de design) — avatar généré à partir des
  // initiales, même esprit que les avatars d'utilisateurs ailleurs dans le
  // produit.
  initials: string;
  avatarBg: string;
}

export const radioStations: RadioStation[] = [
  { id: "radio-balafon", name: "Radio Balafon", coverage: "national", initials: "RB", avatarBg: "bg-red-500/10 text-red-600" },
  { id: "radio-campus", name: "Radio Campus", coverage: "national", initials: "RC", avatarBg: "bg-pink-500/10 text-pink-600" },
  { id: "africa-n1", name: "Africa N°1", coverage: "national", initials: "A1", avatarBg: "bg-green-accent/10 text-green-accent-dark" },
  { id: "sweet-fm", name: "Sweet FM", coverage: "douala", initials: "SF", avatarBg: "bg-orange-500/10 text-orange-500" },
  { id: "urban-fm", name: "Urban FM", coverage: "yaounde", initials: "UF", avatarBg: "bg-slate-800/10 text-slate-700" },
];

export const radioFrequencyPresets = [1, 2, 3, 4, 5, 6] as const;

/** Jours de diffusion ; libellés dans dashWizard.radio.days. */
export const radioDayOptions = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"] as const;

export type RadioDayId = (typeof radioDayOptions)[number];

/**
 * Libellé d'un créneau : la valeur (« 07h00 - 09h00 ») est lue telle quelle
 * par buildBroadcastSchedule ; en anglais on l'affiche « 07:00 - 09:00 ».
 */
export function slotLabel(slot: string, locale: "fr" | "en"): string {
  return locale === "en" ? slot.split("h").join(":") : slot;
}
