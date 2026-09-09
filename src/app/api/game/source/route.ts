import { NextResponse } from "next/server";

import { sources } from "scraping/game";

export async function GET(request: Request) {
  const aliasValues = new URL(request.url).searchParams.getAll("url");
  const alias = aliasValues.length === 1 ? aliasValues[0] : null;

  if (!alias) {
    return NextResponse.json(
      { error: "Missing url query parameter" },
      { status: 400 },
    );
  }

  const [engine] = sources.filter((item) =>
    item.getOriginUrl().includes(alias.toLowerCase()),
  );

  if (!engine) {
    const available = sources.map((item) => item.getOriginUrl()).join(", ");
    return NextResponse.json(
      { error: `Alias not found: ${alias}. Available: ${available}` },
      { status: 400 },
    );
  }

  const results = await engine.getHome();
  const postsWithId = results.posts.map((item) => ({ ...item, id: item.link }));

  return NextResponse.json({ data: postsWithId, total: postsWithId.length });
}
