import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { useEffect, useMemo, useState } from "react";
import {
  //Ripple,
  initTE,
} from "tw-elements";

//initTE({ Dropdown, Ripple });

interface ArticlePreviewData {
  title: string;
  id: string;
  link: string;
  thumb: string;
}

interface ArticleCardWithImageProps {
  articles: ArticlePreviewData[];
}

export default function ArticleCardWithImage({
  articles,
}: ArticleCardWithImageProps) {
  useEffect(() => {
    //initTE({ Ripple });
  }, []);

  const _articles = useMemo(() => {
    //return [...new Set(articles)];
    if (typeof articles != "object") {
      return [];
    }
    return articles.filter(
      (value, index, self) =>
        self.findIndex((v) => v["id"] === value["id"]) === index
    );
  }, [articles]);

  if (!articles || articles.length === 0 || articles[0].title == "") {
    return <div></div>;
  }

  //sm:grid-cols-2 lg:grid-cols-3
  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {_articles.map(({ title, link, id, thumb }, key) => (
          <Card
            key={id}
            className="grid grid-cols-2 flex- rounded-lg 
        bg-white- dark:bg-neutral-700- shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]-"
          >
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="grid- justify-center flex flex-1 items-center"
            >
              <img
                className="rounded-t-lg aspect-video- h-fit"
                //src="https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg"
                src={thumb}
                alt=""
              />
            </a>
            <CardContent className="flex flex-1 items-center m-0 p-0">
              <CardDescription className="mx-2 text-base text-neutral-600 dark:text-neutral-200">
                {title}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
