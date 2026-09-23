"use client";

import { Check, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";

export function NewsletterSection() {
  return (
    <section className="border-t border-[#e4e4e7] bg-[#fafafa] py-20">
      <Container>
        <Reveal className="grid grid-cols-1 overflow-hidden border border-[#e4e4e7] lg:grid-cols-2">
          <div className="flex flex-col justify-center rounded-[5px] bg-white p-10 sm:p-12">
            <SectionEyebrow variant="pill" tone="orange" className="w-fit">Newsletter</SectionEyebrow>
            <h2 className="mt-6 text-3xl font-black leading-tight text-black">
              Restez informé des dernières ressources
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#71717a]">
              Recevez chaque semaine les nouveaux guides, articles et
              conseils directement dans votre boîte mail.
            </p>
          </div>

          <div className="flex flex-col justify-center bg-[#fafafa] p-10 sm:p-12">
            <form
              className="flex items-stretch border border-[#e4e4e7]"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex-1 rounded-[5px] bg-white px-4 py-3.5">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="w-full text-sm text-black placeholder:text-black/50 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="shrink-0 bg-green-accent-dark px-6 py-3.5 text-sm font-bold text-white transition hover:brightness-110"
              >
                S&apos;inscrire
              </button>
            </form>
            <p className="mt-3 flex items-center gap-2 text-xs text-[#a1a1aa]">
              <Check className="size-3.5 text-green-accent-dark" aria-hidden="true" />
              Désinscription à tout moment · Pas de spam
            </p>

            <div className="mt-6 flex items-center gap-3 border-t border-[#e4e4e7] pt-6">
              <div className="flex gap-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-3.5 fill-green-accent-dark text-green-accent-dark"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="text-xs text-[#71717a]">
                Apprécié par + de 500 marketeurs
              </span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
