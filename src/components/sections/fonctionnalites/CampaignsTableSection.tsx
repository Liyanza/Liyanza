import { Eye, Search, Trash2 } from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";

interface Row {
  name: string;
  status: "En cours" | "Planifiée" | "Terminée";
  channels: React.ReactNode;
  budget: string;
  roi: string;
  roiColor: string;
}

const statusStyles: Record<Row["status"], string> = {
  "En cours": "bg-green-accent text-white",
  "Planifiée": "bg-blue-500 text-white",
  "Terminée": "bg-slate-400 text-white",
};

const rows: Row[] = [
  {
    name: "Promo Orange Money",
    status: "En cours",
    channels: (
      <span className="flex size-4 items-center justify-center rounded-full bg-black text-white">
        <FaTiktok className="size-2.5" aria-hidden="true" />
      </span>
    ),
    budget: "500 000 FCFA",
    roi: "+38%",
    roiColor: "text-green-accent",
  },
  {
    name: "Vente spéciale",
    status: "Planifiée",
    channels: <FaFacebook className="size-4 text-[#1877f2]" aria-hidden="true" />,
    budget: "75 000 FCFA",
    roi: "+23%",
    roiColor: "text-blue-500",
  },
  {
    name: "Lancement produit",
    status: "En cours",
    channels: <FaInstagram className="size-4 text-[#E4405F]" aria-hidden="true" />,
    budget: "70 000 FCFA",
    roi: "+27%",
    roiColor: "text-green-accent",
  },
  {
    name: "Fidélisation clients",
    status: "Terminée",
    channels: (
      <span className="flex items-center gap-1.5">
        <FcGoogle className="size-4" aria-hidden="true" />
        <FaWhatsapp className="size-4 text-[#25d366]" aria-hidden="true" />
      </span>
    ),
    budget: "50 000 FCFA",
    roi: "+18%",
    roiColor: "text-gray-text-light",
  },
];

export function CampaignsTableSection() {
  return (
    <section id="gestion-campagnes" className="scroll-mt-40 bg-white py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow variant="pill">03 · Gestion des Campagnes</SectionEyebrow>
          <h2 className="mt-5 text-4xl font-extrabold text-black">
            Centralisez toutes vos campagnes
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-gray-text">
            Retrouvez toutes vos campagnes au même endroit et suivez leur
            statut, leur budget et leurs performances.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-border-light bg-white shadow-[0_6px_15px_-4px_rgba(0,0,0,0.1)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-light px-5 py-3.5">
            <div className="flex items-center gap-2 rounded-full border border-border bg-slate-50 px-3 py-2">
              <Search className="size-3.5 text-gray-text-light" aria-hidden="true" />
              <span className="text-sm text-gray-text">
                Rechercher une campagne…
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Filtre avancée", "Export CSV", "Monitoring complet", "Comparer périodes"].map(
                (label) => (
                  <button
                    key={label}
                    type="button"
                    className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-gray-text hover:bg-slate-50"
                  >
                    {label}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-bold uppercase tracking-wide text-gray-text-light">
                  <th className="px-5 py-3">Campagne</th>
                  <th className="px-5 py-3">Statut</th>
                  <th className="px-5 py-3">Canaux</th>
                  <th className="px-5 py-3">Budget</th>
                  <th className="px-5 py-3">ROI</th>
                  <th className="px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.name} className="border-t border-slate-50">
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-black">{row.name}</p>
                      <p className="text-xs text-gray-text-light">Campagne</p>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[row.status]}`}
                      >
                        <span className="size-1.5 rounded-full bg-white/80" />
                        {row.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">{row.channels}</td>
                    <td className="px-5 py-4 text-sm font-semibold text-black">
                      {row.budget}
                    </td>
                    <td className={`px-5 py-4 text-sm font-bold ${row.roiColor}`}>
                      {row.roi}
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
              4 campagnes · Mise à jour il y a 2 min
            </p>
            <a href="#" className="text-xs font-semibold text-green-accent">
              Voir toutes les campagnes →
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
