// import { NextRequest, NextResponse } from 'next/server'
import jsonbin from 'services/jsonbin';
import IResponseHomeDTO, { ISource, Post, sources } from './sources';
// import Tcsv from "./sources/Tcsv";

export default async function handler(request: any, response: any) {
  const { url: alias, search_query = '', encoded } = request.query;

  const [engine] = sources.filter((item) => item.getOriginUrl().includes(alias));

  //sources.forEach((item) => console.log(item));
  //return response.status(200).json({ name: 'John Doe' })

  let posts  = [] as Post[]

  if(alias == ''){
    const { data: jsonbinData } = await jsonbin.get('6092cee092cb9267d0ce0e00');
    const { record } = jsonbinData;
    posts = record.data
  }
  else if (!engine) {
    const available = Object.values(sources).map((item) => item.getOriginUrl()).join(', ');
    throw new Error(`Alias not found: ${alias}. Available: ${available}`);
  }
  else {
    const home = await engine.getHome();
    posts = home.posts;
  }

  const postsWithId = posts.map((item) => ({...item, id: item.link}));

  return response.json({data: postsWithId, total: postsWithId.length});
}