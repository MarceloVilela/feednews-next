import { useEffect, useMemo, useState } from "react";
import {
  //Ripple,
  initTE,
} from "tw-elements";

//initTE({ Dropdown, Ripple });

interface ArticlePreviewData {
  title: string,
  id: string,
  link: string,
}

interface ArticleCardProps {
  articles: ArticlePreviewData[]
}

export default function ArticleCard({articles}: ArticleCardProps){
  
  useEffect(() => {
    //initTE({ Ripple });
  }, []);

  const _articles = useMemo(() => {
    //return articles.map(({title, id, link}) => ({ title, id: `${id}@${new Date().getTime()}`, link, }))
    if(typeof articles != "object"){
      return [];
    }
    return articles.filter((value, index, self) => 
      self.findIndex(v => v['id'] === value['id']) === index
    );
  }, [articles])

  if (!articles || articles.length === 0 || articles[0].title == '') {
    return <div></div>
  }

  return (
    <>
    <div className="flex flex-col gap-4">
    {_articles.map(({title, link, id}, key) => (
    <div
      key={id}
      className="block rounded-lg bg-white p-3 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
    >
      <h5
        className="mb-2 text-md font-medium leading-tight text-neutral-800 dark:text-neutral-50">
        {title}
      </h5>
      <a className="mb-4- text-sm text-neutral-600 dark:text-neutral-200" href={link}>
        {link}
      </a>
    </div>
    ))}
    </div>
    </>
  );
}