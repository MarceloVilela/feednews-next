import { sources } from "scraping/game";
import { getFeedContent } from "scraping/getFeedContent";
import ArticleCardAspectShadcn from "components/Article/ArticleCardAspectShadcn";
import originsJson from "assets/json/game/origins";
import { Content } from "types/feed";

const origins = originsJson.origins;

export async function getGameContent(slug: string): Promise<Content[]> {
  // Divergência preexistente do achado #7: ao contrário do domínio tech (fallback ""), o game
  // sempre cai na primeira origem quando o slug não bate com nenhuma — preservado como estava.
  return getFeedContent(sources, origins, slug, origins[0].url);
}

export async function GameFeed({ slug }: { slug: string }) {
  const data = await getGameContent(slug);

  // borda de debug desativada de propósito — reativar trocando "my-4" por
  // "my-4 border-blue-400 border"
  return (
    <div className="my-4">
      <ArticleCardAspectShadcn articles={data} />
    </div>
  );
}
