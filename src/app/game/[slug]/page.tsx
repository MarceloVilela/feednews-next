import { Metadata } from "next";

import { GameFeed } from "components/Feed/GameFeed";
import originsJson from "assets/json/game/origins";

const origins = originsJson.origins;

export const revalidate = 86400; // 24 horas

export async function generateStaticParams() {
  // Só a primeira origem é pré-renderizada no build para não ser exaustivo dado o número de
  // fontes; as demais renderizam sob demanda na primeira visita.
  return origins.slice(0, 1).map((origin) => ({ slug: origin.title }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: `List | ${slug}` };
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <GameFeed slug={slug} />;
}
