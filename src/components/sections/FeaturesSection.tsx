import { ArrowRight, BarChart3, BookOpen, Cloud, Target } from "lucide-react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";
import { FeatureCard, SocialIconCircle } from "@/components/ui/FeatureCard";

export function FeaturesSection() {
  return (
    <section
      id="fonctionnalites"
      className="bg-gradient-to-b from-slate-50 to-white py-24"
    >
      <Container>
        <div className="text-center">
          <SectionEyebrow variant="pill">Pourquoi KIYANZA ?</SectionEyebrow>
          <h2 className="mt-3 text-3xl font-extrabold text-black sm:text-4xl">
            Des outils puissants, une seule plateforme
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm font-medium text-gray-text">
            Tout ce dont vous avez besoin pour réussir vos stratégies de
            communication.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<Target className="size-5 text-white" aria-hidden="true" />}
            iconBg="bg-green-600"
            number="01"
            numberColor="text-green-accent"
            title="Créez en toute confiance"
            description="Définissez votre stratégie et simulez différents scénarios avant de lancer votre campagne."
          >
            <div className="rounded-xl border border-border-light p-3">
              <div className="flex items-center gap-1.5">
                <span
                  className="size-2 rounded-full bg-green-accent"
                  aria-hidden="true"
                />
                <span className="text-xs font-semibold text-black">
                  Nouvelle campagne
                </span>
              </div>
              <dl className="mt-2 divide-y divide-[#f9fafb] text-xs">
                <div className="flex items-center justify-between py-1.5">
                  <dt className="text-gray-text-light">Objectif :</dt>
                  <dd className="font-medium text-black">Notoriété</dd>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <dt className="text-gray-text-light">Budget :</dt>
                  <dd className="font-medium text-black">500 000 FCFA</dd>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <dt className="text-gray-text-light">Audience :</dt>
                  <dd className="font-medium text-black">25 – 45 ans</dd>
                </div>
              </dl>
              <div className="mt-2 flex justify-end">
                <span className="flex size-6 items-center justify-center rounded-full bg-green-600 text-white">
                  <ArrowRight className="size-3" aria-hidden="true" />
                </span>
              </div>
            </div>
          </FeatureCard>

          <FeatureCard
            icon={<BarChart3 className="size-5 text-white" aria-hidden="true" />}
            iconBg="bg-blue-500"
            number="02"
            numberColor="text-blue-500"
            title="Comprenez vos résultats"
            description="Analysez vos performances et identifiez rapidement ce qui mérite votre attention."
          >
            <div className="rounded-xl border border-border-light p-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-navy">
                  Performances en temps réel
                </span>
                <span className="text-[10px] font-bold text-green-accent">
                  +22%
                </span>
              </div>
              <svg
                viewBox="0 0 216 32"
                className="mt-2 h-8 w-full"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <polyline
                  points="0,28 40,22 80,24 120,10 160,14 216,4"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="mt-3 flex items-center justify-center gap-2">
                <SocialIconCircle>
                  <FaFacebook className="text-[#1877f2]" aria-hidden="true" />
                </SocialIconCircle>
                <SocialIconCircle>
                  <FaInstagram className="text-[#E4405F]" aria-hidden="true" />
                </SocialIconCircle>
                <SocialIconCircle>
                  <FcGoogle aria-hidden="true" />
                </SocialIconCircle>
                <SocialIconCircle>
                  <FaWhatsapp className="text-[#25D366]" aria-hidden="true" />
                </SocialIconCircle>
              </div>
            </div>
          </FeatureCard>

          <FeatureCard
            icon={<Cloud className="size-5 text-white" aria-hidden="true" />}
            iconBg="bg-orange-500"
            number="03"
            numberColor="text-orange-500"
            title="Décidez avec l'IA"
            description="Recevez des recommandations personnalisées pour optimiser vos campagnes et vos investissements."
          >
            <div className="rounded-xl border border-border-light p-3">
              <div className="rounded-lg bg-orange-50 p-2">
                <p className="text-[11px] font-semibold text-black">
                  Recommandation IA
                </p>
                <p className="mt-0.5 text-[10px] leading-snug text-gray-text">
                  Augmentez votre budget sur WhatsApp et réduisez sur
                  Instagram.
                </p>
              </div>
              <p className="mt-2 text-center text-xs font-bold text-green-accent">
                +28% de conversions
              </p>
            </div>
          </FeatureCard>

          <FeatureCard
            icon={<Cloud className="size-5 text-white" aria-hidden="true" />}
            iconBg="bg-blue-500"
            number="04"
            numberColor="text-[#3b82f6]"
            title="Gardez le contrôle"
            description="Suivez l'exécution de vos campagnes radio et terrain depuis un seul endroit."
          >
            <div className="flex flex-col items-center gap-2 rounded-xl border border-border-light p-3 text-center">
              <span className="flex size-8 items-center justify-center rounded-full bg-border-light">
                <BookOpen className="size-4 text-blue-500" aria-hidden="true" />
              </span>
              <p className="text-[11px] font-semibold text-black">
                Rapport de conformité
              </p>
              <button
                type="button"
                className="w-full rounded-full border-2 border-blue-500 py-1.5 text-[10px] font-semibold text-blue-500 transition hover:bg-blue-500/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                Télécharger PDF
              </button>
            </div>
          </FeatureCard>
        </div>
      </Container>
    </section>
  );
}
