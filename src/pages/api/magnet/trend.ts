import { NextRequest, NextResponse } from 'next/server'
import { ISource, sources } from './sources';
import Tcsv from "./sources/Tcsv";

export default async function handler(request: any, response: any) {
  const { url: alias } = request.query;

  const [engine] = sources.filter((item) => item.getOriginUrl().includes(alias));

  //sources.forEach((item) => console.log(item));
  //return response.status(200).json({ name: 'John Doe' })

  if (!engine || !engine.top) {
    const available = Object.values(sources).map((item) => item.getOriginUrl()).join(', ');
    throw new Error(`Alias not found: ${alias}. Available: ${available}`);
  }

  // const engine = new Tcsv();

  const results = await engine.top();

  return response.json(results);
}