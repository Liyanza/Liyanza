import { CircleCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { getMessages } from "@/i18n/server";

type Cell = boolean | "limited";

/** Disponibilité par formule (libellés des lignes : pricing.comparison.features). */
interface Row {
  free: Cell;
  pro: Cell;
  business: Cell;
  enterprise: Cell;
}

const availability: Row[] = [
  { free: true, pro: true, business: true, enterprise: true },
  { free: true, pro: true, business: true, enterprise: true },
  { free: true, pro: true, business: true, enterprise: true },
  { free: true, pro: true, business: true, enterprise: true },
  { free: false, pro: true, business: true, enterprise: true },
  { free: "limited", pro: true, business: true, enterprise: true },
  { free: false, pro: true, business: true, enterprise: true },
  { free: false, pro: true, business: true, enterprise: true },
  { free: false, pro: false, business: true, enterprise: true },
  { free: false, pro: false, business: true, enterprise: true },
  { free: false, pro: true, business: true, enterprise: true },
  { free: false, pro: false, business: true, enterprise: true },
  { free: false, pro: false, business: false, enterprise: true },
  { free: false, pro: false, business: false, enterprise: true },
];

const columns: { key: keyof Row; label: string; recommended?: boolean }[] = [
  { key: "free", label: "FREE" },
  { key: "pro", label: "PRO", recommended: true },
  { key: "business", label: "BUSINESS" },
  { key: "enterprise", label: "ENTERPRISE" },
];

function Cell({ value, labels }: { value: Cell; labels: { limited: string; included: string; notIncluded: string } }) {
  if (value === "limited") {
    return (
      <span className="border border-[#e4e4e7] bg-zinc-100 px-2.5 py-1 text-[10px] font-semibold text-gray-text">
        {labels.limited}
      </span>
    );
  }
  // Icône décorative : le libellé reste lisible par les lecteurs d'écran.
  if (value) {
    return (
      <>
        <CircleCheck className="mx-auto size-4 text-green-accent-dark" aria-hidden="true" />
        <span className="sr-only">{labels.included}</span>
      </>
    );
  }
  return (
    <>
      <span className="mx-auto block h-px w-1.5 bg-[#d4d4d8]" aria-hidden="true" />
      <span className="sr-only">{labels.notIncluded}</span>
    </>
  );
}

export async function ComparisonTable() {
  const t = (await getMessages("pricing")).comparison;
  const rows = availability.map((row, i) => ({ ...row, feature: t.features[i] }));

  return (
    <section className="bg-white py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionEyebrow variant="pill" tone="orange">{t.eyebrow}</SectionEyebrow>
          <h2 className="mt-5 text-4xl font-extrabold text-black sm:text-5xl">
            {t.title}
          </h2>
          <p className="mt-3 text-base text-gray-text">
            {t.text}
          </p>
        </Reveal>

        <Reveal className="mt-14 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse">
            <thead>
              <tr>
                <th className="border-b border-black p-4 text-left text-sm font-bold text-black">
                  {t.featureColumn}
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
                    {col.recommended && (
                      <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-wide text-green-600">
                        {t.recommended}
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
                      <Cell value={row[col.key]} labels={t} />
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="p-5" />
                {t.buttons.map((label, i) => ({ label, variant: i === 1 ? "solid" : "outline" })).map((btn, i) => (
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
