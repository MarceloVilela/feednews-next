import React, { useState } from 'react'
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { useQuery } from 'react-query';

import api from 'services/api';
import Loading from 'components/Loading';

import originsJson from '../../assets/json/tech/origins.json';
const origins = originsJson.origins;

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
  link: string
  title: string
  thumb: string
  created_at: string
}

const fetcher = (url: string) => fetch(`/api/game/news?url=${url}`).then((res) => res.json())

export default function News(props: NewsProps) {
  const location = useRouter();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<Content>({} as Content);
  const [url, setUrl] = useState('');
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

  //return ( <p>{JSON.stringify(props.data, null, 2)}</p> );
  if (isLoading) return <Loading />;
  if (!articles) return null;
  //console.log(articles);

  return (
    <>
      <Head><title>List {url ? `| ${url}` : `| Recentes`}</title></Head>

      {/*<pre>{JSON.stringify(props.data.data, null, 2)}</pre>*/}
      {/*<pre>{JSON.stringify(articles, null, 2)}</pre>*/}

      <section className="flex flex-row flex-wrap gap-2 mb-16">
        <button
          className="hover:bg-yellow-500 bg-yellow-400 text-black text-sm px-4 py-1 rounded-md cursor-pointer hidden"
          onClick={() => setUrl('')}
        >Recentes</button>
        {origins.length > 0 && origins.map(({url, title}) => (
          <button
            key={url}
            className="hover:bg-yellow-500 bg-yellow-400 text-black text-sm px-4 py-1 rounded-md cursor-pointer"
            onClick={() => setUrl(url)}
          >{title}</button>
        ))}
      </section>

      <section className="flex flex-col gap-8 mb-16">
        {articles.posts && articles.posts.length > 0 && articles.posts.map((detail, key) => (
          <article id={`${key}`} key={`item-${key}`}>
            <a href={detail.link}>
              <h2 className="text-md">{detail.title}</h2>
              <span className="flex flex-wrap text-sm text-gray-400">{detail.link}</span>
            </a>
          </article>
        ))}
      </section>

      {/* grid max-w-sm lg:max-w-none- */}
      <section className="sm:grid-cols-2 lg:grid-cols-3 gap-4 hidden">
        {articles.posts && articles.posts.length > 0 && articles.posts.map((detail, key) => (
          <article className="grid grid-rows-2 gap-2 overflow-hidden-" id={`${key}`} key={`card-${key}`}>
            <img src={detail.thumb} alt={'Thumb'}
              className="w-max-[320px] w-auto- max-h-44- static- opacity-20 aspect-video flex-1"
            />

            <footer className="flex flex-col flex-1 overflow-hidden">
              <h2 className="text-md">{detail.title}</h2>
              <a href={detail.link}>
                <span className="flex flex-wrap mb-8 text-sm text-gray-400">{detail.link}</span>
              </a>
            </footer>
          </article>
        ))}
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const url = 'enemy';
    //console.table(['game:index', 'getStaticProps:start', api.defaults.baseURL+`/api/game/news?url=${url}`]);
    const { data } = await api.get(`/api/game/news?url=${url}`);

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