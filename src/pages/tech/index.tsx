import React, { useMemo, useState } from 'react'
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useQuery } from 'react-query';

import api from 'services/api';
import Loading from 'components/Loading';
import MenuButton from 'components/ArticleMenu/MenuButton';
import ArticleCardWithImage from 'components/Article/ArticleCard';
import originsJson from '../../assets/json/tech/origins.json';

export interface NewsContentProps {
  data: Content[]
}

export interface NewsProps {
  data: {
    data: Content[]
    total: number
  }
}

export interface Content {
  id: string
  link: string
  title: string
  thumb: string
  created_at: string
  posted_at: string
}

const origins = originsJson.origins;
const urlInitial = ''
const fetcher = (url: string) => fetch(`/api/tech/source?url=${url}`).then((res) => res.json())

export default function News(props: NewsProps) {
  const [url, setUrl] = useState(urlInitial);

  const { data: articles, isLoading } = useQuery<NewsContentProps>(
    [url],
    () => fetcher(url),
    {
      refetchOnWindowFocus: false,
      staleTime: 86400000,
      placeholderData: [] as unknown as NewsContentProps,
      //placeholderData: props.data as NewsContentProps,
    },
  );

  const list = useMemo(() => {
    const items = origins.map(({ url, title, BIN_ID }) => ({
      label: title, id: BIN_ID, onClick: () => setUrl(url)
    })) //as unknown as ButtonListProps
    return [
      {label: 'Recentes', id: '6092cee092cb9267d0ce0e00', onClick: () => setUrl('')},
      ...items,
    ]
  }, [])

  if (isLoading) return <Loading />;
  if (!articles) return null;

  return (
    <>
      <Head><title>News {url ? `| ${url}` : `| Recentes`}</title></Head>

      <div className="my-4"><MenuButton options={list}/></div>

      <div className="my-4"><ArticleCardWithImage articles={articles.data} /></div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data } = await api.get(`/api/tech/source?url=${urlInitial}`);

    return {
      props: { data },
      revalidate: 60 * 60 * 2 //2 hours
    }
  } catch (error) {
    return { props: { data: [] } }
  }
}