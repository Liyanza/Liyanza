import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/Logo";
import { FooterColumn } from "@/components/ui/FooterColumn";

const columns = [
  {
    title: "Produit",
    links: ["Fonctionnalités", "Tarifs", "Scénarios IA", "Mises à jour"],
  },
  {
    title: "Ressources",
    links: ["Blog", "Guides", "Études de cas", "Centre d'aide"],
  },
  {
    title: "Entreprise",
    links: ["À propos", "Contact"],
  },
  {
    title: "Légal",
    links: [
      { label: "Conditions d'utilisation", href: "/conditions-utilisation" },
      {
        label: "Politique de confidentialité",
        href: "/politique-confidentialite",
      },
      "Mentions légales",
      "Cookies",
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-footer-bg pb-10 pt-14">
      <Container>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div className="lg:col-span-1">
            <Logo variant="dark" />
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-[#dadfe5]">
              La plateforme intelligente qui vous aide à planifier, suivre et
              optimiser vos campagnes marketing grâce à la puissance de
              l&apos;IA.
            </p>
          </div>

          {columns.map((col) => (
            <FooterColumn key={col.title} title={col.title} links={col.links} />
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-8 border-t border-navy/60 pt-8 sm:flex-row sm:items-center">
          <div className="w-full max-w-sm">
            <p className="text-xs text-[#3d5a80]">Restez informé</p>
            <p className="mt-1 text-xs text-[#3d5a80]">
              Recevez nos conseils et nouveautés chaque semaine.
            </p>
            <form className="mt-3 flex items-center gap-2" action="#">
              <label htmlFor="newsletter-email" className="sr-only">
                Votre adresse email
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Votre email"
                className="w-full max-w-[254px] rounded-full border-2 border-[#1a3460] bg-navy px-5 py-2 text-xs text-white placeholder:text-[#3d5a80] focus:outline-none focus-visible:ring-2 focus-visible:ring-green-accent"
              />
              <button
                type="submit"
                aria-label="S'inscrire à la newsletter"
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-green-accent text-white transition hover:bg-green-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent focus-visible:ring-offset-2 focus-visible:ring-offset-footer-bg"
              >
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </button>
            </form>
          </div>

          <p className="text-xs text-[#3d5a80]">
            © 2026 Kiyanza. Tous droits réservés. Français
          </p>
        </div>
      </Container>
    </footer>
  );
}
