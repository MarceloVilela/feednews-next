export interface Origin {
  title: string;
  url: string;
}

export interface Content {
  id: string;
  link: string;
  title: string;
  thumb: string;
  created_at: string;
}

export interface NewsContentProps {
  data: Content[];
}

export interface NewsProps extends NewsContentProps {
  total: number;
  slug: string;
}

export interface FeedPost {
  link: string | null | undefined;
  title: string | null | undefined;
  thumb: string | null | undefined;
  created_at: string | null | undefined;
}

export interface FeedSource {
  getOriginUrl(): string;
  getHome(): Promise<{ posts: FeedPost[] }>;
}

export function findOrigin(
  origins: Origin[],
  slug: string,
  fallbackUrl = "",
): string {
  const origin = origins.find(({ title }) => title === slug);
  return origin?.url ?? fallbackUrl;
}
