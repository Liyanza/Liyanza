import type { Locale } from "../config";
import type frCommon from "./fr/common";
import type frOg from "./fr/og";
import type frLegal from "./fr/legal";
import type frAuth from "./fr/auth";
import type frResources from "./fr/resources";
import type frAbout from "./fr/about";
import type frPricing from "./fr/pricing";
import type frFeatures from "./fr/features";
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
    og: () => import("./fr/og").then((m) => m.default),
    legal: () => import("./fr/legal").then((m) => m.default),
    auth: () => import("./fr/auth").then((m) => m.default),
    resources: () => import("./fr/resources").then((m) => m.default),
    about: () => import("./fr/about").then((m) => m.default),
    pricing: () => import("./fr/pricing").then((m) => m.default),
    features: () => import("./fr/features").then((m) => m.default),
    home: () => import("./fr/home").then((m) => m.default),
    plans: () => import("./fr/plans").then((m) => m.default),
  },
  en: {
    common: () => import("./en/common").then((m) => m.default),
    og: () => import("./en/og").then((m) => m.default),
    legal: () => import("./en/legal").then((m) => m.default),
    auth: () => import("./en/auth").then((m) => m.default),
    resources: () => import("./en/resources").then((m) => m.default),
    about: () => import("./en/about").then((m) => m.default),
    pricing: () => import("./en/pricing").then((m) => m.default),
    features: () => import("./en/features").then((m) => m.default),
    home: () => import("./en/home").then((m) => m.default),
    plans: () => import("./en/plans").then((m) => m.default),
  },
} satisfies Record<Locale, Record<string, () => Promise<unknown>>>;

export type Namespace = keyof (typeof loaders)["fr"];

export type Messages = {
  common: typeof frCommon;
  og: typeof frOg;
  legal: typeof frLegal;
  auth: typeof frAuth;
  resources: typeof frResources;
  about: typeof frAbout;
  pricing: typeof frPricing;
  features: typeof frFeatures;
  home: typeof frHome;
  plans: typeof frPlans;
};

export async function loadMessages<N extends Namespace>(locale: Locale, ns: N): Promise<Messages[N]> {
  return loaders[locale][ns]() as Promise<Messages[N]>;
}
