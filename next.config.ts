import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serveur Node autonome (.next/standalone) pour l'image Docker déployée sur
  // AWS — voir Dockerfile et docs/deploiement-aws.md.
  output: "standalone",
  experimental: {
    // La mise en page racine vit sous app/[lang] : les adresses hors de toute
    // route sont servies par app/global-not-found.tsx.
    globalNotFound: true,
  },
};

export default nextConfig;
