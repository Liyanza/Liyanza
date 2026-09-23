"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Globe, Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";

const links = [
  { label: "Accueil", href: "/" },
  { label: "Fonctionnalités", href: "/fonctionnalites" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "Ressources", href: "/ressources" },
  { label: "À propos", href: "/a-propos" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border-light bg-white/90 backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="shrink-0" aria-label="KIYANZA — Accueil">
          <Logo />
        </Link>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Navigation principale"
        >
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm font-semibold transition-colors hover:text-green-accent-dark ${
                  active
                    ? "border-b-2 border-green-600 pb-0.5 text-green-600"
                    : "text-black"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-black transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent"
            aria-label="Changer de langue, actuellement Français"
          >
            <Globe className="size-4" aria-hidden="true" />
            FR
            <ChevronDown className="size-4" aria-hidden="true" />
          </button>
          <Button variant="outline" size="sm" href="/connexion">
            Se connecter
          </Button>
          <Button
            variant="solid"
            size="sm"
            href="/inscription"
            icon={<ArrowRight className="size-4" aria-hidden="true" />}
          >
            Essayer gratuitement
          </Button>
        </div>

        <button
          type="button"
          className="relative inline-flex size-10 items-center justify-center rounded-lg text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent lg:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Menu
            className={`absolute size-6 transition duration-300 ease-[var(--ease-out)] ${
              open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
            }`}
            aria-hidden="true"
          />
          <X
            className={`absolute size-6 transition duration-300 ease-[var(--ease-out)] ${
              open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
            }`}
            aria-hidden="true"
          />
        </button>
      </Container>

      {/* Always mounted so it can animate out; `invisible` keeps it out of the
          tab order and accessibility tree while closed. */}
      <div
        className={`absolute inset-x-0 top-full border-y border-border-light bg-white shadow-lg transition-[opacity,transform,visibility] duration-300 ease-[var(--ease-out)] lg:hidden ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <Container className="flex flex-col gap-4 py-6">
          <nav
            className="flex flex-col gap-4"
            aria-label="Navigation principale mobile"
          >
            {links.map((link, i) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  style={{ transitionDelay: open ? `${80 + i * 40}ms` : "0ms" }}
                  className={`text-sm font-semibold transition-[opacity,transform] duration-300 ease-[var(--ease-out)] ${
                    active ? "text-green-600" : "text-black"
                  } ${open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"}`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex flex-col gap-3 pt-2">
            <Button variant="outline" size="sm" href="/connexion">
              Se connecter
            </Button>
            <Button
              variant="solid"
              size="sm"
              href="/inscription"
              icon={<ArrowRight className="size-4" aria-hidden="true" />}
            >
              Essayer gratuitement
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}
