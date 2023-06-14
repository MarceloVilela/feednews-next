import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import delay from 'utils/delay';

export default async function handler(request: any, response: any) {
  try {
    const { url} = request.query;
    //console.table(['ServerSide', 'api/tech/news', `${process.env.NEXT_PUBLIC_API_TECH_URL}/technews/post/origin?page=1&url=${url}`]);
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_TECH_URL}/technews/post/origin?page=1&url=${url}`);
    //console.log(
      //'api/news:ok', 
      //data
    //);

    //await delay(1000 * 10);

    return response.json(data);
  } catch (error) {
    //console.log('api/news', error);

    return { posts: [] };
  }
}