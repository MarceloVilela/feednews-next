/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    // As thumbs vêm de 50+ fontes raspadas (src/assets/json/{tech,game}/origins.ts), cada uma
    // com seu próprio domínio/CDN, e a lista cresce conforme fontes são adicionadas — uma
    // whitelist manual de host por host fica obsoleta a cada fonte nova. A curadoria real já
    // acontece em sources/index.ts (só sites aprovados ali chegam a virar <Image>).
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    formats: ["image/webp"],
  },
};
