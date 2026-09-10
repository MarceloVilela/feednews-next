import { FeedSkeleton } from "components/Feed/FeedSkeleton";

export function RouteLoading() {
  return (
    <div role="status" aria-live="polite" className="my-4">
      <span className="sr-only">Carregando…</span>
      <FeedSkeleton />
    </div>
  );
}
