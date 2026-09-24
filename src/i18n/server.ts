import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./config";
import { loadMessages, type Messages, type Namespace } from "./dictionaries";
import { localizePath } from "./paths";

/**
 * Accès aux traductions depuis les composants serveur : la langue est lue
 * dans l'URL (segment [lang]) sans avoir à la transmettre de composant en
 * composant.
 *
 *   const t = await getMessages("home");
 *   <h1>{t.hero.title}</h1>
 */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!isLocale(value)) notFound();
  return value;
}

export async function getMessages<N extends Namespace>(ns: N): Promise<Messages[N]> {
  return loadMessages(await getLocale(), ns);
}

/** Chemin canonique → chemin affiché dans la langue courante. */
export async function href(path: string): Promise<string> {
  return localizePath(path, await getLocale());
}
