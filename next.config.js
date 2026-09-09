/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    // As thumbs vêm de 50+ fontes raspadas (src/assets/json/{tech,game}/origins.ts), cada uma
    // com seu próprio domínio/CDN, e a lista cresce conforme fontes são adicionadas — uma
    // whitelist manual de host por host fica obsoleta a cada fonte nova. A curadoria real já
    // acontece em sources/index.ts (só sites aprovados ali chegam a virar <Image>).
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    // unoptimized: ver CLAUDE.md ("Imagens (next/image)") para o motivo — cota de Image
    // Optimization Transformations da Vercel é por time, não por projeto, e já causou 402 em
    // imagens novas aqui. remotePatterns acima fica inerte enquanto isso, mantido caso a
    // otimização seja reativada no futuro; formats: ["image/webp"] foi removido daqui por ficar
    // igualmente inerte (conversão de formato não roda com unoptimized).
    unoptimized: true,
  },
};
