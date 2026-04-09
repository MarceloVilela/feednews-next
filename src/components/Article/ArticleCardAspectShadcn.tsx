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

export default function ArticleCardAspectShadcn({
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
            className="flex- grid grid-rows-2- grid-rows-[minmax(200px,_1fr)_80px]
        rounded-lg bg-white- dark:bg-neutral-700- shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]-"
          >
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className={`flex grid- justify-center items-center`}
              //bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp6k2OIz4xdsr87DU77XYze4QPaeWA4s31XQj8_f5ZIwnjbX2kUF3r1d5VPg&s')]
              style={{
                backgroundImage: `url('${thumb}'), linear-gradient(rgba(0, 0, 255, 0.5), rgba(255, 255, 0, 0.5)),`,
              }}
            >
              <img
                className="rounded-t-lg aspect-video- h-fit- w-full h-full-"
                //src="https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg"
                src={thumb}
                alt=""
              />
            </a>
            <CardContent className="items-center m-0 p-0 h-4">
              <CardDescription>
                {title}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
