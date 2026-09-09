import { sources } from "scraping/tech";
import { getFeedContent } from "scraping/getFeedContent";
import ArticleCardShadcn from "components/Article/ArticleCardShadcn";
import originsJson from "assets/json/tech/origins";
import { Content } from "types/feed";

const origins = originsJson.origins;

export async function getTechContent(slug: string): Promise<Content[]> {
  return getFeedContent(sources, origins, slug);
}

export async function TechFeed({ slug }: { slug: string }) {
  const data = await getTechContent(slug);

  // borda de debug desativada de propósito — reativar trocando "my-4" por
  // "my-4 border-blue-400 border"
  return (
    <div className="my-4">
      <ArticleCardShadcn articles={data} />
    </div>
  );
}
