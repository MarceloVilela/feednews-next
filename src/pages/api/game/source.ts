import { NextApiRequest, NextApiResponse } from "next";
import { Post } from "../game/sources";
import { sources } from "./sources";

type GameHomeDataResponse = {
  data: Post[];
  total: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GameHomeDataResponse | { error: string }>,
) {
  const { url: alias } = req.query;

  if (!alias || typeof alias !== "string") {
    return res.status(400).json({
      error: "Missing url query parameter",
    });
  }

  const [engine] = sources.filter((item) =>
    item.getOriginUrl().includes(alias.toLowerCase()),
  );

  if (!engine) {
    const available = sources.map((item) => item.getOriginUrl()).join(", ");
    return res.status(400).json({
      error: `Alias not found: ${alias}. Available: ${available}`,
    });
  }

  const results = await engine.getHome();

  const postsWithId = results.posts.map((item) => ({ ...item, id: item.link }));

  return res.json({ data: postsWithId, total: postsWithId.length });
}
