import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Head from 'next/head';
import { FaMagnet, FaLink } from 'react-icons/fa';
import { toast } from 'react-toastify';

import api from 'services/api';
import delay from 'utils/delay';
import Loading from 'components/Loading';

import placeholder from '../../assets/json/magnet/detail.json';

interface LinkData {
  url: string;
  text: string;
  type: string;
}

export interface DetailData {
  links: LinkData[];
  name: string;
  thumb: string;
  engine_url: string;
  desc_link: string;
}

export default function Post() {
  const location = useRouter();
  const { url } = location.query;
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<DetailData>({} as DetailData);

  useEffect(() => {
    const setPlaceholder = async () => {
      await delay(500);
      setDetail(placeholder);
    }
    setPlaceholder();
  }, []);

  useEffect(() => {
    setLoading(false);
    setDetail(placeholder);
    return;

    const requestConfig = { params: { url } };

    const requestDetail = async () => {
      if(!url){
        return;
      }
      try {
        const { data } = await api.get('/api/magnet/detail', requestConfig);
        setDetail(data);
      } catch (error) {
        toast.error(`Erro ao buscar dados da postagem: ${url}`);
      } finally {
        setLoading(false);
      }
    };

    requestDetail();
  }, [url]);

  return (
    <>
      <Head><title>Post { detail.desc_link ? `| ${detail.name}` : ''}</title></Head>

      {(!loading && detail.links) ? (
        <article className="flex flex-row flex-wrap gap-4 overflow-hidden- pt-4-
          rounded-3xl bg-white p-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
        >
          <aside className="flex justify-center">
            <div
              className="relative"
            >
              <img src={detail.thumb} alt={'Thumb'}
                className="static"
              />
            </div>
          </aside>

          <section className="flex flex-col flex-1 min-w-[400px]">
            <h2 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">{detail.name}</h2>
            <a href={detail.desc_link}>
              <span className="flex flex-wrap mb-8 mb-4- text-sm text-neutral-600 dark:text-neutral-300">{detail.desc_link}</span>
            </a>

            <div>
              {detail.links.map(({ url, text, type }, key) => (
                <a 
                  href={url} 
                  key={key} 
                  className="flex flex-wrap break-words max-w-0 lg:max-w-5xl gap-2 align-bottom mb-4
                  text-md text-neutral-600 dark:text-neutral-100"
                >
                  {type === 'magnet' && <div className="bg-[#0d6efd] text-white rounded-full p-2"><FaMagnet /></div>}
                  {type !== 'magnet' && <div className="bg-[#6c757d] text-white rounded-full p-2"><FaLink /></div>}
                  <p className="flex items-center">{text}</p>
                </a>
              ))}
            </div>
          </section>
        </article>
      ) : <Loading />}

    </>
  )
}