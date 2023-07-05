import React, { useMemo, useState } from 'react'
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useQuery } from 'react-query';

import api from 'services/api';
import Loading from 'components/Loading';
import MenuButton from 'components/ArticleMenu/MenuButton';
import ArticleCardWithImage from 'components/Article/ArticleCardWithImage';
import originsJson from '../../assets/json/game/origins.json';

export interface NewsContentProps {
  posts: Content[]
}

export interface NewsProps {
  data: {
    posts: Content[]
    //total: number
  }
}

export interface Content {
  id: string
  link: string
  title: string
  thumb: string
  created_at: string
}

const origins = originsJson.origins;
const urlInitial = 'TheEnemy'
const fetcher = (url: string) => fetch(`/api/game/source?url=${url}`).then((res) => res.json())

export default function News(props: NewsProps) {
  const location = useRouter();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<Content>({} as Content);
  const [url, setUrl] = useState(urlInitial);
  const { data: articles, isLoading } = useQuery<NewsContentProps>(
    [url],
    () => fetcher(url),
    {
      refetchOnWindowFocus: false,
      staleTime: 86400000,
      //placeholderData: {} as NewsProps[],
      placeholderData: props.data as NewsContentProps,
    },
  );

  const list = useMemo(() => {
    const items = origins.map(({ url, title }) => ({
      label: title, id: url, onClick: () => setUrl(url)
    })) //as unknown as ButtonListProps
    return items;
  }, [origins])

  //return ( <p>{JSON.stringify(props.data, null, 2)}</p> );
  if (isLoading) return <Loading />;
  if (!articles) return null;
  //console.log(articles);

  return (
    <>
      <Head><title>List {url ? `| ${url}` : `| Recentes`}</title></Head>

      <div className="my-4"><MenuButton options={list}/></div>
      {/*<div className="my-4 hidden"><MenuDropdown options={list}/></div>*/}

      <div className="my-4"><ArticleCardWithImage articles={articles.posts} /></div>
      {/*<div className="my-4"><ArticleCard articles={articles.posts} /></div>*/}
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    //console.table(['game:index', 'getStaticProps:start', api.defaults.baseURL+`/api/game/news?url=${url}`]);
    const { data } = await api.get(`/api/game/source?url=${urlInitial}`);

    return {
      props: { data },
      revalidate: 60 * 60 * 2 //2 hours
    }
  } catch (error: any) {
    //console.table(['page:tech', 'getStaticProps:error'])
    //console.log(error.message);
    return { props: { data: [] } }
  }
}