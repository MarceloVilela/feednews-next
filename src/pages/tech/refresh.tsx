import React, { useEffect, useState } from 'react';
import Head from 'next/head';
// import { Alert } from 'react-native';

import { api } from '../../services/api';

import { origins } from '../../assets/json/tech/origins.json';

interface Content {
  type: 'text' | 'video' | 'image' | 'text_highlighted';
  value: string;
  key?: number;
  content?: string;
}

interface ArticleDetails {
  link: string;
  title: string;
  thumb: string;
  created_at: Date;
  contents: Content[];
}

interface ResponseDetail {
  data: ArticleDetails;
}

interface HomePageItem {
  link: string;
  title: string;
  thumb: string;
  created_at: string;
}

interface ResponseHomePage {
  posts: HomePageItem[];
}

export default function TechNewsRefresh() {
  const [indexOrigin, setIndexOrigin] = useState(-1);

  // const [recents, setRecents] = useState([]);

  const [responseDebug, setResponseDebug] = useState([]);
  const [feedbackText, setFeedbackText] = useState('');
  const [errorMessages, setErrorMessages] = useState<String[]>([]);
  const [display, setDisplay] = useState('debug');

  useEffect(() => {
    const refresh = async () => {
      if (!origins[indexOrigin]) {
        return;
      }
      //navigation?.setOptions({
      //  title: `Refresh[${indexOrigin + 1} de ${origins.length}]: ${origins[indexOrigin].url}`,
      //});

      const url = `/technews-source`;
      const params = { url: origins[indexOrigin].url };
      setFeedbackText('Listando homepage...');

      let recents = [] as HomePageItem[];
      try {
        const response = await api.get<ResponseHomePage>(url, { params });
        recents = response.data.posts;
        setResponseDebug(response.data.posts as any);
      } catch (error) {
        const messageTitle = `${origins[indexOrigin].title} - Erro ao listar homepage \n`;
        const messageContent = `${url} ${JSON.stringify(params)}`;
        console.log(messageTitle + messageContent);
        setErrorMessages((prevState) => [...prevState, messageTitle + messageContent]);
        // Alert.alert(messageContent, messageContent);
        setIndexOrigin(indexOrigin + 1);
        return;
      }

      //
      //
      //
      if (recents.length === 0) {
        setIndexOrigin(indexOrigin + 1);
        return;
      }

      const urlToCheck = 'technews/refresh';
      const postsFormatted = recents.map(({ link }) => ({ link })).splice(0, 20);
      setFeedbackText('Verificando pendentes...');

      let pending = [];
      try {
        const response = await api.post(urlToCheck, postsFormatted);
        pending = response.data;
        setResponseDebug(response.data);
      } catch (error: any) {
        const messageTitle = `${origins[indexOrigin].title} - Erro ao checar pendentes \n`;
        const messageContent = `${urlToCheck}\n${error.message}\n${JSON.stringify(
          error.response,
          null,
          2
        )}`;
        console.log(messageTitle);
        console.log(postsFormatted);
        //console.log(messageTitle + messageContent);
        setErrorMessages((prevState) => [...prevState, messageTitle + messageContent]);
        // Alert.alert(messageTitle, messageContent);
        setIndexOrigin(indexOrigin + 1);
        return;
      }

      //
      //
      //
      if (!pending || pending.length === 0) {
        setFeedbackText('Não restam pendentes');
        setIndexOrigin(indexOrigin + 1);
        return;
      }

      const pendingResolved = pending;

      setFeedbackText('Listando post');
      const urlSource = '/technews-source/detail';
      try {
        const response = (await Promise.all(
          pendingResolved.map((urlToList: string) =>
            api.get(urlSource, { params: { url: urlToList } }).catch((error) => console.log(urlToList, error.message))
          )
        )) as ResponseDetail[];

        const responsesFiltered = response
        /*.filter(({ data: item }) => item.link && item.thumb)
        .filter(({ data: item }) => item.link.includes('http') && item.thumb.includes('http'))
        .filter(({ data: item }) => isValidArticle(item));*/

        setFeedbackText('Armazenando post...');

        const messageTitle = `${origins[indexOrigin].title} - Erro1 ao enviar artigo \n`;
        const urlCreate = '/technews/post';
        console.log(responsesFiltered);
        await Promise.all(
          responsesFiltered.map(({ data }) =>
            api.post(urlCreate, data).catch(() => console.log(messageTitle + data.link))
          )
        );

        if (indexOrigin === origins.length - 1) {
          setFeedbackText('Completo!!!');
        } else {
          setIndexOrigin(indexOrigin + 1);
        }
      } catch (error: any) {
        const messageTitle = `${origins[indexOrigin].title} - ErroAAA ao enviar artigo \n`;
        const messageContent = error.message;
        console.log('Erro ao armazenar post', messageTitle + messageContent);
        setErrorMessages((prevState) => [...prevState, messageTitle + messageContent]);
        // Alert.alert(messageTitle, messageContent);
        setIndexOrigin(indexOrigin + 1);
      }
    };
    refresh();
  }, [indexOrigin]);

  // when starting page
  useEffect(() => {
    // setRecents([]);

    setResponseDebug([]);
    //setResponseDebug(origins);
    setFeedbackText('');
    setIndexOrigin(0);

    // requestSourceHomePage();
  }, []);

  return (
    <>
      <Head><title>News | Refresh</title></Head>
      <div className="flex flex-col mb-8 gap-4 border-2 min-w-[480px]">

        <div className="break-words">
          {display === 'debug' ? (
            <pre className="text-sm">{JSON.stringify(responseDebug, null, 2)}</pre>
          ) : (
            <pre className="text-sm">{JSON.stringify(errorMessages, null, 2)}</pre>
          )}
        </div>

        <div className="flex flex-row gap-2">
          {display === 'debug' ? (
            <button
              onClick={() => setDisplay('error')}
              className="hover:bg-yellow-500 bg-yellow-400 text-black px-8 py-1 rounded-md cursor-pointer"
            >
              <>Exibir erros</>
            </button>
          ) : (
            <button
              onClick={() => setDisplay('debug')}
              className="hover:bg-yellow-500 bg-yellow-400 text-black px-8 py-1 rounded-md cursor-pointer"
            >
              <>Exibir debug</>
            </button>
          )}

          <button
            onClick={() => { }}
            className="hover:bg-yellow-500 bg-yellow-400 text-black px-8 py-1 rounded-md cursor-pointer"
          >
            <>Etapa - {feedbackText}</>
          </button>
        </div>
      </div>
    </>
  );
}
