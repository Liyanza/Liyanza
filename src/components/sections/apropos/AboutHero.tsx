import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";

export function AboutHero() {
  return (
    <section className="bg-[#fffbfb] py-20">
      <Container className="mx-auto max-w-3xl text-center">
        <SectionEyebrow variant="pill" tone="orange">À propos de KIYANZA</SectionEyebrow>
        <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight text-black sm:text-6xl">
          Nous rendons le marketing
          <br />
          <span className="text-orange-500">lisible par tous</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-black/45">
          KIYANZA est né d&apos;une conviction simple : chaque équipe
          marketing mérite des outils qui transforment ses données en
          avantages concurrentiels réels, sans barrière de complexité.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/inscription"
            className="flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-green-accent-dark"
          >
            Essayer gratuitement
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
          <a
            href="#equipe"
            className="rounded-full border-2 border-green-accent-dark px-6 py-3 text-sm font-semibold text-green-accent-dark transition hover:bg-green-accent/5"
          >
            Voir l&apos;équipe
          </a>
        </div>
      </Container>
    </section>
  );
}
