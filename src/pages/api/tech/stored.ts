import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { url } = req.query;
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_TECH_URL}/technews/post/origin?page=1&url=${url}`);

    return res.json(data);
  } catch (error) {
    return res.status(500).json({ posts: [] });
  }
}
