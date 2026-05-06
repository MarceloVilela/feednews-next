import React, { useContext, useMemo, useState } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useQuery } from "react-query";

//import api from 'services/api';
import Loading from "components/Loading";
import MenuButton from "components/ArticleMenu/MenuButton";
import ArticleCardWithImage from "components/Article/ArticleCardShadcn";
import originsJson from "../../assets/json/tech/origins";
import { SettingsContext } from "hooks/settings";

export interface RouteParams {
  slug: string;
}

export interface NewsContentProps {
  data: Content[];
}

export interface NewsProps {
  data: {
    data: Content[];
    total: number;
  };
  slug: string;
}

export interface Content {
  id: string;
  link: string;
  title: string;
  thumb: string;
  created_at: string;
  posted_at: string;
}

const origins = originsJson.origins;
const urlInitial = "";
const fetcher = (url: string) =>
  fetch(`/api/tech/source?url=${url}`).then((res) => res.json());

export default function News(props: NewsProps) {
  const [urlState, setUrl] = useState(urlInitial);
  const { originTech: url } = useContext(SettingsContext);
  const urlMemo = useMemo(() => {
    const found = origins.filter(({ title }) => title === props.slug)[0];
    return found?.url || "";
  }, [props.slug]);

  const { data: articles, isLoading } = useQuery<NewsContentProps>(
    [urlMemo],
    () => fetcher(urlMemo),
    {
      refetchOnWindowFocus: false,
      staleTime: 86400000,
      //placeholderData: [] as unknown as NewsContentProps,
      //placeholderData: props.data as NewsContentProps,
    },
  );

  const list = useMemo(() => {
    const items = origins.map(({ url, title, BIN_ID }) => ({
      label: title,
      id: BIN_ID,
      onClick: () => setUrl(url),
    })); //as unknown as ButtonListProps
    return [
      {
        label: "Recentes",
        id: "6092cee092cb9267d0ce0e00",
        onClick: () => setUrl(""),
      },
      ...items,
    ];
  }, []);

  return (
    <>
      <Head>
        <title>News {url ? `| ${url}` : `| Recentes`}</title>
      </Head>

      {/*<div className="my-4"><MenuButton options={list} /></div>
      <h3 className="text-white">=={url} | {JSON.stringify(props.slug, null, 2)}</h3>*/}

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {articles ? (
            <div className="my-4">
              <ArticleCardWithImage articles={articles.data} />
            </div>
          ) : null}
        </>
      )}
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log("Tech:getStaticProps", params);
  const { slug } = params as unknown as RouteParams;
  try {
    //const { data } = await api.get(`/api/tech/source?url=${urlInitial}`);

    return {
      props: { data: { data: [], total: 0 }, slug },
      revalidate: 60 * 60 * 2, //2 hours
    };
  } catch (error) {
    return { props: { data: [], slug } };
  }
};

export async function getStaticPaths() {
  const paths = origins.map((origin) => ({
    params: { slug: origin.title },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}
