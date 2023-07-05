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
  thumb: string,
}

interface ArticleCardWithImageProps {
  articles: ArticlePreviewData[]
}

export default function ArticleCardWithImage({articles}: ArticleCardWithImageProps){
  
  useEffect(() => {
    //initTE({ Ripple });
  }, []);

  const _articles = useMemo(() => {
    //return [...new Set(articles)];
    return articles.filter((value, index, self) => 
      self.findIndex(v => v['id'] === value['id']) === index
    );
  }, [articles])

  if (!articles || articles.length === 0 || articles[0].title == '') {
    return <div></div>
  }

  //sm:grid-cols-2 lg:grid-cols-3
  return (
    <>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {_articles.map(({title, link, id, thumb}, key) => (
      <div
        key={id}
        className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <a 
          href={link} 
          target="_blank"
          className="grid justify-center"
        >
          <img
            className="rounded-t-lg aspect-video"
            //src="https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg"
            src={thumb}
            alt="" />
        </a>
        <div className="p-6">
          <h5
            className="hidden mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            {title}
          </h5>
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            {title}
          </p>
          <button
            type="button"
            className="hidden inline-block- rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            data-te-ripple-init
            data-te-ripple-color="light">
            Button
          </button>
        </div>
      </div>
    ))}
    </div>
    </>
  );
}