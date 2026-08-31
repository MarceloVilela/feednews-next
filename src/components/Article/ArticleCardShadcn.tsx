"use client";

import { PlaylistItem as Item } from "../Card";
import { useMemo } from "react";

interface ArticlePreviewData {
  title: string;
  id: string;
  link: string;
  thumb: string;
}

interface ArticleCardProps {
  articles: ArticlePreviewData[];
}

export default function ArticleCardShadcn({ articles }: ArticleCardProps) {
  const _articles = useMemo(() => {
    if (typeof articles != "object") {
      return [];
    }
    return articles.filter(
      (value, index, self) =>
        self.findIndex((v) => v["id"] === value["id"]) === index,
    );
  }, [articles]);

  const handleOpenTab = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  if (!articles || articles.length === 0 || articles[0].title == "") {
    return <div></div>;
  }

  return (
    <>
      <div className="grid sm:grid-cols-2- lg:grid-cols-3- gap-4 px-0 sm:px-4">
        {_articles.map(({ title, link, thumb, id }) => (
          <Item
            key={id}
            onClick={() => handleOpenTab(link)}
            item={{ title, image: thumb, artist: link }}
          />
        ))}
      </div>
    </>
  );
}
