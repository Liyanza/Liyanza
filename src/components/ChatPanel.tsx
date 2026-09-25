"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Send, Sparkles } from "lucide-react";
import { useT } from "@/i18n/client";
import { fill } from "@/i18n/format";
import { Link } from "@/i18n/navigation";
import { ApiError, apiMe, apiPublicAskStream } from "@/lib/api/client";
import { MarkdownText } from "@/components/chat/MarkdownText";

/**
 * Assistant vitrine du site public (visiteurs anonymes).
 *
 * - 3 questions par session (MAX_QUESTIONS), puis le champ laisse place à
 *   l'inscription / la connexion. Après la 2e réponse, une carte invite à
 *   créer un compte. Ce compteur n'est qu'un confort d'affichage : le vrai
 *   garde-fou est le quota par IP appliqué par le backend (429).
 * - Rien n'est enregistré côté serveur ; la session vit dans sessionStorage
 *   (fermer puis rouvrir le widget la retrouve, un nouvel onglet repart à 0).
 * - Un utilisateur déjà connecté est renvoyé vers le Copilot de son espace.
 */

type Notice = "error" | "limit";

type Message =
  | { id: number; role: "bot"; text: string }
  | { id: number; role: "user"; text: string }
  | { id: number; role: "notice"; notice: Notice };

interface StoredSession {
  messages: Message[];
  asked: number;
  limitReached: boolean;
}

const MAX_QUESTIONS = 3;
const SIGNUP_CARD_AFTER_ANSWERS = 2;
// Alignés sur le backend (PublicAskDto) et le mode public du service IA.
const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY_MESSAGES = 4;
const STORAGE_KEY = "kiyanza.publicChat";

let nextId = 1;

function loadSession(): StoredSession | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredSession) : null;
  } catch {
    return null;
  }
}

function saveSession(session: StoredSession) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // Navigation privée / stockage bloqué : la session reste en mémoire.
  }
}

