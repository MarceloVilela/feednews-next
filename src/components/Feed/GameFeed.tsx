import { notFound } from "next/navigation";

import { sources } from "scraping/game";
import ArticleCardAspectShadcn from "components/Article/ArticleCardAspectShadcn";
import originsJson from "assets/json/game/origins";
import { Content, findOrigin } from "types/feed";

const origins = originsJson.origins;

export async function getGameContent(slug: string): Promise<Content[]> {
  // Divergência preexistente do achado #7: ao contrário do domínio tech (fallback ""), o game
  // sempre cai na primeira origem quando o slug não bate com nenhuma — preservado como estava.
  const url = findOrigin(origins, slug, origins[0].url);

  const engine = sources.find((item) =>
    item.getOriginUrl().includes(url.toLowerCase()),
  );

  if (!engine) {
    notFound();
  }

  const { posts } = await engine.getHome();

  return posts.map((post) => ({
    id: post.link ?? "",
    link: post.link ?? "",
    title: post.title ?? "",
    thumb: post.thumb ?? "",
    created_at: post.created_at ?? "",
  }));
}

export async function GameFeed({ slug }: { slug: string }) {
  const data = await getGameContent(slug);

  return (
    <div className="my-4 border-blue-400 border-">
      <ArticleCardAspectShadcn articles={data} />
    </div>
  );
}
