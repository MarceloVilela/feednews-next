import { HeroCard as Item } from "../Card";

interface ArticlePreviewData {
  title: string;
  id: string;
  link: string;
  thumb: string;
}

interface ArticleCardWithImageProps {
  articles: ArticlePreviewData[];
}

export default function ArticleCardAspectShadcn({
  articles,
}: ArticleCardWithImageProps) {
  const _articles = typeof articles != "object" ? [] : articles;

  if (!articles || articles.length === 0 || articles[0].title == "") {
    return <div></div>;
  }

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 px-0 sm:px-4">
        {_articles.map(({ title, link, id, thumb }) => (
          <Item key={id} item={{ title, image: thumb, link }} />
        ))}
      </div>
    </>
  );
}
