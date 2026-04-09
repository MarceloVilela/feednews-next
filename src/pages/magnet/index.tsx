import React, { useEffect, useState, FormEvent, useCallback } from 'react'
import Head from 'next/head';

import api from 'services/api';

import InitialPage, { Result } from './_initialPage';
import data from '../../assets/json/magnet/results.json';
import alias from '../../assets/json/magnet/engineAlias.json';

export default function Home() {
  //const enginesAlias = ['pirateproxy', 'torlock', 'limetor'];
  const enginesAlias = alias;
  const [enginesPending, setEnginesPending] = useState<string[]>([]);
  
  // request
  const [search_query, setSearchQuery] = useState('');
  const [result, setResult] = useState<Result>({} as Result);

  useEffect(() => {
    //setDocs(data as ResultData[]);
    setResult({ 'pirateproxy': data } as Result);
  }, [])

  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();
    setResult({ 'pirateproxy': data } as Result);
    return;

    setResult({} as Result);
    setEnginesPending(enginesAlias);

    enginesAlias.forEach(alias => {
      const encoded = process.env.REACT_APP_ENCODED;
      const aliasEncoded = encoded === 'true' ? btoa(alias) : alias;
      const searchQueryEncoded = encoded === 'true' ? btoa(search_query) : search_query;
      const requestConfig = { params: { url: aliasEncoded, search_query: searchQueryEncoded, encoded } };

      api.get('api/magnet/search', requestConfig)
        .then(({ data }) => {
          console.log({ [alias]: data });
          setResult(Object.assign(result, { [alias]: data }));
          setEnginesPending(enginesPending.filter(item => item !== alias));
        })
        .catch(error => console.log(`Erro ao buscar na engine: ${alias}`, error));
    })
  }, [enginesAlias, enginesPending, search_query, result]);

  return (
    <>
      <Head><title>Magnet</title></Head>

      <InitialPage 
        handleSubmit={handleSubmit} 
        result={result} 
        handleChangeSearchQuery={setSearchQuery} 
        searchQuery={search_query}  
      />
    </>
  )
}