function BotAvatar() {
  return (
    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-[#1a3460] text-[10px] font-bold text-white">
      K
    </span>
  );
}

export function ChatPanel() {
  const t = useT("common").chatbot;
  // Le panneau n'est monté qu'au clic (jamais au rendu serveur) : la session
  // peut être relue directement à l'initialisation, sans effet.
  const [stored] = useState(loadSession);
  const [messages, setMessages] = useState<Message[]>(() =>
    stored
      ? stored.messages.map((m) => ({ ...m, id: nextId++ }))
      : [{ id: nextId++, role: "bot", text: t.welcome }]
  );
  const [asked, setAsked] = useState(stored?.asked ?? 0);
  const [limitReached, setLimitReached] = useState(stored?.limitReached ?? false);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  // Vrai dès le premier morceau de la réponse : l'indicateur « rédige sa
  // réponse » laisse alors place à la réponse qui s'écrit.
  const [streaming, setStreaming] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Déjà connecté : le Copilot de l'espace est bien plus utile (données de
    // l'entreprise, historique). Un 401 ici est le cas normal d'un visiteur.
    apiMe().then(
      () => setLoggedIn(true),
      () => {}
    );
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, pending]);

  const exhausted = limitReached || asked >= MAX_QUESTIONS;
  const remaining = Math.max(0, MAX_QUESTIONS - asked);

  function update(next: Message[], nextAsked: number, nextLimit: boolean) {
    setMessages(next);
    setAsked(nextAsked);
    setLimitReached(nextLimit);
    saveSession({ messages: next, asked: nextAsked, limitReached: nextLimit });
  }

  async function sendMessage(text: string) {
    const trimmed = text.trim().slice(0, MAX_MESSAGE_LENGTH);
    if (!trimmed || pending || exhausted) return;

    const history = messages
      .filter((m): m is Extract<Message, { role: "bot" | "user" }> => m.role !== "notice")
      .slice(1) // le message d'accueil n'est pas un échange
      .slice(-MAX_HISTORY_MESSAGES)
      .map((m) => ({ sender: m.role === "user" ? ("USER" as const) : ("AI" as const), content: m.text }));

    const withQuestion: Message[] = [...messages, { id: nextId++, role: "user", text: trimmed }];
    setMessages(withQuestion);
    setInput("");
    setPending(true);

    // La réponse s'écrit au fil de sa génération dans une bulle créée au
    // premier morceau ; elle n'est enregistrée (sessionStorage) qu'une fois
    // complète. Réponse coupée : la bulle partielle laisse place à l'erreur.
    const answerId = nextId++;
    let answer = "";
    try {
      await apiPublicAskStream(trimmed, history, (text) => {
        answer += text;
        setStreaming(true);
        setMessages([...withQuestion, { id: answerId, role: "bot", text: answer }]);
      });
      update([...withQuestion, { id: answerId, role: "bot", text: answer }], asked + 1, false);
    } catch (error) {
      const quota = error instanceof ApiError && error.status === 429;
      update([...withQuestion, { id: nextId++, role: "notice", notice: quota ? "limit" : "error" }], asked, quota);
    } finally {
      setPending(false);
      setStreaming(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-label={t.dialog}
      className="flex h-[min(520px,calc(100vh-6rem))] w-[min(384px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border-light bg-white shadow-[0_16px_16px_-4px_rgba(0,0,0,0.08),0_20px_60px_-10px_rgba(13,31,60,0.18)]"
    >
      <div className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-[#1a3460] px-4 py-3.5">
        <div className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-white">
          <Image src="/kiyanza-logo-mark.svg" alt="" width={20} height={13} aria-hidden="true" />
          <span className="absolute -bottom-0.5 -right-0.5 size-2 rounded-full bg-green-accent ring-2 ring-[#296bd6]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-white">{t.name}</p>
          <p className="text-[11px] text-[#8fafd4]">{t.status}</p>
        </div>
      </div>

      {loggedIn ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-green-accent/10 text-green-accent-dark">
            <Sparkles className="size-6" aria-hidden="true" />
          </span>
          <p className="text-sm font-semibold text-[#2b2d2f]">{t.loggedInTitle}</p>
          <p className="text-xs leading-[1.6] text-[#4f5153]">{t.loggedInText}</p>
          <Link
            href="/dashboard/assistant"
            className="mt-1 rounded-full bg-green-accent-dark px-4 py-2 text-xs font-semibold text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent focus-visible:ring-offset-2"
          >
            {t.loggedInCta}
          </Link>
        </div>
      ) : (
        <>
          {!exhausted && (
            <div className="flex flex-wrap gap-2 p-3">
              {t.quickActions.map((action) => (
                <button
                  key={action}
                  type="button"
                  onClick={() => sendMessage(action)}
                  disabled={pending}
                  className="rounded-full border-2 border-green-accent px-2.5 py-1 text-[11px] font-medium text-green-accent-dark transition hover:bg-green-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent disabled:opacity-50"
                >
                  {action}
                </button>
              ))}
            </div>
          )}

          <div ref={listRef} aria-live="polite" className="flex-1 space-y-3 overflow-y-auto px-3 pb-3 pt-3">
            {messages.map((message, index) =>
              message.role === "user" ? (
                <div key={message.id} className="flex justify-end">
                  <p className="max-w-[85%] whitespace-pre-line break-words rounded-tr-sm rounded-l-2xl rounded-br-2xl bg-green-accent-dark px-3.5 py-2.5 text-xs leading-[1.6] text-white">
                    {message.text}
                  </p>
                </div>
              ) : (
                <div key={message.id}>
                  <div className="flex items-start gap-2">
                    <BotAvatar />
                    <div
                      className={`min-w-0 break-words rounded-tl-sm rounded-r-2xl rounded-bl-2xl border px-3.5 py-2.5 text-xs leading-[1.6] ${
                        message.role === "notice"
                          ? "border-amber-200 bg-amber-50 text-[#6b4e16]"
                          : "border-border-light bg-slate-50 text-[#4f5153]"
                      }`}
                    >
                      {message.role === "bot" ? (
                        <MarkdownText text={message.text} />
                      ) : (
                        <p>{message.notice === "limit" ? t.limitReached : t.error}</p>
                      )}
                    </div>
                  </div>
                  {/* Carte d'inscription juste après la 2e réponse, une seule fois. */}
                  {message.role === "bot" &&
                    !exhausted &&
                    messages.slice(0, index + 1).filter((m) => m.role === "bot").length - 1 ===
                      SIGNUP_CARD_AFTER_ANSWERS && (
                      <div className="ml-8 mt-2 rounded-2xl border border-green-accent/40 bg-green-accent/5 p-3">
                        <p className="text-xs font-semibold text-[#2b2d2f]">{t.signupCardTitle}</p>
                        <p className="mt-1 text-[11px] leading-[1.5] text-[#4f5153]">{t.signupCardText}</p>
                        <Link
                          href="/inscription"
                          className="mt-2 inline-block rounded-full bg-green-accent-dark px-3 py-1.5 text-[11px] font-semibold text-white transition hover:brightness-110"
                        >
                          {t.signupCta}
                        </Link>
                      </div>
                    )}
                </div>
              )
            )}
            {pending && !streaming && (
              <div className="flex items-start gap-2">
                <BotAvatar />
                <p className="animate-pulse rounded-tl-sm rounded-r-2xl rounded-bl-2xl border border-border-light bg-slate-50 px-3.5 py-2.5 text-xs italic leading-[1.6] text-gray-text-light">
                  {t.thinking}
                </p>
              </div>
            )}
          </div>

          {exhausted && !pending ? (
            <div className="border-t border-border-light p-4 text-center">
              <p className="text-xs font-semibold text-[#2b2d2f]">{t.exhaustedTitle}</p>
              <p className="mt-1 text-[11px] leading-[1.5] text-[#4f5153]">{t.exhaustedText}</p>
              <div className="mt-3 flex justify-center gap-2">
                <Link
                  href="/inscription"
                  className="rounded-full bg-green-accent-dark px-4 py-2 text-xs font-semibold text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent focus-visible:ring-offset-2"
                >
                  {t.signupCta}
                </Link>
                <Link
                  href="/connexion"
                  className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-[#2b2d2f] transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent focus-visible:ring-offset-2"
                >
                  {t.loginCta}
                </Link>
              </div>
            </div>
          ) : (
            <form
              className="border-t border-border-light p-3"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
            >
              <div className="flex items-center gap-2 rounded-full border border-border bg-slate-50 py-2 pl-4 pr-2 has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-green-accent">
                <label htmlFor="chat-input" className="sr-only">
                  {t.inputLabel}
                </label>
                <input
                  id="chat-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  maxLength={MAX_MESSAGE_LENGTH}
                  placeholder={t.placeholder}
                  className="min-w-0 flex-1 bg-transparent text-xs text-black placeholder:text-gray-text-light focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label={t.send}
                  disabled={!input.trim() || pending}
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-navy to-[#1a3460] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent ${
                    input.trim() && !pending ? "opacity-100" : "opacity-40"
                  }`}
                >
                  <Send className="size-3.5 text-white" aria-hidden="true" />
                </button>
              </div>
              <p className="mt-1.5 text-center text-[10px] text-gray-text-light">
                {asked === 0 ? t.poweredBy : fill(remaining === 1 ? t.remainingOne : t.remainingMany, { count: remaining })}
              </p>
            </form>
          )}
        </>
      )}
    </div>
  );
}
