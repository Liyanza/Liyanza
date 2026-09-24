import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/Logo";
import { FooterColumn } from "@/components/ui/FooterColumn";
import { getMessages } from "@/i18n/server";
import { fill } from "@/i18n/format";

export async function Footer() {
  const t = (await getMessages("common")).footer;
  const l = t.links;
  const columns = [
    {
      title: t.columns.product,
      links: [
        { label: l.features, href: "/fonctionnalites" },
        { label: l.pricing, href: "/tarifs" },
        l.aiScenarios,
        l.updates,
      ],
    },
    { title: t.columns.resources, links: [l.blog, l.guides, l.caseStudies, l.helpCenter] },
    { title: t.columns.company, links: [{ label: l.about, href: "/a-propos" }, l.contact] },
    {
      title: t.columns.legal,
      links: [
        { label: l.terms, href: "/conditions-utilisation" },
        { label: l.privacy, href: "/politique-confidentialite" },
        { label: l.dataDeletion, href: "/suppression-des-donnees" },
        l.legalNotice,
        l.cookies,
      ],
    },
  ];

  return (
    <footer className="bg-footer-bg pb-10 pt-14">
      <Container>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div className="lg:col-span-1">
            <Logo variant="dark" />
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-[#dadfe5]">{t.tagline}</p>
          </div>

          {columns.map((col) => (
            <FooterColumn key={col.title} title={col.title} links={col.links} />
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-8 border-t border-navy/60 pt-8 sm:flex-row sm:items-center">
          <div className="w-full max-w-sm">
            <p className="text-xs text-[#3d5a80]">{t.newsletter.title}</p>
            <p className="mt-1 text-xs text-[#3d5a80]">{t.newsletter.text}</p>
            <form className="mt-3 flex items-center gap-2" action="#">
              <label htmlFor="newsletter-email" className="sr-only">
                {t.newsletter.emailLabel}
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder={t.newsletter.placeholder}
                className="w-full max-w-[254px] rounded-full border-2 border-[#1a3460] bg-navy px-5 py-2 text-xs text-white placeholder:text-[#3d5a80] focus:outline-none focus-visible:ring-2 focus-visible:ring-green-accent"
              />
              <button
                type="submit"
                aria-label={t.newsletter.submit}
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-green-accent text-white transition hover:bg-green-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent focus-visible:ring-offset-2 focus-visible:ring-offset-footer-bg"
              >
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </button>
            </form>
          </div>

          <p className="text-xs text-[#3d5a80]">{fill(t.copyright, { year: new Date().getFullYear() })}</p>
        </div>
      </Container>
    </footer>
  );
}
