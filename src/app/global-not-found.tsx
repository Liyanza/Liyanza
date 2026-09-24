import "./globals.css";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import Link from "next/link";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "404 — KIYANZA",
  description: "Page introuvable · Page not found",
};

/**
 * 404 pour les adresses qui ne correspondent à aucune route (la mise en page
 * racine vit sous app/[lang], elle ne peut pas servir ici). La langue n'est
 * pas connue : le message est bilingue.
 */
export default function GlobalNotFound() {
  return (
    <html lang="fr" className={`${poppins.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col items-center justify-center gap-6 bg-white px-6 text-center font-sans">
        <p className="text-6xl font-extrabold text-green-accent-dark">404</p>
        <div>
          <h1 className="text-2xl font-bold text-black">Page introuvable</h1>
          <p lang="en" className="mt-1 text-lg text-black/50">Page not found</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-full bg-green-600 px-6 py-3 text-sm font-bold text-white">
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/en"
            lang="en"
            className="rounded-full border-2 border-green-600 px-6 py-3 text-sm font-bold text-green-600"
          >
            Back to home
          </Link>
        </div>
      </body>
    </html>
  );
}
