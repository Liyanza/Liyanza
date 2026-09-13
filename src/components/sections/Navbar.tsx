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
          className="inline-flex items-center justify-center rounded-lg p-2 text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent lg:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X className="size-6" aria-hidden="true" />
          ) : (
            <Menu className="size-6" aria-hidden="true" />
          )}
        </button>
      </Container>

      {open && (
        <div className="border-t border-border-light bg-white lg:hidden">
          <Container className="flex flex-col gap-4 py-6">
            <nav
              className="flex flex-col gap-4"
              aria-label="Navigation principale mobile"
            >
              {links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`text-sm font-semibold ${
                      active ? "text-green-600" : "text-black"
                    }`}
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
      )}
    </header>
  );
}
