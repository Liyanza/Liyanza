import { Fragment, type ReactNode } from "react";

/**
 * Les réponses de l'assistant (Gemini) sont en Markdown léger : paragraphes,
 * listes "- " / "1. ", titres "#" et **gras**. Rendu en éléments React
 * (jamais en HTML brut) : un texte venu du LLM ne peut donc rien injecter
 * dans la page. Partagé par le widget du site et le Copilot du dashboard.
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

export function MarkdownText({ text, className = "" }: { text: string; className?: string }) {
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

  return <div className={`space-y-2 ${className}`}>{blocks}</div>;
}
