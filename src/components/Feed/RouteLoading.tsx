import { FeedSkeleton } from "components/Feed/FeedSkeleton";

interface RouteLoadingProps {
  variant?: "cards" | "list";
}

export function RouteLoading({ variant }: RouteLoadingProps) {
  return (
    <div role="status" aria-live="polite" className="my-4">
      <span className="sr-only">Carregando…</span>
      <FeedSkeleton variant={variant} />
    </div>
  );
}
