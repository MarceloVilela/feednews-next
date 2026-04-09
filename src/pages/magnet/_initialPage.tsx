import React, { useEffect, useMemo, useState, FormEvent, useCallback } from 'react'
import Head from 'next/head';
import { FaMagnet, FaLink } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import api from 'services/api';
import { useStyleSwitcher } from 'hooks/styleSwitcher';

import data from '../../assets/json/magnet/results.json';
import alias from '../../assets/json/magnet/engineAlias.json';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export interface ResultData {
  link: string;
  name: string;
  size: string;
  seeds: number;
  leech: number;
  engine_url: string;
  desc_link: string;
}

export interface DetailData {
  links: string[];
  name: string;
  thumb: string;
  engine_url: string;
  desc_link: string;
}

export interface Result {
  [key: string]: ResultData[];
}

interface InitialPageProps {
  handleSubmit: (event: FormEvent) => void;
  handleChangeSearchQuery: (searchQuery: string) => void;
  result: Result;
  searchQuery: string;
}

export default function InitialPage({handleSubmit, result, handleChangeSearchQuery, searchQuery}: InitialPageProps) {
  //const enginesAlias = ['pirateproxy', 'torlock', 'limetor'];
  const enginesAlias = alias;
  const [enginesPending, setEnginesPending] = useState<string[]>([]);
  const { switchAlias, alias: styleAlias } = useStyleSwitcher();

  // request
  const [search_query, setSearchQuery] = useState('');

  // local filtering
  const [filter, setFilter] = useState('');
  const [order, setOrder] = useState('seeds');
  const [orderDirection, setOrderDirection] = useState('desc');

  useEffect(() => {
    ///setDocs(data as ResultData[]);
    //setResult({ 'pirateproxy': data } as Result);
  }, [])

  const [docs] = useMemo(() => {
    const arr = [] as ResultData[];
    if(typeof result != "object"){
      return [arr, true];
    }
    Object.keys(result).forEach(key => arr.push(...result[key]));
    return [arr, enginesPending.length > 0];
  }, [result, enginesPending])

  const filteredItens = useMemo(() => {
    return docs.filter(item => item.name.toLocaleLowerCase().includes(filter));
  }, [docs, filter]);

  const orderedItens = useMemo(() => {
    const itens = filteredItens.sort(function (a, b) {
      return a.seeds - b.seeds;
    });
    return orderDirection === 'desc' ? itens.reverse() : itens;
  }, [filteredItens, orderDirection]);

  const handleOrder = (prop: string) => {
    if (order === prop) {
      setOrderDirection(orderDirection === 'desc' ? 'asc' : 'desc');
      return;
    }
    setOrder(prop);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-wrap pt-4- mb-8 gap-4 max-w-lg">
        <div className="relative flex w-full flex-wrap items-stretch">
          <input
            value={searchQuery}
            onChange={e => handleChangeSearchQuery(e.target.value.toLocaleLowerCase())}
            type="search"
            className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Digite a busca"
            aria-label="Digite a busca"
            aria-describedby="button-addon1" 
          />
          <Button
            variant={"default"}
            //className="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
            type="submit"
            id="Button-addon1"
            data-te-ripple-init
            data-te-ripple-color="light">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5">
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd" />
            </svg>
          </Button>
        </div>
      </form>

      <form id="filter-results" className="flex flex-wrap mb-8 gap-4 max-w-lg">
        <div className="relative flex gap-4 w-full flex-wrap items-stretch">
          <input
            value={filter}
            onChange={e => setFilter(e.target.value.toLocaleLowerCase())}
            type="search"
            className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Filtrar resultados da busca"
            aria-label="Filtrar resultados da busca"
            aria-describedby="button-addon1" 
          />
          <p className="text-sm self-center">Resultados (exibindo {filteredItens.length} de {docs.length})</p>
        </div>
      </form>

      {enginesPending.length > 0 && (
        <p className="mb-8">{enginesPending.join(', ')}</p>
      )}

      <Table className="w-full">
        <TableHeader className="">
          <TableRow className='hidden lg:table-row'>
            <TableHead className="cursor-pointer" onClick={() => handleOrder('name')}>Nome</TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleOrder('size')}>Tamanho</TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleOrder('seeds')}>Seeds</TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleOrder('leech')}>Leech</TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleOrder('engine_url')}>Mecanismo de busca</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderedItens.map((item, key) => (
            <TableRow key={key} 
              className="flex flex-wrap lg:table-row sm:rounded-2xl sm:mb-2 sm:p-2 
              dark:bg-neutral-700- shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]-"
            >
              <TableCell className="flex w-full lg:w-auto">
                {item.link ? (
                  <span className="flex flex-wrap gap-2">
                    <a href={item.link} className="flex gap-2">
                      <span>{item.name}</span>
                      <FaMagnet />
                    </a>
                    <a href={`/magnet/post?url=${item.desc_link}`} target="_blank" rel="noopener noreferrer" className="flex">
                      <FaLink />
                    </a>
                  </span>
                ) : (
                  <a href={`/magnet/post?url=${item.desc_link}`} target="_blank" rel="noopener noreferrer" className="flex gap-2">
                    <span>{item.name}</span>
                    <FaLink />
                  </a>
                )}
              </TableCell>
              <TableCell className="w-full lg:w-auto">{item.size || '---'}</TableCell>
              <TableCell className="w-full lg:w-auto">{item.seeds || '---'}</TableCell>
              <TableCell className="w-full lg:w-auto">{item.leech || '---'}</TableCell>
              <TableCell className="w-full lg:w-auto">{item.engine_url || '---'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </>
  )
}