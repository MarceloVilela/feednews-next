import { notFound } from "next/navigation";

import { sources } from "scraping/tech";
import ArticleCardShadcn from "components/Article/ArticleCardShadcn";
import originsJson from "assets/json/tech/origins";
import { Content, findOrigin } from "types/feed";

const origins = originsJson.origins;

export async function getTechContent(slug: string): Promise<Content[]> {
  const url = findOrigin(origins, slug);

  if (!url) {
    notFound();
  }

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

export async function TechFeed({ slug }: { slug: string }) {
  const data = await getTechContent(slug);

  return (
    <div className="my-4 border-blue-400 border-">
      <ArticleCardShadcn articles={data} />
    </div>
  );
}
