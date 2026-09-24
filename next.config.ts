import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // La mise en page racine vit sous app/[lang] : les adresses hors de toute
    // route sont servies par app/global-not-found.tsx.
    globalNotFound: true,
  },
};

export default nextConfig;
