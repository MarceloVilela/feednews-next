import React, { useMemo } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useQuery } from "react-query";

import api from "services/api";
import Loading from "components/Loading";
import ArticleCardWithImage from "components/Article/ArticleCardShadcn";
import originsJson from "../../assets/json/tech/origins";

export interface RouteParams {
  slug: string;
}

export interface NewsContentProps {
  data: Content[];
}

export interface NewsProps {
  data: Content[];
  total: number;
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
  const urlMemo = useMemo(() => {
    const found = origins.filter(({ title }) => title === props.slug)[0];
    return found?.url || "";
  }, [props.slug]);

  const { data: articles, isLoading } = useQuery<NewsContentProps>(
    [urlMemo],
    () => fetcher(urlMemo),
    {
      refetchOnWindowFocus: false,
      staleTime: 60 * 60 * 2, //2 hours,
      initialData: props.total ? (props as NewsContentProps) : undefined,
    },
  );

  return (
    <>
      <Head>
        <title>{`News | ${props.slug ? props.slug : ""}`}</title>
      </Head>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {articles ? (
            <div className="my-4 border-blue-400 border-">
              <ArticleCardWithImage articles={articles.data} />
            </div>
          ) : null}
        </>
      )}
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as unknown as RouteParams;
  try {
    const { data } = await api.get(`/api/tech/source?url=${slug}`);

    return {
      props: { data: data.data, total: data.total, slug },
      revalidate: 60 * 60 * 24, //24 hours
    };
  } catch (error) {
    return { props: { data: [], total: 0, slug } };
  }
};

export async function getStaticPaths() {
  const paths = origins.slice(0, 1).map((origin) => ({
    params: { slug: origin.title },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}
