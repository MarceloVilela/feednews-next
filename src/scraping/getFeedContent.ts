import { notFound } from "next/navigation";

import { Content, FeedSource, findOrigin, Origin } from "types/feed";

export async function getFeedContent(
  sources: FeedSource[],
  origins: Origin[],
  slug: string,
  fallbackUrl?: string,
): Promise<Content[]> {
  const url = findOrigin(origins, slug, fallbackUrl);

  if (!url) {
    notFound();
  }

  const engine = sources.find((item) =>
    item.getOriginUrl().includes(url.toLowerCase()),
  );

  if (!engine) {
    notFound();
  }

  const { posts } = await engine.getHome();

  return posts.map((post) => ({
    id: post.link ?? "",
    link: post.link ?? "",
    title: post.title ?? "",
    thumb: post.thumb ?? "",
    created_at: post.created_at ?? "",
  }));
}
