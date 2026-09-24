import type { Locale } from "../config";
import type frCommon from "./fr/common";
import type frHome from "./fr/home";
import type frPlans from "./fr/plans";

/**
 * Registre des dictionnaires : un espace de noms (namespace) par zone du
 * site, chargé à la demande (import dynamique : seul le texte de la langue
 * et de la page servies est chargé). Ajouter un espace de noms = créer
 * fr/<ns>.ts + en/<ns>.ts et l'inscrire ici.
 */
const loaders = {
  fr: {
    common: () => import("./fr/common").then((m) => m.default),
    home: () => import("./fr/home").then((m) => m.default),
    plans: () => import("./fr/plans").then((m) => m.default),
  },
  en: {
    common: () => import("./en/common").then((m) => m.default),
    home: () => import("./en/home").then((m) => m.default),
    plans: () => import("./en/plans").then((m) => m.default),
  },
} satisfies Record<Locale, Record<string, () => Promise<unknown>>>;

export type Namespace = keyof (typeof loaders)["fr"];

export type Messages = {
  common: typeof frCommon;
  home: typeof frHome;
  plans: typeof frPlans;
};

export async function loadMessages<N extends Namespace>(locale: Locale, ns: N): Promise<Messages[N]> {
  return loaders[locale][ns]() as Promise<Messages[N]>;
}
