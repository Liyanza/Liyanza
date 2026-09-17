import { ReactNode } from "react";

/**
 * Style les balises sémantiques standard (`p`, `ul`, `h3`, `a`, `strong`)
 * via des sélecteurs enfants Tailwind plutôt que de répéter les classes sur
 * chaque paragraphe des contenus légaux (Conditions d'utilisation, Politique
 * de confidentialité) — ces contenus n'ont pas d'autre usage que du texte
 * long, un plugin `@tailwind/typography` serait disproportionné pour deux
 * pages.
 */
export function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-b border-black/[0.06] py-10 last:border-none [&>h3]:mt-6 [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-black [&>ol]:mt-4 [&>ol]:list-decimal [&>ol]:space-y-2 [&>ol]:pl-5 [&>ol_li]:text-base [&>ol_li]:leading-relaxed [&>ol_li]:text-gray-text [&>p]:mt-4 [&>p]:text-base [&>p]:leading-relaxed [&>p]:text-gray-text [&>ul]:mt-4 [&>ul]:list-disc [&>ul]:space-y-2 [&>ul]:pl-5 [&>ul_li]:text-base [&>ul_li]:leading-relaxed [&>ul_li]:text-gray-text [&_a]:font-semibold [&_a]:text-green-accent-dark [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-bold [&_strong]:text-black"
    >
      <h2 className="text-xl font-extrabold text-black sm:text-2xl">
        {title}
      </h2>
      {children}
    </section>
  );
}
