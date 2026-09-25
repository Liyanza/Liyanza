"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AlertTriangle, Check, Copy, RefreshCw, Send, Sparkles, ThumbsDown, ThumbsUp } from "lucide-react";
import { useT } from "@/i18n/client";
import { MarkdownText } from "@/components/chat/MarkdownText";
import { SkeletonPanel } from "@/components/dashboard/ui/Skeleton";
import { COPILOT_MAX_MESSAGE_LENGTH, useCopilot, type CopilotMessage } from "./CopilotProvider";

/**
 * Conversation courante du Copilot. Purement une vue : tout l'état vit dans
 * CopilotProvider, d'où un rendu identique dans le panneau et la page.
 */
export function CopilotChat({ variant }: { variant: "panel" | "page" }) {
  const t = useT("dash").copilot;
  const { messages, loadingConversation, pending, notice, campaignId, send } = useCopilot();
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  const lastAiId = [...messages].reverse().find((m) => m.sender === "AI" && !m.local)?.id;
  const width = variant === "page" ? "mx-auto w-full max-w-3xl" : "w-full";

  function submit() {
    if (!input.trim() || pending) return;
    send(input);
    setInput("");
    inputRef.current?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      submit();
    }
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div ref={listRef} aria-live="polite" className="min-h-0 flex-1 overflow-y-auto">
        <div className={`${width} flex flex-col gap-5 px-5 py-5`}>
          {loadingConversation ? (
            <SkeletonPanel lines={4} />
          ) : messages.length === 0 && !pending ? (
            <EmptyState
              suggestions={campaignId ? t.campaignSuggestions : t.suggestions}
              onPick={send}
            />
          ) : (
            messages.map((message) =>
              message.sender === "USER" ? (
                <div key={message.id} className="flex justify-end">
                  <p className="max-w-[85%] whitespace-pre-line break-words rounded-2xl rounded-tr-sm bg-green-600 px-4 py-2.5 text-[13px] leading-[1.6] text-white">
                    {message.content}
                  </p>
                </div>
              ) : (
                <AiMessage key={message.id} message={message} isLast={message.id === lastAiId} />
              )
            )
          )}

          {pending && (
            <div className="flex items-start gap-3">
              <AiAvatar />
              <p className="animate-pulse pt-1 text-[13px] italic text-dash-muted">{t.thinking}</p>
            </div>
          )}

          {notice && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-xs leading-[1.5] text-[#6b4e16]"
            >
              <AlertTriangle className="mt-px size-3.5 shrink-0" aria-hidden="true" />
              {notice === "noCompany" ? t.noCompany : notice === "loadError" ? t.loadError : t.error}
            </div>
          )}
        </div>
      </div>

      <form
        className="border-t border-border bg-white"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <div className={`${width} px-4 pb-3 pt-3`}>
          <div className="flex items-end gap-2 rounded-2xl border border-border bg-dash-canvas py-2 pl-4 pr-2 has-[textarea:focus-visible]:border-green-600 has-[textarea:focus-visible]:ring-2 has-[textarea:focus-visible]:ring-green-600/20">
            <label htmlFor={`copilot-input-${variant}`} className="sr-only">
              {t.inputLabel}
            </label>
            <textarea
              id={`copilot-input-${variant}`}
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              maxLength={COPILOT_MAX_MESSAGE_LENGTH}
              placeholder={t.placeholder}
              className="max-h-40 min-h-[24px] flex-1 resize-none bg-transparent py-1 text-[13px] leading-[1.5] text-black [field-sizing:content] placeholder:text-gray-text-light focus:outline-none"
            />
            <button
              type="submit"
              aria-label={t.send}
              disabled={!input.trim() || pending}
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-green-600 text-white transition hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:opacity-40"
            >
              <Send className="size-3.5" aria-hidden="true" />
            </button>
          </div>
          <p className="mt-1.5 text-center text-[10px] text-gray-text-light">
            {t.hint} · {t.disclaimer}
          </p>
        </div>
      </form>
    </div>
  );
}

function AiAvatar() {
  return (
    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-[#1a3460] text-white">
      <Sparkles className="size-3.5" aria-hidden="true" />
    </span>
  );
}

function EmptyState({ suggestions, onPick }: { suggestions: string[]; onPick: (text: string) => void }) {
  const t = useT("dash").copilot;
  return (
    <div className="flex flex-col items-center gap-4 py-8 text-center">
      <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-[#1a3460] text-white shadow-[0_8px_24px_rgba(26,52,96,0.25)]">
        <Sparkles className="size-6" aria-hidden="true" />
      </span>
      <div>
        <p className="text-base font-bold text-dash-heading">{t.emptyTitle}</p>
        <p className="mx-auto mt-1 max-w-sm text-xs leading-[1.6] text-dash-muted">{t.emptyText}</p>
      </div>
      <div className="flex w-full max-w-md flex-col gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => onPick(suggestion)}
            className="rounded-xl border border-border bg-white px-4 py-2.5 text-left text-xs font-medium text-dash-body transition hover:border-green-600 hover:text-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}

function AiMessage({ message, isLast }: { message: CopilotMessage; isLast: boolean }) {
  const t = useT("dash").copilot;
  const { pending, regenerate, setFeedback } = useCopilot();
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(message.content).then(
      () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
      },
      () => {}
    );
  }

  const actionClass =
    "flex size-7 items-center justify-center rounded-lg text-gray-text-light transition hover:bg-slate-100 hover:text-dash-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 disabled:opacity-40";

  return (
    <div className="group flex items-start gap-3">
      <AiAvatar />
      <div className="min-w-0 flex-1">
        <MarkdownText text={message.content} className="break-words text-[13px] leading-[1.65] text-[#3a3c3e]" />
        <div className="mt-1.5 flex items-center gap-0.5">
          <button type="button" onClick={copy} aria-label={copied ? t.copied : t.copy} title={copied ? t.copied : t.copy} className={actionClass}>
            {copied ? <Check className="size-3.5 text-green-600" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
          </button>
          <button
            type="button"
            onClick={() => setFeedback(message.id, message.feedback === "UP" ? null : "UP")}
            aria-label={t.helpful}
            aria-pressed={message.feedback === "UP"}
            title={t.helpful}
            className={`${actionClass} ${message.feedback === "UP" ? "text-green-600" : ""}`}
          >
            <ThumbsUp className="size-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setFeedback(message.id, message.feedback === "DOWN" ? null : "DOWN")}
            aria-label={t.notHelpful}
            aria-pressed={message.feedback === "DOWN"}
            title={t.notHelpful}
            className={`${actionClass} ${message.feedback === "DOWN" ? "text-red-500" : ""}`}
          >
            <ThumbsDown className="size-3.5" aria-hidden="true" />
          </button>
          {isLast && (
            <button type="button" onClick={regenerate} disabled={pending} aria-label={t.regenerate} title={t.regenerate} className={actionClass}>
              <RefreshCw className="size-3.5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
