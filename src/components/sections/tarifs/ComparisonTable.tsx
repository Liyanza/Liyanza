import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";

type Cell = boolean | "limited";

interface Row {
  feature: string;
  free: Cell;
  pro: Cell;
  business: Cell;
  enterprise: Cell;
}

const rows: Row[] = [
  { feature: "Gestion des campagnes", free: true, pro: true, business: true, enterprise: true },
  { feature: "Dashboard", free: true, pro: true, business: true, enterprise: true },
  { feature: "Suivi des performances", free: true, pro: true, business: true, enterprise: true },
  { feature: "Rapports", free: true, pro: true, business: true, enterprise: true },
  { feature: "Scénarios IA", free: false, pro: true, business: true, enterprise: true },
  { feature: "Recommandations IA", free: "limited", pro: true, business: true, enterprise: true },
  { feature: "Monitoring avancé", free: false, pro: true, business: true, enterprise: true },
  { feature: "Multi-campagnes", free: false, pro: true, business: true, enterprise: true },
  { feature: "Collaboration d'équipe", free: false, pro: false, business: true, enterprise: true },
  { feature: "Gestion des accès", free: false, pro: false, business: true, enterprise: true },
  { feature: "Analyse approfondie", free: false, pro: true, business: true, enterprise: true },
  { feature: "Support prioritaire", free: false, pro: false, business: true, enterprise: true },
  { feature: "Personnalisation complète", free: false, pro: false, business: false, enterprise: true },
  { feature: "Accompagnement dédié", free: false, pro: false, business: false, enterprise: true },
];

const columns: { key: keyof Omit<Row, "feature">; label: string; sub?: string }[] = [
  { key: "free", label: "FREE" },
  { key: "pro", label: "PRO", sub: "Recommandé" },
  { key: "business", label: "BUSINESS" },
  { key: "enterprise", label: "ENTERPRISE" },
];

function Cell({ value, pro = false }: { value: Cell; pro?: boolean }) {
  if (value === "limited") {
    return (
      <span className="border border-[#e4e4e7] bg-zinc-100 px-2.5 py-1 text-[10px] font-semibold text-gray-text">
        Limité
      </span>
    );
  }
  if (value) {
    return (
      <Check
        className={`mx-auto size-4 ${pro ? "text-green-accent" : "text-[#3f3f46]"}`}
        aria-hidden="true"
      />
    );
  }
  return <span className="mx-auto block h-px w-1.5 bg-[#d4d4d8]" aria-hidden="true" />;
}

export function ComparisonTable() {
  return (
    <section className="bg-white py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionEyebrow variant="pill" tone="orange">Comparaison</SectionEyebrow>
          <h2 className="mt-5 text-4xl font-extrabold text-black sm:text-5xl">
            Comparez les fonctionnalités
          </h2>
          <p className="mt-3 text-base text-gray-text">
            Un aperçu complet de ce qui est inclus dans chaque formule.
          </p>
        </Reveal>

        <Reveal className="mt-14 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse">
            <thead>
              <tr>
                <th className="border-b border-black p-4 text-left text-sm font-bold text-black">
                  Fonctionnalité
                </th>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`border-b p-4 text-center text-sm font-black ${
                      col.key === "pro"
                        ? "border-blue-500 bg-[#f0fdf4] text-green-600"
                        : "border-black text-gray-text"
                    }`}
                  >
                    {col.label}
                    {col.sub && (
                      <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-wide text-green-600">
                        {col.sub}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.feature}
                  className={`border-b border-[#e4e4e7] ${i % 2 === 0 ? "bg-[#fafafa]" : "bg-white"}`}
                >
                  <td className="p-4 text-sm font-medium text-[#3f3f46]">
                    {row.feature}
                  </td>
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`p-4 text-center ${col.key === "pro" ? "bg-[#f0fdf4]" : ""}`}
                    >
                      <Cell value={row[col.key]} pro={col.key === "pro"} />
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="p-5" />
                {[
                  { label: "Commencer", variant: "outline" },
                  { label: "Choisir PRO", variant: "solid" },
                  { label: "Business", variant: "outline" },
                  { label: "Contacter", variant: "outline" },
                ].map((btn, i) => (
                  <td key={i} className={`p-5 text-center ${i === 1 ? "bg-[#f0fdf4]" : ""}`}>
                    <button
                      type="button"
                      className={`rounded-full px-5 py-2.5 text-sm font-bold ${
                        btn.variant === "solid"
                          ? "bg-green-600 text-white"
                          : "border-2 border-green-600 text-green-600"
                      }`}
                    >
                      {btn.label}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </Reveal>
      </Container>
    </section>
  );
}
