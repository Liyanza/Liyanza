import { Container } from "@/components/ui/Container";

export function LegalTableOfContents({
  items,
}: {
  items: { id: string; title: string }[];
}) {
  return (
    <section className="border-b border-black/[0.06] py-10">
      <Container>
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-green-accent-dark">
          Sommaire
        </p>
        <ol className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
          {items.map((item, index) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="flex gap-2 text-sm text-gray-text transition hover:text-green-accent-dark"
              >
                <span className="font-semibold text-black/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.title}
              </a>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
