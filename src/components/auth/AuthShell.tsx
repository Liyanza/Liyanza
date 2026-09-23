import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/Logo";
import { SecurityNote } from "@/components/auth/SecurityNote";
import { BrandVisual } from "@/components/auth/BrandVisual";
import { HeroIntro } from "@/components/motion/HeroIntro";
import { PageTransition } from "@/components/motion/PageTransition";

export function AuthShell({
  brandHeading,
  brandParagraph,
  backVariant = "text",
  children,
}: {
  brandHeading: string;
  brandParagraph: string;
  backVariant?: "icon" | "text" | "none";
  children: ReactNode;
}) {
  return (
    <PageTransition>
      <div className="flex min-h-screen w-full bg-white">
        <HeroIntro className="relative hidden w-1/2 max-w-[767px] shrink-0 flex-col overflow-hidden bg-gradient-to-b from-green-accent-dark to-green-600 px-12 pb-12 pt-[58px] lg:flex">
          <div data-intro="badge" className="mx-auto w-full max-w-[514px]">
            <Logo variant="white" className="h-14" />
          </div>
  
          <div className="flex flex-1 flex-col justify-center pt-[58px]">
            <div className="mx-auto w-full max-w-[486px]">
              <h1 data-intro="title" className="text-4xl font-bold leading-[1.15] tracking-[-0.03em] text-white">
                {brandHeading}
              </h1>
              <p data-intro="text" className="mt-5 text-base leading-[26px] text-white/70">
                {brandParagraph}
              </p>
            </div>
            <BrandVisual />
          </div>
  
          <div data-intro="meta">
            <SecurityNote />
          </div>
        </HeroIntro>
  
        <div className="relative flex w-full flex-1 items-center justify-center px-6 py-12 sm:px-12">
          {backVariant === "icon" ? (
            <Link
              href="/"
              aria-label="Retour à l'accueil"
              className="absolute right-6 top-6 flex items-center justify-center border border-[#e4e4e7] p-3 text-black transition hover:bg-[#f4f4f5] sm:right-12 sm:top-12"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
            </Link>
          ) : backVariant === "text" ? (
            <Link
              href="/"
              className="absolute right-6 top-6 flex items-center gap-1.5 border border-[#e4e4e7] px-4 py-2 text-xs font-medium text-[#71717a] transition hover:bg-[#f4f4f5] sm:right-12 sm:top-12"
            >
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              Retour au site
            </Link>
          ) : null}
  
          <div className="w-full max-w-[420px] py-8">{children}</div>
        </div>
      </div>
    </PageTransition>
  );
}
