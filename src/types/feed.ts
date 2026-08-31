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

export function findOrigin(
  origins: Origin[],
  slug: string,
  fallbackUrl = "",
): string {
  const origin = origins.find(({ title }) => title === slug);
  return origin?.url ?? fallbackUrl;
}
