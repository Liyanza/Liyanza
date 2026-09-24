"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { Send } from "lucide-react";
import { useT } from "@/i18n/client";
import { Link } from "@/i18n/navigation";
import { ApiError, apiCreateConversation, apiSendChatMessage } from "@/lib/api/client";

type Notice = "login" | "forbidden" | "error";

type Message =
  | { id: number; role: "bot"; text: string }
  | { id: number; role: "user"; text: string }
  | { id: number; role: "notice"; notice: Notice };

// Aligné sur EnvoyerMessageDto côté backend (@MaxLength(5000)).
const MAX_MESSAGE_LENGTH = 5000;
// Le sujet de la conversation (CreateConversationDto.topic) est tiré du
// premier message : assez pour s'y retrouver dans l'historique.
const TOPIC_MAX_LENGTH = 80;

let nextId = 1;

/**
 * Les réponses de l'assistant (Gemini) sont en Markdown léger : paragraphes,
 * listes "- " / "1. " et **gras**. Rendu en éléments React (jamais en HTML
 * brut) : un texte venu du LLM ne peut donc rien injecter dans la page.
 */
function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
      <strong key={i} className="font-semibold text-[#2b2d2f]">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

function BotText({ text }: { text: string }) {
  const blocks: ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flushList = () => {
    if (!list) return;
    const ListTag = list.ordered ? "ol" : "ul";
    blocks.push(
      <ListTag key={blocks.length} className={`space-y-1 pl-4 ${list.ordered ? "list-decimal" : "list-disc"}`}>
        {list.items.map((item, i) => (
          <li key={i}>{renderInline(item)}</li>
        ))}
      </ListTag>
    );
    list = null;
  };

  for (const rawLine of text.split("\n")) {
    const line = rawLine.trim();
    const bullet = /^[-*•]\s+(.*)$/.exec(line);
    const numbered = /^\d+[.)]\s+(.*)$/.exec(line);
    const item = bullet?.[1] ?? numbered?.[1];

    if (item !== undefined) {
      const ordered = Boolean(numbered);
      if (list && list.ordered !== ordered) flushList();
      list ??= { ordered, items: [] };
      list.items.push(item);
      continue;
    }

    flushList();
    if (line) {
      blocks.push(<p key={blocks.length}>{renderInline(line.replace(/^#{1,6}\s+/, ""))}</p>);
    }
  }
  flushList();

  return <div className="space-y-2">{blocks}</div>;
}

function noticeFor(error: unknown): Notice {
  if (error instanceof ApiError && error.status === 401) return "login";
  if (error instanceof ApiError && error.status === 403) return "forbidden";
  return "error";
}

export function ChatPanel() {
  const t = useT("common").chatbot;
  const [messages, setMessages] = useState<Message[]>(() => [{ id: nextId++, role: "bot", text: t.welcome }]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  // Créée au premier message seulement : ouvrir le widget sans rien envoyer
  // ne crée aucune conversation côté backend.
  const conversationIdRef = useRef<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, pending]);

  async function sendMessage(text: string) {
    const trimmed = text.trim().slice(0, MAX_MESSAGE_LENGTH);
    if (!trimmed || pending) return;
    setMessages((prev) => [...prev, { id: nextId++, role: "user", text: trimmed }]);
    setInput("");
    setPending(true);

    try {
      if (!conversationIdRef.current) {
        const conversation = await apiCreateConversation(trimmed.slice(0, TOPIC_MAX_LENGTH));
        conversationIdRef.current = conversation.id;
      }
      const { iaMessage } = await apiSendChatMessage(conversationIdRef.current, trimmed);
      setMessages((prev) => [...prev, { id: nextId++, role: "bot", text: iaMessage.content }]);
    } catch (error) {
      setMessages((prev) => [...prev, { id: nextId++, role: "notice", notice: noticeFor(error) }]);
    } finally {
      setPending(false);
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

      <div ref={listRef} aria-live="polite" className="flex-1 space-y-3 overflow-y-auto px-3 pb-3">
        {messages.map((message) =>
          message.role === "user" ? (
            <div key={message.id} className="flex justify-end">
              <p className="max-w-[85%] whitespace-pre-line break-words rounded-tr-sm rounded-l-2xl rounded-br-2xl bg-green-accent-dark px-3.5 py-2.5 text-xs leading-[1.6] text-white">
                {message.text}
              </p>
            </div>
          ) : (
            <div key={message.id} className="flex items-start gap-2">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-[#1a3460] text-[10px] font-bold text-white">
                K
              </span>
              <div
                className={`min-w-0 break-words rounded-tl-sm rounded-r-2xl rounded-bl-2xl border px-3.5 py-2.5 text-xs leading-[1.6] ${
                  message.role === "notice"
                    ? "border-amber-200 bg-amber-50 text-[#6b4e16]"
                    : "border-border-light bg-slate-50 text-[#4f5153]"
                }`}
              >
                {message.role === "bot" ? (
                  <BotText text={message.text} />
                ) : message.notice === "login" ? (
                  <p>
                    {t.loginRequired}{" "}
                    <Link href="/connexion" className="font-semibold text-green-accent-dark underline">
                      {t.loginCta}
                    </Link>
                  </p>
                ) : (
                  <p>{message.notice === "forbidden" ? t.forbidden : t.error}</p>
                )}
              </div>
            </div>
          )
        )}
        {pending && (
          <div className="flex items-start gap-2">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-[#1a3460] text-[10px] font-bold text-white">
              K
            </span>
            <p className="animate-pulse rounded-tl-sm rounded-r-2xl rounded-bl-2xl border border-border-light bg-slate-50 px-3.5 py-2.5 text-xs italic leading-[1.6] text-gray-text-light">
              {t.thinking}
            </p>
          </div>
        )}
      </div>

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
          {t.poweredBy}
        </p>
      </form>
    </div>
  );
}
