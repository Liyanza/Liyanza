import { Link } from "@/i18n/navigation";
import { Eye, Search, Trash2 } from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { LiveMockup } from "@/components/motion/LiveMockup";
import { CountUp } from "@/components/motion/CountUp";
import { getMessages } from "@/i18n/server";

type Status = "running" | "planned" | "done";

/** Données visuelles de chaque ligne (noms et budgets : features.table.rows). */
interface Row {
  status: Status;
  channels: React.ReactNode;
  roi: string;
  roiColor: string;
}

const statusStyles: Record<Status, string> = {
  running: "bg-green-accent text-white",
  planned: "bg-blue-500 text-white",
  done: "bg-slate-400 text-white",
};

const rowStyles: Row[] = [
  {
    status: "running",
    channels: (
      <span className="flex size-4 items-center justify-center rounded-full bg-black text-white">
        <FaTiktok className="size-2.5" aria-hidden="true" />
      </span>
    ),
    roi: "+38%",
    roiColor: "text-green-accent",
  },
  {
    status: "planned",
    channels: <FaFacebook className="size-4 text-[#1877f2]" aria-hidden="true" />,
    roi: "+23%",
    roiColor: "text-blue-500",
  },
  {
    status: "running",
    channels: <FaInstagram className="size-4 text-[#E4405F]" aria-hidden="true" />,
    roi: "+27%",
    roiColor: "text-green-accent",
  },
  {
    status: "done",
    channels: (
      <span className="flex items-center gap-1.5">
        <FcGoogle className="size-4" aria-hidden="true" />
        <FaWhatsapp className="size-4 text-[#25d366]" aria-hidden="true" />
      </span>
    ),
    roi: "+18%",
    roiColor: "text-gray-text-light",
  },
];

export async function CampaignsTableSection() {
  const t = (await getMessages("features")).table;
  const rows = rowStyles.map((row, i) => ({ ...row, ...t.rows[i] }));

  return (
    <section id="gestion-campagnes" className="scroll-mt-40 bg-white py-20">
      <Container>
        <Reveal stagger>
          <div data-reveal-item>
            <SectionEyebrow variant="pill" tone="orange">{t.eyebrow}</SectionEyebrow>
          </div>
          <h2 data-reveal-item className="mt-5 text-4xl font-bold leading-10 text-black">
            {t.title}
          </h2>
          <p data-reveal-item className="mt-3 max-w-lg text-sm leading-5 text-gray-text">
            {t.text}
          </p>
        </Reveal>

        <LiveMockup className="mt-10 overflow-hidden rounded-2xl border border-border-light bg-white shadow-[0_6px_15px_-4px_rgba(0,0,0,0.1)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-light px-5 py-3.5">
            <div className="flex items-center gap-2 rounded-full border border-border bg-slate-50 px-3 py-2">
              <Search className="size-3.5 text-gray-text-light" aria-hidden="true" />
              <span className="text-sm text-gray-text">
                {t.search}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {t.actions.map(
                (label) => (
                  <Link
                    href="/connexion"
                    key={label}
                    className="inline-block rounded-full border border-border px-3 py-1.5 text-xs font-medium text-gray-text hover:bg-slate-50"
                  >
                    {label}
                  </Link>
                )
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-bold uppercase tracking-wide text-gray-text-light">
                  {t.columns.map((col) => (
                    <th key={col} className="px-5 py-3">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.name} data-live="item" className="border-t border-slate-50">
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-black">{row.name}</p>
                      <p className="text-xs text-gray-text-light">{t.campaignLabel}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[row.status]}`}
                      >
                        <span className="size-1.5 rounded-full bg-white/80" />
                        {t.status[row.status]}
                      </span>
                    </td>
                    <td className="px-5 py-4">{row.channels}</td>
                    <td className="px-5 py-4 text-sm font-semibold text-black">
                      {row.budget}
                    </td>
                    <td className={`px-5 py-4 text-sm font-bold ${row.roiColor}`}>
                      <CountUp value={row.roi} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3 text-gray-text">
                        <Eye className="size-4" aria-hidden="true" />
                        <Trash2 className="size-4" aria-hidden="true" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-border-light px-5 py-3.5">
            <p className="text-xs text-gray-text-light">
              {t.footer}
            </p>
            <Link
              href="/connexion" className="text-xs font-semibold text-green-accent">
              {t.seeAll}
            </Link>
          </div>
        </LiveMockup>
      </Container>
    </section>
  );
}
