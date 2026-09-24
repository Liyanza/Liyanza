"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Locale } from "./config";
import type { Messages, Namespace } from "./dictionaries";

/**
 * Traductions côté client. Le serveur charge les espaces de noms utiles et
 * les confie à <MessagesProvider> ; les composants client les lisent avec
 * useT("ns"). Les fournisseurs s'emboîtent : la mise en page racine fournit
 * « common », chaque page ajoute le sien.
 */

type Context = { locale: Locale; messages: Partial<Messages> };

const I18nContext = createContext<Context | null>(null);

export function MessagesProvider({
  locale,
  messages,
  children,
}: {
  locale?: Locale;
  messages: Partial<Messages>;
  children: ReactNode;
}) {
  const parent = useContext(I18nContext);
  const value = useMemo<Context>(
    () => ({
      locale: locale ?? parent?.locale ?? "fr",
      messages: { ...parent?.messages, ...messages },
    }),
    [locale, messages, parent],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useT/useLocale doivent être utilisés sous <MessagesProvider>.");
  return ctx;
}

export function useLocale(): Locale {
  return useI18n().locale;
}

export function useT<N extends Namespace>(ns: N): Messages[N] {
  const messages = useI18n().messages[ns];
  if (!messages) throw new Error(`Espace de noms « ${ns} » non fourni : ajoutez-le au <MessagesProvider> de la page.`);
  return messages as Messages[N];
}
