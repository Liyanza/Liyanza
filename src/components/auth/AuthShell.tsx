import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/Logo";
import { SecurityNote } from "@/components/auth/SecurityNote";
import { BrandVisual } from "@/components/auth/BrandVisual";

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
    <div className="flex min-h-screen w-full bg-white">
      <div className="relative hidden w-full max-w-[560px] shrink-0 flex-col justify-between overflow-hidden bg-gradient-to-b from-green-accent-dark to-green-600 p-12 lg:flex">
        <div>
          <Logo variant="dark" />
        </div>

        <div className="max-w-sm">
          <h1 className="text-4xl font-black leading-tight text-white">
            {brandHeading}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            {brandParagraph}
          </p>
          <BrandVisual />
        </div>

        <SecurityNote />
      </div>

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
  );
}
