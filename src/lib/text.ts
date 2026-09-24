/**
 * Normalisation de texte partagée (serveur et client) : minuscules, sans
 * accents ni ponctuation. « Scénarios » → « scenarios ».
 */
export function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Identifiant d'URL / DOM : « Créer sa campagne » → « creer-sa-campagne ». */
export function slugify(value: string): string {
  return normalize(value).replace(/ /g, "-");
}
