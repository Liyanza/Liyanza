"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Send } from "lucide-react";

interface Message {
  id: number;
  role: "bot" | "user";
  text: string;
}

const quickActions = [
  "Améliorer mon ROI",
  "Stratégie réseaux sociaux ?",
  "Comment optimiser mon budget ?",
];

const BOT_REPLY =
  "Merci pour votre question ! Un expert KIYANZA analysera votre demande et reviendra vers vous avec des recommandations personnalisées.";

let nextId = 1;

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: nextId++,
      role: "bot",
      text: "Bonjour ! 👋 Je suis votre assistant marketing KIYANZA. Posez-moi toutes vos questions sur vos campagnes, budgets, audiences ou stratégies marketing !",
    },
  ]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages]);

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { id: nextId++, role: "user", text: trimmed }]);
    setInput("");
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { id: nextId++, role: "bot", text: BOT_REPLY }]);
    }, 600);
  }

  return (
    <div
      role="dialog"
      aria-label="Assistant marketing KIYANZA"
      className="flex h-[min(520px,calc(100vh-6rem))] w-[min(384px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border-light bg-white shadow-[0_16px_16px_-4px_rgba(0,0,0,0.08),0_20px_60px_-10px_rgba(13,31,60,0.18)]"
    >
      <div className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-[#1a3460] px-4 py-3.5">
        <div className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-white">
          <Image src="/kiyanza-logo-mark.svg" alt="" width={20} height={13} aria-hidden="true" />
          <span className="absolute -bottom-0.5 -right-0.5 size-2 rounded-full bg-green-accent ring-2 ring-[#296bd6]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-white">Assistant KIYANZA</p>
          <p className="text-[11px] text-[#8fafd4]">Expert Marketing IA · En ligne</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 p-3">
        {quickActions.map((action) => (
          <button
            key={action}
            type="button"
            onClick={() => sendMessage(action)}
            className="rounded-full border-2 border-green-accent px-2.5 py-1 text-[11px] font-medium text-green-accent-dark transition hover:bg-green-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent"
          >
            {action}
          </button>
        ))}
      </div>

      <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-3 pb-3">
        {messages.map((message) =>
          message.role === "bot" ? (
            <div key={message.id} className="flex items-start gap-2">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-[#1a3460] text-[10px] font-bold text-white">
                K
              </span>
              <p className="rounded-tl-sm rounded-r-2xl rounded-bl-2xl border border-border-light bg-slate-50 px-3.5 py-2.5 text-xs leading-[1.6] text-[#4f5153]">
                {message.text}
              </p>
            </div>
          ) : (
            <div key={message.id} className="flex justify-end">
              <p className="max-w-[85%] rounded-tr-sm rounded-l-2xl rounded-br-2xl bg-green-accent-dark px-3.5 py-2.5 text-xs leading-[1.6] text-white">
                {message.text}
              </p>
            </div>
          )
        )}
      </div>

      <form
        className="border-t border-border-light p-3"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
      >
        <div className="flex items-center gap-2 rounded-full border border-border bg-slate-50 py-2 pl-4 pr-2">
          <label htmlFor="chat-input" className="sr-only">
            Votre question marketing
          </label>
          <input
            id="chat-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez votre question marketing…"
            className="min-w-0 flex-1 bg-transparent text-xs text-black placeholder:text-gray-text-light focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Envoyer le message"
            disabled={!input.trim()}
            className={`flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-navy to-[#1a3460] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent ${
              input.trim() ? "opacity-100" : "opacity-40"
            }`}
          >
            <Send className="size-3.5 text-white" aria-hidden="true" />
          </button>
        </div>
        <p className="mt-1.5 text-center text-[10px] text-gray-text-light">
          Propulsé par KIYANZA IA
        </p>
      </form>
    </div>
  );
}
