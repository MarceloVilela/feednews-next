import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlaylistItem as Item } from "../Card";
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

interface ArticleCardProps {
  articles: ArticlePreviewData[];
}

export default function ArticleCardShadcn({ articles }: ArticleCardProps) {
  useEffect(() => {
    //initTE({ Ripple });
  }, []);

  const _articles = useMemo(() => {
    //return articles.map(({title, id, link}) => ({ title, id: `${id}@${new Date().getTime()}`, link, }))
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
        {_articles.map(({ title, link, thumb, id }, key) => (
          <Item
            key={id}
            onClick={() => handleOpenTab(link)}
            item={{ title, image: thumb, artist: link }}
          />
        ))}
      </div>
    </>
  );

  return (
    <>
      <div className="flex flex-col gap-4">
        {_articles.map(({ title, link, id }, key) => (
          <Card
            key={id}
            className="block rounded-l p-3
             dark:bg-neutral-700- bg-white- shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
          >
            <CardTitle className="mb-2 text-md font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              {title}
            </CardTitle>
            <CardDescription>
              <a
                className="mb-4- text-sm text-neutral-600 dark:text-neutral-200"
                href={link}
              >
                {link}
              </a>
            </CardDescription>
          </Card>
        ))}
      </div>
    </>
  );
}
